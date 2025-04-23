import React, { useState } from "react";
import ConfirmCodeInput from "./Input";
import { useNavigate, useLocation } from "react-router-dom";
import useTextToSpeech from "./hooks/textToSpeech";

export default function ConfirmSignup() {
  const location = useLocation();
  const [username] = useState(location.state?.username || "");
  const [conf_code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const speak = useTextToSpeech();

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  const handleConfirmSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "https://auth.omega-financials.com/confirm_signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, conf_code }),
        },
      );

      const data = await res.json();
      if (res.ok) {
        setSuccess("Confirmation Successful");
        navigate("/login");
      } else {
        setError(data?.message || "Confirmation failed");
        console.error("Code error:", res.status, data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <section className="min-h-screen bg-neutral-200 dark:bg-neutral-700">
      <div className="container mx-auto flex h-full items-center justify-center p-10">
        <div className="w-full max-w-4xl rounded-lg bg-white shadow-lg dark:bg-neutral-800">
          <div className="flex flex-col lg:flex-row">
            {/* Left Side – Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12">
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleReadPage}
                  className="fixed bottom-6 right-6 z-50 rounded-full bg-blue-600 p-4 text-white shadow-lg hover:bg-blue-700 focus:outline-none"
                  aria-label="Toggle text to speech"
                >
                  🗣️
                </button>
              </div>

              <div className="text-center mb-6">
                <img
                  className="mx-auto w-32"
                  src="/images.jpeg.png"
                  alt="logo"
                />
                <h4 className="mt-4 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                  We are Omega Financials
                </h4>
              </div>

              <form onSubmit={handleConfirmSignup}>
                <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                  Please enter your confirmation code
                </p>

                <p className="mb-4 text-sm text-center text-neutral-800 dark:text-white">
                  <span className="font-semibold">{username}</span>
                </p>
                <div className="mb-4">
                  <label className="block mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                    Confirmation Code
                  </label>
                  <ConfirmCodeInput onComplete={(code) => setCode(code)} />
                </div>

                {error && (
                  <p className="mb-4 text-sm text-red-500 text-center">
                    {error}
                  </p>
                )}
                {success && (
                  <p className="mb-4 text-sm text-green-500 text-center">
                    {success}
                  </p>
                )}

                <div className="mb-4 text-center">
                  <button
                    type="submit"
                    className="w-full rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg transition hover:shadow-xl"
                  >
                    Confirm Signup
                  </button>
                </div>
              </form>
            </div>

            {/* Right Side – Info Panel */}
            <div className="flex w-full items-center justify-center rounded-b-lg bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-8 text-white lg:w-1/2 lg:rounded-r-lg lg:rounded-bl-none">
              <div>
                <h4 className="mb-4 text-xl font-semibold">About Us</h4>
                <p className="text-sm">
                  We are a team of 5 highly driven engineers who are ready to
                  take the investing world by storm.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
