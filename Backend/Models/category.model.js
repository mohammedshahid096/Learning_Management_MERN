const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

const categoryModel = mongoose.model("categories", ModelSchema);
module.exports = categoryModel;
