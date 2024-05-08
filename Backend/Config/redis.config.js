const Redis = require("ioredis");
const dotenv = require("dotenv");
dotenv.config();

const redisClient = () => {
  console.log(process.env.DEVELOPMENT_MODE + " Redis Connected");
  return process.env.DEVELOPMENT_MODE === "production"
    ? process.env.REDIS_URL
    : process.env.REDIS_URL_DEV;
};

module.exports.redis = new Redis(redisClient());
