"use client";

import { Feedback } from "@/app/_api/api";
import { en2bn } from "@/halpers/helper";
import { useEffect, useState } from "react";
import axios from "axios";
import TablePlaceHolder from "@/app/_components/_skeleton/TablePlaceHolder";

export default function FeedBackList(req) {
  const [allData, setAllData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  const [showItemLength, setShowItemLength] = useState(10);
  const [startWith, setStartWith] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const complainId = req.data;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // get the CancelToken object from axios
    const CancelToken = axios.CancelToken;
    // create a cancel token instance
    const cancelTokenSource = CancelToken.source();

    setTimeout(() => {
      setIsLoading(true);
      Feedback(complainId, cancelTokenSource)
        .then((dataArray) => {
          setAllData(dataArray);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("Request canceled", err.message);
          } else {
            console.log(err);
          }
        });
    }, 5000);

    if (allData?.length > 0) {
      setShowItemLength(allData?.length);
      let tp = parseFloat(allData?.length) / parseInt(showItemLength);
      setTotalPages(Math.ceil(tp));
    }

    return () => {
      console.log("canceled", cancelTokenSource);
      cancelTokenSource.cancel("Operation canceled");
    };
  }, []);

  return (
    <>
      <div className="bg-white rounded-lg w-full p-4">
        <div className="py-[20px]">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:px-[32px] pb-[11px] lg:pb-[16px]">
            <div className="flex flex-col items-center lg:items-start pb-3 lg:pb-0">
              <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
                প্রতিক্রিয়া সমূহ
              </h3>
              <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[12.14px] text-[#777777]">
                হোল্ডিং এর প্রতিক্রিয়া
              </p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr className="border border-primary-400 text-white bg-primary border-primary">
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200 lg:w-[7%]"
                  >
                    ক্রম
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200 lg:w-[40%]"
                  >
                    ইউজার
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200 "
                  >
                    প্রতিক্রিয়া
                  </th>
                  <th
                    scope="col"
                    className=" px-3 py-3 text-center border border-green-200 "
                  >
                    তারিখ
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading == false ? (
                  <>
                    <tr className="animate-pulse bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                      <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center  lg:w-[10%]">
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                      </td>
                      <td className="px-3 md:px-8 py-1 md:py-4 text-center border  lg:w-[20%]">
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                      </td>
                      <td className="px-3 md:px-8 py-1 md:py-4 text-center border">
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                      </td>
                      <td className="px-3 md:px-8 py-1 md:py-4 text-center border lg:w-[10%]">
                        <div className="h-4 bg-gray-300 mb-6 rounded"></div>
                      </td>
                    </tr>
                  </>
                ) : (
                  allData?.length > 0 &&
                  allData
                    ?.slice(startWith, startWith + showItemLength)
                    ?.map((item, index) => {
                      return (
                        <tr
                          key={index}
                          className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        >
                          <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center  lg:w-[5%]">
                            {en2bn(index + startWith + 1)}
                          </td>
                          <td className="px-3 md:px-8 py-1 md:py-4 text-center border  lg:w-[40%]">
                            {item?.user_name},{" "}
                            {item?.user_designation},{" "}
                            {item?.user_office}
                          </td>
                          <td className="px-3 md:px-8 py-1 md:py-4 text-center border">
                            {item?.feedback}
                          </td>
                          <td className="px-3 md:px-8 py-1 md:py-4 text-center border lg:w-[10%]">
                            {en2bn(item?.created)}
                          </td>
                        </tr>
                      );
                    })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
