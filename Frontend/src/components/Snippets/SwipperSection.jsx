import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import { Button } from "flowbite-react";

export default function SwipperSection() {
  return (
    <div className="p-0">
      <div className="p-0 cursor-pointer select-none flex items-center gap-3">
        <Button>All</Button>
        <Swiper
          slidesPerView={6}
          spaceBetween={15}
          freeMode={true}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
        >
          <SwiperSlide className="text-slate-400 font-poppins">
            Slide1
          </SwiperSlide>
          <SwiperSlide className="text-slate-400">Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
          <SwiperSlide>Slide 7</SwiperSlide>
          <SwiperSlide>Slide 8</SwiperSlide>
          <SwiperSlide>Slide 9</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
