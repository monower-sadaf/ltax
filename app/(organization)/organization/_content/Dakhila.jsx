"use client";

import Link from "next/link";
import { en2bn, formatStringForDate, relative_image_path } from "@/halpers/helper";
import { useEffect, useState } from "react";
import { CitizenDakhilaList } from "@/app/_api/api";
import { parseCookies } from "nookies";

const Dakhila = (orgId) => {
  
  /* pagination start */
  const [allData, setAllData] = useState([]);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  let tp = parseFloat(allData.length) / parseInt(showItemLength);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  /* pagination end */

  let organizationData = parseCookies();
  
  useEffect(() => {
    const organization_info = JSON.parse(organizationData?.organization);

    CitizenDakhilaList(organization_info?.id,1).then((dataArray) => {
      setAllData(dataArray);
    });
    if (allData?.length > 0) {
      let tp = parseFloat(allData?.length) / parseInt(showItemLength);
      setTotalPages(Math.ceil(tp));
    }
  }, []);

  return (
    <>
      <section className="bg-white p-4 rounded-lg w-full">
        <div className="pb-4">
          <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px]">
            দাখিলা তথ্যাবলী
          </h3>
          <p className="text-[#777777]">ভূমি উন্নয়ন কর পরিশোধ রসিদসমূহ</p>
        </div>
        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-lg">
              <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    ক্রম
                  </th>
                  {/* <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    সংস্থার নাম
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    মৌজা
                  </th> */}
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    হোল্ডিং নং
                  </th>
                  <th
                    scope="col"
                    className=" text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    দাখিলা নং
                  </th>
                  <th
                    scope="col"
                    className=" text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    আদায়
                  </th>
                  <th
                    scope="col"
                    className=" text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    পরিশোধের তারিখ
                  </th>
                  <th
                    scope="col"
                    className=" text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
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
                              
                              {
                                item?.ldtax_holding?.holding_no == null || item?.ldtax_holding?.holding_no == ' ' ?  '' : en2bn(item?.ldtax_holding?.holding_no)
                              }
                            </span>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                            <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                              {
                                en2bn(item?.dakhila_no)
                              }
                            </span>
                          </td>

                          <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                            <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                              {en2bn(item?.total_collection)}
                            </span>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                            <span className="leading-10 text-[15px] text-weight-400 text-[#0E1F1C]">
                              {en2bn(formatStringForDate(item?.created, 10))}
                            </span>
                          </td>
                          <td className="text-sm text-gray-900 font-light px-3 py-2 whitespace-nowrap text-center">
                            <Link
                              target="_blank"
                              href={{
                                pathname: `${process.env.PAYMENT_BASE_URL}/dakhila-print/${item?.id}`,
                              }}
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
                          </td>
                        </tr>
                      );
                    })}
              </tbody>
            </table>
          </div>
          <div>
            {/* pagination */}
            <div className="mt-4 pt-3">
              <div className="flex justify-end lg:justify-end space-x-3 lg:space-x-8 items-center">
                <div className="flex items-center space-x-2">
                  <div className="relative inline-block text-left">
                    <div>
                      <button
                        type="button"
                        onMouseEnter={() => setPaginateOptionShow(true)}
                        onMouseLeave={() => setPaginateOptionShow(false)}
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
                    {paginateOptionShow && (
                      <div
                        onMouseEnter={() => setPaginateOptionShow(true)}
                        onMouseLeave={() => setPaginateOptionShow(false)}
                        className="absolute top-3 right-0 z-10 mt-2 origin-top-right 
                        rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5
                        focus:outline-none"
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
                          src={relative_image_path("FaCaretUpDuboleRight.svg")}
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
                              : allData?.length - showItemLength
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
                            allData?.length - showItemLength < 1
                              ? 0
                              : allData?.length - showItemLength
                          )
                        }
                      >
                        <img
                          src={relative_image_path("FaCaretUpDuboleRight.svg")}
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
        </div>
      </section>
    </>
  );
};

export default Dakhila;
