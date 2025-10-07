const { rateLimit } = require("express-rate-limit");

exports.limiter = (min = 15, limit = 15) => {
  const limiter = rateLimit({
    windowMs: 1000 * 60 * min,
    limit,
    message: "Too many request from this IP",
  });
  return limiter;
};
