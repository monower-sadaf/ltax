"use client";

import { useState, useEffect } from "react";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import { parseCookies, setCookie } from "nookies";
import { en2bn, bn2en } from "@/halpers/helper";
import axios from "axios";
import stringify from "core-js/es/json/stringify";
import { toast } from "react-toastify";

const NidverifyModal = (citizenData) => {
  const [hidden, setHidden] = useState(true);

  const openModal = () => {
    setHidden(false);
  };

  const closeModal = () => {
    setHidden(true);
  };

  const dd = Array.from({ length: 31 }, (_, index) => index + 1);
  const mm = [
    {
      key: "",
      value: "মাস",
    },
    {
      key: "01",
      value: "জানুয়ারী",
    },
    {
      key: "02",
      value: "ফেব্রুয়ারী",
    },
    {
      key: "03",
      value: "মার্চ",
    },
    {
      key: "04",
      value: "এপ্রিল",
    },
    {
      key: "05",
      value: "মে",
    },
    {
      key: "06",
      value: "জুলাই",
    },
    {
      key: "08",
      value: "আগস্ট",
    },
    {
      key: "09",
      value: "সেপ্টেম্বর",
    },
    {
      key: "10",
      value: "অক্টোবর",
    },
    {
      key: "11",
      value: "নভেম্বর",
    },
    {
      key: "12",
      value: "ডিসেম্বর",
    },
  ];

  const startYear = 1900;
  const endYear = 2010;
  const yyyy = Array.from(
    { length: endYear - startYear + 1 },
    (_, index) => endYear - index
  );

  const [nid, setNid] = useState("");
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [dob, setDob] = useState("");
  const [submittedData, setSubmittedData] = useState([]);
  const [errormsg, setErrormsg] = useState("");

  const [verify, setVerify] = useState(0);
  const [nidVerify, setNidVerify] = useState(null);

  const token = getTokenFromCookie();

  const citizen = parseCookies();
  const c = citizen.citizen;

  const userName = citizenData?.data?.username;
  const is_approved = citizenData?.data?.is_approved;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let dayforbday = bn2en(day);
    const d = `${bn2en(year)}-${month}-${dayforbday.padStart(2,0)}`;

    console.log(d);
    console.log(bn2en(day));

    setDob(d);

    const formData = {
      mobile: userName,
      nid: nid,
      dob: d,
    };

    const headersOption = {
      Authorization: token,
      "content-type": "application/json",
    };

    const res = await axios.post(
      process.env.BASE_URL + "/api/nidCheck",
      formData,
      { headers: headersOption }
    );

    if (res?.data?.status == "true" && res?.data?.data != "") {
      const response = res?.data?.data;
      const dt = stringify(response);
      const parsedNewSessData = window != undefined ? JSON.parse(dt) : {};
      const parsedDataObj = parsedNewSessData?.reduce((acc, item) => {
        acc["data"] = item;
        return acc;
      }, {});

      

      parsedDataObj.data.username = userName;
      parsedDataObj.data.is_approved = is_approved;
      const citizenInfo = parsedDataObj.data;
      const c = stringify(citizenInfo);

      

      Object.assign(citizenInfo, {
        name: citizenInfo?.name,
        email: citizenInfo?.email,
        gender: citizenInfo?.gender,
        nid: citizenInfo?.nid,
        address: citizenInfo?.address,
        father_name: citizenInfo?.father_name,
        mother_name: citizenInfo?.mother_name,
        dob: citizenInfo?.dob,
        is_approved: is_approved,
      });

      const citizend = stringify(citizenInfo);

      

      setCookie(null, "citizen", citizend);

      

      if (is_approved == 1) setVerify(citizenInfo?.nid);

      if (citizenInfo?.nid != null) setNidVerify(citizenInfo?.nid);

      setNid(" ");
      setYear(" ");
      setMonth(" ");
      setDay(" ");
      toast.success("আপনার জাতীয় পরিচয়পত্রটি যাচাই করা হয়েছে ।");
      setHidden(false);
      //relaod the page with react
      window.location.reload();
    } else {
      toast.error(res?.data?.msg);
      const errormsg = res?.data?.msg;
      setErrormsg(errormsg);
      setHidden(false);
    }

    setSubmittedData([...submittedData, formData]);
  };

  return (
    <>
      <button
        onClick={openModal}
        className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border hover:bg-primary hover:text-white border-primary px-3 py-2 rounded-lg"
      >
        যাচাই করুন
      </button>
      {!hidden && (
        <div className="bg-gray-800/50 w-full h-full fixed top-0 left-0 z-50 flex justify-center items-center">
          <div
            id="defaultModal"
            tabIndex="-1"
            aria-hidden="true"
            className="flex justify-center drop-shadow-2xl w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 "
          >
            <div className="relative w-full max-w-2xl max-h-full">
              <div className="relative bg-white rounded-lg shadow">
                <div className="flex items-center justify-center p-4 border-b border-primary  rounded-t">
                  <h3 className="text-16 lg:text-24 lg:leading-[24.27px] text-primary">
                    সংশোধিত এন.আই.ডি তথ্য হালনাগাদ
                  </h3>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                  <div className="pb-4">
                    <p className=" lg:text-20 lg:leading-[20.23px] pb-3">
                      জাতীয় পরিচয়পত্র নম্বর
                    </p>
                    <div className="flex pb-4">
                      <input
                        onChange={(e) => setNid(e.target.value)}
                        type="text"
                        id="nid"
                        className=" rounded-none rounded-l-lg bg-gray-50 border text-gray-900 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  "
                        placeholder="1999845632"
                      />
                      <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-l-0 border-gray-300 rounded-r-md">
                        <svg
                          className="fill-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 576 512"
                        >
                          <path d="M512 80c8.8 0 16 7.2 16 16V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V96c0-8.8 7.2-16 16-16H512zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zM208 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128zm-32 32c-44.2 0-80 35.8-80 80c0 8.8 7.2 16 16 16H304c8.8 0 16-7.2 16-16c0-44.2-35.8-80-80-80H176zM376 144c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376zm0 96c-13.3 0-24 10.7-24 24s10.7 24 24 24h80c13.3 0 24-10.7 24-24s-10.7-24-24-24H376z" />
                        </svg>
                      </span>
                    </div>
                    <div>
                      <p className="lg:text-20 lg:leading-[20.23px]">
                        জন্ম তারিখ
                      </p>
                      <div className="flex flex-wrap lg:justify-between">
                        <fieldset className="border rounded-md pl-4 m-2 w-full lg:w-[30%]">
                          <legend className="text-secondary">দিন</legend>
                          <select
                            className="border-none focus:border-none w-full focus:ring-0 text-gray-500 cursor-pointer"
                            id="day"
                            required
                            value={day}
                            onChange={(e) => setDay(e.target.value)}
                          >
                            <option>দিন নির্বাচন করুন</option>
                            {dd?.map((element) => (
                              <option key={element}>{en2bn(element)}</option>
                            ))}
                          </select>
                        </fieldset>
                        <fieldset className="border rounded-md pl-4 m-2 w-full lg:w-[30%]">
                          <legend className="text-secondary">মাস</legend>
                          <select
                            className="border-none focus:border-none w-full focus:ring-0 text-gray-500 cursor-pointer"
                            id="month"
                            required
                            value={month}
                            onChange={(e) => setMonth(e.target.value)}
                          >
                            <option>মাস নির্বাচন করুন</option>
                            {mm?.map((item, index) => (
                              <option value={item.key}>{item.value}</option>
                            ))}
                          </select>
                        </fieldset>
                        <fieldset className="border rounded-md pl-4 m-2 w-full lg:w-[30%]">
                          <legend className="text-secondary">বছর</legend>
                          <select
                            className="border-none focus:border-none w-full focus:ring-0 text-gray-500 cursor-pointer"
                            id="year"
                            required
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                          >
                            <option>বছর নির্বাচন করুন</option>
                            {yyyy?.map((element) => (
                              <option key={element}>{en2bn(element)}</option>
                            ))}
                          </select>
                        </fieldset>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex justify-end space-x-4">
                    <button
                      onClick={closeModal}
                      className="text-12 leading-[12px] lg:text-16 lg:leading-[16px]  border border-gray-400 px-5 py-2 rounded-md hover:bg-[#777777] text-[#777777] hover:text-white"
                    >
                      বাতিল
                    </button>
                    <button
                      type="submit"
                      className="text-12 leading-[12px] lg:text-16 lg:leading-[16px] bg-secondary text-50 px-5 py-2 border border-secondary rounded-md text-white hover:text-secondary hover:bg-[#FFF]"
                    >
                      যাচাই করুন
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NidverifyModal;
