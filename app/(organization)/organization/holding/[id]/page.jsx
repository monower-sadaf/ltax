'use client';

import HoldingDetails from "../../_content/HoldingDetails";

const Home = ({params}) => {
    return (<>
        <HoldingDetails data={params}/>
    </>)
};

export default Home;