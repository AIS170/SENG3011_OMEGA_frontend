import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import textToSpeech from "./hooks/textToSpeech";

export default function Profile() {
  const speak = textToSpeech();

  useEffect(() => {
    // You can fetch user info here if needed
  }, []);

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

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

      {/* Button to trigger text-to-speech */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleReadPage} // Trigger reading the page
          className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
          aria-label="Toggle text to speech"
        >
          🗣️
        </button>
      </div>
    </div>
  );
}
