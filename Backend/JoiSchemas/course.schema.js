const Joi = require("joi");

// # Adding a course Validator
module.exports.AddCourseValidator = (body) => {
  const schema = Joi.object({
    playlistid: Joi.string().required(),
    price: Joi.number().required(),
    estimatedprice: Joi.number(),
    tags: Joi.string().required(),
    level: Joi.string().required(),
    benefits: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
      })
    ),
    prerequsites: Joi.array().items(
      Joi.object({
        title: Joi.string().required(),
      })
    ),
    rating: Joi.number().default(0),
    purchase: Joi.number().default(0),
  });

  return schema.validate(body);
};

// # editing a course Validaor
module.exports.EditCourseValidator = (body) => {
  const schema = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    estimatedprice: Joi.number(),
    tags: Joi.string(),
    level: Joi.string(),
    demourl: Joi.string(),
    benefits: Joi.array().items(
      Joi.object({
        title: Joi.string(),
      })
    ),
    prerequsites: Joi.array().items(
      Joi.object({
        title: Joi.string(),
      })
    ),
    rating: Joi.number(),
    purchase: Joi.number(),
  });

  return schema.validate(body);
};

// --------------------------------------------------------
// review related
// --------------------------------------------------------
module.exports.AddReviewValidation = (body) => {
  const schema = Joi.object({
    review: Joi.string(),
    courseid: Joi.string().required(),
    rating: Joi.number().required().min(0).max(5),
  });

  return schema.validate(body);
};

module.exports.ReplyReviewValidation = (body) => {
  const schema = Joi.object({
    reply: Joi.string().required(),
  });

  return schema.validate(body);
};
