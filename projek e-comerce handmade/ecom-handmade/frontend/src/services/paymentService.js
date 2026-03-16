import axios from 'axios';

export const initiatePayment = async (orderId, amount, paymentMethod) => {
  const response = await axios.post('/api/payments/charge', {
    orderId,
    amount,
    paymentMethod
  });
  return response.data;
};