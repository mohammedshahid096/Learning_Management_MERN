const httpErrors = require("http-errors");
const {
  RegisterUserValidation,
  ActivationUserValidation,
  LoginUserValidation,
  SocailAuthValidation,
  UpdateAccountValidation,
  UpdatePasswordValidation,
} = require("../JoiSchemas/user.schema");
const userModel = require("../Models/user.model");
const {
  errorConstant,
  SendMailConstant,
  successConstant,
} = require("../Utils/constants");
const {
  CreateActivationToken,
  VerifyActivationToken,
  VerifyRefreshToken,
  CreateAcessToken,
} = require("../Utils/jwt.token");
const { sendMail } = require("../Utils/SendMail");
const { VerifyPasswordMethod } = require("../Middlewares/usermodel.methods");
const SendToken = require("../Middlewares/SendToken");
const { redis } = require("../Config/redis.config");
const { GetSingleUserService } = require("../Services/user.service");
const cloudinary = require("cloudinary");

// creating a user controller
module.exports.CreateUserController = async (req, res, next) => {
  try {
    const { error } = RegisterUserValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { name, email, password } = req.body;

    const userExist = await userModel.findOne({ email });
    if (userExist) {
      return next(httpErrors.BadRequest(errorConstant.EMAIL_EXIST));
    }

    const activationToken = await CreateActivationToken({
      name,
      email,
      password,
    });

    const { Token, activationCode } = activationToken;
    let data = { user: { name }, activationCode };
    // sending a mail
    await sendMail({
      email,
      subject: "Activate your Account",
      template: "Activation_mail.ejs",
      data,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: SendMailConstant.MAIL_SENT_MESSAGE_ACTIVATION + email,
      activationToken: Token,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

//  activating and creating a new user
module.exports.ActivateUserController = async (req, res, next) => {
  try {
    const { error } = ActivationUserValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { activation_code, activation_token } = req.body;
    const newUser = await VerifyActivationToken(activation_token);
    // if error from verify
    if (!newUser.success) {
      return next(httpErrors.Unauthorized(newUser.error.message));
    }
    // if otp is not match
    if (newUser.data.activationCode !== activation_code) {
      return next(httpErrors.BadRequest(errorConstant.INVALID_ACTIVATION_CODE));
    }
    // if user already exist
    const userExist = await userModel.findOne({
      email: newUser.data.user.email,
    });
    if (userExist) {
      return next(httpErrors.BadRequest(errorConstant.EMAIL_EXIST));
    }

    newUser.data.user.isVerified = true;

    const createUser = new userModel(newUser.data.user);
    await createUser.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: successConstant.NEW_USER_CREATED,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// login user
module.exports.LoginUserController = async (req, res, next) => {
  try {
    const { error } = LoginUserValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { email, password } = req.body;

    const userExist = await userModel.findOne({ email }).select("+password");
    if (!userExist) {
      return next(httpErrors.NotFound(errorConstant.EMAIL_NOT_FOUND));
    }

    const isPasswordCorrect = await VerifyPasswordMethod(
      password,
      userExist.password
    );
    if (!isPasswordCorrect) {
      return next(httpErrors.NotFound(errorConstant.EMAIL_NOT_FOUND));
    }

    delete userExist.password;

    redis.set(userExist._id, JSON.stringify(userExist));

    SendToken(userExist, 200, res);
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// logout user
module.exports.LogoutUserController = async (req, res, next) => {
  try {
    await redis.del(req.userid);
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.LOGOUT,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// generating a new Access Token
module.exports.UpdateAccessTokenController = async (req, res, next) => {
  try {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      return next(httpErrors.Unauthorized(errorConstant.NOT_AUTHENTICATED));
    }

    const decode = await VerifyRefreshToken(refresh_token);

    if (!decode.success) {
      return next(httpErrors.Unauthorized(decode.error.message));
    }

    let getUser = await redis.get(decode.id);
    if (!getUser) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    getUser = JSON.parse(getUser);

    const AccessToken = await CreateAcessToken(getUser._id, getUser.role);

    const AccessTokenOptions = {
      expires: new Date(
        Date.now() +
          parseInt(process.env.ACCESS_TOKEN_KEY_TIME_COOKIE) * 60 * 1000
      ), // for min
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      // maxAge: parseInt(process.env.COOKIE_MAX_TIME),
    };

    await redis.set(getUser._id, JSON.stringify(getUser), "EX", 5);
    res.cookie("access_token", AccessToken, AccessTokenOptions);
    res.status(200).json({
      success: true,
      AccessToken,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// social auth
module.exports.SocialAuth = async (req, res, next) => {
  try {
    const { error } = SocailAuthValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { email, name, avatar } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      const newUser = new userModel({
        email,
        name,
        isVerified: true,
      });
      await newUser.save();
      SendToken(newUser);
    } else {
      SendToken(user);
    }
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// my profile
module.exports.MyAccountController = async (req, res, next) => {
  try {
    // const userDetails = await GetSingleUserService(req.userid);
    let userDetails = await redis.get(req.userid);
    if (!userDetails) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }
    userDetails = JSON.parse(userDetails);
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: userDetails,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// update the account
module.exports.UpdateAccountController = async (req, res, next) => {
  try {
    const { error } = UpdateAccountValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const { email, name } = req.body;
    const user = await userModel.findById(req.userid);

    if (!user) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    if (email) {
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    await user.save();

    await redis.set(user._id, JSON.stringify(user));
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// updating the password
module.exports.UpdatePasswordController = async (req, res, next) => {
  const { error } = UpdatePasswordValidation(req.body);
  if (error) {
    return next(httpErrors.BadRequest(error.details[0].message));
  }

  const { old_password, new_password } = req.body;
  const user = await userModel.findById(req.userid).select("+password");

  if (!user) {
    return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
  }

  const isPasswordMatch = await VerifyPasswordMethod(
    old_password,
    user.password
  );
  if (!isPasswordMatch) {
    return next(httpErrors.BadRequest(errorConstant.PASSWORD_NOT_MATCH));
  }

  if (old_password === new_password) {
    return next(httpErrors.BadRequest(errorConstant.OLD_NEW_PASSWORD_SAME));
  }

  user.password = new_password;
  await user.save();

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: successConstant.PASSWORD_UPDATED,
  });
};

// profile related
module.exports.UserAvatarController = async (req, res, next) => {
  try {
    const profile = req.file;
    let user = await GetSingleUserService(req.userid);

    if (!user) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    // for default if there is not
    if (!user?.profile?.public_id) {
      const myCloud = await cloudinary.v2.uploader.upload(profile.path, {
        folder: "LMS_Project/userProfile",
        width: 150,
      });

      user.profile = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else if (profile) {
      // 1st delete and upload
      await cloudinary.v2.uploader.destroy(user?.profile?.public_id);
      const myCloud = await cloudinary.v2.uploader.upload(profile.path, {
        folder: "LMS_Project/userProfile",
        width: 150,
      });

      user.profile = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }

    await user.save();

    await redis.set(user._id, JSON.stringify(user));

    res.status(200).json({
      success: true,
      statusCode: 200,
      data: user,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};