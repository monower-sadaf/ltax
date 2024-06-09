'use client';

import dynamic from "next/dynamic";
import { parseCookies } from "nookies";
import { useEffect } from "react";

const Dakhila = dynamic(()=> import('../_content/Dakhila'),{ loading: () => <p>Loading...</p>});

const Home = () => {

    let organization = '';

    const organizationData = parseCookies();

    useEffect(() => {
        organization = JSON.parse(organizationData?.organization);
    },[]);


    return (<>
    
        <Dakhila id={organization?.id} />
    </>);
};

export default Home;