const Joi = require("joi");

// # new order
module.exports.NewOrderValidation = (body) => {
  const schema = Joi.object({
    order_id: Joi.string().required(),
    uuid: Joi.string().required(),
  });

  return schema.validate(body);
};
