export const revalidate = 3600;


import { Sliders } from "@/app/_api/api";
import HeroSlider from "@/app/_components/_slider/HeroSlider";

const HeroSection = async () => {
  const sliders = await Sliders().catch((err) => console.log(err));
  return (
    <div className="relative w-full">
      <HeroSlider sliderlist={sliders} className="relative overflow-hidden" />
      <div className="absolute z-30 px-5 lg:px-16 right-0 top-[3.375em] lg:top-0 w-full h-[95%] lg:flex pt-4 lg:pt-0 lg:items-center justify-center lg:justify-start">
        <div className="flex flex-col items-center lg:items-start space-y-2 lg:space-y-6 lg:w-[50%]">
          <h3 className="text-20 lg:text-[36px] text-center lg:text-left leading-6 lg:leading-[3rem] text-green1">
            ডিজিটাল ভূমিসেবায় <br /> অনলাইন ভূমি উন্নয়ন কর প্রদান করতে
          </h3>
          <a
            href={`${process.env.SSO_URL}/register`}
            className="bg-primary text-white px-3 lg:px-5 py-1 rounded-md text-16 lg:text-20"
          >
            নিবন্ধন করুন
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
