"use client";
import React from "react";
import { useState } from "react";
// import AccordionWithPagenation from "../../../AccordionWithPagenation";
// import AccordionWithPagenation from "../../../_components/AccordionWithPagenation"
import AccordionWithPagenation from "../../_components/AccordionWithPagenation"

const Manual = () => {
  const [active, setActive] = useState(0);
  const accordion = {
    faq: [
      {
        id: 1,
        question: "০১. নাগরিক কর্নার",
        answer:
          "নাগরিক ভূমি উন্নয়ন কর ওয়েবসাইটে প্রবেশ করে ‘নাগরিক সেবা কর্ণার’ অপশনে ক্লিক করবে।",
        attachment: "nagorik_manual_1.png",
      },
      {
        id: 2,
        question: "০২. নাগরিক লগইন",
        answer:
          "নাগরিক লগইন থেকে মোবাইল নাম্বার এবং পাসওয়ার্ড দিয়ে ‘লগইন করুন’ অপশনে ক্লিক করে সিস্টেমে লগইন করবে।",
        attachment: "nagorik_manual_2.png",
      },
      {
        id: 3,
        question: "০৩. পাসওয়ার্ড পুনরুদ্ধার",
        answer:
          "পাসওয়ার্ড পুনরুদ্ধার করতে চাইলে ‘আপনি কি পাসওয়ার্ড ভুলে গেছেন’ অপশনে কিক করবে। নিবন্ধিত মোবাইল নাম্বার এন্ট্রি করে ‘ওটিপি প্রেরণ’ করুন অপশনে ক্লিক করবে। নিবন্ধিত মোবাইল নাম্বারে প্রেরিত ওটিপি কোডটি এন্ট্রি করে পরবর্তি অপশনে ক্লিক করবে।",
        attachment: "nagorik_manual_3.png",
      },
    ],
  };

  const accordion2 = {
    faq: [
      {
        id: 1,
        question: "০১. ভূমি উন্নয়ন কর নাগরিক নিবন্ধন ফরম",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "faqAnswerImage.png",
      },
      {
        id: 2,
        question: "০২. ভূমি উন্নয়ন কর OTP ভেরিফিকেশান ফরম",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "",
      },
      {
        id: 3,
        question: "০৩. নতুন পাসওয়ার্ড নিশ্চিতকরণ ফরম",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "faqAnswerImage.png",
      },
      {
        id: 4,
        question: "০৪. ভূমি উন্নয়ন কর নাগরিক প্রোফাইল সম্পন্নকরন ",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "",
      },
      {
        id: 5,
        question: "০৫. ভূমি উন্নয়ন কর খতিয়ান তথ্য এন্ট্রি ফরম",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "faqAnswerImage.png",
      },
      {
        id: 6,
        question: "০৬. ভূমি উন্নয়ন কর হোল্ডিং তালিকা সমূহ",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "",
      },
      {
        id: 7,
        question: "০৭. ভূমি উন্নয়ন কর আপত্তি দাখিল",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "faqAnswerImage.png",
      },
      {
        id: 8,
        question: "০৮. ভূমি উন্নয়ন কর অনলাইন পেমেন্ট",
        answer:
          "প্রথমে www.ldtax.gov.bd ওয়েব সাইটে ভিজিট করে নাগরিক কর্নার মেনুতে ক্লিক করুন। নতুন নিবন্ধন করতে নিবন্ধন মেন্যুতে ক্লিক করে নাগরিকের মোবাইল নম্বর, জাতীয় পরিচয়পত্র নম্বর ও জন্ম তারিখ প্রদান করে “পরবর্তী পদক্ষেপ” বাটনে ক্লিক করুন ।",
        attachment: "",
      },
    ],
  };

  return (
    <div className="w-full">
      <div className="bg-white p-3 lg:px-12">
        {/* <div className="flex items-center justify-center space-x-5 mb-5">
          <div>
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.5 2.75V16.25C24.5 17.4922 23.4922 18.5 22.25 18.5H20V8.75C20 6.68281 18.3172 5 16.25 5H6.5V2.75C6.5 1.50781 7.50781 0.5 8.75 0.5H22.25C23.4922 0.5 24.5 1.50781 24.5 2.75ZM18.5 8.75V22.25C18.5 23.4922 17.4922 24.5 16.25 24.5H2.75C1.50781 24.5 0.5 23.4922 0.5 22.25V8.75C0.5 7.50781 1.50781 6.5 2.75 6.5H16.25C17.4922 6.5 18.5 7.50781 18.5 8.75ZM15.3125 10.0625C15.3125 9.75313 15.0594 9.5 14.75 9.5H4.0625C3.75312 9.5 3.5 9.75313 3.5 10.0625V12.5H15.3125V10.0625Z"
                fill="#12633D"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-20 lg:text-28 font-medium text-deepgreen">
              নির্দেশিকা / ম্যানুয়াল
            </h3>
          </div>
        </div> */}

        <div>
          {/* <div>
            <p className="text-18 lg:text-20 text-primary pl-3">
              নির্দেশিকা / ম্যানুয়াল
            </p>
            <hr className="bg-secondary h-[2px]" />
            <p className="pt-2 pl-3 text-13 lg:text-15 font-medium">
              বাংলাদেশ প্ল্যাটফরমে আপনাকে স্বাগতম। অনলাইনে সেবার আবেদন গ্রহণ,
              আবেদনের সর্বশেষ অবস্থা জানানো এবং সর্বোপরি জনভোগান্তি হ্রাসের
              উদ্দেশ্যে এই প্ল্যাটফরম প্রস্তুত করা হয়েছে। নাগরিক, ব্যবসায়ী,
              সরকারি ও বেসরকারি প্রতিষ্ঠান এবং সরকারি কর্মকর্তা-কর্মচারিগণ এই
              প্ল্যাটফরমের সুবিধা গ্রহণ করতে পারবেন। এই ওয়েবসাইটটি ব্যবহার করার
              জন্য আপনাকে অবশ্যই কিছু শর্তাবলি মেনে চলতে হবে, যা আপনি এই সাইটে
              প্রবেশ করা মাত্রই প্রযোজ্য।
            </p>
          </div> */}
          {/* <div className="mt-6">
            <div className="text-center">
              <p className="text-20 lg:text-22 text-primary">
                ভূমি উন্নয়ন কর ব্যবস্থাপনা সিস্টেম
              </p>
            </div>
            <div className="mt-2 flex justify-center items-center">
              <div className="m-2">
                <div className="flex justify-center">
                  <button
                    onClick={() => setActive(0)}
                    className={`px-3 lg:px-5 py-2 lg:py-3 rounded-md text-13 lg:text-15 border border-primary ${
                      active == 0
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                  >
                    নাগরিক ম্যানুয়াল
                  </button>
                </div>
              </div>
              <div className="m-2">
                <div className="flex justify-center">
                  <button
                    onClick={() => setActive(1)}
                    className={`px-3 lg:px-5 py-2 lg:py-3 rounded-md text-13 lg:text-15 border border-primary ${
                      active == 1
                        ? "bg-primary text-white"
                        : "bg-white text-primary"
                    }`}
                  >
                    সংস্থা ম্যানুয়াল
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="mt-5">
            {active == 0 && <AccordionWithPagenation items={accordion2.faq} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manual;
