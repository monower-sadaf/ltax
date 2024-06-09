"use client";

import { useState } from "react";
import Link from "next/link";
import Menu from "@/app/layouts/Menu";

const Mobilemenu = () => {
  const [active, setActive] = useState(false);

  const clickHandler = () => {
    setActive(!active);
  };

  return (
    <div className="lg:hidden">
      <div className="px-2 pb-1 flex justify-between md:hidden">
        <button
          onClick={clickHandler}
          className="outline-none mobile-menu-button"
        >
          <span className="text-[28px]">
            <svg
              className="fill-primary"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </span>
        </button>

        <div className="flex justify-center items-center space-x-2">
          <Link
            href={{ pathname: process.env.OFFICE_LOGIN_URL }}
            target="_blank"
            className="flex items-center justify-center space-x-1 border border-primary h-[35px] rounded-md px-2"
          >
            <span className="text-primary">
              <svg
                width="14"
                height="16"
                viewBox="0 0 14 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 8C9.20938 8 11 6.20937 11 4C11 1.79063 9.20938 0 7 0C4.79063 0 3 1.79063 3 4C3 6.20937 4.79063 8 7 8ZM9.99375 9.01875L8.5 15L7.5 10.75L8.5 9H5.5L6.5 10.75L5.5 15L4.00625 9.01875C1.77812 9.125 0 10.9469 0 13.2V14.5C0 15.3281 0.671875 16 1.5 16H12.5C13.3281 16 14 15.3281 14 14.5V13.2C14 10.9469 12.2219 9.125 9.99375 9.01875Z"
                  fill="#12633D"
                />
              </svg>
            </span>
            <span className="text-12 text-primary">প্রশাসনিক লগইন</span>
          </Link>
          <Link
            href={{ pathname: process.env.LOGIN_URL }}
            shallow
            className="flex items-center justify-center space-x-3 bg-primary h-[35px] rounded-md px-2"
          >
            <span className="text-white">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.4 7.20039C3.2825 7.20039 4 6.48289 4 5.60039C4 4.71789 3.2825 4.00039 2.4 4.00039C1.5175 4.00039 0.8 4.71789 0.8 5.60039C0.8 6.48289 1.5175 7.20039 2.4 7.20039ZM13.6 7.20039C14.4825 7.20039 15.2 6.48289 15.2 5.60039C15.2 4.71789 14.4825 4.00039 13.6 4.00039C12.7175 4.00039 12 4.71789 12 5.60039C12 6.48289 12.7175 7.20039 13.6 7.20039ZM14.4 8.00039H12.8C12.36 8.00039 11.9625 8.17789 11.6725 8.46539C12.68 9.01789 13.395 10.0154 13.55 11.2004H15.2C15.6425 11.2004 16 10.8429 16 10.4004V9.60039C16 8.71789 15.2825 8.00039 14.4 8.00039ZM8 8.00039C9.5475 8.00039 10.8 6.74789 10.8 5.20039C10.8 3.65289 9.5475 2.40039 8 2.40039C6.4525 2.40039 5.2 3.65289 5.2 5.20039C5.2 6.74789 6.4525 8.00039 8 8.00039ZM9.92 8.80039H9.7125C9.1925 9.05039 8.615 9.20039 8 9.20039C7.385 9.20039 6.81 9.05039 6.2875 8.80039H6.08C4.49 8.80039 3.2 10.0904 3.2 11.6804V12.4004C3.2 13.0629 3.7375 13.6004 4.4 13.6004H11.6C12.2625 13.6004 12.8 13.0629 12.8 12.4004V11.6804C12.8 10.0904 11.51 8.80039 9.92 8.80039ZM4.3275 8.46539C4.0375 8.17789 3.64 8.00039 3.2 8.00039H1.6C0.7175 8.00039 0 8.71789 0 9.60039V10.4004C0 10.8429 0.3575 11.2004 0.8 11.2004H2.4475C2.605 10.0154 3.32 9.01789 4.3275 8.46539Z"
                  fill="white"
                />
              </svg>
            </span>
            <span className="text-12 text-white">নাগরিক কর্ণার</span>
          </Link>
        </div>
      </div>

      {active && (
        <div className="z-50">
          <Menu />
        </div>
      )}
    </div>
  );
};

export default Mobilemenu;
