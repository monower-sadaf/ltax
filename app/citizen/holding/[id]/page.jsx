import dynamic from "next/dynamic";
const HoldingDetails = dynamic(()=>import('../../_content/HoldingDetails'),{
    loading: () => <p>Loading Holding details...</p>,
    ssr:false
});

export default function Page ({params}){
    
    return(
        <>
            <HoldingDetails data={[params.id]} />
        </>
    )
} 