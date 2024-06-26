const express = require("express");
const {
  AdminUsersDashboardController,
  AdminCourseDashboardController,
} = require("../Controllers/dashboard.controller");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const DashboardRoutes = express.Router();

DashboardRoutes.route("/admin/users").get(
  Authentication,
  Authorization("admin", "teacher"),
  AdminUsersDashboardController
);
DashboardRoutes.route("/admin/courses").get(
  Authentication,
  Authorization("admin", "teacher"),
  AdminCourseDashboardController
);

module.exports = DashboardRoutes;
