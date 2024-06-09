export const revalidate = 3600;

import Link from "next/link";
import  Dropdown from "../_components/Dropdown";
import { Menulist } from "../_api/api";

export default async function Menu() {
  const menu = await Menulist().catch((err) => {
    console.error("Server Error: ", err.message);
  });

  const data1 = {
    title: "মন্ত্রণালয়/বিভাগ",
    link: [
      {
        text: "ভূমি মন্ত্রণালয়",
        url: "https://minland.gov.bd/",
        external: true,
      },
      {
        text: "ভূমি সংস্কার বোর্ড",
        url: "https://lrb.gov.bd/",
        external: true,
      },
      {
        text: "ভূমি আপিল বোর্ড",
        url: "https://lab.gov.bd/",
        external: true,
      },
    ],
  };
  const data2 = {
    title: "ভূমিসেবা ",
    link: [
      {
        text: "ভূমি উন্নয়ন কর সেবা",
        url: "/",
        external: false,
      },
      {
        text: "খাস জমি বন্দোবস্ত সেবা",
        url: "https://land.gov.bd/%E0%A6%96%E0%A6%BE%E0%A6%B8%E0%A6%9C%E0%A6%AE%E0%A6%BF-%E0%A6%AC%E0%A6%A8%E0%A7%8D%E0%A6%A6%E0%A7%8B%E0%A6%AC%E0%A6%B8%E0%A7%8D%E0%A6%A4-%E0%A6%B8%E0%A7%87%E0%A6%AC%E0%A6%BE/",
        external: true,
      },
      {
        text: "অরপিত সম্পত্তি ব্যবস্তাপনা সেবা",
        url: "https://land.gov.bd/%E0%A6%85%E0%A6%B0%E0%A7%8D%E0%A6%AA%E0%A6%BF%E0%A6%A4-%E0%A6%B8%E0%A6%AE%E0%A7%8D%E0%A6%AA%E0%A6%A4%E0%A7%8D%E0%A6%A4%E0%A6%BF-%E0%A6%AC%E0%A7%8D%E0%A6%AF%E0%A6%AC%E0%A6%B8%E0%A7%8D%E0%A6%A5%E0%A6%BE/",
        external: true,
      },
    ],
  };
  const data3 = {
    title: "ডিজিটাল গার্ড ফাইল",
    link: [
      {
        text: "আইন ও বিধি",
        url: "/ain-and-bidhi",
        external: false,
      },
      {
        text: "পরিপত্র প্রজ্ঞাপন",
        url: "/poripotro",
        external: false,
      },
      {
        text: "নীতিমালা",
        url: "/nitimala",
        external: false,
      },
      {
        text: "ম্যানুয়াল",
        url: "/manual",
        external: false,
      },
    ],
  };


  return (
    <>
      <ul className="flex items-center justify-end space-x-3">
        {menu != undefined ? (
          menu?.map((item, index) => {
            if (item.childs.length > 0) {
              let heading = item.title;
              let image = null;
              let link = item.childs.map((item) => {
                return {
                  text: item.title,
                  url: item.link,
                  external: true,
                };
              });

              return (
                <li key={index}>
                  <Dropdown {...{ heading, image, link }} />
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Link
                    className="text-semiblack font-medium hover:text-magenta text-[0.875rem]"
                    href={{ pathname: item.link }}
                    shallow
                  >
                    {item.title}
                  </Link>
                </li>
              );
            }
          })
        ) : (
          <>
            <li>
              <Link
                className="text-semiblack font-medium hover:text-magenta text-[0.875rem]"
                href={{ pathname: "/" }}
                shallow
              >
                হোম
              </Link>
            </li>
            <li>
              <Dropdown
                {...{ heading: data1.title, image: null, link: data1.link }}
              />
            </li>
            <li>
              <Dropdown
                {...{ heading: data2.title, image: null, link: data2.link }}
              />
            </li>
            <li>
              <Link
                className="text-semiblack font-medium hover:text-magenta text-[0.875rem]"
                href={{ pathname: "/vumiseba-form" }}
                shallow
              >
                ভুমিসেবা ফর্ম
              </Link>
            </li>
            <li>
              <Dropdown
                {...{ heading: data3.title, image: null, link: data3.link }}
              />
            </li>
          </>
        )}
      </ul>
    </>
  );
}
