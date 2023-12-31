import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ product, imageSrc, productName, quantity, unitPrice, totalPrice }) => {

  return (
    <tr>
      <td className="hidden pb-4 md:table-cell">
        <a href="#">
          <img src={imageSrc} className="w-20 rounded" alt="Thumbnail" />
        </a>
      </td>
      <td>
        <a href="#">
          <p className="mb-2 md:ml-4">{productName}</p>
          <form action="" method="POST">
            <button type="submit" className="text-gray-700 md:ml-4">
              <small>(Remove item)</small>
            </button>
          </form>
        </a>
      </td>
      <td className="justify-center md:justify-end md:flex mt-6">
        <div className="w-20 h-10">
          <div className="relative flex flex-row w-full h-8">
            <input
              type="number"
              value={quantity}
              className="w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black"
            />
          </div>
        </div>
      </td>
      <td className="hidden text-right md:table-cell">
        <span className="text-sm lg:text-base font-medium">{unitPrice}</span>
      </td>
      <td className="text-right">
        <span className="text-sm lg:text-base font-medium">{totalPrice}</span>
      </td>
    </tr>
  );
};

export default CartItem;