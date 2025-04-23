import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import moment from "moment";

import Navbar from "../Navbar/Navbar";
import { getUsername } from "../getUserDetails";
import useTextToSpeech from "../hooks/textToSpeech";
import "./StockInput.css";

const COLLECTION_ENDPOINT = "https://collection.omega-financials.com";
const RETRIEVAL_ENDPOINT = "https://retrieval.omega-financials.com";
const ANALYSIS_ENDPOINT = "https://analytics.omega-financials.com";

export default function StockInput() {
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState(false);
  const [chartData, setChartData] = useState(null);

  const [forecastDays, setForecastDays] = useState(30);
  const [sellThreshold, setSellThreshold] = useState(0.02);
  const [buyThreshold, setBuyThreshold] = useState(-0.02);
  const [chosenCompany, setChosenCompany] = useState(null);

  const [signalsSummary, setSignalsSummary] = useState("");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const speak = useTextToSpeech();
  let name = "User";
  try {
    name = getUsername();
  } catch (e) {
    console.log(e);
  }

  async function analyseStockName(e) {
    e.preventDefault();
    setLoadingResults(true);
    setError(false);
    setChartData(null);
    setSignalsSummary("");

    const company = e.target.company.value.toLowerCase();
    setChosenCompany(company);
    const date = moment().utc().format("YYYY-MM-DD");

    try {
      await fetch(
        `${COLLECTION_ENDPOINT}/stockInfo?name=${name.toLowerCase()}&company=${company}`,
      ).then((r) => r.json());
      await fetch(
        `${COLLECTION_ENDPOINT}/news?name=${name.toLowerCase()}`,
      ).then((r) => r.json());

      const stockDataRetrieval = await fetch(
        `${RETRIEVAL_ENDPOINT}/v2/retrieve/${name.toLowerCase()}/finance/${company}/`,
      ).then((r) => r.json());
      const newsDataRetrieval = await fetch(
        `${RETRIEVAL_ENDPOINT}/v2/retrieve/${name.toLowerCase()}/news/${company}/?date=${date}`,
      ).then((r) => r.json());

      const analysis = await fetch(`${ANALYSIS_ENDPOINT}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock_data: stockDataRetrieval,
          sentiment_analysis: newsDataRetrieval,
          years: 5,
          forecast_days: Number(forecastDays),
          sell_threshold: Number(sellThreshold),
          buy_threshold: Number(buyThreshold),
          user_name: name,
        }),
      }).then((r) => r.json());

      const records = Array.isArray(analysis) ? analysis : analysis.data || [];
      const labels = records.map((r) => moment(r.ds).format("MMM D"));
      const combined = records.map((r) => r.yhat);

      setChartData({
        labels,
        datasets: [
          {
            label: `${company.toUpperCase()} Combined`,
            data: combined,
            borderColor: "#8884d8",
            backgroundColor: "rgba(136, 132, 216, 0.2)",
            tension: 0.3,
            pointRadius: 0,
          },
        ],
      });

      setLoadingSummary(true);
      const prompt = `Here is the analysis output for ${company.toUpperCase()}:\n${JSON.stringify(records, null, 2)}\nPlease summarize the dates where Buy_Signal or Sell_Signal is true, and explain why each signal was triggered in one.`;
      try {
        const aiRes = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4.1-nano",
              messages: [
                {
                  role: "system",
                  content:
                    "List the dates when buy and sell signals are true. Give one line explanation on why signals are true on these dates. Call yhat stock price. Do not bold the text. Remove underscores. Instead of saying buy signal and sell signal, say you should buy on this date or sell on this date.",
                },
                { role: "user", content: prompt },
              ],
              temperature: 0.3,
              max_tokens: 200,
            }),
          },
        );
        const aiData = await aiRes.json();
        setSignalsSummary(
          aiData.choices?.[0]?.message?.content.trim() || "No signals found.",
        );
      } catch (aiErr) {
        console.error("OpenAI error:", aiErr);
        setSignalsSummary("Failed to generate signals summary.");
      } finally {
        setLoadingSummary(false);
      }
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoadingResults(false);
    }
  }

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  return (
    <>
      <Navbar currPage={"Analyse"} />
      <div className="min-h-screen bg-black pb-[10%]">
        <div className="flex flex-col items-center">
          <h1 className="text-white font-semibold text-4xl mt-16 text-center">
            Analyse a Company Stock
          </h1>
          <div className="p-6 w-full max-w-md">
            <div className="typewriter text-white mb-6">
              Enter parameters and click “Analyse.”
            </div>

            <form
              name="stockForm"
              onSubmit={analyseStockName}
              className="border border-white rounded p-6 space-y-4"
            >
              <input
                name="company"
                placeholder="Company name"
                className="w-full bg-white p-2 rounded border border-gray-400 focus:border-orange-400"
                type="text"
                required
              />
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-white mb-1">Forecast Days</label>
                  <input
                    type="number"
                    min="1"
                    value={forecastDays}
                    onChange={(e) => setForecastDays(e.target.value)}
                    className="w-full p-2 rounded border border-gray-400 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white mb-1">
                    Sell Threshold
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={sellThreshold}
                    onChange={(e) => setSellThreshold(e.target.value)}
                    className="w-full p-2 rounded border border-gray-400 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white mb-1">Buy Threshold</label>
                  <input
                    type="number"
                    step="0.001"
                    value={buyThreshold}
                    onChange={(e) => setBuyThreshold(e.target.value)}
                    className="w-full p-2 rounded border border-gray-400 text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white py-2 rounded shadow"
              >
                Analyse
              </button>
              {loadingResults && (
                <div className="flex flex-col items-center text-white mt-4">
                  <p>One moment please…</p>
                  <div role="status" className="mt-[10px] flex justify-center">
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-orange-400"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
        {chartData && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 my-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {chosenCompany.toUpperCase()}’s Forecast
            </h2>
            <Line
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  tooltip: {
                    mode: "index",
                    intersect: false,
                    callbacks: {
                      label: function (context) {
                        return `$${context.parsed.y}`;
                      },
                    },
                  },
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Date",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Price ($)",
                    },
                  },
                },
              }}
            />
          </div>
        )}
        {error && (
          <div className="text-red-600 bg-white p-4 max-w-md mx-auto mt-6 text-center rounded">
            Something went wrong. Please check your inputs and try again.
          </div>
        )}
        {signalsSummary && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 my-6">
            <h2 className="text-2xl font-semibold mb-2 text-gray-800">
              Trading Signals Summary
            </h2>
            {loadingSummary ? (
              <p className="italic">Generating summary…</p>
            ) : (
              <pre className="whitespace-pre-wrap text-gray-800">
                {signalsSummary}
              </pre>
            )}
          </div>
        )}
        <button
          onClick={handleReadPage}
          className="fixed bottom-6 right-6 bg-blue-600 p-4 rounded-full text-white shadow-lg hover:bg-blue-700"
          aria-label="Read page aloud"
        >
          🗣️
        </button>
      </div>
    </>
  );
}
