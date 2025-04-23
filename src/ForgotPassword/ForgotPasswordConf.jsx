import { useState } from "react";
import useTextToSpeech from "../hooks/textToSpeech";
import ConfirmCodeInput from "../Input";
import { useNavigate, useLocation } from "react-router-dom";

export default function ForgotPasswordConf() {
  const location = useLocation();
  const navigate = useNavigate();
  const [username] = useState(location.state.username);
  const [conf_code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [resendConf, setResendConf] = useState(false);

  const speak = useTextToSpeech();

  const [password, setPassword] = useState("");

  const handleReadPage = () => {
    const text = document.body.innerText;
    speak(text);
  };

  async function requestResend(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setResendConf(false);
    try {
      const res = await fetch(
        "https://auth.omega-financials.com/resend_confirmation_code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
          }),
        },
      );

      const data = await res.json();
      console.log(res.ok, data);
      if (res.ok) {
        setResendConf(true);
      } else {
        setError(data?.message || "Unable to resend confirmation code");
        console.error(
          "Password Reset Conf Code Reset Error:",
          res.status,
          data,
        );
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  }

  async function handleForgotPasswordConf(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log(username, conf_code, password);
    try {
      const res = await fetch(
        "https://auth.omega-financials.com/confirm_forgot_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            conf_code: conf_code,
            new_password: password,
          }),
        },
      );

      const data = await res.json();
      console.log("Peeking forgot password conf REQ", res.status, data);
      if (res.ok) {
        console.log("Successful forgot password conf REQ", res.status, data);
        setSuccess(data);
        console.log(success);
        navigate("/login");
      } else {
        setError(data?.message || "Unable to confirm password reset");
        console.error("Password Reset Confirmation Error:", res.status, data);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      console.error(err);
    }
  }
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

              <form onSubmit={handleForgotPasswordConf}>
                <p className="mb-4 text-neutral-600 dark:text-neutral-300">
                  You will be emailed a confirmation code. Provide it below
                  along with a new password.
                </p>

                <div className="mb-4">
                  <label className="block mb-1 text-sm text-neutral-700 dark:text-neutral-300">
                    Confirmation Code
                  </label>
                  <ConfirmCodeInput onComplete={(code) => setCode(code)} />
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
                {resendConf && (
                  <p className="mb-4 text-sm text-green-600 text-center">
                    A new confirmation code has been sent
                  </p>
                )}
                <div className="mb-4 text-center">
                  <button
                    type="submit"
                    className="w-full rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg transition hover:shadow-xl"
                  >
                    Reset password
                  </button>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <p
                    className="hover:cursor-pointer text-sm underline text-neutral-600 dark:text-neutral-300"
                    onClick={requestResend}
                  >
                    Resend verification code
                  </p>
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="rounded border-2 border-pink-600 px-4 py-1 text-sm font-medium text-pink-600 transition hover:bg-pink-100 dark:hover:bg-neutral-100"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
            {/* Right Side – Info Panel */}
            <div className="flex w-full items-center justify-center rounded-b-lg bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 p-8 text-white lg:w-1/2 lg:rounded-r-lg lg:rounded-bl-none">
              <div>
                <h4 className="mb-4 text-xl font-semibold"></h4>
                <p className="text-sm"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
