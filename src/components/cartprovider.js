import React, { useState, useContext, useEffect, createContext } from "react"
import PropTypes from "prop-types"
import { ProductsContext } from "./productprovider"

export const CartContext = createContext()

/**
 * Manages the shopping cart, which is persisted in local storage.
 * The cart and related methods are shared through context.
 */
const CartProvider = ({ children }) => {
  const { products } = useContext(ProductsContext)
  const [mode, setMode] = useState(false)
  /** Load cart from local storage. Initialize if not present or incorrect. */
  const [contents, setContents] = useState(() => {
    let localCart
    try {
      localCart = JSON.parse(localStorage.getItem("cart"))
    } catch (err) {
      console.error(err.message)
    }
    if (!localCart || !Array.isArray(localCart)) return []
    return localCart
  })

  /** Save cart to local storage after load and on update */
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(contents))
    } catch (err) {
      console.error(err)
    }
  }, [contents])

  /** An array representing the cart in the form of [{sku}, quantity] */
  const cart = contents.map(([id, quantity]) => {
    return [products[id], quantity]
  })

  /** The number of items in the cart */
  const count = contents.reduce((sum, [_, quantity]) => sum + quantity, 0)

  /** The total cost of the items in the cart */
  const total = () => {
    try {
      return contents.reduce((sum, [id, quantity]) => (sum + products[id].price * quantity, 0))
    } catch (e) {
      console.log(e.message)
    }
  }
  
  /** Sets quantity of item with `id` */
  
  function set(id, quantity) {
    const index = contents.findIndex(item => item[0] === id)
    setContents(state => {
      const newState = [...state]
      if (index !== -1) {
        newState[index] = [id, quantity]
      } else {
        newState.push([ id, quantity ])
      }
      return newState
    })
  }

  /** Increments item with `id` by `quantity`, which defaults to 0 */
  function add(id, quantity = 1) {
    const currentItem = contents.find(item => item[0] === id)
    const currentQuantity = currentItem ? currentItem[1] : 0
    set(id, quantity + currentQuantity)
    debugger
  }

  /** Removes item with `id` */
  function remove(id) {
    setContents(state => {
      return state.filter(item => item[0] !== id)
    })
  }

  /** Toggles cart display, or sets to the boolean `force` if provided */
  function toggle(force) {
    setMode(prev => force || !prev)
  }

  const ctx = {
    contents,
    cart,
    add,
    set,
    remove,
    toggle,
    total,
    count,
    mode,
  }

  return (
    <CartContext.Provider value={{...ctx}}>{children}</CartContext.Provider>
  )
}

CartProvider.propTypes = {
  children: PropTypes.any.isRequired,
}

export default CartProvider
