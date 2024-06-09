"use client";
import Link from "next/link";
import { useState } from "react";
import { destroyCookie, parseCookies } from "nookies";
import axios from "axios";

const Dropdown = (prop) => {
  const [active, setActive] = useState(false);

  const loggedOut = () => {
    const cookieForlogOut = parseCookies();
    const citizenToken = JSON.parse(cookieForlogOut?.sso);
    const decoded = citizenToken?.access_token;
    let sso_access_token = "Bearer " + citizenToken?.access_token;

    const logoutHeadersOption = {
      "content-type": "application/json",
      Authorization: sso_access_token,
    };

    if (cookieForlogOut?.citizen) destroyCookie(null, "citizen");
    else if (cookieForlogOut?.organization) destroyCookie(null, "organization");

    destroyCookie(null, "sso");
    destroyCookie(null, "state");

    const { data } = axios.get(`${process.env.SSO_URL}/api/logmeout`, {
      headers: logoutHeadersOption,
    });

    if (window != undefined) {
      window.location.href = `${process.env.SSO_URL}/global-logout`;
    }
  };

  const HandleOver = () => {
    setActive(true);
  };

  const HandleLeave = () => {
    setActive(false);
  };

  const HandleClick = () => {
    setActive(!active);
  };

  return (
    <>
      <div
        onClick={HandleClick}
        onMouseLeave={HandleLeave}
        onMouseOver={HandleOver}
        className=""
      >
        <button
          className={`focus:outline-none font-medium rounded-lg text-sm text-left inline-flex items-center hover:text-magenta ${
            active ? "text-magenta" : "text-slate-950"
          }`}
        >
          {prop?.image != null ? (
            <span className="w-[1.7em] lg:w-[2em] mt-1 rounded-full mr-[7px]">
              <img src={prop?.image} alt="avatar" />
            </span>
          ) : (
            ""
          )}

          {prop?.title == null && prop?.username != null
            ? prop?.username
            : prop?.title}

          <span
            className={`leading-[14.16px] text-14 lg:text-16 lg:leading-[16.18px]  hover:text-magenta ${
              active ? "text-magenta" : "text-slate-950"
            }`}
          >
            {prop.heading}
          </span>
          <svg
            className={`w-2.5 h-2.5 ml-2 transition-transform duration-300 ${
              active && "rotate-180"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          className={`${active ? "block" : "hidden"} absolute z-50  ${
            prop?.button && "right-10"
          }  bg-white divide-y divide-gray-100 rounded-md min-w-[8.5em] shadow`}
        >
          <ul className="py-1 text-semiblack flex flex-col space-y-2 text-16">
            {prop?.link?.map((item, index) => (
              <li
                key={index}
                className="block px-4 py-1 hover:bg-gray-200/60 hover:text-magenta text-left  text-xs lg:text-sm"
              >
                <Link
                  prefetch={false}
                  target={item?.url.includes("http") ? "_blank" : "_self"}
                  href={{ pathname: item?.url }}
                  shallow={!item?.external}
                >
                  {item?.text}
                </Link>
              </li>
            ))}
            {prop?.button?.length > 0 &&
              prop?.button?.map((item, index) => (
                <li
                  key={index}
                  className="block px-4 py-1 hover:bg-gray-200/60 hover:text-magenta text-left text-xs lg:text-sm"
                >
                  <button onClick={loggedOut}>{item?.text}</button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dropdown;
