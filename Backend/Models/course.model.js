const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    estimatedprice: {
      type: Number,
    },
    thumbnail: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
        required: true,
      },
    },
    tags: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    demoUrl: {
      type: String,
      required: true,
    },
    benefits: [
      {
        title: {
          type: String,
          required: true,
        },
      },
    ],
    prerequsites: [
      {
        title: {
          type: String,
          required: true,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    purchase: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const coursesModel = mongoose.model("courses", ModelSchema);
module.exports = coursesModel;