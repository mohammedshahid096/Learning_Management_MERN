const Joi = require("joi");

module.exports.AddCategoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
  });

  return schema.validate(body);
};
