"use client";

import { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MONTH_LABELS = [
  "Tháng 1",
  "Tháng 2",
  "Tháng 3",
  "Tháng 4",
  "Tháng 5",
  "Tháng 6",
  "Tháng 7",
  "Tháng 8",
  "Tháng 9",
  "Tháng 10",
  "Tháng 11",
  "Tháng 12",
];

const WEEK_LABELS = ["T2", "T3", "T4", "T5", "T6", "T7", "CN"];

export default function GCSCalendar({ selectedDate, setSelectedDate, onClose }) {
  const initialDate = selectedDate || new Date();

  const [viewYear, setViewYear] = useState(initialDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(initialDate.getMonth()); // 0-11
  const [tempDate, setTempDate] = useState(initialDate);

  useEffect(() => {
    if (selectedDate) {
      setViewYear(selectedDate.getFullYear());
      setViewMonth(selectedDate.getMonth());
      setTempDate(selectedDate);
    }
  }, [selectedDate]);

  const goPrevYear = () => setViewYear((y) => y - 1);
  const goNextYear = () => setViewYear((y) => y + 1);

  const goPrevMonth = () => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const goNextMonth = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // index thứ trong tuần (bắt đầu từ T2)
  const firstDayIndex = (() => {
    const day = new Date(viewYear, viewMonth, 1).getDay(); // 0: CN
    // chuyển sang hệ T2=0 ... CN=6
    return (day + 6) % 7;
  })();

  const currentMonthDays = daysInMonth(viewYear, viewMonth);
  const prevMonthDays = daysInMonth(
    viewYear,
    viewMonth === 0 ? 11 : viewMonth - 1
  );

  const totalCells = 6 * 7; // 6 hàng
  const cells = [];

  for (let i = 0; i < totalCells; i++) {
    const dayNumber = i - firstDayIndex + 1;

    if (dayNumber <= 0) {
      // ngày tháng trước
      cells.push({
        label: prevMonthDays + dayNumber,
        inCurrentMonth: false,
        key: `prev-${i}`,
      });
    } else if (dayNumber > currentMonthDays) {
      // ngày tháng sau
      cells.push({
        label: dayNumber - currentMonthDays,
        inCurrentMonth: false,
        key: `next-${i}`,
      });
    } else {
      cells.push({
        label: dayNumber,
        inCurrentMonth: true,
        key: `cur-${i}`,
      });
    }
  }

  const isSameDay = (d1, year, month, day) => {
    if (!d1) return false;
    return (
      d1.getFullYear() === year &&
      d1.getMonth() === month &&
      d1.getDate() === day
    );
  };

  const handleDayClick = (cell) => {
    if (!cell.inCurrentMonth) return;
    const newDate = new Date(viewYear, viewMonth, cell.label);
    setTempDate(newDate);
  };

  const handleOk = () => {
    if (tempDate) {
      setSelectedDate(tempDate);
    }
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  const handleClear = () => {
    // chỉ clear chọn trong UI, không gửi lên cha
    setTempDate(null);
  };

  return (
    <div className="w-[360px] bg-[#f3f6fb] rounded-[28px] shadow-xl px-6 pt-4 pb-3 text-sm text-[#202124]">
      {/* Thanh chọn năm / tháng */}
      <div className="flex justify-between items-center mb-3">
        {/* Năm */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrevYear}
            className="p-1 rounded-full hover:bg-black/5"
          >
            <ChevronLeftIcon fontSize="small" className="text-gray-600" />
          </button>

          <button
            type="button"
            className="flex items-center px-2 py-1 rounded-xl hover:bg-black/5"
          >
            <span className="mr-1 text-[14px]">{viewYear}</span>
            <ArrowDropDownIcon fontSize="small" className="text-gray-600" />
          </button>

          <button
            type="button"
            onClick={goNextYear}
            className="p-1 rounded-full hover:bg-black/5"
          >
            <ChevronRightIcon fontSize="small" className="text-gray-600" />
          </button>
        </div>

        {/* Tháng */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={goPrevMonth}
            className="p-1 rounded-full hover:bg-black/5"
          >
            <ChevronLeftIcon fontSize="small" className="text-gray-600" />
          </button>

          <button
            type="button"
            className="flex items-center px-2 py-1 rounded-xl hover:bg-black/5"
          >
            <span className="mr-1 text-[14px]">
              {MONTH_LABELS[viewMonth]}
            </span>
            <ArrowDropDownIcon fontSize="small" className="text-gray-600" />
          </button>

          <button
            type="button"
            onClick={goNextMonth}
            className="p-1 rounded-full hover:bg-black/5"
          >
            <ChevronRightIcon fontSize="small" className="text-gray-600" />
          </button>
        </div>
      </div>

      {/* Header thứ trong tuần */}
      <div className="grid grid-cols-7 mb-1 text-[12px] text-[#5f6368]">
        {WEEK_LABELS.map((w) => (
          <div
            key={w}
            className="h-8 flex items-center justify-center font-medium"
          >
            {w}
          </div>
        ))}
      </div>

      {/* Lưới ngày */}
      <div className="grid grid-cols-7 gap-y-1 pb-3">
        {cells.map((cell) => {
          const isSelectedCell =
            cell.inCurrentMonth &&
            isSameDay(tempDate, viewYear, viewMonth, cell.label);

          const baseClasses =
            "w-9 h-9 flex items-center justify-center rounded-full text-[13px]";

          let classes = baseClasses;

          if (!cell.inCurrentMonth) {
            classes += " text-gray-300";
          } else if (isSelectedCell) {
            // ngày đang chọn – giống nền tím + chữ trắng
            classes += " bg-[#0b57d0] text-white";
          } else {
            classes += " text-[#202124] hover:bg-black/5 cursor-pointer";
          }

          return (
            <div key={cell.key} className="flex justify-center">
              <button
                type="button"
                disabled={!cell.inCurrentMonth}
                onClick={() => handleDayClick(cell)}
                className={classes}
              >
                {cell.label}
              </button>
            </div>
          );
        })}
      </div>

      {/* Footer: Xóa / Hủy / OK */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={handleClear}
          className="text-[13px] font-medium text-[#0b57d0] hover:bg-black/5 px-2 py-1 rounded-md"
        >
          Xóa
        </button>

        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleCancel}
            className="text-[13px] text-[#0b57d0] hover:bg-black/5 px-2 py-1 rounded-md"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={handleOk}
            className="text-[13px] font-medium text-[#0b57d0] hover:bg-black/5 px-2 py-1 rounded-md"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
