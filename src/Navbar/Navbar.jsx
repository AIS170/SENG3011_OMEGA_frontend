import { useState } from "react";
import { useNavigate } from "react-router";

export default function Navbar({ currPage }) {
  const navigate = useNavigate();
  const [clickedProfile, setClickedProfile] = useState(false);
  const [clickedMenuButton, setClickedMenuButton] = useState(false);

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login");
      return;
    }

    try {
      await fetch(
        "http://authloadbalancer-648996409.ap-southeast-2.elb.amazonaws.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
    } catch (err) {
      console.error("Logout error:", err);
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    navigate("/login");
  };

  const pages = ["Dashboard", "Stock Market", "Projects", "Calendar"];
  const pageRoutes = {
    Dashboard: "/dashboard",
    "Stock Market": "/stocks",
    Projects: "/projects",
    Calendar: "/calendar",
  };

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
                {pages.map((pageName) => {
                  const cl =
                    currPage === pageName
                      ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      : "rounded-md px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 hover:text-white transition duration-200 ease-out";
                  return (
                    <button
                      key={pageName}
                      onClick={() => navigate(pageRoutes[pageName])}
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
            <button
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 focus:outline-hidden"
            >
              <span className="sr-only">View notifications</span>
              <svg
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022 23.848 23.848 0 0 0 5.454 1.31m5.715 0a3 3 0 1 1-5.715 0"
                />
              </svg>
            </button>

            <div className="relative ml-3">
              <button
                onClick={() => setClickedProfile((b) => !b)}
                type="button"
                className="relative flex rounded-full bg-gray-800 text-sm transition duration-200 ease-out hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800 hover:cursor-pointer"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="size-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="profile"
                />
              </button>

              {clickedProfile && (
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
                  <a
                    onClick={() => navigate("/profile")}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Your Profile
                  </a>
                  <a
                    href="https://discord.gg/wz6EtsHhKR"
                    className="block px-4 py-2 text-sm text-gray-700"
                  >
                    Join our Discord <i className="fa-brands fa-discord"></i>
                  </a>
                  <a
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Sign out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="sm:hidden" id="mobile-menu">
        {clickedMenuButton && (
          <div className="space-y-1 px-2 pt-2 pb-3">
            {pages.map((pageName) => {
              const cl =
                currPage === pageName
                  ? "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                  : "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition duration-200 ease-out";
              return (
                <button
                  key={pageName}
                  onClick={() => navigate(pageRoutes[pageName])}
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
