// ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
    return (
        <div key={product._id} className="bg-white rounded-lg shadow-lg border">
            <Link to={`/product/${product._id}`}>
                <img src={product.images[0].image_url} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-2">{product.category}</p>
                    <p className="text-gray-800 font-semibold">{product.price}</p>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard;