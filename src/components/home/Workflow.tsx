"use client";

import { motion } from "framer-motion";
import CardSwap, { Card } from "../CardSwap";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  TrendingUp,
  Globe,
} from "lucide-react";
import ShinyText from "../ShinyText";

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
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

const cardsVariants = {
  hidden: { opacity: 0, scale: 0.9, x: 50 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
      delay: 0.3,
    },
  },
};

export default function Workflow() {
  return (
    <section className="py-40 px-4">
      <div className="container mx-auto grid grid-cols-1 xl:grid-cols-2 rounded-4xl bg-zinc-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Gradient Orbs */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

          {/* Dots Pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <motion.div
          className="p-8 xl:p-36 pr-0 flex flex-col justify-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="px-3 text-sm py-1 rounded-full border border-zinc-700 backdrop-blur-sm mb-8 inline-block mr-auto">
            <TrendingUp className="w-4 h-4 text-zinc-400 inline-block mr-2 mb-0.5" />
            <ShinyText text="Our Workflow" disabled={false} speed={1.5} />
            <Globe className="w-4 h-4 text-zinc-400 inline-block ml-2 mb-0.5" />
          </div>

          <motion.h2
            className="text-3xl xl:text-5xl mb-8 font-bold leading-tight text-white"
            variants={titleVariants}
          >
            How do we collaborate?
          </motion.h2>
          <motion.div
            className="text-white/90 max-w-md leading-relaxed text-base xl:text-lg"
            variants={textVariants}
          >
            Every project is a unique journey. I believe in building products
            with a clear process, from understanding needs to deployment
            and long-term support. <br />
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full relative xl:scale-110 h-[400px] xl:h-auto xl:aspect-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={cardsVariants}
        >
          <div className="relative w-full h-full [&>div]:!scale-[0.65] [&>div]:!translate-x-[0%] [&>div]:!translate-y-[10%] xl:[&>div]:!scale-100 xl:[&>div]:!translate-x-[-15%] xl:[&>div]:!translate-y-[20%]">
            <CardSwap
              cardDistance={60}
              verticalDistance={120}
              delay={5000}
              pauseOnHover={false}
            >
              <Card customClass="border-2 border-zinc-800 p-8 bg-zinc-900 group hover:border-indigo-500/50 transition-[border-color] duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-indigo-400">01</div>
                    <h3 className="text-xl font-bold">Discovery & Analysis</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center group-hover:bg-indigo-500/20 transition-[background-color,transform] duration-300 group-hover:scale-110">
                    <Search className="w-7 h-7 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                  </div>
                </div>
                <p className="text-zinc-400 mb-4 leading-relaxed p-8 rounded-3xl bg-zinc-800 relative overflow-hidden">
                  <span className="absolute top-2 right-2 w-20 h-20 bg-indigo-500/5 rounded-full blur-xl" />
                  <span className="relative">
                    Starting by carefully listening to your ideas, business
                    goals and challenges. I will analyze requirements,
                    research the market and propose the most suitable technology
                    solutions.
                  </span>
                </p>
              </Card>
              <Card customClass="border-2 border-zinc-700 p-8 bg-zinc-900 group hover:border-violet-500/50 transition-[border-color] duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-violet-400">02</div>
                    <h3 className="text-xl font-bold">
                      Design & Planning
                    </h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-500/20 transition-[background-color,transform] duration-300 group-hover:scale-110">
                    <PenTool className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors" />
                  </div>
                </div>
                <p className="text-zinc-400 mb-4 leading-relaxed p-8 rounded-3xl bg-zinc-800 relative overflow-hidden">
                  <span className="absolute top-2 right-2 w-20 h-20 bg-violet-500/5 rounded-full blur-xl" />
                  <span className="relative">
                    Building system architecture, designing optimal UX/UI
                    and detailed implementation planning. Every decision
                    is aimed at the best user experience and future
                    scalability.
                  </span>
                </p>
              </Card>
              <Card customClass="border-2 border-zinc-700 p-8 bg-zinc-900 group hover:border-purple-500/50 transition-[border-color] duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-purple-400">03</div>
                    <h3 className="text-xl font-bold">Development & Optimization</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-[background-color,transform] duration-300 group-hover:scale-110">
                    <Code2 className="w-7 h-7 text-purple-400 group-hover:text-purple-300 transition-colors" />
                  </div>
                </div>
                <p className="text-zinc-400 mb-4 leading-relaxed p-8 rounded-3xl bg-zinc-800 relative overflow-hidden">
                  <span className="absolute top-2 right-2 w-20 h-20 bg-purple-500/5 rounded-full blur-xl" />
                  <span className="relative">
                    Code is written following clean code standards, highly maintainable.
                    Continuous testing, performance optimization and security. You will get
                    regular progress updates and can experience the product
                    early.
                  </span>
                </p>
              </Card>
              <Card customClass="border-2 border-zinc-700 p-8 bg-zinc-900 group hover:border-pink-500/50 transition-[border-color] duration-300">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-bold text-pink-400">04</div>
                    <h3 className="text-xl font-bold">Launch & Support</h3>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/10 flex items-center justify-center group-hover:bg-pink-500/20 transition-[background-color,transform] duration-300 group-hover:scale-110">
                    <Rocket className="w-7 h-7 text-pink-400 group-hover:text-pink-300 transition-colors" />
                  </div>
                </div>
                <p className="text-zinc-400 mb-4 leading-relaxed p-8 rounded-3xl bg-zinc-800 relative overflow-hidden">
                  <span className="absolute top-2 right-2 w-20 h-20 bg-pink-500/5 rounded-full blur-xl" />
                  <span className="relative">
                    Deploy the product to production environment safely.
                    User guides, complete documentation handover and always ready
                    to support, update new features according to your development
                    needs.
                  </span>
                </p>
              </Card>
            </CardSwap>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
