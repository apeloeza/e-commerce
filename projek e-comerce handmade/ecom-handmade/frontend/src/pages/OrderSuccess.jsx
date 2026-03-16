import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
        <span className="text-4xl text-green-600">✓</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Pesanan Anda Berhasil!</h1>
      <p className="text-gray-600 mb-8">Terima kasih telah membeli produk handmade kami.</p>
      <Link to="/" className="bg-purple-500 text-white px-6 py-3 rounded-full hover:bg-purple-600 transition-colors">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default OrderSuccess;