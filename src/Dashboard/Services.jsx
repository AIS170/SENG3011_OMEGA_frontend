import React from "react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";
import useTextToSpeech from "../hooks/textToSpeech";
import "./Service.css";

// Service component
const Service = () => {
  const navigate = useNavigate();
  let name = "User";

  try {
    const idToken = localStorage.getItem("id_token");
    if (idToken) {
      const decoded = jwtDecode(idToken);
      name = decoded.name || decoded["cognito: username"] || "User";
    }
  } catch (err) {
    console.error("Failed to decode token:", err);
  }

  const speak = useTextToSpeech();

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  return (
    <section className="pb-12 pt-20 dark:bg-dark lg:pb-[90px] lg:pt-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20 text-white">
              <span className="mb-2 block text-lg font-semibold text-primary">
                Welcome Back {name}
              </span>
              <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                Dashboard
              </h2>
              <p className="text-base text-body-color dark:text-dark-6">
                How may we be of assistance today?
              </p>
            </div>
          </div>
        </div>

        <div className="-mx-4 flex flex-wrap">
          <ServiceCard
            title="Stock History"
            details="Your history of previously analysed stock."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  className="w-[36px] h-[36px]"
                  href="./recent-repeat-icon.svg"
                />
              </svg>
            }
            onClick={() => navigate("/history")}
          />
          <ServiceCard
            title="Analyse a Stock"
            details="Get help in deciding whether a stock is right for you based on what its recent performance in the stock market and current news surrounding the stock."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  className="w-[36px] h-[36px]"
                  href="./analysis-icon.svg"
                />
              </svg>
            }
            onClick={() => navigate("/analysis")}
          />
          <ServiceCard
            title="Get Started"
            details="For new members. Learn how to use OMEGA to brighten your investing future."
            icon={
              <svg
                width="36"
                height="36"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <image
                  className="w-[36px] h-[36px]"
                  href="./suggestion-box-icon.svg"
                />
              </svg>
            }
            onClick={() => navigate("/ai-help")}
          />
        </div>
      </div>

      {/* Button to trigger text-to-speech */}
      <button
        onClick={handleReadPage}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
        aria-label="Toggle text to speech"
      >
        🗣️
      </button>
    </section>
  );
};

// ServiceCard component
const ServiceCard = ({ icon, title, details, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full px-4 md:w-1/2 lg:w-1/3 cursor-pointer"
    >
      <div className="mb-9 rounded-[20px] p-10 shadow-4 hover:shadow-lg hover:shadow-purple-100 dark:bg-dark-2 md:px-7 xl:px-10 serviceCard">
        <div className="mb-8 flex h-[70px] w-[70px] items-center justify-center rounded-2xl">
          {icon}
        </div>
        <h4 className="mb-[14px] text-2xl font-semibold text-dark dark:text-white">
          {title}
        </h4>
        <p className="text-body-color dark:text-dark-6">{details}</p>
      </div>
    </div>
  );
};

export default Service;
