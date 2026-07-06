import { getImagePreview } from "@/services/storage";

export default function NoteCard({ note, handleEdit, handleDelete }) {
  return (
    <div className="border rounded-lg p-4 mb-4">
      {note.imageId && (
        <img
          src={getImagePreview(note.imageId)}
          alt={note.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        

      )}

      <h3 className="text-xl font-semibold">{note.title}</h3>

      <p className="mt-2">{note.description}</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleEdit(note)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Edit
        </button>

        <button
          onClick={() => handleDelete(note.$id)}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
