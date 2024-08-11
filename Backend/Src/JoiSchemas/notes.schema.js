const Joi = require("joi");

/* This code snippet is defining a validation function named `CreateNewNotesValidation` that takes a
`body` object as input. Inside the function, it creates a Joi schema that specifies the validation
rules for the `body` object. */
module.exports.CreateNewNotesValidation = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    points: Joi.array().required().min(1),
  });

  return schema.validate(body);
};

/* The `module.exports.AddNewPointValidation` function is defining a validation function for adding a
new point. It takes a `body` object as input, which is expected to contain a `point` property that
is a string and is required. Inside the function, it creates a Joi schema that specifies the
validation rules for the `body` object, specifically requiring the `point` property to be a string
and to be present in the input `body`. Finally, the function returns the result of validating the
`body` object against the defined schema using Joi's `validate` method. */
module.exports.AddNewPointValidation = (body) => {
  const schema = Joi.object({
    point: Joi.string().required(),
  });

  return schema.validate(body);
};

/* The `module.exports.DeletePointValidation` function is defining a validation function for deleting a
point. It takes a `body` object as input, which is expected to contain a `pointId` property that is
a string and is required. Inside the function, it creates a Joi schema that specifies the validation
rules for the `body` object, specifically requiring the `pointId` property to be a string and to be
present in the input `body`. Finally, the function returns the result of validating the `body`
object against the defined schema using Joi's `validate` method. This function ensures that the
`body` object passed to it for deleting a point meets the specified validation criteria before
proceeding with the deletion operation. */
module.exports.DeletePointValidation = (body) => {
  const schema = Joi.object({
    pointId: Joi.string().required(),
  });

  return schema.validate(body);
};

/* The `module.exports.AddRemoveUserToNotesValidation` function is defining a validation function for
adding or removing a user's access to notes. It takes a `body` object as input, which is expected to
contain three properties: */
module.exports.AddRemoveUserToNotesValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    type: Joi.string().valid("add", "remove", "access").required(),
    hasAccess: Joi.boolean(),
  });

  return schema.validate(body);
};
