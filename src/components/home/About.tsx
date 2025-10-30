"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import LightRays from "../LightRays";

// Animation variants cho desktop layout
const container = {
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
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animations for mouse position
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transform values cho cả layer text (di chuyển cùng nhau)
  const textLayerX = useTransform(mouseXSpring, [-0.5, 0.5], [-20, 20]);
  const textLayerY = useTransform(mouseYSpring, [-0.5, 0.5], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Normalize mouse position to -0.5 to 0.5 range
      const normalizedX = (e.clientX - centerX) / rect.width;
      const normalizedY = (e.clientY - centerY) / rect.height;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    // Listen to mouse move globally trên window
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="bg-gradient-to-b from-zinc-950 via-indigo-900/15 to-zinc-950 mb-20 md:mb-40 relative py-10 md:py-0"
    >
      <div className="absolute inset-0 z-0 opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00000030"
          raysSpeed={1.5}
          saturation={0.1}
          rayLength={3}
        />
      </div>

      <div className="p-8 pb-0 relative z-10 -mt-24 w-full md:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl mx-auto">
        {/* Desktop Layout */}
        <motion.div
          className="w-full relative pt-20"
          variants={container}
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
              className="max-w-full md:max-w-md xl:max-w-xl 2xl:max-w-2xl mx-auto brightness-80"
            />
          </motion.div>

          <motion.div
            className="md:absolute inset-0 -mt-20 md:-mt-0"
            style={{
              x: textLayerX,
              y: textLayerY,
              transition: "transform 0s",
            }}
          >
            <motion.div
              className="md:absolute bottom-8 xl:bottom-12 left-0 text-5xl xl:text-7xl 2xl:text-8xl font-black leading-tight mix-blend-luminosity mb-4 md:mb-0"
              style={{
                color: "#fff",
                textShadow:
                  "0 0 3px rgba(126,249,255,0.55), 0 0 8px rgba(126,249,255,0.40), 0 0 16px rgba(126,249,255,0.28)",
              }}
              variants={slideFromLeft}
              animate={{
                textShadow: [
                  "0 0 2px rgba(126,249,255,0.45), 0 0 6px rgba(126,249,255,0.32), 0 0 12px rgba(126,249,255,0.22)",
                  "0 0 4px rgba(126,249,255,0.68), 0 0 10px rgba(126,249,255,0.50), 0 0 20px rgba(126,249,255,0.34)",
                ],
                filter: [
                  "saturate(1) brightness(1)",
                  "saturate(1.08) brightness(1.05)",
                ],
              }}
              transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              HELLO,
              <br />
              I&apos;M THAI
            </motion.div>

            <motion.div
              className="md:absolute right-0 w-full md:w-1/2 bottom-12 xl:bottom-24 mb-4 md:mb-0 text-3xl xl:text-4xl 2xl:text-5xl font-extrabold leading-tight text-left md:text-right mix-blend-luminosity"
              variants={slideFromRight}
            >
              IT SERVICES
              <br />
              PROVIDER
            </motion.div>

            <motion.div
              className="h-8 md:h-10 rounded-full bg-zinc-800 text-sm xl:text-base inline-flex md:flex mb-4 md:mb-0 items-center justify-center gap-3 md:absolute top-1/2 left-0 xl:left-1/8 px-3 md:px-4 animate-pulse"
              variants={slideFromLeft}
            >
              <div className="w-3 h-3 rounded-full bg-gradient-to-br from-green-400 to-green-500 relative">
                <div className="md:absolute -top-1 -left-1 w-5 h-5 rounded-full bg-green-400/20 animate-ping duration-500"></div>
              </div>
              <span className="text-white">Available for collaboration</span>
            </motion.div>

            <motion.div
              className="md:absolute w-full max-w-xs top-1/2 right-0 text-white text-left md:text-right text-lg mr-0 block"
              variants={slideFromRight}
            >
              Passionate about building smart digital solutions for businesses.
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-b from-transparent to-zinc-950 z-10"></div>
    </section>
  );
}
