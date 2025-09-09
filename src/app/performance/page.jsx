"use client";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import PerformanceChart from "@/components/PerformanceChart";
export default function OverView() {
  const [itemActice, setActiveItem] = useState(3);
  const optionTime = [
    {
      key: 1,
      time: "24 giờ",
    },
    {
      key: 2,
      time: "7 ngày",
    },
    {
      key: 3,
      time: "28 ngày",
    },
    {
      key: 4,
      time: "3 tháng",
    },
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
      <PerformanceChart />
    </div>
  );
}
