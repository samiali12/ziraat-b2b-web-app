const stripe = require('stripe')("sk_test_51OOLTkCgPg2oOCHppC2kpP1XAqhlrWT0F0eG0gQrGx5B6B2ruwLdN7vRC4eHn7fZl2dPItxroIvRn8xAhT6u8eR200bHEJfrgE")
const express = require('express')
const app = express()
app.use(express.static('public'))
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel')


app.post("/create-checkout-session", async (request, response) => {


    const product = request.body

    const user = await User.findById(request.body.userId)

    const lineItems = product.cart.map((item) => ({
        price_data: {
            currency: 'pkr',
            product_data: {
                name: item.product.name,
                description: item.product.description,
            },
            unit_amount: item.product.price * 100
        },
        quantity: item.quantity,

    }));

    const session = await stripe.checkout.sessions.create({
   
        line_items: lineItems,
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `http://localhost:3000/cart/checkout/payment-successfully`,
        metadata: {
            seller: product.cart[0].product.seller,
        },
    });

    response.status(200).json({ id: session.id })
})

module.exports = app;