// with thanks https://github.com/alexmacarthur/netlify-lambda-function-example/blob/68a0cdc05e201d68fe80b0926b0af7ff88f15802/lambda-src/purchase.js
require("dotenv").config()

const statusCode = 200
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

exports.handler = function(event, context, callback) {
  stripe.price.list({}, (err, result) => {
    let statusCode, body

    if (err) {
      statusCode = 500
      body = JSON.stringify({
        error: err.message,
      })
    } else {
      statusCode = 200
      body = JSON.stringify({
        data: result.data,
      })
    }

    const response = {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode,
      body,
    }
    callback(null, response)
  })
}
