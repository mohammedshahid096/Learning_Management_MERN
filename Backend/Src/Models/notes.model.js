const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    title: {
      type: String,
      required: true,
      lowercase: true,
    },
    points: [
      {
        pointId: { type: String, required: true },
        content: { type: String, lowercase: true },
      },
    ],
  },
  { timestamps: true }
);

const notesModel = mongoose.model("notes", ModelSchema);

module.exports = notesModel;
