"use client";
import useSWR from "swr";

const fetchingurl = async (url) =>{
  const resp = await fetch(url);
  if (!resp.ok) throw new Error("Failed to fetch");
  const data = await resp.json();
  console.log(data);
  return data;
}// y ek calback h jo swr hook k liye use hota h

export default function TickerBar() {
//yaha pe swr hook use kiye becse it provide caching taki manually sesion mang na krna pde
  const { data, error } = useSWR("/api/ticker", fetchingurl, {
    refreshInterval: 20000, 
  });

  // agr error aya
  if (error) return <div className="bg-gray-900 py-2 px-4">Ticker failed</div>;
  // loading state
  if (!data) return <div className="bg-gray-900 py-2 px-4">Loading…</div>;

  // gainr nd loser ko ek hi array m dal rhe
  const items = [
    ...(data?.gainers ),
    ...(data?.losers )
  ];

  if (!items.length) {
    return <div className="bg-gray-900 py-2 px-4">No data available</div>;
  }

  // ticketbar ka smmoth scroll dikhane k liye list m items ko spread kr rhe
  const list = [...items, ...items];

  return (
    <div className="bg-gray-950 border-b border-gray-800 overflow-hidden">
      <div className="inline-block whitespace-nowrap animate-marquee py-2">
        {list.map((it, idx) => {
          const symbl = it.symbol;
          const pric = it.close ?? 0;// y pric ka neww val
          const chnng = it.percent ?? 0; // y perc chng
          const up = Number(chnng) >= 0;
          return (
            <span
              key={idx}
              className="inline-flex items-center gap-2 px-3 sm:px-4 md:px-6 border-r border-gray-700 text-xs sm:text-sm md:text-base"
            >
              <strong>{symbl}</strong>
              <span>₹{Number(pric).toFixed(2)}</span>
              <span className={up ? "text-green-400" : "text-red-400"}>
                {Number(chnng).toFixed(2)}%
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
