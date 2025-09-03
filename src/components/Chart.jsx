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

export default function GscLikeChart() {
  const data = {
    labels: [
      "1/6/25", "13/6/25", "25/6/25",
      "7/7/25", "19/7/25", "31/7/25",
      "12/8/25", "24/8/25"
    ],
    datasets: [
      {
        label: "Lượt click",
        data: [1, 4, 2, 5, 3, 6, 2, 4],
        borderColor: "#4285F4", // xanh dương kiểu Google
        borderWidth: 1.5,
        tension: 0, // không bo tròn, góc nhọn giống GSC
        pointRadius: 0, // không hiện chấm tròn
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }, // GSC mặc định không hiển thị legend
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        grid: { color: "#e0e0e0" },
        ticks: { stepSize: 2 },
      },
    },
  };

  return (
    <div className="w-full h-[300px]">
      <Line data={data} options={options} />
    </div>
  );
}
