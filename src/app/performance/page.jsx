"use client";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import PerformanceChart from "@/components/PerformanceChart";
import SearchQueriesTable from "@/components/SearchQueriesTable";

export default function OverView() {
  const [itemActice, setActiveItem] = useState(3);

  // visibleColumns lưu dataKey: "clicks" | "impressions" | "ctr" | "position"
  const [visibleColumns, setVisibleColumns] = useState([
    "clicks",
    "impressions",
    "ctr",
    "position",
  ]);

  // --- fake chart data (bạn có thể thay bằng API)
  const chartData = [
    { date: "12/8/25", clicks: 64, impressions: 1040, ctr: 0.6, position: 37 },
    { date: "15/8/25", clicks: 50, impressions: 900, ctr: 0.5, position: 39 },
    { date: "18/8/25", clicks: 72, impressions: 1200, ctr: 0.7, position: 34 },
    { date: "21/8/25", clicks: 60, impressions: 1100, ctr: 0.55, position: 36 },
    { date: "24/8/25", clicks: 80, impressions: 1300, ctr: 0.65, position: 33 },
    { date: "27/8/25", clicks: 55, impressions: 950, ctr: 0.45, position: 40 },
    { date: "30/8/25", clicks: 40, impressions: 516, ctr: 0.20, position: 35.7 },
    { date: "02/9/25", clicks: 40, impressions: 800, ctr: 0.4, position: 42 },
    { date: "05/9/25", clicks: 62, impressions: 1000, ctr: 0.58, position: 38 },
    { date: "08/9/25", clicks: 70, impressions: 1400, ctr: 0.6, position: 36 },
  ];

  // --- summarys mapping (dataKey dùng để bật/tắt cột)
  const summarys = [
    { key: 0, title: "Tổng số lượt nhấp", number: 64, color: "#4285f4", dataKey: "clicks", tooltipName: "Lượt nhấp" },
    { key: 1, title: "Tổng số lượt hiể...", number: "10,4 N", color: "#673ab7", dataKey: "impressions", tooltipName: "Lượt hiển thị" },
    { key: 2, title: "CTR trung bình", number: "0,6%", color: "#009688", dataKey: "ctr", tooltipName: "CTR" },
    { key: 3, title: "Vị trí trung bình", number: 37, color: "#dc650bff", dataKey: "position", tooltipName: "Vị trí" },
  ];

  // --- table fake data (theo cấu trúc bạn dùng trong table)
  const queryData = [
    { query: "thiết kế website", clicks: 50, impressions: 3200, ctr: 0.282, position: 1.9 },
    { query: "dịch vụ seo", clicks: 20, impressions: 1500, ctr: 0.09, position: 0.281 },
    { query: "webtop", clicks: 15, impressions: 800, ctr: 0.11, position: 0.204 },
    { query: "tối ưu tốc độ web", clicks: 8, impressions: 400, ctr: 0.12, position: 0.64 },
    { query: "bảo mật website", clicks: 5, impressions: 300, ctr: 0.125, position: 0.14 },
  ];

  const initData = [
    { url: "https://webtop.vn/", clicks: 18, impressions: 1283, ctr: 0.02, position: 0.696 },
    { url: "https://webtop.vn/blog-mau-website-phim-anh/", clicks: 0, impressions: 8, ctr: 0.04, position: 0.189 },
    { url: "https://webtop.vn/thiet-ke-website-rap-chieu-phim-chuyen-nghiep/", clicks: 0, impressions: 4, ctr: 0.05, position: 0.321 },
    { url: "https://webtop.vn/5-loi-ux-thuong-gap-trong-thiet-ke-website/", clicks: 0, impressions: 24, ctr: 0.06, position: 0.187 },
    { url: "https://webtop.vn/5-sai-lam-khi-thue-dich-vu-thiet-ke-website/", clicks: 0, impressions: 5, ctr: 0.17, position: 0.652 },
    { url: "https://webtop.vn/5-sai-lam-khi-thue-dich-vu-thiet-ke-website/", clicks: 0, impressions: 5, ctr: 0.17, position: 0.652 },
  ];

  const tabData = {
    0: queryData,
    1: initData,
  };

  const optionTime = [
    { key: 1, time: "24 giờ" },
    { key: 2, time: "7 ngày" },
    { key: 3, time: "28 ngày" },
    { key: 4, time: "3 tháng" },
  ];

  return (
    <div className="w-full h-[calc(100vh-64px)]  ml-[120px]">
      <div className="h-16 border-b-1 border-[#c4c7c5] flex items-center justify-between">
        <h2 className="text-[21px] font-medium">Hiệu suất</h2>{" "}
        <div className="flex gap-2 pr-8">
          <FileDownloadIcon />
          <h2 className="font-medium">XUẤT</h2>
        </div>
      </div>

      <div className=" mr-6 py-4 ">
        <div className="flex">
          <div className="flex pr-4  border-r border-r-[#c4c7c5]">
            {optionTime.map((item) => {
              const index = item.key;
              return (
                <div
                  onClick={() => setActiveItem(index)}
                  key={item.key}
                  className={`h-[30px] ${index === itemActice
                    ? "bg-[#c5e5ff] text-[#001d35]"
                    : "text-[#444746]"
                    } hover:text-[#1f1f1f] hover:cursor-pointer font-medium text-sm flex items-center justify-center px-3 border-1 border-[#747775] ${index === 1 ? "rounded-l-[8px]" : ""
                    }`}
                >
                  {index === itemActice ? (
                    <CheckIcon className="!text-[18px] font-extrabold mr-2" />
                  ) : (
                    ""
                  )}
                  {item.time}
                </div>
              );
            })}
            <div className="h-[30px] text-sm font-medium flex items-center justify-center px-3 border-1 border-[#747775] rounded-r-[8px]">
              <span className="pr-1">Thêm </span>
              <span>
                <ArrowDropDownIcon fontSize="small" />
              </span>
            </div>
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

      <div className="w-full max-h-[500px] overflow-y-auto pr-6 pb-16">
        <div className="flex flex-col gap-6">
          {/* truyền data + state quản lý cột xuống con */}
          <PerformanceChart
            chartData={chartData}
            summarys={summarys}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
          />

          <SearchQueriesTable tabData={tabData} visibleColumns={visibleColumns} />
        </div>
      </div>
    </div>
  );
}
