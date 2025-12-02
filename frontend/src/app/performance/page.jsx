"use client";

import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useMemo, useState } from "react";
import PerformanceChart from "@/components/PerformanceChart";
import SearchQueriesTable from "@/components/SearchQueriesTable";
import {
  getDataGroupByDate,
  getDataGroupByKeyWord,
  getDataGroupByPage,
} from "@/service/Data";
import { formatStats } from "@/utils/convertNumber";
import { calcTotals } from "@/utils/calcTotals";
import DateRangePopup from "@/components/DateRangePopup";

export default function OverView() {
  const now = new Date();

  // --- STATE CHÍNH ---
  const [itemActice, setActiveItem] = useState(4);
  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initData, setInitData] = useState([]);
  const [queryData, setQueryData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [valueSummarys, setValueSummarys] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState([
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  // --- RANGE THỜI GIAN ---
  const [queryTime, setQueryTime] = useState(() => {
    const d = new Date();
    d.setMonth(d.getMonth() - 3);
    return d;
  });

  const [queryEndTime, setQueryEndTime] = useState(new Date());
  const [indexQueryTime, setIndexQueryTime] = useState(4);

  // popup DateRangePopup
  const [isOpen, setIsOpen] = useState(false);

  // -------------------- API CALL ---------------------
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getDataGroupByKeyWord(2, queryTime, queryEndTime);
        setQueryData(res);
      } catch (err) {
        console.error("Error get keywords:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, [queryTime, queryEndTime]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getDataGroupByDate(2, queryTime, queryEndTime);

        const sorted = [...res].sort((a, b) => {
          const [d1, m1, y1] = a.date.split("/").map(Number);
          const [d2, m2, y2] = b.date.split("/").map(Number);
          return new Date(2000 + y1, m1 - 1, d1) - new Date(2000 + y2, m2 - 1, d2);
        });

        setChartData(sorted);
      } catch (err) {
        console.error("Error get chart:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, [queryTime, queryEndTime]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getDataGroupByPage(2, queryTime, queryEndTime);
        setInitData(res);
      } catch (err) {
        console.error("Error get pages:", err);
      }
      setLoading(false);
    }
    fetchData();
  }, [queryTime, queryEndTime]);

  // summarys
  useEffect(() => {
    if (chartData.length > 0) {
      setValueSummarys(formatStats(calcTotals(chartData)));
    }
  }, [chartData]);

  // mapping data → table
  const tabData = useMemo(
    () => ({
      0: queryData,
      1: initData,
    }),
    [queryData, initData]
  );

  // -------------------- HANDLE PRESET TIME ---------------------
  const handleClickChangeTime = (index) => {
    let start = new Date(now);
    const end = new Date(now);

    switch (index) {
      case 1: // 24h
        start.setDate(start.getDate() - 1);
        setIndexQueryTime(1);
        setActiveItem(1);
        break;

      case 2: // 7 ngày
        start.setDate(start.getDate() - 7);
        setIndexQueryTime(2);
        setActiveItem(2);
        break;

      case 3: // 28 ngày
        start.setDate(start.getDate() - 28);
        setIndexQueryTime(3);
        setActiveItem(3);
        break;

      case 4: // 3 tháng
        start.setMonth(start.getMonth() - 3);
        setIndexQueryTime(4);
        setActiveItem(4);
        break;

      default:
        break;
    }

    setQueryTime(start);
    setQueryEndTime(end);
  };

  // -------------------- HANDLE APPLY FROM POPUP ---------------------
  const handleApplyDateRange = (startDate, endDate, optionIndex) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    console.log(startDate,"-", endDate)
    // ---- CASE PRESET 6 THÁNG, 12 THÁNG, 16 THÁNG ----
    if (optionIndex === 5) {
      const t = new Date(now);
      t.setMonth(t.getMonth() - 6);
      setIndexQueryTime(6);
      setActiveItem(10);
      setQueryTime(t);
      setQueryEndTime(now);
      return;
    }

    if (optionIndex === 6) {
      const t = new Date(now);
      t.setMonth(t.getMonth() - 12);
      setIndexQueryTime(12);
      setActiveItem(10);
      setQueryTime(t);
      setQueryEndTime(now);
      return;
    }

    if (optionIndex === 7) {
      const t = new Date(now);
      t.setMonth(t.getMonth() - 16);
      setIndexQueryTime(16);
      setActiveItem(10);
      setQueryTime(t);
      setQueryEndTime(now);
      return;
    }

    // ---- CASE TÙY CHỈNH ----
    if (optionIndex === 8) {
      setIndexQueryTime("custom");
      setActiveItem(10);
      setQueryTime(start);
      setQueryEndTime(end);
      return;
    }
  };

  // Buttons chọn thời gian
  const optionTime = [
    { key: 1, time: "24 giờ" },
    { key: 2, time: "7 ngày" },
    { key: 3, time: "28 ngày" },
    { key: 4, time: "3 tháng" },
    { key: 10, time: "Thêm" },
  ];

  return (
    <div className="w-full h-[calc(100vh-64px)]  ml-[104px]">
      <div className="h-16 border-b border-[#c4c7c5] flex items-center justify-between">
        <h2 className="text-[21px] font-medium">Hiệu suất</h2>
        <div className="flex gap-2 pr-8">
          <FileDownloadIcon />
          <h2 className="font-medium">XUẤT</h2>
        </div>
      </div>

      {/* Time selection */}
      <div className=" mr-6 py-4 ">
        <div className="flex">
          <div className="flex border-r  rounded-r-[8px] overflow-hidden">
            {optionTime.map((item) => {
              const index = item.key;
              return (
                <div
                  key={item.key}
                  onClick={() => {
                    if (index === 10) {
                      setIsOpen(true);
                    } else {
                      handleClickChangeTime(index);
                    }
                  }}
                  className={`h-[30px] ${
                    index === itemActice
                      ? "bg-[#c5e5ff] text-[#004a77]"
                      : "text-[#444746]"
                  } flex items-center font-medium text-sm px-3 border ${
                    index === 1 ? "rounded-l-[8px]" : ""
                  } cursor-pointer`}
                >
                  {index === itemActice && <CheckIcon className="mr-1" />}
                  {index === 10
                    ? indexQueryTime === 6
                      ? "6 tháng"
                      : indexQueryTime === 12
                      ? "12 tháng"
                      : indexQueryTime === 16
                      ? "16 tháng"
                      : indexQueryTime === "custom"
                      ? "Tùy chỉnh"
                      : "Thêm"
                    : item.time}

                  {index === 10 && indexQueryTime < 6 && (
                    <ArrowDropDownIcon fontSize="small" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Bộ lọc phụ */}
          <div className="flex gap-2 pl-4">
            <div className="h-[30px] text-sm flex items-center border px-3 rounded-[8px] cursor-pointer">
              Loại tìm kiếm: Web
              <ArrowDropDownIcon fontSize="small" className="ml-2" />
            </div>

            <div className="h-[30px] text-sm flex items-center border px-3 rounded-[8px] cursor-pointer">
              <AddIcon className="mr-2" />
              Thêm bộ lọc
            </div>

            <div className="h-[30px] flex items-center px-3 cursor-pointer text-[#0b57d0]">
              Đặt lại bộ lọc
            </div>
          </div>
        </div>
      </div>

      <p className="text-right pr-8 pb-5 text-[15px]">
        Lần cập nhật gần đây nhất: 10,5 giờ trước
      </p>

      {/* Main content */}
      <div className="w-full max-h-[500px] overflow-y-scroll pr-6 pb-16 ">
        <div className="flex flex-col gap-6">
          <PerformanceChart
            chartData={chartData}
            summarys={[
              {
                key: 0,
                title: "Tổng số lượt nhấp",
                tooltipName:"Lượt nhấp",
                number: valueSummarys.clicks,
                color: "#4285f4",
                dataKey: "clicks",
              },
              {
                key: 1,
                title: "Tổng số lượt hiển ...",
                tooltipName:"Lượt hiển thị",
                number: valueSummarys.impressions,
                color: "#673ab7",
                dataKey: "impressions",
              },
              {
                key: 2,
                title: "CTR trung bình",
                tooltipName:"CTR trung bình",
                number: valueSummarys.ctr ? valueSummarys.ctr + "%" : "",
                color: "#009688",
                dataKey: "ctr",
              },
              {
                key: 3,
                title: "Vị trí trung bình",
                tooltipName:"Vị trí trung bình",
                number: valueSummarys.position,
                color: "#dc650b",
                dataKey: "position",
              },
            ]}
            indexQueryTime={indexQueryTime}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          {!loading && (
            <SearchQueriesTable
              tabData={tabData}
              visibleColumns={visibleColumns}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          )}
        </div>
      </div>

      {/* POPUP RANGE DATE */}
      <DateRangePopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleApply={handleApplyDateRange}
      />
    </div>
  );
}
