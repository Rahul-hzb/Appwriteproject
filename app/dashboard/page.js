"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { account } from "@/lib/appwrite";

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const currentUser = await account.get();

      setUser(currentUser);
    } catch (error) {
      router.push("/login");
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-4xl font-bold">Welcome {user.name} 👋</h1>

      <p>Email: {user.email}</p>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-6 py-3 rounded"
      >
        Logout
      </button>
    </main>
  );
}
