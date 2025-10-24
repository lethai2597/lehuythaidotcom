"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

const PHOTOS = [
  "/wedding/1.jpg", "/wedding/2.jpg", "/wedding/3.jpg", "/wedding/4.jpg", "/wedding/5.jpg",
  "/wedding/6.jpg", "/wedding/7.jpg", "/wedding/8.jpg", "/wedding/9.jpg", "/wedding/10.jpg",
  "/wedding/11.jpg", "/wedding/12.jpg", "/wedding/13.jpg", "/wedding/14.jpg", "/wedding/15.jpg",
  "/wedding/16.jpg", "/wedding/17.jpg", "/wedding/18.jpg", "/wedding/19.jpg", "/wedding/20.jpg",
  "/wedding/21.jpg", "/wedding/22.jpg", "/wedding/23.jpg", "/wedding/24.jpg", "/wedding/25.jpg",
  "/wedding/26.jpg", "/wedding/27.jpg", "/wedding/28.jpg", "/wedding/29.jpg", "/wedding/30.jpg",
  "/wedding/31.jpg", "/wedding/32.jpg", "/wedding/33.jpg", "/wedding/34.jpg", "/wedding/35.jpg",
  "/wedding/36.jpg", "/wedding/37.jpg", "/wedding/38.jpg", "/wedding/39.jpg", "/wedding/40.jpg",
  "/wedding/41.jpg"
];

export default function PhotoGallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [, setMainSwiper] = useState<SwiperType | null>(null);

  return (
    <section ref={ref} id="photo-gallery" className="py-40">
      <motion.div 
        className="container mx-auto px-8"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-8">
          <h2 className="text-7xl xl:text-9xl font-medium font-allura mb-2 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-400">
            Khoảnh Khắc
          </h2>
          <p className="text-gray-500 font-merriweather max-w-2xl mx-auto">
            Những khoảnh khắc đặc biệt trong hành trình tình yêu của chúng mình
          </p>
        </div>

        {/* Main Swiper */}
        <div className="relative max-w-2xl mx-auto">
          <Swiper
            modules={[Navigation, Pagination, Autoplay, Thumbs]}
            spaceBetween={0}
            slidesPerView={1}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet-custom",
              bulletActiveClass: "swiper-pagination-bullet-active-custom",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            thumbs={{ swiper: thumbsSwiper }}
            onSwiper={setMainSwiper}
            className="main-swiper rounded-3xl overflow-hidden"
          >
            {PHOTOS.map((photo, index) => (
              <SwiperSlide key={index}>
                <div className="aspect-[2/3] relative">
                  <Image
                    src={PHOTOS[index]}
                    alt={`Photo ${index + 1}`}
                    width={1168}
                    height={1752}
                    className="w-full h-full object-cover"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons */}
          <button className="swiper-button-prev-custom cursor-pointer  absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button className="swiper-button-next-custom cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-10">
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Thumbnail Swiper */}
        </div>
        <div className="mt-8 relative">
          <div className="absolute z-10 w-12 h-full left-0 top-0 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute z-10 w-12 h-full right-0 top-0 bg-gradient-to-l from-white to-transparent"></div>
          <Swiper
            modules={[Thumbs]}
            spaceBetween={12}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            onSwiper={setThumbsSwiper}
            className="thumb-swiper"
          >
            {PHOTOS.map((photo, index) => (
              <SwiperSlide
                key={index}
                className="!w-20 !h-20 first:ml-12 last:mr-12"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden cursor-pointer">
                  <Image
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    width={1168}
                    height={1752}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <style jsx global>{`
        .main-swiper .swiper-pagination {
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: auto;
        }

        .swiper-pagination-bullet-custom {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          margin: 0 4px;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active-custom {
          background: white;
        }

        .thumb-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }

        .thumb-swiper .swiper-slide {
          opacity: 0.7;
          transition: opacity 0.3s ease;
        }

        .thumb-swiper .swiper-slide-thumb-active {
          opacity: 1;
        }

        /* Ensure navigation buttons are visible */
        .swiper-button-prev-custom,
        .swiper-button-next-custom {
          display: flex !important;
          visibility: visible !important;
          opacity: 1 !important;
          z-index: 20 !important;
        }

        .swiper-button-prev-custom:hover,
        .swiper-button-next-custom:hover {
          transform: scale(1.05);
        }

        .swiper-button-prev-custom:disabled,
        .swiper-button-next-custom:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
      </motion.div>
    </section>
  );
}
