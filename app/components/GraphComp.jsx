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

  // Stock prce data for chrt
  const chartData = {
    labels: ["Open", "High", "Low", "Close", "Prev Close"],
    datasets: [
      {
        label: `${data.symbol} Price Overview`,
        data: [data.open, data.high, data.low, data.close, data.prev_close],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        tension: 0.4, // smooth curve
        fill: true,
        pointRadius: 4,
        pointBackgroundColor: "#4fd1c5",
      },
    ],
  };

  // Chart optins 
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: "#fff",
        },
      },
      tooltip: {
        backgroundColor: "#1f2937", 
        titleColor: "#fff",
        bodyColor: "#fff",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
      x: {
        ticks: {
          color: "#fff",
        },
        grid: {
          color: "rgba(255,255,255,0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-900 w-full  p-4 sm:p-6 rounded-lg shadow-md">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Price Overview Graph
      </h2>
      <div className="h-64 sm:h-80 w-full">
        {/* pasing chdta nd op in line */}
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}
