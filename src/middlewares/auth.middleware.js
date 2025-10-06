exports.isAuth = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  next();
};
