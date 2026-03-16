import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get('/api/cart')
      .then((res) => {
        setCartItems(res.data);
        const sum = res.data.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
        setTotal(sum);
      })
      .catch((err) => console.error(err));
  }, []);

  const removeFromCart = (id) => {
    axios.delete(`/api/cart/${id}`)
      .then(() => {
        setCartItems(cartItems.filter(item => item.id !== id));
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Keranjang Belanja</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center text-lg">Keranjang Anda kosong.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center">
                <img
                  src={item.product.image_url || 'https://via.placeholder.com/100'}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p>Rp {item.product.price.toLocaleString()}</p>
                  <p>Jumlah: {item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Hapus
              </button>
            </div>
          ))}
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold">Total: Rp {total.toLocaleString()}</h2>
            <button
              onClick={() => window.location.href = '/checkout'}
              className="mt-4 bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition-colors"
            >
              Lanjutkan ke Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;