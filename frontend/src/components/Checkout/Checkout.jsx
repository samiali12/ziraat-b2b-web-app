import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CheckoutProducts from './CheckoutProducts';
import {loadStripe} from '@stripe/stripe-js/pure';
import axios from 'axios';
import useAuthentication from '../../hooks/auth/useAuthentication';

const Checkout = () => {

    const { authenticated, userId } = useAuthentication();
   
    let { cart } = useCart()
    const [subTotal, setSubTotal] = useState(0)
    const [taxAmount, setTaxAmount] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        // Calculate the total

        const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
        setSubTotal(total)
        setTaxAmount(total * 0.02)
        setTotalAmount(subTotal + taxAmount)
    })

    const makePayment = async () => {

        const stripe  =  await loadStripe("pk_test_51O4Gg4JPsABfwRAlH8PUOQGTQvyYrb7rYSuastcUEZcbRLJj7EqAn06Fig4yw4pQvZbLXnF47C5a90JheSDZWkRu00HXhjIxKD")

        const response = await axios.post("http://localhost:8000/api/v1/create-checkout-session", {cart,userId})

        const result = stripe.redirectToCheckout({
            sessionId: response.data.id
        })

        if(result.error){
            console.log(result.error)
        }
    }

    return (
        <div className="relative mx-auto w-full bg-white">
            <div className="grid min-h-screen grid-cols-10">
                <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
                    <div className="mx-auto w-full max-w-lg">
                        <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">Secure Checkout<span className="mt-2 block h-1 w-10 bg-[#28844b] sm:w-20"></span></h1>
                        <form action="" className="mt-10 flex flex-col space-y-4">
                            <div><label for="email" className="text-xs font-semibold text-gray-500">Email</label><input type="email" id="email" name="email" placeholder="john.capler@fang.com" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#28844b]" /></div>
                            <div className="relative"><label for="card-number" className="text-xs font-semibold text-gray-500">Card number</label><input type="text" id="card-number" name="card-number" placeholder="1234-5678-XXXX-XXXX" className="block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#28844b]" /><img src="/images/uQUFIfCYVYcLK0qVJF5Yw.png" alt="" className="absolute bottom-3 right-3 max-h-4" /></div>
                            <div>
                                <p className="text-xs font-semibold text-gray-500">Expiration date</p>
                                <div className="mr-6 flex flex-wrap">
                                    <div className="my-1">
                                        <label for="month" className="sr-only">Select expiration month</label
                                        ><select name="month" id="month" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-[#28844b]">
                                            <option value="">Month</option>
                                        </select>
                                    </div>
                                    <div className="my-1 ml-3 mr-6">
                                        <label for="year" className="sr-only">Select expiration year</label
                                        ><select name="year" id="year" className="cursor-pointer rounded border-gray-300 bg-gray-50 py-3 px-2 text-sm shadow-sm outline-none transition focus:ring-2 focus:ring-[#28844b]">
                                            <option value="">Year</option>
                                        </select>
                                    </div>
                                    <div className="relative my-1"><label for="security-code" className="sr-only">Security code</label><input type="text" id="security-code" name="security-code" placeholder="Security code" className="block w-36 rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#28844b]" /></div>
                                </div>
                            </div>
                            <div><label for="card-name" className="sr-only">Card name</label><input type="text" id="card-name" name="card-name" placeholder="Name on the card" className="mt-1 block w-full rounded border-gray-300 bg-gray-50 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-[#28844b]" /></div>
                        </form>
                        <p className="mt-10 text-center text-sm font-semibold text-gray-500">By placing this order you agree to the <a href="#" className="whitespace-nowrap text-[#28844b]underline hover:[#28844b]">Terms and Conditions</a></p>
                        <button 
                        onClick={makePayment}
                        type="submit" className="mt-4 inline-flex w-full items-center justify-center rounded bg-[#28844b] py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-[#28844b] sm:text-lg">Place Order</button>
                    </div>
                </div>
                <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
                    <h2 className="sr-only">Order summary</h2>
                    <div>
                        <img src="https://www.renature.co/wp-content/uploads/2023/04/image-3-1024x540.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
                        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-[#28844b] to-[#3ca564] opacity-95"></div>
                    </div>
                    <div className="relative">
                        <ul className="space-y-5">

                            {
                                cart.map((item) => (

                                    <CheckoutProducts
                                        key={item.product._id}
                                        category={item.product.category}
                                        imageUrl={item.product.images[0].image_url}
                                        name={item.product.name}
                                        price={item.product.price} />

                                ))
                            }

                        </ul>
                        <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
                        <div className="space-y-2">
                            <p className="flex justify-between text-lg font-bold text-white"><span>Total price:</span><span>{totalAmount} PKR</span></p>
                            <p className="flex justify-between text-sm font-medium text-white"><span>Tax: 2%</span><span>{taxAmount} PKR</span></p>
                        </div>
                    </div>
                    <div className="relative mt-10 text-white">
                        <h3 className="mb-5 text-lg font-bold">Support</h3>
                        <p className="text-sm font-semibold">(+92) (344) 3845602 <span className="font-light">(Pakistan)</span></p>
                        <p className="mt-1 text-sm font-semibold">ziraatb2bmarketplace@gmail.com<span className="font-light"> (Email)</span></p>
                        <p className="mt-2 text-xs font-medium">Call us now for payment related issues</p>
                    </div>
                    <div className="relative mt-10 flex">
                        <p className="flex flex-col"><span className="text-sm font-bold text-white">Money Back Guarantee</span><span className="text-xs font-medium text-white">within 30 days of purchase</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout;