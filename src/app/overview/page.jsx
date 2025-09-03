import GscLikeChart from "@/components/Chart";

export default function OverView() {
  return (
    <div className="w-full h-[calc(100vh-64px)]  ml-[120px]">
      <div className="h-16 border-b-1 border-[#c4c7c5] flex items-center">
        <h2 className="text-[21px] font-medium">Tổng quan</h2>{" "}
      </div>
      <div className="w-full h-full max-w-[912px] ml-[101px] ">
        <GscLikeChart/>

      </div>
    </div>
  );
}
