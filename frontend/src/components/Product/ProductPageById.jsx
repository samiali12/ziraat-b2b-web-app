import { useParams } from "react-router-dom"
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../features/productCRUDFeatures/productCRUDSlice";
import MetaData from "../../app/MetaData";
import RatingStars from "../ratings/Rating";
import ReviewsSection from "../ratings/Review";
import Review from "../ratings/Review";
import axios from "axios";
import useAuthentication from '../../hooks/auth/useAuthentication'
import { useCart } from "../../context/CartContext";
import { useToaster } from 'react-hot-toast';

const ProductPageById = () => {

    const { cart, addToCart} = useCart();

    const dispatch = useDispatch()
   
    const { id } = useParams(); // Get the product id from the URL params
    const { authenticated, userId } = useAuthentication();
   
    const [reviews, setReviews] = useState([])

    const [quantity, setQuantity] = useState(1); // Initial quantity state
    const [unit, setUnit] = useState('Kilograms');
    const [deliverySchedule, setDeliverySchedule] = useState('One-time');

    const [product, setProduct] = useState(null); // Initialize the product state to null

    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = () => {
        setCurrentImage((prevIndex) => (prevIndex + 1) % product.images.length);
    };

    const prevImage = () => {
        setCurrentImage((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        );
    };

    const handleQuantityChange = (event) => {
        // Update the quantity state when the input changes
        setQuantity(parseInt(event.target.value, 10)); // Parse input value to an integer
    };

    useEffect(() => {

        const getProductDetail = async () => {
            try {
                console.log(id)
                const response = await axios.get(`http://localhost:8000/api/v1/products/${id}`)
                if (response.data.success) {
                    setProduct(response.data.product)
                }
            } catch (error) {

            }
        }

        getProductDetail()
    }, [id])

    if (!product) {
        return (
            <div className="max-w-7x1 mx-auto px-10 py-10">

                <div role="status" className="flex justify-center items-center">
                    <svg
                        aria-hidden="true"
                        className="w-10 h-10 mr-2 text-gray-100 animate-spin fill-[#28844b]"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                        />
                        <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                        />
                    </svg>


                </div>
            </div>
        )
    }

    return (


        <div className="max-w-7xl mx-auto px-10 py-10">
            <MetaData title={`${product.name}`} />
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/2">
                    <div className="w-full ">
                        <img
                            src={product.images[currentImage].image_url}
                            alt={product.name}
                            className="w-full h-auto max-h-96 mx-auto rounded-md"
                        />
                        <div className="flex justify-center mt-2">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}

                                    src={image ? image.image_url : "https://th.bing.com/th/id/OIP.HqdukTSkPU2Fz_5hMj5TcQAAAA?pid=ImgDet&rs=1"}

                                    alt={product.name}
                                    className={`w-12 h-12 border cursor-pointer ${index === currentImage ? 'border-blue-500' : 'border-gray-300'
                                        } ml-2`}
                                    onClick={() => setCurrentImage(index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 mt-4 md:mt-0 md:pl-4">
                    <div className="block m-4">
                        <h1 className="text-2xl font-semibold">{product.name}</h1>
                        <RatingStars ratings={product.rating} />
                    </div>
                    <div className="block m-4">
                        <h1 className="text-small font-semibold">Description</h1>
                        <p className="text-gray-600 mt-2 text-justify">{product.description}</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 flex p-2 shadow-lg border">
                <div className="m-4 w-full flex flex-col md:flex-row items-start md:items-center justify-around space-y-4 md:space-y-0 md:space-x-4">

                    <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                        <label htmlFor="quantity" className="text-lg font-semibold">
                            Quantity:
                        </label>
                        <input
                            onChange={handleQuantityChange}
                            id="quantity"
                            type="number"
                            min="1" step="1"
                            className="shadow-sm border p-2 w-full md:w-auto" />
                    </div>

                    <div className="relative flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                        <label htmlFor="delivery-schedule" className="block text-lg font-semibold">
                            Units:
                        </label>

                        <select
                            className="block appearance-none border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-50"
                            value={unit} onChange={(e) => setUnit(e.target.value)}>
                            <option value="kilograms">Kilograms</option>
                            <option value="tons">Tons</option>
                            {/* Add more options as needed */}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>


                    <div className="relative flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto border">
                        <label htmlFor="delivery-schedule" className="block text-lg font-semibold">
                            Delivery Schedule:
                        </label>
                        <select id="delivery-schedule" value={deliverySchedule} onChange={(e) => setDeliverySchedule(e.target.value)} className="appearance-none border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-50">
                            <option value="One-time">One-time</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            {/* Add more options as needed */}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>

                    <button onClick={ () => addToCart({product, quantity, unit, deliverySchedule,totalPrice: quantity*product.price})} className="w-full md:w-auto bg-[#28844b] hover:bg-[#28844bef] text-white font-bold py-2 px-4 rounded">
                        Add to Cart
                    </button>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-10 px-4">
                <h2 className="text-small font-semibold uppercase py-10">Recent Reviews</h2>
                {
                    reviews?.map((review) => (
                        <Review key={review.userName} reviewer={review.userName} comment={review.comment} rating={review.rating} time={review.timestamp} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductPageById;