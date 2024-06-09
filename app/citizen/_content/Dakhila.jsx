"use client";

import { useEffect, useState } from "react";
import { en2bn, formatStringForDate } from "@/halpers/helper";
import { CitizenDakhilaList } from "@/app/_api/api";
import { relative_image_path } from "@/halpers/helper";
import Link from "next/link";
import { parseCookies } from "nookies";
import PaymentDetailsByDakhila from "@/app/_components/PaymentDetailsByDakhila";
import Modal from "@/app/_components/Radix/Modal";
import { MdOutlinePayments } from "react-icons/md";
import { FaEye } from "react-icons/fa";

export default function Dakhila() {

  let citizen = parseCookies();
  let c = JSON.parse(citizen?.citizen);

  const cn_data = c;

  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  /* pagination start */
  const [allData, setAllData] = useState([]);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  let tp = parseFloat(allData?.length) / parseInt(showItemLength);
  /* pagination end */

  useEffect(() => {
    CitizenDakhilaList(c?.id,0).then((dataArray) => {
      setAllData(dataArray);
    });
    if (allData?.length > 0) {
      let tp = parseFloat(allData?.length) / parseInt(showItemLength);
      setTotalPages(Math.ceil(tp));
    }
  }, []);

  return (
    <>
      <div className="bg-white px-2 lg:px-[32px] w-full rounded-lg">
        <div className="py-[14px] w-full">
          <h2 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px] font-semibold">
            দাখিলা তথ্যাবলী
          </h2>
          <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] text-[#777777]">
            ভূমি উন্নয়ন কর পরিশোধ রসিদসমূহ
          </p>
        </div>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <table className="min-w-full border border-lg">
              <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    ক্রম
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    হোল্ডিং নং
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    দাখিলা নং
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    আদায়
                  </th>
                  <th
                    scope="col"
                    className="w-[167px] text-sm font-medium text-gray-50 px-3 py-2  text-center"
                  >
                    তারিখ
                  </th>
                  <th
                    scope="col"
                    className="w-[50px] text-sm font-medium text-gray-50 px-3 py-2  text-center"
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
                              className="mb-2 flex items-center space-x-1 px-4 py-1 rounded-md bg-[#155e75] text-white hover:bg-white hover:text-[#155e75] border border-[#155e75]"
                            >
                              <span><FaEye /></span>
                              <span>বিবরণ</span>
                            </Link>
                            
                            {
                                  <Modal icon={
                                    <div className='flex items-center space-x-1 px-4 py-1 rounded-md bg-primary text-white hover:bg-white hover:text-primary border border-primary'>
                                      <span><MdOutlinePayments /></span>
                                      <span>পেমেন্টের বিবরণ</span>
                                    </div>
                                  } cancelBtn={"বন্ধ করুন"}
                                    title={`${en2bn(item?.dakhila_no)} এর পেমেন্টের বিবরণ`}
                                  >
                                    <PaymentDetailsByDakhila dakhila={item?.dakhila_no} />
                                    {/* hello */}
                                  </Modal>
                                }

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
