const db = require('../config/db');

// Get all orders
exports.getAllOrders = (req, res) => {
  db.all('SELECT * FROM orders', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get order by ID
exports.getOrderById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM orders WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
    res.json(row);
  });
};

// Create order
exports.createOrder = (req, res) => {
  const { user_id, total_price, payment_method, address, phone } = req.body;
  db.run(
    'INSERT INTO orders (user_id, total_price, payment_method, address, phone) VALUES (?, ?, ?, ?, ?)',
    [user_id, total_price, payment_method, address, phone],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, user_id, total_price, payment_method, address, phone });
    }
  );
};

// Update order
exports.updateOrder = (req, res) => {
  const { id } = req.params;
  const { user_id, total_price, payment_method, address, phone, status } = req.body;
  db.run(
    'UPDATE orders SET user_id = ?, total_price = ?, payment_method = ?, address = ?, phone = ?, status = ? WHERE id = ?',
    [user_id, total_price, payment_method, address, phone, status, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
      }
      res.json({ id, user_id, total_price, payment_method, address, phone, status });
    }
  );
};

// Delete order
exports.deleteOrder = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM orders WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Pesanan tidak ditemukan' });
    }
    res.json({ message: 'Pesanan dihapus' });
  });
};