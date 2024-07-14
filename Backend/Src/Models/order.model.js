const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    uuid: {
      type: String,
      required: true,
    },
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
    orderStatus: {
      type: String,
      default: "initiated",
      enum: [
        "initiated",
        "pending",
        "failed",
        "rejected",
        "approved",
        "completed",
        "expires",
        "cancelled",
      ],
    },
    orderInfo: {
      type: Object,
      default: null,
    },
    paymentInfo: {
      type: Object,
      default: null,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", ModelSchema);
module.exports = orderModel;
