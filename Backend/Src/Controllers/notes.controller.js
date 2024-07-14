const httpErrors = require("http-errors");
const { errorConstant, successConstant } = require("../Utils/constants");
const logger = require("../Config/applogger.config");
const {
  CreateNewNotesValidation,
  AddNewPointValidation,
  DeletePointValidation,
} = require("../JoiSchemas/notes.schema");
const { v4: uuidv4 } = require("uuid");
const notesModel = require("../Models/notes.model");
const { redis } = require("../Config/redis.config");

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

module.exports.GetAllUserNotesController = async (req, res, next) => {
  try {
    logger.warn("Controller - Notes - GetAllUserNotesController - Start");
    let userNotes = await redis.get(`notes-${req.userid}`);
    if (userNotes) {
      userNotes = JSON.parse(userNotes);
    } else {
      userNotes = await notesModel.find({ user: req.userid });
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
