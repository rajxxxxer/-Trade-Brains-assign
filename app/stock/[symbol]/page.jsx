"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GraphComp from "@/app/components/GraphComp";
import Testcompon from "@/app/components/Testcompon";

export default function StockPage() {
  const { symbol } = useParams();
  const [data, setData] = useState(null);
  const [text, setText] = useState(false);

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
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          selected_Stock: {symbol}
        </h1>

        <div className="mb-4 flex justify-center gap-4 mt-4">

          {/* implnt toogle feature */}
          <button
            className="bg-green-800 text-white px-2 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 w-50 sm:w-40"
            onClick={() => setText(!text)}
          >
            {!text ? "Show Me Text" : "Show Me Graph"}
          </button>
        </div>
       
        {!data && (
          <div className="flex justify-center items-center h-32">
            <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        )}

        {/* implnt graph cmnpont for showng stock */}
          {!text && data ? (
           
         <GraphComp data={data} />
          ) : (
            data && (
        <Testcompon data={data}></Testcompon>
            )
          )}
       
      </div>
    </>
  );
}
