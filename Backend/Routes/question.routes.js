const express = require("express");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const isCourseEnrolled = require("../Middlewares/CourseAccess");
const {
  AddQuestionController,
  AddAnswerController,
} = require("../Controllers/question.controller");
const QuestionRoutes = express.Router();

QuestionRoutes.route("/add/:coursesDataid").post(
  Authentication,
  Authorization("user", "admin"),
  isCourseEnrolled,
  AddQuestionController
);

QuestionRoutes.route("/add-answer/:coursesDataid").put(
  Authentication,
  Authorization("user", "admin"),
  isCourseEnrolled,
  AddAnswerController
);

module.exports = QuestionRoutes;
