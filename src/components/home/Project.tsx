"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

const STACKS_IMAGES = {
  // Core Technologies
  JavaScript: "/icons/tech/javascript.svg",
  "Node.js": "/icons/tech/nodejs.svg",
  TypeScript: "/icons/tech/typescript.svg",
  Git: "/icons/tech/git.svg",
  // Frameworks & Databases
  React: "/icons/tech/react.svg",
  "Next.js": "/icons/tech/nextjs.svg",
  "React Native": "/icons/tech/react.svg",
  "Express.js": "/icons/tech/express.svg",
  "Nest.js": "/icons/tech/nestjs.svg",
  MySQL: "/icons/tech/mysql.svg",
  PostgreSQL: "/icons/tech/postgresql.svg",
  MongoDB: "/icons/tech/mongodb.svg",
};

const PROJECTS = [
  {
    image: "moni",
    name: "Moniapp.io.vn",
    role: "Full-stack Developer",
    teamSize: 2,
    stacks: ["React", "Nest.js", "PostgreSQL", "Git"],
  },
  {
    image: "24karat",
    name: "24Karat.io",
    role: "Frontend Developer",
    teamSize: 16,
    stacks: ["Next.js", "Git"],
  },
  {
    image: "pinksale",
    name: "Pinksale.finance",
    role: "Full-stack Developer",
    teamSize: 6,
    stacks: ["Next.js", "Nest.js", "MongoDB", "TailwindCss", "Git"],
  },
  {
    image: "note",
    name: "Note.fun",
    role: "Frontend Developer",
    teamSize: 6,
    stacks: ["Next.js", "Nest.js", "MongoDB", "TailwindCss", "Git"],
  },
  {
    image: "hectagon",
    name: "Hectagon.finance",
    role: "Full-stack DApp Developer",
    teamSize: 26,
    stacks: ["React", "Nest.js", "PostgreSQL", "Git"],
  },
  {
    image: "alotruck",
    name: "AloTruck.vn",
    role: "Full-stack Developer",
    teamSize: 8,
    stacks: ["React", "Express.js", "MongoDB", "Ant Design", "Git"],
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
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

export default function Project() {
  return (
    <section id="projects" className="py-20 md:py-40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -left-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />

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

      <div className="container mx-auto px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Projects & Experience
          </motion.h2>
          <motion.p
            className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            A collection of projects I&apos;ve worked on throughout my career
          </motion.p>
        </motion.div>

        {/* Projects List */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.name}
              className="-mb-4 group"
              variants={itemVariants}
            >
              {/* Image */}
              <motion.div className="relative" variants={imageVariants}>
                <div className="aspect-video w-full rounded-3xl 2xl:rounded-4xl bg-zinc-900 ring-1 ring-white/10 overflow-hidden">
                  <Image
                    src={`/imgs/${project.image}.png`}
                    alt={project.name}
                    width={1600}
                    height={900}
                    className="w-full h-full object-cover opacity-90 brightness-95 contrast-105 saturate-110 transition-all duration-300 group-hover:opacity-100 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/20 to-zinc-950/40 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                </div>
              </motion.div>

              {/* Content */}
              <motion.div
                className="space-y-4 bg-zinc-800 group-hover:rotate-x-64 group-hover:rotate-y-64 rounded-4xl p-8 2xl:mx-16 -translate-y-12 group-hover:2xl:-translate-y-4 transition-all duration-300"
                variants={itemVariants}
              >
                <a
                  href={`https://${project.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl md:text-2xl font-bold text-white block"
                >
                  {project.name}
                </a>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="">{project.role}</span>
                  <span className="text-zinc-400">|</span>
                  <span className="">Team: {project.teamSize} members</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.stacks
                    .filter(
                      (stack) =>
                        STACKS_IMAGES[stack as keyof typeof STACKS_IMAGES]
                    )
                    .map((stack, stackIndex) => {
                      const stackImage =
                        STACKS_IMAGES[stack as keyof typeof STACKS_IMAGES];
                      return (
                        <div
                          key={stackIndex}
                          className="rounded-full h-12 w-12 first:ml-0 -ml-4 overflow-hidden bg-zinc-800 p-2 border-2 border-zinc-700"
                        >
                          {stackImage ? (
                            <Image
                              src={stackImage}
                              alt={stack}
                              width={20}
                              height={20}
                              className="w-full h-full object-cover"
                            />
                          ) : null}
                        </div>
                      );
                    })}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.p
          className="text-center text-zinc-400 mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={itemVariants}
        >
          And many more projects...
        </motion.p>
      </div>
    </section>
  );
}
