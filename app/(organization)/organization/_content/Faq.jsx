"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import CitizenFaqForm from "../../../citizen/_components/CitizenFaqForm";
import { parseCookies } from "nookies";
import { en2bn, relative_image_path } from "@/halpers/helper";

const Faq = () => {
  const [hidden, setHidden] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const cookies = parseCookies();
  const citizen = cookies.citizen;

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  let c = "";
  /* if (window != undefined) {
    c = JSON.parse(citizen);
  } */
  

  const cn_data = c;
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [holdingIdFlag, setHoldingIdFlssg] = useState(0);

  /* pagination start */
  const [allData, setAllData] = useState([]);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  // let tp = (parseFloat(allData?.length)) / (parseInt(showItemLength));
  let tp = 0;
  /* pagination end */

  /* useEffect(() => {
    organizationFaq().then((dataArray) => {
      setAllData(dataArray);
    });
  }, []); */

  const HandleClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  if (allData?.faq?.length > 0) {
    tp = parseFloat(allData?.faq?.length) / parseInt(showItemLength);
    console.log("tp ", tp);
    // setTotalPages(Math.ceil(tp));
  }

  return (
    <>
      <div className="w-full bg-white rounded-lg">
        <div className="py-[13px] lg:py-[22.7px] px-[8px] lg:px-[26px]">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start pb-5 lg:pb-0">
            {/* heading */}
            <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] text-center lg:text-left pb-[13px] lg:pb-0">
              জিজ্ঞাসিত প্রশ্নাবলী
            </h3>
            <a
              onClick={(e) => HandleClick(e)}
              className="lg:hidden border border-[#EDB900] inline-flex items-center text-12 leading-[12.14px] py-[8px] px-[6px] rounded-md"
              href="#"
            >
              <svg
                className="mr-[5px]"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8125 13.125H2.1875C1.46289 13.125 0.875 12.5371 0.875 11.8125V2.1875C0.875 1.46289 1.46289 0.875 2.1875 0.875H11.8125C12.5371 0.875 13.125 1.46289 13.125 2.1875V11.8125C13.125 12.5371 12.5371 13.125 11.8125 13.125ZM7.38555 4.86445L3.675 8.575L3.50273 10.1363C3.48086 10.3441 3.65586 10.5219 3.86641 10.5L5.42773 10.3277L9.13828 6.61719C9.20117 6.5543 9.20117 6.45039 9.13828 6.38477L7.6207 4.86719C7.55234 4.80156 7.44844 4.80156 7.38555 4.86445ZM10.3086 4.51445L9.48555 3.69141C9.22852 3.43438 8.81289 3.43438 8.55859 3.69141L7.92695 4.32305C7.86406 4.38594 7.86406 4.48984 7.92695 4.55547L9.44453 6.07305C9.50742 6.13594 9.61133 6.13594 9.67695 6.07305L10.3086 5.44141C10.5629 5.18711 10.5629 4.77148 10.3086 4.51445Z"
                  fill="#EDB900"
                />
              </svg>
              জিজ্ঞাসিত প্রশ্ন প্রদান করুন
            </a>
          </div>
          {!hidden && (
            <div>
              <CitizenFaqForm />
            </div>
          )}

          <div className="flex lg:space-x-[18px]">
            <div className="lg:w-[70%]">
              <div className="flex justify-end items-center">
                <div>
                  <p className="text-primary text-14">
                    মোট প্রশ্ন{" "}
                    {allData?.faq?.length && en2bn(allData?.faq?.length)} টি{" "}
                  </p>
                </div>
              </div>

              {allData?.faq
                ?.slice(startWith, startWith + showItemLength)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`w-full ${
                      activeIndex === index ? "active" : ""
                    } question border border-primary drop-shadow my-2`}
                  >
                    <button
                      onClick={() => handleToggle(index)}
                      className={`w-full p-[1em] flex items-center justify-between space-x-2 transiiton-all duration-700 ${
                        activeIndex === index
                          ? "bg-secondary text-white"
                          : "bg-white text-[#000000]"
                      }`}
                    >
                      <h4 className="flex justify-start text-left w-[90%]">
                        {item.question}
                      </h4>
                      <svg
                        className={`transition-all duration-700 w-[10%] ${
                          activeIndex === index
                            ? "-rotate-45 fill-white"
                            : "rotate-0 fill-slate-950"
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                      </svg>
                    </button>
                    <div
                      className={`p-[1em] transition-transform duration-700 ${
                        index === activeIndex ? `flex` : `hidden`
                      } ${
                        item?.attachment && "flex-col lg:flex-row"
                      } justify-between  text-slate-950`}
                    >
                      <div
                        className={`${
                          item?.attachment != ""
                            ? "w-full lg:w-[70%] pb-3 lg:pb-0"
                            : ""
                        }`}
                      >
                        {item.answer}
                      </div>
                      {item?.attachment != "" ? (
                        <div className="w-full lg:w-[30%]">
                          <Image
                            src={relative_image_path(item?.attachment)}
                            height={1000}
                            width={1000}
                            alt="image error"
                          />
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ))}

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
                                      href={'#'}
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
                                      href={'#'}
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
                                      href={'#'}
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
                            alt="Land Development Tax"
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
                            alt="Land Development Tax"
                            className="cursor-pointer"
                          />
                        </div>
                        {startWith + showItemLength >= allData?.length ? (
                          <>
                            <div>
                              <img
                                src={relative_image_path("FaCaretUpRight.svg")}
                                alt="Land Development Tax"
                                className="cursor-pointer"
                              />
                            </div>
                            <div>
                              <img
                                src={relative_image_path(
                                  "FaCaretUpDuboleRight.svg"
                                )}
                                alt="Land Development Tax"
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
                                    : allData?.faq?.length - showItemLength
                                )
                              }
                            >
                              <img
                                src={relative_image_path("FaCaretUpRight.svg")}
                                alt="Land Development Tax"
                                className="cursor-pointer"
                              />
                            </div>
                            <div
                              onClick={() =>
                                setStartWith(
                                  allData?.faq?.length - showItemLength < 1
                                    ? 0
                                    : allData?.length - showItemLength
                                )
                              }
                            >
                              <img
                                src={relative_image_path(
                                  "FaCaretUpDuboleRight.svg"
                                )}
                                alt="Land Development Tax"
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
              {/* <AccordionWithPagenation items={faqData}/> */}
            </div>
            <div className="hidden lg:block lg:w-[30%]">
              <CitizenFaqForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
