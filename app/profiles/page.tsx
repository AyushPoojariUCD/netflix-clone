"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilesPage() {

  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [status, router]);

  // Show loading while checking session
  if (status === "loading") {
    return (
      <div className="h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

      <h1 className="text-3xl">
        Welcome {session?.user?.email}
      </h1>

      <button
        onClick={() =>
          signOut({
            callbackUrl: "/auth",
          })
        }
        className="bg-red-600 px-6 py-3 rounded-md hover:bg-red-700"
      >
        Logout
      </button>

    </div>
  );
}
