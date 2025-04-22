import { useState } from "react";
import { useNavigate } from "react-router";
// import { ReactComponent as OmegaLogo } from "src/images/omega.svg";

export default function Navbar({ refs }) {
  const navigate = useNavigate();
  const [clickedMenuButton, setClickedMenuButton] = useState(false);

  const pages = ["OMEGA", "Invest With Confidence"];

  function scrollByY(ref) {
    ref.current.scrollIntoView({ behaviour: "instant", block: "start" });
  }

  return (
    <nav className="bg-gray-600 h-fit w-screen">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile Menu Toggle */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                onClick={() => setClickedMenuButton((b) => !b)}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          {/* Logo + Tabs */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="./omega.png"
                alt="Omega Financials"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {pages.map((pageName, i) => {
                  const cl =
                    "rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white transition duration-200 ease-out";
                  return (
                    <button
                      key={pageName}
                      // onClick={() => navigate(pageRoutes[pageName])}
                      onClick={() => scrollByY(refs[i])}
                      className={cl}
                    >
                      {pageName}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Profile */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="relative ml-3">
              <button
                type="button"
                className="relative text-white rounded-[4px] bg-gray-800 px-[14px] py-[10px] text-sm transition duration-200 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 hover:cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </button>
            </div>
            <div className="relative ml-3">
              <button
                type="button"
                className="relative  text-white rounded-[4px] bg-gray-800 px-[14px] py-[10px] text-sm transition duration-200 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 hover:cursor-pointer"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden" id="mobile-menu">
        {clickedMenuButton && (
          <div className="space-y-1 px-2 pt-2 pb-3">
            {pages.map((pageName, i) => {
              const cl =
                "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-out";
              return (
                <button
                  key={pageName}
                  // onClick={() => navigate(pageRoutes[pageName])}
                  onClick={() => scrollByY(refs[i])}
                  className={cl}
                >
                  {pageName}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
