import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "./Navbar";
import { getUsername } from "../getUserDetails";
import textToSpeech from "../hooks/textToSpeech";

export default function StockM() {
  const [company, setCompany] = useState("");
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const username = getUsername();
  const speak = textToSpeech();

  const handleSearch = async (e) => {
    e.preventDefault();
    setError("");
    setStockData(null);
    setLoading(true);

    try {
      const response = await fetch(
        `https://collection.omega-financials.com/stockInfo?company=${company}&name=${username}`,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to fetch stock data.");
      }

      const records = data.data || [];
      const labels = records.map((e) => e.Date);
      const prices = records.map((e) => parseFloat(e.Close || 0));

      setStockData({
        labels,
        datasets: [
          {
            label: `${company.toUpperCase()} Stock Price`,
            data: prices,
            fill: true,
            backgroundColor: "rgba(0, 0, 0, 0.2)",
            borderColor: "rgba(75,192,192,1)",
            pointRadius: 4,
            tension: 0.3,
          },
        ],
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  return (
    <>
      <Navbar currPage="Stock Market" />
      <div className="bg-black min-h-screen text-white px-4 py-10 flex flex-col items-center justify-start">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Search a Company to View Stock
        </h1>

        <form onSubmit={handleSearch} className="w-full max-w-lg text-center">
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter company name (e.g., Apple)"
            className="w-full mb-4 p-3 rounded border border-gray-300 text-black bg-white focus:border-orange-400 focus:outline-none"
            required
          />

          <button
            type="submit"
            className="w-full rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg hover:shadow-xl"
          >
            {loading ? "Fetching..." : "Fetch Stock Data"}
          </button>
        </form>

        {error && (
          <div className="mt-6 bg-white text-red-600 p-4 rounded shadow max-w-lg w-full text-center">
            {error}
          </div>
        )}

        {stockData && (
          <div className="w-full max-w-4xl mt-10 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
              {company.toUpperCase()} Stock Performance
            </h2>
            <Line data={stockData} />
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
