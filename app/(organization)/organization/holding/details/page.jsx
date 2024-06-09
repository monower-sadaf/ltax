"use client";

import { useEffect, useState } from "react";
import HoldingDetails from "../../_content/HoldingDetails";
import { useSearchParams } from "next/navigation";

const Home = () => {
  const [organization,setOrganization] = useState({});
    const [org,setOrg] = useState({});

    useEffect(() => {
        if(sessionStorage == undefined){
            let organization_info = JSON.parse(sessionStorage.getItem('organization'));
            setOrganization(organization_info);
            setOrg(organization[0]) ;
        };
    });

  return (
    
    <>
      <HoldingDetails id={org?.id}
      />
    </>
  );
};

export default Home;
