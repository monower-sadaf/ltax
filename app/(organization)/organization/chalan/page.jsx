'use client';

import dynamic from "next/dynamic";
const Chalan = dynamic(() => import("../_content/Chalan"), {
    ssr: false,
    loading: () => <p>Loading...</p>,
})


const Home = () => {
    return (<>
        <Chalan />
    </>)
};

export default Home;