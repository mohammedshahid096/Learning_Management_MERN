const Joi = require("joi");

module.exports.CreateNewNotesValidation = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    points: Joi.array().required().min(1),
  });

  return schema.validate(body);
};

module.exports.AddNewPointValidation = (body) => {
  const schema = Joi.object({
    point: Joi.string().required(),
  });

  return schema.validate(body);
};

module.exports.DeletePointValidation = (body) => {
  const schema = Joi.object({
    pointId: Joi.string().required(),
  });

  return schema.validate(body);
};
