"use client";

import Dashboard from "./_content/Dashboard";
// import NidVerifyform from "../../_components/FormControl/NidVerifyform";
import Nirdesika from "./_components/Nirdesika";
import { lazy, Suspense, useEffect, useState } from "react";
import { parseCookies } from "nookies";
const ProfileDataVerify = lazy(() => import("./_components/Profiledataverify"));
const Nirdeshikajachai = lazy(() =>
  import("../(organization)/organization/_components/Nirdeshikajachai")
);

const Home = () => {

  const cookies = parseCookies();
  const citizen = JSON.parse(cookies?.citizen);

  return (
    <>
      {citizen?.nid != null ? (
        <Dashboard data={citizen} />
      ) : (
        <>          <section className="w-full flex flex-col space-y-[11px]">
            <div className="bg-white rounded-lg p-4 w-full">
              <p className="text-20 leading-[20.23px] pb-[15px]">
                ডিজিটাল ভূমি উন্নয়ন কর সেবায়,
              </p>
              <h3 className="text-40 leading-[40.46px] text-primary">
                আপনাকে স্বাগতম !
              </h3>
            </div>
            
            <div className="flex flex-col lg:flex-row space-y-[11px] lg:space-y-0 lg:space-x-[11px]">
              <div className="bg-white rounded-lg p-4 lg:w-[70%] lg:h-[63vh]">
                <h3 className="text-20 leading-[28.23px] lg:leading-[20.23px] text-primary pb-[17px]">
                  ভূমি উন্নয়ন কর প্রোফাইল সম্পন্ন করতে ই-মেইল আইডি যাচাই করুন।
                </h3>
                <div className="w-full flex justify-center items-center">
                  <div className="border border-secondary rounded-lg w-[80%] lg:w-[50%]">
                    <Suspense fallback={<p>Loading...</p>}>
                      <ProfileDataVerify data={citizen} />
                    </Suspense>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 lg:w-[30%]">
                <Suspense fallback={<p>Loading...</p>}>
                  <Nirdeshikajachai
                    title={"ভূমি উন্নয়ন কর প্রোফাইল"}
                    heading={"নির্দেশিকা"}
                    link={"citizen/manual"}
                  />
                </Suspense>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default Home;