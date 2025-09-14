import CheckIcon from "@mui/icons-material/Check";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function SummaryCards({ index, active, title, number, color, onClick }) {
  const isFourth = index === 3;

  return (
    <div
      onClick={onClick}
      className={`${active ? "border-none" : "border-[#e8e8e8] opacity-50"
        } relative w-[180px] h-[110px] p-[23px] py-6 cursor-pointer border-b border-r`}
      style={{
        background: active ? color : "#f9f9f9",
        color: active
          ? isFourth
            ? "black" // card thứ 4 active thì chữ đen
            : "white" // các card khác active thì chữ trắng
          : "#373838ff", // khi không active thì chữ xám
      }}
    >
      {/* Header */}
      <div className="w-full flex items-center">
        <span
          className={`w-[12px] h-[12px] rounded-[2px] flex justify-center items-center border
          ${active
              ? isFourth
                ? "border-black" // card thứ 4 active thì border đen
                : "border-white" // các card khác active thì border trắng
              : "border-gray-600" // khi không active thì border xám
            }`}
        >
          {active && (
            <CheckIcon
              className="!text-[12px] font-bold"
              sx={{ strokeWidth: 10 }}
            />
          )}
        </span>

        <span className="text-sm pl-2 leading-[16px]">{title}</span>
      </div>

      {/* Number */}
      <h3 className="text-[32px] font-semibold">{number}</h3>

      {/* Help icon */}
      <span className="absolute right-2 bottom-2 text-gray-300">
        <HelpOutlineIcon fontSize="small" />
      </span>

    </div>
  );
}
