"use client";


import { lazy, Suspense } from "react";
const Faq = lazy(() => import("../_content/Faq"));


const Page = () => {
    
    return (<>
        <Suspense fallback={<p>Loading...</p>}>
            <Faq />
        </Suspense>
    </>)
};

export default Page;