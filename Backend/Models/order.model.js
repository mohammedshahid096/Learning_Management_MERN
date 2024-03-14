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
    payment_info: {
      type: Object,
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("order", ModelSchema);
module.exports = orderModel;
