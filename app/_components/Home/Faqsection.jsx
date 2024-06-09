import Image from "next/image";
import { relative_image_path } from "@/halpers/helper";
import Accordion from "../Accordion";
import Link from "next/link";

import { Faqs } from "@/app/_api/api";

const Faqsection = async () => {
    const faq = await Faqs().catch((err) => {
        console.log(err)
    });
    return (
      <section className="px-4 lg:px-16 pb-[35px] lg:pb-[38px]">
        <div className="flex flex-col space-y-5 lg:space-y-0 lg:flex-row-reverse lg:justify-center lg:items-center">
          <div className="flex justify-center items-center lg:w-[50%]">
            <Image
              className="w-[15.8125em] lg:w-[22.0625em]"
              loading="lazy"
              src={relative_image_path("faq_image.png")}
              width={1000}
              height={1000}
              alt="My Image"
            />
          </div>
          <div className="lg:w-[50%]">
            <div className="flex justify-center items-center">
              <h3 className="text-20 leading-[31px] lg:text-24 text-[#1E433D]">
                সাধারণ জিজ্ঞাসাসমূহ
              </h3>
            </div>
            <Accordion items={faq ? faq : []} />

            <div className="flex justify-center items-center pt-5">
              <Link
                prefetch={false}
                className="font-medium text-14 lg:text-16 text-white bg-secondary hover:text-secondary hover:bg-white border border-secondary px-5 py-0.5 lg:py-1 lg:px-7 rounded-md"
                href="/faq"
                shallow
              >
                আরও
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
};

export default Faqsection;