"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SpotlightCard from "../SpotlightCard";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
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

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
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

export default function Services() {
  return (
    <section id="services" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto p-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            variants={titleVariants}
          >
            What can I do?
          </motion.h2>
          <motion.p 
            className="text-base md:text-lg max-w-2xl mx-auto mb-8"
            variants={titleVariants}
          >
            I can help you build websites, applications, blockchain solutions, ...
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 text-white hover:[&>.service-card:not(:hover)]:blur-xs hover:[&>.service-card:not(:hover)]:opacity-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.div variants={cardVariants} className="service-card transition-all duration-300 cursor-pointer">
            <SpotlightCard
              className="w-full group !p-0 !rounded-4xl overflow-hidden hover:-translate-y-4 transition-all duration-300"
              spotlightColor="rgba(251, 191, 36, 0.15)"
            >
              <div className="p-8">
                <h3 className="text-3xl xl:text-5xl leading-tight font-bold mb-8 bg-gradient-to-br from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Web Development
                </h3>
                <p className="leading-relaxed text-sm md:text-base">
                  Building modern, responsive websites with NextJS ReactJS. Optimizing
                  SEO, page loading speed and user experience. Landing pages,
                  CMS, E-commerce, and more...
                </p>
              </div>

              <div className="flex-1 relative pb-8">
                <Image
                  src="/imgs/web-development.svg"
                  alt="Web Development"
                  width={1000}
                  height={500}
                  className="w-full max-w-full mx-auto transition-all duration-300 brightness-80 group-hover:brightness-100 group-hover:saturate-100 group-hover:opacity-100"
                />
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={cardVariants} className="service-card transition-all duration-300 cursor-pointer">
            <SpotlightCard
              className="w-full group !p-0 !rounded-4xl overflow-hidden hover:-translate-y-4 transition-all duration-300"
              spotlightColor="rgba(52, 211, 153, 0.15)"
            >
              <div className="p-8">
                <h3 className="text-3xl xl:text-5xl leading-tight font-bold mb-8 bg-gradient-to-br from-green-400 to-blue-400 bg-clip-text text-transparent">
                  App Development
                </h3>
                <p className="leading-relaxed text-sm md:text-base">
                  Developing mobile iOS & Android applications with React Native. Smooth
                  interface, API integration, push notifications and offline-first
                  for the best experience.
                </p>
              </div>

              <div className="flex-1 relative pb-8">
                <Image
                  src="/imgs/app-development.svg"
                  alt="Web Development"
                  width={1000}
                  height={500}
                  className="w-full max-w-full mx-auto transition-all duration-300 brightness-80 group-hover:brightness-100 group-hover:saturate-100 group-hover:opacity-100"
                />
              </div>
            </SpotlightCard>
          </motion.div>

          <motion.div variants={cardVariants} className="service-card transition-all duration-300 cursor-pointer">
            <SpotlightCard
              className="w-full group !p-0 !rounded-4xl overflow-hidden hover:-translate-y-4 transition-all duration-300"
              spotlightColor="rgba(96, 165, 250, 0.15)"
            >
              <div className="p-8">
                <h3 className="text-3xl xl:text-5xl leading-tight font-bold mb-8 bg-gradient-to-br from-sky-400 to-indigo-400 bg-clip-text text-transparent">
                  Blockchain Development
                </h3>
                <p className="leading-relaxed text-sm md:text-base">
                  Smart Contract (Solidity), DApp, Web3 integration. NFT
                  marketplace, DeFi protocol, DAO platform. Audit & optimize gas fees
                  for all projects.
                </p>
              </div>

              <div className="flex-1 relative pb-8">
                <Image
                  src="/imgs/blockchain-development.svg"
                  alt="Web Development"
                  width={1000}
                  height={500}
                  className="w-full max-w-full mx-auto transition-all duration-300 brightness-80 group-hover:brightness-100 group-hover:saturate-100 group-hover:opacity-100"
                />
              </div>
            </SpotlightCard>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
