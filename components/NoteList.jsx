import NoteCard from "./NoteCard";

export default function NotesList({ notes, handleEdit, handleDelete }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">My Notes</h2>

      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        notes.map((note) => (
          <NoteCard
            key={note.$id}
            note={note}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}
 