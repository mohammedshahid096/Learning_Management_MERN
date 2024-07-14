const fs = require("fs");
const path = require("path");

module.exports.morganFilePath = fs.createWriteStream(
  path.join(__dirname, "../../", "app-http.log"),
  {
    flags: "a",
  }
);

module.exports.morganFormat = {
  COMBINE: "combined",
  TINY: "tiny",
  DEV: "dev",
  SHORT: "short",
  COMMON: "common",
};
