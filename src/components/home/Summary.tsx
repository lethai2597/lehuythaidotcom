"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 150,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
      delay: 0.1,
    },
  },
};

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

// Mock website sections - simple skeleton style
const mockSections = [
  // Hero Section
  () => (
    <div className="w-full h-full bg-zinc-900 p-6 flex flex-col justify-center items-center gap-3">
      <div className="w-20 h-3 bg-zinc-950 rounded-md"></div>
      <div className="w-28 h-2 bg-zinc-950 rounded-md"></div>
      <div className="w-14 h-4 bg-zinc-950 rounded-md mt-2"></div>
    </div>
  ),

  // Navigation Bar
  () => (
    <div className="w-full h-full bg-zinc-900 p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="w-12 h-3 bg-zinc-950 rounded-md"></div>
        <div className="flex gap-3">
          <div className="w-8 h-2 bg-zinc-950 rounded-md"></div>
          <div className="w-8 h-2 bg-zinc-950 rounded-md"></div>
          <div className="w-8 h-2 bg-zinc-950 rounded-md"></div>
        </div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 h-20 bg-zinc-950 rounded-md"></div>
        <div className="flex-1 h-20 bg-zinc-950 rounded-md"></div>
      </div>
    </div>
  ),

  // Card Grid
  () => (
    <div className="w-full h-full bg-zinc-900 p-5 grid grid-cols-3 gap-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-zinc-950 rounded-md p-3 space-y-2">
          <div className="w-full h-10 bg-zinc-900 rounded-md"></div>
          <div className="h-1.5 bg-zinc-900 rounded-md"></div>
          <div className="h-1.5 bg-zinc-900 rounded-md w-2/3"></div>
        </div>
      ))}
    </div>
  ),

  // Form
  () => (
    <div className="w-full h-full bg-zinc-900 p-6 flex items-center justify-center">
      <div className="w-full space-y-3">
        <div className="h-3 bg-zinc-950 rounded-md"></div>
        <div className="h-3 bg-zinc-950 rounded-md"></div>
        <div className="h-8 bg-zinc-950 rounded-md"></div>
        <div className="h-4 bg-zinc-950 rounded-md mt-4"></div>
      </div>
    </div>
  ),

  // Dashboard Stats
  () => (
    <div className="w-full h-full bg-zinc-900 p-5">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-zinc-950 rounded-md p-3">
          <div className="h-2 bg-zinc-900 rounded-md w-2/3 mb-2"></div>
          <div className="h-3 bg-zinc-900 rounded-md w-1/2"></div>
        </div>
        <div className="bg-zinc-950 rounded-md p-3">
          <div className="h-2 bg-zinc-900 rounded-md w-2/3 mb-2"></div>
          <div className="h-3 bg-zinc-900 rounded-md w-1/2"></div>
        </div>
      </div>
      <div className="h-16 bg-zinc-950 rounded-md flex items-end gap-1.5 p-3">
        {[40, 60, 30, 80, 50, 70].map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-zinc-900 rounded-md"
            style={{ height: `${h}%` }}
          ></div>
        ))}
      </div>
    </div>
  ),

  // Sidebar Layout
  () => (
    <div className="w-full h-full bg-zinc-900 flex gap-3 p-4">
      <div className="w-12 bg-zinc-950 rounded-md p-2 space-y-3">
        <div className="w-full h-3 bg-zinc-900 rounded-md"></div>
        <div className="w-full h-3 bg-zinc-900 rounded-md"></div>
        <div className="w-full h-3 bg-zinc-900 rounded-md"></div>
      </div>
      <div className="flex-1 p-4 space-y-3">
        <div className="h-3 bg-zinc-950 rounded-md w-1/3"></div>
        <div className="h-full bg-zinc-950 rounded-md"></div>
      </div>
    </div>
  ),

  // Profile Card
  () => (
    <div className="w-full h-full bg-zinc-900 p-6 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 bg-zinc-950 rounded-full"></div>
      <div className="w-20 h-2 bg-zinc-950 rounded-md"></div>
      <div className="w-24 h-2 bg-zinc-950 rounded-md"></div>
    </div>
  ),

  // Table
  () => (
    <div className="w-full h-full bg-zinc-900 p-5">
      <div className="flex gap-3 mb-3">
        <div className="flex-1 h-3 bg-zinc-950 rounded-md"></div>
        <div className="flex-1 h-3 bg-zinc-950 rounded-md"></div>
        <div className="flex-1 h-3 bg-zinc-950 rounded-md"></div>
      </div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3 mb-2">
          <div className="flex-1 h-2 bg-zinc-950 rounded-md"></div>
          <div className="flex-1 h-2 bg-zinc-950 rounded-md"></div>
          <div className="flex-1 h-2 bg-zinc-950 rounded-md"></div>
        </div>
      ))}
    </div>
  ),

  // Gallery
  () => (
    <div className="w-full h-full bg-zinc-900 p-4 grid grid-cols-4 grid-rows-2 gap-2.5">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-zinc-950 rounded-md"></div>
      ))}
    </div>
  ),

  // Footer
  () => (
    <div className="w-full h-full bg-zinc-900 p-5">
      <div className="grid grid-cols-3 gap-4 mb-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="h-2 bg-zinc-950 rounded-md w-2/3"></div>
            <div className="h-1 bg-zinc-950 rounded-md"></div>
            <div className="h-1 bg-zinc-950 rounded-md w-3/4"></div>
          </div>
        ))}
      </div>
      <div className="h-1 bg-zinc-950 rounded-md w-full"></div>
    </div>
  ),
];

