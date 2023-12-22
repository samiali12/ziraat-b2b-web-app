const express = require('express');
const router = express.Router();
const salesController = require('../controllers/salesController');

// Route to calculate total sales for a user
router.get('/users/:sellerId/total-sales', salesController.getSalesRecord);

module.exports = router;