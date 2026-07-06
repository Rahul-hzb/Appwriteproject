"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin(event) {
    event.preventDefault();

    try {
      // Check if the user is already logged in
      await account.get();

      alert("You are already logged in.");

      router.push("/dashboard");
    } catch {
      try {
        // No active session, create one
        await account.createEmailPasswordSession(email, password);

        alert("Login Successful!");

        router.push("/dashboard");
      } catch (error) {
        alert(error.message);
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 border rounded-lg space-y-4"
      >
        <h1 className="text-3xl font-bold text-center">Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Login
        </button>
      </form>
    </main>
  );
}
