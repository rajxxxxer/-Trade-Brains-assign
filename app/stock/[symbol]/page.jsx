"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GraphComp from "@/app/components/GraphComp";


export default function StockPage() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!symbol) return;

    async function fetchData() {
      try {
        const res = await fetch(`/api/assignment/stock/${symbol}`);
        const data_stock = await res.json();
        console.log("ressp", data_stock);
        setData(data_stock);
      } catch (err) {
        console.error("err ftchng stck:", err);
      }
    }

    fetchData();
  }, [symbol]);

  return (
    <>
     <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">
        selected_Stock: {symbol}
      </h1>

      {!data && <div className="flex justify-center items-center h-32">
  <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
</div>
}

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
    <GraphComp data={data} />
    </>
   
  );
}
