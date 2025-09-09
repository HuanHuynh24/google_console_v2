"use client";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";
import { useRef } from "react";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export default function GscLikeChart() {
  const chartRef = useRef(null);

  // 👉 Sinh ngày từ 1/6/2025, tổng 90 ngày
  const startDate = new Date(2025, 5, 1);
  const labels = Array.from({ length: 90 }, (_, i) => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + i);
    return d;
  });

  // Fake data
  const clicks = labels.map(() => Math.floor(Math.random() * 7));

  const data = {
    labels,
    datasets: [
      {
        label: "Tổng số lần nhấp vào kết quả tìm kiếm trên web",
        data: clicks,
        borderColor: "#4285F4",
        borderWidth: 2,
        tension: 0,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointBackgroundColor: "#4285F4",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: {
          usePointStyle: true,
          pointStyle: "line",
          color: "#555",
        },
      },
      tooltip: {
        enabled: false,
        external: function (context) {
          const chartArea = chartRef.current;
          if (!chartArea) return;

          let tooltipEl = chartArea.querySelector("#custom-tooltip");
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "custom-tooltip";
            tooltipEl.className =
              "absolute bg-white shadow-lg rounded-lg px-3 py-2 text-sm text-gray-800 pointer-events-none border border-gray-200 transition-opacity duration-200 min-w-[300px]";

            chartArea.appendChild(tooltipEl);
          }

          const { chart, tooltip } = context;
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          if (tooltip.body) {
            const date = labels[tooltip.dataPoints[0].dataIndex];
            const formattedDate = date.toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "short",
            });
            const value = tooltip.dataPoints[0].formattedValue;

            tooltipEl.innerHTML = `
  <div class="font-medium text-gray-900 mb-4">${formattedDate}</div>
  <div class="flex items-center gap-4">
    <div class="w-6 h-[3px] bg-[#4285F4]"></div>
    <span class="text-gray-700 whitespace-nowrap">
      ${tooltip.dataPoints[0].dataset.label}
    </span>
    <span class="font-semibold text-gray-900 ml-2">${value}</span>
  </div>
`;
          }

          const { offsetLeft, offsetTop } = chart.canvas;
          const tooltipWidth = tooltipEl.offsetWidth;
          const tooltipHeight = tooltipEl.offsetHeight;

          let left = offsetLeft + tooltip.caretX + 10;
          let top = offsetTop + tooltip.caretY - tooltipHeight - 10;

          // 👉 Nếu tooltip bị tràn phải => hiển thị sang trái
          if (left + tooltipWidth > chart.width) {
            left = offsetLeft + tooltip.caretX - tooltipWidth - 10;
          }

          // 👉 Nếu tooltip bị tràn lên trên => hạ xuống dưới
          if (top < 0) {
            top = offsetTop + tooltip.caretY + 10;
          }

          tooltipEl.style.opacity = "1";
          tooltipEl.style.left = left + "px";
          tooltipEl.style.top = top + "px";
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        grid: {
          display: false,      // bỏ hết vạch dọc
          drawBorder: true,    // giữ trục X bên dưới
          color: "#dadce0",    // màu xám nhạt GSC
        },
        ticks: {
          callback: function (val, index) {
            const d = labels[index];
            return (
              d.getDate() +
              "/" +
              (d.getMonth() + 1) +
              "/" +
              d.getFullYear().toString().slice(2)
            );
          },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
          color: "#5f6368",    // màu chữ trục X (xám đậm)
          font: { size: 12 },
        },
      },
      y: {
        border: {
          display: false,   // ẩn viền trục Y
        },
        grid: {
          color: "#ebebeb", // chỉ giữ các vạch ngang
          drawTicks: false, // bỏ mấy vạch nhỏ đâm ra từ trục
        },
        ticks: {
          display: true,
          color: "#5f6368",
          font: { size: 12 },
          stepSize: 2,
          padding: 8,
        },
      },
    }
  };

  return (
    <div ref={chartRef} className="relative w-full h-[240px] rounded-xl p-3">
      <Line data={data} options={options} />
    </div>
  );
}
