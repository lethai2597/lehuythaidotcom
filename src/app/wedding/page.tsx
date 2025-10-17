"use client";

import Hero from "@/components/wedding/Hero";
import OurStory from "@/components/wedding/OurStory";
import PhotoGallery from "@/components/wedding/PhotoGallery";
import RSVP from "@/components/wedding/RSVP";
import Header from "@/components/wedding/Header";
import Footer from "@/components/wedding/Footer";
import { Allura } from "next/font/google";
import BrideInformation from "@/components/wedding/BrideInformation";
import GroomInformation from "@/components/wedding/GroomInformation";

const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
  display: "swap",
});

export const IMAGES = [];

export default function WeddingPage() {
  return (
    <main
      className={`${allura.variable} min-h-screen font-serif bg-white text-gray-800`}
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
  );
}
