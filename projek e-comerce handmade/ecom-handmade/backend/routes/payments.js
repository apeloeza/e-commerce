const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const midtransClient = require('midtrans-client');

// Konfigurasi Midtrans
const midtrans = new midtransClient.Snap({
  isProduction: false, // Set ke true jika produksi
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Redirect ke Midtrans
router.get('/redirect', paymentController.redirectToMidtrans);

// Handle callback dari Midtrans
router.post('/callback', paymentController.handleCallback);

// Inisialisasi pembayaran
router.post('/charge', paymentController.charge);

module.exports = router;