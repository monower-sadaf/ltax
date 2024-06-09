'use client'
import dynamic from 'next/dynamic';

const Khotian = dynamic(() => import('../_content/Khotian'),{
        ssr:false,
        loading: ()=><p>Loading...</p>
    });

export default function Home() {

    return (<>
        <Khotian />
    </>);
            
}
