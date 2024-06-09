"use client";
import React from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "owl.carousel/dist/owl.carousel.js";
import Image from "next/image";
import { relative_image_path } from "@/halpers/helper";
import Link from "next/link";
import { useEffect } from "react";

export default function DigitalVumiShebaCarousel({ services }) {
  useEffect(() => {
    if (typeof window != "undefined") {
      // Initialize Owl Carousel when the component mounts
      $("#owl-demo").owlCarousel({
        loop: true,
        stagePadding: 0,
        autoplay: true,
        autoPlaySpeed: 5000,
        autoPlayTimeout: 5000,
        autoplayHoverPause: true,
        margin: 15,
        nav: true,
        navText: [
          '<i className="fa-solid fa-play fa-rotate-180" aria-hidden="true"></i>',
          '<i className="fa-solid fa-play aria-hidden="true"></i>',
        ],
        navContainer: ".main-content .custom-nav",
        responsive: {
          0: {
            items: 1.7,
          },
          600: {
            items: 3.7,
          },
          1000: {
            items: 4.7,
          },
        },
      });
    }
  }, []);

  return (
    <>
      {services != null && (
        <div id="owl-demo" className="owl-carousel owl-theme">
          {services != null ? (
            services?.map((item, index) => (
              <div
                key={index}
                className="item bg-white border hover:border-primary transform-all duration-700 rounded-md drop-shadow-[0_2px_2px_rgba(25,135,84,0.49)] lg:pb-4"
              >
                <Link
                  target="_blank"
                  preload="true"
                  href={item?.link}
                  className="flex flex-col justify-center items-center space-y-1 py-4"
                >
                  <div className="container flex justify-center items-center h-[110px] lg:h-[18vh]">
                    <div className="w-[73.09px] lg:w-[62.17px]">
                      <Image
                        priority
                        className=""
                        src={
                          item?.image_url != null
                            ? item?.image_url
                            : relative_image_path("dummy_image.jpg")
                        }
                        width="73"
                        height="62"
                        alt={item?.title}
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-14 lg:text-20">{item?.title}</h3>
                </Link>
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </>
  );
}
