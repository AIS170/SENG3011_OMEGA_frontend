import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
    const navigate = useNavigate();
    return (
        <div className="flex min-h-screen items-center justify-center bg-black">
        <img
            src="/omega.gif"
            alt="Omega Logo Animation"
            className="w-2/3 max-w-md"
        />
        <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-6 py-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 text-white text-lg rounded shadow-lg hover:shadow-xl transition"
        >
            Get Started
        </button>
        </div>
    );
}