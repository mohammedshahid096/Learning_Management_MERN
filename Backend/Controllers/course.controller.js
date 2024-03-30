const httpErrors = require("http-errors");
const {
  AddCourseValidator,
  EditCourseValidator,
} = require("../JoiSchemas/course.schema");
const coursesModel = require("../Models/course.model");
const youtubesearch = require("youtube-search-api");
const courseDataModel = require("../Models/coursedata.model");
const {
  GetSingleCourseService,
  GetSingleAllCourseDataService,
  UpdateCourseService,
  GetAllCoursesService,
  CoursesListService,
} = require("../Services/course.service");
const { errorConstant, successConstant } = require("../Utils/constants");
const { redis } = require("../Config/redis.config");

// uploading a new course
module.exports.UploadCourseController = async (req, res, next) => {
  try {
    const { error } = AddCourseValidator(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const playlistData = await youtubesearch.GetPlaylistData(
      req.body.playlistid
    );
    const { items, metadata } = playlistData;
    req.body.name = metadata?.playlistMetadataRenderer?.title;
    req.body.description = metadata?.playlistMetadataRenderer?.description;
    req.body.thumbnail = { url: items[0].thumbnail.thumbnails[0].url };
    req.body.demoUrl = `https://www.youtube.com/watch?v=${items[0].id}`;

    const newCourse = new coursesModel(req.body);
    await newCourse.save();

    let courseDataPromise = items.map(async (singleCourse, index) => {
      let { description } = await youtubesearch.GetVideoDetails(
        singleCourse.id
      );
      let data = {
        courseid: newCourse._id,
        videoUrl: singleCourse.id,
        videothumbnail: {
          url: singleCourse.thumbnail.thumbnails[0].url,
        },
        title: singleCourse.title,
        description,
        length: singleCourse.length,
        sequence: index + 1,
      };
      const singleCourseData = new courseDataModel(data);
      await singleCourseData.save();
      return singleCourseData;
    });

    let courseData = await Promise.all(courseDataPromise);

    res.status(201).json({
      success: true,
      statusCode: 201,
      data: {
        details: newCourse,
        courseData,
      },
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.EditCourseController = async (req, res, next) => {
  try {
    const { courseid } = req.params;
    const { error } = EditCourseValidator(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    let updateData = await UpdateCourseService(courseid, req.body);
    if (!updateData) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }
    await redis.del(courseid);
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.COURSE_UPDATED_SUCCESS,
      data: updateData,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// geting a specific course without
module.exports.GetSpecificCompleteCourse = async (req, res, next) => {
  try {
    const { courseid } = req.params;

    let isCacheExist = await redis.get(courseid);

    if (isCacheExist && req.role === "user") {
      isCacheExist = JSON.parse(isCacheExist);
      const { courseDetail, coursesData } = isCacheExist;
      return res.status(200).json({
        success: true,
        statusCode: 200,
        courseDetail,
        coursesData,
      });
    }

    let courseDetail = await GetSingleCourseService(courseid);

    if (!courseDetail) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }

    let coursesData = null;

    if (req.role === "admin") {
      coursesData = await GetSingleAllCourseDataService(courseid, false);
    } else {
      coursesData = await GetSingleAllCourseDataService(courseid);
    }

    if (req.role === "user") {
      await redis.set(courseid, JSON.stringify({ courseDetail, coursesData }));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      courseDetail,
      coursesData,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// All Courses without
module.exports.AllCoursesWithout = async (req, res, next) => {
  try {
    let isCacheExist = await redis.get("allCourses");
    if (isCacheExist) {
      isCacheExist = JSON.parse(isCacheExist);
      return res.status(200).json({
        success: true,
        statusCode: 200,
        data: isCacheExist,
      });
    }
    const data = await GetAllCoursesService();
    await redis.set("allCourses", JSON.stringify(data));
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AllCoursesList = async (req, res, next) => {
  try {
    const data = await CoursesListService();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// ------------ For Specific Course by user ----------
module.exports.GetUserSingleCourse = async (req, res, next) => {
  try {
    const { courseid } = req.params;
    const courseExist = await GetSingleCourseService(courseid);
    if (!courseExist) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }
    let userData = await redis.get(req.userid);
    userData = JSON.parse(userData);

    const isEnrolled = userData.courses.find((item) => item === courseid);
    if (!isEnrolled) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_ENROLLED));
    }

    const coursesData = await GetSingleAllCourseDataService(courseid, false);
    res.status(200).json({
      success: true,
      statusCode: 200,
      courseDetail: courseExist,
      coursesData,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
