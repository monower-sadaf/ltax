import dynamic from "next/dynamic";
const Challan = dynamic(() => import('../_content/Challan'),{
    ssr:false, loading: ()=><p>Loading...</p>
});

export default function Home(){

    return (
        <>
            <Challan />
        </>
    )
}