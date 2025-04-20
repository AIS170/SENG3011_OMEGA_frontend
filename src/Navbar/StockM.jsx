import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "./Navbar";

const StockM = () => {
  const [chartData, setChartData] = useState(null);
  const [stockName, setStockName] = useState("");

  useEffect(() => {
    const jsonData = {
      data_source: "yahoo_finance",
      dataset_type: "Daily stock data",
      stock_name: "apple",
      events: [
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "244.47000122070312",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/18",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "244.8699951171875",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/19",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "245.8300018310547",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/20",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "245.5500030517578",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/21",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "247.10000610351562",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/24",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "247.0399932861328",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/25",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "240.36000061035156",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/26",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "237.3000030517578",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/27",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "241.83999633789062",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/02/28",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "238.02999877929688",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/03",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "235.92999267578125",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/04",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "235.74000549316406",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/05",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "235.3300018310547",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/06",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "239.07000732421875",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/07",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "227.47999572753906",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/10",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "220.83999633789062",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/11",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "216.97999572753906",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/12",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "209.67999267578125",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/13",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "213.49000549316406",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/14",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
        {
          "event-type": "stock-ohlc",
          attribute: {
            stock_name: "apple",
            close: "214.0",
          },
          time_object: {
            duration: "0",
            "time-stamp": "2025/03/17",
            "time-zone": "GMT+11",
            "duration-unit": "days",
          },
        },
      ],
    };

    const labels = jsonData.events.map(
      (event) => event.time_object["time-stamp"],
    );
    const dataPoints = jsonData.events.map((event) =>
      parseFloat(event.attribute.close),
    );

    setStockName(jsonData.stock_name); // 👈 Save stock name to state
    setChartData({
      labels,
      datasets: [
        {
          label: `${jsonData.stock_name.toUpperCase()} Stock Price`,
          data: dataPoints,
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "rgba(75,192,192,1)",
          pointRadius: 4,
          tension: 0.3,
        },
      ],
    });
  }, []);

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 min-h-screen">
      <Navbar currPage="Stock Market" />

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-white">
          {chartData ? `${stockName.toUpperCase()} Stock` : "Loading..."}
        </h2>
        <div className="w-full max-w-4xl">
          {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
        </div>
      </div>
    </div>
  );
};

export default StockM;
