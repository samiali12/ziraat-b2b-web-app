import { createContext, useContext, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

const CartContext = createContext()

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    
    const addToCart = (product) => {
        if (!isProductInCart(product)) {
            setCart([...cart, product]);
        toast.success("Product add into the cart")
        } else {
           toast.error("Product is already in cart")
        }
    };

    const isProductInCart = (product) => {
        console.log(product.product._id)
        return cart.some((cartProduct) => cartProduct.product._id  === product.product._id);
    };

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((product) =>  product.product._id !== productId);
        setCart(updatedCart);
    };

    const clearCart = () => {
        setCart(null);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, removeFromCart}}>
            {children}
        </CartContext.Provider>
    );
}