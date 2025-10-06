const express = require("express");
const authRoutes = require("./routes/auth.routes");
const sessionMiddleware = require("./config/session");

const app = express();

app.use(express.json());
app.use(sessionMiddleware);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to URL-SHORTENER");
});

module.exports = app;
