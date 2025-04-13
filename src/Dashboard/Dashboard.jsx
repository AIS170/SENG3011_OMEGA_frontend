import { useNavigate } from "react-router";
import Service from "./Services";
import { useEffect } from "react";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/unauthorized");
    }
  }, [navigate]);
  const handleLogout = async () => {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      navigate("/login")
      return;
    }
    try {
      const res = await fetch(
        "http://authloadbalancer-648996409.ap-southeast-2.elb.amazonaws.com/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
      if (res.ok) {
        console.log("Logged Out Successfully");
      } else {
        const err = await res.json();
        console.warn("Logout failed:", err.message || res.status);
      }
    } catch {
      console.error("Logout error:", err);
    }
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    navigate("/");
  }
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex flex-col items-center">
      <Service />
      <div className="mt-10 w-full max-w-xs">
        <button
          onClick={handleLogout}
          className="w-full rounded bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 px-6 py-2 text-white shadow-lg transition hover:shadow-xl"
        >
          Logout
        </button>
      </div>
    </div>
  )
}