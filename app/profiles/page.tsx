"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProfilesPage = () => {

  const router = useRouter();

  useEffect(() => {

    const user =
      localStorage.getItem("user");

    if (!user) {
      router.push("/auth");
    }

  }, []);

  const logout = () => {

    localStorage.removeItem("user");

    router.push("/auth");
  };

  return (
    <div className="h-screen bg-black text-white flex flex-col items-center justify-center gap-6">

      <h1 className="text-4xl font-bold">
        Profiles Page
      </h1>

      <button
        onClick={logout}
        className="bg-red-600 px-6 py-3 rounded-md hover:bg-red-700"
      >
        Logout
      </button>

    </div>
  );
};

export default ProfilesPage;
