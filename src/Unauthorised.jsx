import React from "react";
import { useNavigate } from "react-router-dom";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-neutral-100 dark:bg-neutral-900">
      <h1 className="text-4xl font-bold text-red-600 mb-4">401 - Invalid Access</h1>
      <p className="text-lg text-neutral-700 dark:text-neutral-300 mb-6">
        You are not authorized to view this page.
      </p>
      <button
        onClick={() => navigate("/login")}
        className="rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg hover:shadow-xl transition"
      >
        Go to Login
      </button>
    </div>
  );
}