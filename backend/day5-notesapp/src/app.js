const express = require("express");
const cors =require('cors');
const NotesModel = require("./models/notes.models");
const connectDB = require("./config/db");
const createNotesController = require("./controllers/notes.controller");
const notesRoute = require("./routes/notes.route");

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
}))

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("ok got it");
});

// app.post("/create", async (req, res) => {
  
// })

app.use("/notes", notesRoute);

app.get("/allNotes", async (req, res) => {
  
});

module.exports = app;