const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 6);

module.exports = nanoid;
