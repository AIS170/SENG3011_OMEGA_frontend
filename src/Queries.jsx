import { useState } from "react";

export default function Queries() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer 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", // 🧨 Only for testing!
        },
        body: JSON.stringify({
          model: "gpt-4.1",
          messages: [
            { role: "system", content: `
You are a friendly and knowledgeable assistant at Omega Financials. Omega helps investors make smart decisions using time-series analysis and semantic analysis.

Your job is to guide users who may be confused about how to use the website.

Here is an overview of the website's structure:
- The **Home page** introduces Omega Financials.
- The **Signup/Login pages** are where users create or access their accounts.
- The **Confirm Signup page** is where users verify their email with a confirmation code.
- The **Dashboard** is the main hub once logged in, with tools and services.
- The **Analyse a Stock** page shows time-series data (e.g. stock price charts) to help assess a stock.
- The **Stock History page** (future) will display past stock analyses.
- The **Get Started** (the page you're on) page allows users to ask what they need help with — this is where you respond with clear guidance based on their query.

Your tone should always be warm, helpful, and clear. Assume the user may not know much about finance or technology.
` },
            { role: "user", content: query },
          ],
        }),
      });

      const data = await res.json();
      setResponse(data.choices?.[0]?.message?.content || "No response");
    } catch (err) {
      setResponse("Error occurred");
      console.error(err);
    }

    setLoading(false);
  };

  return (
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
        disabled={loading}
        className="rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg hover:shadow-xl transition"
      >
        {loading ? "Asking..." : "Submit"}
      </button>

      {response && (
        <div className="mt-6 max-w-xl bg-white dark:bg-neutral-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2 text-neutral-700 dark:text-white">Response:</h2>
          <p className="text-neutral-600 dark:text-neutral-300 whitespace-pre-line">{response}</p>
        </div>
      )}
    </div>
  );
}
