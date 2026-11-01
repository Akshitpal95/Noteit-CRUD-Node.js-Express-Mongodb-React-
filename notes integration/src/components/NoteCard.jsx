// import React from 'react'

// const NoteCard = ( {note, deleteNote, updateNote}) => {
//   return (
//     <div className="w-[30%] border border-black p-4 rounded-xl ">
//       <h1>{note.title}</h1>
//       <p className="text-xs">{note.description.length > 20 ? note.description.substring(0, 20) + "..." : note.description}</p>
//       <div className="flex justify-between flex flex-col gap-3">
//         <button onClick={() => updateNote(note)} className="p-2 bg-yellow-600 text-white rounded">Update</button>
//         <button onClick={() => deleteNote(note._id)} className="p-2 bg-red-600 text-white rounded">Delete</button>
//       </div>
//     </div>
//   )
// }

// export default NoteCard


import React from 'react';

const NoteCard = ({ note, deleteNote, updateNote, isDark }) => {
  return (
    <div
  className={`group relative flex min-h-[245px] flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 ${
    isDark
      ? "border-[#19364D] bg-gradient-to-br from-[#10283D] to-[#091A2A] hover:border-[#287B9B]"
      : "border-slate-200 bg-white shadow-sm hover:border-cyan-400 hover:shadow-lg"
  }`}
>

      {/* Subtle top accent */}
      <div className="absolute left-0 top-0 h-[2px] w-full
        bg-gradient-to-r from-transparent via-[#22B8D6]
        to-transparent opacity-40
        transition-opacity group-hover:opacity-100">
      </div>

      {/* Card header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[#35B8D5]
            shadow-[0_0_10px_rgba(53,184,213,0.5)]">
          </div>
          <span className="text-[11px] font-semibold
            uppercase tracking-[2px] text-[#6F9DB4]">
            Note
          </span>
        </div>

        <span className="text-xs text-[#42647A]">
          Noteit
        </span>
      </div>

      {/* Note details */}
      <div className="flex-1">
        <h2 className="mb-3 break-words text-xl font-semibold
          tracking-tight text-[#E6F1F7]">
          {note.title}
        </h2>

        <p className="break-words text-sm leading-7
          text-[#91A9B9]">
          {note.description?.length > 150
            ? note.description.substring(0, 150) + '...'
            : note.description}
        </p>
      </div>

      {/* Divider */}
      <div className="my-5 h-px w-full bg-[#1C394D]"></div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => updateNote(note)}
          className="rounded-lg border border-[#24516A]
            bg-[#12364C] px-5 py-2.5 text-sm font-medium
            text-[#8DDCF0] transition-all duration-200
            hover:border-[#38BBDD] hover:bg-[#17475F]
            active:scale-95">
          Edit note
        </button>

        <button
          onClick={() => deleteNote(note._id)}
          aria-label="Delete note"
          className="rounded-lg px-4 py-2.5 text-sm
            font-medium text-[#7892A4]
            transition-all duration-200
            hover:bg-red-500/10 hover:text-red-400
            active:scale-95">
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
