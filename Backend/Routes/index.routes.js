const express = require("express");
const IndexRoutes = express.Router();
const UserRoutes = require("./user.routes");
const TestRouter = require("./test.routes");
const CourseRoutes = require("./course.routes");
const QuestionRoutes = require("./question.routes");
const ReviewRoutes = require("./review.routes");
const OrderRoutes = require("./order.routes");
const NotificationRoutes = require("./notification.routes");
const CategoriesRoutes = require("./category.routes");
const DashboardRoutes = require("./dashboard.routes");
const PaymentRoutes = require("./payment.routes");

// # User routes
IndexRoutes.use("/user", UserRoutes);

// # Course Routes
IndexRoutes.use("/course", CourseRoutes);

// # Category Routes
IndexRoutes.use("/category", CategoriesRoutes);

// # Question Routes
IndexRoutes.use("/question", QuestionRoutes);

// # Review Routes
IndexRoutes.use("/review", ReviewRoutes);

// # Order Routes
IndexRoutes.use("/order", OrderRoutes);

// # Notification Routes
IndexRoutes.use("/notification", NotificationRoutes);

// # Dashboard Routes
IndexRoutes.use("/dashboard", DashboardRoutes);

// # Payment Routes
IndexRoutes.use("/payment", PaymentRoutes);

IndexRoutes.use("/test", TestRouter);

module.exports = IndexRoutes;
