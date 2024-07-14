const Joi = require("joi");

module.exports.AddCategoryValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
  });

  return schema.validate(body);
};

module.exports.AddImpLinlValidation = (body) => {
  const schema = Joi.object({
    url: Joi.string(),
    isNpm: Joi.boolean(),
  });

  return schema.validate(body);
};
