'use client'

import { useEffect, useState } from "react";

// get session storage data
export const ss = (key) => {

    const [data,setData] = useState();
    useEffect(()=>{
        setData(SessionStorage.getItem(key));
    },[]);

    return data;
}