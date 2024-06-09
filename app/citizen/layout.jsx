'use client'

import '@/app/globals.css'

import { Inter } from 'next/font/google'

import { ToastContainer } from 'react-toastify'
import { Suspense, useEffect, useState } from 'react'
import Script from 'next/script'
import CitizenNavBar from './layout/CitizenNavbar';
import CitizenSidebar from './layout/CitizenSidebar';
import CitizenFooter from './layout/CitizenFooter';
import { parseCookies } from 'nookies'
import { public_image_path } from '@/halpers/helper'
import "react-toastify/dist/ReactToastify.css";

export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

// export const metadata = {
//   title: 'ভূমি উন্নয়ন কর',
//   icons: {
//     icon: '/assets/images/favicon.png',
//   },
// };

const Layout = ({ children }) => {

  const citizenInfo = parseCookies();
  const citizen2 = citizenInfo.citizen;

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer on component unmount
  }, []);

  
  var sso =  parseCookies('sso');
  const token = sso?.accessToken;
  const widgets_id = '9a5fd1b0-a9fd-4c5c-a973-83432462a5a5';

  return (
<html>
   <head>
        <title>ভূমি উন্নয়ন কর</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale = 1.0,maximum-scale=1.0, user-scalable=no"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta
          httpEquiv="cache-control"
          content="no-cache, no-store, must-revalidate"
        />
        {/* <link
          href={`/public/assets/images/favicon.png`}
          as="image"
        /> */}
      </head> 
  <body>
    <ToastContainer autoClose={8000}/>
    { loading ?  (
      <span className="absolute top-[50%] left-[50%] p-2 flex h-3 w-3 translate-x-2/4 translate-y-2/4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
      </span>

    ) : (
        <>
          
          <Suspense fallback={<p>Loading...</p>}>
            <CitizenNavBar citizen={citizen2}
            />
          </Suspense>
          <section className="bg-[#EFF9F2]">
            <div className="container mx-auto px-2  mb-[11px] lg:min-h-[82vh]">
              <div className="flex pt-3 lg:pt-[14px]">
                <Suspense fallback={<p>Loading...</p>}>
                  <CitizenSidebar data={citizen2} />
                </Suspense>
                {/* <BaseContentComponent> */}
                  {children}
                {/* </BaseContentComponent> */}
              </div>
            </div>
            <Suspense fallback={<p>Loading...</p>}>
              <CitizenFooter />
            </Suspense>
          </section>
          <Script src="https://idp-devsso.land.gov.bd/js/mysoft-widgets-plugin.js">
          </Script>
        </>
    )
  }
    </body>
    </html>
  );
};

export default Layout;
