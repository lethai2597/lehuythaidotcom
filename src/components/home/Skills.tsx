"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Vòng trong - Core Technologies
const CORE_TECH = [
  {
    name: "JavaScript",
    icon: "/icons/tech/javascript.svg",
  },
  {
    name: "Node.js",
    icon: "/icons/tech/nodejs.svg",
  },
  {
    name: "TypeScript",
    icon: "/icons/tech/typescript.svg",
  },
  {
    name: "Git",
    icon: "/icons/tech/git.svg",
  },
];

// Vòng ngoài - Frameworks & Databases
const FRAMEWORKS_AND_DB = [
  {
    name: "React",
    icon: "/icons/tech/react.svg",
  },
  {
    name: "Next.js",
    icon: "/icons/tech/nextjs.svg",
  },
  {
    name: "React Native",
    icon: "/icons/tech/react.svg",
  },
  {
    name: "Express.js",
    icon: "/icons/tech/express.svg",
  },
  {
    name: "Nest.js",
    icon: "/icons/tech/nestjs.svg",
  },
  {
    name: "MySQL",
    icon: "/icons/tech/mysql.svg",
  },
  {
    name: "PostgreSQL",
    icon: "/icons/tech/postgresql.svg",
  },
  {
    name: "MongoDB",
    icon: "/icons/tech/mongodb.svg",
  },
];

export default function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Radius cho 2 vòng
  const innerRadius = 180;
  const outerRadius = 300;
  const centerX = 0;
  const centerY = 0;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="skills" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-3xl" />

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

      <div className="container mx-auto px-8 relative z-10">
        {/* Header with fade in animation */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold leading-relaxed text-white mb-4">
            What technologies do I use?
          </h2>
          <p className="text-zinc-400 text-base md:text-lg max-w-2xl mx-auto">
            Mastering modern technologies to build quality products
          </p>
        </motion.div>

        {/* Mobile Grid Layout */}
        <div className="md:hidden mt-12">
          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[...CORE_TECH, ...FRAMEWORKS_AND_DB].map((tech, index) => (
              <motion.div
                key={`mobile-${index}`}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 150,
                }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <div className="relative w-full aspect-square rounded-xl bg-zinc-900/50 backdrop-blur-sm flex flex-col items-center justify-center gap-2 p-3 transition-all duration-300 hover:bg-zinc-800/50">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="relative z-10"
                  />
                  <span className="text-white text-xs font-medium text-center leading-tight">
                    {tech.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Desktop Circular Layout */}
        <div className="hidden md:block relative w-full max-w-4xl mx-auto aspect-square">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Background decorative circles with scale animation */}
            <div className="absolute inset-0">
              {/* Vòng ngoài - Frameworks */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full border border-indigo-800/20"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-indigo-800/30"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />

              {/* Vòng trong - Core */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-yellow-800/20"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] rounded-full border border-yellow-800/30"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>

            {/* Center glow with smooth pulse */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-indigo-600/30 via-violet-600/30 to-purple-600/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Center icon with rotation */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                type: "spring",
                stiffness: 200,
              }}
            >
              <motion.div
                className="relative w-32 h-32 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 opacity-75"
                  animate={{
                    opacity: [0.5, 0.9, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <motion.svg
                  className="w-16 h-16 text-white relative z-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>

            {/* Vòng trong - Core Technologies */}
            {isMounted &&
              CORE_TECH.map((tech, index) => {
                const angle =
                  (index * 2 * Math.PI) / CORE_TECH.length - Math.PI / 2;
                const x = centerX + innerRadius * Math.cos(angle);
                const y = centerY + innerRadius * Math.sin(angle);
                const techId = `core-${index}`;
                const isHovered = hoveredIndex === techId;

                return (
                  <motion.div
                    key={techId}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      x: x,
                      y: y,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.7 + index * 0.1,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                    onMouseEnter={() => setHoveredIndex(techId)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-yellow-500/30 via-orange-500/30 to-red-500/30 blur-xl"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        className={`relative w-20 h-20 rounded-full bg-zinc-900 border-2 flex items-center justify-center ${
                          isHovered
                            ? "border-yellow-500/80 shadow-lg shadow-yellow-500/50"
                            : "border-zinc-700"
                        }`}
                        animate={{
                          borderColor: isHovered
                            ? "rgba(234, 179, 8, 0.8)"
                            : "rgba(63, 63, 70, 1)",
                        }}
                      >
                        <motion.div
                          animate={{
                            filter: isHovered
                              ? "brightness(1.2)"
                              : "brightness(1)",
                          }}
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={40}
                            height={40}
                            className="relative z-10"
                          />
                        </motion.div>
                      </motion.div>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-800 text-white px-3 py-1 rounded-lg text-sm font-medium z-30"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}

            {/* Vòng ngoài - Frameworks & Databases */}
            {isMounted &&
              FRAMEWORKS_AND_DB.map((tech, index) => {
                const angleOffset = Math.PI / FRAMEWORKS_AND_DB.length;
                const angle =
                  (index * 2 * Math.PI) / FRAMEWORKS_AND_DB.length -
                  Math.PI / 2 +
                  angleOffset;
                const x = centerX + outerRadius * Math.cos(angle);
                const y = centerY + outerRadius * Math.sin(angle);
                const techId = `outer-${index}`;
                const isHovered = hoveredIndex === techId;

                return (
                  <motion.div
                    key={techId}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      x: x,
                      y: y,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: 1.1 + index * 0.08,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={{ scale: 1.2, transition: { duration: 0.2 } }}
                    onMouseEnter={() => setHoveredIndex(techId)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute inset-0 -m-4 rounded-full bg-gradient-to-br from-indigo-500/30 via-violet-500/30 to-purple-500/30 blur-xl"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </AnimatePresence>

                      <motion.div
                        className={`relative w-20 h-20 rounded-full bg-zinc-900 border-2 flex items-center justify-center ${
                          isHovered
                            ? "border-indigo-500/80 shadow-lg shadow-indigo-500/50"
                            : "border-zinc-700"
                        }`}
                        animate={{
                          borderColor: isHovered
                            ? "rgba(99, 102, 241, 0.8)"
                            : "rgba(63, 63, 70, 1)",
                        }}
                      >
                        <motion.div
                          animate={{
                            filter: isHovered
                              ? "brightness(1.2)"
                              : "brightness(1)",
                          }}
                        >
                          <Image
                            src={tech.icon}
                            alt={tech.name}
                            width={40}
                            height={40}
                            className="relative z-10"
                          />
                        </motion.div>
                      </motion.div>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div
                            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-zinc-800 text-white px-3 py-1 rounded-lg text-sm font-medium z-30"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech.name}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <p className="text-zinc-500 text-sm">
            And many more technologies...
          </p>
        </motion.div>
      </div>
    </section>
  );
}
