"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import { en2bn, formatdate, relative_image_path } from "@/halpers/helper";
import { parseCookies } from "nookies";
import Modal from "@/app/_components/Radix/Modal";
import Image from "next/image";
import { toast } from "react-toastify";
import { Payment } from "@/app/_api/api";
import { redirect, useRouter } from "next/navigation";
import InputField from "@/app/_components/FormControl/InputField";
import Select from "@/app/_components/FormControl/Select";

const ComplainForm = dynamic(() => import("../_components/ComplainForm"), {
  ssr: false,
});


export default function HoldingDetails(req) {

  console.log('props : ',req);

  const [allData, setAllData] = useState([]);
  const [btnStatus, setBtnStatus] = useState(0);
  const token = getTokenFromCookie();
  const router = useRouter();

  const [openComplainForm, setOpenComplain] = useState(true);

  const headersOption = {
    Authorization: token,
    "content-type": "application/json",
  };

  const organizationData = parseCookies();

  const holdingId = (req?.data?.id == undefined || req?.data?.id == null) ? req?.data?.holding_id : req?.data?.id;

  const CancelToken = axios.CancelToken;
  const cancelTokenSource = CancelToken.source();

  Object.assign(headersOption, {
    cancelToken: cancelTokenSource.token,
  });

  const [org, setOrg] = useState({});

  useEffect(() => {

    // org = JSON.parse(organizationData?.organizationinfo);
    setOrg(JSON.parse(organizationData?.organizationinfo));

    holdingInfo();
    return () => {
      cancelTokenSource.cancel("Request cancelled.");
    };
  }, []);

  async function holdingInfo() {
    await axios
      .post(
        process.env.BASE_URL_V1 + "/citizenHoldingDetails",
        { holdingId: holdingId },
        { headers: headersOption }
      )
      .then((res) => {
        setAllData(res?.data);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else {
          console.log(err);
        }
      });
  }

  const handleTax = () => {
    setBtnStatus(0);
  };
  const handleInfo = () => {
    setBtnStatus(1);
  };
  const complainform = () => {
    setOpenComplain(!openComplainForm);
    console.log(openComplainForm);
  };

  let land_type_name = [
    '', 'কৃষি', 'চা বাগান', 'কৃষি২', 'আবাসিক', 'বাণিজ্যিক', 'শিল্প', 'ইকোনোমিক জোন'
  ];

  let general_land_type_name = [
    '', 'কান্দা', 'বাড়ী', 'নামা', 'নাল', 'চালা', 'রাস্তা', 'বোরো', 'পতিত', 'ছন', 'নদী', 'পুকুর'
  ];

  // Test

  const [active, setActive] = useState(null);

  let owner_id = "";
  let deposite_by = "";
  let holding_id = "";

  const [formInputs, setFormInputs] = useState({});

  const fromData = (e) => {

    const { name, value } = e.target;

    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };


  if (allData?.statusCode == 200) {
    console.log('Alldata : ', allData);
    if (allData?.land_tax_of_owners?.length > 0) {
      owner_id = 0;
      deposite_by = "সকল মালিক";
      allData?.land_tax_of_owners?.map((item) => {
        holding_id = item?.ldtax_holding_id;
      });
    } else if (allData?.land_tax_of_owners?.length == 1) {
      allData?.land_tax_of_owners?.map((item) => {
        owner_id = item?.id;
        deposite_by = item?.name;
        holding_id = item?.ldtax_holding_id;
      });
    }
  }
  const selectEventForAdvancePayment = (e) => {
    const { name, value } = e;
    setFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  let selectValForAdvancePayment = [
    {
      id: 1,
      val: `১ বছর  (${en2bn(parseFloat(allData?.current_demand))} টাকা)`,
    },
    {
      id: 2,
      val: `২ বছর  (${en2bn(parseFloat(allData?.current_demand) * 2)} টাকা)`,
    },
    {
      id: 3,
      val: `৩ বছর  (${en2bn(parseFloat(allData?.current_demand) * 3)} টাকা)`,
    }
  ];

  const d = new Date();
  let year = d.getFullYear();

  const [loading, setLoading] = useState(false);
  const [checkOtc, setCheckOtc] = useState(0);
  const [otcRes, setOtcRes] = useState(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    let org_id = org?.id;
    e.preventDefault();

    let holdingDabi = 0;
    let holdingTax_clear_year = 0;
    if (allData?.tax_clear_year == year && allData?.total_demand == 0) {
      holdingTax_clear_year = formInputs.advanced_year;
      holdingDabi = parseFloat(allData?.current_demand) * holdingTax_clear_year;
    } else {
      holdingTax_clear_year = 0;
      holdingDabi = parseFloat(formInputs.amount);
    }

    Object.assign(formInputs, {
      holding_id: holding_id,
      amount: holdingDabi,
      advance_year: holdingTax_clear_year,
      depositor_cid: org_id,
      owner_id: owner_id,
      is_app: 0,
      dipositor_nid: '4209176249',
      dipositor_dob: '1999-11-23',
      phone: '01767056733'
    });

    try {
      const res = Payment(formInputs).then(function (data) {
        if (data == undefined || data == null) {
          toast.error('পুনরায় চেষ্টা করুন');
          router.push(`/organization/holding/${holding_id}`);
        }
        // else if (data?.status == 'true') {
        //   toast.success(data?.msg);
        //   // window.open(`${data?.url}`, '_blank');
        //   window.location.assign(`${data?.url}`);
        // }
        else if (data?.status == 'true') {
          if (data?.pay_type == 'otc') {
            setCheckOtc(1);
            setLoading(0);
            setOtcRes(data?.msg);
          } else {
            toast.success(data?.msg);
            window.location.assign(`${data?.url}`);
          }
        }
        else {
          toast.error(data?.msg);
        }

        // setTimeout(() => {
        //   if (window != undefined) window.location.href = `/organization/holding`;
        // }, 10000);
      });
    } catch (error) {
      toast.error('পেমেন্ট সার্ভার ডাউন');
    }
  };

  // End

  return (
    <>
      {openComplainForm == false && (
        <ComplainForm data={allData} back={complainform} />
      )}
      {openComplainForm == true && (
        <div className="pb-4 bg-[#fff] w-full">
          <div className="bg-white border border-[#777777] rounded-md">
            <div className="bg-primary rounded-t-[4px] mb-[9px] lg:mb-[13px]">
              <h3 className="text-white text-center py-[15px]">
                হোল্ডিং তথ্য (হোল্ডিং ট্র্যাকিং)
              </h3>
            </div>
            <div className="px-[13px] lg:px-[16px] pb-[13px] lg:pb-[18px]">
              <div className="items-center justify-start w-full inline-flex pb-[6px]">
                <hr className="w-full h-px bg-[#BABABA] border-0" />
                <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] font-bold">
                  জমি সংক্রান্ত সাধারণ তথ্যাবলী
                </span>
              </div>

              {
                req?.data?.flag == false ? '' : allData?.holding?.is_hold == 0 ?
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
                :
                <div className="flex items-center justify-end space-x-[5px] pb-[12px] lg:pb-[19px]">
                  <p className="text-[10px] leading-[10.11px] lg:text-[14px] lg:leading-[14.16px]">
                    হোল্ডিং স্থগিতের কারণ জানতে
                  </p>

                  <Modal
                    icon={
                      <span>
                        <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#CF0000" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                      </span>
                    }
                    cancelBtn={"বন্ধ করুন"}
                    title={`হোল্ডিং নং : ${en2bn(allData?.holding_no)} এর স্থগিতের কারণ`}
                  >
                    <p className="my-2"><span className="text-800">বিস্তারিত :</span> {allData?.holding?.hold_holdings?.hold_reasons}</p>
                    <br />
                    {
                      allData?.holding?.hold_holdings?.hold_reasons_attachment != null ? (
                        <embed
                          className="min-w-[600px] min-h-[500px]"
                          src={`${process.env.OFFICE_URL}/storage/${allData?.holding?.hold_holdings?.hold_reasons_attachment}`}
                          title=""
                          height="auto"
                          width="100%"
                        ></embed>
                      ) : (<span>কোন সংযুক্তি নেই</span>)
                    }
                    <p className="my-4">
                      {
                        `তারিখ : ${en2bn(formatdate(allData?.holding?.hold_holdings?.created_at))}`
                      }
                    </p>
                  </Modal>
                  <span>ক্লিক করুন</span>



                </div>

              }
              {/* {
                allData?.holding?.is_hold == 0 ?
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
                  :
                  <div className="flex items-center justify-end space-x-[5px] pb-[12px] lg:pb-[19px]">
                    <p className="text-[10px] leading-[10.11px] lg:text-[14px] lg:leading-[14.16px]">
                      হোল্ডিং স্থগিতের কারণ জানতে
                    </p>

                    <Modal
                      icon={
                        <span>
                          <svg className="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path fill="#CF0000" d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z" /></svg>
                        </span>
                      }
                      cancelBtn={"বন্ধ করুন"}
                      title={`হোল্ডিং নং : ${en2bn(allData?.holding_no)} এর স্থগিতের কারণ`}
                    >
                      <p className="my-2"><span className="text-800">বিস্তারিত :</span> {allData?.holding?.hold_holdings?.hold_reasons}</p>
                      <br />
                      {
                        allData?.holding?.hold_holdings?.hold_reasons_attachment != null ? (
                          <embed
                            className="min-w-[600px] min-h-[500px]"
                            src={`${process.env.OFFICE_URL}/storage/${allData?.holding?.hold_holdings?.hold_reasons_attachment}`}
                            title=""
                            height="auto"
                            width="100%"
                          ></embed>
                        ) : (<span>কোন সংযুক্তি নেই</span>)
                      }
                      <p className="my-4">
                        {
                          `তারিখ : ${en2bn(formatdate(allData?.holding?.hold_holdings?.created_at))}`
                        }
                      </p>
                    </Modal>
                    <span>ক্লিক করুন</span>



                  </div>

              } */}

              <div className="flex flex-wrap pb-[16px] lg:pb-[51px]">
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    জেলা
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      {allData?.district}
                    </span>
                  </div>
                </fieldset>
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    উপজেলা/সার্কেল
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      {allData?.upazila}
                    </span>
                  </div>
                </fieldset>
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    মৌজা
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      {allData?.mouja}
                    </span>
                  </div>
                </fieldset>
                <fieldset className="pl-3 border border-[#BABABA] rounded m-2 w-[42%] lg:w-[31%]">
                  <legend className="px-2 text-secondary text-12 leading-[12.14px] lg:text-14 lg:leading-[14.16px]">
                    হোল্ডিং নং
                  </legend>
                  <div className="flex items-center py-[12px]">
                    <span className="text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] px-2 text-[#343434]">
                      {allData?.holding_no == ' ' ? '' : en2bn(parseInt(allData?.holding_no))}
                    </span>
                  </div>
                </fieldset>
              </div>
              <div className="flex space-x-[5px]">
                <button
                  onClick={() => handleTax()}
                  className={`border border-primary px-[29px] py-[16px] lg:px-[58px] lg:py-[15px] rounded-md font-bold text-14 leading-[16.09px] lg:text-16 lg:leading-[18.38px] ${btnStatus == 0
                    ? "bg-primary text-[#fff]"
                    : "text-primary bg-[#fff]"
                    }`}
                >
                  জমির কর
                </button>
                <button
                  onClick={() => handleInfo()}
                  className={`border border-primary px-[29px] py-[16px] lg:px-[58px] lg:py-[15px] rounded-md font-bold text-14 leading-[16.09px] lg:text-16 lg:leading-[18.38px] ${btnStatus == 1
                    ? "bg-primary text-[#fff]"
                    : "text-primary bg-[#fff]"
                    }`}
                >
                  জমির তথ্যাবলী
                </button>
              </div>
            </div>

            {btnStatus == 0 && (
              <div>
                <div className="flex flex-wrap lg:justify-between py-2 px-[13px] lg:px-[16px] pb-[10px] lg:pb-[11px]">

                  <div className="grid grid-rows-2 grid-flow-col gap-4 w-full">
                    <div className="flex justify-between items-center w-full">

                      <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#EC8E00] rounded-md m-1 lg:m-0 w-[33%]">
                        <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                          সর্বশেষ পরিশোধের সাল: {en2bn(allData?.tax_clear_year)}
                        </span>
                      </div>
                      <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#E03BB2] rounded-md m-1 lg:m-0 w-[33%]">
                        <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                          বকেয়ার বছর:{" "}
                          {en2bn(parseInt(allData?.no_of_tax_pending_year))}
                        </span>
                      </div>
                      <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#9856ED] rounded-md m-1 lg:m-0 w-[33%]">
                        <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                          বকেয়া দাবি: {allData?.due_demand == '' ? en2bn(0) : en2bn(parseInt(allData?.due_demand))} টাকা{" "}
                        </span>
                      </div>

                    </div>

                    <div className="flex justify-between items-center w-full">

                      <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#F167A1] rounded-md m-1 lg:m-0 w-[33%]">
                        <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                          বকেয়া দাবির জরিমানা:{" "}
                          {en2bn(parseInt(allData?.due_demand_interest))} টাকা
                        </span>
                      </div>
                      <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#0042EC] rounded-md m-1 lg:m-0 w-[33%]">
                        <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                          হাল দাবি: {en2bn(parseInt(allData?.yearly_demand))} টাকা
                        </span>
                      </div>
                      <div className="px-[14.38px] py-[14px] lg:px-[10px] lg:py-[12px] border border-[#D37F00] rounded-md m-1 lg:m-0 w-[33%]">
                        <span className="text-[11px] leading-[12.64px] lg:text-13 lg:leading-[17.24px]">
                          সর্বমোট দাবি:
                          {
                            en2bn(parseInt(allData?.total_demand))
                          } টাকা

                          {/* {en2bn(parseInt(allData?.total_demand))}  */}
                        </span>
                      </div>

                    </div>
                  </div>

                </div>
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                      <tr className="border border-primary-400 text-white bg-[#12633D] border-primary">
                        <th className="p-2 text-center border border-green-200">
                          সংস্থার নাম
                        </th>

                        {/* <th className="text-center border border-green-200 ">
                          মালিকের পিতার নাম
                        </th> */}
                        <th className="p-2 text-center border border-green-200 ">
                          মোবাইল
                        </th>
                        <th className="p-2 text-center border border-green-200 ">
                          অংশ
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {allData?.land_tax_of_owners?.length > 0 &&
                        allData?.land_tax_of_owners?.map((item, index) => (
                          <tr key={index} className="bg-white text-black">
                            <td className="p-2 text-center border lg:w-[10%]">
                              {item?.name}
                            </td>
                            {/* <td className="text-center border lg:w-[10%]">
                              {item?.father_name}
                            </td> */}
                            <td className="p-2 text-center border lg:w-[10%]">
                              {item?.mobile_no == null || item?.mobile_no == ' ' ? ' ' : en2bn(item?.mobile_no)}
                            </td>
                            <td className="p-2 text-center border lg:w-[10%]">
                              {en2bn(item?.land_portion)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {btnStatus == 1 && (
              <div>
                <div className="pb-5 w-full ">
                  <div className="flex justify-center items-center pb-[10px]">
                    <h3 className="text-16 leading-[18.38px] lg:text-24 lg:leading-[27.58px] font-bold text-[#12633D] py-3">
                      সাধারণ তথ্য
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-500">
                      <thead className="bg-[#12633D] ">
                        <tr className="text-white">
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
                        {allData?.general_info?.length > 0 &&
                          allData?.general_info?.map((item, index) => (
                            <tr key={index} className="text-center">
                              <td className="py-3">{allData?.holding?.khatian_no == ' ' || allData?.holding?.khotian_no == null ? '' : en2bn(allData?.holding?.khotian_no)}</td>
                              <td className="py-3">{item?.dag_no == '' ? '' : en2bn(item?.dag_no)}</td>
                              <td className="py-3">{general_land_type_name[item?.land_type]}</td>
                              <td className="py-3">
                                {item?.amount_of_land == '' || item?.amount_of_land == null ? '' : en2bn(item?.amount_of_land)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="">
                  <div className="flex justify-center items-center pb-[10px] bg-white">
                    <h3 className="text-16 leading-[18.38px] lg:text-24 lg:leading-[27.58px] font-bold text-[#12633D] py-3">
                      ব্যবহার ভিত্তিক তথ্য
                    </h3>
                  </div>
                  <div className="w-full overflwo-x-auto">
                    <table className="w-full border-collapse border border-gray-500">
                      <thead className="bg-[#12633D] ">
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
                          {/* <th className="py-[16px] font-normal border border-gray-500 w-[20%]">
                            দাবি
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {

                          allData?.general_info?.length > 0 &&
                          allData?.general_info?.map((data, index) => (
                            data?.land_usage_info_tax?.length > 0 &&
                            data?.land_usage_info_tax?.map((item) => (
                              <tr className="text-center">
                                <td className="py-3">{land_type_name[item?.land_type]}</td>
                                <td className="py-3">{en2bn(item?.amount)}</td>
                                <td className="py-3">{en2bn(item?.start_year)}</td>
                                <td className="py-3">{en2bn(item?.end_year)}</td>
                                {/* <td className="py-3">{en2bn(item?.current_demand)}</td> */}
                              </tr>
                            ))
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {/* end */}

            {
              allData?.is_approve == 1 && allData?.holding?.is_hold == 0 && allData?.tax_clear_year <= year ? (

                <div className="flex items-center py-2 px-2">
                  <div className="px-5 py-2 w-full">
                    <>
                      <div className="mx-2 float-left">
                        {/* <OnlinePayment data={[allData, org?.user_id]} /> */}

                        <Modal
                          icon={
                            <span className="text-14 leading-[14px] bg-[#12633D] text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md">

                              {allData?.tax_clear_year == year && allData?.total_demand == 0 ? 'অগ্রিম পেমেন্ট' : 'অনলাইন পেমেন্ট'}

                            </span>
                          }
                          cancelBtn={"বন্ধ করুন"}
                          title={''}
                        >

                          {
                            checkOtc == 1 ?
                              <div className="text-gray-500">
                                <div className="text-center">
                                  <span className="text-center"> এ-চালান ( ওটিসি )</span>
                                </div>
                                <div>
                                  {
                                    loading == true ? <button type="button" class="bg-indigo-500 ..." disabled>
                                      <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                      </svg>
                                      লোড হচ্ছে...
                                    </button> : otcRes
                                  }
                                </div>
                              </div>
                              : <>
                                <div className="space-y-6">
                                  <form onSubmit={handleSubmit} >
                                    <div className="text-gray-500">
                                      <div className="text-center">
                                        <h1 className="text-center text-weight-700 my-4 font-bold">
                                          ভূমি উন্নয়ন কর পরিশোধ করতে নিচের তথ্য পূরণ করুন</h1>

                                        <h3 className="my-4 text-14 text-[#12633D] text-weight-700 font-bold">
                                          সর্বমোট দাবি : {en2bn(parseInt(allData?.total_demand))} টাকা
                                        </h3>

                                      </div>



                                      {allData?.tax_clear_year == year && allData?.total_demand == 0 ?

                                        <Select
                                          name="advanced_year"
                                          eventHandel={selectEventForAdvancePayment}
                                          lavel="অগ্রিম বছর"
                                          selectedOption={formInputs.advanced_year}
                                          options={selectValForAdvancePayment.map((option) => ({
                                            value: option.id,
                                            label: option.val,
                                          }))}
                                          required={true}
                                          id="advanced_year"
                                        // anyMessage={serverMessage}
                                        /> :

                                        <>
                                          <InputField
                                            class="border-none w-full"
                                            label="টাকার পরিমাণ"
                                            eventHandel={fromData}
                                            id="amount"
                                            name="amount"
                                            value={formInputs.amount || ''}
                                            required={false}
                                            type="text"
                                            placeholder="টাকার পরিমাণ"
                                          />

                                          {/* <input type="text" id="amount" name="amount" className="w-full my-4" onChange={fromData}/> */}

                                        </>
                                      }
                                    </div>

                                    <hr className="w-full h-px bg-[#BABABA] border-0 mb-2" />
                                    <div className="text-center">
                                      <div className="flex flex-wrap">
                                        <div onClick={() => setActive(1)} className={`m-2 w-[30%] lg:w-[30%]`}>
                                          <fieldset className="border border-gray-500 rounded-md">
                                            <div className="z-10 -mt-3">
                                              {/* <input type="radio" name="" id="" checked={active === 1} /> */}
                                              <input id="ekpay" type="radio" onChange={fromData} value={5} name="pg" required={true}
                                              />
                                            </div>
                                            <div className="flex items-center justify-center mx-2 my-2" htmlFor="ekpay">
                                              <div>
                                                <Image
                                                  className="w-[200]"
                                                  src={relative_image_path("pgicon/ekpay.png")}
                                                  height={300}
                                                  width={300}
                                                  alt="Ekpay"
                                                />
                                              </div>
                                            </div>
                                            <p className="mb-2">একপে</p>
                                          </fieldset>
                                        </div>

                                        <div onClick={() => setActive(2)} className={`m-2 w-[30%] lg:w-[30%]`}>
                                          <fieldset className='border border-gray-500 rounded-md h-full'>
                                            <div className='z-10  -mt-3'>
                                              {/* <input type="radio" name="" id="" checked={active === 2} />   */}
                                              <input id="achalan" type="radio" onChange={fromData} value={99} name="pg" required={true} />
                                            </div>
                                            <div className='flex items-center justify-center mx-2 my-2' htmlFor="achalan">
                                              <div>
                                                <Image className='w-[200]' src={relative_image_path('pgicon/acsonline.jpeg')} height={300} width={300} alt='image error' />
                                              </div>
                                            </div>
                                            <p className="mb-2">এ-চালান ( অনলাইন )</p>
                                          </fieldset>
                                        </div>

                                        <div onClick={() => setActive(3)} className={`m-2 w-[30%] lg:w-[30%]`}>
                                          <fieldset className='border border-gray-500 rounded-md h-full'>
                                            <div className='z-10  -mt-3'>
                                              {/* <input type="radio" name="" id="" checked={active === 2} />   */}
                                              <input id="achalanOtc" type="radio" onChange={fromData} value={98} name="pg" required={true} />
                                            </div>
                                            <div className='flex items-center justify-center  mx-2 my-2 htmlFor="achalanOtc'>
                                              <div>
                                                <Image className='w-auto' src={relative_image_path('pgicon/acsotc.jpeg')} height={1000} width={1000} alt='image error' />
                                              </div>
                                            </div>
                                            <p className="mb-2">এ-চালান ( ওটিসি )</p>
                                          </fieldset>
                                        </div>

                                        <div className="flex justify-end space-x-2">

                                          <button
                                            type="button" onClick={handleSubmit}
                                            className="text-14 leading-[14px] bg-primary text-white px-[37px] py-[10px] lg:px-[61px] lg:py-[12px] rounded-md"
                                            style={{ backgroundColor: "green" }}
                                          >
                                            ই-পেমেন্ট করুন
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </>
                          }
                        </Modal>
                      </div>
                    </>
                  </div>
                </div>
              ) : null
            }
          </div>
        </div >
      )
      }
    </>
  );
}
