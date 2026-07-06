"use client";

import { useState } from "react";
import { ID } from "appwrite";
import { account } from "@/lib/appwrite";


export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



async function handleSignup(event) {
  event.preventDefault();

  try {
    const user = await account.create(ID.unique(), email, password, name);

    console.log("User created successfully:", user);
  } catch (error) {
    console.error("Signup failed:", error);
  }
}

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSignup}
        className="w-full max-w-md p-6 border rounded-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Sign Up</h1>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Create Account
        </button>
      </form>
    </main>
  );
}
