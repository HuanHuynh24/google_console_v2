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
} from "recharts";

/* ========= DEFAULT DATA (fallback) ========== */
const defaultChartData = [
  { date: "21/11/25", clicks: 1, impressions: 100, ctr: 0.01, position: 20 },
  { date: "22/11/25", clicks: 2, impressions: 120, ctr: 0.017, position: 19 },
  { date: "23/11/25", clicks: 3, impressions: 130, ctr: 0.018, position: 18 },
  { date: "24/11/25", clicks: 11, impressions: 300, ctr: 0.036, position: 17 },
  { date: "25/11/25", clicks: 9, impressions: 260, ctr: 0.034, position: 17 },
  { date: "26/11/25", clicks: 6, impressions: 220, ctr: 0.027, position: 17 },
  { date: "27/11/25", clicks: 14, impressions: 310, ctr: 0.045, position: 17 },
];

const defaultSummarys = [
  {
    key: 0,
    dataKey: "clicks",
    title: "Lượt nhấp",
    number: 46,
    color: "#4285f4",
    tooltipName: "Lượt nhấp",
  },
  {
    key: 1,
    dataKey: "impressions",
    title: "Lượt hiển thị",
    number: 2620,
    color: "#673ab7",
    tooltipName: "Lượt hiển thị",
  },
  {
    key: 2,
    dataKey: "ctr",
    title: "CTR trung bình",
    number: "1,8%",
    color: "#009688",
    tooltipName: "CTR trung bình",
  },
  {
    key: 3,
    dataKey: "position",
    title: "Vị trí trung bình",
    number: 17,
    color: "#f9ab00",
    tooltipName: "Vị trí trung bình",
  },
];

/* ========= FORMAT HELPERS ========= */
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

/* ========= TOOLTIP ========= */
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
                  {/* item.name đến từ prop `name` của <Line /> */}
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

/* ========= CUSTOM Y-AXIS LABEL RENDERER ========= */
const createYAxisLabelRenderer =
  (orientation, text) =>
  (props) => {
    const vb = props.viewBox || {};
    const { x = 0, y = 0, width = 0 } = vb;

    const paddingX = 4;
    // đẩy label lên trên vùng chart để không đè tick top
    const ty = y - 20
    const tx =
      orientation === "left" ? x + paddingX : x + width - paddingX;

    return (
      <text
        x={tx}
        y={ty}
        textAnchor={orientation === "left" ? "start" : "end"}
        style={{
          fontSize: 12,
          fill: "#555",
          fontWeight: 300,
        }}
      >
        {text}
      </text>
    );
  };

/* ========= MAIN COMPONENT ========= */
export default function PerformanceChart({
  chartData = defaultChartData,
  summarys = defaultSummarys,
  visibleColumns: propVisibleColumns,
  setVisibleColumns: propSetVisibleColumns,
}) {
  const isControlled = !!propVisibleColumns && !!propSetVisibleColumns;

  // MẶC ĐỊNH: bật 2 metric đầu (Lượt nhấp + Lượt hiển thị)
  const [internalVisible, setInternalVisible] = useState(() =>
    summarys.slice(0, 2).map((s) => s.dataKey)
  );

  useEffect(() => {
    if (!isControlled) {
      setInternalVisible(summarys.slice(0, 2).map((s) => s.dataKey));
    }
  }, [summarys, isControlled]);

  const visibleDataKeys = isControlled ? propVisibleColumns : internalVisible;

  const toggleMetric = (dataKey) => {
    if (isControlled) {
      propSetVisibleColumns((prev) =>
        prev.includes(dataKey)
          ? prev.length === 1
            ? prev
            : prev.filter((k) => k !== dataKey)
          : [...prev, dataKey]
      );
    } else {
      setInternalVisible((prev) =>
        prev.includes(dataKey)
          ? prev.length === 1
            ? prev
            : prev.filter((k) => k !== dataKey)
          : [...prev, dataKey]
      );
    }
  };

  const activeSummaries = summarys.filter((s) =>
    visibleDataKeys.includes(s.dataKey)
  );

  console.log(activeSummaries)
  /* ===== X-AXIS: chia tick giống GCS ===== */
  const len = chartData?.length || 0;
  const MAX_TICKS = 8;
  let xInterval = 0;
  if (len > MAX_TICKS) {
    const step = Math.ceil(len / MAX_TICKS);
    xInterval = step - 1;
  }

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
      {/* SUMMARY CARDS */}
      <div className={`flex ${styles.summarys}`}>
        {summarys.map((item, index) => (
          <SummaryCards
            key={item.key}
            index={index}
            active={visibleDataKeys.includes(item.dataKey)}
            title={item.title}
            number={item.number}
            color={item.color}
            onClick={() => toggleMetric(item.dataKey)}
          />
        ))}
      </div>

      {/* CHART */}
      <div className="w-full h-[300px] py-2 pt-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 34,
              right: 10,
              left: 10,
              bottom: 24,
            }}
          >
            <CartesianGrid stroke="#f1f3f4" vertical={false} horizontal />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, dy: 6 }}
              axisLine={false}
              tickLine={false}
              tickMargin={6}
              interval={xInterval}
              padding={{ left: 0, right: 0 }}
            />

            {activeSummaries.map((summary, index) => {
              const isPosition = summary.dataKey === "position";
              const domain = isPosition ? ["auto", "auto"] : [0, "auto"];

              const showAxis = index < 2;
              if (!showAxis) {
                return (
                  <YAxis
                    key={summary.dataKey}
                    yAxisId={summary.dataKey}
                    domain={domain}
                    reversed={isPosition}
                    hide
                  />
                );
              }

              const orientation =
                activeSummaries.length === 1
                  ? "left"
                  : index === 0
                  ? "left"
                  : "right";

              // 👉 LUÔN ưu tiên title cho tên cột
              const labelText =  summary.tooltipName ;

              // HIỂN LABEL KHI ĐANG BẬT 1 HOẶC 2 METRIC
              const shouldShowLabel = activeSummaries.length <= 2;

              return (
                <YAxis
                  key={summary.dataKey}
                  yAxisId={summary.dataKey}
                  domain={domain}
                  reversed={isPosition}
                  tick={{ fontSize: 12 }}
                  tickFormatter={(v) =>
                    formatValue(summary.dataKey, v)
                  }
                  axisLine={false}
                  tickLine={false}
                  width={56}
                  orientation={orientation}
                >
                  {shouldShowLabel && (
                    <Label
                      content={createYAxisLabelRenderer(
                        orientation,
                        labelText
                      )}
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
              wrapperStyle={{ zIndex: 1000 }}
            />

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
                    activeDot={{ r: 4, fill: s.color, stroke: "none" }}
                    // 🔥 Tooltip & legend hiển thị đúng `title`
                    name={s.tooltipName}
                    isAnimationActive={false}
                    yAxisId={s.dataKey}
                  />
                )
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
