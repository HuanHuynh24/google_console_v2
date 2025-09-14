"use client";
import { useState } from "react";
import SummaryCards from "./SummaryCards";

import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

/* --- format helpers (giữ nguyên của bạn) --- */
const formatDate = (dateLabel) => {
  let d;
  if (dateLabel instanceof Date) d = dateLabel;
  else if (typeof dateLabel === "string" && dateLabel.includes("/")) {
    const [day, month, year] = dateLabel.split("/").map(Number);
    d = new Date(2000 + year, month - 1, day);
  } else return dateLabel;

  return new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(d);
};

const formatValue = (key, value) => {
  const nfInteger = new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 });
  const nfOne = new Intl.NumberFormat("vi-VN", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  if (key === "ctr") {
    const percent = typeof value === "number" ? (value <= 1 ? value * 1 : value) : Number(value);
    if (Number.isNaN(percent)) return value;
    return `${nfOne.format(percent)}%`;
  }
  if (key === "position") {
    const v = Number(value);
    if (Number.isNaN(v)) return value;
    return nfOne.format(v);
  }
  if (key === "impressions" || key === "clicks") {
    const v = Number(value);
    if (Number.isNaN(v)) return value;
    return nfInteger.format(Math.round(v));
  }
  return value;
};

/* --- custom tooltip --- */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="shadow-lg text-sm pointer-events-none"
        style={{
          background: "rgba(255,255,255,0.8)", // nền trắng gần đặc
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(1px)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          padding: "16px 20px",
          minWidth: "180px",
          lineHeight: 1.6,
          color: "#202124",
        }}
      >
        {/* Ngày */}
        <p className="font-medium text-gray-500 mb-3 pb-1">
          {formatDate(label)}
        </p>

        {/* Danh sách dataset */}
        <div className="space-y-3">
          {payload.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-4 h-[3px] rounded-sm"
                  style={{ background: item.color }}
                />
                <span className="text-gray-600 whitespace-nowrap">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-gray-500">
                {formatValue(item.dataKey, item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function PerformanceChart({
  chartData = defaultChartData,
  summarys = defaultSummarys,
  visibleColumns: propVisibleColumns,
  setVisibleColumns: propSetVisibleColumns,
}) {
  // fallback local state if parent doesn't pass setVisibleColumns
  const [localActive, setLocalActive] = useState(summarys.map((s) => s.key));

  // visibleDataKeys is an array of dataKey strings to show, prefer parent's prop
  const visibleDataKeys = propVisibleColumns
    ? propVisibleColumns
    : summarys.filter((s) => localActive.includes(s.key)).map((s) => s.dataKey);

  const toggleByDataKey = (dataKey) => {
    if (propSetVisibleColumns) {
      propSetVisibleColumns((prev) =>
        prev.includes(dataKey) ? (prev.length === 1 ? prev : prev.filter((c) => c !== dataKey)) : [...prev, dataKey]
      );
      return;
    }
    // fallback: toggle localActive using summarys
    const s = summarys.find((x) => x.dataKey === dataKey);
    if (!s) return;
    setLocalActive((prev) => (prev.includes(s.key) ? (prev.length === 1 ? prev : prev.filter((i) => i !== s.key)) : [...prev, s.key]));
  };

  // listActive as keys (for two-axis logic)
  const listActiveKeys = summarys.filter((s) => visibleDataKeys.includes(s.dataKey)).map((s) => s.key);

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
      {/* Summary cards */}
      <div className="flex">
        {summarys.map((item, index) => (
          <SummaryCards
            key={item.key}
            index={index}   // truyền index đúng
            active={visibleDataKeys.includes(item.dataKey)}
            title={item.title}
            number={item.number}
            color={item.color}
            onClick={() => toggleByDataKey(item.dataKey)}
          />
        ))}
      </div>

      {/* Chart */}
      <div className="w-full h-[280px] px-8 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 30, right: 30, left: 30, bottom: 20 }}>
            <CartesianGrid stroke="#f1f3f4" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 12, dy: 6, textAnchor: "middle" }} axisLine={false} tickLine={false} interval="preserveStartEnd" />

            {/* Nếu đúng 2 series thì render 2 trục Y */}
            {listActiveKeys.length === 2 && (
              <>
                <YAxis
                  yAxisId="left"
                  tickFormatter={(v) => formatValue(summarys.find((s) => s.key === listActiveKeys[0]).dataKey, v)}
                  tick={{ fontSize: 12 }}
                  width={10}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: summarys.find((s) => s.key === listActiveKeys[0]).tooltipName,
                    angle: 0,
                    position: "top",
                    dy: -10,
                    style: { textAnchor: "middle", fontSize: 12, fill: "#555" },
                  }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(v) => formatValue(summarys.find((s) => s.key === listActiveKeys[1]).dataKey, v)}
                  tick={{ fontSize: 12 }}
                  width={10}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: summarys.find((s) => s.key === listActiveKeys[1]).tooltipName,
                    angle: 0,
                    position: "top",
                    dy: -10,
                    style: { textAnchor: "middle", fontSize: 12, fill: "#555" },
                  }}
                />
              </>
            )}

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#1e1e20ff", strokeDasharray: "1 1" }} position={{ y: -40 }} wrapperStyle={{ zIndex: 1000 }} />

            {summarys.map(
              (s) =>
                visibleDataKeys.includes(s.dataKey) && (
                  <Line
                    key={s.key}
                    type="linear"
                    dataKey={s.dataKey}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, stroke: "none" }}
                    name={s.tooltipName}
                    isAnimationActive={false}
                    {...(listActiveKeys.length === 2
                      ? s.key === listActiveKeys[0]
                        ? { yAxisId: "left" }
                        : s.key === listActiveKeys[1]
                          ? { yAxisId: "right" }
                          : {}
                      : {})}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
