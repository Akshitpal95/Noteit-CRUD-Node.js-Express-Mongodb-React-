const express = require("express");

const {
    createNotesController,
    getAllNotesController,
    getSingleNoteController,
    updatedNotesController,
    deleteNoteController
} = require("../controllers/notes.controller");

const router = express.Router();

router.post("/", createNotesController);
router.get("/", getAllNotesController);
router.get("/:id", getSingleNoteController);
router.put("/:id", updatedNotesController);
router.delete("/:id", deleteNoteController);

module.exports = router;

//sari notes ki api hone wali h
