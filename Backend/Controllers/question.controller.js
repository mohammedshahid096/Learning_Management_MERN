const httpErrors = require("http-errors");
const coursesModel = require("../Models/course.model");
const courseDataModel = require("../Models/coursedata.model");
const { errorConstant, successConstant } = require("../Utils/constants");
const { redis } = require("../Config/redis.config");
const questionModel = require("../Models/question.model");
const { isMongooseIdValidation } = require("../JoiSchemas/common.schema");

// adding a question
module.exports.AddQuestionController = async (req, res, next) => {
  try {
    const { coursesDataid } = req.params;

    const { error } = isMongooseIdValidation(coursesDataid);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const isCoursesDataExist = await courseDataModel.findById(coursesDataid);
    if (!isCoursesDataExist) {
      return next(httpErrors.NotFound(errorConstant.COURSES_DATA_NOT_FOUND));
    }

    const { courseid, question } = req.body;
    const newQuestion = new questionModel({
      courseid,
      coursesData_id: coursesDataid,
      askedBy: req.userid,
      question,
    });
    await newQuestion.save();
    // await redis.del()
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.QUESTION_ADDED,
      data: newQuestion,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// adding a anwser
module.exports.AddAnswerController = async (req, res, next) => {
  try {
    const { coursesDataid } = req.params;

    const { error } = isMongooseIdValidation(coursesDataid);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { answer } = req.body;

    const addAnsData = {
      answerBy: req.userid,
      ans: answer,
    };

    const data = await questionModel.findByIdAndUpdate(
      coursesDataid,
      {
        $push: { answers: addAnsData },
      },
      { new: true }
    );
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.QUESTION_NOT_FOUND));
    }

    // need to send notification and  emails

    // await redis.del()
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.ANSWER_ADDED,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
