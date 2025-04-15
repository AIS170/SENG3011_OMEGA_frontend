// src/GetStarted.jsx
import React, { useState } from "react";

export default function Queries() {
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // You could POST the query to your backend here
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-neutral-800 dark:text-white">
        How can we help you?
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-xl">
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tell us what you need help with..."
          className="w-full h-40 p-4 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-neutral-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          required
        ></textarea>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg hover:shadow-xl transition"
        >
          Submit
        </button>
      </form>

      {submitted && (
        <p className="mt-6 text-green-600 font-medium text-center">
          Thank you! We'll get back to you soon.
        </p>
      )}
    </div>
  );
}
