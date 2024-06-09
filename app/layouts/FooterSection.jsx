import Image from "next/image";
import Link from "next/link";
import { relative_image_path } from "@/halpers/helper";
import { FaFacebookSquare, FaYoutube } from "react-icons/fa";
import { MdOutlineSupportAgent } from "react-icons/md";
import { IoMdMail } from "react-icons/io";

function Footer() {
  return (
    <>
      <div className="h-3 bg-secondary" />
      <div className="lg:flex items-center pb-4 lg:pb-0">
        <div className="lg:w-[70%]">
          <div className="flex justify-center  lg:mt-[10px]">
            <div className=" lg:w-[50%] lg:pl-16 relative -top-[12px] lg:-top-[23px]">
              <div className="flex ">
                <div className="pb-4 pt-4 lg:pb-9 lg:pt-5 pl-6 lg:pl-12 pr-8 lg:pr-28 bg-[#E5F2EC] drop-shadow-md rounded-b-md">
                  <div>
                    <h3 className="text-14 lg:text-18 font-medium text-secondary pb-2">
                      গুরুত্বপূর্ণ লিঙ্ক
                    </h3>
                    <ul className="list-disc list-inside marker:text-primary">
                      <li>
                        <Link
                          href={{ pathname: "/nitimala" }}
                          shallow
                          className="text-12 lg:text-15 font-medium mt-1"
                        >
                          শর্তাবলী
                        </Link>
                      </li>
                      <li>
                        <a
                          href={"https://bangladesh.gov.bd/index.php"}
                          target="_blank"
                          className="text-12 lg:text-15 font-medium"
                        >
                          bangladesh.gov.bd
                        </a>
                      </li>
                      <li>
                        <a
                          href={"https://land.gov.bd/"}
                          target="_blank"
                          className="text-12 lg:text-15 font-medium"
                        >
                          Land.gov.bd
                        </a>
                      </li>
                      <li>
                        <a
                          href={"https://www.grs.gov.bd/"}
                          target="_blank"
                          className="text-12 lg:text-15 font-medium"
                        >
                          অভিযোগ প্রতিকার ব্যবস্থা
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="-ml-[px] -mt-[.1rem] lg:-mt-1">
                  <div className="mt-[5px] w-14 h-3 aspect-w-1 aspect-h-1 bg-[#ff0000] clip-left-triangle"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-[50%] flex flex-col lg:flex-row justify-between">
              <div>
                <p className="font-medium text-14 lg:text-18 lg:pb-7">
                  অ্যাপ ডাউনলোড করুন
                </p>
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.mysoftheaven.ldtax&hl=en&gl=US&pli=1"
                >
                  <Image
                    src={relative_image_path("play_store.webp")}
                    loading="eager"
                    className="w-[6em] lg:w-[9em] border border-primary px-1 rounded-sm"
                    width={100}
                    height={100}
                    alt="Google Play Store"
                  />
                </a>
              </div>
              <div className=" ">
                <div className="lg:pb-4  lg:-top-4 ">
                  <h3 className="text-14 lg:text-18 font-medium text-black pb-4 text-center">
                    পরিকল্পনা ও বাস্তবায়নে
                  </h3>
                  <ul className="lg:flex lg:flex-col lg:space-y-1">
                    <li className="flex  justify-center space-x-1 lg:space-x-8">
                      <a href={"https://lmap.minland.gov.bd/"} target="_blank">
                        <Image
                          loading="eager"
                          className="w-[10em] lg:w-[12.5em] p-1"
                          src={relative_image_path("lamp.webp")}
                          height={1000}
                          width={1000}
                          alt="ভূমি ব্যবস্থাপনা অটোমেশন প্রকল্প"
                        />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <p className="text-10 lg:text-14 font-medium  text-start lg:text-start lg:pl-16 inline-flex">
              Copyrights © 2023 All Rights Reserved
              <a
                className="underline text-primary px-1"
                target="_blank"
                href={"https://land.gov.bd/"}
              >
                Ministry of Land
              </a>
              , Government of the People's Republic of Bangladesh
            </p>
          </div>
        </div>
        <div className="lg:w-[30%] lg:pt-14 flex justify-between lg:flex-col ">
          <div className="flex items-end lg:items-center justify-center space-x-2 lg:space-x-5 pb-2 lg:pb-0 pl-5 lg:pl-0 pt-[2.25rem] lg:pt-0">
            <a
              href={"https://www.facebook.com/mysoftheavenltd/"}
              target="_blank"
              className="p-3 border-2 border-[#1976d2] rounded-full"
            >
              <FaFacebookSquare color="#1976d2" size={28} />
            </a>
            <a
              href={"https://www.youtube.com/@mysoftheaven"}
              target="_blank"
              className="p-3 border-2 border-[#FF0000] rounded-full"
            >
              <FaYoutube color="#FF0000" size={28} />
            </a>
            <a
              href={"tel:16122"}
              target="_blank"
              className="p-3 border-2 border-[#038a29] rounded-full"
            >
              <MdOutlineSupportAgent color="#038a29" size={28} />
            </a>
            <a
              href={"mailto:land.mysoftheaven@gmail.com"}
              target="_blank"
              className="p-3 border-2 border-[#ff5c00] rounded-full"
            >
              <IoMdMail color="#ff5c00" size={28} />
            </a>
          </div>
          <div className="lg:pt-7 lg:pl-14 w-[200px] lg:w-full">
            <h3 className="text-14 lg:text-18 font-medium text-center text-black lg:pl-16">
              কারিগরি সহায়তায়
            </h3>
            <div
              style={{
                background:
                  'url("/assets/images/footer_mysoft_heaven_logo.svg")',
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
              className="mt-3 flex justify-center items-center"
            >
              <a href={"https://mysoftheaven.com/"} target="_blank">
                <Image
                  className="w-[110px] lg:w-[192px]"
                  loading="eager"
                  src={relative_image_path("My-Soft-Heaven-LOGO-03.webp")}
                  height={1000}
                  width={1000}
                  alt="ভূমি উন্নয়ন কর"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <p className="text-10 lg:text-14 font-medium text-center lg:text-start  lg:pl-16">
          Copyrights © 2023 All Rights Reserved
          <a
            href={"https://land.gov.bd/"}
            className="underline text-primary px-1"
            target="_blank"
          >
            Ministry of Land
          </a>
          , Government of the People's Republic of Bangladesh
        </p>
        <hr className="bg-[#DFF8EC] " />
      </div>
      <hr className="bg-[#DFF8EC] hidden lg:block" />
    </>
  );
}

export default Footer;
