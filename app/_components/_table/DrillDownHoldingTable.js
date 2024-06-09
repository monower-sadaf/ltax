"use client";

import { Suspense, useEffect, useState } from "react";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import axios from "axios";
import { en2bn } from "@/halpers/helper";
import { FaArrowCircleRight } from "react-icons/fa";
import { VscTriangleRight } from "react-icons/vsc";
import { getTable1Data } from "@/app/_api/api";

const DrillDownHoldingTable = ({data}) => {
  const [allData, setAllData] = useState(data || []);
  const [activeStages, setActiveStages] = useState([]);
  const [falseStages, setFalseStages] = useState([]);
  const [stageVariants, setStageVariants] = useState({
    divisions: {
      id: "",
      isTrue: true,
      title: "বিভাগ",
      testqr: "divisions",
      category: "divisions",
    },
    district_id: {
      id: "",
      isTrue: false,
      title: "জেলা",
      testqr: "divisions",
      category: "district_id",
    },
    upazila_id: {
      id: "",
      isTrue: false,
      title: "উপজেলা",
      testqr: "district_id",
      category: "upazila_id",
    },
    office: {
      id: "",
      isTrue: false,
      title: "অফিস",
      testqr: "upazila_id",
      category: "office",
    },
  });

  const token = getTokenFromCookie();
  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  useEffect(() => {
    stageSet();
  }, [stageVariants]);

  const stageSet = () => {
    let new_ob_istrue = [];
    let new_ob_isfalse = [];
    Object.keys(stageVariants)?.map((item) => {
      if (stageVariants[item].isTrue) {
        new_ob_istrue.push(stageVariants[item]);
      } else {
        new_ob_isfalse.push(stageVariants[item]);
      }
    });

    setActiveStages(new_ob_istrue);
    setFalseStages(new_ob_isfalse);
  };

  const handleBackClick = (category, id, title, testqr, index) => {
    Object.keys(stageVariants)?.map((item, index2) => {
      setStageVariants((prevState) => ({
        ...prevState,
        [item]:
          index < index2
            ? {
                id: stageVariants[item].id,
                isTrue: false,
                title: stageVariants[item].title,
                testqr: stageVariants[item].testqr,
                category: stageVariants[item].category,
              }
            : {
                id: stageVariants[item].id,
                isTrue: true,
                title: stageVariants[item].title,
                testqr: stageVariants[item].testqr,
                category: stageVariants[item].category,
              },
      }));
    });

    if (category === "divisions") {
      getTable1Data("divisions", 0, "বিভাগ", "").then((data)=>{
        setAllData(data),
          setStageVariants((pre) => ({
            ...pre,
            [category]: {
              id: id,
              isTrue: true,
              title: title,
              category: category,
              testqr: testqr,
            },
          }));
      })
      // getAllData("divisions", 0, "বিভাগ", "");
    } else {
      // getAllData(category, id, title, testqr);
      getTable1Data(category, id, title, testqr).then((data) => {
        setAllData(data),
          setStageVariants((pre) => ({
            ...pre,
            [category]: {
              id: id,
              isTrue: true,
              title: title,
              category: category,
              testqr: testqr,
            },
          }));
      });
    }
  };

  

  const getAllData = async (category, id, title, testqr) => {
    try {
      let response = [];
      if (category === "divisions") {
        response = await axios.post(process.env.BASE_URL + "/portal/listData", {
          headersOption,
        });
      } else {
        const req = {
          [testqr]: parseInt(id),
        };

        response = await axios.post(
          process.env.BASE_URL + "/portal/listData",
          req,
          { headersOption }
        );
      }

      setAllData(response.data.data);

      setStageVariants((pre) => ({
        ...pre,
        [category]: {
          id: id,
          isTrue: true,
          title: title,
          category: category,
          testqr: testqr,
        },
      }));
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  // console.log('from table1 component: ',allData);

  return (
    <>
      <div className="flex space-x-3">
        <div className="">
          <div className="flex justify-center items-center">
            {activeStages?.map((item, index) => {
              return (
                <div key={index} className="flex justify-center items-center">
                  {index == 0 ? "" : <VscTriangleRight color="#12633d" />}
                  <span
                    className="text-primary text-18 cursor-pointer"
                    onClick={() =>
                      handleBackClick(
                        item?.category,
                        item?.id,
                        item?.title,
                        item?.testqr,
                        index
                      )
                    }
                  >
                    {item?.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto py-3">
        <table className="table table-auto cursor-pointer w-full text-sm text-left text-gray-500 border-collapse border border-secondary">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr className="border border-primary-400 text-white bg-primary border-primary">
              <th scope="col" className="px-3 py-3 text-center ">
                ক্রম নং
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                {activeStages?.slice(-1)?.pop()?.title}
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                খতিয়ান এন্ট্রি
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                হোল্ডিং এন্ট্রি
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                হোল্ডিং এ সমন্বয়
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                মোট হোল্ডিং তৈরী
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                অপেক্ষমান খতিয়ান
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                বাতিল খতিয়ান
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                খতিয়ান থেকে হোল্ডিং এন্ট্রি ও সমন্বয়ের হার (%)
              </th>
              <th scope="col" className="px-3 py-3 text-center ">
                #
              </th>
            </tr>
          </thead>
          <tbody>
            {allData?.info.length != 0 ? (
              <Suspense fallback={<p>Loading...</p>}>
                {allData?.info?.map((item, index) => (
                  <tr
                    key={index}
                    onClick={() =>
                      getAllData(
                        falseStages[0]?.category,
                        item.id,
                        falseStages[0]?.title,
                        falseStages[0]?.testqr
                      )
                    }
                    className="bg-white border-b text-black border-secondary"
                  >
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(index + 1))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {item?.name}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(item?.total_khotian))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(item?.total_holding))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(item?.total_merge_holding))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(item?.total_waiting_khotian))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(item?.total_rejected_khotian))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      {en2bn(parseInt(item?.total_rejected_khotian))}
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      0%
                    </td>
                    <td className="px-3 md:px-8 py-1 md:py-4 text-center ">
                      <FaArrowCircleRight color="#12633d" />
                    </td>
                  </tr>
                ))}
              </Suspense>
            ) : (
              <tr>
                <td
                  colSpan={11}
                  className="px-3 md:px-8 py-1 md:py-4 text-center "
                >
                  <div className="flex items-center justify-center">
                    <p>কোন তথ্য পাওয়া যায়নি।</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DrillDownHoldingTable;
