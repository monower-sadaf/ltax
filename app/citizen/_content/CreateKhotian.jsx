"use client";

import InputField from "@/app/_components/FormControl/InputField";
import Select from "@/app/_components/FormControl/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { faCloudArrowUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import ImageUpload from "@/app/_components/FormControl/ImageUpload";
import {
  GetDistricts,
  GetDivisions,
  GetMouja,
  GetUpazila,
  khotianEntry,
} from "@/app/_api/api";
import { parseCookies } from "nookies";
import Image from "next/image";
import { en2bn, relative_image_path } from "@/halpers/helper";
import { redirect, useRouter } from "next/navigation";
import { toast } from "react-toastify";

const CreateKhotian = (citizen_data) => {
  const router = useRouter();
  const [id,setId] = useState({});
  const ownerTypeList = ["own", "heir"];
  const [tabBtn, setTabBtn] = useState("own");
  const [ownerList, setOwnerList] = useState(0);
  const [uttaradhikar, setUttaradhikar] = useState(0);
  const [loader, setLoader] = useState(false);

  const [onerTypeItems, setOnerTypeItems] = useState([
    {
      oner_name: "",
      father_name: "",
      address: "",
      warish_attachment: "",
      relation_with_oner: ""
    },
  ]);

  const [selectedDivision, setSelectedDivision] = useState("");

  const [inputKhotianVal, setInputKhotianVal] = useState("");
  const [inputHoldingVal, setInputHoldingVal] = useState("");

  const [serverMessage, setServerMessage] = useState(false);
  const [fromInputs, setFromInputs] = useState({ owner_type: 0, is_warish: false });
  const [divisionList, setDivisionList] = useState([]);

  const [districtList, setDistrictList] = useState([]);
  const [upazilaList, setUpazilaList] = useState([]);
  const [moujaList, setMoujaList] = useState([]);

  const relationOption = [
    { value: "6", label: "ছেলে" },
    { value: "7", label: "মেয়ে" },
    { value: "8", label: "স্বামী" },
    { value: "9", label: "স্ত্রী" },
  ];

  useEffect(() => {
    GetDivisions().then(function (data){
      setDivisionList(data);
      setTimeout(() => {
        hideLoader();
      }, 1000);
    });
  },[]);

  // const c = JSON.parse(sessionStorage.getItem("citizen"));
  let citizen = parseCookies();
  let c = JSON.parse(citizen?.citizen);

  const changeOwnerType = () => {

    setFromInputs((prevState) => ({
      ...prevState,
      owner_type: 0,
      is_warish: true
    }));

    setOwnerList(1);
    setUttaradhikar(1);
    
  };

  const changechangeOwnerType = () => {

    setFromInputs((prevState) => ({
      ...prevState,
      owner_type: 0,
      is_warish: false
    }));

    setOwnerList(0);
    setUttaradhikar(0);
    setOnerTypeItems([
      {
        oner_name: "",
        father_name: "",
        address: "",
        warish_attachment: "",
        relation_with_oner: "",
      },
    ]);
  };

  const [base64String, setBase64String] = useState('');

  const fromData = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        setBase64String(base64);
      };
      setFromInputs((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    }

    if ( type === "text" || type === "number" || type === "password" || type === "radio") {
      setFromInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const showLoader = () => {
    setLoader(true);
  };

  const hideLoader = () => {
    setLoader(false);
  };

  const selectEvent = (e, name) => {
    const { value } = e;
    setFromInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (value && name == "division_id") {
      GetDistricts(value).then(function (data) {
        showLoader();
        setDistrictList(data);
        setSelectedDivision(value);
        setTimeout(() => {
          hideLoader();
        }, 1000);
      });
    }

    if (name == "district_id" && fromInputs.division_id && value) {
      GetUpazila(value).then(function (data) {
        showLoader();
        setUpazilaList(data);
        setTimeout(() => {
          hideLoader();
        }, 1000);
      });
    }
    if (name == "upazila_id" && fromInputs.district_id && value) {
      GetMouja(value).then(function (data) {
        showLoader();
        setMoujaList(data);
        setTimeout(() => {
          hideLoader();
        }, 1000);
      });
    }
  };

  const addMore = () => {
    let newObject = {
      oner_name: "",
      father_name: "",
      address: "",
      warish_attachment: "",
      relation_with_oner: "",
    };
    setOnerTypeItems([...onerTypeItems, newObject]);
  };

  const removeItem = (index) => {
    let data = [...onerTypeItems];
    data.splice(index, 1);
    setOnerTypeItems(data);
  };

  const onerTypeManage = (index, event) => {
    let data = [...onerTypeItems];
    data[index][event.target.name] = event.target.value;
    setOnerTypeItems(data);

    if (event.target.type === "file") {
      data[index][event.target.name] = event.target.files[0];
      setFromInputs((prevState) => ({
        ...prevState,
        ["warish"]: onerTypeItems,
      }));
    }

    if (
      event.target.type === "text" ||
      event.target.type === "number" ||
      event.target.type === "password" ||
      event.target.type === "radio"
    ) {
      setFromInputs((prevState) => ({
        ...prevState,
        ["warish"]: onerTypeItems,
      }));
    }
  };

  const relation_with_oner = (index, event) => {
    let data = [...onerTypeItems];

    data[index]["relation_with_oner"] = event.value;
    setOnerTypeItems(data);
  };

  const [submitBtnStatus, setSubmitBtnStatus] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtnStatus("loading");

    Object.assign(fromInputs, {
      citizen_id: c?.id,
      divisions:  selectedDivision,
      khotian_no: fromInputs.khotian,
      holding_no: fromInputs.holding,
      owner_type: 0,
    });

    if (onerTypeItems != "")
      Object.assign(fromInputs, { warish: onerTypeItems });

      khotianEntry(fromInputs).then(function () {
        toast.success("আপনার খতিয়ান সফলভাবে যুক্ত হয়েছে ।");
        setTimeout(() => {
          if (window != undefined) window.location.href = "/citizen/khotian";
        }, 10000);
      });
  };


  

  return (
    <>
      {/* <div
        className={`absolute z-50 left-[40%] top-[40%] border border-green1 drop-shadow-2xl flex flex-col justify-center items-center bg-white ${
          loader ? "bg-gray-500 z-40" : "hidden"
        }`}
      >
        <Image
          className=""
          src={relative_image_path("vumi_unnoyon_kor.png")}
          height={200}
          width={200}
          alt="loader image error"
        />
        <p className="text-green-500">লোড হচ্ছে...</p>
      </div> */}

      
      <div className="flex flex-col pb-4 lg:py-9 container mx-auto px-8 bg-[#fff] rounded-md">
        <div className="sm:mx-0.5 lg:mx-0.5">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="sm:mx-0.5 lg:mx-0.5">
              <div className="flex items-center pt-8">
                <div className="text-16 lg:text-[1.3em] lg:w-[250px]">
                  জমি সংক্রান্ত তথ্যাবলী
                </div>
                <span className="border-green-700 border-t-2 w-full"></span>
              </div>
              <div className="flex flex-wrap">
                <div className={`w-full lg:w-[30%] m-2`}>
                  <Select
                    placeholder="বিভাগ নির্বাচন করুন"
                    name="division_id"
                    eventHandel={selectEvent}
                    lavel="বিভাগ"
                    selectedOption={fromInputs.division_id}
                    options={divisionList.map((option, idx) => ({
                      value: option.id,
                      label: option.name_bn,
                    }))}
                    required={true}
                    id="division_id"
                    anyMessage={serverMessage}
                  />
                </div>
                <div className={`w-full lg:w-[30%] m-2`}>
                  <Select
                    placeholder="জেলা নির্বাচন করুন"
                    name="district_id"
                    eventHandel={selectEvent}
                    lavel="জেলা"
                    selectedOption={fromInputs.district_id}
                    options={districtList.map((option, idx) => ({
                      value: option.id,
                      label: option.name_bn,
                    }))}
                    required={true}
                    id="district_id"
                    anyMessage={serverMessage}
                  />
                </div>
                <div className={`w-full lg:w-[30%] m-2`}>
                  <Select
                    placeholder="উপজেলা/সার্কেল নির্বাচন করুন"
                    name="upazila_id"
                    eventHandel={selectEvent}
                    lavel="উপজেলা/সার্কেল"
                    selectedOption={fromInputs.upazila_id}
                    options={upazilaList.map((option, idx) => ({
                      value: option.id,
                      label: option.name_bd,
                    }))}
                    required={true}
                    id="upazila_id"
                    anyMessage={serverMessage}
                  />
                </div>
                <div className={`w-full lg:w-[30%] m-2`}>
                  <Select
                    placeholder="মৌজা নির্বাচন করুন"
                    name="mouja_id"
                    eventHandel={selectEvent}
                    lavel="মৌজা"
                    options={moujaList.map((option, idx) => ({
                      value: option.id,
                      label: option.name_bd+'-'+en2bn(option.jl_no),
                    }))}
                    selectedOption={fromInputs.mouja_id}
                    required={true}
                    id="mouja_id"
                    anyMessage={serverMessage}
                  />
                </div>
                <div className={`w-full lg:w-[30%] m-2`}>
                  <InputField
                    label="খতিয়ান নং"
                    eventHandel={fromData}
                    name="khotian"
                    required={true}
                    type="text"
                    value={fromInputs?.khotian}
                    placeholder="খতিয়ান নং"
                    id="khotian"
                    anyMessage={serverMessage}
                  />
                </div>
                <div className={`w-full lg:w-[30%] m-2`}>
                  <InputField
                    label="হোল্ডিং নং"
                    eventHandel={fromData}
                    id="holding"
                    name="holding"
                    // help="হোল্ডিং নং"
                    required={false}
                    type="text"
                    value={fromInputs?.holding}
                    placeholder="হোল্ডিং নং"
                    anyMessage={serverMessage}
                  />
                </div>
                <div className={`w-full lg:w-[30%] m-2`}>
                  <ImageUpload
                    label="সংযুক্তি"
                    id="attachment"
                    name="attachment"
                    accept=".jpg, .jpeg, .png, .pdf"
                    placeholder="ডকুমেন্ট সংযুক্তি"
                    size="2"
                    help="সংযুক্তি আবশ্যক"
                    required={true}
                    oldImage={fromInputs?.attachment ?? null}
                    onChangeHandel={fromData}
                    anyMessage={serverMessage}
                    icon={faCloudArrowUp}
                  />
                </div>
              </div>

              <div className="flex items-center pt-8">
                <div
                  style={{ width: "250px" }}
                  className="text-[1.3em] text-dark-800"
                >
                  মালিকের ধরন
                </div>
                <span className="border-green-700 border-t-2 w-full"></span>
              </div>

              <div className="flex justify-between mt-5"></div>
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center justify-start lg:space-x-4 lg:mx-2 mb-4">
                <div className="flex flex-wrap">
                  <div className="m-1 flex space-x-2">
                    <input
                      type="radio"
                      name="owner_type_id"
                      id="owner_type_id"
                      className="text-[0.9em]"
                      value={0}
                      onChange={() => changechangeOwnerType()}
                      checked={fromInputs?.is_warish == false}
                    />
                    <label htmlFor="owner_type_id">নিজস্ব মালিকানা</label>
                  </div>
                  <div className="m-1 flex space-x-2">
                    <input
                      type="radio"
                      name="owner_type_id"
                      id="owner_type_idh"
                      className="text-[0.9em]"
                      value={true}
                      onChange={() => changeOwnerType()}
                    />
                    <label htmlFor="owner_type_idh">উত্তরাধিকার মালিকানা</label>
                  </div>
                </div>

                
              </div>

              <div className="relative">

                {uttaradhikar == 1 && (
                  <>
                    <div className="flex flex-wrap">
                      {onerTypeItems?.map((input, index) => {
                        return (
                          <div className="w-full" key={index}>
                            <fieldset className="border border-gray-500 pl-4 rounded-md mb-4">
                              <legend className="">উত্তরাধিকার মালিকানা</legend>
                              <div className="flex justify-end lg:mr-2 relative">
                                <button
                                  className="px-2"
                                  onClick={() => removeItem(index)}
                                >
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    className="w-[0.9375em] h-[0.9375em]"
                                    style={{ color: "red" }}
                                  />
                                </button>
                              </div>
                              <div className="flex gap-2 w-full  lg:space-x-4 mb-4">
                                <div className="flex flex-col lg:flex-row space-y-5 lg:space-y-0 lg:space-x-4 w-[98%]">
                                  <div className="flex flex-col lg:flex-row w-full space-y-5 lg:space-y-0 lg:space-x-4">
                                    <div className="flex flex-col space-y-5 lg:space-y-9 lg:w-full">
                                      <div>
                                        <InputField
                                          label="খতিয়ানের মালিকের নাম"
                                          eventHandel={(e) =>
                                            onerTypeManage(index, e)
                                          }
                                          name="oner_name"
                                          required={true}
                                          type="text"
                                          value={input?.oner_name || ''}
                                          placeholder="খতিয়ানের মালিকের নাম"
                                          anyMessage={serverMessage}
                                        />
                                      </div>
                                      <div>
                                        <InputField
                                          label="পিতা/স্বামীর নাম"
                                          eventHandel={(e) =>
                                            onerTypeManage(index, e)
                                          }
                                          name="father_name"
                                          required={true}
                                          type="text"
                                          value={input?.father_name}
                                          placeholder="পিতা/স্বামীর নাম"
                                          anyMessage={serverMessage}
                                        />
                                      </div>
                                    </div>
                                    <div className="flex flex-col space-y-5 lg:space-y-9 lg:w-full">
                                      <div>
                                        <Select
                                          placeholder="মালিকের সাথে সম্পর্ক"
                                          name="relation_with_oner"
                                          eventHandel={(e) =>
                                            relation_with_oner(index, e)
                                          }
                                          lavel="মালিকের সাথে সম্পর্ক"
                                          selectedOption={
                                            input?.relation_with_oner
                                          }
                                          options={relationOption}
                                          required={true}
                                          id="relation_with_oner"
                                          anyMessage={serverMessage}
                                        />
                                      </div>
                                      <div>
                                        <ImageUpload
                                          label="ওয়ারিসের সনদ / অন্যান্য ডকুমেন্ট সংযুক্তি"
                                          type="file"
                                          id={`warish_attachment${index}`}
                                          name="warish_attachment"
                                          accept=".jpg, .jpeg, .png, .pdf"
                                          placeholder="ডকুমেন্ট সংযুক্তি"
                                          size="2"
                                          required={false}
                                          oldImage={
                                            fromInputs?.["warish"]?.[index]
                                              ?.warish_attachment ?? null
                                          }
                                          onChangeHandel={(e) =>
                                            onerTypeManage(index, e)
                                          }
                                          anyMessage={serverMessage}
                                          icon={faCloudArrowUp}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="">
                                    <fieldset className="pl-3 border border-primary rounded h-[9.4em]">
                                      <legend className="px-2 text-primary text-12 leading-[14.06px]">
                                        ঠিকানা
                                      </legend>
                                      <textarea
                                        onChange={(e) => onerTypeManage(index, e)}
                                        name="address"
                                        required={false}
                                        type="text"
                                        value={input?.address}
                                        placeholder="ঠিকানা"
                                        className="h-full w-full border-none focus:border-none focus:ring-0 placeholder:text-[14px] placeholder:leading-[16.41px] lg:placeholder:text-[16px] lg:placeholder:leading-[18.75px] placeholder:text-[#969696] pl-1.5"
                                      ></textarea>
                                    </fieldset>
                                  </div>
                                </div>
                              </div>
                            </fieldset>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}

                {uttaradhikar == 1 && (
                    <button
                      onClick={() => addMore()}
                      type="button"
                      className="absolute right-0 p-2 text-[10px] ml-2 leading-[10.11px] hover:bg-green-700 hover:text-gray-50 lg:text-12 lg:leading-[12.14px] text-primary border border-primary rounded-sm"
                    >
                      আরও
                    </button>
                  )}
              </div>
            </div>

            <div>
              <button
                disabled={submitBtnStatus == 'loading'}
                type="submit"
                className={`p-3 text-[10px] ml-2 leading-[10.11px]  lg:text-14 lg:leading-[14.16px] border border-primary rounded-lg text-primary hover:bg-primary hover:text-white ${submitBtnStatus == 'loading' && 'cursor-wait'}`}
              >
                {
                  submitBtnStatus == 'loading' ? 'লোড হচ্ছে...' : 'সংরক্ষণ'
                }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateKhotian;
