const questionModel = require("../Models/question.model");

module.exports.GetAllQuestionsService = async (DataId) => {
  const data = await questionModel
    .find({ coursesData_id: DataId })
    .sort({ createdAt: -1 })
    .populate("askedBy", "name role profile")
    .populate("answers.answerBy", "name role profile");
  return data;
};
