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

  const [o,setO] = useState([]);

  const orgCookie = parseCookies();

  useEffect(() => {
    if (window != undefined) {
      const cData = JSON.parse(orgCookie.organization);
      setC(cData);
      const oData = JSON.parse(orgCookie.organizationinfo);
      setO(oData);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Object.assign(formInputs, {
      holding_no: props?.data?.holding?.id,
      division_id: props?.data?.division_id,
      district_id: props?.data?.district_id,
      upazila_id: props?.data?.upazila_id,
      office_id: props?.data?.office_id,
      mouja_id: props?.data?.mouja_id,
      user_id: c?.id,
      complainant_name: o?.org_name,
      mobile_no: c?.org_mobile,
      subject: formInputs?.subject,
      description: formInputs?.description,
      attachment: formInputs?.attachment,
      status: 0,
    });
    const res = CreateComplain(formInputs).then(function (data) {
      toast.success(data.msg);
      router.push("/organization/ovijog");
    });
  };

  console.log('Complain : ',o?.org_name);

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
                জমি সংক্রান্ত সাধারণ তথ্যাবলী
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
                  value={o?.org_name}
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
                  value={c?.username}
                  readOnly
                  onChange={formData}
                />
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
                {/* <input className="border-none w-full focus:ring-0 p-0 text-12 leading-[13.79px] lg:text-15 lg:leading-[17.24px] lg:py-2" type="text" /> */}
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

            {/* <fieldset className="border border-[#BABABA] rounded w-full hover:bg-gray-100"> */}
            {/* <legend className="text-12 leading-[13.79px] lg:text-14 lg:leading-[14.16px] text-secondary">সংযুক্তি</legend> */}
            <div className="flex items-center justify-center w-full">
              {/* <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"> */}
              {/* <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                    </div>
                                    <input id="attachment" name="attachment" type="file" className="hidden" onChange={formData} /> */}

              {/* <ImageUpload
                                        label="সংযুক্তি"
                                        id="attachment"
                                        name="attachment"
                                        accept=".jpg, .jpeg, .png"
                                        help="সংযুক্তির ধরণ jpg, jpeg, png টাইপের হবে"
                                        placeholder="সংযুক্তি"
                                        size="40"
                                        required={false}
                                        // oldImage={formInputs?.attachment ?? null}
                                        onChangeHandel={formData}
                                        icon={faCloudArrowUp}
                                    /> */}
              {/* </label> */}
            </div>
            {/* </fieldset> */}
          </div>
          {/* </div> */}
          <div className="flex justify-center lg:justify-end space-x-5">
            {/* <button type="button" className="text-14 leading-[14px] lg:text-16 lg:leading-[16px] text-[#777777] border border-[#777777] px-5 py-2 rounded-md hover:bg-[#777777] hover:text-white">বাতিল</button> */}
            <button className="text-14 leading-[14px] lg:text-16 lg:leading-[16px] text-white border bg-secondary border-secondary px-5 py-2 rounded-md hover:bg-white hover:text-secondary">
              আবেদন করুন
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
