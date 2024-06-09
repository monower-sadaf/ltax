"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Tabs } from "flowbite-react";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import axios from "axios";
import Image from "next/image";
import { en2bn, relative_image_path } from "@/halpers/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FaArrowCircleRight } from "react-icons/fa";
import { VscTriangleRight } from "react-icons/vsc";

const DrillDownDabiTable = () => {
  const [allData, setAllData] = useState([]);

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

  const [activeStages, setActiveStages] = useState([]);
  const [falseStages, setFalseStages] = useState([]);

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
      getAllData("divisions", 0, "বিভাগ", "");
    } else {
      getAllData(category, id, title, testqr);
    }
  };

  const token = getTokenFromCookie();
  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  useEffect(() => {
    stageSet();
  }, [stageVariants]);

  const getAllData = async (category, id, title, testqr) => {
    try {
      let response = [];
      if (category === "divisions") {
        response = await axios.post(
          process.env.BASE_URL + "/portal/dabiandadayinfo",
          { headersOption }
        );
      } else {
        const req = {
          [testqr]: parseInt(id),
        };
        response = await axios.post(
          process.env.BASE_URL + "/portal/dabiandadayinfo",
          req,
          { headersOption }
        );
      }

      setAllData(response.data);

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (allData?.length < 1) {
        getAllData("divisions", 0, "বিভাগ", "");
      }
    }
  }, []);


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
      <Tabs.Group aria-label="Default tabs" className="dabiAdayTab lazy">
        <Tabs.Item active title="দাবী ও আদায় রির্পোট" className="heading dabi">
          <div className="overflow-x-auto ">
            <table className="w-full text-sm text-left text-gray-500 border border-secondary">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
                <tr className="text-white bg-primary">
                  <th scope="col" className="px-3 py-3 text-center  ">
                    ক্রম নং
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    {activeStages?.slice(-1)?.pop()?.title}
                  </th>
                  <th scope="col" className="px-3 py-3 text-center  ">
                    হোল্ডিং এর দাবী
                  </th>
                  <th scope="col" className="px-3 py-3 text-center  ">
                    আদায়
                  </th>
                  <th scope="col" className="px-3 py-3 text-center  ">
                    বকেয়া
                  </th>
                  <th scope="col" className="px-3 py-3 text-center  ">
                    শতকরা হার(%)
                  </th>
                  <th scope="col" className="px-3 py-3 text-center  ">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {allData?.data?.info?.length < 1 ? (
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
                ) : (
                  <Suspense fallback={<p>Loading...</p>}>
                    {allData?.data?.info?.map((item, index) => (
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
                        className="bg-white border-b text-black border-secondary cursor-pointer"
                      >
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[10%]">
                          {en2bn(parseInt(index + 1))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(item?.name)}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.total_tax))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.total_collection_online))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.total_bokeya))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(
                            (
                              parseInt(item?.total_tax) /
                              parseInt(item?.total_collection_online)
                            ).toFixed(2)
                          )}
                          %
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          <FaArrowCircleRight color="#12633d" />
                          
                        </td>
                      </tr>
                    ))}
                  </Suspense>
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Item>
        <Tabs.Item
          title="সাধারণ হোল্ডিং এর দাবী ও আদায় রির্পোট"
          className="heading"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  border border-secondary">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr className="border border-primary-400 text-white bg-primary border-primary">
                  <th scope="col" className="px-3 py-3 text-center ">
                    ক্রম নং
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    {activeStages?.slice(-1)?.pop()?.title}
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    হোল্ডিং এর দাবী
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    আদায়
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    বকেয়া
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    শতকরা হার(%)
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {allData?.data?.info.length < 1 ? (
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
                ) : (
                  <Suspense fallback={<p>Loading...</p>}>
                    {allData?.data?.info?.map((item, index) => (
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
                        className="bg-white border-b text-black border-secondary cursor-pointer"
                      >
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[10%]">
                          {en2bn(parseInt(index + 1))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {item?.name}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.general_total_tax))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(
                            parseInt(item?.general_total_collection_online)
                          )}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.total_general_bokeya))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(
                            parseInt(item?.general_total_collection_online) >
                              0 &&
                              (
                                parseInt(item?.general_total_tax) /
                                parseInt(item?.general_total_collection_online)
                              ).toFixed(2)
                          )}
                          {parseInt(item?.general_total_collection_online) <
                            0 && 100}
                          %
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          <FaArrowCircleRight color="#12633d" />
                        </td>
                      </tr>
                    ))}
                  </Suspense>
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Item>
        <Tabs.Item
          title="সংস্থা হোল্ডিং এর দাবী ও আদায় রির্পোট"
          className="heading"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500  border border-secondary">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
                <tr className="border border-primary-400 text-white bg-primary border-primary">
                  <th scope="col" className="px-3 py-3 text-center ">
                    ক্রম নং
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    {activeStages?.slice(-1)?.pop()?.title}
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    হোল্ডিং এর দাবী
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    আদায়
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    বকেয়া
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    শতকরা হার(%)
                  </th>
                  <th scope="col" className="px-3 py-3 text-center ">
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {allData?.data?.info.length < 1 ? (
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
                ) : (
                  <Suspense fallback={<p>Loading...</p>}>
                    {allData?.data?.info?.map((item, index) => (
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
                        className="bg-white border-b text-black border-secondary cursor-pointer"
                      >
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[10%]">
                          {en2bn(parseInt(index + 1))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {item?.name}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.org_total_tax))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.org_total_collection_online))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(parseInt(item?.total_org_bokeya))}
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          {en2bn(
                            parseInt(item?.org_total_collection_online) > 0 &&
                              (
                                parseInt(item?.org_total_tax) /
                                parseInt(item?.org_total_collection_online)
                              ).toFixed(2)
                          )}
                          {parseInt(item?.org_total_collection_online) < 0 &&
                            en2bn(0)}
                          %
                        </td>
                        <td className="px-3 md:px-8 py-1 md:py-4 text-center  lg:w-[18%]">
                          <FaArrowCircleRight color="#12633d" />
                        </td>
                      </tr>
                    ))}
                  </Suspense>
                )}
              </tbody>
            </table>
          </div>
        </Tabs.Item>
      </Tabs.Group>
    </>
  );
};

export default DrillDownDabiTable;
