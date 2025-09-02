export async function GET(req) {
  try {
   //getting url se q nd length 
    const { searchParams } = new URL(req.url);

    
    const keyword = searchParams.get("keyword") ;
    const length = searchParams.get("length") ;

    
    if (!keyword) {
      return Response.json({ listt: [] });
    }

    const url = `https://portal.tradebrains.in/api/assignment/search?keyword=${encodeURIComponent(
      keyword
    )}&length=${length}`;

    //prvnting nxt js behaviou for caching
    const res = await fetch(url, { cache: "no-store" });

    
    const data = await res.json();

  
    return Response.json(data);

  } catch (error) {
   
    console.log("Search_err", error);
    return Response.json({ error: "Failed_srch" });
  }
}
