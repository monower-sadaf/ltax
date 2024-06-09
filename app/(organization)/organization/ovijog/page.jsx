"use client";


import { lazy,Suspense } from "react";
const Ovijog = lazy(() => import("../_content/Ovijog"));


const Home = () => {
    
    return (<>
        <Suspense fallback={<p>Loading...</p>}>
            <Ovijog />
        </Suspense>
    </>);
};

export default Home;