'use client';

import { relative_image_path, en2bn, public_image_path } from "@/halpers/helper";
import { useState } from "react";
import Image from "next/image";

const AccordionWithPagenation = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [paginateOptionShow, setPaginateOptionShow] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [faqData, setFaqData] = useState([]);

  /* pagination start */
  const [allData, setAllData] = useState(items);
  const [startWith, setStartWith] = useState(0);
  const [showItemLength, setShowItemLength] = useState(10);
  let tp = parseFloat(items?.length) / parseInt(showItemLength);
  /* pagination end */

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="flex justify-end items-center">
        <div>
          <p className="text-primary text-14">
            মোট প্রশ্ন {items?.length && en2bn(items?.length)} টি{" "}
          </p>
        </div>
      </div>

      {items
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
                  item?.attachment != "" ? "w-full lg:w-[70%] pb-3 lg:pb-0" : ""
                }`}
              >
                {item.answer}
              </div>
              {item?.attachment ? (
                item?.dynamic ? (
                  <div className="w-full lg:w-[30%]">
                  <Image
                    src={item?.attachment}
                    height={1000}
                    width={1000}
                    alt="Ldtax"
                  />
                </div>
                ) : (
                  <div className="w-full lg:w-[30%]">
                  <Image
                    src={relative_image_path(item?.attachment)}
                    height={1000}
                    width={1000}
                    alt="image error"
                  />
                </div>
                )
              ) : (
                ""
              )}
              {/* {item?.attachment ? (
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
              )} */}
            </div>
          </div>
        ))}

      {/* pagination */}
      {items?.length == 0 ? (
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
                {startWith + showItemLength >= items?.length ? (
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
                          startWith + showItemLength <= items?.length
                            ? startWith + showItemLength
                            : items?.length - showItemLength
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
                          items?.length - showItemLength < 1
                            ? 0
                            : items?.length - showItemLength
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
      {/* <div className="mt-4 pt-3">
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
            {startWith + showItemLength >= items?.length ? (
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
                      startWith + showItemLength <= items?.length
                        ? startWith + showItemLength
                        : items?.length - showItemLength
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
      </div> */}
    </>
  );
};

export default AccordionWithPagenation;
