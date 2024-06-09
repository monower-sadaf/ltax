import { useEffect, useState } from "react";
import { getTokenFromCookie } from "@/app/_utils/cookieUtils";
import axios from "axios";

const [dabiAdai, setdabiAdai] = useState([]);
const [selectedDivision, setSelectedDivision] = useState(null);
const [selectedDistrict, setSelectedDistrict] = useState([]);
const [selectedUpazila, setSelectedUpazila] = useState([]);
const [selectedOffice, setSelectedOffice] = useState([]);
const [currentLevel, setCurrentLevel] = useState(0);



const token = getTokenFromCookie();

const headersOption = {
    Authorization: token,
    "content-type": "application/json",
};

useEffect(() => {
    if (typeof window !== "undefined") {
        fetchData();
    }
}, []);

const fetchData = async () => {
    try {
        const response = await axios.post(
            process.env.BASE_URL + "/portal/dabiandadayinfo",{headers:headersOption}
        );
        setdabiAdai(response.data);
        setSelectedDivision(response.data);
        setCurrentLevel(0);
    } catch (error) {
        console.error("Error fetching table data:", error);
    }
};

// console.log(hData.data.info);
export const handleDivisionClick = (divisions) => {
    fetchDistrictData(divisions);
};

const fetchDistrictData = async (divisions) => {
    try {
        const req = {
            divisions: divisions
        };
        const response = await axios.post(
            process.env.BASE_URL + "/portal/dabiandadayinfo",req,{headers:headersOption}
        );
        console.log('response ',response.data);
        setSelectedDistrict(response.data);
        setCurrentLevel(1);
    } catch (error) {
        console.error("Error fetching table data:", error);
    }
};

export const handleDistrictClick =  async(district_id) => {
    fetchUpazilaData(district_id);
};

const fetchUpazilaData = async (district_id) => {
    try {
        const req = {
            district_id: district_id
        };
        const response = await axios.post(
            process.env.BASE_URL + "/portal/dabiandadayinfo",req,{headers:headersOption}
        );
        console.log('response ',response.data);
        setSelectedUpazila(response.data);
        setCurrentLevel(2);
    } catch (error) {
        console.error("Error fetching table data:", error);
    }
};

export const handleUpazilaClick = async (upazila_id) => {
    fetchOfficeData(upazila_id)
};

const fetchOfficeData = async (upazila_id) => {
    try {
        const req = {
            upazila_id: upazila_id
        };
        console.log(req);
        const response = await axios.post(
            process.env.BASE_URL + "/portal/dabiandadayinfo",req,{headers:headersOption}
        );
        setSelectedOffice(response.data);
        setCurrentLevel(3);
    } catch (error) {
        console.error("Error fetching table data:", error);
    }
};
