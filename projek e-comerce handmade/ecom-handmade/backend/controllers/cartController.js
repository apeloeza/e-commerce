const db = require('../config/db');

// Get cart items
exports.getCart = (req, res) => {
  db.all('SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url FROM cart c JOIN products p ON c.product_id = p.id', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Add to cart
exports.addToCart = (req, res) => {
  const { product_id, quantity } = req.body;
  db.run(
    'INSERT INTO cart (product_id, quantity) VALUES (?, ?)',
    [product_id, quantity],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, product_id, quantity });
    }
  );
};

// Remove from cart
exports.removeFromCart = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM cart WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Keranjang tidak ditemukan' });
    }
    res.json({ message: 'Produk dihapus dari keranjang' });
  });
};