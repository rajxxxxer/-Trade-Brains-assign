"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function StockPage() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/assignment/stock/${symbol}`);
        const json = await res.json();
        console.log("API Response:", json);
        setData(json);
      } catch (err) {
        console.error("Error fetching stock:", err);
      }
    }

    fetchData();
  }, [symbol]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        Stock: {symbol}
      </h1>

      {!data && <p className="text-gray-400 text-sm sm:text-base">Loading...</p>}

      {data && (
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p><strong>Symbol:</strong> {data.symbol}</p>
          <p><strong>Open:</strong> ₹{data.open}</p>
          <p><strong>High:</strong> ₹{data.high}</p>
          <p><strong>Low:</strong> ₹{data.low}</p>
          <p><strong>Close:</strong> ₹{data.close}</p>
          <p><strong>Prev Close:</strong> ₹{data.prev_close}</p>
          <p>
            <strong>Change:</strong> {data.change} ({data.percent}%)
          </p>
          <p><strong>Volume:</strong> {data.volume}</p>
          <p><strong>Value:</strong> {data.value}</p>
          <p className="col-span-1 sm:col-span-2">
            <strong>Date:</strong> {data.date}
          </p>
        </div>
      )}
    </div>
  );
}
