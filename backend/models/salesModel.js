const mongoose = require('mongoose');

const salesModel = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the Seller model
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Sales = mongoose.model('Sales', salesModel);

module.exports = Sales;
