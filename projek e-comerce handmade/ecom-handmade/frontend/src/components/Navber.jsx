import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-purple-600">Handmade Shop</div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-purple-600">Beranda</Link>
          <Link to="/cart" className="text-gray-700 hover:text-purple-600">Keranjang</Link>
          <button className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-colors">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;