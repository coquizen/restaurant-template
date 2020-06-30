const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export handler = async (e) => {
    try {
        const { paymentDetails } = JSON.parse(e.body)

        const { paymentIntent } = await stripe.payementIntents.create({
            amount: paymentDetails.total,
            currency: 'usd',
            confirm: true,
        })

        return {
            statusCOde: 200,
            body: JSON.stringify({ paymentIntent }),
        }
    } catch (error) {
        console.log({ error })

        return {
            statusCode: 400,
            body: JSON.stringify({error}),
        }
    }
}