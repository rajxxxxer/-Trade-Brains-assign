export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword") || "";
    const length = searchParams.get("length") || "10";
    if (!keyword) return Response.json({ results: [] });

    const url = `https://portal.tradebrains.in/api/assignment/search?keyword=${encodeURIComponent(
      keyword
    )}&length=${length}`;
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ error: "Failed search" }, { status: 500 });
  }
}
