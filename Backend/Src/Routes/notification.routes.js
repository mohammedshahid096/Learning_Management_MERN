const express = require("express");
const NotificationRoutes = express.Router();
const { Authorization, Authentication } = require("../Middlewares/Auth");
const {
  GetNotificationController,
  UpdateNotificationController,
} = require("../Controllers/notification.controller");

NotificationRoutes.route("/all").get(
  Authentication,
  Authorization("admin", "user"),
  GetNotificationController
);

NotificationRoutes.route("/single/:notificationid").patch(
  Authentication,
  Authorization("admin", "user"),
  UpdateNotificationController
);

module.exports = NotificationRoutes;
