"use client";

import { useState } from "react";

export default function Home() {
  const [selectedToken, setSelectedToken] = useState("SOL");
  const [vsToken, setVsToken] = useState("USDC");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://price.jup.ag/v6/price?ids=${selectedToken}&vsToken=${vsToken}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-50">
      <h1 className="text-5xl font-bold mb-6 text-gray-800">
        Token Price Checker
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md w-11/12 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="selectedToken"
          >
            Select Token
          </label>
          <select
            id="selectedToken"
            value={selectedToken}
            onChange={(e) => setSelectedToken(e.target.value)}
            className="px-4 py-2 border rounded mb-4 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="SOL">SOL</option>
            <option value="JUP">JUP</option>
            <option value="Bonk">Bonk</option>
            <option value="mSOL">mSOL</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="vsToken"
          >
            Select Base Token
          </label>
          <select
            id="vsToken"
            value={vsToken}
            onChange={(e) => setVsToken(e.target.value)}
            className="px-4 py-2 border rounded mb-4 w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USDC">USDC</option>
            <option value="SOL">SOL</option>
            <option value="JUP">JUP</option>
            <option value="Bonk">Bonk</option>
            <option value="mSOL">mSOL</option>
          </select>
        </div>
        <button
          onClick={fetchData}
          className="px-4 py-2 bg-blue-500 text-white rounded w-full hover:bg-blue-600 transition"
        >
          {loading ? "Loading..." : "Get Prices"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {data && (
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-gray-800">Results:</h2>
            <pre className="bg-gray-100 p-4 rounded mt-2 text-gray-700 overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
