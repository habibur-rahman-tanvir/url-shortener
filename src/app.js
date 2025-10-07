const express = require("express");
const authRoutes = require("./routes/auth.routes");
const urlRoutes = require("./routes/url.routes");
const redirectController = require("./controllers/redirect.controller");
const sessionMiddleware = require("./config/session");
const { isAuth } = require("./middlewares/auth.middleware");

const app = express();

app.use(express.json());
app.use(sessionMiddleware);

app.use("/api/auth", authRoutes);
app.use("/api/url", isAuth, urlRoutes);

app.get("/:code", redirectController.redirectUrl);

app.get("/", (req, res) => {
  res.send("Welcome to URL-SHORTENER");
});

module.exports = app;
