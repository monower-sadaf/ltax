"use client";
import { useState } from "react";
import AccordionWithPagenation from "@/app/_components/AccordionWithPagenation";
const Manualtab = ({nagorik, songstha}) => {
    const [active, setActive] = useState(0);
  return (
    <>
      <div className="mt-6">
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
      </div>
      <div className="mt-5">
        {active == 0 && <AccordionWithPagenation items={nagorik} />}
        {active == 1 && <AccordionWithPagenation items={songstha} />}
      </div>
    </>
  );
};

export default Manualtab;
