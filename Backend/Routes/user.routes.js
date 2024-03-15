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
} = require("../Controllers/user.controller");
const { Authentication, Authorization } = require("../Middlewares/Auth");
const { SocailAuthValidation } = require("../JoiSchemas/user.schema");
const { UserProfileUpload } = require("../Middlewares/Multer");
const UserRoutes = express.Router();

// ### Register related routes
UserRoutes.route("/register").post(CreateUserController);
UserRoutes.route("/verify").post(ActivateUserController);

// ### Login related routes
UserRoutes.route("/login").post(LoginUserController);
UserRoutes.route("/logout").get(Authentication, LogoutUserController);

// ### Socail Auth logins
UserRoutes.route("/socialAuth").post(SocailAuthValidation);

// ### Refresh Access Token
UserRoutes.route("/refresh_token").get(UpdateAccessTokenController);

// ### user info
UserRoutes.route("/me")
  .get(Authentication, MyAccountController)
  .put(Authentication, Authorization("user", "admin"), UpdateAccountController);

UserRoutes.route("/me/update-password").put(
  Authentication,
  Authorization("user"),
  UpdatePasswordController
);
UserRoutes.route("/me/avatar").put(
  Authentication,
  Authorization("user"),
  UserProfileUpload,
  UserAvatarController
);

module.exports = UserRoutes;
