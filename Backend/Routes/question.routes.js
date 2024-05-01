const express = require("express");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const isCourseEnrolled = require("../Middlewares/CourseAccess");
const {
  AddQuestionController,
  AddAnswerController,
  DeleteQuestionController,
} = require("../Controllers/question.controller");
const QuestionRoutes = express.Router();

QuestionRoutes.route("/add/:coursesDataid").post(
  Authentication,
  Authorization("user", "admin"),
  isCourseEnrolled,
  AddQuestionController
);

QuestionRoutes.route("/add-answer/:questionId").put(
  Authentication,
  Authorization("user", "admin"),
  isCourseEnrolled,
  AddAnswerController
);

QuestionRoutes.route("/delete/:questionId").delete(
  Authentication,
  Authorization("teacher", "admin"),
  DeleteQuestionController
);

module.exports = QuestionRoutes;
