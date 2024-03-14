const orderModel = require("../Models/order.model");
const coursesModel = require("../Models/course.model");
const userModel = require("../Models/user.model");
const notificationModel = require("../Models/notification.model");
const httpErrors = require("http-errors");
const {
  errorConstant,
  successConstant,
  notificationConstant,
} = require("../Utils/constants");
const { redis } = require("../Config/redis.config");
const { NewOrderValidation } = require("../JoiSchemas/order.schema");
const { v4: uuidv4 } = require("uuid");
const { sendMail } = require("../Utils/SendMail");
const moment = require("moment");

module.exports.CreateOrderController = async (req, res, next) => {
  try {
    const { error } = NewOrderValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    req.body.user = req.userid;
    req.body.uuid = uuidv4();

    const isUser = await userModel.findById(req.userid);

    if (!isUser) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    const isCourseExist = await coursesModel.findById(req.body.courseid);
    if (!isCourseExist) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }

    const isCourseEnrolled = isUser.courses.some(
      (item) => item.toString() === req.body.courseid
    );
    if (isCourseEnrolled) {
      return next(httpErrors.BadRequest(errorConstant.COURSE_ALREADY_ENROLLED));
    }

    const newOrder = new orderModel(req.body);
    await newOrder.save();

    await coursesModel.findByIdAndUpdate(req.body.courseid, {
      $inc: { purchase: 1 },
    });

    let data = {
      user: { name: isUser.name },
      order: {
        uuid: newOrder.uuid,
        course: isCourseExist.name,
        price: isCourseExist.price,
        date: moment(newOrder.createdAt).format("D-MMM-yyyy"),
      },
    };

    await sendMail({
      email: isUser.email,
      subject: "Order Course Confirmation",
      template: "Order_mail.ejs",
      data,
    });

    isUser.courses.push(req.body.courseid);
    await isUser.save();

    await notificationModel.create({
      user: req.userid,
      title: notificationConstant.NEW_ORDER,
      message: `You have a new order from ${isCourseExist.name}`,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.ORDER_CREATED,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
