import { useEffect, useState } from "react";
import { en2bn } from '@/halpers/helper.js'
import { CitizenKhotianList } from "../_api/api";

export const revalidate = 50;

const ProgressBar = (citizenInfo) => {
    const [progressPercentage,setProgressPercentage] = useState(0);
    const [backGround,setBackGround] = useState();
    const [allData,setAllData] = useState([]);
    let progress = 0;
    let color = '';
    let khotian = 0;

    const [is_approved,setIs_approved] = useState(0);
    const [nid,setNid] = useState(0);
    const [address,setAddress] = useState(0);
    const [email,setEmail] = useState(0);

    useEffect(()=>{
        const citizen = JSON.parse(citizenInfo?.data?.data);

        // mobile
        if(citizen?.is_approved == 1 || citizenInfo?.is_approved == 1) {
            color = 'bg-[#e01d16]';
            setIs_approved(20);
            setBackGround(color);
        }

        // nid
        if(citizen?.nid != null) {
            color = 'bg-[#e06422]';
            setNid(40);
            setBackGround(color);
        }

        // profile update
        if(citizen?.address != null) {
            color = 'bg-[#e06421]';
            setAddress(10);
            setBackGround(color);
        }
        if(citizen?.email != null) {
            color = 'bg-[#4f9c60]';
            setEmail(10);
            setBackGround(color);
        }

        if(progressPercentage <= 80) {
            CitizenKhotianList(citizen?.id).then(dataArray => {
                setAllData(dataArray);
                if(allData?.length > 0) {
                    // khotian
                    color = 'bg-gradient-to-r from-green-600 to-green5';
                    setBackGround(color);
                }
            });
        }

        
        
    },[progress]);

    if(allData?.length > 0) khotian = 20;
    let totalprogress  = parseInt(is_approved)+parseInt(nid)+parseInt(address)+parseInt(email)+parseInt(khotian);

    return (
        <div className="bg-gray-300 w-full h-2 lg:h-4 rounded-md">
            {/* <div className={`bg-gradient-to-r from-green-600 to-green5 h-2 lg:h-4 rounded-md`} style={{ width: `${progressPercentage}%`}}></div> */}
            {
                totalprogress >= 100 ? <>
                    <div className={` ${backGround} h-2 lg:h-4 rounded-md w-full`}></div>
                    <span className="m-0 m-auto table mt-2">প্রোফাইলের অগ্রগতি {en2bn(totalprogress)}%</span>
                </> : <>
                    <div className={` ${backGround} h-2 lg:h-4 rounded-md `} style={{ width: `${totalprogress}%`}}></div>
                    <span className="m-0 m-auto table mt-2">প্রোফাইলের অগ্রগতি {en2bn(totalprogress)}%</span>
                </> 
            }
        </div>
    );
};

export default ProgressBar;