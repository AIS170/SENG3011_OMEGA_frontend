import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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

const chartData = rawData.map((d) => ({
  date: d.date,
  price: forecastDates.includes(d.date) ? null : d.price,
  forecast: forecastDates.includes(d.date) ? d.price : null,
  combined: d.price,
}));

export default function Analysis() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

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
          Authorization: `Bearer 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`, // Replace with real key during dev
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
      setAnalysis(data.choices?.[0]?.message?.content || "No analysis available.");
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
        AAPL Stock Analysis (Placeholder)
      </h1>

      <div className="w-full max-w-4xl h-96 mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line
              type="linear"
              dataKey="combined"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={false}
              connectNulls={true}
            />
            <Line
              type="linear"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              dot
              name="Actual"
            />
            <Line
              type="linear"
              dataKey="forecast"
              stroke="#ff4d4f"
              strokeWidth={2}
              dot={{ r: 6 }}
              name="Forecast"
            />
          </LineChart>
        </ResponsiveContainer>
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