export default function Summary() {
  // Get random section based on index with better distribution
  const getRandomSection = (rowIndex: number, itemIndex: number) => {
    // Use a prime number multiplier to avoid pattern repetition
    const index = (rowIndex * 7 + itemIndex) % mockSections.length;
    return mockSections[index];
  };
  return (
    <section id="summary">
      <div className="relative w-full overflow-hidden pt-40">
        <div className="absolute z-10 top-0 left-0 w-full h-24 bg-gradient-to-b from-zinc-950 to-transparent"></div>

        {/* Marquee Background Rows */}
        <div className="absolute inset-0 z-0 space-y-4 -mt-8 blur-xs">
          {[...Array(7)].map((_, rowIndex) => (
            <div key={rowIndex} className="flex h-40 overflow-hidden">
              <div
                className={`flex gap-4 ${
                  rowIndex % 2 === 0
                    ? "animate-marquee-right"
                    : "animate-marquee-left"
                }`}
              >
                {[...Array(20)].map((_, itemIndex) => {
                  const SectionComponent = getRandomSection(
                    rowIndex,
                    itemIndex
                  );
                  return (
                    <div
                      key={`${rowIndex}-${itemIndex}`}
                      className="h-40 aspect-video rounded-xl flex-shrink-0 overflow-hidden"
                    >
                      <SectionComponent />
                    </div>
                  );
                })}
              </div>
              <div
                className={`flex gap-4 ml-6 ${
                  rowIndex % 2 === 0
                    ? "animate-marquee-right"
                    : "animate-marquee-left"
                }`}
              >
                {[...Array(20)].map((_, itemIndex) => {
                  const SectionComponent = getRandomSection(
                    rowIndex,
                    itemIndex
                  );
                  return (
                    <div
                      key={`${rowIndex}-${itemIndex}-dup`}
                      className="h-40 aspect-video rounded-xl flex-shrink-0 overflow-hidden"
                    >
                      <SectionComponent />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/20 to-black/10"></div> */}

        <motion.div 
          className="relative z-10 container mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold mb-4 text-white"
            variants={titleVariants}
          >
            Có một ý tưởng?
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8"
            variants={textVariants}
          >
            Bạn có một ý tưởng sáng tạo hoặc đang gặp vấn đề cần giải quyết? Hãy
            liên hệ với mình để cùng nhau biến tầm nhìn thành hiện thực.
          </motion.p>
          <motion.div 
            className="flex justify-center gap-4"
            variants={buttonVariants}
          >
            <button 
              onClick={() => scrollToSection("contact")}
              className="group overflow-hidden relative px-8 md:px-16 py-3 md:py-4 bg-gradient-to-br from-indigo-700 to-violet-700 cursor-pointer rounded-full backdrop-blur-sm font-bold transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 group-hover:scale-105 transition-all duration-300 text-white">
                Liên hệ ngay
              </div>
            </button>
          </motion.div>
          <motion.div variants={imageVariants}>
            <Image
              src="/imgs/profile.png"
              alt="Le Huy Thai"
              width={2000}
              height={2000}
              className="w-full max-w-lg mx-auto brightness-90"
            />
          </motion.div>
        </motion.div>

        <style jsx>{`
          @keyframes marquee-right {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(0%);
            }
          }

          @keyframes marquee-left {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee-right {
            animation: marquee-right 180s linear infinite;
          }

          .animate-marquee-left {
            animation: marquee-left 240s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}
