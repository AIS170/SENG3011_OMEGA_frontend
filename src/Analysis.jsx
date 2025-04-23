import React, { useEffect, useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "./Navbar/Navbar";
import { useLocation } from "react-router-dom";

export default function Analysis() {
  const location = useLocation();
  const chartDataInput = location.state?.chartData;
  const analysisInput = location.state?.analysis;
  const company = location.state?.company || "Company";
  const forecastData = location.state?.forecast || [];

  const [chartData, setChartData] = useState(null);
  const [analysis, setAnalysis] = useState("Loading analysis...");

  const extendedChartData = useMemo(() => {
    if (!chartDataInput || !forecastData.length) return null;

    const baseDataset = chartDataInput.datasets[0];
    const labels = [...chartDataInput.labels];

    const forecastLabels = forecastData.map((d) =>
      new Date(d.ds).toISOString().split("T")[0]
    );
    const forecastPrices = forecastData.map((d) => d.yhat);

    return {
      labels: [...labels, ...forecastLabels],
      datasets: [
        baseDataset,
        {
          label: `${company.toUpperCase()} Forecasted`,
          data: new Array(labels.length).fill(null).concat(forecastPrices),
          borderColor: "#FF6384",
          backgroundColor: "rgba(255,99,132,0.2)",
          pointRadius: 3,
          tension: 0.3,
        },
      ],
    };
  }, [chartDataInput, forecastData, company]);

  useEffect(() => {
    if (extendedChartData) setChartData(extendedChartData);
    if (analysisInput) setAnalysis(analysisInput);
  }, [extendedChartData, analysisInput]);

  return (
    <>
      <Navbar currPage="Analyse" />
      <div className="min-h-screen bg-black text-white px-4 py-10 flex flex-col items-center justify-start">
        <h1 className="text-center w-full font-semibold text-4xl mt-10">
          {company.toUpperCase()} Stock Analysis
        </h1>

        <div className="w-full max-w-4xl mt-10 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
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
                        return `$${context.parsed.y.toFixed(2)}`;
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
            <p className="text-black text-center">Loading chart...</p>
          )}
        </div>

        <div className="w-full max-w-4xl mt-6 bg-white dark:bg-neutral-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 text-black dark:text-white">
            OMEGA AI Analysis:
          </h2>
          <p className="text-black dark:text-neutral-300 whitespace-pre-wrap">
            {analysis}
          </p>
        </div>
      </div>
    </>
  );
}