import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage/LandingPage.css"
import { useIsVisible } from "./IsVisible";
import Navbar from "./Navbar/Navbar";

// Change Log
// added gap-[20px] to first div element - put some gap between the OMEGA gif and the Get Started Button
// Changed colour of shadow when the Get Started bttn is hovered over


// Found a "UseIsVisible (IsVisible.jsx) Hook which helps for 'fade in' transitions
//      Section element has a screen-sized image
export default function Home() {
  const navigate = useNavigate();

  const section2Ref = useRef();
  const isVisibleSec2 = useIsVisible(section2Ref)

  return (
    <>
    <div style={{ overflowY: 'scroll', height: '100vh' }}>
    <Navbar currPage={"Home"}/>
    
      <div className="flex min-h-screen items-center flex-wrap justify-center h-max bg-black gap-[20px]">
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
      </div>

      <section id="LandingPageSection2" ref={section2Ref} className={`transition-opacity ease-in duration-700 ${isVisibleSec2 ? "opacity-100" : "opacity-0"}`}>
        <div id="LandingPage_Analysis"  className="LandingPage-leftText">
          <h2>Invest with Confidence</h2>
          <h5>OMEGA uses real time financial and news data to make predictions on the future performance of different stocks in the stock market</h5>
        </div>
      </section>
    
    </div>  
    </>
    );
}
