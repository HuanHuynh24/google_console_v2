"use client";
import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
export default function DateRangePopup({
  isOpen,
  setIsOpen,
  handleClickChangeTime,
}) {
  const [selected, setSelected] = useState("12 tháng trước");
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // Lấy hôm qua làm mặc định
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 2);

  const [date, setDate] = useState(formatDate(yesterday));
  const [optionSelected, setOptionSelected] = useState(null);
  const options = [
    "6 tháng trước",
    "12 tháng trước",
    "16 tháng trước",
    "Tùy chỉnh",
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-[560px] bg-white rounded-[28px] shadow-xl ">
            {/* Header */}
            <div className="p-6 pb-4 ">
              <h2 className="text-lg font-semibold">Phạm vi ngày</h2>
            </div>
            <div className="h-[48px] flex mt-2 space-x-6 text-sm px-6">
              <button className="text-[#0b57d0] font-medium border-b-2 border-[#0b57d0]">
                Bộ lọc
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                Compare
              </button>
            </div>
            {/* Body */}
            <div className="p-4 ">
              {/* Radio options */}
              {options.map((opt, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="date-range"
                    onClick={() => {
                      setOptionSelected(index + 5);
                    }}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    className="h-[48px] w-4 text-[#0b57d0]  "
                  />
                  <span>{opt}</span>
                </label>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-2 pl-8">
                {/* Ngày bắt đầu */}
                <div className="h-[56px] relative w-full">
                  {/* Input */}
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="w-full h-[56px] rounded border border-gray-400 px-3 py-2"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                    <CalendarTodayIcon />
                  </span>
                  {/* Label */}
                  <label
                    htmlFor="start-date"
                    className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 transition-all"
                  >
                    Ngày bắt đầu
                  </label>
                  <p className="uppercase ml-4 text-[#444746] text-[12px] pt-1">
                    NNNN-TT-NN
                  </p>
                </div>

                {/* Ngày kết thúc */}
                <div className="h-[56px] relative w-full">
                  {/* Input */}
                  <input
                    type="text"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                    className="w-full h-[56px] rounded border border-gray-400 px-3 py-2"
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 ">
                    <CalendarTodayIcon />
                  </span>
                  {/* Label */}
                  <label
                    htmlFor="end-date"
                    className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600 peer-placeholder-shown:top-2 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-600 transition-all"
                  >
                    Ngày kết thúc
                  </label>
                  <p className="uppercase ml-4 text-[#444746] text-[12px] pt-1">
                    NNNN-TT-NN
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 px-6 pb-5">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleClickChangeTime(optionSelected);
                }}
                className="px-4 py-2 rounded-lg bg-[#0b57d0] text-white text-sm font-medium"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
