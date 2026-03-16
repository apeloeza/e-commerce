import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'ovo'
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/orders', {
        ...formData,
        total_price: 100000 // Ganti dengan total dari keranjang
      });

      // Redirect ke Midtrans
      window.location.href = `/api/payments/redirect?orderId=${response.data.id}`;
    } catch (err) {
      console.error(err);
      alert('Gagal membuat pesanan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Nama</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nomor Telepon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Alamat</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Metode Pembayaran</label>
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option value="ovo">OVO</option>
            <option value="dana">Dana</option>
            <option value="credit_card">Kartu Kredit</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-purple-500 text-white px-6 py-2 rounded-full hover:bg-purple-600 transition-colors"
        >
          {loading ? 'Memproses...' : 'Bayar Sekarang'}
        </button>
      </form>
    </div>
  );
};

export default Checkout;