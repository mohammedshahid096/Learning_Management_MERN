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
    const { limit = 15, page = 1 } = req.query;
    const skip_docs = (page - 1) * limit;
    const data = await impLinkModel
      .find()
      .skip(skip_docs)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalLinks = await impLinkModel.countDocuments();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
      totalLinks,
      page,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.AdminSingleGetLinkController = async (req, res, next) => {
  try {
    const { linkid } = req.params;

    const data = await impLinkModel.findById(linkid);

    if (!data) {
      return next(httpErrors.NotFound(errorConstant.IMPORTANT_LINK_NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
module.exports.AdminUpdateLinkLinkController = async (req, res, next) => {
  try {
    const { linkid } = req.params;

    const data = await impLinkModel.findByIdAndUpdate(linkid, req.body, {
      new: true,
    });

    if (!data) {
      return next(httpErrors.NotFound(errorConstant.IMPORTANT_LINK_NOT_FOUND));
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.GetAllImpLinksController = async (req, res, next) => {
  try {
    const { limit = 15, page = 1, search = "", type = "all" } = req.query;
    const query = {};
    const query2 = {};

    if (search) {
      query.keywords = search;
    }

    if (type === "npm") {
      query.isNpm = true;
      query2.isNpm = true;
    }

    if (type === "website") {
      query.isNpm = false;
      query2.isNpm = false;
    }

    const skip_docs = (Number(page) - 1) * limit;
    const data = await impLinkModel
      .find(query)
      .skip(skip_docs)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalLinks = await impLinkModel.find(query2).count();
    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
      totalLinks,
      page: Number(page),
      dataLenght: data.length,
      searchType: type,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};

module.exports.SearchImpLinksController = async (req, res, next) => {
  try {
    const { search } = req.query;
    const data = await impLinkModel
      .find({
        $or: [
          { title: { $regex: search, $options: "i" } },
          { keywords: { $regex: search, $options: "i" } },
        ],
      })
      .sort({ createdAt: -1 })
      .select("title description provider icon");

    res.status(200).json({
      success: true,
      statusCode: 200,
      data,
    });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
};
