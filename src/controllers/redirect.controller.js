const UrlModel = require("../models/url.model");

exports.redirectUrl = (req, res) => {
  const { code } = req.params;
  UrlModel.findUrlByCode(code, (err, originalUrl) => {
    if (err) {
      res.redirect("/");
      return;
    }
    res.redirect(originalUrl);
  });
};
