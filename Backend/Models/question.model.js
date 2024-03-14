const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    courseid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    coursesData_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseData",
      required: true,
    },
    askedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    answers: [
      {
        awnserBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
        },
        ans: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const questionModel = mongoose.model("question", ModelSchema);

module.exports = questionModel;
