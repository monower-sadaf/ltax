import ComplainList from "../_content/ComplainList";

export default function Home() {
  return (
    <>
      <div className="bg-white p-4 w-full rounded-lg">
        <div className="py-[14px] w-full">
            <h2 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">আপত্তি ও অভিযোগ সমূহ</h2>
            <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] text-[#777777]">ভূমি উন্নয়ন কর সংক্রান্ত আপত্তি ও অভিযোগ দাখিল</p>
        </div>
        <div className="overflow-x-auto">
          <ComplainList/>
        </div>
      </div>
    </>
  );
}
