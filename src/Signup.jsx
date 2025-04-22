import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useTextToSpeech from "./hooks/textToSpeech";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const speak = useTextToSpeech();

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("https://auth.omega-financials.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, name }),
      });

      const data = await res.json();
      if (res.ok && data.user_sub) {
        setSuccess("Signup Successful");
        console.log("UserID:", data.user_sub);
        localStorage.setItem("first_login", "true");
        navigate("/confirm-signup", { state: { username } });
      } else {
        setError(data?.message || "Signup failed");
        console.error("Signup error:", res.status, data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  return (
    <>
      <section className="min-h-screen bg-neutral-200 dark:bg-neutral-700">
        <div className="container mx-auto flex h-full items-center justify-center p-10">
          <div className="w-full max-w-4xl rounded-lg bg-white shadow-lg dark:bg-neutral-800">
            <div className="flex flex-col lg:flex-row">
              {/* Left Side – Form */}
              <div className="w-full lg:w-1/2 p-8 md:p-12">
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

                <form onSubmit={handleSignup}>
                  <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                    Please register your details
                  </p>

                  <div className="mb-4">
                    <label className="block mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter username"
                      className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                      Email
                    </label>
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email"
                      className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                      Password
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
                      required
                    />
                  </div>

                  <div className="mb-6">
                    <label className="block mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter name"
                      className="w-full rounded border border-gray-300 p-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:bg-neutral-700 dark:text-white"
                      required
                    />
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
                      className="w-full rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg transition hover:shadow-xl cursor:pointer"
                    >
                      Verify
                    </button>
                  </div>
                  <a href="/login" className="text-sm underline text-neutral-600 dark:text-neutral-300">
                    Already registered?
                  </a>
                </form>
              </div>

              {/* Right Side – Info Panel */}
              <div className="flex w-full items-center justify-center rounded-b-lg bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-8 text-white lg:w-1/2 lg:rounded-r-lg lg:rounded-bl-none">
                <div>
                  <h4 className="mb-4 text-xl font-semibold">About Us</h4>
                  <p className="text-sm">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Temporibus, expedita iusto veniam atque, magni tempora
                    mollitia dolorum consequatur nulla, neque debitis eos
                    reprehenderit quasi ab ipsum nisi dolorem modi. Quos?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
