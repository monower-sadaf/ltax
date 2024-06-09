import Link from "next/link";
import Image from "next/image";
import {
  convertEnglishDateToBangla,
  dDate,
  dateName,
  relative_image_path,
} from "@/halpers/helper";
import dynamic from "next/dynamic";
import logo2 from "@/public/assets/images/logo2.webp";
import logo3 from "@/public/assets/images/smart_ldtax_portal_logo2.webp";
import { FaCalendarAlt } from "react-icons/fa";
import Menu from "./Menu";
import ScrollToTop from "../_components/ScrollToTop/ScrollToTop";
const Mobilemenu = dynamic(
  () => import("../(home)/_components/Mobilemenu/Mobilemenu"),
  {
    ssr: false,
  }
);
const Navbar = () => {
  return (
    <>
      <ScrollToTop />
      <div className="lg:hidden bg-secondary flex items-center justify-center p-3">
        <svg
          className="mr-3"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.75 3.5H19.5V2H18V3.5H6V2H4.5V3.5H2.25L1.5 4.25V22.25L2.25 23H21.75L22.5 22.25V4.25L21.75 3.5ZM21 21.5H3V8H21V21.5ZM21 6.5H3V5H21V6.5ZM6 12.5H4.5V14H6V12.5ZM4.5 15.5H6V17H4.5V15.5ZM6 18.5H4.5V20H6V18.5ZM9 12.5H10.5V14H9V12.5ZM10.5 15.5H9V17H10.5V15.5ZM9 18.5H10.5V20H9V18.5ZM10.5 9.5H9V11H10.5V9.5ZM13.5 12.5H15V14H13.5V12.5ZM15 15.5H13.5V17H15V15.5ZM13.5 18.5H15V20H13.5V18.5ZM15 9.5H13.5V11H15V9.5ZM18 12.5H19.5V14H18V12.5ZM19.5 15.5H18V17H19.5V15.5ZM18 9.5H19.5V11H18V9.5Z"
            fill="#FFFFFF"
          />
        </svg>
        <p className="text-white text-12">
          ১৬ চৈত্র ১৪২৯ / বৃহস্পতিবার, মার্চ ৩০, ২০২৩
        </p>
      </div>
      <nav className="px-3 md:px-0 md:py-3 bg-[#FFFFFF] drop-shadow-lg sticky z-50 top-0">
        <div className="px-2 md:px-16 py-1 md:py-0 flex justify-between items-center drop-shadow-2xl">
          <div className="flex items-center space-x-3 lg:w-[30%]">
            <Link prefetch={false} href={{ pathname: "/" }} shallow>
              <Image
                loading="eager"
                src={logo2.src}
                alt="logo"
                width="108"
                height="64"
                className="w-[7.5em] min-[1300px]:w-full"
              />
            </Link>
            <Link prefetch={false} href={{ pathname: "/" }} shallow>
              <Image
                loading="eager"
                src={logo3.src}
                alt="logo"
                width="108"
                height="64"
                className="w-[7.5em] min-[1300px]:w-full"
              />
            </Link>
          </div>
          <div className="flex justify-end items-center space-x-5 md:w-[82%] md:pr-56">
            <div className="flex flex-col space-y-3">
              <div className="flex justify-end items-center space-x-7">
                <div className="md:flex items-center space-x-1 hidden">
                  <FaCalendarAlt
                    className="mr-1 w-6 h-5"
                    color="#12633D"
                    width={24}
                    height={25}
                  />
                  <p className="text-secondary text-14">
                    {dateName(new Date())} {dDate(new Date())} /{" "}
                    {dateName(new Date())}{" "}
                    {convertEnglishDateToBangla(new Date())}
                  </p>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-3">
                <Menu />
              </div>
            </div>
            <div className="flex fixed right-8 -top-3">
              <div className="hidden md:block">
                <div className="w-4 h-4 aspect-w-1 aspect-h-1 bg-[#002f03] clip-right-triangle"></div>
              </div>
              <div className="hidden md:flex flex-col space-y-3 p-4 bg-[#198754] rounded-b-lg ">
                <Link
                  prefetch={false}
                  href={{ pathname: process.env.LOGIN_URL }}
                  className="flex items-center justify-center space-x-3 bg-red-700 border border-white h-[40px] rounded-full p-3"
                >
                  <span className="text-18">
                    <svg
                      className="fill-white"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 640 512"
                    >
                      <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                    </svg>
                  </span>
                  <span className="text-14 text-white">নাগরিক সেবা কর্ণার</span>
                </Link>
                <Link
                  href={{ pathname: process.env.OFFICE_LOGIN_URL }}
                  target="_blank"
                  className="flex items-center justify-center space-x-3 bg-white border border-primary h-[40px] rounded-full"
                >
                  <span className="text-secondary text-18 mr-2">
                    <svg
                      className="fill-secondary"
                      xmlns="http://www.w3.org/2000/svg"
                      height="1em"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z" />
                    </svg>
                  </span>
                  <span className="text-14 text-secondary">প্রশাসনিক লগইন</span>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="w-4 h-4 aspect-w-1 aspect-h-1 bg-[#002f03] clip-left-triangle"></div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile menu */}
        <Mobilemenu />
      </nav>
      {/* accecibility icon */}
      <div className="accecibility fixed z-50 top-1 md:top-52 right-3 w-[45px] md:w-[70px] h-[30px] md:h-[60px]">
        <Image
          loading="lazy"
          src={relative_image_path("accecibility.png")}
          className="w-[40px] lg:w-14 h-auto"
          alt="accecibility"
          width={63}
          height={61}
        />
      </div>

      {/* support icon */}
      <div className="support fixed z-50 bottom-3 lg:bottom-10 right-3 md:right-4 w-11 lg:w-[60px] h-auto">
        <Image
          loading="lazy"
          src={relative_image_path("support.webp")}
          alt="support"
          width={63}
          height={61}
        />
      </div>
    </>
  );
};

export default Navbar;
