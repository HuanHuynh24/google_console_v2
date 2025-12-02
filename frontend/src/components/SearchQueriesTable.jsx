"use client";
import { useState } from "react";
import FilterListIcon from "@mui/icons-material/FilterList";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { Select, MenuItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

/* -----------------------------
   Tabs & headers
----------------------------- */
const tabs = [
  "CỤM TỪ TÌM KIẾM",
  "TRANG",
  "QUỐC GIA",
  "THIẾT BỊ",
  "HÌNH THỨC XUẤT HIỆN TRONG KẾT QUẢ TÌM KIẾM",
  "NGÀY",
];

const tableHeaders = {
  0: { main: "Cụm từ tìm kiếm", key: "query" },
  1: { main: "Trang hàng đầu", key: "url" },
  2: { main: "Quốc gia", key: "country" },
  3: { main: "Thiết bị", key: "device" },
  4: { main: "Hình thức xuất hiện", key: "appearance" },
  5: { main: "Ngày", key: "date" },
};

/* -----------------------------
   Component chính
----------------------------- */
export default function SearchQueriesTable({
  tabData: propTabData,
  visibleColumns: propVisibleColumns,
  activeTab,
  setActiveTab,
}) {
  /* ------- STATE ------- */
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Nếu không có prop từ parent, dùng fallback
  const fallbackData = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
  };

  const tabData = propTabData ?? fallbackData;

  // State lưu data đã sort theo từng tab
  const [sortedData, setSortedData] = useState({}); // { tabIndex: sortedArray[] }

  /* Chọn nguồn data: ưu tiên sortedData */
  const baseData = tabData[activeTab] || [];
  const currentData = sortedData[activeTab] || baseData;

  /* Pagination */
  const totalPages = Math.ceil(currentData.length / perPage) || 1;
  const paginatedData = currentData.slice((page - 1) * perPage, page * perPage);
  const start = (page - 1) * perPage + 1;
  const end = Math.min(page * perPage, currentData.length);

  /* Visible columns */
  const visibleColumns =
    propVisibleColumns ?? ["clicks", "impressions", "ctr", "position"];

  /* ------- SORTING ------- */
  const handleSort = (column) => {
    let direction = "asc";
    if (sortColumn === column && sortDirection === "asc") direction = "desc";

    setSortColumn(column);
    setSortDirection(direction);
    setPage(1);

    const raw = [...baseData]; // luôn sort từ data gốc

    const sorted = raw.sort((a, b) => {
      const av = a[column];
      const bv = b[column];

      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;

      // number sort
      if (typeof av === "number" && typeof bv === "number") {
        return direction === "asc" ? av - bv : bv - av;
      }

      // string sort
      const comp = String(av).localeCompare(String(bv));
      return direction === "asc" ? comp : -comp;
    });

    // Lưu sort theo tab
    setSortedData((prev) => ({
      ...prev,
      [activeTab]: sorted,
    }));
  };

  const renderSortIcon = (column) => {
  const isActive = sortColumn === column;
  const isAsc = sortDirection === "asc";

  const rotationClass = isActive
    ? isAsc
      ? "rotate-0"
      : "rotate-180"
    : "rotate-0";

  const className =
    "ml-1 transform transition-all duration-200 " +
    (isActive
      ? "opacity-100 text-black "
      : "opacity-0 group-hover:opacity-80 text-gray-400 ") +
    rotationClass;

  return <ArrowUpwardIcon fontSize="14px" className={className} />;
};



  /* ------- Pagination handlers ------- */
  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  /* -----------------------------
     RENDER COMPONENT
  ----------------------------- */
  return (
    <div className="w-full bg-white rounded-xl shadow overflow-hidden">
      {/* Tabs */}
      <div className="flex justify-center border-b gap-10 border-gray-200">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => {
              setActiveTab(idx);
              setPage(1); // reset page khi đổi tab
            }}
            className={`px-4 py-6 text-sm font-medium ${
              activeTab === idx
                ? "border-b-2 border-gray-600 text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter */}
      <div className="flex justify-end items-center px-5 py-3 border-b text-sm text-gray-600 border-gray-200">
        <button className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100">
          <FilterListIcon fontSize="small" className="text-gray-500" />
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-fixed text-sm text-left text-gray-700 border-t border-gray-200">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            {/* MAIN COLUMN */}
            <th
              onClick={() => handleSort(tableHeaders[activeTab].key)}
              className="px-6 py-3 text-left font-medium cursor-pointer w-full"
            >
              <div className="flex items-center gap-1 group hover:text-black">
                <span
                  className={
                    sortColumn === tableHeaders[activeTab].key
                      ? "text-black"
                      : ""
                  }
                >
                  {tableHeaders[activeTab].main}
                </span>
                {renderSortIcon(tableHeaders[activeTab].key)}
              </div>
            </th>

            {/* CLICK */}
            {visibleColumns.includes("clicks") && (
              <th
                onClick={() => handleSort("clicks")}
                className="px-7 py-3 text-right font-medium cursor-pointer w-40"
              >
                <div className="flex items-center justify-end gap-1 group hover:text-black">
                  {renderSortIcon("clicks")}
                  <span
                    className={sortColumn === "clicks" ? "text-black" : ""}
                  >
                    Lượt nhấp
                  </span>
                </div>
              </th>
            )}

            {/* IMPRESSIONS */}
            {visibleColumns.includes("impressions") && (
              <th
                onClick={() => handleSort("impressions")}
                className="px-7 py-3 text-right font-medium cursor-pointer w-45"
              >
                <div className="flex items-center justify-end gap-1 group hover:text-black">
                  {renderSortIcon("impressions")}
                  <span
                    className={
                      sortColumn === "impressions" ? "text-black" : ""
                    }
                  >
                    Lượt hiển thị
                  </span>
                </div>
              </th>
            )}

            {/* CTR */}
            {visibleColumns.includes("ctr") && (
              <th
                onClick={() => handleSort("ctr")}
                className="px-7 py-3 text-right font-medium cursor-pointer w-30"
              >
                <div className="flex items-center justify-end gap-1 group hover:text-black">
                  {renderSortIcon("ctr")}
                  <span className={sortColumn === "ctr" ? "text-black" : ""}>
                    CTR
                  </span>
                </div>
              </th>
            )}

            {/* POSITION */}
            {visibleColumns.includes("position") && (
              <th
                onClick={() => handleSort("position")}
                className="px-7 py-3 text-right font-medium cursor-pointer w-30"
              >
                <div className="flex items-center justify-end gap-1 group hover:text-black">
                  {renderSortIcon("position")}
                  <span
                    className={sortColumn === "position" ? "text-black" : ""}
                  >
                    Vị trí
                  </span>
                </div>
              </th>
            )}
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {paginatedData.map((item, idx) => {
            const mainKey = Object.keys(item).find(
              (key) =>
                !["clicks", "impressions", "ctr", "position"].includes(key)
            );

            return (
              <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-7 py-3 text-black w-full">
                  {item[mainKey]}
                </td>

                {visibleColumns.includes("clicks") && (
                  <td className="px-7 py-3 text-right text-blue-500 w-35">
                    {item.clicks}
                  </td>
                )}

                {visibleColumns.includes("impressions") && (
                  <td className="px-7 py-3 text-right text-purple-600 w-40">
                    {item.impressions}
                  </td>
                )}

                {visibleColumns.includes("ctr") && (
                  <td className="px-7 py-3 text-right text-[#009688] w-35">
                    {typeof item.ctr === "number"
                      ? (item.ctr * 100).toFixed(1) + "%"
                      : item.ctr}
                  </td>
                )}

                {visibleColumns.includes("position") && (
                  <td className="px-7 py-3 text-right text-orange-600 w-35">
                    {typeof item.position === "number"
                      ? item.position.toFixed(1)
                      : item.position}
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end items-center px-3 py-4 border-t text-sm text-gray-600 border-gray-200">
        <div className="flex items-center gap-5 mr-8 text-sm text-gray-600">
          <span className="whitespace-nowrap">Số hàng mỗi trang:</span>

          <Select
            value={perPage}
            onChange={(e) => {
              setPerPage(e.target.value);
              setPage(1);
            }}
            size="small"
            variant="standard"
            IconComponent={ArrowDropDownIcon}
            sx={{
              fontSize: "0.875rem",
              color: "#4b5563",
              "& .MuiSelect-select": {
                paddingRight: "24px",
                paddingY: "2px",
              },
              "& .MuiSvgIcon-root": { fontSize: "1.6rem", color: "#9ca3af" },
              "&:before, &:after": { borderBottom: "none !important" },
            }}
          >
            {[5, 10, 25, 50, 100, 250, 500].map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </Select>
        </div>

        <span className="mr-7 gap-2">
          {start}–{end}/{currentData.length}
        </span>

        <div className="flex gap-6">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-40 transition-colors"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            disabled={page === totalPages}
            className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-40 transition-colors"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
