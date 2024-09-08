const mongoose = require("mongoose");

const ModelSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    token: {
      type: String,
      required: true,
    },
    expiry: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

ModelSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

const resetPasswordModel = mongoose.model("resetpassword", ModelSchema);

module.exports = resetPasswordModel;
