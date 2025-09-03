import StockPage from "./Stockpage";


export async function generateMetadata({ params }) {
  const symbol = params.symbol?.toUpperCase();
  let name = "";

  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const res = await fetch(`${base}/api/assignment/stock/${symbol}`, {
      cache: "no-store",
    });
    const json = await res.json();
    name = json?.meta?.name || json?.name || "";
  } catch (e) {
    // ignore error
  }

  const title = name
    ? `${name} (${symbol}) — Price & Chart`
    : `${symbol} — Price & Chart`;

  const description = `Live ${name || symbol} stock price, chart and details.`;

  return {
    title,
    description,
    keywords: [name, symbol, `${symbol} stock`, `${symbol} share price`].filter(Boolean),
  };
}

export default async function Page({ params }) {
  const symbol = params.symbol?.toUpperCase();
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  let data = null;
  try {
    const res = await fetch(`${base}/api/assignment/stock/${symbol}`, {
      cache: "no-store",
    });
    data = await res.json();
    console.log("Fetched data for symbol:", symbol, data);
  } catch (e) {
    console.error("Error fetching stock:", e);
  }

  return <StockPage symbol={symbol} data={data} />;
}
