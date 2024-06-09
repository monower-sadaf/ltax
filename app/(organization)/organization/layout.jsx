'use client'

import "@/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import localFont from "next/font/local";
import dynamic from "next/dynamic";
import { parseCookies, setCookie } from "nookies";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

// Font files can be colocated inside of `pages`
export const Inter = localFont({ 
    src: '../../../public/assets/fonts/Inter-Regular.ttf',
    fallback: 'system-ui',
    preload: false,
    display: "swap",
    weight:  "400"
  });
  
  export const ubuntu = localFont({ 
    src: '../../../public/assets/fonts/Ubuntu-Regular.ttf',
    fallback: 'system-ui',
    preload: false,
    display: "swap",
    weight: "400"
  });
  
  export const tiroBangla = localFont({ 
    src: '../../../public/assets/fonts/TiroBangla-Regular.ttf',
    fallback: 'arial',
    preload: false,
    display: "swap",
    weight: "400",
  });
  
  export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false
  }
  
//   export const metadata = {
//     title: 'ভূমি উন্নয়ন কর',
//     icons: {
//       icon: '/assets/images/favicon.png',
//     },
//   };

const Navbar = dynamic(()=> import('./_layout/Navbar'),{
    loading: ()=> {
        return <p>Loading...</p>;
    }
});
const Sidebar = dynamic(()=> import('./_layout/Sidebar'),{
    loading: ()=> {
        return <p>Loading...</p>;
    }
});
const CitizenFooter = dynamic(()=> import('@/app/citizen/layout/CitizenFooter'),{
    loading: ()=> {
        return <p>Loading...</p>;
    }
});

const Layout = ({ children }) => {

    const [org,setOrg] = useState([]);

    useEffect(() => {
        const timer = setTimeout(() => {
          // setLoading(false); // Set loading to false after 2 seconds
        }, 2000);
    
        return () => clearTimeout(timer); // Clear the timer on component unmount
      }, []);

    return (
        <html lang="en">
            <body>
                <ToastContainer />
                <main>
                    <Navbar data={org}/>
                    <div className="bg-[#EFF9F2]">
                        <div className="container mx-auto px-2  mb-[11px] lg:min-h-[82vh]">
                            <div className="flex pt-3 lg:pt-[14px]">
                                <Sidebar />
                                {children}
                            </div>
                        </div>
                        <CitizenFooter />
                    </div>
                </main>
            </body>
        </html>
    );
};

export default Layout;