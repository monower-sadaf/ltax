"use client"

import InputField from "@/app/_components/FormControl/InputField";
import Select from "@/app/_components/FormControl/Select";
import { useEffect, useState } from "react";
import { GetDistricts } from "../_api/api";

const CommonFilter = () => {

    const [onerTypeItems, setOnerTypeItems] = useState([{
        oner_name: '',
        father_name: '',
        address: '',
        document: '',
        relation_with_oner: '',
    }]);

    const [serverMessage, setServerMessage] = useState(false);
    const [fromInputs, setFromInputs] = useState({});
    const [divisionList, setDivisionList] = useState([
        {
            'value': 1,
            'label': "বরিশাল"
        },
        {
            'value': 2,
            'label': "চট্টগ্রাম"
        },
        {
            'value': 3,
            'label': "ঢাকা"
        },
        {
            'value': 4,
            'label': "খুলনা"
        },
        {
            'value': 5,
            'label': "রাজশাহী"
        },
        {
            'value': 6,
            'label': "রংপূর"
        },
        {
            'value': 7,
            'label': "সিলেট"
        },
        {
            'value': 8,
            'label': "ময়মনসিংহ"
        },
    ]);

    
    const [districtList, setDistrictList] = useState([
        {
            'value': 1,
            'label': "lavel 1"
        },
        {
            'value': 2,
            'label': "lavel 2"
        },
        {
            'value': 3,
            'label': "lavel 3"
        },
        {
            'value': 4,
            'label': "lavel 4"
        },
    ]);
    

    const [upazilaList, setUpazilatList] = useState([
        {
            'value': 1,
            'label': "lavel 1"
        },
        {
            'value': 2,
            'label': "lavel 2"
        },
        {
            'value': 3,
            'label': "lavel 3"
        },
        {
            'value': 4,
            'label': "lavel 4"
        },
    ]);
    const [mowjhaList, setMowjhaList] = useState([
        {
            'value': 1,
            'label': "lavel 1"
        },
        {
            'value': 2,
            'label': "lavel 2"
        },
        {
            'value': 3,
            'label': "lavel 3"
        },
        {
            'value': 4,
            'label': "lavel 4"
        },
    ]);
    const [khotianList, setKhotianList] = useState([
        {
            'value': 1,
            'label': "lavel 1"
        },
        {
            'value': 2,
            'label': "lavel 2"
        },
        {
            'value': 3,
            'label': "lavel 3"
        },
        {
            'value': 4,
            'label': "lavel 4"
        },
    ]);

    const selectEvent = (e, name) => {
        const { id } = e;
        setFromInputs(prevState => ({
            ...prevState,
            [name]: id
        }));
    }

    const fromData = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFromInputs(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        }

        if (type === 'text' || type === 'number' || type === 'password' || type === 'radio') {
            setFromInputs(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    }

    // const [districtList,setDistrictList] = useState([]);

    useEffect(() => {
        // GetDistricts(1).then(dataArray => {
        //     setDistrictList(dataArray);
        // });
        
    });

    // console.log('districtList ',districtList);

    const fromData = (e) => {
        const { name, value, type } = e.target;
        if (type === 'file') {
            setFromInputs(prevState => ({
                ...prevState,
                [name]: e.target.files[0]
            }));
        }

        if (type === 'text' || type === 'number' || type === 'password' || type === 'radio') {
            setFromInputs(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

    }

    return (
        <>
            <div className="flex items-center pt-8">
                <div style={{ width: '200px' }} className="text-[1em] text-bold-800 mb-5">জমি সংক্রান্ত তথ্যাবলী</div>
                <span className="border-green-700 border-t-2 w-full mb-5"></span>
            </div>

            <div className="flex flex-wrap justify-between">
                <div className="basis-1/4">
                    <Select
                        placeholder="বিভাগ"
                        name="division_id"
                        eventHandel={selectEvent}
                        lavel="বিভাগ"
                        options={divisionList}
                        selectedOption={fromInputs.division_id}
                        required={true}
                        id="division_id"
                        anyMessage={serverMessage}
                    />
                </div>
                <div className="basis-1/4">
                    <Select
                        placeholder="জেলা"
                        name="district_id"
                        eventHandel={selectEvent}
                        lavel="জেলা"
                        options={districtList}
                        selectedOption={fromInputs.district_id}
                        required={true}
                        id="district_id"
                        anyMessage={serverMessage}
                    />
                </div>
                <div className="basis-1/4">
                    <Select
                        placeholder="উপজেলা/সার্কেল"
                        name="upazila_id"
                        eventHandel={selectEvent}
                        lavel="উপজেলা/সার্কেল"
                        options={upazilaList}
                        selectedOption={fromInputs.upazila_id}
                        required={true}
                        id="upazila_id"
                        anyMessage={serverMessage}
                    />
                </div>
            </div>

            <div className="flex flex-wrap justify-between">
                <div className="basis-1/4">
                    <Select
                        placeholder="মৌজা"
                        name="mowjha_id"
                        eventHandel={selectEvent}
                        lavel="মৌজা"
                        options={upazilaList}
                        selectedOption={fromInputs.mowjha_id}
                        required={true}
                        id="mowjha_id"
                        anyMessage={serverMessage}
                    />
                </div>

                <div className="basis-1/4">
                    <Select
                        placeholder="খতিয়ান"
                        name="khotian_id"
                        eventHandel={selectEvent}
                        lavel="খতিয়ান"
                        options={upazilaList}
                        selectedOption={fromInputs.khotian_id}
                        required={true}
                        id="khotian_id"
                        anyMessage={serverMessage}
                    />
                </div>
                <div className="basis-1/4">
                    <InputField
                        label="হোল্ডিং নং"
                        eventHandel={fromData}
                        name="holding"
                        // help="হোল্ডিং নং"
                        required={true}
                        type="text"
                        value={fromInputs?.holding}
                        placeholder="হোল্ডিং নং"
                        anyMessage={serverMessage}
                    />
                </div>
            </div>
        </>

        
        
        
    )
}

export default CommonFilter;