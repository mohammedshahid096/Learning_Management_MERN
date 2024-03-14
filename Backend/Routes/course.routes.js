const express = require("express");
const { Authorization, Authentication } = require("../Middlewares/Auth");
const {
  UploadCourseController,
  GetSpecificCompleteCourse,
  EditCourseController,
  AllCoursesWithout,
  GetUserSingleCourse,
} = require("../Controllers/course.controller");
const CourseRoutes = express.Router();

CourseRoutes.route("/uploadCourse").post(
  Authentication,
  Authorization("admin"),
  UploadCourseController
);

// ### single course related without purchase
CourseRoutes.route("/single/:courseid")
  .get(Authentication, GetSpecificCompleteCourse)
  .put(Authentication, Authorization("admin"), EditCourseController);

CourseRoutes.route("/all").get(Authentication, AllCoursesWithout);

// ### Purchased Courses
CourseRoutes.route("/course-single-content/:courseid").get(
  Authentication,
  Authorization("user", "admin"),
  GetUserSingleCourse
);

module.exports = CourseRoutes;
