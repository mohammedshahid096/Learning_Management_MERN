const { ALLOW_ORIGINS_ACCESS } = require("./index");

module.exports = {
  origin: JSON.parse(ALLOW_ORIGINS_ACCESS),
  credentials: true,
};
