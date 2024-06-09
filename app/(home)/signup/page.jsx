"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { relative_image_path } from "@/halpers/helper";
import { useState } from "react";
// import BaseComponent from "../_components/BaseComponent";

const LeftSideBar = dynamic(() => import("@/app/_components/LeftSideBar"), {
  ssr: false,
  loading: () => {
    return (
      <>
        <div className="w-full flex flex-wrap justify-between items-center">
          <div className="h-10 lg:h-16 bg-gray-200 w-[45%] lg:w-full m-2"></div>
          <div className="h-10 lg:h-16 bg-gray-200 w-[45%] lg:w-full m-2"></div>
          <div className="h-10 lg:h-16 bg-gray-200 w-[45%] lg:w-full m-2"></div>
          <div className="h-10 lg:h-16 bg-gray-200 w-[45%] lg:w-full m-2"></div>
          <div className="h-10 lg:h-16 bg-gray-200 w-[45%] lg:w-full m-2"></div>
        </div>
      </>
    );
  },
});
const Signup = dynamic(() => import("@/app/_components/Signup"), {
  loading: () => <ImagePlaceholder />,
});
import ImagePlaceholder from "../../_components/_skeleton/ImagePlaceholder";



export default function Home() {
  const [userType, setUserType] = useState("citizen");
  return (
    <>
      {/* <BaseComponent> */}
        <div className="px-5 lg:px-16 py-6 lg:py-5">
          <div className="flex justify-center items-center pb-3 lg:pb-2">
            <div className="inline-flex items-center justify-center w-full lg:w-[50%]">
              <hr className="w-full h-px my-8 bg-primary border-0" />
              <span className="absolute px-1 lg:px-3 text-primary text-center -translate-x-1/2 bg-white left-1/2 text-20 lg:text-28">
                ভূমি উন্নয়ন কর ব্যবস্থাপনা সিস্টেম
              </span>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row-reverse">
            <div className="bg-[url('../public/assets/images/login_bg-img.webp')] bg-cover lg:w-[70%] flex flex-col justify-center items-center">
              <div className="w-full lg:w-[60%] border border-primary">
                <div className="text-center">
                  <h3 className="text-32 text-white bg-primary rounded-sm">
                    সিস্টেমে নিবন্ধন করুন
                  </h3>
                  <div className="flex">
                    <button
                      onClick={() => setUserType("citizen")}
                      className={`w-1/2 text-[16px] leading-[19px] py-[11px] ${
                        userType == "citizen"
                          ? "bg-[#E4FFEF] border-r border-b border-primary rounded-br-md"
                          : ""
                      }`}
                    >
                      নাগরিক
                    </button>
                    <button
                      onClick={() => setUserType("organization")}
                      className={`w-1/2 text-[16px] leading-[19px] py-[11px] ${
                        userType == "organization"
                          ? "bg-[#E4FFEF] border-l border-b border-primary rounded-bl-md"
                          : ""
                      }`}
                    >
                      সংস্থা
                    </button>
                  </div>
                </div>
                <div className="w-full  flex justify-center items-center">
                  {userType == "citizen" ? <Signup /> : ''}
                </div>
              </div>
            </div>
            <div className="lg:w-[30%]">
              <LeftSideBar />
            </div>
          </div>
        </div>
        <Image
          className="w-full hidden lg:block"
          src={relative_image_path("footer_image.webp")}
          width={1000}
          height={1000}
          alt="image error"
        />
      {/* </BaseComponent> */}
    </>
  );
}
