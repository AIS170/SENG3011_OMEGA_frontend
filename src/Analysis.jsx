import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const rawData = [
  { date: "2025-01-01", price: 20 },
  { date: "2025-01-02", price: 60 },
  { date: "2025-01-03", price: 120 },
  { date: "2025-01-04", price: 179 },
  { date: "2025-01-05", price: 100 },
  { date: "2025-01-06", price: 200 },
  { date: "2025-01-07", price: 300 },
  { date: "2025-01-08", price: 400 },
  { date: "2025-01-09", price: 500 },
];

const forecastDates = ["2025-01-08", "2025-01-09"];

export default function Analysis() {
  const [chartData, setChartData] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const labels = rawData.map((d) => d.date);
    const actual = rawData.map((d) =>
      forecastDates.includes(d.date) ? null : d.price,
    );
    const forecast = rawData.map((d) =>
      forecastDates.includes(d.date) ? d.price : null,
    );
    const combined = rawData.map((d) => d.price);

    setChartData({
      labels,
      datasets: [
        {
          label: "AAPL Combined",
          data: combined,
          borderColor: "#8884d8",
          backgroundColor: "rgba(136, 132, 216, 0.2)",
          tension: 0.3,
          pointRadius: 0,
          hidden: false, // hide unless debugging
        },
        {
          label: "Actual",
          data: actual,
          borderColor: "#8884d8",
          backgroundColor: "rgba(136, 132, 216, 0.3)",
          tension: 0.3,
          pointRadius: 4,
        },
        {
          label: "Forecast",
          data: forecast,
          borderColor: "#ff4d4f",
          backgroundColor: "rgba(255, 77, 79, 0.2)",
          tension: 0.3,
          pointRadius: 6,
        },
      ],
    });
  }, []);

  const fetchAnalysis = async () => {
    setLoading(true);
    const prompt = `
You are a financial analyst AI working for Omega Financials. 

You have been provided a time-series line chart visualizing the stock price of Apple Inc. (AAPL). The chart includes:

• Dates: From 2025-01-01 to 2025-01-09
• Actual prices: 
  - Jan 01: $20
  - Jan 02: $60
  - Jan 03: $120
  - Jan 04: $179
  - Jan 05: $100
  - Jan 06: $200
  - Jan 07: $300

• Forecasted prices:
  - Jan 08: $400
  - Jan 09: $500

The graph includes a solid line showing actual data, and a red line showing the forecast.

Your task:
1. Identify what this graph is measuring and what the trend shows.
2. Describe the stock’s performance and whether it has upward momentum.
3. Highlight any buy/sell signals based on trends or forecasts.
4. Evaluate whether this stock appears undervalued or overvalued.
5. Give a beginner-friendly summary of what the graph tells us.
`;

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPEN_AI_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: "You are a helpful financial analysis assistant.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      });

      const data = await res.json();
      setAnalysis(
        data.choices?.[0]?.message?.content || "No analysis available.",
      );
    } catch (error) {
      console.error("Error fetching analysis:", error);
      setAnalysis("Failed to fetch analysis.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-neutral-800 dark:text-white">
        AAPL Stock Analysis (Chart.js)
      </h1>

      <div className="w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-lg shadow p-6 mb-10">
        {chartData ? (
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
        ) : (
          <p>Loading chart...</p>
        )}
      </div>

      <div className="w-full max-w-4xl bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4 text-neutral-800 dark:text-white">
          OMEGA AI Analysis:
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap">
          {loading ? "Loading analysis..." : analysis}
        </p>
      </div>
    </div>
  );
}
