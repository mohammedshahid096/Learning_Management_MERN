const coursesModel = require("../Models/course.model");
const courseDataModel = require("../Models/coursedata.model");

/**
 * getting a single course
 * @param {String} courseid course mongodb object id
 * @return {Object} Course details
 */
module.exports.GetSingleCourseService = async (courseid) => {
  let data = await coursesModel.findById(courseid);
  return data;
};

/**
 * getting a single courseData related to the course
 * @param {String} courseid courseData mongodb object id
 * @param {Boolean} public public or private data
 * @return {Array} CourseData details
 */
module.exports.GetSingleAllCourseDataService = async (
  courseid,
  public = true
) => {
  let data = null;
  if (public) {
    data = await courseDataModel
      .find({ courseid })
      .select("courseid title description sequence")
      .sort({ sequence: 1 });
  } else {
    data = await courseDataModel.find({ courseid }).sort({ sequence: 1 });
  }
  return data;
};

/**
 * updating a  course
 * @param {String} id course mongodb object id
 * @param {Object} details course Details
 * @return {Object} updated course details
 */
module.exports.UpdateCourseService = async (id, details) => {
  let data = await coursesModel.findByIdAndUpdate(id, details, { new: true });
  return data;
};

// only list of the course
module.exports.CoursesListService = async () => {
  let data = await coursesModel
    .find()
    .select("name rating purchase level createdAt");
  return data;
};

module.exports.GetAllCoursesService = async () => {
  let aggregationPipeLine = [
    {
      $group: {
        _id: "$_id",
        course: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 1,
        course: { $arrayElemAt: ["$course", 0] },
      },
    },
    {
      $lookup: {
        from: "coursedatas",
        localField: "_id",
        foreignField: "courseid",
        as: "coursesData",
        pipeline: [
          {
            $project: {
              videoUrl: 0,
              videothumbnail: 0,
              length: 0,
              links: 0,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        coursesData: {
          $sortArray: {
            input: "$coursesData",
            sortBy: { sequence: 1 },
          },
        },
      },
    },
  ];
  let data = await coursesModel.aggregate(aggregationPipeLine);
  return data;
};
