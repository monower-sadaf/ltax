'use client'

import { en2bn } from "@/halpers/helper";
import { useState } from "react";

const Loader = () => {
  return (
    <div className="flex space-x-1 p-4  m-0 m-auto table rounded-md w-[200px]">
      <div className="relative flex items-center h-3 w-3 m-0 m-auto">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#12633D] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-full w-full bg-[#12633D]"></span>
      </div>
      <div className="h-[30px] text-[#12633D]">
        <span className="text-center m-0 m-auto table p-2">লোড হচ্ছে</span>
      </div>
    </div>
  )
}

const Details = ({ data, id, owner_attachment, warish }) => {

  const [loader, setLoader] = useState(false);

  const hideLoader = () => {
    setLoader(true);
  }

  return (
    <>
      <div className="">
        <div className="flex w-full justify-between my-2">
          <h1 className="text-center w-full text-[#000]-700">
            খতিয়ানের বিস্তারিত
          </h1>
        </div>
        <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div className="">
            <h2>
              <span className="text-green-700">মৌজা : </span>{data?.moujas?.name_bd} - {en2bn(data?.moujas?.jl_no)}
            </h2>
            <h2>
              <span className="text-green-700">খতিয়ান নং : </span>{en2bn(id)}
            </h2>
          </div>
          <div className="border-2 p-4">
            <div className="my-3 space-y-divider">

              {owner_attachment == null ? (
                <h3 className="w-full py-4 text-20 text-red-400 text-center">সংযুক্তি নেই</h3>
              ) : (
                <div className="overflow-y-auto ">
                  <h2 className="mb-4">
                    <span className="text-green-700">সংযুক্তি :</span>
                  </h2>
                  {loader == false && <Loader />}
                  <embed
                    className="min-w-[600px] min-h-[500px]"
                    src={`${process.env.BASE_URL_V1_BASE}/storage/${owner_attachment}`}
                    width="100%"
                    height="auto"
                    onLoad={() => hideLoader()}
                  />
                </div>

              )}
            </div>
            <div className="my-3 space-y-divider">
              {warish?.length > 0 &&
                warish.map((item, index) => {
                  return (
                    <>
                      <hr />
                      <div key={index} className="p-4">

                        {item?.attachment == null || item?.attachment == '' ? <h3 className="w-full py-4 text-20 text-red-400 text-center">সংযুক্তি নেই</h3> : (
                          <div className="overflow-y-auto ">
                            <h2 className="mb-4"><span className="text-green-700">ওয়ারিশের সংযুক্তি :</span></h2>
                            <embed
                              className="min-w-[600px] min-h-[500px]"
                              src={`${process.env.BASE_URL_V1_BASE}/storage/${item?.attachment}`}
                              width="100%"
                              height="auto"
                              onLoad={() => hideLoader()}
                            />
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
        <hr />
      </div>
    </>
  );
};

export default Details;
