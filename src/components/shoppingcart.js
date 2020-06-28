import React, { useContext } from "react"
import { CartContext } from "./cartprovider"
import Checkout from "./checkout"

const Cart = () => {
  const { cart, count, mode, toggle } = useContext(CartContext)
  return (
    <>
      <button
        onClick={() => toggle()}
        style={{
          position: "fixed",
          right: "2rem",
          top: "2rem",
          zIndex: "2",
        }}
      >
        {mode ? "→" : "cart"}
      </button>
      <div
        style={{
          display: mode ? "initial" : "none",
          position: "fixed",
          right: 0,
          top: 0,
          height: "100vh",
          padding: "2rem",
          backgroundColor: "white",
          maxWidth: 400,
          width: "100%",
          zIndex: 1,
        }}
      >
        <h1>cart</h1>
              {count > 0 &&
                  cart.map(([product, quantity]) => (
                      <p>{`${quantity} * ${product.name} `}</p>
          ))}
        {count === 0 && <span>No items in cart.</span>}
        {count > 0 && <Checkout />}
      </div>
    </>
  )
}

export default Cart
