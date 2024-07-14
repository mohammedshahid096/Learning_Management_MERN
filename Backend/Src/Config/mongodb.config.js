const mongoose = require("mongoose");
const { DB_URL, DB_URL_DEV, DEVELOPMENT_MODE } = require("./index");
const logger = require("./applogger.config");

// TODO : function for database connection
const MongoDataBaseConn = async () => {
  try {
    await mongoose.connect(
      DEVELOPMENT_MODE === "production" ? DB_URL : DB_URL_DEV,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    if (DEVELOPMENT_MODE === "development") {
      logger.info("database is connected");
    } else {
      console.log(DEVELOPMENT_MODE + " database is connected");
    }
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = MongoDataBaseConn;
