'use client'
import dynamic from "next/dynamic";

const Holding = dynamic(() => import('../_content/Holding'),{ssr:false});

export default function Home(){

    return (
        <>
            <Holding />
        </>
    )
}