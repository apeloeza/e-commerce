const jwt = require('jsonwebtoken');
const db = require('../config/db');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer token
  if (!token) {
    return res.status(401).json({ message: 'Akses ditolak: Token tidak ditemukan' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Akses ditolak: Token tidak valid' });
    }

    // Cek apakah user ada di database
    db.get('SELECT * FROM users WHERE id = ?', [decoded.userId], (err, user) => {
      if (err || !user) {
        return res.status(401).json({ message: 'Akses ditolak: User tidak ditemukan' });
      }
      req.user = user;
      next();
    });
  });
};

module.exports = auth;