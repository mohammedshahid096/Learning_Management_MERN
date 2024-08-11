const express = require("express");
const { Authentication } = require("../Middlewares/Auth");
const {
  CreateNewNoteController,
  AddNewPointController,
  DeletePointController,
  GetAllUserNotesController,
  DeleteNoteController,
  GetSingleNoteController,
  AddRemoveUserToNotesController,
} = require("../Controllers/notes.controller");

const NotesRoutes = express.Router();

NotesRoutes.route("/new-note").post(Authentication, CreateNewNoteController);

NotesRoutes.route("/all").get(Authentication, GetAllUserNotesController);

NotesRoutes.route("/all/:noteId")
  .get(Authentication, GetSingleNoteController)
  .delete(Authentication, DeleteNoteController);

NotesRoutes.route("/note-point/:noteId")
  .post(Authentication, AddNewPointController)
  .delete(Authentication, DeletePointController);

NotesRoutes.route("/users/operations/:noteId").post(
  Authentication,
  AddRemoveUserToNotesController
);

module.exports = NotesRoutes;
