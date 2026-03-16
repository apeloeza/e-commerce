const generateOrderId = () => {
  const now = new Date();
  const timestamp = now.getTime().toString();
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `ORD-${timestamp.slice(-6)}-${random}`;
};

module.exports = { generateOrderId };