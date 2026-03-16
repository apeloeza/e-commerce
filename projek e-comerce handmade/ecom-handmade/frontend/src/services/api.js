import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Produk
export const getProducts = () => api.get('/products');
export const getProductById = (id) => api.get(`/products/${id}`);

// Keranjang
export const getCart = () => api.get('/cart');
export const addToCart = (product_id, quantity) => api.post('/cart', { product_id, quantity });
export const removeFromCart = (id) => api.delete(`/cart/${id}`);

// Pesanan
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getOrders = () => api.get('/orders');
export const getOrderById = (id) => api.get(`/orders/${id}`);