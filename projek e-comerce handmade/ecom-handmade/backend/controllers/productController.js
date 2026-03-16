const db = require('../config/db');

// Get all products
exports.getAllProducts = (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

// Get product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params;
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json(row);
  });
};

// Create product
exports.createProduct = (req, res) => {
  const { name, description, price, stock, category, image_url } = req.body;
  db.run(
    'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
    [name, description, price, stock, category, image_url],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, name, description, price, stock, category, image_url });
    }
  );
};

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category, image_url } = req.body;
  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
    [name, description, price, stock, category, image_url, id],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
      }
      res.json({ id, name, description, price, stock, category, image_url });
    }
  );
};

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params;
  db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    res.json({ message: 'Produk dihapus' });
  });
};