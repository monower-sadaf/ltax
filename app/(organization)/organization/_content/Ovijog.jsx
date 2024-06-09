"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { en2bn, formatdate, relative_image_path } from "@/halpers/helper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/app/_components/Radix/Modal";
import ConfirmBox from "@/app/_components/ConfirmBox";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { Complain, DeleteComplain } from "@/app/_api/api";

const ComplainForm = dynamic(
  () => import("../_components/Holding/ComplainForm"),
  {
    ssr: false,
  }
);

const Ovijog = () => {
  const [openComplainForm, setOpenComplain] = useState(true);
  
  let organizationData = parseCookies();

  /* pagination start */
  const [allData, setAllData] = useState([]);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  let tp = parseFloat(allData.length) / parseInt(showItemLength);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  /* pagination end */

  // const complainform = () => {
  //   setOpenComplain(!openComplainForm);
  //   console.log(openComplainForm);
  // };

  const router = useRouter();
  useEffect(() => {
    
    let c = JSON.parse(organizationData?.organization);
    let id = c?.id;
    Complain(id).then((dataArray) => {

      setAllData(dataArray);
    });
    if (allData?.length > 0) {
      setShowItemLength(allData?.length);
      let tp = parseFloat(allData?.length) / parseInt(showItemLength);
      setTotalPages(Math.ceil(tp));
    }
  }, []);

  const handleDelete = (id) => {
    DeleteComplain(id).then((dataArray) => {
      toast.success("অভিযোগটি সফলভাবে মুছে ফেলা হয়েছে ।");
      if (window != undefined) {
        window.location.href = "/organization/ovijog";
      }
    });
  };

  
  

  return (
    <>

      <section className="bg-white p-4 rounded-lg w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center pb-[11px] lg:pb-[16px]">
            <div className="flex flex-col justify-center items-center lg:items-start lg:justify-normal pb-[12px] lg:pb-0">
              <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
                আপত্তি ও অভিযোগ সমূহ
              </h3>
              <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px] text-[#777777]">
                ভূমি উন্নয়ন কর সংক্রান্ত আপত্তি ও অভিযোগ দাখিল
              </p>
            </div>
            
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border border-lg">
              <thead className="h-[30px] text-[#12633D] bg-green-700 border-b">
                <tr className="border border-primary-400 text-white bg-primary border-primary">
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200"
                  >
                    ক্রম
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200 "
                  >
                    বিভাগ
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200 "
                  >
                    জেলা
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200 "
                  >
                    উপজেলা
                  </th>
                  <th
                            scope="col"
                            className="  py-3 text-center border border-green-200 "
                        >
                            মৌজা
                        </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200"
                  >
                    হোল্ডিং নং
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200"
                  >
                    অভিযোগের তারিখ
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200"
                  >
                    সর্বশেষ অবস্থা
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200"
                  >
                    অভিযোগের বিস্তারিত
                  </th>
                  <th
                    scope="col"
                    className="  py-3 text-center border border-green-200"
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
                        <tr key={index} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                          <td className="text-sm text-gray-900 font-light  py-2 whitespace-nowrap text-center">
                            {en2bn(index + startWith + 1)}
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                            {item?.divisions?.name_bn}
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                            {item?.districts?.name_bn}
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                            {item?.upazilas?.name_bd}
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                              {(item?.moujas?.name_bd)} - {en2bn(item?.moujas?.jl_no)}
                          </td> 
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                            {en2bn(item?.ldtax_holding?.holding_no)}
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                            {en2bn(formatdate(item?.created))}
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%] ">
                            <span className="text-primary">
                              {item?.status == 1 && "নিষ্পত্তি"}
                            </span>
                            <span className="text-[#EDB900]">
                              {item?.status == 0 && "অপেক্ষমান"}
                            </span>
                          </td>
                          <td className="  py-1 md:py-4 text-center border lg:w-[10%]">
                            
                            <Modal 
                                icon={
                                  <svg
                                    width="16"
                                    height="18"
                                    viewBox="0 0 16 18"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M15.3125 4.55L11.2125 0.425L10.775 0.25H1.125L0.5 0.875V7.75H1.75V1.5H9.25V5.875L9.875 6.5H14.25V7.75H15.5V5L15.3125 4.55ZM10.5 5.25V1.5L14.25 5.25H10.5ZM1.125 9L0.5 9.625V17.125L1.125 17.75H14.875L15.5 17.125V9.625L14.875 9H1.125ZM14.25 15.25V16.5H1.75V10.25H14.25V15.25ZM4.25 14H3.85V15.25H3V11.5H4.325C5.2625 11.5 5.7375 11.95 5.7375 12.75C5.73992 12.92 5.70541 13.0885 5.63635 13.2439C5.56729 13.3993 5.46532 13.5379 5.3375 13.65C5.02772 13.8915 4.64246 14.0155 4.25 14ZM4.175 12.1875H3.85V13.35H4.175C4.625 13.35 4.85 13.15 4.85 12.7625C4.85 12.375 4.625 12.1875 4.175 12.1875ZM9.25 14.725C9.43461 14.5432 9.57896 14.3246 9.67371 14.0834C9.76845 13.8422 9.81148 13.5839 9.8 13.325C9.8 12.075 9.1375 11.5 7.8 11.5H6.475V15.25H7.8C8.06441 15.2628 8.32873 15.223 8.57764 15.1329C8.82654 15.0428 9.05508 14.9041 9.25 14.725ZM7.3125 14.5625V12.1875H7.725C7.88443 12.1774 8.04425 12.1999 8.1947 12.2536C8.34515 12.3073 8.48306 12.3912 8.6 12.5C8.70595 12.6113 8.78826 12.7428 8.84197 12.8868C8.89567 13.0307 8.91967 13.184 8.9125 13.3375C8.93122 13.667 8.81889 13.9905 8.6 14.2375C8.48556 14.347 8.35017 14.4322 8.20195 14.4881C8.05373 14.544 7.89575 14.5693 7.7375 14.5625H7.3125ZM12.875 13.8H11.6625V15.25H10.8125V11.5H12.9875V12.1875H11.6625V13.1125H12.875V13.8Z"
                                      fill="#A5008A"
                                    />
                                  </svg>
                                }
                                cancelBtn={"বন্ধ করুন"}
                                title={`হোল্ডিং নংঃ ${item?.ldtax_holding?.holding_no}`}
                              >
                                <p className="my-2"><span className="text-800">বিস্তারিত ঃ </span> {item?.description}</p>
                            
                                
                                {
                                  item?.attachment != null ? (
                                    <embed
                                      src={`${process.env.BASE_URL_V1_BASE}/storage/${item?.attachment}`}
                                      title=""
                                      height="500px"
                                      width="100%"
                                    ></embed>
                                  ) : ( <span>কোন সংযুক্তি নেই</span> )
                                }
                              </Modal>
                          </td>
                          <td className="text-center ">
                            {item?.status == 1 ? (
                              <Link
                                href={"/organization/ovijog/" + item?.id}
                                shallow
                                prefetch={false}
                                type="button"
                                className="px-4 py-1 text-[10px] leading-[10.11px]  hover:bg-white hover:text-primary text-white lg:text-14 lg:leading-[14.16px] border border-primary bg-primary rounded-sm"
                              >
                                প্রতিক্রিয়া
                              </Link>
                            ) : (
                              <button className="w-full flex justify-center">
                                <ConfirmBox
                                  message="আপনি কি অভিযোগটি মুছে ফেলতে চান ?"
                                  onConfirm={(e) => handleDelete(item?.id)}
                                />
                              </button>
                            )}
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
                          onClick={() => setPaginateOptionShow(!paginateOptionShow)}
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
          )}
          </section>
    </>
  );
};

export default Ovijog;
