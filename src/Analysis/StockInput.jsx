import { getUsername } from "../getUserDetails";
import "./StockInput.css";
import Navbar from "../Navbar/Navbar";
import { useState } from "react";
import moment from "moment";

// Button taken from https://v1.tailwindcss.com/components/buttons
const COLLECTION_ENDPOINT = "https://collection.omega-financials.com";
const RETRIEVAL_ENDPOINT = "https://retrieval.omega-financials.com";
const ANALYSIS_ENDPOINT =
  "http://analytics-load-balancer-2055996024.ap-southeast-2.elb.amazonaws.com";
export default function StockInput() {
  const [loadingResults, setLoadingResults] = useState(false);
  const [error, setError] = useState(false);

  let name = "User";

  try {
    name = getUsername();
  } catch (err) {
    console.error("Failed to decode token:", err);
  }

  async function analyseStockName(e) {
    e.preventDefault();
    setLoadingResults(true);
    setError(false);
    const company = e.target[0].value.toLowerCase();
    console.log(company);

    const date = moment().format("YYYY-MM-DD");

    // Collection
    console.log(`NAME = ${name}`);

    const collectionRes = await fetch(`${COLLECTION_ENDPOINT}/stockInfo?name=${name.toLowerCase()}&company=${company}`)
    .then((res) => res.json())

    const newsCollection = await fetch(`${COLLECTION_ENDPOINT}/news?name=${name.toLowerCase()}`);
    console.log(`stock data collection Res:`)
    console.log(collectionRes);
    console.log(`news collection Res:`)
    console.log(newsCollection)


    // Retrieval
    const stockDataRetrieval = await fetch(`${RETRIEVAL_ENDPOINT}/v2/retrieve/${name.toLowerCase()}/finance/${company}`)
      .then((res) => res.json())

    const newsDataRetrieval = await fetch(`${RETRIEVAL_ENDPOINT}/v2/retrieve/${name.toLowerCase()}/news/${company}?date=${date}`)
      .then((res) => res.json())

    console.log(`stock data retrieval`);
    console.log(stockDataRetrieval);

    console.log(`nes data retrieval`);
    console.log(newsDataRetrieval);

    // Analysis
    const analysis = await fetch(`${ANALYSIS_ENDPOINT}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stock_data: stockDataRetrieval,
        sentiment_analysis: newsDataRetrieval,
        years: 5,
        forecast_days: 30,
        sell_threshold: 0.02,
        buy_threshold: -0.02,
        user_name: name
      }),
    })
    .then((res) => res.json())
    setLoadingResults(false);
    console.log(analysis);
    return analysis;
  }

  return (
    <>
      <Navbar currPage={"Analyse"} />
      <div className=" min-h-screen bg-black">
        <div className="flex items-center justify-center flex-wrap">
          <div className="text-center w-[100%] font-semibold text-[50px] mt-[4%] text-white">
            Analyse a Company Stock
          </div>
          <div className="p-[4%]">
            <div className="typewriter text-white">
              Enter a company to analyse their stocks.
            </div>

            <form
              onSubmit={(e) => analyseStockName(e)}
              className="border-3 border-white mt-[8%] rounded-sm p-[8%]"
            >
              <input
                placeholder="Company name"
                className="bg-white rounded-sm p-[8px] border-2 border-gray-400 unselectable focus:border-orange-400"
                type="text"
              />
              <br />
              <button
                type="submit"
                className="mt-[16px] hover:cursor-pointer rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg transition hover:shadow-xl submitButton"
              >
                Analyse
              </button>

              {/* Tailwind for spinner taken from https://flowbite.com/docs/components/spinner/ */}
              {loadingResults && (
                <>
                  <div className="text-white mt-[25px]">
                    {" "}
                    One moment please:{" "}
                  </div>
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
                </>
              )}
            </form>
          </div>
        </div>
        {error && (
          <div className="text-center text-red-600 bg-white p-[2%]">
            Ensure you have provided a valid company name. If the problem
            persists, contact us through the{" "}
            <a href="/ai-help" className="underline text-blue-400">
              help
            </a>{" "}
            page.
          </div>
        )}
      </div>
    </>
  );
}
