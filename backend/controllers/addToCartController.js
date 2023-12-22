
const Cart = require('../models/CartItemSchema');
const Product = require('../models/productModel');

const addCartItem = async (req, res) => {
    try {
        const userId = req.params.id;
        let { productId, quantityInGrams, unit } = req.body;

        const product = await Product.findById(productId)

        if (unit === 'kg') {
            console.log(quantityInGrams * 1000)
            quantityInGrams = quantityInGrams * 1000;

        } else if (unit === 'ton') {
            quantityInGrams = quantityInGrams * 1000 * 1000;
        } else {
            quantityInGrams = quantity; // quantity is already in grams
        }

        const cartItem = await Cart.create({
            user: userId,
            items: {
                product: product._id,
                quantityInGrams: quantityInGrams,
                subTotal: product.price * quantityInGrams,
            }
        });
        await cartItem.save();

        res.status(200).json({ message: 'Product added to cart', cartItem });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Controller function to get items from a cart
const getCartItems = async (req, res) => {
    try {
        const userId = req.params.id;

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId }).populate('items.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart items fetched successfully', items: cart.items });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// Controller function to delete an item from a cart
const deleteItem = async (req, res) => {
    try {
        const { userId, itemId } = req.params;

        // Find the cart for the user
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        // Remove the item from the cart
        cart.items = cart.items.filter(item => item.product.toString() !== itemId);

        // Save the cart
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};


module.exports = {
    addCartItem,
    getCartItems,
    deleteItem
}