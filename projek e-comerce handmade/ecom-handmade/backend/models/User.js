const db = require('../config/db');

class User {
  static getAll(callback) {
    db.all('SELECT * FROM users', callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM users WHERE id = ?', [id], callback);
  }

  static create(user, callback) {
    db.run(
      'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.phone],
      callback
    );
  }

  static update(id, user, callback) {
    db.run(
      'UPDATE users SET name = ?, email = ?, password = ?, phone = ? WHERE id = ?',
      [user.name, user.email, user.password, user.phone, id],
      callback
    );
  }

  static delete(id, callback) {
    db.run('DELETE FROM users WHERE id = ?', [id], callback);
  }
}

module.exports = User;