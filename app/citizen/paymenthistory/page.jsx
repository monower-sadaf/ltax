'use client'

import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
const PaymentHistoryList = dynamic(() => import('@/app/_components/PaymentHistoryList'),{ssr:false, loading: ()=><p>Loading...</p>});

const Home = () => {

    const cookies = parseCookies();
    const cookieInfo = cookies.citizen;

    const [user,setUser] = useState({});

    useEffect(() => {
        let info = JSON.parse(cookieInfo);
        setUser(info)
    },[]);
    
    console.log(user);

    return (
        <>  
            <PaymentHistoryList data={user?.id}/>
        </>
    )
}

export default Home ;