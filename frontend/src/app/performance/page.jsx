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
  const [itemActice, setActiveItem] = useState(4);
  const [activeTab, setActiveTab] = useState(1); // default "TRANG"
  const [loading, setLoading] = useState(false);
  const [initData, setInitData] = useState([]);
  // visibleColumns lưu dataKey: "clicks" | "impressions" | "ctr" | "position"
  const [visibleColumns, setVisibleColumns] = useState([
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);
  const now = new Date();
  const [queryTime, setQueryTime] = useState(
    new Date().getMonth(now.getMonth() - 3)
  );
  const [indexQueryTime, setIndexQueryTime] = useState(4);
  const [queryData, setQueryData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [valueSummarys, setValueSummarys] = useState([]);
  // --- table fake data (theo cấu trúc bạn dùng trong table)
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getDataGroupByKeyWord(1, queryTime, now);
        setQueryData(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      }
    }
    fetchData();
  }, [queryTime]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getDataGroupByDate("1", queryTime, now);
        const sortedData = [...res].sort((a, b) => {
          const [dayA, monthA, yearA] = a.date.split("/").map(Number);
          const [dayB, monthB, yearB] = b.date.split("/").map(Number);

          const dateA = new Date(2000 + yearA, monthA - 1, dayA); // '25' -> 2025
          const dateB = new Date(2000 + yearB, monthB - 1, dayB);

          return dateA - dateB; // tăng dần
          // return dateB - dateA; // giảm dần
        });

        setChartData(sortedData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      }
    }
    fetchData();
  }, [queryTime]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await getDataGroupByPage("1", queryTime, now);
        setInitData(res);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Lỗi khi gọi API:", err);
      }
    }
    fetchData();
  }, [queryTime]);

  useEffect(() => {
    if (chartData.length > 0) {
      setValueSummarys(formatStats(calcTotals(chartData)));
    }
  }, [chartData]);
  // --- summarys mapping (dataKey dùng để bật/tắt cột)
  const summarys = [
    {
      key: 0,
      title: "Tổng số lượt nhấp",
      number: valueSummarys.clicks,
      color: "#4285f4",
      dataKey: "clicks",
      tooltipName: "Lượt nhấp",
    },
    {
      key: 1,
      title: "Tổng số lượt hiể...",
      number: valueSummarys.impressions,
      color: "#673ab7",
      dataKey: "impressions",
      tooltipName: "Lượt hiển thị",
    },
    {
      key: 2,
      title: "CTR trung bình",
      number: valueSummarys.ctr ? valueSummarys.ctr + "%" : "",
      color: "#009688",
      dataKey: "ctr",
      tooltipName: "CTR",
    },
    {
      key: 3,
      title: "Vị trí trung bình",
      number: valueSummarys.position,
      color: "#dc650bff",
      dataKey: "position",
      tooltipName: "Vị trí",
    },
  ];
  const handleClickChangeTime = (index) => {
    let time = new Date(now);

    switch (index) {
      case 1:
        time.setDate(time.getDate() - 1);
        setIndexQueryTime(1);
        setActiveItem(1);
        break;
      case 2:
        time.setDate(time.getDate() - 7);
        setIndexQueryTime(2);
        setActiveItem(2);
        break;
      case 3:
        time.setDate(time.getDate() - 28);
        setIndexQueryTime(3);
        setActiveItem(3);
        break;
      case 4:
        time.setMonth(time.getMonth() - 3);
        setIndexQueryTime(4);
        setActiveItem(4);
        break;
      case 5:
        time.setMonth(time.getMonth() - 6);
        setIndexQueryTime(6);
        setActiveItem(10);
        break;
      case 6:
        time.setMonth(time.getMonth() - 12);
        setIndexQueryTime(12);
        setActiveItem(10);
        break;
      case 7:
        time.setMonth(time.getMonth() - 16);
        setIndexQueryTime(16);
        setActiveItem(10);
        break;
      default:
        console.log("error");
        setActiveItem(1);
        break;
    }

    setQueryTime(time);
  };

  const tabData = useMemo(
    () => ({
      0: queryData,
      1: initData,
    }),
    [queryData, initData]
  );

  const optionTime = [
    { key: 1, time: "24 giờ" },
    { key: 2, time: "7 ngày" },
    { key: 3, time: "28 ngày" },
    { key: 4, time: "3 tháng" },
    {
      key: 10,
      time: "thêm",
    },
  ];

  return (
    <div className="w-full h-[calc(100vh-64px)]  ml-[104px]">
      <div className="h-16 border-b-1 border-[#c4c7c5] flex items-center justify-between">
        <h2 className="text-[21px] font-medium">Hiệu suất</h2>{" "}
        <div className="flex gap-2 pr-8">
          <FileDownloadIcon />
          <h2 className="font-medium">XUẤT</h2>
        </div>
      </div>

      <div className=" mr-6 py-4 ">
        <div className="flex">
          <div className="flex border-r  rounded-r-[8px] overflow-hidden  ">
            {optionTime.map((item) => {
              const index = item.key;
              return (
                <div
                  onClick={() => {
                    handleClickChangeTime(index);
                    if (index == 10) {
                      setIsOpen(true);
                    }
                  }}
                  key={item.key}
                  className={`h-[30px] ${
                    index === itemActice
                      ? "bg-[#c5e5ff] text-[#001d35]"
                      : "text-[#444746]"
                  } hover:text-[#1f1f1f] hover:cursor-pointer font-medium text-sm flex items-center justify-center px-3 border-1 border-[#747775] ${
                    index === 1 ? "rounded-l-[8px]" : ""
                  }`}
                >
                  {index === itemActice ? (
                    <CheckIcon className="!text-[18px] font-extrabold mr-2" />
                  ) : (
                    ""
                  )}
                  {index === 10
                    ? indexQueryTime == 6
                      ? "6 tháng"
                      : indexQueryTime == 12
                      ? "12 tháng"
                      : indexQueryTime == 16
                      ? "16 tháng"
                      : "Thêm"
                    : item.time}

                  {index === 10 && indexQueryTime < 6 && (
                    <span>
                      <ArrowDropDownIcon fontSize="small" />
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 pl-4">
            <div
              className={`h-[30px] hover:text-[#1f1f1f] hover:cursor-pointer rounded-[8px] font-medium text-sm flex items-center justify-center px-3 border-1 border-[#747775]`}
            >
              Loại tìm kiếm: Web
              <span className="pl-2">
                <ArrowDropDownIcon fontSize="small" />
              </span>
            </div>
            <div
              className={`h-[30px]  hover:text-[#1f1f1f] hover:cursor-pointer rounded-[8px] font-medium text-sm flex items-center justify-center px-3 border-1 border-[#747775]`}
            >
              <AddIcon className="!text-[18px] mr-2" />
              Thêm bộ lọc
            </div>
            <div
              className={`h-[30px]  hover:cursor-pointer hover:bg-[#0b57d017] font-medium text-sm flex items-center justify-center px-3 hover:rounded-3xl text-[#0b57d0]`}
            >
              Đặt lại bộ lọc
            </div>
          </div>
        </div>
      </div>
      <p className="text-[15px] leading-[48px] text-right pr-8">
        Lần cập nhật gần đây nhất: 10,5 giờ trước
      </p>

      <div className="w-full max-h-[500px] overflow-y-scroll pr-6 pb-16 mt-[10px]">
        <div className="flex flex-col gap-6">
          {/* truyền data + state quản lý cột xuống con */}
          <PerformanceChart
            chartData={chartData}
            summarys={summarys}
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
      <DateRangePopup
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleClickChangeTime={handleClickChangeTime}
      />
    </div>
  );
}
