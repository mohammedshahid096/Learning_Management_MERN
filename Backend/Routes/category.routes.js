const express = require("express");
const { Authorization, Authentication } = require("../Middlewares/Auth");
const {
  CreateNewCategory,
  GetAllCategories,
  GetSingleCategory,
  UpdateCategory,
} = require("../Controllers/category.controller");

const CategoriesRoutes = express.Router();

CategoriesRoutes.route("/add").post(
  Authentication,
  Authorization("admin"),
  CreateNewCategory
);

CategoriesRoutes.route("/all").get(Authentication, GetAllCategories);

CategoriesRoutes.route("/single/:categoryId")
  .get(Authentication, GetSingleCategory)
  .put(Authentication, Authorization("admin"), UpdateCategory);

module.exports = CategoriesRoutes;
