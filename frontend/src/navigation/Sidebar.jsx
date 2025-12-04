"use client";
import Image from "next/image";
import Link from "next/link"; // thêm import Link
import "simplebar-react/dist/simplebar.min.css";
import favicon from "@/images/faviconV3.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HomeIcon from "@mui/icons-material/Home";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FileCopyOutlinedIcon from "@mui/icons-material/FileCopyOutlined";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import SpeedIcon from "@mui/icons-material/Speed";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import LayersOutlinedIcon from "@mui/icons-material/LayersOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import InfoOutlineIcon from "@mui/icons-material/InfoOutline";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import FlagIcon from "@mui/icons-material/OutlinedFlag";
import SecurityIcon from "@mui/icons-material/Security";
import styles from "@/navigation/styles.module.css";
import { useState } from "react";
import dynamic from "next/dynamic";
const SimpleBar = dynamic(() => import("simplebar-react"), { ssr: false });

export default function SideBar() {
  const sidebarMenu = [
    {
      title: null,
      items: [
        { label: "Tổng quan", icon: HomeIcon, badge: null, url: "/overview" },
        {
          label: "Thông tin chi tiết",
          icon: LightbulbOutlinedIcon,
          badge: "Mới",
          url: "/details",
        },
        { label: "Hiệu suất", icon: TrendingUpOutlinedIcon, badge: null, url: "/performance" },
        { label: "Kiểm tra URL", icon: SearchOutlinedIcon, badge: null, url: "/url-inspection" },
      ],
    },
    {
      title: "Lập chỉ mục",
      items: [
        { label: "Trang", icon: FileCopyOutlinedIcon, badge: null, url: "/pages" },
        { label: "Video", icon: VideoLibraryOutlinedIcon, badge: null, url: "/videos" },
        { label: "Sơ đồ trang web", icon: AccountTreeOutlinedIcon, badge: null, url: "/sitemaps" },
        { label: "Xóa URL", icon: VisibilityOffIcon, badge: null, url: "/removals" },
      ],
    },
    {
      title: "Trải nghiệm",
      items: [
        { label: "Chỉ số quan trọng chính …", icon: SpeedIcon, badge: null, url: "/core-web-vitals" },
        { label: "HTTPS", icon: LockOutlinedIcon, badge: null, url: "/https" },
      ],
    },
    {
      title: "Mua sắm",
      items: [
        { label: "Cơ hội của người bán", icon: LocalOfferOutlinedIcon, badge: null, url: "/merchant" },
      ],
    },
    {
      title: "Các tính năng nâng cao",
      items: [
        { label: "Đường dẫn", icon: LayersOutlinedIcon, badge: null, url: "/breadcrumbs" },
        { label: "Câu hỏi thường gặp", icon: LayersOutlinedIcon, badge: null, url: "/faq" },
      ],
    },
    {
      title: "Bảo mật và hình phạt thủ công",
      items: [
        { label: "Hình phạt thủ công", icon: FlagIcon, badge: null, url: "/manual-actions" },
        { label: "Vấn đề bảo mật", icon: SecurityIcon, badge: null, url: "/security-issues" },
      ],
    },
    {
      title: null,
      items: [
        { label: "Liên kết", icon: LocalOfferOutlinedIcon, badge: null, url: "/links" },
        { label: "Thành tích", icon: OpenInNewOutlinedIcon, badge: null, url: "/achievements" },
        { label: "Cài đặt", icon: SettingsOutlinedIcon, badge: null, url: "/settings" },
      ],
    },
    {
      title: null,
      items: [
        { label: "Gửi ý kiến phản hồi", icon: AnnouncementIcon, badge: null, url: "/feedback" },
        { label: "Giới thiệu về Search Con...", icon: InfoOutlineIcon, badge: null, url: "/about" },
      ],
    },
  ];

  const [url, setUrl] = useState("https://noithatmocnguy...");
  const initialOpen = sidebarMenu.reduce((acc, section) => {
    if (section.title) acc[section.title] = true;
    return acc;
  }, {});
  const [openSections, setOpenSections] = useState(initialOpen);
  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };
  const [activeItem, setActiveItem] = useState("Tổng quan");

  return (
    <aside className="flex flex-col  w-[280px]">
      {/* Thanh trên cùng */}
      <div className="p-3 pl-2 pr-0 w-[264px]">
        <div className="w-full h-10 flex items-center justify-between rounded-3xl border border-[#c7c7c7] bg-transparent px-4">
          <div className="p-[3px] bg-white ">
            <Image className="h-4 w-4" alt="" src={favicon} priority />
          </div>
          <div className="flex-1 ml-3 mr-2">
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="bg-transparent outline-none w-full text-sm font-medium text-[#1f1f1f]"
              placeholder="Nhập URL..."
            />
          </div>
          <ArrowDropDownIcon fontSize="small" />
        </div>
      </div>

      {/* Nội dung cuộn */}
      <div className="flex-1 mt-1 w-[280px]">
        <SimpleBar style={{ maxHeight: "calc(100vh - 64px)"}} className="pr-3">
          {sidebarMenu.map((section, sIndex) => (
            <div key={sIndex} className="w-[264px] mb-2 relative 
                after:content-[''] after:block after:h-[1px] after:w-[215px] 
                after:bg-[#e3e3e3] after:mt-2 after:mx-auto">
              {section.title && (
                <div
                  className="flex items-center px-4 py-2 text-sm font-medium cursor-pointer whitespace-nowrap"
                  onClick={() => toggleSection(section.title)}
                >
                  <ArrowDropDownIcon
                    className={`transition-transform duration-200 mr-1 ${
                      openSections[section.title] ? "rotate-180" : ""
                    }`}
                    fontSize="small"
                  />
                  {section.title}
                </div>
              )}
              {(section.title === null || openSections[section.title]) && (
                <div>
                  {section.items.map((item, iIndex) => {
                    const isActive = activeItem === item.label;
                    return (
                      <Link key={iIndex} href={item.url} passHref>
                        <div
                          onClick={() => setActiveItem(item.label)}
                          className={`${styles.itemSubMenu} ${
                            isActive ? "bg-[#c2e7ff] text-[#1f1f1f] hover:!bg-[#b8d5ed]" : ""
                          } w-full flex items-center px-6 py-[10px] rounded-lg mr-3 cursor-pointer whitespace-nowrap`}
                        >
                          <item.icon className="mr-3" fontSize="small" />
                          <span className="text-sm font-medium mr-2">{item.label}</span>
                          {item.badge && (
                            <span className="text-xs text-white bg-blue-500 rounded px-1">
                              {item.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </SimpleBar>
      </div>
    </aside>
  );
}
