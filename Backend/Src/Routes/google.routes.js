const express = require("express");
const GoogleAuthRoutes = express.Router();
const GoogleAuthControllerClass = require("../Controllers/googleauth.controller");

const GoogleController = new GoogleAuthControllerClass();

GoogleAuthRoutes.route("/google").get(GoogleController.googleAuth);
GoogleAuthRoutes.route("/google/callback").get(
  GoogleController.googleAuthCallback
);

module.exports = GoogleAuthRoutes;
