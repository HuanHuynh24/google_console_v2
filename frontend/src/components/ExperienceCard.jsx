"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
const duongDanData = [
  { orange: 0, red: 0 },
  { orange: 0, red: 0 },
  { orange: 0, red: 0 },
  { orange: 0, red: 0 },
  { orange: 0, red: 0 },
  { orange: 0, red: 0 },
  { orange: 5, red: 0 },
  { orange: 7, red: 0 },
  { orange: 5, red: 0 },
  { orange: 7, red: 0 },
  { orange: 5, red: 0 },
];

const faqData = [
  { green: 2, red: 0 },
  { green: 3, red: 0 },
  { green: 2, red: 0 },
  { green: 2, red: 0 },
  { green: 1, red: 0 },
  { green: 3, red: 0 },
  { green: 2, red: 0 },
];
export default function ExperienceTable() {
  return (
    <div className="bg-white rounded-xl p-6">
      {/* Title */}
      <h2 className="text-2xl mb-4">Trải nghiệm</h2>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table-auto min-w-max text-sm text-gray-700">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="py-2 px-3 font-medium text-start">Loại</th>
              <th className="py-2 px-3 font-medium"></th>
              <th className="py-2 px-3 font-medium text-end">Tốt</th>
              <th className="py-2 px-3 font-medium text-end">Cần cải thiện</th>
              <th className="py-2 px-3 font-medium text-end">Kém</th>
              <th className="py-2 px-3 font-medium text-start">Xu hướng</th>
              <th className="py-2 px-3"></th>
            </tr>
          </thead>
          <tbody>
            {/* Nhóm 1 */}
            <tr className="border-t border-gray-300">
              <td className="px-3 font-semibold text-start">
                Chỉ số quan trọng chính của trang web
              </td>
              <td className="py-1 px-3 font-semibold">
                <div className="pl-4 font-normal text-gray-600">
                  <div>Sơ đồ trang web dành cho điện thoại di động</div>
                </div>
              </td>
              <td className="py-1 px-3 text-end">0</td>
              <td className="py-1 px-3 text-orange-500 text-end">38</td>
              <td className="py-1 px-3 text-red-600 text-end">0</td>
              <td className="py-1 px-3 w-24">
                <ResponsiveContainer width="100%" height={24}>
                  <LineChart data={duongDanData}>
                    <Line type="linear" dataKey="orange" stroke="#d34d09ff" strokeWidth={2} dot={false} />
                    <Line type="linear" dataKey="red" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </td>
              <td className="py-1 px-3 text-right">
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

            <tr>
              <td className="py-1 px-3"></td>
              <td className="py-1 px-3 font-semibold">
                <div className="pl-4 font-normal text-gray-600">
                  <div>Máy tính</div>
                </div>
              </td>
              <td className="py-1 px-3 text-gray-400 text-end">Không có dữ liệu</td>
              <td className="py-1 px-3 text-gray-400 text-end">Không có dữ liệu</td>
              <td className="py-1 px-3 text-gray-400 text-end">Không có dữ liệu</td>
              <td className="py-1 px-3 text-gray-400 text-start whitespace-nowrap">Không có dữ liệu</td>
            </tr>

            <tr>
              <td className="pt-8 pb-3 px-3"></td>
              <td className="pt-8 pb-3 px-3"></td>
              <td className="pt-8 pb-3 px-3 text-gray-500 font-semibold text-end">HTTPS</td>
              <td className="pt-8 pb-3 px-3"></td>
              <td className="pt-8 pb-3 px-3 text-gray-500 font-semibold text-end">Không phải HTTPS</td>
              <td className="pt-8 pb-3 px-3"></td>
            </tr>

            {/* Nhóm 3 */}
            <tr className="border-t border-gray-300">
              <td className="py-3 px-3 font-semibold">HTTPS</td>
              <td className="py-3 px-3"></td>
              <td className="py-3 px-3 text-green-600 text-end">38</td>
              <td className="py-3 px-3 text-end"></td>
              <td className="py-3 px-3 text-end text-red-600">0</td>
              <td className="py-3 px-3 w-24">
                <ResponsiveContainer width="100%" height={24}>
                  <LineChart data={faqData}>
                    <Line type="linear" dataKey="green" stroke="#16a34a" strokeWidth={2} dot={false} />
                    <Line type="linear" dataKey="red" stroke="#dc2626" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </td>
              <td className="py-3 px-3 text-right">
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
          </tbody>
        </table>
      </div>
    </div>
  );
}
