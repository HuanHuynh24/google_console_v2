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

// 👉 Plugin vẽ đường dọc nét đứt khi hover
const crosshairPlugin = {
  id: "crosshairLine",
  afterDatasetsDraw(chart, args, opts) {
    const { ctx, tooltip, chartArea } = chart;
    if (!tooltip || !tooltip._active || !tooltip._active.length) return;

    const activePoint = tooltip._active[0].element;
    if (!activePoint) return;

    const x = activePoint.x;
    const topY = chartArea.top;
    const bottomY = chartArea.bottom;

    ctx.save();
    ctx.beginPath();
    ctx.setLineDash(opts.dash || [4, 4]); // nét đứt
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = opts.width || 1;
    ctx.strokeStyle = opts.color || "#999";
    ctx.stroke();
    ctx.restore();
  },
};

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  crosshairPlugin // đăng ký plugin
);

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
        pointHoverRadius: 0,
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
          const { chart, tooltip } = context;

          // --- tooltip DOM ---
          let tooltipEl = chartArea.querySelector("#custom-tooltip");
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "custom-tooltip";
            tooltipEl.className =
              "absolute shadow-md px-4 py-4 text-sm text-gray-900 pointer-events-none border border-gray-200 transition-opacity duration-150";
            Object.assign(tooltipEl.style, {
              background: "rgba(255, 255, 255, 0.9)", // nền trắng đậm hơn
              backdropFilter: "blur(1px)",
              WebkitBackdropFilter: "blur(1px)",
              border: "1px solid rgba(0, 0, 0, 0.05)",
              boxShadow: "0 6px 20px rgba(0, 0, 0, 0.15)",
              color: "#202124",  // chữ tối rõ ràng hơn
              zIndex: 9999,
              opacity: "0",
              minWidth: "340px",
              padding: "18px 22px",
              lineHeight: "1.6",
              fontSize: "14px",  // chữ to vừa dễ đọc
            });
            chartArea.appendChild(tooltipEl);
          }

          // --- hover dot DOM ---
          let dot = chartArea.querySelector("#hover-dot");
          if (!dot) {
            dot = document.createElement("div");
            dot.id = "hover-dot";
            Object.assign(dot.style, {
              position: "absolute",
              width: "10px",
              height: "10px",
              borderRadius: "9999px",
              background: "#4285F4",
              border: "2px solid #fff",
              boxShadow: "0 4px 10px rgba(66,133,244,0.25)",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
              zIndex: 9998,
              opacity: "0",
              transition: "opacity .12s ease, transform .12s ease",
            });
            chartArea.appendChild(dot);
          }

          // hide if no tooltip
          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            dot.style.opacity = "0";
            return;
          }

          // build tooltip content
          if (tooltip.body && tooltip.dataPoints.length) {
            const idx = tooltip.dataPoints[0].dataIndex;
            const date = labels[idx];
            const formattedDate = date.toLocaleDateString("vi-VN", {
              weekday: "long",
              day: "numeric",
              month: "short",
            });
            const value = tooltip.dataPoints[0].formattedValue;

            tooltipEl.innerHTML = `
              <div class="font-medium text-gray-600 mb-2">${formattedDate}</div>
              <div class="flex items-center justify-between gap-4">
                <div class="flex items-center gap-2">
                  <div style="width:12px;height:4px;background:#4285F4;border-radius:2px"></div>
                  <span style="color:#4b5563;white-space:nowrap">${tooltip.dataPoints[0].dataset.label}</span>
                </div>
                <div style="font-weight:600;color:#4b5563">${value}</div>
              </div>
            `;
          }

          // position tooltip + dot
          const { offsetLeft, offsetTop } = chart.canvas;
          const tooltipWidth = tooltipEl.offsetWidth || 260;
          const tooltipHeight = tooltipEl.offsetHeight || 64;

          const cx = tooltip.caretX ?? 0;
          const cy = tooltip.caretY ?? 0;

          let left = offsetLeft + cx + 10;
          let top = offsetTop + cy - tooltipHeight - 10;
          if (left + tooltipWidth > chart.width)
            left = offsetLeft + cx - tooltipWidth - 10;
          if (top < 0) top = offsetTop + cy + 10;

          tooltipEl.style.left = left + "px";
          tooltipEl.style.top = top + "px";
          tooltipEl.style.opacity = "1";

          // position hover dot
          dot.style.left = offsetLeft + cx + "px";
          dot.style.top = offsetTop + cy + "px";
          dot.style.opacity = "1";
        },
      },
      crosshairLine: {
        color: "#999",
        width: 1,
        dash: [1, 1], // nét đứt
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: true,
          color: "#dadce0",
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
          color: "#5f6368",
          font: { size: 12 },
        },
      },
      y: {
        border: { display: false },
        grid: {
          color: "#ebebeb",
          drawTicks: false,
        },
        ticks: {
          display: true,
          color: "#5f6368",
          font: { size: 12 },
          stepSize: 2,
          padding: 8,
        },
      },
    },
  };

  return (
    <div ref={chartRef} className="relative w-full h-[240px] rounded-xl p-3">
      <Line data={data} options={options} />
    </div>
  );
}
