const Redis = require("ioredis");
const dotenv = require("dotenv");
const logger = require("./applogger.config");
dotenv.config();

const redisClient = () => {
  if (process.env.DEVELOPMENT_MODE === "development") {
    logger.info("development Redis is connected");
  } else {
    console.log("production Redis is connected");
  }
  return process.env.DEVELOPMENT_MODE === "production"
    ? process.env.REDIS_URL
    : process.env.REDIS_URL_DEV;
};

module.exports.redis = new Redis(redisClient());
