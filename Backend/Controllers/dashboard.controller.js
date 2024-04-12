const userModel = require("../Models/user.model");
const httpErrors = require("http-errors");
// const {
//     errorConstant,
//     successConstant,
//   } = require("../Utils/constants");

// users analysis
module.exports.AdminUsersDashboardController = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();

    const aggregation1 = [
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          month: "$_id",
          count: 1,
          _id: 0,
        },
      },
      {
        $project: {
          month: 1,
          month_name: {
            $switch: {
              branches: [
                { case: { $eq: ["$month", 1] }, then: "January" },
                { case: { $eq: ["$month", 2] }, then: "February" },
                { case: { $eq: ["$month", 3] }, then: "March" },
                { case: { $eq: ["$month", 4] }, then: "April" },
                { case: { $eq: ["$month", 5] }, then: "May" },
                { case: { $eq: ["$month", 6] }, then: "June" },
                { case: { $eq: ["$month", 7] }, then: "July" },
                { case: { $eq: ["$month", 8] }, then: "August" },
                { case: { $eq: ["$month", 9] }, then: "September" },
                { case: { $eq: ["$month", 10] }, then: "October" },
                { case: { $eq: ["$month", 11] }, then: "November" },
                { case: { $eq: ["$month", 12] }, then: "December" },
              ],
              default: "Invalid Month",
            },
          },
          count: 1,
        },
      },
      {
        $sort: {
          month: 1,
        },
      },
    ];

    const aggregation2 = [
      {
        $group: {
          _id: "$role",
          count: { $sum: 1 },
        },
      },
    ];

    const aggregation3 = [
      {
        $project: {
          _id: 0,
          SocailAccounts: {
            $cond: { if: { $eq: ["$isSocialAuth", true] }, then: 1, else: 0 },
          },
          NonSocialAccounts: {
            $cond: { if: { $eq: ["$isSocialAuth", false] }, then: 1, else: 0 },
          },
        },
      },
      {
        $group: {
          _id: null,
          SocailAccounts: { $sum: "$SocailAccounts" },
          NonSocialAccounts: { $sum: "$NonSocialAccounts" },
        },
      },
      {
        $project: {
          _id: 0,
          SocailAccounts: 1,
          NonSocialAccounts: 1,
        },
      },
    ];

    const data1 = userModel.aggregate(aggregation1);
    const data2 = userModel.aggregate(aggregation2);
    const data3 = userModel.aggregate(aggregation3);
    const [YearTotalAnalysis, RoleAnalysis, SocailBased] = await Promise.all([
      data1,
      data2,
      data3,
    ]);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: {
        YearTotalAnalysis,
        RoleAnalysis,
        SocailBased: SocailBased[0],
      },
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
