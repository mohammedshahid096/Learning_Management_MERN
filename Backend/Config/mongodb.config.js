const mongoose = require("mongoose");

// TODO : function for database connection
const MongoDataBaseConn = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = MongoDataBaseConn;
