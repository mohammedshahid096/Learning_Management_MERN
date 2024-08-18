const express = require("express");
const {
  Authorization,
  Authentication,
  AuthenticationByPass,
} = require("../Middlewares/Auth");
const {
  UploadCourseController,
  GetSpecificCompleteCourse,
  EditCourseController,
  AllCoursesWithout,
  GetUserSingleCourse,
  AllCoursesList,
  DeleteCourseController,
  UpdateCoureDataController,
  SearchedCoursesController,
  RelatedCoursesController,
} = require("../Controllers/course.controller");
const CourseRoutes = express.Router();

CourseRoutes.route("/uploadCourse").post(
  Authentication,
  Authorization("admin"),
  UploadCourseController
);

// ### single course related without purchase
CourseRoutes.route("/single/:courseid")
  .get(AuthenticationByPass, GetSpecificCompleteCourse)
  .put(Authentication, Authorization("admin"), EditCourseController)
  .delete(Authentication, Authorization("admin"), DeleteCourseController);

CourseRoutes.route("/coursedata/single/:coursedataID").put(
  Authentication,
  Authorization("admin"),
  UpdateCoureDataController
);

CourseRoutes.route("/courses/list").get(
  Authentication,
  Authorization("admin", "user", "teacher"),
  AllCoursesList
);

CourseRoutes.route("/all").get(AllCoursesWithout);

// search courses
CourseRoutes.route("/search").get(SearchedCoursesController);
CourseRoutes.route("/related").get(RelatedCoursesController);

// ### Purchased Courses
CourseRoutes.route("/course-single-content/:courseid/:contentid").get(
  Authentication,
  Authorization("user", "admin"),
  GetUserSingleCourse
);

module.exports = CourseRoutes;
