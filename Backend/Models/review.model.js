const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    courseid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    review: {
      type: String,
    },
    reply: {
      replyBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      message: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

const reviewModel = mongoose.model("reviews", ModelSchema);

module.exports = reviewModel;
