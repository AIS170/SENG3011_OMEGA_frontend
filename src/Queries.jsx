import { useState } from "react";
import useTextToSpeech from "./hooks/textToSpeech";
import Navbar from "./Navbar/Navbar";

export default function Queries() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const speak = useTextToSpeech();

  const handleAsk = () => {
    // You can replace this with your new logic
    setResponse("Thank you for your query. We'll get back to you shortly.");
  };

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  return (
    <>
      <Navbar />
    
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold mb-4 text-neutral-800 dark:text-white">
        What do you need help with?
      </h1>
      <textarea
        className="w-full max-w-xl p-3 border rounded mb-4 dark:bg-neutral-800 dark:text-white"
        rows="4"
        placeholder="Describe what you need help with..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={handleAsk}
        className="rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg hover:shadow-xl transition"
      >
        Submit
      </button>

      {response && (
        <div className="mt-6 max-w-xl bg-white dark:bg-neutral-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-neutral-700 dark:text-white">
            Response:
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-line">
            {response}
          </p>
        </div>
      )}

      {/* Button to toggle text-to-speech */}
      <button
        onClick={handleReadPage}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
        aria-label="Toggle text to speech"
      >
        🗣️
      </button>
    </div>
    </>
  );
}
