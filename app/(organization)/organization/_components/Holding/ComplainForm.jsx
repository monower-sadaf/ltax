"use client";

import { CreateComplain } from "@/app/_api/api";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const ImageUpload = dynamic(
  () => import("@/app/_components/FormControl/ImageUpload"),
  { ssr: false }
);

export default function ComplainForm(props) {
  const router = useRouter();
  const cookies = parseCookies();
  const citizen = cookies.citizen;
  const [c, setC] = useState({});
  const [formInputs, setFormInputs] = useState({});

  const formData = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFormInputs((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    } else {
      setFormInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  /* useEffect(() => {
    if (window != undefined) {
      const cData = JSON.parse(citizen);
      setC(cData);
    }
  }, []); */

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.assign(formInputs, {
      complainant_name: 'test',
      mobile_no: 'test',
      holding_no: '0123456789',
      office_id: '1',
      division_id: 'props?.data?.division_id',
      district_id: 'props?.data?.district_id',
      upazila_id: 'props?.data?.upazila_id',
      mouja_id: 'props?.data?.mouja_id',
      status: 0,
    });
    const res = CreateComplain(formInputs).then(function (data) {
      toast.success("উক্ত হোল্ডিং এর উপর আপত্তি সফলভাবে সংরক্ষণ করা হয়েছে ।");
      router.push("/citizen/apotti");
    });
  };

  return (
    <>
      <div className="bg-white pb-5 w-full border">
        <div className="bg-primary py-4 mb-[15px] lg:mb-[22px] flex items-center">
          <div className="w-[15%] flex justify-center">
            <button
              onClick={() => {
                props?.back();
              }}
              className="flex items-center justify-center text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] space-x-1 text-white"
            >
              <span>
                <svg
                  className="fill-white"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.88226 2.6825L2.85726 7.7075V8.5925L7.88226 13.6175L8.76726 12.7337L4.75851 8.725H7.11226C10.6285 8.725 12.8685 9.48125 14.2435 10.8862C15.621 12.2925 16.2623 14.4825 16.2623 17.6625V18.1H17.5123V17.6625C17.5123 14.355 16.8535 11.7625 15.1373 10.0112C13.4185 8.25625 10.771 7.475 7.11226 7.475H4.85851L8.76726 3.5675L7.88226 2.6825Z"
                  />
                </svg>
              </span>
              <span>ফিরে যান</span>
            </button>
          </div>
          <h3 className="text-white text-16 leading-[16.18px] lg:text-20 lg:leading-[20.23px] text-center w-[85%]">
            আপত্তি ও অভিযোগ দাখিল ফরম
          </h3>
        </div>
        <form className="px-[20px] lg:px-[44px]" onSubmit={handleSubmit}>
          <div className="pb-[25px]">
            <div className="items-center justify-start w-full inline-flex mb-[15px] lg:pb-[12.61px]">
              <hr className="w-full h-px bg-[#BABABA] border-0" />
              <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] font-medium lg:font-bold">
                সাধারণ তথ্যাবলী
              </span>
            </div>
            <div className="flex flex-col lg:flex-row space-y-[7px] lg:space-y-0 lg:space-x-[39px] items-center">
              <fieldset className="pl-3 border border-[#BABABA] rounded w-full">
                <legend className="text-12 leading-[13.79px] lg:text-14 lg:leading-[14.16px] text-secondary">
                  অভিযোগকারী নাম
                </legend>
                <input
                  id="complainant_name"
                  name="complainant_name"
                  className="border-none w-full focus:ring-0 p-0 text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] lg:py-2"
                  type="text"
                  value={'test'}
                  readOnly
                  onChange={formData}
                />
              </fieldset>
              <fieldset className="pl-3 border border-[#BABABA] rounded w-full">
                <legend className="text-12 leading-[13.79px] lg:text-14 lg:leading-[14.16px] text-secondary">
                  মোবাইল নম্বর
                </legend>
                <input
                  id="mobile_no"
                  name="mobile_no"
                  className="border-none w-full focus:ring-0 p-0 text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] lg:py-2"
                  type="text"
                  value={'1234567890'}
                  readOnly
                  onChange={formData}
                />
              </fieldset>
            </div>
          </div>
          <div className="pb-[25px]">
            <div className="items-center justify-start w-full inline-flex mb-[15px] lg:pb-[12.61px]">
              <hr className="w-full h-px bg-[#BABABA] border-0" />
              <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] font-medium lg:font-bold">
                জমি সংক্রান্ত তথ্য
              </span>
            </div>
            <div className="flex flex-col lg:flex-row space-y-[7px] lg:space-y-0 lg:space-x-[39px] items-center">
              <fieldset className="pl-3 border border-[#BABABA] rounded w-full">
                <legend className="text-12 leading-[13.79px] lg:text-14 lg:leading-[14.16px] text-secondary">
                  হোল্ডিং নং নির্বাচন করুন   
                </legend>
                <select className="w-full border-none focus:ring-0" name="holdingNo" id="">
                  <option value="1">option1</option>
                  <option value="2">option2</option>
                  <option value="3">option3</option>
                  <option value="4">option4</option>
                  <option value="5">option5</option>
                </select>
              </fieldset>
            </div>
          </div>
          <div className="pb-[29px] lg:pb-[45px]">
            <div className="items-center justify-start w-full inline-flex mb-[15px] lg:pb-[12.61px]">
              <hr className="w-full h-px bg-[#BABABA] border-0" />
              <span className="absolute pr-[10px] text-[#0E1F1C] bg-white text-[14px] leading-[16.09px] lg:text-[16px] lg:leading-[18.38px] font-medium lg:font-bold">
                অভিযোগ তথ্যাবলী
              </span>
            </div>
            <div className="flex flex-col space-y-[20px]  items-center">
              <fieldset className="pl-3 border border-[#BABABA] rounded w-full">
                <legend className="text-12 leading-[13.79px] lg:text-14 lg:leading-[14.16px] text-secondary after:content-['_*'] after:text-red-600">
                  অভিযোগ বিষয়
                </legend>
                <input
                  id="subject"
                  name="subject"
                  className="border-none w-full focus:ring-0 p-0 text-12 placeholder:text-12 leading-[13.79px] placeholder:leading-[13.79px] lg:text-15 lg:placeholder:text-15 lg:leading-[17.24px] lg:placeholder:leading-[17.24px] lg:py-2"
                  placeholder="অভিযোগ বিষয়"
                  type="text"
                  onChange={formData}
                  value={formInputs.subject}
                  required
                />
              </fieldset>
              <fieldset className="pl-3 border border-[#BABABA] rounded w-full">
                <legend className="text-12 leading-[13.79px] lg:text-14 lg:leading-[14.16px] text-secondary after:content-['_*'] after:text-red-600">
                  অভিযোগের বিস্তারিত
                </legend>
                <textarea
                  type="text"
                  id="description"
                  name="description"
                  className="border-none w-full focus:ring-0 p-0 text-12 placeholder:text-12 leading-[13.79px] placeholder:leading-[13.79px] lg:text-15 lg:placeholder:text-15 lg:leading-[17.24px] lg:placeholder:leading-[17.24px] lg:py-2"
                  cols="30"
                  rows="10"
                  placeholder="অভিযোগের বিস্তারিত"
                  value={formInputs.details}
                  onChange={formData}
                  required
                ></textarea>
              </fieldset>
            </div>
            
            <div className="my-4">
              <ImageUpload
                label="সংযুক্তি"
                id="attachment"
                name="attachment"
                accept=".jpg, .jpeg, .png, .pdf, .doc, .docx"
                help="সংযুক্তি আবশ্যক"
                placeholder="ডকুমেন্ট সংযুক্তি"
                size="2"
                required={true}
                oldImage={formInputs?.attachment ?? null}
                onChangeHandel={formData}
                icon={faCloudArrowUp}
              />
            </div>

            <div className="flex items-center justify-center w-full">
            </div>
          </div>
          <div className="flex justify-center lg:justify-end space-x-5">
            <button className="text-14 leading-[14px] lg:text-16 lg:leading-[16px] text-white border bg-secondary border-secondary px-5 py-2 rounded-md hover:bg-white hover:text-secondary">
              আবেদন করুন
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
