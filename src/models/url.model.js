/* eslint-disable comma-dangle */
/* eslint-disable camelcase */
const db = require("../config/db");

// Get user role from user table. value like "free", "plus", "pro"
exports.getRole = (userId, callback) => {
  const roleSql = "SELECT role FROM users WHERE id = ?";
  db.query(roleSql, [userId], (err, result) => {
    if (err || result.length === 0) {
      callback(new Error("User not found!"), null);
    } else {
      const { role } = result[0];
      callback(null, role);
    }
  });
};

// Get number of urls added by a single user
exports.getTotallUrl = (userId, callback) => {
  const countUrlSql = "SELECT COUNT(*) AS total FROM urls WHERE user_id = ?";
  db.query(countUrlSql, [userId], (err, result) => {
    if (err || result.length === 0) {
      callback(new Error("User not found!"), null);
    } else {
      const { total } = result[0];
      callback(null, total);
    }
  });
};

// Get all url list by user id
exports.getAllUrlsByUserId = (userId, callback) => {
  const sql = "SELECT * FROM urls WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err || result.length === 0) {
      callback(err, null);
    } else {
      const urls = result;
      callback(null, urls);
    }
  });
};

// Insert url and short code in urls table
exports.insertUrl = ({ user_id, original_url, short_code }, callback) => {
  const insertSql = "INSERT INTO urls (user_id, original_url, short_code) VALUES (?, ?, ?)";
  db.query(insertSql, [user_id, original_url, short_code], callback);
};

// Get original url by short code
exports.findUrlByCode = (code, callback) => {
  const sql = "SELECT * FROM urls WHERE short_code = ?";
  db.query(sql, [code], (err, result) => {
    if (err || result.length === 0) {
      callback(new Error("Short url not found!"), null);
    } else {
      const url = result[0];
      db.query(
        "UPDATE urls SET visit_count = visit_count + 1 WHERE short_code = ?",
        [code],
        (err2) => {
          if (err2) {
            console.log(err2);
          }
        }
      );
      callback(null, url.original_url);
    }
  });
};

exports.deleteUrlByUrlId = (userId, urlId, callback) => {
  const sql = "DELETE FROM urls WHERE id = ? AND user_id = ?";
  db.query(sql, [urlId, userId], (err, result) => {
    if (err) {
      callback(new Error("Short url not found!"), null);
    } else {
      callback(null, result);
    }
  });
};
