const express = require("express");
const OrderRoutes = express.Router();

const { Authentication, Authorization } = require("../Middlewares/Auth");
const {
  CreateOrderController,
  AdminAllOrdersController,
  AdminSingleOrderDetailedController,
} = require("../Controllers/order.controller");

OrderRoutes.route("/addnew").post(
  Authentication,
  Authorization("admin", "user"),
  CreateOrderController
);
OrderRoutes.route("/admin/allorders").get(
  Authentication,
  Authorization("admin", "teacher"),
  AdminAllOrdersController
);

OrderRoutes.route("/admin/:orderid").get(
  Authentication,
  Authorization("admin", "teacher"),
  AdminSingleOrderDetailedController
);

module.exports = OrderRoutes;
