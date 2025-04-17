import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch(
        "http://authloadbalancer-648996409.ap-southeast-2.elb.amazonaws.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        },
      );

      const data = await res.json();
      if (res.ok && data.access_token) {
        setSuccess("Login Successful");
        console.log("Access Token:", data.access_token);
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("id_token", data.id_token);

        const idToken = localStorage.getItem("id_token");
        if (idToken) {
          const decoded = jwtDecode(idToken);
          console.log("User info:", decoded);
        }
      } else {
        setError(data?.message || "Login failed");
        console.error("Login error:", res.status, data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  };

  const logout = async () => {
    const accesToken = localStorage.getItem("access_token");

    await fetch(
      "http://authloadbalancer-648996409.ap-southeast-2.elb.amazonaws.com/logout",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accesToken}`,
        },
      },
    ).then(() => setSuccess(""));
    // then redirect to login page / landing page
  };

  return (
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

              <form onSubmit={handleLogin}>
                <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                  Please login to your account
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
                    Log in
                  </button>
                  <a
                    href="#!"
                    className="mt-3 inline-block text-sm text-blue-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <div className="flex items-center justify-between pt-4">
                  <p className="text-sm text-neutral-600 dark:text-neutral-300">
                    Don't have an account?
                  </p>
                  <button
                    type="button"
                    className="rounded border-2 border-pink-600 px-4 py-1 text-sm font-medium text-pink-600 transition hover:bg-pink-100 dark:hover:bg-neutral-100"
                  >
                    Register
                  </button>
                </div>
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
      <button style={{ border: "2px, black, solid" }} onClick={() => logout()}>
        LOGOUT
      </button>
    </section>
  );
}
