const httpErrors = require("http-errors");
const {
  RegisterUserValidation,
  ActivationUserValidation,
  LoginUserValidation,
  SocailAuthValidation,
  UpdateAccountValidation,
  UpdatePasswordValidation,
  UpdateUserRoleValidation,
  AddCourseByAdminValidation,
} = require("../JoiSchemas/user.schema");
const userModel = require("../Models/user.model");
const coursesModel = require("../Models/course.model");
const {
  errorConstant,
  SendMailConstant,
  successConstant,
  expiryTime,
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
const orderModel = require("../Models/order.model");

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

    await redis.set(userExist._id, JSON.stringify(userExist), "EX", expiryTime);

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
    res.clearCookie("lms_user_token");
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
      sameSite: "none",
      secure: true,
      httpOnly: true,
      // maxAge: parseInt(process.env.COOKIE_MAX_TIME),
    };

    await redis.set(getUser._id, JSON.stringify(getUser), "EX", expiryTime);
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

    const { email, name, picture } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      const newUser = new userModel({
        email,
        name,
        profile: { url: picture },
        isVerified: true,
        isSocialAuth: true,
      });
      await newUser.save();
      await redis.set(user._id, JSON.stringify(user));
      SendToken(newUser, 201, res);
    } else {
      await redis.set(user._id, JSON.stringify(user));
      SendToken(user, 200, res);
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

// user courses
module.exports.userCoursesListController = async (req, res, next) => {
  try {
    const data = await userModel
      .findById(req.userid)
      .select("courses")
      .populate("courses", "name level");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
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

    // if (email) {
    //   user.email = email;
    // }

    if (name) {
      user.name = name;
    }

    await user.save();
    await redis.set(user._id, JSON.stringify(user), "EX", expiryTime);
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

// -----------------------
// ADMIN
// -----------------------

// list of the users
module.exports.UsersListController = async (req, res, next) => {
  try {
    const data = await userModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// updating a user role
module.exports.UpdateUserRoleController = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const { error } = UpdateUserRoleValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const data = await userModel.findByIdAndUpdate(
      userid,
      {
        role: req.body.role,
      },
      { new: true }
    );

    if (!data) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    const isExistInMemory = await redis.get(userid);
    if (isExistInMemory) {
      redis.set(userid, JSON.stringify(data));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.USER_UPDATED,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// getting a single user detail
module.exports.AdimGetSingleUserDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await userModel.findById(id).populate("courses", "name");
    const orders = await orderModel.find({ user: id }).sort({ createdAt: -1 });
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
      orders,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// adding a course to a user
module.exports.AdminAddUserCourseController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = AddCourseByAdminValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const adddata = await userModel.findByIdAndUpdate(
      id,
      { $push: { courses: req.body.courseid } },
      { new: true }
    );

    if (!adddata) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    const isExistInMemory = await redis.get(id);
    if (isExistInMemory) {
      await redis.set(id, JSON.stringify(adddata));
    }

    await coursesModel.findByIdAndUpdate(req.body.courseid, {
      $inc: { purchase: 1 },
    });

    const isExistCourseInMemory = await redis.get(req.body.courseid);
    if (isExistCourseInMemory) {
      await redis.del(req.body.courseid);
    }

    const data = await userModel.findById(id).populate("courses", "name");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.USER_UPDATED + "i.e. Add Course",
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// remove a course to a user
module.exports.AdminDeleteUserController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error } = AddCourseByAdminValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const deletedata = await userModel.findByIdAndUpdate(
      id,
      { $pull: { courses: req.body.courseid } },
      { new: true }
    );

    if (!deletedata) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    const isExistInMemory = await redis.get(id);
    if (isExistInMemory) {
      await redis.set(id, JSON.stringify(deletedata));
    }
    await coursesModel.findByIdAndUpdate(req.body.courseid, {
      $inc: { purchase: -1 },
    });

    const isExistCourseInMemory = await redis.get(req.body.courseid);
    if (isExistCourseInMemory) {
      await redis.del(req.body.courseid);
    }

    const data = await userModel.findById(id).populate("courses", "name");

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.USER_UPDATED + " i.e. remove course",
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// deleting a user by user
module.exports.DeleteUserController = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const data = await userModel.findByIdAndDelete(userid);
    await orderModel.deleteMany({ user: userid });

    if (!data) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }

    const isExistInMemory = await redis.get(userid);
    if (isExistInMemory) {
      await redis.del(userid);
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: successConstant.USER_DELETED,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

// -----------------------
// PUBLIC
// -----------------------
module.exports.GetUserIdByQueryController = async (req, res, next) => {
  try {
    const { email } = req.query;
    const data = await userModel.findOne({ email }).select("email name");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "user found",
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
