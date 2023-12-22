const stripe = require('stripe')('sk_test_51OOLTkCgPg2oOCHppC2kpP1XAqhlrWT0F0eG0gQrGx5B6B2ruwLdN7vRC4eHn7fZl2dPItxroIvRn8xAhT6u8eR200bHEJfrgE');
const express = require('express');
const app = express();
const Sales = require('./models/salesModel')
const Order = require('./models/userModel')

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_7d833a846488478924badd250de9f7ed63ce757321c04784dcd9a41aefbfe80f";

app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
       
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    if (event.type === 'checkout.session.completed') {

        const session = event.data.object;
        const orderId = session.client_reference_id;

        // Extract necessary details from the session object
        const paymentIntentId = session.payment_intent;

         try {
            // Fetch payment details from Stripe
            const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
            const amount = paymentIntent.amount; // Total amount paid

            // Update seller's total sales in your database
            const sellerId = session.metadata.seller;
            const customerId = session.metadata.buyer;

            console.log(session)

            // Here you can create an Order model instance and save it to your database
            const newOrder = await Order.create({
                orderId: orderId, // or use any other order identifier
                customer: customerId,
                items: [session.lineItems],
                amount: amount,
                paymentIntentId: paymentIntentId,
            
            });
            
            // Create a new Sales record in your database
            const newSale = await Sales.create({
                seller: sellerId,
                amount: amount,
                date: new Date() // Assuming you want to store the current date/time
            })


            // Save the new sale to the database
            await newSale.save();
            await newOrder.save();

        } catch (error) {
            console.error('Error fetching payment details:', error);
            response.status(500).send('Internal Server Error');
            return;
        }
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
});

app.listen(4242, () => console.log('Running on port 4242'));

module.exports = app