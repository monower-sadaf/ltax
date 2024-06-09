import dynamic from "next/dynamic";

const FeedBackList = dynamic(() => import('../../_content/FeedBackList'),{ssr:false});

export default function Home({params}) {
    return (
       <FeedBackList data={params.id}/>
    );
}