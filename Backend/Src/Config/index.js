require("dotenv").config();

module.exports = {
  // port
  PORT: process.env.PORT || 8002,

  // development mode
  DEVELOPMENT_MODE: process.env.DEVELOPMENT_MODE || "development",

  // cors
  ALLOW_ORIGINS_ACCESS: process.env.ALLOW_ORIGINS_ACCESS || "[]",

  // databases
  DB_URL: process.env.DB_URL,
  DB_URL_DEV: process.env.DB_URL_DEV,
  REDIS_URL: process.env.REDIS_URL,
  REDIS_URL_DEV: process.env.REDIS_URL_DEV,

  // cloudinary
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRETKEY: process.env.CLOUDINARY_API_SECRETKEY,

  // nodemailer
  NODEMAILER_SERVICE: process.env.NODEMAILER_SERVICE,
  NODEMAILER_HOST: process.env.NODEMAILER_HOST,
  NODEMAILER_PORT: process.env.NODEMAILER_PORT,
  NODEMAILER_USER: process.env.NODEMAILER_USER,
  NODEMAILER_PASS: process.env.NODEMAILER_PASS,

  // razopay
  RAZOPAY_API_KEY: process.env.RAZOPAY_API_KEY,
  RAZOPAY_API_SECRET: process.env.RAZOPAY_API_SECRET,
  RAZOPAY_REDIRECT_URL: process.env.RAZOPAY_REDIRECT_URL,

  // jwt
  // --- verfication--
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  // --- Access Token--
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_KEY_TIME: process.env.ACCESS_TOKEN_KEY_TIME,
  ACCESS_TOKEN_KEY_TIME_COOKIE: process.env.ACCESS_TOKEN_KEY_TIME_COOKIE,
  // --- Refresh Token--
  REFRESH_TOKEN_KEY_TIME: process.env.REFRESH_TOKEN_KEY_TIME,
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  REFRESH_TOKEN_KEY_TIME_COOKIE: process.env.REFRESH_TOKEN_KEY_TIME_COOKIE,

  // ----- google console
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID",
  GOOGLE_CLIENT_SECRET:
    process.env.GOOGLE_CLIENT_SECRET || "YOUR_GOOGLE_SECRET_KEY",
  GOOGLE_CALLBACK_URL:
    process.env.GOOGLE_CALL_BACK_URL ||
    "http://localhost:8001/auth/google/callback",
  SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || "testsecret",
  GOOGLE_SCOPE: [
    "email",
    "profile",
    // "https://www.googleapis.com/auth/calendar.events",
    // "https://www.googleapis.com/auth/calendar",
    // "https://www.googleapis.com/auth/calendar.events.freebusy",
    // "https://www.googleapis.com/auth/gmail.readonly",
  ],
};
