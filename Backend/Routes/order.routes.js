const express = require("express");
const OrderRoutes = express.Router();

const { Authentication, Authorization } = require("../Middlewares/Auth");
const { CreateOrderController } = require("../Controllers/order.controller");

OrderRoutes.route("/addnew").post(
  Authentication,
  Authorization("admin", "user"),
  CreateOrderController
);

module.exports = OrderRoutes;
