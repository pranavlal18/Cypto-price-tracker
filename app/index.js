"use client"
import { useState } from "react";
import axios from "axios";

export default function HomePage() {
  const [symbol, setSymbol] = useState("bitcoin"); // Default to 'bitcoin'
  const [searchSymbol, setSearchSymbol] = useState(""); // State for search input
  const [cryptoData, setCryptoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCryptoData = async () => {
    setLoading(true);
    setCryptoData(null);
    try {
      const response = await axios.get(`/api/crypto?symbol=${searchSymbol || symbol}`);
      setCryptoData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="container p-8 bg-white rounded-3xl shadow-2xl w-full max-w-xl">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Crypto Price Tracker</h1>
        <div className="flex items-center justify-between mb-6">
          <select
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="bitcoin">Bitcoin (BTC)</option>
            <option value="ethereum">Ethereum (ETH)</option>
            <option value="litecoin">Litecoin (LTC)</option>
            <option value="dogecoin">Dogecoin (DOGE)</option>
          </select>

          {/* Search Option */}
          <input
            type="text"
            placeholder="Search by symbol"
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value)}
            className="border-2 border-gray-300 rounded-lg p-3 ml-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <button
            onClick={fetchCryptoData}
            className={`bg-blue-600 text-white py-3 px-6 rounded-lg ml-4 ${loading ? 'bg-gray-400' : 'hover:bg-blue-800'} ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? "Loading..." : "Get Price"}
          </button>
        </div>

        {cryptoData && (
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              Current Price of {searchSymbol || symbol.charAt(0).toUpperCase() + symbol.slice(1)}:
            </h3>
            <p className="text-xl text-gray-900">
              {cryptoData[symbol] && cryptoData[symbol].usd
                ? `$${cryptoData[symbol].usd}`
                : "Price not available"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
