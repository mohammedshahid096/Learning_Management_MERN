const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    language: {
      type: String,
    },
    type: {
      type: String,
    },
    url: {
      type: String,
    },
    provider: {
      type: String,
    },
    keywords: {
      type: Array,
    },
    section: {
      type: String,
    },
    author: {
      type: String,
    },
    copyright: {
      type: String,
    },
    email: {
      type: String,
    },
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    image: {
      type: String,
    },
    icon: {
      type: String,
    },
    video: {
      type: String,
    },
    audio: {
      type: String,
    },
    isNpm: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const impLinkModel = mongoose.model("implink", ModelSchema);
module.exports = impLinkModel;
