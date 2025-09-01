

let cachedd = null;
let last = 0;

export async function GET() {
  const now = Date.now();
  const cacheDuration = 30000; // 30 s 
// yaha p ratelimiting prblm ko solve kr rhe taki 500 err n aye
  if (cachedd && now - last < cacheDuration) {
    return Response.json(cachedd);
  }

  try {
    const res = await fetch("https://portal.tradebrains.in/api/assignment/index/NIFTY/movers/", {
      cache: "no-store"
    });

    if (!res.ok) throw new Error("External API failed");

    const data = await res.json();
    cachedd = data;  //yaha cache m sve kiya
    last = now;    // yaha last ko updte

    return Response.json(data);
  } catch (err) {
    return Response.json({ error: "Failed to fetch ticker" }, { status: 500 });
  }
}
