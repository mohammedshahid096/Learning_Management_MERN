const express = require("express");
const { Authorization, Authentication } = require("../Middlewares/Auth");
const { CreateNewImpLink } = require("../Controllers/implink.controller");

const ImportantLinkRoutes = express.Router();

ImportantLinkRoutes.route("/add").post(
  Authentication,
  Authorization("admin"),
  CreateNewImpLink
);

module.exports = ImportantLinkRoutes;
