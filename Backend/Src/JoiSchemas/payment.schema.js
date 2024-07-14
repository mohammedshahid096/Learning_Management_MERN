const Joi = require("joi");

// order schema
module.exports.CreateOrderValidation = (body) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    courseid: Joi.string().required(),
  });

  return schema.validate(body);
};

// verification schema
module.exports.VerifyPaymentValidation = (body) => {
  const schema = Joi.object({
    razorpay_payment_id: Joi.string().required(),
    razorpay_order_id: Joi.string().required(),
    razorpay_signature: Joi.string().required(),
  });

  return schema.validate(body);
};
