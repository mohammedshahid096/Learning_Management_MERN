const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoDataBaseConn = require("./Config/mongodb.config");
const CloudinaryConn = require("./Config/cloudinary.config");
const IndexRoutes = require("./Routes/index.routes");

const app = express();
// env config
dotenv.config();

// connecting to db
MongoDataBaseConn();
// cloudinary config
CloudinaryConn();

// using  parsing dependencies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// cors config

app.use(
  cors({
    origin: JSON.parse(process.env.ALLOW_ORIGINS_ACCESS),
    // origin: "https://learning-management-mern.vercel.app",
    credentials: true,
  })
);

// indexroute
app.use("/api/v1/", IndexRoutes);
app.use("*", (req, res) => {
  res.status(500).json({
    success: false,
    statusCode: 500,
    url: req.baseUrl,
    type: req.method,
    message: "API not found",
  });
});

// response for error message
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    statusCode: err.status || 500,
    message: err.message || "internal server error",
    stack: err.stack || "not present",
  });
});

// server listening
app.listen(process.env.PORT || 8001, () => {
  console.log(`MODE : ${process.env.DEVELOPMENT_MODE}`);
  console.log(
    "server is running on:  http://localhost:" + process.env.PORT || 8001
  );
});
