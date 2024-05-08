const mongoose = require("mongoose");

// TODO : function for database connection
const MongoDataBaseConn = async () => {
  try {
    await mongoose.connect(
      process.env.DEVELOPMENT_MODE === "production"
        ? process.env.DB_URL
        : process.env.DB_URL_DEV,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
      }
    );
    console.log(process.env.DEVELOPMENT_MODE + " database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = MongoDataBaseConn;
