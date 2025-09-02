"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function GraphComp({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ["Open", "High", "Low", "Close", "Prev Close"],
    datasets: [
      {
        label: `${data.symbol} Price Overview`,
        data: [data.open, data.high, data.low, data.close, data.prev_close],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#fff", // white text for dark mode
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#fff",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 mt-6 p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Price Overview Graph</h2>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
