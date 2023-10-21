import { useParams } from "react-router-dom"
import { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../features/productCRUDFeatures/productCRUDSlice";
import MetaData from "../../app/MetaData";
import RatingStars from "../ratings/Rating";
import ReviewsSection from "../ratings/Review";
import Review from "../ratings/Review";



const ProductPageById = () => {


    const fakeReviews = [
        {
            userName: 'John Doe',
            userAvatar: 'url-to-avatar-image',
            comment: "Discover the future of bountiful harvests with our premium-grade corn seeds. Specially selected for their superior quality and performance, our corn seeds are the top choice for farmers and growers. These seeds are meticulously bred and tested to ensure disease resistance, high yield potential, and exceptional taste. Whether you're a commercial farmer or a gardening enthusiast, our corn seeds will help you cultivate vibrant, healthy corn crops. Elevate your agricultural endeavors with the confidence that comes from planting the best. Buy our corn seeds today and watch your fields flourish",
            rating: 5,
            timestamp: new Date('2023-09-15T12:00:00Z').getTime(), // Use a timestamp in milliseconds
        },
        {
            userName: 'Jane Smith',
            userAvatar: 'url-to-avatar-image',
            comment: 'Great value for the price.',
            rating: 4,
            timestamp: new Date('2023-09-14T14:30:00Z').getTime(),
        },
        {
            userName: 'Alice Johnson',
            userAvatar: 'url-to-avatar-image',
            comment: 'Not bad, but could be better.',
            rating: 3,
            timestamp: new Date('2023-09-12T09:15:00Z').getTime(),
        },
        // Add more fake reviews as needed
    ];

    const dispatch = useDispatch()
    const { id } = useParams(); // Get the product id from the URL params
    const [product, setProduct] = useState(null); // Initialize the product state to null
    let { isLoading, isSuccess, isError, products } = useSelector(state => state.product)

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

    useEffect(() => {
        dispatch(getProductById(id))
        if (isSuccess) {
            console.log(products.product)
            setProduct(products.product)
        }
    }, [id, dispatch, isSuccess])

    if (isLoading || isError || !product) {
        return (
            <div className="container max-w-7x1 mx-auto px-4 py-10">

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


        <div className="max-w-7xl mx-auto px-4 py-10">
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


                    <div className="m-4">
                        <span className="text-2xl font-semibold">${product.price}</span>
                        <button className="ml-4 bg-[#28844b] hover:bg-[#28844bef] text-white font-bold py-2 px-4 rounded">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>


            <div className="max-w-7xl mx-auto mt-10 px-4">
                <h2 className="text-small font-semibold uppercase py-10">Recent Reviews</h2>
                {
                    fakeReviews.map( (review) => (
                        <Review key={review.userName} reviewer={review.userName} comment={review.comment} rating={review.rating} time={review.timestamp} />
                    ))
                }
            </div>
        </div>
    )
}

export default ProductPageById;