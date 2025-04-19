import React, { useEffect } from "react";
import Navbar from "./Navbar/Navbar";

export default function Profile() {
  useEffect(() => {
    // You can fetch user info here if needed
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900">
      {/* Fixed, full-width navbar */}
      <Navbar currPage={null} />

      {/* Add padding to push content below fixed navbar */}
      <div className="pt-20 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-white">
            Your Profile
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300">
            Welcome to your profile page. Here you can view and manage your
            account settings.
          </p>
        </div>
      </div>
    </div>
  );
}
