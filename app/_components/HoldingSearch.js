'use client'
import { useEffect, useState } from "react";
import { GetDistricts, GetDivisions, GetMouja, GetMoujasByOffices, GetOffice, GetUpazila, HoldingByFiltering } from "../_api/api";
import Select from "./FormControl/Select";
import InputField from "./FormControl/InputField";
import { en2bn } from "@/halpers/helper";
import HoldingByLocation from "./HoldingByLocation";
import { toast } from "react-toastify";

const HoldingSearch = () => {

    const [selectedDivision, setSelectedDivision] = useState("");
    const [serverMessage, setServerMessage] = useState(false);
    const [fromInputs, setFromInputs] = useState({});
    const [divisionList, setDivisionList] = useState([]);
    const [districtList, setDistrictList] = useState([]);
    const [upazilaList, setUpazilaList] = useState([]);
    const [officeList, setOfficeList] = useState([]);
    const [moujaList, setMoujaList] = useState([]);
    const [loader, setLoader] = useState(false);
    const [submitBtnStatus, setSubmitBtnStatus] = useState("success");
    const [data,setData] = useState([]);

    useEffect(() => {
        GetDivisions().then(function (data) {
            setDivisionList(data);
            setTimeout(() => {
                hideLoader();
            }, 1000);
        });
    }, []);

    const fromData = (e) => {
        const { name, value, type } = e.target;

        if (type === "text" || type === "number" || type === "password" || type === "radio") {
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
            GetOffice(value).then(function (data) {
                showLoader();
                setOfficeList(data);
                setTimeout(() => {
                    hideLoader();
                }, 1000);
            });
        }
        if (name == "office_id" && fromInputs.upazila_id && value) {
            GetMoujasByOffices(value).then(function (data) {
                showLoader();
                setMoujaList(data);
                setTimeout(() => {
                    hideLoader();
                }, 1000);
            });
        }
    };

    const HandleHoldingFilter = async (e) => {
        e.preventDefault();
        // setSubmitBtnStatus('loading');
        const response = await HoldingByFiltering(fromInputs);

        toast.success('হোল্ডিং এর তথ্য পাওয়া গিয়েছে')
        setData(response?.data);
        // setSubmitBtnStatus('status');
    }

    // console.log(data);

    return (
        <>  
            <div className="font-semibold text-[1.2em] text-center px-2 my-4 divide-y divide-gray-400">হোল্ডিং অনুসন্ধান</div>

            <div className="w-full bg-white px-2 w-full rounded-lg m-0 m-auto table">
                <form className="grid grid-cols-3 gap-2" onSubmit={(e) => HandleHoldingFilter(e)}>
                        <div className={`w-full m-2`}>
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
                        <div className={`w-full m-2`}>
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
                        <div className={`w-full m-2`}>
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
                        <div className={`w-full m-2`}>
                            <Select
                                placeholder="অফিস নির্বাচন করুন"
                                name="office_id"
                                eventHandel={selectEvent}
                                lavel="অফিস"
                                selectedOption={fromInputs.office_id}
                                options={officeList.map((option, idx) => ({
                                    value: option.id,
                                    label: option.title_bn,
                                }))}
                                required={true}
                                id="office_id"
                                anyMessage={serverMessage}
                            />
                        </div>
                        <div className={`w-full m-2`}>
                            <Select
                                placeholder="মৌজা নির্বাচন করুন"
                                name="mouja_id"
                                eventHandel={selectEvent}
                                lavel="মৌজা"
                                options={moujaList.map((option, idx) => ({
                                    value: option.id,
                                    label: option.name_bd + '-' + en2bn(option.jl_no),
                                }))}
                                selectedOption={fromInputs.mouja_id}
                                required={true}
                                id="mouja_id"
                                anyMessage={serverMessage}
                            />
                        </div>
                        <div className={`w-full m-2`}>
                            <InputField
                                label="খতিয়ান নং"
                                eventHandel={fromData}
                                name="khotian_no"
                                type="text"
                                value={fromInputs?.khotian}
                                placeholder="খতিয়ান নং"
                                id="khotian_no"
                                anyMessage={serverMessage}
                            />
                        </div>
                        <div className={`w-full m-2`}>
                            <InputField
                                label="হোল্ডিং নং"
                                eventHandel={fromData}
                                id="holding_no"
                                name="holding_no"
                                type="text"
                                value={fromInputs?.holding}
                                placeholder="হোল্ডিং নং"
                                anyMessage={serverMessage}
                            />
                        </div>
                        <div className={`col-span-2 w-full m-2`}>
                            <button
                                disabled={submitBtnStatus == 'loading'}
                                type="submit"
                                className={`mt-[5px] p-4 text-[12px] leading-[12.11px]  lg:text-14 lg:leading-[14.16px] border bg-primary border-primary rounded-md text-white hover:bg-white hover:text-primary ${submitBtnStatus == 'loading' && 'cursor-wait'}`}
                            >
                                {
                                submitBtnStatus == 'loading' ? 'লোড হচ্ছে...' : 'অনুসন্ধান করুন'
                                }
                            </button>
                        </div>
                </form>
            </div>

            <div className="w-full">
                <HoldingByLocation holdingList={data}/>
                {/* <HoldingByLocation/> */}
            </div>
                
        </>
    )
}

export default HoldingSearch;