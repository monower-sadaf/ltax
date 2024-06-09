import { public_image_path } from "@/halpers/helper";

export default function CitizenFooter() {
  return (
    <>
      <footer className="bg-white">
        <div className="container mx-auto px-2 flex flex-col lg:flex-row items-center justify-between">
          <div className="flex items-center justify-center space-x-1">
            <div className="w-[0.8125em]">
              <img
                  loading="lazy"
                  src={public_image_path("favicon.png")}
                  alt="ভূমি উন্নয়ন কর"
              />
              
            </div>
            <p className="text-[10px] leading-[10.11px] lg:text-12 lg:leading-[12.14px]">ভূমি ব্যবস্থাপনা অটোমেশন, গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <p className="text-[10px] leading-[10.11px] lg:text-12 lg:leading-[12.14px] lg:pt-2">কারিগরি সহায়তায়</p>
            <div className="w-[6.375em]">
              <img
                  loading="lazy"
                  src={public_image_path("My-Soft-Heaven-LOGO-03.png")}
                  alt="ভূমি উন্নয়ন কর"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
