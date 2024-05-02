const express = require("express");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const isCourseEnrolled = require("../Middlewares/CourseAccess");
const {
  AddReviewController,
  ReplyReviewController,
  AllReviewsController,
} = require("../Controllers/review.controller");

const ReviewRoutes = express.Router();

ReviewRoutes.route("/add/:courseid").post(
  Authentication,
  Authorization("user", "admin"),
  isCourseEnrolled,
  AddReviewController
);

ReviewRoutes.route("/all/:courseid").get(AllReviewsController);

ReviewRoutes.route("/reply/:reviewid").post(
  Authentication,
  Authorization("admin"),
  ReplyReviewController
);
module.exports = ReviewRoutes;
