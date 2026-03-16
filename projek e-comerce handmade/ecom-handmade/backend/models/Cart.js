const db = require('../config/db');

class Cart {
  static getAll(callback) {
    db.all('SELECT c.id, c.product_id, c.quantity, p.name, p.price, p.image_url FROM cart c JOIN products p ON c.product_id = p.id', callback);
  }

  static addToCart(product_id, quantity, callback) {
    db.run('INSERT INTO cart (product_id, quantity) VALUES (?, ?)', [product_id, quantity], callback);
  }

  static removeFromCart(id, callback) {
    db.run('DELETE FROM cart WHERE id = ?', [id], callback);
  }
}

module.exports = Cart;