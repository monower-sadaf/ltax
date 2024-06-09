"use client";

import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import { useState } from "react";
import axios from "axios";
import stringify from "core-js/es/json/stringify";
import { toast } from "react-toastify";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/navigation";
import { en2bn, bn2en } from "@/halpers/helper";

export default function NidVerifyform(citizenData) {
  const [openModal, setOpenModal] = useState(0);
  const [hidden, setHidden] = useState(true);
  const props = { openModal, setOpenModal };
  const router = useRouter();

  const dd = Array.from({ length: 31 }, (_, index) => index + 1);
  const mm = [
    {
      key: "",
      value: "মাস নির্বাচন করুন",
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

  const userName = citizenData?.username;
  const is_approved = citizenData?.is_approved;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const d = `${bn2en(year)}-${month}-${bn2en(day)}`;

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
      setOpenModal(0);
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
      setOpenModal(0);

      if (is_approved == 1) setVerify(citizenInfo?.nid);

      if (citizenInfo?.nid != null) setNidVerify(citizenInfo?.nid);

      setNid(" ");
      setYear(" ");
      setMonth(" ");
      setDay(" ");
      toast.success("আপনার জাতীয় পরিচয়পত্রটি যাচাই করা হয়েছে ।");
      if (window != undefined) window.location.href = "/citizen";
    } else {
      const errormsg = res?.data?.msg;
      toast.error(errormsg);
      setErrormsg(errormsg);
    }

    setSubmittedData([...submittedData, formData]);
  };

  const HandleModal = () => {
    setHidden(false);
  };

  return (
    <>
      {/* {
        c?.nid == null ? (
          <button onClick={HandleModal} className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-primary px-3 py-2 rounded-lg">যাচাই করুন</button>
        ) : (
          <div className="flex items-center">
            <span><svg xmlns="http://www.w3.org/2000/svg" className="w-[0.726875em]" viewBox="0 0 512 512"><path fill="#00B132" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/></svg></span>
          </div>
        )
      } */}

      <button
        onClick={HandleModal}
        className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border border-primary px-3 py-2 rounded-lg"
      >
        যাচাই করুন
      </button>
      {!hidden && (
        <div
          id="defaultModal"
          tabindex="-1"
          aria-hidden="true"
          className="flex justify-center drop-shadow-2xl fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b  rounded-t">
                <h3 className="text-16 lg:text-24 lg:leading-[24.27px] text-primary m-0 m-auto">
                  এন.আই.ডি তথ্য হালনাগাদ
                </h3>
                <button
                  onClick={() => setHidden(true)}
                  type="button"
                  className="m-0 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="defaultModal"
                  style={{ margin: 0 }}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4">
                <span className="text-center text-800 bg-[#f1dbdb] text-[#cd2828] block">
                  {errormsg}
                </span>
                <div className="pb-4">
                  <div className="mb-2 block">
                    <p className="text-16">জাতীয় পরিচয়পত্র নম্বর</p>
                  </div>
                  <input
                    onChange={(e) => setNid(e.target.value)}
                    className="focus:ring-0 focus:outline-none rounded-md w-full border-gray-300"
                    placeholder="1234567890"
                    id="nid"
                    type="text"
                  />
                </div>
                <div className="mt-3 mb-2">
                  <p className="text-16">জন্ম তারিখ</p>
                </div>
                <div className="w-full flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 pb-[17px] lg:pb-[72px]">
                  <fieldset className="border rounded-md pl-4 lg:w-1/3">
                    <legend className="text-secondary">দিন</legend>
                    <select
                      className="border-none focus:border-none w-full focus:ring-0 text-gray-500"
                      id="day"
                      required
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                    >
                      <option>দিন নির্বাচন করুন</option>
                      {dd?.map((element) =>
                        element?.toString()?.length == 1 ? (
                          <option key={"0" + element}>
                            {en2bn("0" + element)}{" "}
                          </option>
                        ) : (
                          <option key={element}>{en2bn(element)} </option>
                        )
                      )}
                    </select>
                  </fieldset>
                  <fieldset className="border rounded-md pl-4 lg:w-1/3">
                    <legend className="text-secondary">মাস</legend>
                    <select
                      className="border-none focus:border-none w-full focus:ring-0 text-gray-500"
                      id="month"
                      required
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                    >
                      {mm?.map((item, index) => (
                        <option value={item.key}>{item.value}</option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset className="border rounded-md pl-4 lg:w-1/3">
                    <legend className="text-secondary">বছর</legend>
                    <select
                      className="border-none focus:border-none w-full focus:ring-0 text-gray-500"
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
                <div className="w-full flex justify-end space-x-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault(), setHidden(true);
                    }}
                    className="text-12 leading-[12px] lg:text-16 lg:leading-[16px]  border border-gray-400 px-5 py-2 rounded-md hover:bg-[#777777] hover:text-white"
                  >
                    বাতিল
                  </button>
                  <button
                    type="submit"
                    className="text-12 leading-[12px] lg:text-16 lg:leading-[16px] bg-secondary text-50 px-5 py-2 border border-secondary text-[#ffff] rounded-md hover:text-secondary hover:bg-[#FFF]"
                  >
                    যাচাই
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
