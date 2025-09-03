"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import GraphComp from "@/app/components/GraphComp";
import Testcompon from "@/app/components/Testcompon";

export default function StockPage({ symbol, data }) {
  console.log("Rendering StockPage for symbol:", symbol, "with data:", data);
  const [text, setText] = useState(false);
  const routr = useRouter();

  const handlehome = () => {
    routr.push(`/`);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
        <div className="flex flex-col items-center gap-4 sm:gap-6">
          <button
            className="bg-blue-800 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition duration-200 w-40"
            onClick={handlehome}
          >
            Back To Home
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold text-center">
            selected Stock: {symbol}
          </h1>
        </div>

        <div className="mb-4 flex justify-center gap-4 mt-4">
          {/* implnt toogle feature */}
          <button
            className="bg-green-800 text-white px-2 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-200 w-50 sm:w-40"
            onClick={() => setText(!text)}
          >
            {!text ? "Show Me Text" : "Show Me Graph"}
          </button>
        </div>

     

        {/* implnt graph cmnpont for showng stock */}
        {!text && data ? (
          <GraphComp data={data} />
        ) : (
          //for text reusable cmponent
          data && <Testcompon data={data}></Testcompon>
        )}
      </div>
    </>
  );
}
