"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const duongDanData = [
  { green: 15, red: 0 },
  { green: 18, red: 0 },
  { green: 14, red: 0 },
  { green: 20, red: 0 },
  { green: 40, red: 0 },
  { green: 24, red: 0 },
  { green: 25, red: 0 },
  { green: 21, red: 0 },
  { green: 22, red: 0 },
  { green: 20, red: 0 },
  { green: 30, red: 0 },
];

const faqData = [
  { green: 0, red: 0 },
  { green: 0, red: 0 },
  { green: 0, red: 0 },
  { green: 2, red: 0 },
  { green: 1, red: 0 },
  { green: 3, red: 0 },
  { green: 2, red: 0 },
];

export default function AdvancedFeaturesTable() {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl mb-6">Các tính năng nâng cao</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 px-3 font-medium">Loại</th>
              <th className="py-2 px-3 font-medium text-end">Hợp lệ</th>
              <th className="py-2 px-4 font-medium text-end">Không hợp lệ</th>
              <th className="py-2 px-4 font-medium text-start">Xu hướng</th>
              <th className="py-2 px-1" /> {/* cột mũi tên (không header) */}
            </tr>
          </thead>

          <tbody>
            {/* Row 1 */}
            <tr className="border-b hover:bg-brown-50 border-t border-gray-300">
              <td className="py-3 px-3 text-gray-900">Đường dẫn</td>
              <td className="py-3 px-3 text-end text-green-600 font-medium">58</td>
              <td className="py-3 px-4 text-end text-red-600 font-medium">0</td>

              <td className="py-3 px-4 w-26 text-start">
                <ResponsiveContainer width="100%" height={22}>
                  <LineChart data={duongDanData}>
                    <Line type="monotone" dataKey="green" stroke="#036f2bff" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="red" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </td>

              <td className="py-3 text-right">
                <button
                  aria-label="Xem chi tiết Đường dẫn"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-blue-600"
                >
                  {/* chevron right — dùng currentColor để áp màu text-blue-600 */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </td>
            </tr>

            {/* Row 2 */}
            <tr className="hover:bg-gray-50">
              <td className="py-3 px-3 text-gray-900">Câu hỏi thường gặp</td>
              <td className="py-3 px-3 text-end text-green-600 font-medium">2</td>
              <td className="py-3 px-4 text-end text-red-600 font-medium">0</td>
              <td className="py-3 px-4 w-26 text-start">
                <ResponsiveContainer width="100%" height={22}>
                  <LineChart data={faqData}>
                    <Line type="monotone" dataKey="green" stroke="#036f2bff" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="red" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </td>

              <td className="py-3 text-right">
                <button
                  aria-label="Xem chi tiết FAQ"
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 text-blue-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
