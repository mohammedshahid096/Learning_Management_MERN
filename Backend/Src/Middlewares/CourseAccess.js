const httpErrors = require("http-errors");
const { errorConstant } = require("../Utils/constants");
const { redis } = require("../Config/redis.config");

const isCourseEnrolled = async (req, res, next) => {
  try {
    const { courseid } = req.body;
    if (!courseid) {
      return next(httpErrors.BadRequest("please add the course id"));
    }

    if (req.role === "admin" || req.role === "teacher") {
      return next();
    }

    let userData = await redis.get(req.userid);
    userData = JSON.parse(userData);

    const isEnrolled = userData.courses.find((item) => item === courseid);
    if (!isEnrolled) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_ENROLLED));
    }
    next();
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports = isCourseEnrolled;
