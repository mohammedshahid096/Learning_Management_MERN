const notificationModel = require("../Models/notification.model");

module.exports.createNewNotificationService = async (user, title, message) => {
  await notificationModel.create({
    user,
    title,
    message,
  });
};
