import React from 'react';

const CartItem = ({ item }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
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
      <button className="text-red-500 hover:text-red-700">
        Hapus
      </button>
    </div>
  );
};

export default CartItem;