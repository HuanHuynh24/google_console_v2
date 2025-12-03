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

/* ========= FORMAT ========= */
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

// format chỉ dùng cho TOOLTIP – luôn 1 chữ số thập phân, CTR có %
const formatValue_2 = (key, value) => {
  const num = Number(value);
  if (Number.isNaN(num)) return value;

  if (key === "ctr") {
    const pct = num <= 1 ? num * 100 : num;
    return pct.toFixed(1) + "%";
  }

  if (key === "position") {
    return num.toFixed(1);
  }

  return num.toFixed(1);
};

/* ========= NICE STEP & Y-AXIS CONFIG (4 tick giống GSC) ========= */
const niceStep = (rawStep) => {
  if (rawStep <= 0) return 1;
  const power = Math.pow(10, Math.floor(Math.log10(rawStep)));
  const base = rawStep / power; // 1..10
  let niceBase;
  if (base <= 1) niceBase = 1;
  else if (base <= 2) niceBase = 2;
  else if (base <= 5) niceBase = 5;
  else niceBase = 10;
  return niceBase * power;
};

const buildYAxisConfig = (data, key, isPosition) => {
  let min = Infinity;
  let max = -Infinity;

  data.forEach((row) => {
    const v = Number(row[key]);
    if (Number.isNaN(v)) return;
    if (v < min) min = v;
    if (v > max) max = v;
  });

  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    return {
      domain: isPosition ? ["auto", "auto"] : [0, "auto"],
      ticks: undefined,
    };
  }

  // ===== POSITION (chỉ 4 tick, làm tròn đẹp) =====
  if (isPosition) {
    let rawRange = max - min || 1;
    let step = niceStep(rawRange / 3);

    if (step <= 2) step = 2;
    else if (step <= 5) step = 5;
    else if (step <= 10) step = 10;
    else if (step <= 20) step = 20;

    let bottom = Math.ceil(max / step) * step;
    let top = bottom - step * 3;

    if (top > min && top - step >= 0) {
      bottom -= step;
      top -= step;
    }

    const ticks = [top, top + step, top + 2 * step, bottom];

    return {
      domain: [top, bottom], // reversed=true sẽ đảo hướng hiển thị
      ticks,
    };
  }

  // ===== CLICK / IMP / CTR (4 tick, từ 0) =====
  const bottom = 0;
  let maxVal = max <= 0 ? 1 : max;

  let step = niceStep(maxVal / 3);
  if (step <= 0) step = 1;

  const top = step * 3; // 0, step, 2*step, 3*step
  const ticks = [0, step, step * 2, top];

  return {
    domain: [bottom, top],
    ticks,
  };
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
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-gray-500">
                {formatValue_2(item.dataKey, item.value)}
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
const createYAxisLabelRenderer = (orientation, text) => (props) => {
  const vb = props.viewBox || {};
  const { x = 0, y = 0, width = 0 } = vb;

  const paddingX = 4;
  const ty = y - 20;
  const tx = orientation === "left" ? x + paddingX : x + width - paddingX;

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

  // metric mặc định: 2 cái đầu (nhấp + hiển thị)
  const [internalVisible, setInternalVisible] = useState(() =>
    summarys.slice(0, 2).map((s) => s.dataKey)
  );

  // width để tính margin theo mobile/desktop
  const [screenWidth, setScreenWidth] = useState(1024);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      const onResize = () => setScreenWidth(window.innerWidth);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }
  }, []);

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
  const metricsCount = activeSummaries.length;

  /* ===== X-AXIS ===== */
  const len = chartData?.length || 0;
  const MAX_TICKS = 8;
  let xInterval = 0;
  if (len > MAX_TICKS) {
    const step = Math.ceil(len / MAX_TICKS);
    xInterval = step - 1;
  }

  /* ===== MARGIN THEO MÀN HÌNH & SỐ METRIC ===== */
  const isMobile = screenWidth < 768;
  const baseLeftRightSmall = metricsCount <= 2 ? 16 : 24;
  const baseLeftRightLarge = metricsCount <= 2 ? 24 : 40;

  const chartMargin = {
    top: isMobile ? 24 : 34,
    bottom: 24,
    left: isMobile ? baseLeftRightSmall : baseLeftRightLarge,
    right: isMobile ? baseLeftRightSmall : baseLeftRightLarge,
  };

  const axisWidth = metricsCount <= 2 ? 40 : 56;

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden shadow-sm">
      {/* SUMMARY CARDS */}
      <div className={`flex ${styles.summarys}`}>
        {summarys.map((item) => (
          <SummaryCards
            key={item.key}
            index={item.key}
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
          <LineChart data={chartData} margin={chartMargin}>
            <CartesianGrid
              stroke="#f1f3f4"
              vertical={false}
              // chỉ vẽ line ngang khi 1–2 metric (giống GSC)
              horizontal={metricsCount <= 2}
            />

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

              const showAxis = index < 2;
              if (!showAxis) {
                // metric thứ 3,4: trục ẩn, chỉ để scale
                const cfgHidden = buildYAxisConfig(
                  chartData,
                  summary.dataKey,
                  isPosition
                );
                return (
                  <YAxis
                    key={summary.dataKey}
                    yAxisId={summary.dataKey}
                    domain={cfgHidden.domain}
                    reversed={isPosition}
                    hide
                  />
                );
              }

              const { domain, ticks } = buildYAxisConfig(
                chartData,
                summary.dataKey,
                isPosition
              );

              const orientation =
                metricsCount === 1 ? "left" : index === 0 ? "left" : "right";

              const labelText = summary.tooltipName;

              const hideTicks = metricsCount > 2;
              const shouldShowLabel = metricsCount <= 2;

              return (
                <YAxis
                  key={summary.dataKey}
                  yAxisId={summary.dataKey}
                  domain={domain}
                  reversed={isPosition}
                  ticks={hideTicks ? undefined : ticks}
                  tick={hideTicks ? false : { fontSize: 12 }}
                  tickFormatter={
                    hideTicks
                      ? undefined
                      : (v) => formatValue(summary.dataKey, v)
                  }
                  axisLine={false}
                  tickLine={false}
                  width={hideTicks ? 0 : axisWidth}
                  orientation={orientation}
                  hide={false}
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
