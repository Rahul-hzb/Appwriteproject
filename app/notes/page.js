"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { account } from "@/lib/appwrite";
import { createNote, getNotes, deleteNote, updateNote } from "@/services/notes";
import { uploadImage } from "@/services/storage";

import NoteForm from "@/components/NoteForm";
import NotesList from "@/components/NoteList";

export default function NotesPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  // Load Notes
  async function loadNotes() {
    try {
      const user = await account.get();
      const userNotes = await getNotes(user.$id);
      setNotes(userNotes);
    } catch (error) {
      console.log(error);
    }
  }

  // Create / Update Note
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await updateNote(editingId, title, description);

        alert("Note Updated Successfully!");

        setEditingId(null);
      } else {
        const user = await account.get();

        let imageId = "";

        if (image) {
          const uploaded = await uploadImage(image);
          imageId = uploaded.$id;
        }

        await createNote(title, description, imageId, user.$id);

        alert("Note Created Successfully!");
      }

      setTitle("");
      setDescription("");
      setImage(null);

      loadNotes();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
  }

  // Delete Note
  async function handleDelete(noteId) {
    try {
      await deleteNote(noteId);

      alert("Note Deleted Successfully!");

      loadNotes();
    } catch (error) {
      alert(error.message);
    }
  }
  async function handleLogout() {
    try {
      await account.deleteSession("current");

      router.push("/login");
    } catch (error) {
      alert(error.message);
    }
  }

  // Edit Note
  function handleEdit(note) {
    setTitle(note.title);
    setDescription(note.description);
    setEditingId(note.$id);
  }

  // Load Notes on Page Load
  useEffect(() => {
    loadNotes();
  }, []);

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <main className="min-h-screen flex items-center justify-center py-10">
      <div className="w-full max-w-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Notes</h1>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
        <NoteForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          image={image}
          setImage={setImage}
          handleSubmit={handleSubmit}
          editingId={editingId}
          loading={loading}
        />
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border p-3 rounded mt-6 mb-4"
        />

        <NotesList
          notes={notes}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </div>
    </main>
  );
}
