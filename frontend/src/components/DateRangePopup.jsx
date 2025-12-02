"use client";

import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import GCSCalendar from "./CalendarModal";

export default function DateRangePopup({ isOpen, setIsOpen, handleApply }) {
  const [selected, setSelected] = useState("12 tháng trước");

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  // mặc định hôm qua → startDate
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const [startDate, setStartDate] = useState(formatDate(yesterday));
  const [endDate, setEndDate] = useState(formatDate(new Date()));

  const [optionSelected, setOptionSelected] = useState(null);
  const [calendarOpenFor, setCalendarOpenFor] = useState(null);

  const options = ["6 tháng trước", "12 tháng trước", "16 tháng trước", "Tùy chỉnh"];

  // index của option "Tùy chỉnh"
  const CUSTOM_INDEX = options.indexOf("Tùy chỉnh"); // = 3
  const CUSTOM_VALUE = CUSTOM_INDEX + 5; // giữ nguyên mapping i+5 của bạn

  const selectCustomOption = () => {
    setSelected("Tùy chỉnh");
    setOptionSelected(CUSTOM_VALUE);
  };

  const currentPopupDate =
    calendarOpenFor === "start"
      ? new Date(startDate)
      : calendarOpenFor === "end"
      ? new Date(endDate)
      : new Date();

  const handleSelectCalendarDate = (d) => {
    const formatted = formatDate(d);
    if (calendarOpenFor === "start") setStartDate(formatted);
    else if (calendarOpenFor === "end") setEndDate(formatted);

    // khi đã chọn ngày trong calendar → tự động chuyển sang "Tùy chỉnh"
    selectCustomOption();
    setCalendarOpenFor(null);
  };

  const onApply = () => {
    setIsOpen(false);
    handleApply(startDate, endDate, optionSelected);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="w-[560px] bg-white rounded-[28px] shadow-xl">
            {/* Header */}
            <div className="p-6 pb-4">
              <h2 className="text-lg font-semibold">Phạm vi ngày</h2>
            </div>

            <div className="h-[48px] flex mt-2 space-x-6 text-sm px-6">
              <button className="text-[#0b57d0] font-medium border-b-2 border-[#0b57d0]">
                Bộ lọc
              </button>
              <button className="text-gray-500">Compare</button>
            </div>

            {/* Body */}
            <div className="p-4">
              {options.map((opt, i) => (
                <label key={i} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="date-range"
                    onClick={() => setOptionSelected(i + 5)}
                    checked={selected === opt}
                    onChange={() => setSelected(opt)}
                    className="h-[48px] w-4 text-[#0b57d0]"
                  />
                  <span>{opt}</span>
                </label>
              ))}

              <div className="grid grid-cols-2 gap-3 pt-2 pl-8">
                {/* Ngày bắt đầu */}
                <div className="h-[56px] relative w-full">
                  <input
                    type="text"
                    value={startDate}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                      selectCustomOption(); // gõ tay cũng coi là tùy chỉnh
                    }}
                    placeholder="YYYY-MM-DD"
                    className="w-full h-[56px] rounded border border-gray-400 px-3 py-2"
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => {
                      selectCustomOption(); // bấm icon lịch → chuyển sang Tùy chỉnh
                      setCalendarOpenFor("start");
                    }}
                  >
                    <CalendarTodayIcon />
                  </span>

                  <label className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600">
                    Ngày bắt đầu
                  </label>
                </div>

                {/* Ngày kết thúc */}
                <div className="h-[56px] relative w-full">
                  <input
                    type="text"
                    value={endDate}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                      selectCustomOption();
                    }}
                    placeholder="YYYY-MM-DD"
                    className="w-full h-[56px] rounded border border-gray-400 px-3 py-2"
                  />
                  <span
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                    onClick={() => {
                      selectCustomOption();
                      setCalendarOpenFor("end");
                    }}
                  >
                    <CalendarTodayIcon />
                  </span>

                  <label className="absolute left-2 -top-2.5 bg-white px-1 text-sm text-gray-600">
                    Ngày kết thúc
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-4 px-6 pb-5">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm text-[#0b57d0]"
              >
                Hủy
              </button>
              <button
                onClick={onApply}
                className="px-4 py-2 rounded-[30px] bg-[#0b57d0] text-white text-sm font-medium"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup Calendar */}
      {calendarOpenFor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30">
          <GCSCalendar
            selectedDate={currentPopupDate}
            setSelectedDate={handleSelectCalendarDate}
            onClose={() => setCalendarOpenFor(null)}
          />
        </div>
      )}
    </>
  );
}
