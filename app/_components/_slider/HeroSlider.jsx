'use client';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import { relative_image_path } from "@/halpers/helper";
const OwlHeroSlider =  ({sliderlist}) => {
  const carouselOptions = {
    autoPlay: true,
    infiniteLoop: true,
    showArrows: false,
    showStatus: false,
    showIndicators: true,
    showThumbs: false,
    thumbWidth: 100,
    selectedItem: 0,
    interval: 5000,
    transitionTime: 20,
    stopOnHover: true,
    swipeable: true,
    emulateTouch: true,
  };
  return (
    <Carousel
      className="caroudel_hero_slider relative h-[16.25em] lg:h-[27em] overflow-hidden"
      {...carouselOptions}
    >
      {sliderlist?.length > 0 &&
        sliderlist.map((image, index) => (
          <div key={index}>
            <Image
              className=" h-[16.25em] lg:h-[27em]"
              loading="eager"
              src={
                image?.image_url
                  ? image?.image_url
                  : relative_image_path("backup_banner.webp")
              }
              height="378"
              width="1440"
              alt="Land Development Tax"
            />
          </div>
        ))}
    </Carousel>
  );
};
export default OwlHeroSlider;
