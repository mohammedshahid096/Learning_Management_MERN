const httpErrors = require("http-errors");
const coursesModel = require("../Models/course.model");
const { errorConstant, successConstant } = require("../Utils/constants");
const { redis } = require("../Config/redis.config");
const { isMongooseIdValidation } = require("../JoiSchemas/common.schema");
const reviewModel = require("../Models/review.model");
const {
  ReplyReviewValidation,
  AddReviewValidation,
} = require("../JoiSchemas/course.schema");

module.exports.AddReviewController = async (req, res, next) => {
  try {
    const { courseid } = req.params;

    const { error } = AddReviewValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const isCourseExist = await coursesModel.findById(courseid);
    if (!isCourseExist) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }

    const isAlreadyAdded = await reviewModel.findOne({
      user: req.userid,
      courseid,
    });

    if (isAlreadyAdded) {
      return next(httpErrors.BadRequest(errorConstant.REVIEW_ALREADY_ADDED));
    }

    const { rating, review = "" } = req.body;
    const newReview = new reviewModel({
      courseid,
      user: req.userid,
      rating,
      review,
    });
    await newReview.save();
    // await redis.del()
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.REVIEW_ADDED,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.ReplyReviewController = async (req, res, next) => {
  try {
    const { reviewid } = req.params;

    const { error } = ReplyReviewValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const data = await reviewModel.findByIdAndUpdate(reviewid, req.body, {
      new: true,
    });

    if (!data) {
      return next(httpErrors.NotFound(errorConstant.REIVEW_NOT_FOUND));
    }

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.REPLY_ADDED,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AllReviewsController = async (req, res, next) => {
  try {
    const { courseid } = req.params;
    const data = await reviewModel
      .find({ courseid })
      .sort({ createdAt: -1 })
      .populate("user", "name profile role createdAt");

    // await redis.del()
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
