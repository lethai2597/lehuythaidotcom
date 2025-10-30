"use client";

import { motion } from "framer-motion";
import CountUp from "../CountUp";

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

const statCardVariants = {
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

const statsData = [
  {
    number: 5,
    suffix: "+",
    label: "Years of experience",
    gradient: "from-purple-400 to-violet-400",
    bgGradient: "from-purple-500/10 to-violet-500/10",
  },
  {
    number: 15,
    suffix: "+",
    label: "Technologies mastered",
    gradient: "from-orange-400 to-red-400",
    bgGradient: "from-orange-500/10 to-red-500/10",
  },
  {
    number: 10,
    suffix: "+",
    label: "Projects completed",
    gradient: "from-blue-400 to-cyan-400",
    bgGradient: "from-blue-500/10 to-cyan-500/10",
  },
  {
    number: 99,
    suffix: "%",
    label: "Satisfied clients",
    gradient: "from-green-400 to-emerald-400",
    bgGradient: "from-green-500/10 to-emerald-500/10",
  },
];

export default function Statistics() {
  return (
    <section id="statistics" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
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
            My achievements
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto mb-8 text-zinc-400"
            variants={titleVariants}
          >
            Numbers that reflect experience and service quality
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {statsData.map((stat, index) => (
            <motion.div
              key={index}
              variants={statCardVariants}
              className="group"
            >
              <div className="relative">
                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.bgGradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                {/* Main card */}
                <div className="relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 md:p-8 text-center hover:border-zinc-700 transition-all duration-300 group-hover:scale-105">
                  {/* Number with gradient */}
                  <div className="mb-4 flex items-center justify-center">
                    <span
                      className={`text-4xl md:text-5xl lg:text-6xl font-black text-white`}
                    >
                      <CountUp
                        to={stat.number}
                        duration={4}
                        delay={index * 0.2}
                        className="block"
                      />
                    </span>
                    <span
                      className={`text-2xl md:text-3xl lg:text-4xl font-black text-white ml-1`}
                    >
                      {stat.suffix}
                    </span>
                  </div>

                  {/* Label */}
                  <h3 className="text-white text-lg md:text-xl font-bold mb-2">
                    {stat.label}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom decorative text */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-zinc-500 text-sm">
            And these numbers are still growing...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
