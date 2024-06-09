"use client";

import { useEffect, useState, useReducer } from "react";
import dynamic from "next/dynamic";
import { en2bn } from "@/halpers/helper";
import Link from "next/link";
const ComplainForm = dynamic(
  () => import("../../../_components/Holding/ComplainForm"),
  {
    ssr: false,
  }
);

const OnlinePayment = dynamic(
  () => import("@/app/citizen/_components/PaymentModal/OnlinePayment"),
  { ssr: false }
);

const reducer = (state, action) => {
  switch (action.type) {
    case 0: {
      return {
        btnStatus: 0,
      };
    }
    case 1: {
      return {
        btnStatus: 1,
      };
    }
    case 2: {
      return {
        btnStatus: 2,
      };
    }

    default:
      return state;
  }
};

const HoldingDetails = ({params: { id }}) => {
    console.log("id: ", id);
  const [openComplainForm, setOpenComplain] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    btnStatus: 0,
  });

  const complainform = () => {
    setOpenComplain(!openComplainForm);
    console.log(openComplainForm);
  };

  const related_organization_data = [
    {
      organizationName: "demo",
      category: "test",
      phone: "123456789",
      totalHolding: 100,
    },
    {
      organizationName: "demo",
      category: "test",
      phone: "123456789",
      totalHolding: 100,
    },
    {
      organizationName: "demo",
      category: "test",
      phone: "123456789",
      totalHolding: 100,
    },
    {
      organizationName: "demo",
      category: "test",
      phone: "123456789",
      totalHolding: 100,
    },
    {
      organizationName: "demo",
      category: "test",
      phone: "123456789",
      totalHolding: 100,
    },
    {
      organizationName: "demo",
      category: "test",
      phone: "123456789",
      totalHolding: 100,
    },
  ];
  return (
    <>
      {!openComplainForm && <ComplainForm back={complainform} />}
      {openComplainForm == true && (
        <div className="pb-4 bg-[#fff] w-full">
          <div className="bg-white border border-[#777777] rounded-md">
            <div className="bg-primary rounded-t-[4px] mb-[9px] lg:mb-[13px]">
              <h3 className="text-white text-center py-[15px]">
                company no { id } হোল্ডিং তথ্য (হোল্ডিং ট্র্যাকিং)
              </h3>
            </div>
            <div className="px-[13px] lg:px-[16px] pb-[13px] lg:pb-[18px]">
              <div className="items-center justify-start w-full inline-flex pb-[6px]">
                <hr className="w-full h-px bg-[#BABABA] border-0" />
                <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] font-bold">
                  জমি সংক্রান্ত সাধারণ তথ্যাবলী
                </span>
              </div>
              <div className="flex items-center justify-end space-x-[5px] pb-[12px] lg:pb-[19px]">
                <p className="text-[10px] leading-[10.11px] lg:text-[14px] lg:leading-[14.16px]">
                  হোল্ডিং নিয়ে কোনো অভিযোগ থাকলে
                </p>
                <button
                  onClick={() => complainform()}
                  className="text-[12px] leading-[12.14px] lg:text-[14px] lg:leading-[14.16px] border border-[#CF0000] flex items-center justify-center space-x-1 px-[8px] py-[6px] rounded-md"
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4844 3L12.8333 5.34896C12.9323 5.44792 12.9323 5.60937 12.8333 5.70833L7.14583 11.3958L4.72917 11.6641C4.40625 11.7005 4.13281 11.4271 4.16927 11.1042L4.4375 8.6875L10.125 3C10.224 2.90104 10.3854 2.90104 10.4844 3ZM14.7031 2.40365L13.4323 1.13281C13.0365 0.736979 12.3932 0.736979 11.9948 1.13281L11.0729 2.05469C10.974 2.15365 10.974 2.3151 11.0729 2.41406L13.4219 4.76302C13.5208 4.86198 13.6823 4.86198 13.7812 4.76302L14.7031 3.84115C15.099 3.44271 15.099 2.79948 14.7031 2.40365ZM10 9.84896V12.5H1.66667V4.16667H7.65104C7.73437 4.16667 7.8125 4.13281 7.8724 4.07552L8.91406 3.03385C9.11198 2.83594 8.97135 2.5 8.69271 2.5H1.25C0.559896 2.5 0 3.0599 0 3.75V12.9167C0 13.6068 0.559896 14.1667 1.25 14.1667H10.4167C11.1068 14.1667 11.6667 13.6068 11.6667 12.9167V8.80729C11.6667 8.52865 11.3307 8.39062 11.1328 8.58594L10.0911 9.6276C10.0339 9.6875 10 9.76562 10 9.84896Z"
                      fill="#CF0000"
                    />
                  </svg>
                  <span>ক্লিক করুন</span>
                </button>
              </div>
              <div className="flex flex-wrap pb-[16px] lg:pb-[51px]">
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    জেলা
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      test
                    </span>
                  </div>
                </fieldset>
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    উপজেলা/সার্কেল
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      test
                    </span>
                  </div>
                </fieldset>
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    মৌজা
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      test
                    </span>
                  </div>
                </fieldset>
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    হোল্ডিং নং
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      test
                    </span>
                  </div>
                </fieldset>
              </div>
              <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-2">
                <button
                  onClick={() => dispatch({ type: 0 })}
                  className={`border border-primary px-[29px] py-[16px] lg:px-[58px] lg:py-[15px] rounded-md font-bold text-14 leading-[16.09px] lg:text-16 lg:leading-[18.38px] ${
                    state.btnStatus == 0
                      ? "bg-primary text-[#fff]"
                      : "text-primary bg-[#fff]"
                  }`}
                >
                  জমির কর
                </button>
                <button
                  onClick={() => dispatch({ type: 1 })}
                  className={`border border-primary px-[29px] py-[16px] lg:px-[58px] lg:py-[15px] rounded-md font-bold text-14 leading-[16.09px] lg:text-16 lg:leading-[18.38px] ${
                    state.btnStatus == 1
                      ? "bg-primary text-[#fff]"
                      : "text-primary bg-[#fff]"
                  }`}
                >
                  জমির তথ্যাবলী
                </button>
                <button
                  onClick={() => dispatch({ type: 2 })}
                  className={`border border-primary px-[29px] py-[16px] lg:px-[58px] lg:py-[15px] rounded-md font-bold text-14 leading-[16.09px] lg:text-16 lg:leading-[18.38px] ${
                    state.btnStatus == 2
                      ? "bg-primary text-[#fff]"
                      : "text-primary bg-[#fff]"
                  }`}
                >
                  অন্তর্ভুক্ত সংস্থা বিবরণ
                </button>
              </div>
            </div>

            {state.btnStatus == 0 && (
              <div>
                <div className="flex flex-wrap lg:justify-between py-2 px-[13px] lg:px-[16px] pb-[10px] lg:pb-[11px]">
                  <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#EC8E00] rounded-md m-1 lg:m-0">
                    <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                      সর্বশেষ পরিশোধের সাল: {en2bn(2023)}
                    </span>
                  </div>
                  <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#E03BB2] rounded-md m-1 lg:m-0">
                    <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                      বকেয়ার বছর: {en2bn(2023)}
                    </span>
                  </div>
                  <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#9856ED] rounded-md m-1 lg:m-0">
                    <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                      বকেয়া দাবি: {en2bn(2023)} টাকা{" "}
                    </span>
                  </div>
                  <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#F167A1] rounded-md m-1 lg:m-0">
                    <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                      বকেয়া দাবির সুদ: {en2bn(2023)} টাকা
                    </span>
                  </div>
                  <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#0042EC] rounded-md m-1 lg:m-0">
                    <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                      হাল দাবি: {en2bn(2023)} টাকা
                    </span>
                  </div>
                  <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#D37F00] rounded-md m-1 lg:m-0">
                    <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                      সর্বমোট দাবি: {en2bn(2023)} টাকা
                    </span>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 h-[30px]">
                      <tr className="border border-primary-400 text-white bg-[#A5008A] border-primary">
                        <th className="text-center border border-green-200">
                          মালিকের নাম
                        </th>
                        <th className="text-center border border-green-200 ">
                          মালিকের অংশ
                        </th>
                        <th className="text-center border border-green-200 ">
                          কর পরিশোধের সাল
                        </th>
                        <th className="text-center border border-green-200">
                          তিন বৎসরের ঊর্ধ্বে বকেয়া (সুদ সহ)
                        </th>
                        <th className="text-center border border-green-200">
                          ৩য় বৎসরের বকেয়া (সুদ সহ)
                        </th>
                        <th className="text-center border border-green-200">
                          ২য় বৎসরের বকেয়া (সুদ সহ)
                        </th>
                        <th className="text-center border border-green-200">
                          গত বৎসরের বকেয়া (সুদ সহ)
                        </th>
                        <th className="text-center border border-green-200">
                          হাল সন
                        </th>
                        <th className="text-center border border-green-200">
                          মোট দাবি
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {allData?.land_tax_of_owners?.length > 0 &&
                        allData?.land_tax_of_owners?.map((item, index) => (
                          <tr key={index} className="bg-white text-black">
                            <td className="text-center border lg:w-[10%]">
                              {item?.name}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.land_portion)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.tax_clear_year)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.before_third_year_due_demand)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.third_year_due_demand)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.second_year_due_demand)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.due_demand)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {en2bn(item?.tax_clear_year)}
                            </td>
                            <td className="text-center border lg:w-[10%]">
                              {item?.yearly_demand == null ||
                              item?.yearly_demand == ""
                                ? en2bn(0.0)
                                : en2bn(item?.yearly_demand)}
                            </td>
                          </tr>
                        ))} */}
                    </tbody>
                  </table>
                  <div className="flex justify-between items-center">
                    <p className="px-2">
                      হোল্ডিং সংক্রান্ত আপত্তি বা অভিযোগ দাখিল করতে <Link href="#" className="text-primary underline">আবেদন করুন</Link>
                    </p>
                    <button className="m-2 bg-primary text-white px-4 py-1 rounded-md">কর প্রদান</button>
                  </div>
                </div>
              </div>
            )}

            {state.btnStatus == 1 && (
              <div>
                <div className="pb-5 w-full ">
                  <div className="flex justify-center items-center pb-[10px]">
                    <h3 className="text-16 leading-[18.38px] lg:text-24 lg:leading-[27.58px] font-bold text-[#EDB900] py-3">
                      সাধারণ তথ্য
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-500">
                      <thead className="bg-[#EDB900] ">
                        <tr>
                          <th className="py-[16px] font-normal border border-gray-500">
                            খতিয়ান নং
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500">
                            দাগ নং
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500">
                            জমির শ্রেণী
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500">
                            জমির পরিমাণ (শতক)
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {allData?.general_info?.length > 0 &&
                          allData?.general_info?.map((item, index) => (
                            <tr key={index} className="text-center">
                              <td className="py-3">{en2bn(item?.khatian)}</td>
                              <td className="py-3">{en2bn(item?.dag)}</td>
                              <td className="py-3">{item?.land_type}</td>
                              <td className="py-3">
                                {en2bn(item?.land_amount)}
                              </td>
                            </tr>
                          ))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-center items-center pb-[10px] bg-[#FFD2F5]">
                    <h3 className="text-16 leading-[18.38px] lg:text-24 lg:leading-[27.58px] font-bold text-[#A5008A] py-3">
                      ব্যবহার ভিত্তিক তথ্য
                    </h3>
                  </div>
                  <div className="w-full overflwo-x-auto">
                    <table className="w-full border-collapse border border-gray-500">
                      <thead className="bg-[#A5008A] ">
                        <tr className="text-white">
                          <th className="py-[16px] font-normal border border-gray-500 w-[20%]">
                            জমি ব্যবহারের শ্ৰেণী
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500 w-[20%]">
                            পরিমান (শতক)
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500 w-[20%]">
                            শুরু
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500 w-[20%]">
                            শেষ
                          </th>
                          <th className="py-[16px] font-normal border border-gray-500 w-[20%]">
                            দাবি
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* {allData?.usable_info?.length > 0 &&
                          allData?.usable_info?.map((item) => (
                            <tr className="text-center">
                              <td className="py-3">{item?.land_type}</td>
                              <td className="py-3">{en2bn(item?.amount)}</td>
                              <td className="py-3">{item?.startyear}</td>
                              <td className="py-3">{en2bn(item?.endyear)}</td>
                              <td className="py-3">{en2bn(item?.dabi)}</td>
                            </tr>
                          ))} */}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {state.btnStatus == 2 && (
              <div className="pb-5 w-full ">
                <div className="flex justify-center items-center pb-[10px]">
                  <h3 className="text-16 leading-[18.38px] lg:text-24 lg:leading-[27.58px] font-bold text-primary py-3">
                    অন্তর্ভুক্ত সংস্থা তথ্যাবলী
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-500">
                    <thead className="bg-primary text-white">
                      <tr>
                        <th className="py-[16px] font-normal border border-gray-500">
                          নং
                        </th>
                        <th className="py-[16px] font-normal border border-gray-500">
                          সংস্থা নাম
                        </th>
                        <th className="py-[16px] font-normal border border-gray-500">
                          ক্যাটাগরি
                        </th>
                        <th className="py-[16px] font-normal border border-gray-500">
                          মোবাইল নম্বর
                        </th>
                        <th className="py-[16px] font-normal border border-gray-500">
                          মোট হোল্ডিং
                        </th>
                        <th className="py-[16px] font-normal border border-gray-500">
                          প্রোফাইল
                        </th>
                        <th className="py-[16px] font-normal border border-gray-500">
                          অ্যাকশন
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {related_organization_data?.map((item, index) => (
                        <tr key={index} className="text-center">
                          <td>{en2bn(index + 1)}</td>
                          <td>{item?.organizationName}</td>
                          <td>{item?.category}</td>
                          <td>{item?.phone}</td>
                          <td>{item?.totalHolding}</td>
                          <td>
                            <div className="w-full flex justify-center items-center">
                              <button className="flex items-center space-x-2 bg-[#A5008A] text-white px-4 py-1 rounded-md">
                                <span>
                                  <svg
                                    width="12"
                                    height="13"
                                    viewBox="0 0 12 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M6 6.5C7.65703 6.5 9 5.15703 9 3.5C9 1.84297 7.65703 0.5 6 0.5C4.34297 0.5 3 1.84297 3 3.5C3 5.15703 4.34297 6.5 6 6.5ZM8.24531 7.26406L7.125 11.75L6.375 8.5625L7.125 7.25H4.875L5.625 8.5625L4.875 11.75L3.75469 7.26406C2.08359 7.34375 0.75 8.71016 0.75 10.4V11.375C0.75 11.9961 1.25391 12.5 1.875 12.5H10.125C10.7461 12.5 11.25 11.9961 11.25 11.375V10.4C11.25 8.71016 9.91641 7.34375 8.24531 7.26406Z"
                                      fill="white"
                                    />
                                  </svg>
                                </span>
                                <span>প্রোফাইল</span>
                              </button>
                            </div>
                          </td>
                          <td>
                            <div className="w-full flex justify-center items-center">
                              <button className="flex items-center space-x-2 text-[#CF0000] border border-[#CF0000] px-2 py-1 rounded-md">
                                <span>মুছুন</span>
                                <span>
                                  <svg
                                    width="12"
                                    height="13"
                                    viewBox="0 0 12 13"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.03125 10.25H7.59375C7.66834 10.25 7.73988 10.2204 7.79262 10.1676C7.84537 10.1149 7.875 10.0433 7.875 9.96875L7.875 4.90625C7.875 4.83166 7.84537 4.76012 7.79262 4.70738C7.73988 4.65463 7.66834 4.625 7.59375 4.625H7.03125C6.95666 4.625 6.88512 4.65463 6.83238 4.70738C6.77963 4.76012 6.75 4.83166 6.75 4.90625L6.75 9.96875C6.75 10.0433 6.77963 10.1149 6.83238 10.1676C6.88512 10.2204 6.95666 10.25 7.03125 10.25ZM10.875 2.375L8.94352 2.375L8.14664 1.04609C8.04664 0.879457 7.90517 0.741568 7.73602 0.645865C7.56688 0.550161 7.37583 0.499908 7.18148 0.5L4.81852 0.5C4.62425 0.499989 4.4333 0.550281 4.26424 0.64598C4.09519 0.74168 3.95379 0.879525 3.85383 1.04609L3.05648 2.375H1.125C1.02554 2.375 0.930161 2.41451 0.859835 2.48484C0.789509 2.55516 0.75 2.65054 0.75 2.75L0.75 3.125C0.75 3.22446 0.789509 3.31984 0.859835 3.39017C0.930161 3.46049 1.02554 3.5 1.125 3.5H1.5L1.5 11.375C1.5 11.6734 1.61853 11.9595 1.8295 12.1705C2.04048 12.3815 2.32663 12.5 2.625 12.5H9.375C9.67337 12.5 9.95952 12.3815 10.1705 12.1705C10.3815 11.9595 10.5 11.6734 10.5 11.375V3.5H10.875C10.9745 3.5 11.0698 3.46049 11.1402 3.39017C11.2105 3.31984 11.25 3.22446 11.25 3.125V2.75C11.25 2.65054 11.2105 2.55516 11.1402 2.48484C11.0698 2.41451 10.9745 2.375 10.875 2.375ZM4.7775 1.6932C4.79003 1.67234 4.80777 1.65509 4.82896 1.64314C4.85016 1.63118 4.8741 1.62493 4.89844 1.625L7.10156 1.625C7.12586 1.62497 7.14975 1.63124 7.1709 1.64319C7.19206 1.65515 7.20975 1.67238 7.22227 1.6932L7.63148 2.375L4.36852 2.375L4.7775 1.6932ZM9.375 11.375H2.625L2.625 3.5L9.375 3.5V11.375ZM4.40625 10.25H4.96875C5.04334 10.25 5.11488 10.2204 5.16762 10.1676C5.22037 10.1149 5.25 10.0433 5.25 9.96875L5.25 4.90625C5.25 4.83166 5.22037 4.76012 5.16762 4.70738C5.11488 4.65463 5.04334 4.625 4.96875 4.625H4.40625C4.33166 4.625 4.26012 4.65463 4.20738 4.70738C4.15463 4.76012 4.125 4.83166 4.125 4.90625V9.96875C4.125 10.0433 4.15463 10.1149 4.20738 10.1676C4.26012 10.2204 4.33166 10.25 4.40625 10.25Z"
                                      fill="#CF0000"
                                    />
                                  </svg>
                                </span>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {/* {allData?.general_info?.length > 0 &&
                          allData?.general_info?.map((item, index) => (
                            <tr key={index} className="text-center">
                              <td className="py-3">{en2bn(item?.khatian)}</td>
                              <td className="py-3">{en2bn(item?.dag)}</td>
                              <td className="py-3">{item?.land_type}</td>
                              <td className="py-3">
                                {en2bn(item?.land_amount)}
                              </td>
                            </tr>
                          ))} */}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {/* end */}

            {/* <div className="flex items-center py-2 px-2">
              <div className="px-5 py-2 w-full">
                <>
                  <div className="mx-2 float-left">
                    <OnlinePayment data={[allData, citizen_id]} />
                  </div>
                </>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default HoldingDetails;
