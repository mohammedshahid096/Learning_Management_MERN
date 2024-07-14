const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    courseid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    videoUrl: String,
    videothumbnail: {
      public_id: String,
      url: String,
    },
    title: {
      type: String,
      required: true,
    },
    videoSection: String,
    description: {
      type: String,
      required: true,
    },
    videolength: Number,
    length: Object,
    videoplayer: String,
    links: [
      {
        title: String,
        url: String,
      },
    ],
    suggestion: String,
    sequence: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const courseDataModel = mongoose.model("courseData", ModelSchema);

module.exports = courseDataModel;
