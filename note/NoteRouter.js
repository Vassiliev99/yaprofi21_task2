const express = require("express");
const noteCtrl = require("./NoteController");
const router = express.Router();


router.post("/notes", noteCtrl.createNote);
router.get("/notes", noteCtrl.getNotes);
router.get("/notes/:id", noteCtrl.getNote);
router.put("/notes/:id", noteCtrl.editNote);
router.delete("/notes/:id", noteCtrl.deleteNote);

module.exports = router;