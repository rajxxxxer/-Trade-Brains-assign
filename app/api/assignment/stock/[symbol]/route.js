// app/api/assignment/stock/[symbol]/route.js
export async function GET(req, { params }) {
  try {
    const { symbol } = params;

    if (!symbol) {
      return Response.json({ error: "Missing symbol" }, { status: 400 });
    }

    const url = `https://portal.tradebrains.in/api/assignment/stock/${encodeURIComponent(
      symbol
    )}/prices?days=1&type=INTRADAY&limit=1`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return Response.json({ error: "Upstream failed" }, { status: res.status });
    }

    const data = await res.json();

    // latest record lelo
    const latest = Array.isArray(data) && data.length > 0 ? data[0] : null;

    return Response.json({
      symbol,
      ...latest,
    });
  } catch (err) {
    console.error("API error", err);
    return Response.json({ error: "Failed stock", details: err.message }, { status: 500 });
  }
}
