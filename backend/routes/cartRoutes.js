
const express = require('express');
const { addCartItem, getCartItems, deleteItem } = require('../controllers/addToCartController');
const router = express.Router()

router.route('/cart/:id').get(getCartItems);
router.route('/cart/:id').post(addCartItem);
router.route('/cart/:userId/:itemId').delete(deleteItem);

module.exports = router;