'use client'
import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
const ChangePassword = dynamic(() => import('../_content/ChangePassword'),{ssr:false});

export default function Home(){

    const cookies = parseCookies();
    const citizen = cookies.citizen;

    const [c,setC] = useState({});

    useEffect(() => {
        if(window != undefined && citizen != undefined) {
            const cData = JSON.parse(sessionStorage.getItem("citizen"));
            setC(cData);
        }
    },[]);

    return (<>
        <div className="bg-white w-full p-4 rounded-lg flex justify-center lg:items-center lg:h-[80vh]">
            <ChangePassword c={c} />
        </div>
    </>)
}