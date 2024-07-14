const express = require("express");
const TestRouter = express.Router();
const httpErrors = require("http-errors");
const { redis } = require("../Config/redis.config");
const usetube = require("usetube");
const youtubesearch = require("youtube-search-api");
const getMetaData = require("metadata-scraper");

TestRouter.route("/redis").get(async (req, res) => {
  let data = await redis.mget("name", "isTrue");
  res.status(200).json({
    success: true,
    data,
  });
});

TestRouter.route("/test").get(async (req, res, next) => {
  try {
    // let data = await usetube.searchVideo("nodejs");
    let data = await youtubesearch.GetVideoDetails("ohIAiuHMKMI");

    res.status(200).json({ success: true, data });
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
});

TestRouter.route("/test2").get(async (req, res, next) => {
  try {
    // let data = await youtubesearch.GetVideoDetails("ohIAiuHMKMI");
    let data = await youtubesearch.GetPlaylistData(
      "PLinedj3B30sDby4Al-i13hQJGQoRQDfPo"
    );
    res.status(200).json(data);
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
});

TestRouter.route("/test3").post(async (req, res, next) => {
  try {
    const { url } = req.body;
    const data = await getMetaData(url);
    res.status(200).json(data);
  } catch (error) {
    next(httpErrors.InternalServerError(error.message));
  }
});

module.exports = TestRouter;
