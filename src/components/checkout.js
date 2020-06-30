import React, { useContext } from "react"
import { CartContext } from "./cartprovider"
import { useStripe, PaymentRequestButtonElement } from "@stripe/react-stripe-js"


const Checkout = () => {
  const { cart, total } = useContext(CartContext)

  // const { cart, total } = useContext(CartContext)
  // console.log(`cart Total: ${cartTotal}`)
  // const onClick = () => {
  //   const lineItems = cart.map(([product, quantity]) => ({
  //     price: product.id,
  //     quantity,
  //   }))

  //   fetch("/.netlify/functions/stripeCharge", {
  //     method: "POST",
  //     body: JSON.stringify(lineItems),
  //   })
  //     .then(async response => {
  //       const { id } = await response.json()
  //       localStorage.setItem("cart", "{}")
  //       alert("success")
  //       const stripe = await stripePromise
  //       const { error } = await stripe.redirectToCheckout({ sessionId: id })
  //       // If `redirectToCheckout` fails due to a browser or network
  //       // error, display the localized error message to your customer
  //       // using `error.message`.
  //       alert(error.message)
  //     })
  //     .catch(err => alert(err.message))
  // }
  const stripe = useStripe();
  const [paymentRequest, setPaymentRequest] = useState(null)

  useEfffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'Restaurant Name',
          total: total,
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestShipping: true,
      })

      pr.canMakePayment().then((result) => {
        if (result) {
          pr.on('paymentmethod', handlePaymentMethodReceived)
          setPaymentRequest(pr)
        }
      })
    }
  }, [stripe])

  if (paymentRequest) {
     return <PaymentRequestButtonElement   options={{ paymentRequest }}
  }
  return <button onClick={onClick}>Checkout for ${total()}</button>
}

export default Checkout
