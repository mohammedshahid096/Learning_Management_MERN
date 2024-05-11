module.exports.successConstant = {
  // ### user
  NEW_USER_CREATED: "New user is created successfully",
  LOGOUT: "Logged out successfully",
  PASSWORD_UPDATED: "Successfully password is updated",
  USER_UPDATED: "Successfully user is updated",
  USER_DELETED: "Successfully user is deleted",

  // ### course
  COURSE_UPDATED_SUCCESS: "Successfully Updated the Course",
  COURSE_DELETED_SUCCESS: "Successfully Course is Deleted",

  // ### category
  CATEGORY_CREATED_SUCCESS: "Successfully categroy is added",
  CATEGORY_UPDATED_SUCCESS: "Successfully categroy is updated",
  CATEGORY_DELETED_SUCCESS: "Successfully categroy is deleted",

  // ### question
  QUESTION_ADDED: "Question is Added Successfully",
  QUESTION_DELETED: "Question is Deleted Successfully",
  ANSWER_ADDED: "Answer is Added Successfully",

  // ### review
  REVIEW_ADDED: "Review is Added Successfully",

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

  // ### category related
  CATEGORY_NOT_FOUND: "Category not found",

  // ### questions related
  QUESTION_NOT_FOUND: "Question not found",

  // ### review
  REIVEW_NOT_FOUND: "Review not found",
  REVIEW_ALREADY_ADDED: "Review is already added, cannot add  one  more time",

  // ### notification
  NOTIFICATION_NOT_FOUND: "Notification Not Found",

  // ### order
  ORDER_NOT_FOUND: "Order not found with given id",
};

module.exports.SendMailConstant = {
  MAIL_SENT_MESSAGE_ACTIVATION: "Please chech your email : ",
};

module.exports.notificationConstant = {
  NEW_ORDER: "New Order",
};

module.exports.paymentConstant = {
  // ## success
  ORDER_CREATED_SUCCESS: "RazorPay order is created successfully",

  // ## failure

  ORDER_CREATED_FAIL: "RazorPay order is failed to created",
  PAYMENT_SIGNATURE_FAIL: "Signature not Match! pls doo the payment",
};
