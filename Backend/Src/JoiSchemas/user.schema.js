const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

// register schema
module.exports.RegisterUserValidation = (body) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });

  return schema.validate(body);
};

// activation schema
module.exports.ActivationUserValidation = (body) => {
  const schema = Joi.object({
    activation_code: Joi.string()
      .length(4)
      .pattern(new RegExp("^[0-9]+$"))
      .required()
      .label("OTP"),
    activation_token: Joi.string().required(),
  });

  return schema.validate(body);
};

// login schema
module.exports.LoginUserValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });

  return schema.validate(body);
};

// socail auth schema
module.exports.SocailAuthValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    name: Joi.string().required().label("name"),
    picture: Joi.string().required().label("picture"),
  });
  return schema.validate(body);
};

// updating the account
module.exports.UpdateAccountValidation = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().label("email"),
    name: Joi.string().label("name"),
  });
  return schema.validate(body);
};

// updating the  password
module.exports.UpdatePasswordValidation = (body) => {
  const schema = Joi.object({
    old_password: passwordComplexity().required().label("Old Password"),
    new_password: passwordComplexity().required().label("New Password"),
  });
  return schema.validate(body);
};

// updating the user role by admin
module.exports.UpdateUserRoleValidation = (body) => {
  const schema = Joi.object({
    role: Joi.string()
      .required()
      .valid("admin", "user", "teacher")
      .label("user role"),
  });
  return schema.validate(body);
};

// adding the course by admin
module.exports.AddCourseByAdminValidation = (body) => {
  const schema = Joi.object({
    courseid: Joi.string().required(),
  });
  return schema.validate(body);
};
