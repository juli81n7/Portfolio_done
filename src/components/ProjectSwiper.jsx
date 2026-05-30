import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectCards, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cards";

export default function ProjectSwiper({ data }) {
  return (
    <div className="w-full mx-auto py-12">
      <Swiper
        grabCursor={true}
        navigation
        loop={true}
        pagination={{ clickable: true }}
        modules={[EffectCards, Navigation, Pagination]}
        style={{ width: "100%", height: "700px" }}
        centeredSlides={true}
        slideShadows={true}
        simulateTouch="true"
      >
        {data.map((item, i) => (
          <SwiperSlide className="" key={i}>
            <div className="flex flex-col items-center justify-end h-full py-24 bg-black  relative ">
              <h3 className="mt-4 text-lg font-semibold text-white  text-center z-10">
                {item.project.name}
              </h3>
              <p className="mt-2 text-sm !text-white text-center z-10">
                {item.project.shortDescription}
              </p>
              <img
                src={item.url}
                alt={item.alt}
                className="absolute w-full h-full object-cover  top-0 left-0 z-0"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
