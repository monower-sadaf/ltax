'use client';


import { useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      {items?.slice(0, 5).map((item, index) => (
        <div
          key={index}
          className={`w-full ${
            activeIndex === index ? "active" : ""
          } question  drop-shadow my-2`}
        >
          <button
            onClick={() => handleToggle(index)}
            className={`w-full px-[1.6875em] py-[0.625em] flex items-center justify-between space-x-2 transiiton-all duration-500 ${
              activeIndex === index
                ? "bg-secondary text-white"
                : "bg-white text-[#000000]"
            }`}
          >
            <h4 className="flex justify-start text-left text-14 leading-[18.29px] lg:text-20 lg:leading-[26.13px] w-[90%]">{item.question}</h4>
            <svg
              className={`transition-all duration-700 w-[10%] ${
                activeIndex === index
                  ? "-rotate-45 fill-white"
                  : "rotate-0 fill-slate-950"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              height="1.2em"
              viewBox="0 0 448 512"
            >
              <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
            </svg>
          </button>
          <div
            className={`px-[1.6875em] py-[0.625em] transition-transform duration-700 text-12 leading-[15.68px] lg:text-15 lg:leading-[19.6px] ${
              index === activeIndex ? `flex` : `hidden`
            } justify-start bg-[#F2FAF4] text-slate-950`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </>
  );
};

export default Accordion;
