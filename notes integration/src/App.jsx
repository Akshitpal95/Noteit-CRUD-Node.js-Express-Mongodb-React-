
import React, { useState, useEffect } from "react";
import axios from "axios";
import NoteCard from "./components/NoteCard";

const App = () => {
  // Theme state
  const [isDark, setIsDark] = useState(true);

  // Form state
  const [formValues, setformValues] = useState({
    title: "",
    description: "",
  });

  // Notes state
  const [allNotes, setAllNotes] = useState([]);

  // ID of the note currently being edited
  const [updateNoteId, setUpdateNoteId] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    setformValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Fetch all notes
  const getAllNotes = async () => {
    try {
      const res = await axios.get("http://localhost:3000/notes");
      setAllNotes(res.data.data);
    } catch (error) {
      console.log("Error in get all notes API:", error);
    }
  };

  // Create or update a note
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (updateNoteId !== null) {
        // Update existing note
        await axios.put(
          `http://localhost:3000/notes/${updateNoteId}`,
          formValues
        );
      } else {
        // Create new note
        await axios.post(
          "http://localhost:3000/notes",
          formValues
        );
      }

      // Reset form
      setformValues({
        title: "",
        description: "",
      });

      setUpdateNoteId(null);

      // Refresh notes
      await getAllNotes();

    } catch (error) {
      console.log("Error submitting note:", error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/notes/${id}`);
      await getAllNotes();
    } catch (error) {
      console.log("Error deleting note:", error);
    }
  };

  // Load note data into form for editing
  const updateNote = (note) => {
    setUpdateNoteId(note._id);

    setformValues({
      title: note.title,
      description: note.description,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Fetch notes when component loads
  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark
          ? "bg-[#06111F] text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >

      {/* NAVBAR */}
      <nav
        className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
          isDark
            ? "border-[#1D3548] bg-[#081827]/90"
            : "border-slate-200 bg-white/90"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-bold text-white shadow-lg shadow-cyan-500/20">
              N
            </div>

            <div>
              <h1
                className={`text-xl font-bold tracking-tight ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Noteit<span className="text-cyan-500">.</span>
              </h1>

              <p
                className={`text-[10px] font-medium uppercase tracking-[2px] ${
                  isDark ? "text-slate-500" : "text-slate-400"
                }`}
              >
                Your personal workspace
              </p>
            </div>
          </div>

          {/* Navbar right side */}
          <div className="flex items-center gap-3">

            <div
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 sm:flex ${
                isDark
                  ? "border-[#1D3B50] bg-[#10283B]"
                  : "border-slate-200 bg-slate-50"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>

              <span
                className={`text-xs font-medium ${
                  isDark ? "text-[#91A9B9]" : "text-slate-600"
                }`}
              >
                Workspace active
              </span>
            </div>

            {/* Theme toggle */}
            <button
              type="button"
              onClick={() => setIsDark((prev) => !prev)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                isDark
                  ? "border-[#24516A] bg-[#10283B] text-[#8DDCF0] hover:bg-[#173B52]"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
              }`}
            >
              <span>{isDark ? "☀️" : "🌙"}</span>

              <span className="hidden sm:inline">
                {isDark ? "Light mode" : "Dark mode"}
              </span>
            </button>

          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-7xl px-5 py-12">

        {/* Welcome section */}
        <section className="mb-12">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-cyan-500">
            Your space. Your thoughts.
          </p>

          <h2
            className={`text-3xl font-bold tracking-tight sm:text-4xl ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Welcome to your workspace.
          </h2>

          <p
            className={`mt-4 max-w-2xl text-sm leading-7 sm:text-base ${
              isDark ? "text-[#91A9B9]" : "text-slate-600"
            }`}
          >
            Capture your ideas, organise your thoughts and keep
            everything important in one place.
          </p>
        </section>

        {/* Create note section */}
        <section className="mb-16 max-w-3xl">

          <div className="mb-5">
            <h3
              className={`text-xl font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              {updateNoteId !== null ? "Edit your note" : "Create a note"}
            </h3>

            <p
              className={`mt-2 text-sm ${
                isDark ? "text-[#7896AA]" : "text-slate-500"
              }`}
            >
              {updateNoteId !== null
                ? "Make changes to your existing note."
                : "Have something on your mind? Write it down."}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`flex flex-col gap-6 rounded-2xl border p-6 sm:p-9 transition-colors duration-300 ${
              isDark
                ? "border-[#1D4057] bg-gradient-to-br from-[#10283D] to-[#091A2A]"
                : "border-slate-200 bg-white shadow-sm"
            }`}
          >

            {/* Title input */}
            <div>
              <label
                className={`mb-3 block text-xs font-semibold tracking-wider ${
                  isDark ? "text-[#91BBD0]" : "text-slate-600"
                }`}
              >
                NOTE TITLE
              </label>

              <input
                type="text"
                name="title"
                value={formValues.title}
                onChange={handleChange}
                placeholder="Give your note a title..."
                required
                className={`w-full rounded-xl border p-4 outline-none transition-colors ${
                  isDark
                    ? "border-[#24465C] bg-[#081827] text-white placeholder:text-slate-500 focus:border-cyan-500"
                    : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500"
                }`}
              />
            </div>

            {/* Description input */}
            <div>
              <label
                className={`mb-3 block text-xs font-semibold tracking-wider ${
                  isDark ? "text-[#91BBD0]" : "text-slate-600"
                }`}
              >
                DESCRIPTION
              </label>

              <textarea
                name="description"
                value={formValues.description}
                onChange={handleChange}
                placeholder="Start writing your thoughts..."
                minLength={20}
                required
                rows={5}
                className={`w-full resize-y rounded-xl border p-4 outline-none transition-colors ${
                  isDark
                    ? "border-[#24465C] bg-[#081827] text-white placeholder:text-slate-500 focus:border-cyan-500"
                    : "border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 focus:border-cyan-500"
                }`}
              />
            </div>

            {/* Submit button */}
            <div className="flex flex-wrap items-center gap-3">

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-900/20 transition-all hover:-translate-y-0.5 hover:from-cyan-500 hover:to-blue-500"
              >
                {updateNoteId !== null ? "Update Note" : "+ Create Note"}
              </button>

              {updateNoteId !== null && (
                <button
                  type="button"
                  onClick={() => {
                    setUpdateNoteId(null);
                    setformValues({
                      title: "",
                      description: "",
                    });
                  }}
                  className={`rounded-xl border px-5 py-3 text-sm font-medium transition-colors ${
                    isDark
                      ? "border-[#315168] text-slate-300 hover:bg-[#173047]"
                      : "border-slate-300 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Cancel
                </button>
              )}

            </div>
          </form>
        </section>

        {/* Notes collection */}
        <section>

          <div className="mb-7 flex flex-wrap items-center justify-between gap-3">

            <div>
              <h3
                className={`text-2xl font-bold ${
                  isDark ? "text-white" : "text-slate-900"
                }`}
              >
                Your Collection
              </h3>

              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-[#7896AA]" : "text-slate-500"
                }`}
              >
                All your thoughts, organised in one place.
              </p>
            </div>

            <div
              className={`rounded-full border px-4 py-2 text-sm ${
                isDark
                  ? "border-[#24465C] bg-[#10283D] text-cyan-300"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              {allNotes.length} {allNotes.length === 1 ? "Note" : "Notes"}
            </div>

          </div>

          {/* Notes grid */}
          {allNotes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">

              {allNotes.map((val) => (
                <NoteCard
                  key={val._id}
                  note={val}
                  deleteNote={deleteNote}
                  updateNote={updateNote}
                  isDark={isDark}
                />
              ))}

            </div>
          ) : (

            /* Empty state */
            <div
              className={`rounded-2xl border border-dashed p-12 text-center transition-colors ${
                isDark
                  ? "border-[#24465C] bg-[#0B1D2C]"
                  : "border-slate-300 bg-white"
              }`}
            >
              <div className="mb-4 text-4xl">📝</div>

              <h4
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-slate-800"
                }`}
              >
                No notes yet
              </h4>

              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-[#7896AA]" : "text-slate-500"
                }`}
              >
                Your collection is waiting. Create your first note above!
              </p>
            </div>

          )}

        </section>

        {/* Footer */}
        <footer
          className={`mt-20 border-t py-7 text-center text-xs ${
            isDark
              ? "border-[#1D3548] text-slate-500"
              : "border-slate-200 text-slate-400"
          }`}
        >
          Noteit © {new Date().getFullYear()} · Made to organise your thoughts.
        </footer>

      </main>
    </div>
  );
};

export default App;
