import { useState } from "react";
import SummaryCards from "./SummaryCards";
import style from "@/components/style.module.css";

export default function PerformanceChart() {
  const [listActive, setListActive] = useState([0, 1]);
  const summarys = [
    {
      key: 1,
      title: "Tổng số lượt nhấp",
      number: 15,
    },
    {
      key: 2,
      title: "Tổng số lượt hiể...",
      number: 15,
    },
    {
      key: 3,
      title: "CTR trung bình",
      number: 15,
    },
    {
      key: 4,
      title: "Vị trí trung bình",
      number: 15,
    },
  ];
  const handleClick = (value) => {
    setListActive((prev) => {
      if (prev.includes(value)) {
        if (prev.length === 1) {
          return prev;
        }
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };
  return (
    <div className="pr-12 mt-2">
      <div
        className={`${style.summarys} w-full flex min-h-[300px] bg-white overflow-hidden rounded-[12px] `}
      >
        {summarys.map((item) => {
          return (
            <SummaryCards
              key={item.key}
              active={listActive.includes(item.key)}
              title={item.title}
              number={item.number}
              onClick={() => handleClick(item.key)}
            />
          );
        })}
      </div>
    </div>
  );
}
