const notificationModel = require("../Models/notification.model");
const httpErrors = require("http-errors");
const {
  errorConstant,
  successConstant,
  notificationConstant,
} = require("../Utils/constants");
const { redis } = require("../Config/redis.config");
const cron = require("node-cron");

module.exports.GetNotificationController = async (req, res, next) => {
  try {
    const data = await notificationModel
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

module.exports.UpdateNotificationController = async (req, res, next) => {
  try {
    const { notificationid } = req.params;
    const data = await notificationModel.findByIdAndUpdate(
      notificationid,
      { status: true },
      { new: true }
    );
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.NOTIFICATION_NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.NOTIFICATION_UPDATED,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

cron.schedule("0 0 0 * * *", async () => {
  try {
    console.log("running a task every month");
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await notificationModel.deleteMany({
      status: true,
      createdAt: { $lte: thirtyDaysAgo },
    });
    console.log("deleted read notifications");
  } catch (error) {
    console.log(error.message);
  }
});
