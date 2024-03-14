const Joi = require("joi");

// # new order
module.exports.NewOrderValidation = (body) => {
  const schema = Joi.object({
    courseid: Joi.string().required(),
    payment_info: Joi.object().required(),
  });

  return schema.validate(body);
};
