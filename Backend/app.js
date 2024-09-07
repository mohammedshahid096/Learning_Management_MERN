const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const MongoDataBaseConn = require("./Src/Config/mongodb.config");
const CloudinaryConn = require("./Src/Config/cloudinary.config");
const IndexRoutes = require("./Src/Routes/index.route");
const { DEVELOPMENT_MODE, SESSION_SECRET_KEY } = require("./Src/Config/index");
const corsConfig = require("./Src/Config/cors.config");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const passportConfig = require("./Src/Config/passport.config");
const GoogleAuthRoutes = require("./Src/Routes/google.routes");

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
  const {
    morganFilePath,
    morganFormat,
  } = require("./Src/Config/morgan.config");
  const morgan = require("morgan");
  app.use(morgan(morganFormat.COMBINE, { stream: morganFilePath }));
}

// session and passport session
app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passportConfig.initialize());
app.use(passportConfig.session());

//----------------------------------------
//--------------- Routes -----------------
//----------------------------------------
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Message",
  });
});
// # Google Auth Routes
app.use("/auth", GoogleAuthRoutes);
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
