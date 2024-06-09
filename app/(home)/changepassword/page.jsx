"use client";
import dynamic from "next/dynamic";
// const BaseComponent = dynamic(() => import("@/app/_components/BaseComponent"), {
//   ssr: false,
// });
const LeftSideBar = dynamic(() => import("@/app/_components/LeftSideBar"), {
  ssr: false,
});
const ChangePassword = dynamic(
  () => import("@/app/citizen/_content/ChangePassword"),
  { ssr: false }
);

export default function Home() {
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
            <div className="bg-[url('../public/assets/images/login_bg-img.webp')] bg-cover lg:w-[70%] flex justify-center items-center">
                <ChangePassword />
            </div>
            <div className="lg:w-[30%]">
                <LeftSideBar />
            </div>
          </div>
        </div>
      {/* </BaseComponent> */}
    </>
  );
}
