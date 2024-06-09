"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { usePathname } from "next/navigation";

const OrganizationMenu = dynamic(
  () => import("../_components/OrganizationMenu"),
  { ssr: false, loading: () => <p>Loading...</p> }
);

const IncludedSidebar = dynamic(
  () => import("./IncludedOrganization/IncludedSidebar"),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const Sidebar = () => {
  
  const [hidden, setHidden] = useState(false);
  const path = usePathname();
  return (
    <>
      <div className="hidden lg:flex space-x-[5px] justify-between lg:mr-[11px]">
        {!hidden && (
          <div className={`bg-white rounded-md w-[17.25em] flex flex-col justify-between ${path.includes("included-organization") && 'h-[calc(100vh-9rem)]'}`}>
            {path.includes("included-organization") ? (
              <IncludedSidebar />
            ) : (
              <>
                
                <div>
                  {/* 
                  <button className="w-full bg-red-800 hover:bg-red-700 text-white py-2 mb-2 rounded-md">
                    নন ভেরিফাইড একাউন্ট
                  </button> 
                  */}
                  <ul className="">
                    <OrganizationMenu />
                  </ul>
                </div>
                
              </>
            )}
          </div>
         
        )} 
        
        <div className="mt-[15px]">
          <button onClick={() => setHidden(!hidden)}>
            <svg
              className={hidden ? "rotate-180" : ""}
              width="24"
              height="19"
              viewBox="0 0 24 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24 2.34562H11.1047V0H24V2.34562ZM7.04109 5.39719L4.48875 7.94906H24V10.2947H4.49016L7.04109 12.8452L5.38219 14.5041L0 9.12188V9.12047L1.65891 7.46297L5.38219 3.73828L7.04109 5.39719ZM24 18.2456H11.1047V15.9H24V18.2456Z"
                fill="#12633D"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
