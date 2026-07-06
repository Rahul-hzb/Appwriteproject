import { ID, Query } from "appwrite";
import { databases } from "@/lib/appwrite";

const BUCKET_ID = "note-images";

const DATABASE_ID = "servicehub-db";
const TABLE_ID = "notes";

// Create

export async function createNote(title, description, imageId, userId) {
  try {
    return await databases.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
      title,
      description,
      imageId,
      completed: false,
      userId,
    });
  } catch (error) {
    console.log("Full Error:", error);
    console.log("Message:", error.message);
    throw error;
  }
}


// Read
export async function getNotes(userId) {
  try {
    const response = await databases.listDocuments(DATABASE_ID, TABLE_ID, [
      Query.equal("userId", userId),
    ]);

    return response.documents;
  } catch (error) {
    throw error;
  }
}

// Delete
export async function deleteNote(noteId) {
  try {
    await databases.deleteDocument(DATABASE_ID, TABLE_ID, noteId);
  } catch (error) {
    throw error;
  }
}
export async function updateNote(noteId, title, description, imageId) {
  try {
    const note = await databases.updateDocument(DATABASE_ID, TABLE_ID, noteId, {
      title,
      description,
      imageId,
    });

    return note;
  } catch (error) {
    throw error;
  }
}
  




