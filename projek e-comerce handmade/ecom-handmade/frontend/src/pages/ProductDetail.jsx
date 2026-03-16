import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = () => {
    axios.post('/api/cart', {
      product_id: product.id,
      quantity
    })
      .then(() => {
        alert('Produk berhasil ditambahkan ke keranjang!');
        navigate('/cart');
      })
      .catch((err) => console.error(err));
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={product.image_url || 'https://via.placeholder.com/500'}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-2xl font-bold text-green-600 mt-4">Rp {product.price.toLocaleString()}</p>
          <div className="mt-6">
            <label className="block text-gray-700">Jumlah:</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              min="1"
              className="border rounded p-2 mt-1"
            />
          </div>
          <button
            onClick={addToCart}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;