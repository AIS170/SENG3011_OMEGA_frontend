import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import useTextToSpeech from "./hooks/textToSpeech";
import "./LandingPage/LandingPage.css";
import Navbar from "./Navbar/Navbar";
import ScrollButton from "./ScrollButton/ScrollButton";

export default function Home() {
  const navigate = useNavigate();
  const coverRef = useRef();
  const section2Ref = useRef();
  const speak = useTextToSpeech();

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  return (
    <>
      <div style={{ overflowY: "scroll", height: "100vh" }}>
        <div className="fixed z-100">
          <Navbar currPage={"Home"} />
        </div>

        <div
          ref={coverRef}
          className="flex min-h-screen items-center flex-wrap items-center-safe justify-center bg-black gap-[2%]"
        >
          <img
            src="/omega.gif"
            alt="Omega Logo Animation"
            className="w-2/3 max-w-md"
          />
          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-6 py-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white text-lg rounded shadow-lg hover:shadow-md hover:shadow-cyan-100 transition hover:cursor-pointer"
          >
            Get Started
          </button>
          <div className="absolute bottom-[10%]">
            <ScrollButton
              left={false}
              right={true}
              rightRef={section2Ref}
              rightText={"Invest with confidence"}
            />
          </div>
        </div>

        <section id="LandingPageSection2" ref={section2Ref}>
          <div id="LandingPage_Analysis" className="LandingPage-leftText">
            <h2>Invest with Confidence</h2>
            <h5>
              OMEGA uses real time financial and news data to make predictions
              on the future performance of different stocks in the stock market
            </h5>
          </div>
          <div className="absolute bottom-[10%]">
            <ScrollButton
              left={true}
              right={false}
              leftRef={coverRef}
              leftText={"OMEGA"}
            />
          </div>
        </section>
      </div>

      {/* Button to trigger text-to-speech */}
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
