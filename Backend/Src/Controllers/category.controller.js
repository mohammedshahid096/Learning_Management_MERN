const httpErrors = require("http-errors");
const categoryModel = require("../Models/category.model");
const coursesModel = require("../Models/course.model");
const { errorConstant, successConstant } = require("../Utils/constants");
// const { redis } = require("../Config/redis.config");
const { AddCategoryValidation } = require("../JoiSchemas/category.schema");

module.exports.CreateNewCategory = async (req, res, next) => {
  try {
    const { error } = AddCategoryValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const newCategory = new categoryModel({
      name: req.body.name,
    });
    await newCategory.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.CATEGORY_CREATED_SUCCESS,
      data: newCategory,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.GetAllCategories = async (req, res, next) => {
  try {
    const data = await categoryModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.GetSingleCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const data = await categoryModel.findById(categoryId);
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.CATEGORY_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.UpdateCategory = async (req, res, next) => {
  try {
    const { error } = AddCategoryValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { categoryId } = req.params;
    const data = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name: req.body.name },
      { new: true }
    );
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.CATEGORY_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.COURSE_UPDATED_SUCCESS,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.DeleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const isExist = await coursesModel
      .find({ categories: categoryId })
      .select("name");

    if (isExist.length > 0) {
      return next(
        httpErrors.BadRequest(
          `please remove category from course : ${isExist[0]["name"]}`
        )
      );
    }

    const data = await categoryModel.findByIdAndDelete(categoryId);
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.CATEGORY_NOT_FOUND));
    }
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.CATEGORY_DELETED_SUCCESS,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
