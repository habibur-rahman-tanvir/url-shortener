const db = require("../config/db");

exports.create = (user, callback) => {
  const sql = "INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)";
  db.query(sql, [user.fullname, user.email, user.password], callback);
};

exports.findByEmail = (email, callback) => {
  db.query("SELECT * FROM users WHERE email = ?", [email], callback);
};
