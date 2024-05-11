const httpErrors = require("http-errors");
const impLinkModel = require("../Models/implink.model");
const { errorConstant, successConstant } = require("../Utils/constants");
const { AddImpLinlValidation } = require("../JoiSchemas/category.schema");
const getMetaData = require("metadata-scraper");

module.exports.CreateNewImpLink = async (req, res, next) => {
  try {
    const { error } = AddImpLinlValidation(req.body);
    if (error) {
      return next(httpErrors.BadRequest(error.details[0].message));
    }

    const response = await getMetaData(req.body.url);
    const data = new impLinkModel({
      ...response,
      isNpm: req.body.isNpm,
    });
    await data.save();
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "New Link is added successfully",
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AdminImpLinksController = async (req, res, next) => {
  try {
    const data = await impLinkModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AdminImpLinksController = async (req, res, next) => {
  try {
    const { linkid } = req.params;
    const data = await impLinkModel.findByIdAndDelete(linkid);
    if (!data) {
      return next(
        httpErrors.InternalServerError("link not found with the given id")
      );
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "successuflly the given link id is deleted",
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
