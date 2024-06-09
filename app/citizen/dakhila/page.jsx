'use client'
import dynamic from "next/dynamic";
const Dakhila = dynamic(() => import('../_content/Dakhila'),{ssr:false, loading: ()=><p>Loading...</p>});

export default function Home(){

    return (
        <>  
            <Dakhila/>
        </>
    )
}