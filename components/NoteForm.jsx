export default function NoteForm({
  title,
  setTitle,
  description,
  setDescription,
  image,
  setImage,
  handleSubmit,
  editingId,
  loading,
}) {
  return (
    <form onSubmit={handleSubmit} className="space-y-4 border rounded-lg p-6">
      <h1 className="text-3xl font-bold text-center">
        {editingId ? "Update Note" : "Create Note"}
      </h1>

      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-3 rounded"
        required
      />

      <textarea
        placeholder="Enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-3 rounded"
        rows={4}
        required
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white p-3 rounded disabled:bg-gray-400"
      >
        {loading ? "Saving..." : editingId ? "Update Note" : "Save Note"}
      </button>
    </form>
  );
}
