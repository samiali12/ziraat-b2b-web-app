import React from 'react';

const products = [
  { id: 1, name: 'Early corn seed A6267', category: 'Cereal Seeds', price: '$19.99', imageUrl: 'https://img.agriexpo.online/images_ag/photo-g/184535-12620659.webp' },
  { id: 2, name: 'Product 2', category: 'Category B', price: '$29.99', imageUrl: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Product 3', category: 'Category A', price: '$24.99', imageUrl: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Product 4', category: 'Category A', price: '$24.99', imageUrl: 'https://via.placeholder.com/150' },
  // Add more products here...
];

const FeaturedProducts = () => {
  return (
    <div className="container max-w-7x1 mx-auto px-4 py-10">
        <h2 className="text-base font-semibold text-center text-gray-700 uppercase py-10">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-lg border">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover rounded-t-lg" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-800 font-semibold">{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
