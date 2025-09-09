import CheckIcon from "@mui/icons-material/Check";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

export default function SummaryCards({ key, active, title, number, onClick }) {
  return (
    <div
    onClick={onClick}
      key={key}
      className={`${
        active ? "active border-none" : "border-[#e8e8e8]"
      } relative w-[180px] h-[110px] p-[23px] py-6 text-white cursor-pointer border-b border-r`}
    >
      <div className="w-full flex items-center">
        <span className="w-[11px] h-[11px] rounded-[2px] flex justify-center items-center border-1 bg-transparent">
          {active && (
            <CheckIcon
              className="!text-[11px] font-bold"
              sx={{ strokeWidth: 10 }}
            />
          )}
        </span>
        <span className="text-sm pl-2 leading-[16px]">{title}</span>
      </div>
      <h3 className="text-[32px] ">{number}</h3>
      <span className="absolute">
        <HelpOutlineIcon/>
      </span>
    </div>
  );
}
