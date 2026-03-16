import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <img
          src={product.image_url || 'https://via.placeholder.com/300'}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
        <p className="text-lg font-bold text-green-600 mt-2">Rp {product.price.toLocaleString()}</p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;