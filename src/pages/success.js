import React, { useContext, useEffect } from "react"
import { CartContext } from "../components/cartprovider"

const Success = () => {
  const { clear } = useContext(CartContext)

  useEffect(() => clear(), [])

  return (
    <main>
      <h1>
        Thanks for your purchase{" "}
        <span role="img" aria-label="heart emoji">
          ❤️
        </span>
      </h1>
    </main>
  )
}

export default Success
