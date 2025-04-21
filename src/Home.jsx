import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage/LandingPage.css";
import Navbar from "./Navbar/Navbar";
import ScrollButton from "./ScrollButton/ScrollButton";

// Change Log
// added gap-[20px] to first div element - put some gap between the OMEGA gif and the Get Started Button
// Changed colour of shadow when the Get Started bttn is hovered over

// Added left and right navigation buttons to navigate to next sections of the home page
export default function Home() {
  const navigate = useNavigate();
  const coverRef = useRef();
  const section2Ref = useRef();

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
    </>
  );
}
