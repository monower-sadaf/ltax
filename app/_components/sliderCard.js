"use client";
import React, { useEffect } from "react";
import { Carousel } from "flowbite-react";

const SliderCard = () => {
  useEffect(() => {}, []);

  return (
    <div className="relative h-[22vh] lg:h-[67vh] overflow-hidden">
      <Carousel slideInterval={5000}>
        {/* eslint-disable-next-line @next/next/no- Image-element */}
        <div className=" duration-700 ease-in-out" data-carousel-item>
          <img
            loading="lazy"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            src="../../assets/images/Web banner-1.jpg"
          />

          <img
            loading="lazy"
            alt="..."
            src="../../assets/images/Web banner-2.jpg"
          />

          <img
            loading="lazy"
            alt="..."
            src="../../assets/images/Web banner-3.jpg"
          />

          <img
            loading="lazy"
            alt="..."
            src="../../assets/images/Web banner-4.jpg"
          />

          <img
            loading="lazy"
            alt="..."
            src="../../assets/images/Web banner-5.jpg"
          />
        </div>
      </Carousel>

      <div className="relative h-56 overflow-hidden rounded-lg sm:h-64 xl:h-80 2xl:h-96">
        <div id="carousel-item-1" className="hidden duration-700 ease-in-out">
          <img
            loading="lazy"
            src="../../assets/images/c1.jpg"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
          />
        </div>
        <div className=" duration-700 ease-in-out" data-carousel-item>
          <img
            loading="lazy"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            src="../../assets/images/Web banner-6.jpg"
          />
        </div>
        <div className=" duration-700 ease-in-out" data-carousel-item>
          <img
            loading="lazy"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            src="../../assets/images/Web banner-7.jpg"
          />
        </div>
        <div className=" duration-700 ease-in-out" data-carousel-item>
          <img
            loading="lazy"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            src="../../assets/images/Web banner-8.jpg"
          />
        </div>
        <div className=" duration-700 ease-in-out" data-carousel-item>
          <img
            loading="lazy"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            alt="..."
            src="../../assets/images/Web banner-9.jpg"
          />
        </div>
        {/* <div className="relative z-30 -translate-x-1/2 bottom-0 w-full bg-primary w-full flex justify-center items-center h-2 md:h-[24px]">
                        <div className="md:flex space-x-3 hidden md:block">
                            <button type="button" className="w-3 h-3 rounded-full bg-slate-400" aria-current="true"
                                    aria-label="Slide 1" data-carousel-slide-to="0"></button>
                            <button type="button" className="w-3 h-3 rounded-full bg-slate-400" aria-current="false"
                                    aria-label="Slide 2" data-carousel-slide-to="1"></button>
                            <button type="button" className="w-3 h-3 rounded-full bg-slate-400" aria-current="false"
                                    aria-label="Slide 3" data-carousel-slide-to="2"></button>
                            <button type="button" className="w-3 h-3 rounded-full bg-slate-400" aria-current="false"
                                    aria-label="Slide 4" data-carousel-slide-to="3"></button>
                            <button type="button" className="w-3 h-3 rounded-full bg-slate-400" aria-current="false"
                                    aria-label="Slide 5" data-carousel-slide-to="4"></button>
                        </div>
                    </div> */}
        {/* </Carousel> */}
        <div className="absolute z-30 px-5 md:px-16 right-0 top-0 w-full h-[95%] md:flex pt-12 lg:pt-0 lg:items-center justify-center lg:justify-start hidden md:block">
          <div className="flex flex-col items-center lg:items-start space-y-2">
            <h3 className="text-18 lg:text-32 text-center lg:text-left leading-6 lg:leading-10 text-green1">
              ডিজিটাল ভূমিসেবায় <br /> অনলাইনে ভূমি উন্নয়ন কর প্রদান করতে
            </h3>
            <a
              href="#"
              className="bg-primary text-white px-5 py-1 rounded-md text-14 md:text-20"
            >
              নিবন্ধন করুন{" "}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderCard;
