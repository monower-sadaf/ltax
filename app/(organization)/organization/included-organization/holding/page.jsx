"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { en2bn } from "@/halpers/helper";
import Link from "next/link";
import { relative_image_path } from "@/halpers/helper";

const data = [
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
  {
    id: 1,
    Moujas: {
      name_bd: "dhaka",
      jl_no: "tgyuyvguy",
    },
    holding_no: 123,
    LdtaxHoldingLandSchedules: {
      dag_no: 1,
      khotian_no: 2,
    },
    date: "2022-01-01",
    tax_clear_year: 2022,
    is_approve: 1,
  },
];

const Home = () => {
  
  // const val = useSelector((state) => state.includeOrg.value);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  console.log("included organization id: ", id);

  /* pagination start */
  const [allData, setAllData] = useState(data);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  let tp = parseFloat(allData.length) / parseInt(showItemLength);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  /* pagination end */

  if (id == 0) {
    router.push("/organization/included-organization/");
  } else {
    return (
      <>
        {/* this is included organization holding { id } */}
        <div className="bg-white px-2 lg:px-[32px] w-full rounded-lg">
          <div className="py-[14px] w-full flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
            <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
                company { id } হোল্ডিং তথ্যবলি
            </h3>
          </div>
          <div className="w-full">
            <div className="w-full overflow-x-auto">
              <table className="min-w-full border border-lg">
                <thead className="h-[40px] text-[#12633D] bg-green-700 border-b">
                  <tr>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      ক্রম
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      মৌজা
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      হোল্ডিং নং
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      খতিয়ান
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      দাগ
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      তারিখ
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      সর্বশেষ কর পরিশোধের সাল
                    </th>
                    <th className=" text-sm font-medium text-gray-50   text-center">
                      স্ট্যাটাস
                    </th>
                    <th className="text-sm font-medium text-gray-50   text-center">
                      পদক্ষেপ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {allData?.length > 0 &&
                    allData
                      ?.slice(startWith, startWith + showItemLength)
                      ?.map((item, index) => {
                        return (
                          <tr
                            key={index}
                            className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                          >
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900 text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {en2bn(index + startWith + 1)}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {" "}
                                {item?.Moujas?.name_bd} -{" "}
                                {en2bn(item?.Moujas?.jl_no)}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {en2bn(item?.holding_no)}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {en2bn(
                                  item?.LdtaxHoldingLandSchedules.khotian_no
                                )}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {en2bn(item?.LdtaxHoldingLandSchedules.dag_no)}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {en2bn(item?.date)}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                                {en2bn(item?.tax_clear_year)}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                              <span className="leading-10 text-[15px] text-weight-400 text-[#A5008A]">
                                {item?.is_approve == 1 && "অনুমোদিত"}
                              </span>
                              <span className="leading-10 text-[15px] text-weight-400 text-[#EDB900]">
                                {item?.is_approve == 0 && "অপেক্ষমান"}
                              </span>
                            </td>
                            <td className="text-sm text-gray-900 font-light">
                              <div className="flex justify-center items-center">
                                <Link
                                  href={{
                                    pathname: `/organization/included-organization/holding/${item?.id}`,
                                  }}
                                  shallow
                                  className=""
                                >
                                  <span>
                                    <svg
                                      className="fill-green-400"
                                      xmlns="http://www.w3.org/2000/svg"
                                      height="1em"
                                      viewBox="0 0 576 512"
                                    >
                                      <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" />
                                    </svg>
                                  </span>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
            {allData?.length == 0 ? (
              <div className="w-full h-[10vh] lg:h-[20vh] flex justify-center items-center">
                <span className="text-[#777777] text-16">
                  কোনো তথ্য পাওয়া যায়নি।
                </span>
              </div>
            ) : (
              <div className="w-full">
                <div className="py-4">
                  <div className="flex justify-end lg:justify-end space-x-3 lg:space-x-8 items-center">
                    <div className="flex items-center space-x-2">
                      <div className="flex flex-col items-end relative">
                        {paginateOptionShow && (
                          <div
                            className="z-50 absolute -top-[100px] bg-white rounded-md border drop-shadow-xl"
                            onMouseEnter={() => setPaginateOptionShow(true)}
                            onMouseLeave={() => setPaginateOptionShow(false)}
                            role="menu"
                            aria-orientation="vertical"
                            aria-labelledby="menu-button"
                            tabIndex={-1}
                          >
                            <div className="py-1" role="none">
                              <ul
                                className="py-2 text-semiblack text-sm pb-3 flex flex-col space-y-2"
                                aria-labelledby="dropdownHoverButtonPagenationList"
                              >
                                <li>
                                  <a
                                    href
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShowItemLength(5);
                                    }}
                                    className="block hover:text-magenta mx-3 cursor-pointer"
                                  >
                                    {en2bn(5)}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShowItemLength(20);
                                    }}
                                    className="block hover:text-magenta mx-3 cursor-pointer"
                                  >
                                    {en2bn(20)}
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href
                                    onClick={(e) => {
                                      e.preventDefault();
                                      setShowItemLength(30);
                                    }}
                                    className="block hover:text-magenta mx-3 cursor-pointer"
                                  >
                                    {en2bn(30)}
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        )}
                        <div>
                          <button
                            type="button"
                            onMouseEnter={() => setPaginateOptionShow(true)}
                            onMouseLeave={() => setPaginateOptionShow(false)}
                            onClick={() =>
                              setPaginateOptionShow(!paginateOptionShow)
                            }
                            className="text-12 text-deepgreen flex justify-between"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                          >
                            সর্বমোট পৃষ্ঠা - {en2bn(Math.ceil(tp))}
                            <svg
                              className="ml-2"
                              width={20}
                              height={20}
                              viewBox="0 0 15 15"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1.875 5.2125L2.26219 4.6875L12.7566 4.6875L13.125 5.19375L7.84969 10.3125H7.07437L1.875 5.2125Z"
                                fill="#1E433D"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-12 text-deepgreen">
                        ক্রম নং- {en2bn(startWith + 1)}-
                        {en2bn(startWith + showItemLength)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div onClick={() => setStartWith(0)}>
                        <img
                          src={relative_image_path("FaCaretUpDuboleLeft.svg")}
                          alt="ভূমি উন্নয়ন কর"
                          className="cursor-pointer"
                        />
                      </div>
                      <div
                        onClick={() =>
                          setStartWith(
                            startWith - showItemLength < 1
                              ? 0
                              : startWith - showItemLength
                          )
                        }
                      >
                        <img
                          src={relative_image_path("FaCaretUpLeft.svg")}
                          alt="ভূমি উন্নয়ন কর"
                          className="cursor-pointer"
                        />
                      </div>
                      {startWith + showItemLength >= allData?.length ? (
                        <>
                          <div>
                            <img
                              src={relative_image_path("FaCaretUpRight.svg")}
                              alt="ভূমি উন্নয়ন কর"
                              className="cursor-pointer"
                            />
                          </div>
                          <div>
                            <img
                              src={relative_image_path(
                                "FaCaretUpDuboleRight.svg"
                              )}
                              alt="ভূমি উন্নয়ন কর"
                              className="cursor-pointer"
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            onClick={() =>
                              setStartWith(
                                startWith + showItemLength <= allData?.length
                                  ? startWith + showItemLength
                                  : allData?.users?.length - showItemLength
                              )
                            }
                          >
                            <img
                              src={relative_image_path("FaCaretUpRight.svg")}
                              alt="ভূমি উন্নয়ন কর"
                              className="cursor-pointer"
                            />
                          </div>
                          <div
                            onClick={() =>
                              setStartWith(
                                allData?.users?.length - showItemLength < 1
                                  ? 0
                                  : allData?.length - showItemLength
                              )
                            }
                          >
                            <img
                              src={relative_image_path(
                                "FaCaretUpDuboleRight.svg"
                              )}
                              alt="ভূমি উন্নয়ন কর"
                              className="cursor-pointer"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
};

export default Home;
