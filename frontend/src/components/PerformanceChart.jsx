"use client";
import { useState, useEffect } from "react";
import SummaryCards from "./SummaryCards";
import styles from "@/components/style.module.css";
import {
  LineChart,
  Line,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  Area,
} from "recharts";

// Giả định default data
const defaultChartData = [
  { date: "15/6/25", clicks: 90, position: 13.7 },
  { date: "26/6/25", clicks: 120, position: 14.7 },
  { date: "7/7/25", clicks: 110, position: 15.8 },
  // Thêm dữ liệu khác nếu cần
];
const defaultSummarys = [
  {
    key: "clicks",
    dataKey: "clicks",
    title: "Lượt nhấp",
    number: 100,
    color: "#8884d8",
  },
  {
    key: "position",
    dataKey: "position",
    title: "Vị trí",
    number: 14,
    color: "#ff7300",
  },
];

/* --- format helpers --- */
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
  const nfInteger = new Intl.NumberFormat("vi-VN", {
    maximumFractionDigits: 0,
  });

  if (key === "ctr") {
    const percent =
      typeof value === "number"
        ? value <= 1
          ? value * 100
          : value
        : Number(value);
    if (Number.isNaN(percent)) return value;
    return `${nfInteger.format(percent)}%`;
  }

  if (key === "position") {
    const v = Number(value);
    if (Number.isNaN(v)) return value;
    return nfInteger.format(v);
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
          background: "rgba(255,255,255,0.9)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
          padding: "16px 20px",
          minWidth: "180px",
          lineHeight: 1.6,
          color: "#202124",
        }}
      >
        <p className="font-medium text-gray-500 mb-3 pb-1">
          {formatDate(label)}
        </p>
        <div className="space-y-3">
          {payload.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between gap-4">
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
  indexQueryTime,
}) {
  const [localActive, setLocalActive] = useState(summarys.map((s) => s.key));

  const visibleDataKeys = propVisibleColumns
    ? propVisibleColumns
    : summarys.filter((s) => localActive.includes(s.key)).map((s) => s.dataKey);
  console.log("visibleDataKeys", visibleDataKeys);
  const toggleByDataKey = (dataKey) => {
    if (propSetVisibleColumns) {
      propSetVisibleColumns((prev) =>
        prev.includes(dataKey)
          ? prev.length === 1
            ? prev
            : prev.filter((c) => c !== dataKey)
          : [...prev, dataKey]
      );
      return;
    }
    const s = summarys.find((x) => x.dataKey === dataKey);
    if (!s) return;
    setLocalActive((prev) =>
      prev.includes(s.key)
        ? prev.length === 1
          ? prev
          : prev.filter((i) => i !== s.key)
        : [...prev, s.key]
    );
  };

  const listActiveKeys = summarys
    .filter((s) => visibleDataKeys.includes(s.dataKey))
    .map((s) => s.key);

  const renderYAxisLabel = (isLeft, value) => (props) => {
    const { x = 0, y = 0, width = 0, height = 0 } = props || {};
    const paddingX = 8;
    const paddingTop = 14;

    const tx = isLeft ? x + paddingX : x + width - paddingX;
    const ty = y + paddingTop;
    const anchor = isLeft ? "start" : "end";

    return (
      <text
        x={tx}
        y={ty}
        textAnchor={anchor}
        style={{
          fontSize: 12,
          fill: "#555",
          fontWeight: 300,
          pointerEvents: "none",
        }}
      >
        {value}
      </text>
    );
  };
  const newData = chartData.map((item) => {
    return Object.fromEntries(
      Object.entries(item).map(([key, value]) => [
        key,
        key === "date" || visibleDataKeys.includes(key) ? value : 0,
      ])
    );
  });

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
      <div className={`flex ${styles.summarys}`}>
        {summarys.map((item, index) => (
          <SummaryCards
            key={item.key}
            index={index}
            active={visibleDataKeys.includes(item.dataKey)}
            title={item.title}
            number={item.number}
            color={item.color}
            onClick={() => toggleByDataKey(item.dataKey)}
          />
        ))}
      </div>

      <div className="w-full h-[300px] px-4 py-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={
              visibleDataKeys.length <= 2
                ? { top: 40, right: -20, left: -20, bottom: 20 }
                : { top: 40, right: 30, left: 30, bottom: 20 }
            }
          >
            <CartesianGrid
              stroke="#f1f3f4"
              vertical={false}
              horizontal={true}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, dy: 6, textAnchor: "middle" }}
              axisLine={false}
              tickLine={false}
              dx={14}
              interval={
                indexQueryTime === 4
                  ? 10
                  : indexQueryTime === 6
                  ? 19
                  : indexQueryTime === 12 || indexQueryTime === 16
                  ? 30
                  : indexQueryTime === 3
                  ? 5
                  : indexQueryTime === 2
                  ? 0
                  : "preserveStartEnd"
              }
            />
            {/* {listActiveKeys.map((key, index) => {
              const summary = summarys.find((s) => s.key === key);
              if (!summary) return null;
              console.log("sum", summary);
              const showAxis = listActiveKeys.length <= 2;
              return (
                <YAxis
                  key={summary.key}
                  yAxisId={summary.key}
                  domain={["auto", "auto"]}
                  hide={!showAxis}
                  tickCount={4}
                  reversed={summary.dataKey === "position"}
                  tick={{ fontSize: 12 }}
                  orientation={
                    listActiveKeys.length === 2
                      ? index === 0
                        ? "left"
                        : "right"
                      : "left"
                  }
                  tickFormatter={(v) => formatValue(summary.dataKey, v)}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                >
                  {showAxis && (
                    <Label
                      value={summary.tooltipName}
                      position="insideTop"
                      offset={-25}
                      style={{
                        fontSize: 12,
                        fill: "#555",
                        fontWeight: 300,
                        textAnchor: index === 0 ? "start" : "end",
                      }}
                    />
                  )}
                </YAxis>
              );
            })} */}
            {listActiveKeys.map((key, index) => {
              const summary = summarys.find((s) => s.key === key);
              if (!summary) return null;
              const showAxis = listActiveKeys.length <= 2;
              return (
                <YAxis
                  key={summary.key}
                  yAxisId={summary.key}
                  domain={["auto", "auto"]}
                  hide={!showAxis}
                  tickCount={4}
                  reversed={summary.dataKey === "position"}
                  tick={{ fontSize: 12 }}
                  orientation={
                    listActiveKeys.length === 2
                      ? index === 0
                        ? "left"
                        : "right"
                      : "left"
                  }
                  tickFormatter={(v) => formatValue(summary.dataKey, v)}
                  axisLine={false}
                  tickLine={false}
                  width={60}
                >
                  {showAxis && (
                    <Label
                      value={summary.tooltipName}
                      position="insideTop"
                      offset={-25}
                      style={{
                        fontSize: 12,
                        fill: "#555",
                        fontWeight: 300,
                        textAnchor: index === 0 ? "start" : "end",
                      }}
                    />
                  )}
                </YAxis>
              );
            })}
            <Tooltip
              content={<CustomTooltip />}
              cursor={{
                stroke: "#1e1e20ff",
                strokeWidth: 2,
                strokeDasharray: "3 3",
              }}
              position={{ y: -20 }}
              wrapperStyle={{ zIndex: 1000 }}
            />
            {summarys.map(
              (s) =>
                // <Area
                //   key={s.key}
                //   type="linear"
                //   dataKey={s.dataKey}
                //   stroke={s.color} // Đường viền
                //   strokeWidth={2}
                //   fill={s.color} // Màu nền
                //   fillOpacity={0.3} // Độ trong suốt (0 đến 1)
                //   activeDot={{ r: 4, fill: s.color, stroke: "none" }}
                //   isAnimationActive={true}
                //   animationDuration={1500}
                //   animationEasing="ease-out"
                //   yAxisId={s.key}
                // />
                visibleDataKeys.includes(s.dataKey) && (
                  <Line
                    key={s.key}
                    type="linear"
                    dataKey={s.dataKey}
                    stroke={s.color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: s.color, stroke: "none" }}
                    name={s.tooltipName}
                    isAnimationActive={false}
                    animationDuration={1500}
                    animationEasing="ease-out"
                    animationBegin={0}
                    yAxisId={s.key}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
