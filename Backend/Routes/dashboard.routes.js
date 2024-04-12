const express = require("express");
const {
  AdminUsersDashboardController,
} = require("../Controllers/dashboard.controller");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const DashboardRoutes = express.Router();

DashboardRoutes.route("/admin/users").get(
  //   Authentication,
  //   Authorization("admin"),
  AdminUsersDashboardController
);

module.exports = DashboardRoutes;
