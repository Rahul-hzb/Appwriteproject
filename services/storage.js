import { ID } from "appwrite";
import { storage } from "@/lib/appwrite";

const BUCKET_ID = "note-images";

// Upload Image
export async function uploadImage(file) {
  try {
    return await storage.createFile(BUCKET_ID, ID.unique(), file);
  } catch (error) {
    throw error;
  }
}

// Get Image Preview
export function getImagePreview(fileId) {
  const url = storage.getFileView(BUCKET_ID, fileId);

  console.log("Image URL:", url);

  return url;
}
