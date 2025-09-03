import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CheckIcon from "@mui/icons-material/Check";
export default function OverView() {
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
      <div className="h-full mr-6 py-4">
        <div>
          <div className="flex">
            {/* <div className="h-[30px] text-sm flex items-center justify-center px-3 border-1 border-[#747775] rounded-l-md">
              24 giờ
            </div>
            <div className="h-[30px] text-sm flex items-center justify-center px-3 border-1 border-[#747775]">
              7 ngày
            </div>
            <div className="h-[30px] text-sm flex items-center justify-center px-3 border-1 border-[#747775]">
              28 ngày
            </div>
            <div className="h-[30px] text-sm flex items-center justify-center px-3 border-1 border-[#747775]">
              3 tháng
            </div> */}
            {optionTime.map((index, item) => {
              return (
                <div className={`h-[30px] text-sm flex items-center justify-center px-3 border-1 border-[#747775]`}>
                  28 ngày
                </div>
              );
            })}
            <div className="h-[30px] text-sm flex items-center justify-center px-3 border-1 border-[#747775] rounded-r-md">
              <span className="pr-1">Thêm </span>
              <span>
                <ArrowDropDownIcon fontSize="small" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
