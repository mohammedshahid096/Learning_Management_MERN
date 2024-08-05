const httpErrors = require("http-errors");
const { errorConstant, successConstant } = require("../Utils/constants");
const logger = require("../Config/applogger.config");
const {
  CreateNewNotesValidation,
  AddNewPointValidation,
  DeletePointValidation,
  AddRemoveUserToNotesValidation,
} = require("../JoiSchemas/notes.schema");
const { v4: uuidv4 } = require("uuid");
const notesModel = require("../Models/notes.model");
const { redis } = require("../Config/redis.config");
const userModel = require("../Models/user.model");

/* The `CreateNewNoteController` function is responsible for creating a new note. Here is a breakdown
of what it does: */
module.exports.CreateNewNoteController = async (req, res, next) => {
  try {
    logger.warn("Controllers - Notes - CreateNewNote - Start");
    const { error } = CreateNewNotesValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const details = {
      title: req.body.title,
      user: req.userid,
      points: req.body.points.map((item) => ({
        pointId: uuidv4(),
        content: item,
      })),
    };
    const newNotes = await notesModel.create(details);
    await redis.del(`notes-${req.userid}`);
    logger.warn("Controllers - Notes - CreateNewNote - End");
    res.status(200).json({
      success: true,
      statusCode: 201,
      message: successConstant.NOTE_CREATED_SUCCESS,
      data: newNotes,
    });
  } catch (error) {
    logger.error("Controllers - Notes - CreateNewNote - Error", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

/* The `AddNewPointController` function is responsible for adding a new point to an existing note. Here
is a breakdown of what it does: */
module.exports.AddNewPointController = async (req, res, next) => {
  try {
    logger.warn("Controllers - Notes - AddNewPointController - Start");
    const { noteId } = req.params;
    const { error } = AddNewPointValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const details = {
      pointId: uuidv4(),
      content: req.body.point,
    };
    const data = await notesModel.findByIdAndUpdate(
      noteId,
      { $push: { points: details } },
      { new: true }
    );
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.NOTE_NOT_FOUND));
    }
    await redis.del(`notes-${req.userid}`);
    logger.warn("Controllers - Notes - AddNewPointController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully point is added",
      data,
    });
  } catch (error) {
    logger.error("Controllers - Notes - AddNewPointController - Error", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

/* The `DeletePointController` function is responsible for deleting a specific point from an existing
note. Here is a breakdown of what it does: */
module.exports.DeletePointController = async (req, res, next) => {
  try {
    logger.warn("Controllers - Notes - DeletePointController - Start");
    const { noteId } = req.params;
    const { error } = DeletePointValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const details = {
      pointId: req.body.pointId,
    };
    const data = await notesModel.findByIdAndUpdate(
      noteId,
      { $pull: { points: details } },
      { new: true }
    );
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.NOTE_NOT_FOUND));
    }
    await redis.del(`notes-${req.userid}`);
    logger.warn("Controllers - Notes - DeletePointController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully point is added",
      data,
    });
  } catch (error) {
    logger.error("Controllers - Notes - DeletePointController - Error", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

/* The `DeleteNoteController` function is responsible for deleting a specific note based on the
`noteId` parameter received in the request. Here is a breakdown of what it does: */
module.exports.DeleteNoteController = async (req, res, next) => {
  try {
    logger.warn("Controllers - Notes - DeleteNoteController - Start");
    const { noteId } = req.params;

    const data = await notesModel.findByIdAndDelete(noteId);
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.NOTE_NOT_FOUND));
    }
    await redis.del(`notes-${req.userid}`);
    logger.warn("Controllers - Notes - DeleteNoteController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successfully Note is Deleted",
    });
  } catch (error) {
    logger.error("Controllers - Notes - DeleteNoteController - Error", error);
    next(httpErrors.InternalServerError(error.message));
  }
};

/* The `GetSingleNoteController` function is responsible for retrieving a single note based on the
`noteId` parameter received in the request. Here is a breakdown of what it does: */
module.exports.GetSingleNoteController = async (req, res, next) => {
  try {
    logger.warn("Controller - Notes - GetSingleNoteController - Start");
    const { noteId } = req.params;
    let data = null;
    let userNotes = await redis.get(`notes-${req.userid}`);
    if (userNotes) {
      userNotes = JSON.parse(userNotes);
    } else {
      userNotes = await notesModel.find({ user: req.userid }).lean();
      await redis.set(`notes-${req.userid}`, JSON.stringify(userNotes));
    }
    data = userNotes.find((item) => item._id === noteId);
    if (!data) {
      return next(httpErrors.NotFound(errorConstant.NOTE_NOT_FOUND));
    }

    res.status(200).json({ success: true, statusCode: 200, data });

    logger.warn("Controller - Notes - GetSingleNoteController - End");
  } catch (error) {
    logger.error("Controller - Notes - GetSingleNoteController - Error", error);
  }
};

/* The `GetAllUserNotesController` function is responsible for retrieving all notes belonging to a
specific user. Here is a breakdown of what it does: */
module.exports.GetAllUserNotesController = async (req, res, next) => {
  try {
    logger.warn("Controller - Notes - GetAllUserNotesController - Start");
    let userNotes = await redis.get(`notes-${req.userid}`);
    if (userNotes) {
      userNotes = JSON.parse(userNotes);
    } else {
      userNotes = await notesModel.find({
        $or: [{ user: req.userid }, { "users.userId": req.userid }],
      });
      await redis.set(`notes-${req.userid}`, JSON.stringify(userNotes));
    }
    logger.warn("Controller - Notes - GetAllUserNotesController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      data: userNotes,
    });
  } catch (error) {
    logger.error(
      "Controller - Notes - GetAllUserNotesController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};

/* The `AddRemoveUserToNotesController` function is responsible for handling the logic to add or remove
a user to/from a specific note. Here is a breakdown of what it does: */
module.exports.AddRemoveUserToNotesController = async (req, res, next) => {
  try {
    logger.warn("Controller - Notes - AddUserToNotesController - Start");
    const { noteId } = req.params;
    const { userid, type, hasAccess } = req.body;
    const { error } = AddRemoveUserToNotesValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }
    const isUserExist = await userModel.findById(userid);
    if (!isUserExist) {
      return next(httpErrors.NotFound(errorConstant.USER_NOT_FOUND));
    }
    let query = {};

    if (req.body.type === "add") {
      query = { $push: { users: { userId: userid, hasAccess: false } } };
    } else if (req.body.type === "remove") {
      query = { $pull: { users: { userId: userid } } };
    } else {
      await notesModel.findByIdAndUpdate(noteId, {
        $pull: { users: { userId: userid } },
      });
      query = { $push: { users: { userId: userid, hasAccess: hasAccess } } };
    }

    const updateData = await notesModel.findByIdAndUpdate(noteId, query, {
      new: true,
    });
    if (!updateData) {
      return next(httpErrors.NotFound(errorConstant.NOTE_NOT_FOUND));
    }
    await redis.del(`notes-${req.userid}`);
    logger.warn("Controller - Notes - AddUserToNotesController - End");
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Successfully Updated the query",
      data: updateData,
    });
  } catch (error) {
    logger.error(
      "Controller - Notes - AddUserToNotesController - Error",
      error
    );
    next(httpErrors.InternalServerError(error.message));
  }
};
