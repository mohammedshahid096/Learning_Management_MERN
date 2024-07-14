const httpErrors = require("http-errors");
const {
  AddCourseValidator,
  EditCourseValidator,
  EditCourseDataValidator,
} = require("../JoiSchemas/course.schema");
const coursesModel = require("../Models/course.model");
const courseDataModel = require("../Models/coursedata.model");
const categoryModel = require("../Models/category.model");
const youtubesearch = require("youtube-search-api");
const {
  GetSingleCourseService,
  GetSingleAllCourseDataService,
  UpdateCourseService,
  GetAllCoursesService,
  CoursesListService,
  GetSingleCourseDataService,
} = require("../Services/course.service");
const { errorConstant, successConstant } = require("../Utils/constants");
const { redis } = require("../Config/redis.config");
const {
  GetAllQuestionsService,
} = require("../Services/Question_Review.service");

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
    req.body.name = metadata?.playlistMetadataRenderer?.title || "";
    req.body.description =
      metadata?.playlistMetadataRenderer?.description || "";
    req.body.thumbnail = { url: items[0].thumbnail.thumbnails[0].url };
    req.body.demoUrl = `https://www.youtube.com/watch?v=${items[0].id}`;

    const newCourse = new coursesModel(req.body);
    await newCourse.save();
    console.log("total videos", items.length);

    let courseDataPromise = items.map(async (singleCourse, index) => {
      let { description = "" } = await youtubesearch.GetVideoDetails(
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
    // console.log(courseData.length);

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

// editing a course
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

// Deleting the  entire  course
module.exports.DeleteCourseController = async (req, res, next) => {
  try {
    const { courseid } = req.params;
    const isExist = await coursesModel.findByIdAndDelete(courseid);
    if (!isExist) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }
    await courseDataModel.deleteMany({ courseid });
    await redis.del(courseid);

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.COURSE_DELETED_SUCCESS,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// updating the coursedata details
module.exports.UpdateCoureDataController = async (req, res, next) => {
  try {
    const { coursedataID } = req.params;
    const { error } = EditCourseDataValidator(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    let updateData = await courseDataModel.findByIdAndUpdate(
      coursedataID,
      req.body
    );
    if (!updateData) {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_FOUND));
    }

    await redis.del(updateData.courseid.toString());
    await redis.del("allCourses");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.COURSE_UPDATED_SUCCESS,
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

    if (isCacheExist) {
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
    // let isCacheExist = await redis.get("allCourses");
    // if (isCacheExist) {
    //   isCacheExist = JSON.parse(isCacheExist);
    //   return res.status(200).json({
    //     success: true,
    //     statusCode: 200,
    //     data: isCacheExist,
    //   });
    // }
    const data = await GetAllCoursesService();
    // await redis.set("allCourses", JSON.stringify(data));
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// courses lists for admin
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

// search query related
module.exports.SearchedCoursesController = async (req, res, next) => {
  try {
    const { name, category, priceGte, priceLte, tag, level, rating } =
      req.query;
    const query = {};
    let data = null;

    if (category) {
      const categoryArray = category.split(",");
      let dataArray = await categoryModel
        .find({
          name: { $in: categoryArray },
        })
        .select("name");
      const convertToId = dataArray.map((item) => item._id.toString());
      query.categories = {
        $in: convertToId,
      };
    }
    if (name) {
      query.name = { $regex: name, $options: "i" };
    }
    if (tag) {
      query.tags = { $regex: tag, $options: "i" };
    }
    if (level) {
      query.level = level;
    }
    if (rating) {
      query.rating = { $gte: Number(rating) };
    }
    if (priceGte || priceLte) {
      query.price = {
        $gte: Number(priceGte) || 0,
        $lte: Number(priceLte) || 1000000,
      };
    }
    query.isActive = true;
    // console.log(query);
    data = await coursesModel
      .find(query)
      .select(
        "-benefits -prerequsites -description -demoUrl -categories -playlistid"
      )
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

// related courses
module.exports.RelatedCoursesController = async (req, res, next) => {
  try {
    const { category } = req.query;
    data = await coursesModel
      .find({ categories: { $in: category.split(",") }, isActive: true })
      .select(
        "-benefits -prerequsites -description -demoUrl -categories -playlistid"
      )
      .sort({ createdAt: -1 })
      .limit(6);

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
    const { courseid, contentid } = req.params;

    let userData = await redis.get(req.userid);
    userData = JSON.parse(userData);

    const isEnrolled = userData.courses.find((item) => item === courseid);
    if (!isEnrolled && req.role === "user") {
      return next(httpErrors.NotFound(errorConstant.COURSE_NOT_ENROLLED));
    }

    const coursesData = await GetSingleCourseDataService(contentid);
    const questionData = await GetAllQuestionsService(contentid);

    if (!questionData) {
      return next(httpErrors.NotFound(errorConstant.COURSES_DATA_NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        coursesData,
        questionData,
      },
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
