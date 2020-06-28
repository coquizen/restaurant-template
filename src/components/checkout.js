import React, { useContext } from "react"
import { CartContext } from "./cartprovider"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe('pk_test_51Gsye1Jm82wsAnpfJXSewGquKWTSdnI5Low0cXA3ECVDmxtwxNq9gi96dljCugZZ4KK4qwpStBWQV2vxqXt9UY9g00ALPtGyNO')

const Checkout = () => {
  const { cart, total } = useContext(CartContext)

  const onClick = () => {
    const lineItems = cart.map(([product, quantity]) => ({
      price: product.id,
      quantity,
    }))

    fetch("/.netlify/functions/orderCreate", {
      method: "POST",
      body: JSON.stringify(lineItems),
    })
      .then(async response => {
        const { id } = await response.json()
        localStorage.setItem("cart", "{}")
        const stripe = await stripePromise
        const { error } = await stripe.redirectToCheckout({ sessionId: id })
        // If `redirectToCheckout` fails due to a browser or network
        // error, display the localized error message to your customer
        // using `error.message`.
        alert(error.message)
      })
      .catch(err => alert(err.message))
  }

  return <button onClick={onClick}>Checkout for ${total / 100}</button>
}

export default Checkout