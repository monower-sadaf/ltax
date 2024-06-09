'use client'

import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
const Ovijogdetails = dynamic(() => import("../../_content/Ovijogdetails"), {
    loading: () => <p>Loading...</p>,
});


const Page = () => {
    
    const params = useParams();
    return (<>
        <Ovijogdetails id={params?.id} />
    </>);
};

export default Page;