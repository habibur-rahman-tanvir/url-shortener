/* eslint-disable comma-dangle */
const UrlModel = require("../models/url.model");
const nanoid = require("../utils/generateShortCode");

// Create short url with original url
exports.createShortUrl = (req, res) => {
  const { originalUrl } = req.body;
  const userId = req.session.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  UrlModel.getRole(userId, (err, role) => {
    if (err) {
      res.status(401).json({ error: err.message });
      return;
    }
    UrlModel.getTotallUrl(userId, (err2, totall) => {
      if (err) {
        res.status(401).json({ error: err2.message });
        return;
      }
      if (role === "free" && totall >= process.env.FREE_URL_LIMIT) {
        res.status(403).json({ message: "Free plan limit reached!" });
        return;
      }
      // Insert new url
      const shortCode = nanoid();
      UrlModel.insertUrl(
        { user_id: userId, original_url: originalUrl, short_code: shortCode },
        (err3) => {
          if (err3) {
            res.status(500).json({ error: err2 });
            return;
          }
          res.json({ short_url: `${req.headers.host}/${shortCode}` });
        }
      );
    });
  });
};

//  Get all urls list
exports.getShortUrls = (req, res) => {
  const userId = req.session.user?.id;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  UrlModel.getAllUrlsByUserId(userId, (err, urls) => {
    if (err) {
      res.status(401).json({ error: err.message });
      return;
    }
    UrlModel.getRole(userId, (err2, role) => {
      if (err) {
        res.status(401).json({ error: err2.message });
        return;
      }
      let urls2 = { ...urls };
      if (role !== "pro" && urls2.length !== 0) {
        urls2 = urls.map((url) => {
          const url2 = { ...url };
          delete url2.visit_count;
          return url2;
        });
      }
      res.json(urls2);
    });
  });
};

exports.deleteShortUrl = (req, res) => {
  const userId = req.session.user?.id;
  const { urlId } = req.body;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  UrlModel.deleteUrlByUrlId(userId, urlId, (err) => {
    if (err) {
      res.status(401).json({ error: err.message });
      return;
    }
    res.json({ message: "Url deleted successfully." });
  });
};
