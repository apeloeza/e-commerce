const db = require('../config/db');

class Product {
  static getAll(callback) {
    db.all('SELECT * FROM products', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM products WHERE id = ?', [id], callback);
  }

  static create(product, callback) {
    db.run(
      'INSERT INTO products (name, description, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
      [product.name, product.description, product.price, product.stock, product.category, product.image_url],
      callback
    );
  }

  static update(id, product, callback) {
    db.run(
      'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
      [product.name, product.description, product.price, product.stock, product.category, product.image_url, id],
      callback
    );
  }

  static delete(id, callback) {
    db.run('DELETE FROM products WHERE id = ?', [id], callback);
  }
}

module.exports = Product;