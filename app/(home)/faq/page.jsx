export const revalidate = 3600;
import dynamic from "next/dynamic";
import { Faqs } from "../../_api/api";
import CitizenFaqForm from "../../_components/CitizenFaqForm";
const AccordionWithPagenation = dynamic(() =>
  import("../../_components/AccordionWithPagenation")
);
import { FaQuestionCircle } from "react-icons/fa";
export default async function Home() {
  const faqData = await Faqs().catch((err) => console.log(err));
  return (
    <section className="px-5 lg:px-16 py-6 lg:py-5">
      <div className="flex justify-center items-center space-x-3 pb-3 lg:pb-2">
        <FaQuestionCircle size={28} color="#12633d" />
        <h3 className="text-primary text-22 lg:text-30">
          জিজ্ঞাসিত প্রশ্নাবলী
        </h3>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-6 my-7">
        <div className="lg:w-[70%] border border-primary rounded-md px-2 lg:px-8 py-2 mb-5 lg:mb-0">
          <AccordionWithPagenation items={faqData} />
        </div>
        <div className="lg:w-[30%] mb-5 lg:mb-0">
          <div className>
            <CitizenFaqForm />
            <div className>
              <img src="assets/images/faq_img.png" alt="ভূমি উন্নয়ন কর" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
