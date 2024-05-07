const express = require("express");
const OrderRoutes = express.Router();

const { Authentication, Authorization } = require("../Middlewares/Auth");
const {
  CreateOrderController,
  AdminAllOrdersController,
} = require("../Controllers/order.controller");

OrderRoutes.route("/addnew").post(
  Authentication,
  Authorization("admin", "user"),
  CreateOrderController
);
OrderRoutes.route("/admin/allorders").post(
  Authentication,
  Authorization("admin"),
  AdminAllOrdersController
);

module.exports = OrderRoutes;
