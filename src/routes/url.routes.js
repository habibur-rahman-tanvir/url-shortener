const express = require("express");
const { createShortUrl, getShortUrls, deleteShortUrl } = require("../controllers/url.controller");

const router = express.Router();

router.get("/", getShortUrls);
router.post("/", createShortUrl);
router.delete("/", deleteShortUrl);

module.exports = router;
