// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from '../ratings/Rating';



const ProductCard = ({ product }) => {



    return (
        <div key={product._id} className="bg-white hover:border-gray-200 p-2 border border-gray-300 rounded-lg shadow-lg">
            <Link to={`/product/${product._id}`}>
                <img src={product.images[0].image_url} alt={product.name} className="w-full h-40 object-cover rounded-lg border-3 shadow-md" />
                <div className="p-2">
                    <div className="flex items-center mb-2">
                        <img src={product.seller?.profilePicture?.image_url} className="w-6 h-6 rounded-3xl" />
                        <h3 className="ml-2 text-base text-gray-800 font-semibold">{product.seller.fullName}</h3>
                    </div>
                    <h3 className="text-ls text-gray-700 font-semibold mb-1">{product.name}</h3>
                    <p className="text-gray-600 mb-1">{product.category}</p>
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-800 text-lg font-semibold mt-4">PKR {product.price}</p>
                        <RatingStars ratings={product.rating} />
                    </div>

                </div>
            </Link>
        </div>
    )
}

export default ProductCard;