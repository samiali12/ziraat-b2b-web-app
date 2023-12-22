const mongoose = require('mongoose');

const orderModel = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for the customer
    required: true,
  },
  items: [
    {
      // Define the structure of items in the order (adjust as needed)
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      // Add other item details as needed
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered'], // Define possible status values
    default: 'pending', // Set a default status if required
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentIntentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model('Order', orderModel);

module.exports = Order;
