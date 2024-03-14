const Joi = require("joi");
const mongoose = require("mongoose");

module.exports.isMongooseIdValidation = (id) => {
  const objectIdPattern = new RegExp(mongoose.Schema.Types.ObjectId.regex);
  const isObjectid = Joi.string()
    .regex(objectIdPattern)
    .required()
    .label("mongoose_id");
  return isObjectid.validate(id);
};
