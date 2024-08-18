const orderModel = require("../Models/order.model");
const coursesModel = require("../Models/course.model");
const userModel = require("../Models/user.model");
const notificationModel = require("../Models/notification.model");
const httpErrors = require("http-errors");
const {
  errorConstant,
  successConstant,
  notificationConstant,
  expiryTime,
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

    const isUser = await userModel.findById(req.userid);
    if (!isUser) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    let isOrderExist = await orderModel.findOne({
      uuid: req.body.uuid,
      "orderInfo.id": req.body.order_id,
    });
    if (!isOrderExist) {
      return next(httpErrors.NotFound(errorConstant.ORDER_NOT_FOUND));
    }

    const isCourseEnrolled = isUser.courses.some(
      (item) => item.toString() === isOrderExist.courseid.toString()
    );
    if (isCourseEnrolled) {
      return next(httpErrors.BadRequest(errorConstant.COURSE_ALREADY_ENROLLED));
    }

    isOrderExist = await orderModel
      .findByIdAndUpdate(
        isOrderExist._id,
        { orderStatus: "completed" },
        { new: true }
      )
      .populate("courseid", "name");

    await coursesModel.findByIdAndUpdate(req.body.courseid, {
      $inc: { purchase: 1 },
    });

    let data = {
      user: { name: isUser.name },
      order: {
        uuid: isOrderExist.uuid,
        course: isOrderExist.courseid.name,
        price: isOrderExist.paymentInfo.amount / 100,
        date: moment(isOrderExist.updatedAt).format("D-MMM-yyyy"),
      },
    };

    await sendMail({
      email: isUser.email,
      subject: "Order Course Confirmation",
      template: "Order_mail.ejs",
      data,
    });

    isUser.courses.push(isOrderExist.courseid);
    await isUser.save();
    const isExistInMemory = await redis.get(req.userid);
    if (isExistInMemory) {
      let updateData = await userModel.findById(req.userid);
      await redis.set(req.userid, JSON.stringify(updateData), "EX", expiryTime);
    }

    const isExistInMemoryCourse = await redis.get(req.body.courseid);
    if (isExistInMemoryCourse) {
      await redis.del(req.body.courseid);
    }

    await notificationModel.create({
      user: req.userid,
      title: notificationConstant.NEW_ORDER,
      message: `You have a new order from ${isOrderExist.name}`,
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

module.exports.UserMyOrderController = async (req, res, next) => {
  try {
    const data = await orderModel
      .find({ user: req.userid })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AdminAllOrdersController = async (req, res, next) => {
  try {
    const { limit = 20, page = 1 } = req.query;
    const skip_docs = (page - 1) * limit;
    const data = await orderModel
      .find()
      .select(
        "uuid courseid user orderStatus paymentInfo.id paymentInfo.amount paymentInfo.order_id paymentInfo.method  createdAt"
      )
      .skip(skip_docs)
      .limit(limit)
      .sort({ createdAt: -1 })
      .populate("user", "name")
      .populate("courseid", "name");

    const totalOrders = await orderModel.countDocuments();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
      totalOrders,
      page,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AdminSingleOrderDetailedController = async (req, res, next) => {
  try {
    const { orderid } = req.params;
    const data = await orderModel
      .findById(orderid)
      .populate("user", "name")
      .populate("courseid", "name");

    if (!data) {
      return next(httpErrors.NotFound(errorConstant.ORDER_NOT_FOUND));
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
