const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const sessionStore = new MySQLStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const sessionMiddleware = session({
  key: "sid",
  secret: process.env.SECRET_KEY || "session-secret-key",
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * (process.env.EXPIRE_AGE_MIN || 60), // Default max age 60 minutes
    secure: false,
  },
});

module.exports = sessionMiddleware;
