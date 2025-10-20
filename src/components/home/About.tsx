"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import LightRays from "../LightRays";

// Animation variants cho mobile layout
const mobileContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const mobileItem = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

// Animation variants cho desktop layout
const desktopContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

export default function About() {
  return (
    <section className="bg-gradient-to-b from-zinc-950 via-indigo-900/15 to-zinc-950 mb-20 md:mb-40 relative py-10 md:py-0">
      <div className="absolute inset-0 z-0 opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00000030"
          raysSpeed={1.5}
          saturation={0.1}
          rayLength={3}
        />
      </div>

      <div className="container mx-auto p-8 pb-0 flex justify-center relative z-10 -mt-24">
        <div className="w-full max-w-sm xl:max-w-2xl flex flex-col md:flex-row md:items-end relative">
          {/* Mobile Layout */}
          <motion.div
            className="md:hidden flex flex-col gap-6"
            variants={mobileContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="w-full max-w-sm mx-auto" variants={scaleIn}>
              <Image
                src="/imgs/profile.png"
                alt="Le Huy Thai"
                width={2000}
                height={2000}
                className="w-full brightness-80"
              />
            </motion.div>

            <motion.div
              className="text-5xl font-black leading-tight mix-blend-luminosity"
              style={{ textShadow: "#0000004d 0px 0px 10px" }}
              variants={mobileItem}
            >
              HELLO,
              <br />
              I&apos;M THAI
            </motion.div>

            <motion.div
              className="text-2xl font-semibold leading-tight text-gray-300"
              variants={mobileItem}
            >
              IT SERVICES PROVIDER
            </motion.div>

            <motion.div
              className="h-10 rounded-full bg-zinc-800 flex items-center justify-center gap-3 px-4 animate-pulse w-fit"
              variants={mobileItem}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 relative">
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-green-400/20 animate-ping duration-500"></div>
              </div>
              <span className="text-white text-sm">
                Available for collaboration
              </span>
            </motion.div>
          </motion.div>

          {/* Desktop Layout */}
          <motion.div
            className="hidden md:block aspect-square w-full relative"
            variants={desktopContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={scaleIn}>
              <Image
                src="/imgs/profile.png"
                alt="Le Huy Thai"
                width={2000}
                height={2000}
                className="w-full mx-auto brightness-80"
              />
            </motion.div>

            <motion.div
              className="absolute bottom-32 -left-1/3 text-5xl xl:text-8xl font-black leading-tight mix-blend-luminosity"
              style={{ textShadow: "#0000004d 0px 0px 10px" }}
              variants={slideFromLeft}
            >
              HELLO,
              <br />
              I&apos;M THAI
            </motion.div>

            <motion.div
              className="absolute -right-1/2 w-1/2 bottom-32 text-2xl xl:text-5xl font-extrabold leading-tight text-right bg-gradient-to-br from-indigo-400 to-violet-400 bg-clip-text text-transparent"
              variants={slideFromRight}
            >
              IT SERVICES
              <br />
              PROVIDER
            </motion.div>

            <motion.div
              className="h-10 rounded-full bg-zinc-800 text-sm xl:text-base flex items-center justify-center gap-3 absolute top-24 xl:top-1/2 -left-12 px-4 animate-pulse"
              variants={slideFromLeft}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 relative">
                <div className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-green-400/20 animate-ping duration-500"></div>
              </div>
              <span className="text-white">Available for collaboration</span>
            </motion.div>

            <motion.div
              className="absolute w-1/2 top-1/2 -right-1/2 text-white text-right text-lg mr-16 hidden xl:block"
              variants={slideFromRight}
            >
              Passionate about building smart digital solutions for businesses.
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-zinc-950 z-10"></div>
    </section>
  );
}
