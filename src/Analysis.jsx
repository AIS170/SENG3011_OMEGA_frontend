import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
  } from "recharts";
  
const data = [
    { date: "2025-01-01", price: 20 },
    { date: "2025-01-02", price: 60 },
    { date: "2025-01-03", price: 120 },
    { date: "2025-01-04", price: 179 },
    { date: "2025-01-05", price: 100 },
    { date: "2025-01-06", price: 99 },
    { date: "2025-01-07", price: 300 },
  ];

export default function Analysis() {
    return (
        <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center justify-center px-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-neutral-800 dark:text-white">
        AAPL Stock Analysis (Placeholder)
      </h1>
      <div className="w-full max-w-4xl h-96">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    );
};