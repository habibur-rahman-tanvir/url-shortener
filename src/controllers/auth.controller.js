const bcrypt = require("bcryptjs");
const User = require("../models/user.model");

exports.signup = (req, res) => {
  const { fullname, email, password } = req.body;
  const hashed = bcrypt.hashSync(password);
  User.create({ fullname, email, password: hashed }, (err) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    res.status(201).json({ message: "User registered successfully!" });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findByEmail(email, (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
      return;
    }
    if (result.length === 0) {
      res.status(401).json({ message: "Invalid email" });
      return;
    }
    const user = result[0];
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      res.status(401).json({ message: "Invalid password" });
      return;
    }
    req.session.user = {
      id: user.id,
      fullname: user.fullname,
      role: user.role,
    };
    res.json({ message: "Login successful!" });
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.json({ message: "Logged out successfully!" });
};
