import { account } from "@/lib/appwrite";
export default function Home() {
  console.log(account);
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Next.js + Appwrite Connected 🚀</h1>
    </main>
  );
}
