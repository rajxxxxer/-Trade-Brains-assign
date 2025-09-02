"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const [q, setQ] = useState("");
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!q || q.length < 2) {
      setList([]);
      return;
    }
    const id = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/search?keyword=${encodeURIComponent(q)}&length=8`
        );
        const json = await res.json();
        const arr = Array.isArray(json) ? json : [];
        setList(arr);
      } catch {
        setList([]);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce implmt
    return () => clearTimeout(id);
  }, [q]);

  // ✅ handle enter
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && q.trim()) {
      e.preventDefault(); // page reload rokna
      router.push(`/stock/${q.toUpperCase()}`);
    }
  };

  return (
    <div className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        onKeyDown={handleKeyDown} // ✅ add this
        placeholder="Search stock e.g. RELIANCE"
        className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-900 text-white text-sm sm:text-base"
      />
      {loading && <div className="text-sm text-gray-400 mt-1">Searching…</div>}
      {list.length > 0 && (
        <div className="absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg z-10 max-h-64 overflow-y-auto">
          {list.map((it, idx) => {
            const symbol = it.symbol || "";
            const name = it.company || symbol;
            return (
              <div
                key={idx}
                onClick={() => router.push(`/stock/${symbol}`)}
                className="px-4 py-2 hover:bg-gray-800 cursor-pointer text-sm sm:text-base"
              >
                <strong>{symbol}</strong>{" "}
                <span className="text-gray-400">{name}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
