import Link from "next/link";
import { lazy, Suspense } from "react";
const NidverifyModal = lazy(() => import("./_modals/NidverifyModal"));

const ProfileDataVerify = ({ data }) => {
  return (
    <>
      <div className="bg-white p-4 rounded-lg flex flex-col space-y-2 lg:h-full w-full">
        <div>
          <h3>প্রোফাইল ডাটা যাচাই</h3>
        </div>
        <div className="flex items-center space-x-3">
          <p>মোবাইল নম্বর</p>
          <div>
            <svg
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.8125 6.5C11.8125 9.71016 9.21016 12.3125 6 12.3125C2.78984 12.3125 0.1875 9.71016 0.1875 6.5C0.1875 3.28984 2.78984 0.6875 6 0.6875C9.21016 0.6875 11.8125 3.28984 11.8125 6.5ZM5.32767 9.57767L9.64017 5.26517C9.78661 5.11873 9.78661 4.88129 9.64017 4.73485L9.10985 4.20453C8.96341 4.05807 8.72597 4.05807 8.57951 4.20453L5.0625 7.72152L3.42049 6.07951C3.27405 5.93307 3.03661 5.93307 2.89015 6.07951L2.35983 6.60983C2.21339 6.75627 2.21339 6.99371 2.35983 7.14015L4.79733 9.57765C4.94379 9.72411 5.18121 9.72411 5.32767 9.57767Z"
                fill="#00B132"
              />
            </svg>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <p className="w-[50%]">জাতীয় পরিচয়পত্র</p>
          <div className="w-[50%]">
            {data?.nid == null ? (
              <span>ভেরিফাই করুন করতে এই 
                <Link href={{
                  pathname: `${process.env.SSO_URL}/home`
                }}>লিঙ্কে</Link>
                ভিজিট করুন।</span>
            ) : (
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.8125 6.5C11.8125 9.71016 9.21016 12.3125 6 12.3125C2.78984 12.3125 0.1875 9.71016 0.1875 6.5C0.1875 3.28984 2.78984 0.6875 6 0.6875C9.21016 0.6875 11.8125 3.28984 11.8125 6.5ZM5.32767 9.57767L9.64017 5.26517C9.78661 5.11873 9.78661 4.88129 9.64017 4.73485L9.10985 4.20453C8.96341 4.05807 8.72597 4.05807 8.57951 4.20453L5.0625 7.72152L3.42049 6.07951C3.27405 5.93307 3.03661 5.93307 2.89015 6.07951L2.35983 6.60983C2.21339 6.75627 2.21339 6.99371 2.35983 7.14015L4.79733 9.57765C4.94379 9.72411 5.18121 9.72411 5.32767 9.57767Z"
                  fill="#00B132"
                />
              </svg>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <p className="w-[50%]">জন্ম নিবন্ধন</p>
          <div className="w-[50%]">
            <button className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border hover:bg-primary hover:text-white border-primary px-3 py-2 rounded-lg">
              যাচাই করুন
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <p className="w-[50%]">পাসপোর্ট</p>
          <div className="w-[50%]">
            <button className="text-[10px] leading-[10.11px] lg:text-14 lg:leading-[14.16px] text-primary border hover:bg-primary hover:text-white border-primary px-3 py-2 rounded-lg">
              যাচাই করুন
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileDataVerify;
