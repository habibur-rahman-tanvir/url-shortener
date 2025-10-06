const express = require("express");
const authController = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);

router.get("/profile", isAuth, (req, res) => {
  res.json({ user: req.session.user });
});

module.exports = router;
