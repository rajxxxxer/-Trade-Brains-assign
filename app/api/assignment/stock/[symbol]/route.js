// app/api/assignment/stock/[symbol]/route.js
export async function GET(req,{ params }) {
  try {
    const  {symbol}=params;

    if (!symbol) {
      return Response.json({ err:"data nott found" });
    }

    const url = `https://portal.tradebrains.in/api/assignment/stock/${encodeURIComponent(
      symbol
    )}/prices?days=1&type=INTRADAY&limit=1`;
  //used cache "no stre" because we want fresh data
    const res = await fetch(url, { cache: "no-store" });
   

    const data = await res.json();

   
    let latest = null;

if (Array.isArray(data)) {
  if (data.length > 0) {
    latest = data[0];
  }
}

    return Response.json({
      symbol,
      ...latest,
    });
  } catch (err) {
    console.error("errror h", err);
    return Response.json({ error: "Failed_stock" });
  }
}
