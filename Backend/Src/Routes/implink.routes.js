const express = require("express");
const { Authorization, Authentication } = require("../Middlewares/Auth");
const {
  CreateNewImpLink,
  AdminImpLinksController,
  SearchImpLinksController,
  GetAllImpLinksController,
  AdminSingleGetLinkController,
  AdminUpdateLinkLinkController,
} = require("../Controllers/implink.controller");

const ImportantLinkRoutes = express.Router();

ImportantLinkRoutes.route("/add").post(
  Authentication,
  Authorization("admin"),
  CreateNewImpLink
);

ImportantLinkRoutes.route("/admin/all").get(
  Authentication,
  Authorization("admin", "teacher"),
  AdminImpLinksController
);
ImportantLinkRoutes.route("/admin/single/:linkid")
  .get(AdminSingleGetLinkController)
  .put(Authentication, Authorization("admin"), AdminUpdateLinkLinkController);

ImportantLinkRoutes.route("/getall").get(GetAllImpLinksController);
ImportantLinkRoutes.route("/search").get(SearchImpLinksController);

module.exports = ImportantLinkRoutes;
