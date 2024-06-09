"use client";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import axios from "axios";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import CitizenFaqForm from "../_components/CitizenFaqForm";
// import AccordionWithPagenation from '../_components/'
const AccordionWithPagenation = dynamic(
  () => import("@/app/_components/AccordionWithPagenation.js"),
  { ssr: true }
);

const Nirdeshika = () => {
  const token = getTokenFromCookie();
  const [faqData, setFaqData] = useState([]);
  const [hidden, setHidden] = useState(true);

  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  const faq = async () => {
    const { data } = await axios.get(process.env.BASE_URL + "/portal/faq", {
      headersOption,
    });
    console.log(`faq api response: ${data.data}`);
    const faqItem = data?.data;
    setFaqData(faqItem);
    console.log(faqData);
  };

  useEffect(() => {
    faq();
  }, []);

  const HandleClick = (e) => {
    e.preventDefault();
    setHidden(!hidden);
  };

  return (
    <>
      <div className="bg-white lg:mt-[14px] rounded-lg">
        <div className="py-[13px] lg:py-[22.7px] px-[8px] lg:px-[26px]">
          <div className="flex flex-col lg:flex-row justify-center items-center lg:justify-start pb-5 lg:pb-0">
            <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] text-center lg:text-left pb-[13px] lg:pb-0">
              নির্দেশিকা সমূহ
            </h3>
          </div>
          <div>
            <AccordionWithPagenation items={faqData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Nirdeshika;
