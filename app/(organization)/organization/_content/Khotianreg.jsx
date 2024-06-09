"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ImageUpload from "@/app/_components/FormControl/ImageUpload";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import { GetDistricts, GetDivisions, GetMouja, GetUpazila, khotianEntry } from "@/app/_api/api";
import { createKhotian } from "../_api/api";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import { en2bn } from "@/halpers/helper";

const Khotianreg = () => {
  const route = useRouter();
  const [submitBtnStatus, setSubmitBtnStatus] = useState("success");
  const [fromInputs, setFromInputs] = useState({
    division_id: null,
    district_id: null,
    upazila_id: null,
    mouja_id: null,
    khotian_no: null,
    holding_no: null,
    attachment: null,
    khotian_name: null,
  });
  const [serverMessage, setServerMessage] = useState(false);
  const [districtList, setDistrictList] = useState([]);
  const [upazilaList, setUpazilaList] = useState([]);
  const [moujaList, setMoujaList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState("");
  const [divisionList,setDivisionList] = useState([]);
  // const divisionList = [
  //   {
  //     id: 1,
  //     name_bn: "বরিশাল",
  //   },
  //   {
  //     id: 2,
  //     name_bn: "চট্টগ্রাম",
  //   },
  //   {
  //     id: 3,
  //     name_bn: "ঢাকা",
  //   },
  //   {
  //     id: 4,
  //     name_bn: "খুলনা",
  //   },
  //   {
  //     id: 5,
  //     name_bn: "রাজশাহী",
  //   },
  //   {
  //     id: 6,
  //     name_bn: "রংপূর",
  //   },
  //   {
  //     id: 7,
  //     name_bn: "সিলেট",
  //   },
  //   {
  //     id: 8,
  //     name_bn: "ময়মনসিংহ",
  //   },
  // ];

  useEffect(() => {
    GetDivisions().then(function (data){
      setDivisionList(data);
      setTimeout(() => {
        // 
      }, 1000);
    });
  },[]);

  const selectEvent = (e) => {
    const { name, value } = e.target;

    if (value && name == "division_id") {
      setFromInputs((prev) => {
        return {
          ...prev,
          division_id: value,
        };
      });

      GetDistricts(value).then(function (data) {
        setLoader(true);
        setDistrictList(data);
        setSelectedDivision(value);
        setLoader(false);
      });
    }
    

    if (name == "district_id" && fromInputs.division_id && value) {
      setFromInputs((prev) => {
        return {
          ...prev,
          district_id: value,
        };
      });

      GetUpazila(value).then(function (data) {
        setLoader(true);
        setUpazilaList(data);
        setLoader(false);
      });
    }
    if (name == "upazila_id" && fromInputs.district_id && value) {
      setFromInputs((prev) => {
        return {
          ...prev,
          upazila_id: value,
        };
      });

      GetMouja(value).then(function (data) {
        setLoader(true);
        setMoujaList(data);
        setLoader(false);
      });
    }

    if (name == "mouja_id" && fromInputs.upazila_id && value) {
      setFromInputs((prev) => {
        return {
          ...prev,
          mouja_id: value,
        };
      });
    }
  };

  const fromData = (e) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      setFromInputs((prevState) => ({
        ...prevState,
        [name]: e.target.files[0],
      }));
    }

    if (
      type === "text" ||
      type === "number" ||
      type === "password" ||
      type === "radio"
    ) {
      setFromInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const organizationData = parseCookies();

  const handleSubmit = (e) => {
    e.preventDefault();
    const organization_info = JSON.parse(organizationData?.organization);
    setSubmitBtnStatus("loading");
    Object.assign(fromInputs, {
      citizen_id: organization_info?.id,
      owner_type: 1
    });

    if (fromInputs.division_id == null) {
      toast.warn(" বিভাগ বাছাই করুন");
      setSubmitBtnStatus("success");
      return false;
    } else if (fromInputs.district_id == null) {
      toast.warn(" জেলা বাছাই করুন");
      setSubmitBtnStatus("success");
      return false;
    } else if (fromInputs.upazila_id == null) {
      toast.warn(" উপজেলা বাছাই করুন");
      setSubmitBtnStatus("success");
      return false;
    } else if (fromInputs.mouja_id == null) {
      toast.warn(" মৌজা বাছাই করুন");
      setSubmitBtnStatus("success");
      return false;
    } else if (fromInputs.khotian_no == null) {
      toast.warn(" খতিয়ান নম্বর প্রদান করুন");
      setSubmitBtnStatus("success");
      return false;
    } else if (fromInputs.attachment == null) {
      toast.warn(" সংযুক্তি সংযুক্ত করুন");
      setSubmitBtnStatus("success");
      return false;
    } else if (fromInputs.khotian_name == null) {
      toast.warn(" খতিয়ানের নাম প্রদান করুন");
      setSubmitBtnStatus("success");
      return false;
    }

    khotianEntry(fromInputs)
      .then(function (data) {
        toast.success("আপনার খতিয়ান সফলভাবে যুক্ত হয়েছে ।");
        // route.push("/organization/khotian");
        setTimeout(() => {
          if (window != undefined) window.location.href = "/organization/khotian";
        }, 10000);
      })
      .catch((error) => {
        toast.error("আপনার খতিয়ান যুক্ত হয় নি ।");
        setSubmitBtnStatus("false");
      });
  };

  return (
    <>
      <section className="flex flex-col pb-4 lg:py-9 container mx-auto px-8 bg-[#fff] rounded-md">
        <div className="sm:mx-0.5 lg:mx-0.5">
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <div className="flex items-center pt-8">
              <div className="text-16 lg:text-[1.3em] lg:w-[250px]">
                জমি সংক্রান্ত তথ্যাবলী
              </div>
              <span className="border-green-700 border-t-2 w-full"></span>
            </div>
            <div className="flex flex-wrap">
              <div className={`w-full lg:w-[30%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px] after:content-['_*'] after:text-red-600">
                    বিভাগ
                  </legend>
                  <select
                    onChange={(e) => selectEvent(e)}
                    name="division_id"
                    id="division_id"
                    required
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500 cursor-pointer"
                    disabled={submitBtnStatus == "loading"}
                  >
                    <option value="">বিভাগ নির্বাচন করুন</option>
                    {divisionList.map((option, idx) => (
                      <option key={idx} value={option.id}>
                        {option.name_bn}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
              <div className={`w-full lg:w-[30%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px] after:content-['_*'] after:text-red-600">
                    জেলা
                  </legend>
                  <select
                    onChange={(e) => selectEvent(e)}
                    name="district_id"
                    id="district_id"
                    required
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500 cursor-pointer"
                    disabled={submitBtnStatus == "loading"}
                  >
                    <option value="">জেলা নির্বাচন করুন</option>
                    {districtList.map((option, idx) => (
                      <option key={idx} value={option.id}>
                        {option.name_bn}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
              <div className={`w-full lg:w-[30%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px] after:content-['_*'] after:text-red-600">
                    উপজেলা/সার্কেল
                  </legend>
                  <select
                    onChange={(e) => selectEvent(e)}
                    name="upazila_id"
                    id="upazila_id"
                    required
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500 cursor-pointer"
                    disabled={submitBtnStatus == "loading"}
                  >
                    <option value="">উপজেলা/সার্কেল নির্বাচন করুন</option>
                    {upazilaList.map((option, idx) => (
                      <option key={idx} value={option.id}>
                        {option.name_bd}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
              <div className={`w-full lg:w-[30%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px] after:content-['_*'] after:text-red-600">
                    মৌজা
                  </legend>
                  <select
                    onChange={(e) => selectEvent(e)}
                    name="mouja_id"
                    id="mouja_id"
                    required
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500 cursor-pointer"
                    disabled={submitBtnStatus == "loading"}
                  >
                    <option value="">মৌজা নির্বাচন করুন</option>
                    {moujaList.map((option, idx) => (
                      <option key={idx} value={option.id}>
                        {option.name_bd+' - '+en2bn(option.jl_no)}
                      </option>
                    ))}
                  </select>
                </fieldset>
              </div>
              <div className={`w-full lg:w-[30%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px] after:content-['_*'] after:text-red-600">
                    খতিয়ান নং
                  </legend>
                  <input
                    name="khotian"
                    type="text"
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500"
                    placeholder="খতিয়ান নং"
                    onChange={(e) => {
                      setFromInputs((prev) => {
                        return {
                          ...prev,
                          khotian_no: e.target.value,
                        };
                      });
                    }}
                    value={fromInputs?.khotian_no}
                    required
                    disabled={submitBtnStatus == "loading"}
                  />
                </fieldset>
              </div>
              <div className={`w-full lg:w-[30%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px]">
                    হোল্ডিং নং
                  </legend>
                  <input
                    name="holding_no"
                    type="text"
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500"
                    placeholder="হোল্ডিং নং"
                    onChange={(e) => {
                      setFromInputs((prev) => {
                        return {
                          ...prev,
                          holding_no: e.target.value,
                        };
                      });
                    }}
                    value={fromInputs?.holding_no}
                    disabled={submitBtnStatus == "loading"}
                  />
                </fieldset>
              </div>
              <div className={`w-full lg:w-[30%] m-2`}>
                <ImageUpload
                  label="সংযুক্তি "
                  id="attachment"
                  name="attachment"
                  accept=".jpg, .jpeg, .png, .pdf"
                  placeholder="ডকুমেন্ট সংযুক্তি"
                  size="2"
                  help="সংযুক্তি আবশ্যক"
                  oldImage={fromInputs?.attachment ?? null}
                  onChangeHandel={fromData}
                  anyMessage={serverMessage}
                  icon={faCloudArrowUp}
                  required={true}
                  disabled={submitBtnStatus == "loading" && true}
                />
              </div>
              <div className={`w-full lg:w-[61%] m-2`}>
                <fieldset className="pl-3 border border-primary rounded">
                  <legend className="px-2 text-primary text-12 leading-[14.06px] after:content-['_*'] after:text-red-600">
                    খতিয়ানের নাম
                  </legend>
                  <input
                    name="khotian_name"
                    type="text"
                    className="focus:outline-none focus:ring-0 border-0 w-full rounded-md text-14 text-gray-500"
                    placeholder="খতিয়ানের নাম"
                    onChange={(e) => {
                      setFromInputs((prev) => {
                        return {
                          ...prev,
                          khotian_name: e.target.value,
                        };
                      });
                    }}
                    value={fromInputs?.khotian_name}
                    disabled={submitBtnStatus == "loading"}
                    required
                  />
                </fieldset>
              </div>
            </div>
            <div className="w-full text-center">
              <button
                disabled={submitBtnStatus == "loading"}
                type="submit"
                className={`bg-primary text-white px-6 py-1 rounded-md ${
                  submitBtnStatus == "loading"
                    ? "bg-opacity-70 cursor-wait"
                    : ""
                }`}
              >
                {submitBtnStatus == "loading" ? "লোড হচ্ছে..." : "সংরক্ষণ করুন"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Khotianreg;
