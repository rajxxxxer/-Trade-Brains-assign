import TickerBar from "./components/TickerBar";


export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <TickerBar></TickerBar>
      {/* Ticker bar on top */}
     

      {/* Rest of homepage content */}
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-4">
          Trade Brains Stock Ticker
        </h1>
        <p className="text-gray-300">
          Live updates of NIFTY stock gainers and losers scrolling across the top.
        </p>
      </div>
    </main>
  );
}
