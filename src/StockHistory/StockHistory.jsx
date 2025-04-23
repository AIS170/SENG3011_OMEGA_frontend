import { useEffect, useState } from "react";
import { getUsername } from "../getUserDetails";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Navbar from "../Navbar/Navbar";
import useTextToSpeech from "../hooks/textToSpeech";

const RETRIEVAL_ENDPOINT = "https://retrieval.omega-financials.com";
export default function StockHistory() {
  const [gotStocks, setGotStocks] = useState(false);
  const [stocks, setStocks] = useState([]);

  const [gotStockAnalysis, setGotStockAnalysis] = useState(false);
  const [stockAnalysis, setStockAnalysis] = useState([]);

  const username = getUsername();
  const speak = useTextToSpeech();

  useEffect(() => {
    async function getStocks() {
      await fetch(`${RETRIEVAL_ENDPOINT}/v1/list/${username}/`)
        .then((res) => res.json())
        .then((data) => {
          setStocks(data.Success);
          setGotStocks(true);
        });
    }

    if (!gotStocks) {
      getStocks();
    }
  }, [gotStocks]);

  useEffect(() => {
    async function getAnalysisHistory() {
      const tempStockAnalysis = []
      for (const stock of stocks) {
        if (!stock.startsWith("finance_")) {
          continue;
        }
        // prefix is finance_
        const prefixLength = "finance_".length;
        const stockName = stock.substring(prefixLength);
        console.log(stockName);
        await fetch(
          `${RETRIEVAL_ENDPOINT}/v2/retrieve/${username}/finance/${stockName}/`,
        )
          .then((res) => res.json())
          .then((data) => {
            console.log(data.events);
            tempStockAnalysis.push(data.events);
          });
      }
      console.log(stockAnalysis);


      setGotStockAnalysis(true);
      setStockAnalysis(tempStockAnalysis);
    }

    if (gotStocks) {
      getAnalysisHistory();
    }
  }, [gotStocks]);

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  if (!gotStockAnalysis) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10">
        <div className="border-b-4 border-indigo-500  text-white text-5xl font-semibold mt-[2%] mb-[3%]">
          Previous Stocks
        </div>
        <div className="text-white mb-[1%] text-[24px]">
          Getting your stock history now
        </div>
        <div role="status">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
    );
  } else {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-black flex flex-col items-center justify-center px-4 py-10">
          <div className="border-b-4 border-indigo-500  text-white text-5xl font-semibold mt-[2%] mb-[3%]">
            Previous Stocks
          </div>
          {stockAnalysis.map((stock) => {
            console.log("abcdefg")
            const values = [];
            for (const event of stock) {
              values.push({
                date: event.time_object["time-stamp"],
                price: event.attribute.close,
              });
            }
            console.log(values);

            const labels = values.map((d) => d.date);

            const prices = values.map((d) => d.price);

            const chartData = {
              labels,
              datasets: [
                {
                  label: "Stock Price",
                  data: prices,
                  borderColor: "#8884d8",
                  backgroundColor: "rgba(136, 132, 216, 0.2)",
                  tension: 0.3,
                  pointRadius: 0,
                  hidden: false, // hide unless debugging
                },
              ],
            };
            return (
              <>
                <div className="w-[80%] h-[80%] border-3 border-white mb-[6%] px-[6%] pt-[3%] py-[3%] flex flex-wrap justify-center">
                  <h1
                    key={`h1`}
                    className="text-3xl font-bold text-center w-[100%] mb-6 text-neutral-800 text-white"
                  >
                    {stock[0].attribute["stock_name"].toUpperCase()} Stock Data
                  </h1>
                  <div
                    key={`div`}
                    className="w-full max-w-4xl border-4 border-orange-400 bg-white dark:bg-neutral-800 rounded-lg shadow p-6 mb-10 hover:shadow-xl hover:shadow-orange-400/50 "
                  >
                    <Line
                      key={`Line`}
                      data={chartData}
                      options={{
                        responsive: true,
                        plugins: {
                          tooltip: {
                            mode: "index",
                            intersect: false,
                            callbacks: {
                              label: function (context) {
                                return `$${context.parsed.y.toPrecision(6)}`;
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
                </div>
              </>
            );
          })}
        </div>

        <button
          onClick={handleReadPage}
          className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
          aria-label="Toggle text to speech"
        >
          🗣️
        </button>
      </>
    );
  }
}
