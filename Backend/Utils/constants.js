module.exports.successConstant = {
  // ### user
  NEW_USER_CREATED: "New user is created successfully",
  LOGOUT: "Logged out successfully",
  PASSWORD_UPDATED: "Successfully password is updated",
  USER_UPDATED: "Successfully user is updated",
  USER_DELETED: "Successfully user is deleted",

  // ### course
  COURSE_UPDATED_SUCCESS: "Successfully Updated the Course",

  // ### question
  QUESTION_ADDED: "Question is Added Successfully",
  ANSWER_ADDED: "Answer is Added Successfully",

  // ### reply
  REPLY_ADDED: "Reply is Added Successfully",

  // ### order
  ORDER_CREATED: "Order is created successfully",

  // ### notification
  NOTIFICATION_UPDATED: "Notification is Updated Successfully",
};

module.exports.errorConstant = {
  // ### user
  EMAIL_EXIST: "Email Already Exist",
  EMAIL_NOT_FOUND: "Invalid email or password not match",
  PASSWORD_NOT_MATCH: "Passwords not match",
  OLD_NEW_PASSWORD_SAME: "Old and New Passwords should  not be same",
  INVALID_ACTIVATION_CODE: "Invalid activation OTP Code",
  NOT_AUTHENTICATED: "Please login to access this resource",
  NOT_AUTHORIZED: "Unathorized to use this  resource",
  USER_NOT_FOUND: "User not found",

  // ### course related
  COURSE_NOT_FOUND: "Course Not Found",
  COURSE_NOT_ENROLLED: "Your haven't Enrolled this Course Please Enroll",
  COURSE_ALREADY_ENROLLED: "Course Already Enrolled",

  // ### coursesData related
  COURSES_DATA_NOT_FOUND: "CoursesData not found with given id",

  // ### questions related
  QUESTION_NOT_FOUND: "Question not found",

  // ### review
  REIVEW_NOT_FOUND: "Review not found",

  // ### notification
  NOTIFICATION_NOT_FOUND: "Notification Not Found",
};

module.exports.SendMailConstant = {
  MAIL_SENT_MESSAGE_ACTIVATION: "Please chech your email : ",
};

module.exports.notificationConstant = {
  NEW_ORDER: "New Order",
};
