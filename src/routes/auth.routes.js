const express = require("express");
const { limiter } = require("../utils/rateLimiter");

const authController = require("../controllers/auth.controller");
const { isAuth } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/signup", limiter(15, 4), authController.signup);
router.post("/login", limiter(15, 15), authController.login);
router.post("/logout", authController.logout);

router.get("/profile", isAuth, (req, res) => {
  res.json({ user: req.session.user });
});

module.exports = router;
