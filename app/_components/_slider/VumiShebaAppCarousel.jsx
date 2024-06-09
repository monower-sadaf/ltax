"use client";
import React, { useEffect } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/owl.carousel.js";
import Image from "next/image";
import Link from "next/link";

const VumiShebaAppCarousel = ({ softwares }) => {
  useEffect(() => {
    // if (typeof window !== 'undefined') {
    $("#owl-demo2").owlCarousel({
      loop: true,
      stagePadding: 0,
      autoplay: true,
      autoPlaySpeed: 5000,
      autoPlayTimeout: 5000,
      autoplayHoverPause: true,
      margin: 25,
      nav: true,
      navText: [
        '<i className="fa-solid fa-play fa-rotate-180" aria-hidden="true"></i>',
        '<i className="fa-solid fa-play aria-hidden="true"></i>',
      ],
      navContainer: ".main-content .custom-nav",
      responsive: {
        0: {
          items: 1,
        },
        600: {
          items: 2,
        },
        1000: {
          items: 3,
        },
      },
    });
    // }
  }, []);

  return (
    <>
      {softwares != null ? (
        <div id="owl-demo2" className="owl-carousel owl-theme2">
          {softwares?.map((item, index) => (
            <div
              key={index}
              className="item bg-white border hover:border-primary rounded-md group transition-all duration-700"
            >
              <Link href={item?.link} target="_blank" shallow>
                <div className="container flex justify-center items-center h-[120px]">
                  <div className="w-[33%]">
                    <Image
                      width={250}
                      height={250}
                      loading="lazy"
                      className="group-hover:scale-125 transition-all duration-1000"
                      src={item?.image_url}
                      alt={item?.title}
                    />
                  </div>
                </div>
                <div className="bg-secondary flex justify-center items-center h-[50px] rounded-b-md">
                  <h3 className="text-white group-hover:-translate-x-2 transition-all duration-1000">
                    {item?.title}
                  </h3>
                  <span className="text-white text-20 opacity-0 group-hover:opacity-100 transition-all duration-700">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default VumiShebaAppCarousel;
