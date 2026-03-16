const db = require('../config/db');

class Order {
  static getAll(callback) {
    db.all('SELECT * FROM orders', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM orders WHERE id = ?', [id], callback);
  }

  static create(order, callback) {
    db.run(
      'INSERT INTO orders (user_id, total_price, payment_method, address, phone) VALUES (?, ?, ?, ?, ?)',
      [order.user_id, order.total_price, order.payment_method, order.address, order.phone],
      callback
    );
  }

  static update(id, order, callback) {
    db.run(
      'UPDATE orders SET user_id = ?, total_price = ?, payment_method = ?, address = ?, phone = ?, status = ? WHERE id = ?',
      [order.user_id, order.total_price, order.payment_method, order.address, order.phone, order.status, id],
      callback
    );
  }

  static delete(id, callback) {
    db.run('DELETE FROM orders WHERE id = ?', [id], callback);
  }
}

module.exports = Order;