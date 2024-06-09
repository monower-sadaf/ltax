"use client";

import dynamic from "next/dynamic";
import { AppProgressBar } from "next-nprogress-bar";
import DefaultSkeleton from "./_skeleton/DefaultSkeleton";
import { useState, useEffect } from "react";
const Footer = dynamic(() => import("../layouts/FooterSection"), { ssr: false, loading: () => <DefaultSkeleton /> });
const Navbar = dynamic(() => import("../layouts/navbar"), { ssr: false, loading: () => {
  return (<>
    <div className="h-[146px] lg:h-[80px] bg-gray-200 animate-pulse">
    </div>
  </>)
} });
import { Menulist } from "../_api/api";

export default function BaseComponent({ children }) {
  
  const [menu, setmenu] = useState(null);
  useEffect(() => {
    Menulist()
      .then((data) => {
        setmenu(data);
      })
      .catch((err) => {
        // console.error("Server Error: ", err.message); //for production
        throw new Error(["Server Error: ", err.message].join(" ")); //for development
      });
  }, []);


  return (
    <>
      
      <AppProgressBar
        height="4px"
        color="#198754"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <Navbar data={menu} />
      {children}
      <Footer />
    </>
  );
}
