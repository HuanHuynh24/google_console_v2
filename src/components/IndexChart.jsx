"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "Thứ Năm, 5 thg 6", "Chưa lập chỉ mục": 350, "Được lập chỉ mục": 130 },
  { date: "Chủ nhật, 8 thg 6", "Chưa lập chỉ mục": 355, "Được lập chỉ mục": 128 },
  { date: "Thứ Tư, 11 thg 6", "Chưa lập chỉ mục": 365, "Được lập chỉ mục": 132 },
  { date: "Thứ Bảy, 14 thg 6", "Chưa lập chỉ mục": 330, "Được lập chỉ mục": 140 },
  { date: "Thứ Ba, 17 thg 6", "Chưa lập chỉ mục": 370, "Được lập chỉ mục": 135 },
  { date: "Thứ Sáu, 20 thg 6", "Chưa lập chỉ mục": 310, "Được lập chỉ mục": 150 },
  { date: "Thứ Hai, 23 thg 6", "Chưa lập chỉ mục": 320, "Được lập chỉ mục": 160 },
  { date: "Thứ Năm, 26 thg 6", "Chưa lập chỉ mục": 300, "Được lập chỉ mục": 158 },
  { date: "Chủ nhật, 29 thg 6", "Chưa lập chỉ mục": 280, "Được lập chỉ mục": 170 },
  { date: "Thứ Tư, 2 thg 7", "Chưa lập chỉ mục": 320, "Được lập chỉ mục": 165 },
  { date: "Thứ Bảy, 5 thg 7", "Chưa lập chỉ mục": 260, "Được lập chỉ mục": 180 },
  { date: "Thứ Ba, 8 thg 7", "Chưa lập chỉ mục": 290, "Được lập chỉ mục": 175 },
  { date: "Thứ Sáu, 11 thg 7", "Chưa lập chỉ mục": 250, "Được lập chỉ mục": 190 },
  { date: "Thứ Hai, 14 thg 7", "Chưa lập chỉ mục": 220, "Được lập chỉ mục": 200 },
  { date: "Thứ Năm, 17 thg 7", "Chưa lập chỉ mục": 240, "Được lập chỉ mục": 195 },
  { date: "Chủ nhật, 20 thg 7", "Chưa lập chỉ mục": 200, "Được lập chỉ mục": 210 },
  { date: "Thứ Tư, 23 thg 7", "Chưa lập chỉ mục": 180, "Được lập chỉ mục": 215 },
  { date: "Thứ Bảy, 26 thg 7", "Chưa lập chỉ mục": 210, "Được lập chỉ mục": 212 },
  { date: "Thứ Ba, 29 thg 7", "Chưa lập chỉ mục": 170, "Được lập chỉ mục": 220 },
  { date: "Thứ Sáu, 1 thg 8", "Chưa lập chỉ mục": 160, "Được lập chỉ mục": 225 },
  { date: "Thứ Hai, 4 thg 8", "Chưa lập chỉ mục": 150, "Được lập chỉ mục": 230 },
  { date: "Thứ Năm, 7 thg 8", "Chưa lập chỉ mục": 175, "Được lập chỉ mục": 228 },
  { date: "Chủ nhật, 10 thg 8", "Chưa lập chỉ mục": 150, "Được lập chỉ mục": 235 },
  { date: "Thứ Tư, 13 thg 8", "Chưa lập chỉ mục": 140, "Được lập chỉ mục": 240 },
  { date: "Thứ Bảy, 16 thg 8", "Chưa lập chỉ mục": 130, "Được lập chỉ mục": 238 },
  { date: "Thứ Ba, 19 thg 8", "Chưa lập chỉ mục": 120, "Được lập chỉ mục": 245 },
  { date: "Thứ Sáu, 22 thg 8", "Chưa lập chỉ mục": 110, "Được lập chỉ mục": 248 },
  { date: "Thứ Hai, 25 thg 8", "Chưa lập chỉ mục": 125, "Được lập chỉ mục": 250 },
  { date: "Thứ Năm, 28 thg 8", "Chưa lập chỉ mục": 115, "Được lập chỉ mục": 252 },
  { date: "Chủ nhật, 31 thg 8", "Chưa lập chỉ mục": 110, "Được lập chỉ mục": 255 },
];

export default function IndexChart() {
  return (
    <div className="w-full max-w-[1000px] mx-auto mt-6">
      {/* Chart container */}
      <div className="w-full h-[220px] rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }} // 👈 bỏ dư bên trái
          >
            <CartesianGrid stroke="#f1f3f4" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.split(", ")[1]}
              interval={4}
              padding={{ left: 5, right: 5 }} // 👈 tránh dư 2 bên
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, dx: -5 }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const notIndexed = payload.find((p) => p.name === "Chưa lập chỉ mục")?.value ?? 0;
                  const indexed = payload.find((p) => p.name === "Được lập chỉ mục")?.value ?? 0;

                  return (
                    <div className="bg-white border border-gray-300 rounded-md p-2 text-sm shadow-md">
                      {/* Ngày */}
                      <div className="font-medium text-gray-800 mb-2 ">{label}</div>

                      {/* Chưa lập chỉ mục */}
                      <div className="flex items-center justify-between mb-1 gap-3">
                        <div className="flex items-center gap-2">
                          {/* gạch màu xám */}
                          <span className="inline-block w-4 h-[3px] bg-gray-400 rounded" />
                          <span className="text-sm text-gray-600">Chưa lập chỉ mục </span>
                        </div>
                        <div className="text-sm font-semibold text-brown-50">{notIndexed}</div>
                      </div>

                      {/* Được lập chỉ mục */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {/* gạch màu xanh */}
                          <span className="inline-block w-4 h-[3px] bg-green-600 rounded" />
                          <span className="text-sm text-gray-700">Được lập chỉ mục </span>
                        </div>
                        <div className="text-sm font-semibold text-brown-50">{indexed}</div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            {/* Line xám */}
            <Line
              type="monotone"
              dataKey="Chưa lập chỉ mục"
              stroke="#939495"
              strokeWidth={2}
              dot={false}
            />

            {/* Line xanh lá */}
            <Line
              type="monotone"
              dataKey="Được lập chỉ mục"
              stroke="#1a7433ff"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>

  );
}
