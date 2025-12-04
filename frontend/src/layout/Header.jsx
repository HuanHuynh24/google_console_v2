"use client";
import MenuIcon from "@mui/icons-material/Menu";
import AppsIcon from "@mui/icons-material/Apps";
import SearchIcon from "@mui/icons-material/Search";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import Image from "next/image";
import logo from "@/images/logo_search_console.svg";
import avatar from "@/images/avatar.jpg";
import { useState } from "react";

export default function Header() {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <section className="w-full h-16 flex justify-between p-2">
      <div className="flex items-center pr-[30px] ">
        <span className="h-[48px] flex items-center p-3 mx-1">
          <MenuIcon color="inherit" className="w-6 h-6" />
        </span>
        <div className="flex items-center">
          <Image alt="" src={logo} priority />
        </div>
      </div>
      <div className="h-full flex items-center justify-around grow-1 shrink-1 basis-auto ">
        <div className="w-full h-full flex items-center pl-[10px] pr-[30px]">
          <div
            onClick={() => {
              setInputFocus(true);
            }}
            onBlur={() => setInputFocus(false)}
            className={`max-w-[720px] w-full flex items-center ${
              inputFocus ? "bg-white shadow-sm" : "bg-[#e2ecfc]"
            } pl-[5px] 4 rounded-3xl  transition-all duration-100 ease-in-out`}
          >
            <span className="p-2 m-[3px] hover:cursor-pointer hover:bg-[rgba(60,64,67,.08)] rounded-full">
              <SearchIcon className="w-full h-full" />
            </span>
            <input
              className="w-full outline-0 placeholder:text-[#757575]"
              placeholder={`Kiểm tra mọi URL trong "https://noithatmocnguyencuong.com/"`}
            ></input>
          </div>
        </div>

        <div className="flex items-center">
          <span className="h-[48px] w-[48px] flex items-center justify-center">
            <HelpOutlineIcon className="w-6 h-6" />
          </span>
          <span className="h-[48px] w-[48px] flex items-center justify-center">
            <ManageAccountsOutlinedIcon className="w-6 h-6" />
          </span>
          <span className="h-[48px] w-[48px] flex items-center justify-center">
            <NotificationsOutlinedIcon className="w-6 h-6" />
          </span>
        </div>
      </div>
      <div className=" flex items-center justify-end pl-[30px]">
        <span className="h-[48px] w-[48px] flex items-center justify-center">
          <AppsIcon className="w-6 h-6" />
        </span>
        <span className="h-[48px] w-[48px] flex items-center justify-center">
          <Image
            alt=""
            src={avatar}
            priority
            className="w-8 h-8 rounded-full"
          />
        </span>
      </div>
    </section>
  );
}
