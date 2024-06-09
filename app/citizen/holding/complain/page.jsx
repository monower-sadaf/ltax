import dynamic from "next/dynamic";
const ComplainForm = dynamic(() => import('../../_components/ComplainForm'),{ssr:false});

export default function Home(){
    
    return (
        <>
            <ComplainForm/>
        </>
    )
}