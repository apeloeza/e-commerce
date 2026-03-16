const db = require('../config/db');
const midtrans = require('midtrans-client');
const { generateOrderId } = require('../utils/generateOrderId');

// Redirect ke Midtrans
exports.redirectToMidtrans = (req, res) => {
  const { orderId } = req.query;

  // Ambil data pesanan dari database
  db.get('SELECT * FROM orders WHERE id = ?', [orderId], (err, order) => {
    if (err || !order) {
      return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
    }

    const params = {
      transaction_details: {
        order_id: order.id,
        gross_amount: order.total_price
      },
      customer_details: {
        first_name: order.name,
        email: order.email,
        phone: order.phone
      },
      payment_type: order.payment_method
    };

    midtrans.createTransaction(params, (err, transaction) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.redirect(transaction.redirect_url);
    });
  });
};

// Handle callback dari Midtrans
exports.handleCallback = (req, res) => {
  const transactionStatus = req.body.transaction_status;
  const orderId = req.body.order_id;

  if (transactionStatus === 'settlement') {
    // Update status pesanan
    db.run('UPDATE orders SET status = ? WHERE id = ?', ['paid', orderId], (err) => {
      if (err) {
        console.error('Gagal update status pesanan:', err.message);
      }
    });
  }

  res.status(200).send('OK');
};

// Inisialisasi pembayaran
exports.charge = (req, res) => {
  const { orderId, amount, paymentMethod } = req.body;

  const params = {
    transaction_details: {
      order_id: orderId,
      gross_amount: amount
    },
    customer_details: {
      first_name: 'Customer',
      email: 'customer@example.com'
    },
    payment_type: paymentMethod
  };

  midtrans.createTransaction(params, (err, transaction) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(transaction);
  });
};