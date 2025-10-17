"use client";

import Hero from "@/components/wedding/Hero";
import OurStory from "@/components/wedding/OurStory";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import RSVP from "@/components/wedding/RSVP";
import Header from "@/components/wedding/Header";
import Footer from "@/components/wedding/Footer";
import LoadingScreen from "@/components/wedding/LoadingScreen";
import { Allura } from "next/font/google";
import BrideInformation from "@/components/wedding/BrideInformation";
import GroomInformation from "@/components/wedding/GroomInformation";
import { useImageLoader } from "@/hooks/useImageLoader";

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
  display: "swap",
});

// Danh sách ảnh cần load cho 3 section đầu
const CRITICAL_IMAGES = [
  "/wedding/24.jpg", // Hero section
  "/wedding/6.jpg",  // Hero section
  "/wedding/23.jpg", // Hero section
  "/wedding/9.jpg",  // OurStory section
  "/wedding/27.jpg", // BrideInformation section
];

export default function WeddingPage() {
  const { isLoading, progress } = useImageLoader({ imageUrls: CRITICAL_IMAGES });

  return (
    <>
      <LoadingScreen isVisible={isLoading} progress={progress} />
      
      {/* Preload critical images */}
      <div className="hidden">
        {CRITICAL_IMAGES.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            loading="eager"
            style={{ display: 'none' }}
          />
        ))}
      </div>
      
      <main
        className={`${allura.variable} min-h-screen font-serif bg-white text-gray-800 ${
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-1000"
        }`}
      >
        <Header />
        <Hero />
        <OurStory />
        <BrideInformation />
        <GroomInformation />
        <RSVP />
        <PhotoGallery />
        <Footer />
      </main>
    </>
  );
}
