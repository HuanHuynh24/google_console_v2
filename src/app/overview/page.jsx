import GscLikeChart from "@/components/Chart";
import IndexChart from "@/components/IndexChart";
import ExperienceCard from "@/components/ExperienceCard";
import AdvancedFeaturesTable from "@/components/AdvancedFeaturesTable";
import { ChevronRight, Info, Lightbulb, ThumbsUp, ThumbsDown, ArrowUpRight, ArrowUp } from "lucide-react";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AnnouncementOutlinedIcon from '@mui/icons-material/AnnouncementOutlined';

export default function OverView() {
  return (
    <div className="w-full h-[calc(100vh-64px)] ml-[120px] overflow-y-auto">
      {/* Header */}
      <div className="h-16 border-b border-[#c4c7c5] flex items-center px-6">
        <h2 className="text-[21px] font-medium">Tổng quan</h2>
      </div>

      {/* Banner trên cùng */}
      <div className="w-full max-w-[912px] ml-[101px] mt-6">
        <div className="bg-white rounded-xl px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-5 text-sm">
            <LightbulbOutlinedIcon className="text-[#f9ab00]" size={22} />
            <span className="text-[#202124]">
              Xem thông tin chi tiết về hiệu suất của trang web trên Tìm kiếm
            </span>
          </div>
          <button className="text-[#1a73e8] text-sm font-medium flex items-center gap-1 whitespace-nowrap hover:underline">
            Khám phá thông tin chi tiết dành cho bạn <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Card biểu đồ */}
      <div className="w-full max-w-[912px] ml-[101px] mt-6">
        <div className="bg-white rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-2xl py-2">Hiệu suất</h3>
            <button className="text-[#1a73e8] text-sm font-medium flex items-center gap-1 hover:underline">
              Báo cáo đầy đủ <ChevronRight size={22} />
            </button>
          </div>

          {/* Fake legend giống GSC */}
          <div className="flex items-center gap-2 py-3 text-sm text-[#202124]">
            <span className="w-3 h-[4px] bg-[#4285F4] inline-block rounded"></span>
            <span>Tổng 192 lần nhấp vào kết quả tìm kiếm trên web</span>
          </div>

          <div className="h-auto">
            <GscLikeChart />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[912px] ml-[101px] mt-6">
        <div className="bg-[#e8edf6] rounded-xl p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl text-black">Đề xuất</h3>
              <HelpOutlineIcon className="text-gray-700" fontSize="small" />
            </div>
            <button className="flex items-center gap-2 text-[#1a73e8] text-sm font-medium hover:underline">
              <AnnouncementOutlinedIcon sx={{ fontSize: 18 }} />
              Gửi phản hồi
            </button>
          </div>

          {/* Suggestion content */}
          <div className="bg-white border border-[#dadce0] rounded-xl p-4 max-w-[430px] w-full mb-2">
            <div className="flex gap-2">

              <div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-[#fde293] p-2 m-1 rounded-full">
                    <LightbulbOutlinedIcon className="text-[#a06000]" size={20} />
                  </div>
                  <p className="text-s text-black">
                    <span >
                      Một trang gần đây nhận được nhiều lượt hiển thị hơn bình thường
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-700 p-2 mt-1">
                    Kiểm tra hiệu suất của trang này để tìm hiểu thêm
                  </p>
                </div>

                {/* Keyword box */}
                <div className="bg-blue-50 rounded-lg px-4 py-3 mt-1 flex items-start justify-between">
                  <span className="text-xs text-gray-700 break-words">
                    https://webtop.vn/thiet-ke-website-chuyen-nghiep-tai-nghe-an/
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowUp size={20} className="text-green-800" />
                    <span className="text-xs text-gray-800">326%</span>
                  </span>
                </div>

                {/* Footer actions */}
                <div className="flex items-center justify-between mt-3">
                  {/* Button lệch trái */}
                  <button className="text-[#1a73e8] text-sm font-medium hover:underline">
                    Kiểm tra hiệu suất trang
                  </button>

                  {/* 2 icon lệch phải */}
                  <div className="flex items-center gap-4 py-2">
                    <ThumbsUp size={17} className="text-brown-900 cursor-pointer" />
                    <ThumbsDown size={17} className="text-brown-900 cursor-pointer" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Card lập chỉ mục */}
      <div className="w-full max-w-[912px] ml-[101px] mt-6">
        <div className="bg-white rounded-xl p-4">
          {/* Header */}
          <div className="mb-4">
            {/* Title */}
            <h3 className="text-2xl mb-6">Lập chỉ mục</h3>

            {/* Sub row: icon + text + button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <FileCopyOutlinedIcon fontSize="small" className="text-gray-500" />
                <span className="text-sm text-gray-700">Trang</span>
              </div>

              <button className="text-[#1a73e8] text-sm font-medium flex items-center gap-1 hover:underline">
                Báo cáo đầy đủ <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-10 mb-2 text-sm text-[#202124]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-[4px] bg-gray-400 inline-block rounded"></span>
              <span>158 trang chưa được lập chỉ mục</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-[4px] bg-green-700 inline-block rounded"></span>
              <span>213 trang được lập chỉ mục</span>
            </div>
          </div>

          {/* Chart */}
          <div className="h-auto">
            <IndexChart />
          </div>

          {/* Sub-card Video */}
          <div className="mt-4 py-5 flex items-center">
            {/* Left: icon + title */}
            <div className="flex items-center gap-4">
              <VideoLibraryOutlinedIcon fontSize="small" className="text-gray-500" />
              <span className="text-sm text-gray-700">Video</span>
            </div>

            {/* Center: status text */}
            <div className="flex-1 text-center text-sm text-[#202124]">
              1 chưa có video nào được lập chỉ mục
            </div>

            {/* Right: indexed text + two small bars + chevron */}
            <div className="flex items-center gap-3 min-w-[220px] justify-end">
              <span className="text-sm text-[#202124]">Đã lập chỉ mục 0 video</span>

              {/* two thin bars (gray above, green below) */}
              <div className="flex flex-col gap-1 items-end">
                <span aria-hidden className="block w-16 h-[2px] bg-gray-300 rounded"></span>
                <span aria-hidden className="block w-16 h-[2px] bg-green-700 rounded"></span>
              </div>

              <ChevronRight size={20} className="text-blue-600" />
            </div>
          </div>

        </div>
      </div>
      {/* Card trải nghiệm */}
      <div className="w-full max-w-[912px] ml-[101px] mt-6">
        <ExperienceCard />
      </div>

      <div className="w-full max-w-[912px] ml-[101px] mt-6 mb-16">
        <AdvancedFeaturesTable />
      </div>

    </div>
  );
}
