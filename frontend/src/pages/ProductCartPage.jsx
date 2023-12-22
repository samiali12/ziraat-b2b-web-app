import CartItem from '../components/CartItem/CartItem'
import AuthNavigation from '../components/Header/AuthNavigation';
import Footer from '../components/Footer/Footer';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js/pure';
import axios from 'axios';

const ProductsCartPage = () => {

    let { cart } = useCart()
    const [subTotal, setSubTotal] = useState(0)
    const [taxAmount, setTaxAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    const makePayment = async () => {

        const stripe = await loadStripe("pk_test_51OOLTkCgPg2oOCHp2iWnPnetU5WjVzQv4nhg3HNNesbZhzCAO93SEL8j7UWc6ljfRBQCpR9gNNNrdnePC9fno5Ru00KTSogBFE")

        const response = await axios.post("http://localhost:8000/api/v1/create-checkout-session", { cart })

        const result = stripe.redirectToCheckout({
            sessionId: response.data.id
        })

        console.log(result)
    }

    useEffect(() => {
        // Calculate the total
        const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
        setSubTotal(total)
        setTaxAmount(total * 0.02)
        setTotalAmount(subTotal + taxAmount)
    })
    return (
        <>
            <AuthNavigation />
            <div className="flex justify-center my-8">
                <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                    <h1 className="text-2xl font-bold my-8">Products Cart</h1>
                    <table className="w-full text-sm lg:text-base" cellSpacing="0">
                        <thead>
                            <tr className="h-12 uppercase">
                                <th className="hidden md:table-cell"></th>
                                <th className="text-left">Product</th>
                                <th className="lg:text-right text-left pl-5 lg:pl-0">
                                    <span className="lg:hidden" title="Quantity">Qtd</span>
                                    <span className="hidden lg:inline">Quantity</span>
                                </th>
                                <th className="hidden text-right md:table-cell">Unit price</th>
                                <th className="text-right">Total price</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                cart.map((item) => {
                                    return (
                                        <CartItem
                                            key={item.product._id}
                                            product={item.product}
                                            imageSrc={item.product.images[0].image_url}
                                            productName={item.product.name}
                                            unitPrice={item.product.price}
                                            quantity={item.quantity}
                                            totalPrice={item.totalPrice}
                                        />
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <hr className="pb-6 mt-6" />
                    <div className="my-4 mt-6 -mx-2 lg:flex justify-center bg-gray-100" style={{ backgroundColor: 'rgba(248, 248, 248, 0.5)' }}>
                        <div className="lg:px-2">
                            <div className="p-4 rounded-full">
                                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
                            </div>
                            <div className="p-4">
                                <p className="mb-6 italic">Shipping and additional costs are calculated based on values you have entered</p>
                                <div className="flex justify-between border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-normal text-center text-gray-800">
                                        Subtotal
                                    </div>
                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-normal text-center text-gray-900">
                                        {subTotal} PKR
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4 border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-normal text-center text-gray-800">
                                        Tax
                                    </div>
                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-normal text-center text-gray-900">
                                        {taxAmount} PKR
                                    </div>
                                </div>
                                <div className="flex justify-between pt-4 border-b">
                                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-normal text-center text-gray-800">
                                        Total
                                    </div>
                                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-normal text-center text-gray-900">
                                        {totalAmount} PKR
                                    </div>
                                </div>

                                <button
                                    onClick={makePayment}
                                    className="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none">
                                    <svg aria-hidden="true" data-prefix="far" data-icon="credit-card" className="w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M527.9 32H48.1C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48.1 48h479.8c26.6 0 48.1-21.5 48.1-48V80c0-26.5-21.5-48-48.1-48zM54.1 80h467.8c3.3 0 6 2.7 6 6v42H48.1V86c0-3.3 2.7-6 6-6zm467.8 352H54.1c-3.3 0-6-2.7-6-6V256h479.8v170c0 3.3-2.7 6-6 6zM192 332v40c0 6.6-5.4 12-12 12h-72c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h72c6.6 0 12 5.4 12 12zm192 0v40c0 6.6-5.4 12-12 12H236c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h136c6.6 0 12 5.4 12 12z" /></svg>
                                    <span className="ml-2 mt-5px">Proceed to checkout</span>
                                </button>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

            < Footer />
        </>

    );
};


export default ProductsCartPage;