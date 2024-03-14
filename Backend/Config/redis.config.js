const Redis = require("ioredis");

const redisClient = () => {
  console.log("Redis Connected");
  return process.env.REDIS_URL;
};

module.exports.redis = new Redis();
