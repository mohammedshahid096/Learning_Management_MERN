const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const MongoDataBaseConn = require("./Src/Config/mongodb.config");
const CloudinaryConn = require("./Src/Config/cloudinary.config");
const IndexRoutes = require("./Src/Routes/index.routes");
const { DEVELOPMENT_MODE, PORT } = require("./Src/Config/index");
const { morganFilePath, morganFormat } = require("./Src/Config/morgan.config");
const corsConfig = require("./Src/Config/cors.config");
const { sendMail } = require("./Src/Utils/SendMail");

const app = express();

//----------------------------------------
//------------ config --------------------
//----------------------------------------

// connecting to db
MongoDataBaseConn();
// cloudinary config
CloudinaryConn();

// using  parsing dependencies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// cors config
app.use(cors(corsConfig));
// morgan
if (DEVELOPMENT_MODE === "development") {
  app.use(morgan(morganFormat.COMBINE, { stream: morganFilePath }));
}

//----------------------------------------
//--------------- Routes -----------------
//----------------------------------------
app.get("/", (req, res) => {
  sendMail();
  res.status(200).json({
    success: true,
    message: "Welcome Message",
  });
});
app.use("/api/v1/", IndexRoutes);

//----------------------------------------
//--------------- others -----------------
//----------------------------------------
// if routes not found
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

module.exports = app;
