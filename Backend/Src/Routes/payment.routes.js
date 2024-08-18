const express = require("express");
const { Authentication } = require("../Middlewares/Auth");
const {
  checkoutRazorpayController,
  paymentVerificationController,
} = require("../Controllers/payment.controller");
const PaymentRoutes = express.Router();

PaymentRoutes.route("/order").post(Authentication, checkoutRazorpayController);
PaymentRoutes.route("/verify").post(
  Authentication,
  paymentVerificationController
);

module.exports = PaymentRoutes;
