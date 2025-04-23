import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import moment from "moment";

import Navbar from "../Navbar/Navbar";
import { getUsername } from "../getUserDetails";
import useTextToSpeech from "../hooks/textToSpeech";
import "./StockInput.css";

const COLLECTION_ENDPOINT = "https://collection.omega-financials.com";
const RETRIEVAL_ENDPOINT  = "https://retrieval.omega-financials.com";
const ANALYSIS_ENDPOINT   = "https://analytics.omega-financials.com";

export default function StockInput() {
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError]             = useState(false);
  const [chartData, setChartData]     = useState(null);

  // New user-controlled parameters:
  const [forecastDays, setForecastDays]   = useState(30);
  const [sellThreshold, setSellThreshold] = useState(0.02);
  const [buyThreshold, setBuyThreshold]   = useState(-0.02);

  const [chosenCompany, setChosenCompany] = useState(null);
  const speak = useTextToSpeech();
  let name = "User";
  try { name = getUsername(); } catch {}

  async function analyseStockName(e) {
    e.preventDefault();
    setLoadingResults(true);
    setError(false);
    setChartData(null);

    const company = e.target.company.value.toLowerCase();
    setChosenCompany(company)
    const date    = moment().utc().format("YYYY-MM-DD");

    try {
      // 1) COLLECTION
      await fetch(
        `${COLLECTION_ENDPOINT}/stockInfo?name=${name.toLowerCase()}&company=${company}`
      ).then((r) => r.json());
      await fetch(
        `${COLLECTION_ENDPOINT}/news?name=${name.toLowerCase()}`
      ).then((r) => r.json());

      // 2) RETRIEVAL
      const stockDataRetrieval = await fetch(
        `${RETRIEVAL_ENDPOINT}/v2/retrieve/${name.toLowerCase()}/finance/${company}/`
      ).then((r) => r.json());
      const newsDataRetrieval = await fetch(
        `${RETRIEVAL_ENDPOINT}/v2/retrieve/${name.toLowerCase()}/news/${company}/?date=${date}`
      ).then((r) => r.json());

      // 3) ANALYSIS with user-inputs:
      const analysis = await fetch(`${ANALYSIS_ENDPOINT}/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          stock_data:         stockDataRetrieval,
          sentiment_analysis: newsDataRetrieval,
          years:              5,
          forecast_days:      Number(forecastDays),
          sell_threshold:     Number(sellThreshold),
          buy_threshold:      Number(buyThreshold),
          user_name:          name,
        }),
      }).then((r) => r.json());

      // parse for Chart.js...
      const records   = Array.isArray(analysis) ? analysis : analysis.data || [];
      const labels    = records.map(r => moment(r.ds).format("MMM D"));
      const forecast  = records.map(r => r.yhat);
      const lowerBand = records.map(r => r.yhat_lower);
      const upperBand = records.map(r => r.yhat_upper);

      setChartData({
        labels,
        datasets: [
          {
            label: "Forecast (yhat)",
            data: forecast,
            fill: false,
            borderColor: "rgba(75,192,192,1)",
            tension: 0.3,
          },
          {
            label: "Lower bound",
            data: lowerBand,
            fill: false,
            borderDash: [5, 5],
            borderColor: "rgba(75,192,192,0.5)",
            tension: 0.3,
          },
          {
            label: "Upper bound",
            data: upperBand,
            fill: "-1",
            backgroundColor: "rgba(75,192,192,0.1)",
            borderDash: [5, 5],
            borderColor: "rgba(75,192,192,0.5)",
            tension: 0.3,
          },
        ],
      });
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

              {/* New parameter inputs */}
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-white mb-1">Forecast Days</label>
                  <input
                    type="number"
                    min="1"
                    value={forecastDays}
                    onChange={e => setForecastDays(e.target.value)}
                    className="w-full p-2 rounded border border-gray-400 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white mb-1">Sell Threshold</label>
                  <input
                    type="number"
                    step="0.001"
                    value={sellThreshold}
                    onChange={e => setSellThreshold(e.target.value)}
                    className="w-full p-2 rounded border border-gray-400 text-white"
                  />
                </div>
                <div>
                  <label className="block text-white mb-1">Buy Threshold</label>
                  <input
                    type="number"
                    step="0.001"
                    value={buyThreshold}
                    onChange={e => setBuyThreshold(e.target.value)}
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
                  <svg
                    role="status"
                    className="w-8 h-8 mt-2 text-gray-200 animate-spin fill-orange-400"
                    viewBox="0 0 100 101"
                  >
                    <path d="M100 50.59 ... (spinner path) ..." />
                  </svg>
                </div>
              )}
            </form>
          </div>
        </div>

        {error && (
          <div className="text-red-600 bg-white p-4 max-w-md mx-auto mt-6 text-center rounded">
            Something went wrong. Please check your inputs and try again.
          </div>
        )}

        {chartData && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6 my-10">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              {chosenCompany.toUpperCase()}’s Forecast & Confidence Interval
            </h2>
            <Line data={chartData} />
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
StockInput