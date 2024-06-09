import React from 'react'
import Manual from '../_content/Manual'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <div className="bg-[#FFF]  rounded-lg w-full">
        <div className="py-[20px]">
          <div className="flex flex-col lg:flex-row items-center justify-between lg:px-[32px] pb-[11px] lg:pb-[16px]">
            <div className="flex flex-col items-center lg:items-start pb-3 lg:pb-0">
              <h3 className="text-20 leading-[20.23px] lg:text-24 lg:leading-[24.27px] text-[#0E1F1C] pb-[10px] lg:pb-[6px]">
              নির্দেশিকা/ ম্যানুয়াল
              </h3>
              <p className="text-12 leading-[12.14px] lg:text-14 lg:leading-[12.14px] text-[#777777]">
                ভূমি উন্নয়ন কর সংক্রান্ত নির্দেশিকা/ ম্যানুয়াল
              </p>
            </div>
            <div>
                <Link href={{ 
                  pathname: `${process.env.LDTAX_PORTAL_BASE}/assets/file/LSGCitizenmanual.pdf` 
                }} shallow className="text-[12px] leading-[12.14px] lg:text-[14px] lg:leading-[14.16px] border border-primary flex items-center justify-center space-x-1 px-[8px] py-[6px] rounded-md">
                    <svg class="fill-green-400" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"></path></svg>
                    <span>নাগরিক নির্দেশিকা/ম্যানুয়াল</span>
                </Link>
            </div>
          </div>
          <div className="">
            <Manual/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home