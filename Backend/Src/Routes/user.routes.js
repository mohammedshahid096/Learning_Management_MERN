const express = require("express");
const {
  CreateUserController,
  ActivateUserController,
  LoginUserController,
  LogoutUserController,
  MyAccountController,
  UpdateAccessTokenController,
  UpdateAccountController,
  UpdatePasswordController,
  UserAvatarController,
  SocialAuth,
  UsersListController,
  UpdateUserRoleController,
  DeleteUserController,
  AdimGetSingleUserDetail,
  AdminAddUserCourseController,
  AdminDeleteUserController,
  userCoursesListController,
  GetUserIdByQueryController,
  ForgotPasswordSendTokenController,
  ResetPasswordController,
} = require("../Controllers/user.controller");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const { UserProfileUpload } = require("../Middlewares/Multer");
const { UserMyOrderController } = require("../Controllers/order.controller");
const UserRoutes = express.Router();

// ### Register related routes
UserRoutes.route("/register").post(CreateUserController);
UserRoutes.route("/verify").post(ActivateUserController);

// ### Login related routes
UserRoutes.route("/login").post(LoginUserController);
UserRoutes.route("/logout").get(Authentication, LogoutUserController);

// ### Socail Auth logins
UserRoutes.route("/socialAuth").post(SocialAuth);

// ### Refresh Access Token
UserRoutes.route("/refresh_token").get(UpdateAccessTokenController);

// ### user info
UserRoutes.route("/me")
  .get(Authentication, MyAccountController)
  .put(Authentication, Authorization("user", "admin"), UpdateAccountController);

UserRoutes.route("/me/update-password").put(
  Authentication,
  Authorization("user", "admin"),
  UpdatePasswordController
);

UserRoutes.route("/password/forgot").post(ForgotPasswordSendTokenController);
UserRoutes.route("/password/reset-password/:token").put(
  ResetPasswordController
);

UserRoutes.route("/me/courses").get(
  Authentication,
  Authorization("user"),
  userCoursesListController
);
UserRoutes.route("/me/orders").get(
  Authentication,
  Authorization("user"),
  UserMyOrderController
);
UserRoutes.route("/me/avatar").put(
  Authentication,
  Authorization("user", "admin"),
  UserProfileUpload,
  UserAvatarController
);

// ### Admin
UserRoutes.route("/users/all").get(
  Authentication,
  Authorization("admin", "teacher"),
  UsersListController
);

UserRoutes.route("/users/:id")
  .get(
    Authentication,
    Authorization("admin", "teacher"),
    AdimGetSingleUserDetail
  )
  .patch(Authentication, Authorization("admin"), AdminAddUserCourseController)
  .delete(Authentication, Authorization("admin"), AdminDeleteUserController);

UserRoutes.route("/role/:userid").patch(
  Authentication,
  Authorization("admin"),
  UpdateUserRoleController
);

UserRoutes.route("/delete/:userid").delete(
  Authentication,
  Authorization("admin"),
  DeleteUserController
);

// ### Public
UserRoutes.route("/public/user-query").get(
  Authentication,
  GetUserIdByQueryController
);

module.exports = UserRoutes;
