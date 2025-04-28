"use client";

import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar";

const countries = [
  "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Canada",
  "Chile", "China", "Colombia", "Costa_Rica", "Czech_Republic", "Denmark",
  "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland",
  "India", "Ireland", "Israel", "Italy", "Japan", "Latvia", "Lithuania",
  "Luxembourg", "Mexico", "Netherlands", "New_Zealand", "Norway", "Poland",
  "Portugal", "Singapore", "Slovak_Republic", "Slovenia", "South_Korea",
  "Spain", "Sweden", "Switzerland", "United_Kingdom", "USA"
];

export default function Queries() {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [macroData, setMacroData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMacroData = async (country) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://2lf9xfrmxa.execute-api.ap-southeast-2.amazonaws.com/dev/macro/country/${country}`
      );
      setMacroData(response.data);
    } catch (error) {
      console.error("Error fetching macro data", error);
      setMacroData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (e) => {
    const country = e.target.value;
    setSelectedCountry(country);
    if (country) {
      fetchMacroData(country);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-gray-900 mb-6 text-white">
      <Navbar currPage="Get Started" />
      <h1 className="text-4xl font-bold mb-8 mt-6">Macroeconomic Data Viewer</h1>

      <select
        value={selectedCountry}
        onChange={handleSelectChange}
        className="mb-10 p-3 rounded-lg border border-gray-700 bg-gray-800 text-white"
      >
        <option value="">Select a country</option>
        {countries.map((country) => (
          <option key={country} value={country}>
            {country.replace(/_/g, " ")}
          </option>
        ))}
      </select>

      {loading && <p className="text-gray-400">Loading...</p>}

      {macroData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl">
          {Object.entries(macroData).map(([key, value]) => (
            <div
              key={key}
              className="p-6 rounded-2xl shadow-lg bg-gradient-to-br from-orange-500 to-pink-500 hover:scale-105 transition-transform"
            >
              <h2 className="text-2xl font-bold mb-2">{key}</h2>
              <p className="text-sm text-gray-200">Date: {value.date}</p>
              <p className="text-3xl font-extrabold mt-2">{value.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
