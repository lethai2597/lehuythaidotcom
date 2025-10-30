"use client";

import { ArrowBigDownDash } from "lucide-react";
import { useEffect, useState } from "react";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerOffset = 80; // Chiều cao của header
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};

export default function Header() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const sections = [
      "home",
      "services",
      "skills",
      "projects",
      "workflow",
      "contact",
      "summary",
    ];

    const observers = sections.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          rootMargin: "-100px 0px -66%",
          threshold: 0,
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, []);

  const handleMenuClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20 text-sm">
        <div className="container mx-auto h-full flex items-center justify-between px-4 md:px-8">
          <button
            onClick={() => scrollToSection("home")}
            className="text-xl md:text-2xl font-black hover:text-indigo-400 transition-colors"
          >
            lehuythai.com
          </button>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-8">
            <div className="rounded-full backdrop-blur-md border bg-zinc-900/30 border-zinc-700/30 flex gap-2 p-2">
              <button
                onClick={() => scrollToSection("home")}
                className="px-4 py-2 flex items-center cursor-pointer gap-2 transition-all duration-500 hover:-translate-y-0.5 hover:text-white"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === "home"
                      ? "w-2 h-2 bg-zinc-200"
                      : "w-0 h-0 bg-transparent"
                  }`}
                ></div>
                <span>Home</span>
              </button>
              <button
                onClick={() => scrollToSection("services")}
                className="px-4 py-2 flex items-center cursor-pointer gap-2 transition-all duration-500 hover:-translate-y-0.5 hover:text-white"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === "services"
                      ? "w-2 h-2 bg-zinc-200"
                      : "w-0 h-0 bg-transparent"
                  }`}
                ></div>
                Services
              </button>
              <button
                onClick={() => scrollToSection("skills")}
                className="px-4 py-2 flex items-center cursor-pointer gap-2 transition-all duration-500 hover:-translate-y-0.5 hover:text-white"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === "skills"
                      ? "w-2 h-2 bg-zinc-200"
                      : "w-0 h-0 bg-transparent"
                  }`}
                ></div>
                Skills
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="px-4 py-2 flex items-center cursor-pointer gap-2 transition-all duration-500 hover:-translate-y-0.5 hover:text-white"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === "projects"
                      ? "w-2 h-2 bg-zinc-200"
                      : "w-0 h-0 bg-transparent"
                  }`}
                ></div>
                Projects
              </button>
              <button
                onClick={() => scrollToSection("workflow")}
                className="px-4 py-2 flex items-center cursor-pointer gap-2 transition-all duration-500 hover:-translate-y-0.5 hover:text-white"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === "workflow"
                      ? "w-2 h-2 bg-zinc-200"
                      : "w-0 h-0 bg-transparent"
                  }`}
                ></div>
                Workflow
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-4 py-2 flex items-center cursor-pointer gap-2 transition-all duration-500 hover:-translate-y-0.5 hover:text-white"
              >
                <div
                  className={`rounded-full transition-all duration-300 ${
                    activeSection === "contact"
                      ? "w-2 h-2 bg-zinc-200"
                      : "w-0 h-0 bg-transparent"
                  }`}
                ></div>
                Contact
              </button>
            </div>

            <a
              href="/files/resume.pdf"
              download="Le_Huy_Thai_Resume.pdf"
              className="group inline-flex items-center gap-2 px-4 py-2 bg-zinc-800/50 hover:bg-zinc-700/50 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm border border-zinc-700/30 h-12"
            >
              <ArrowBigDownDash className="w-5 h-5" />
              Download CV
            </a>

            <button
              onClick={() => scrollToSection("contact")}
              className="relative bg-gradient-to-br from-indigo-700 to-violet-700 cursor-pointer rounded-full backdrop-blur-sm flex items-center gap-4 p-2 overflow-hidden group transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="pl-4 text-white relative z-10">Have an idea?</div>
              <div className="rounded-full bg-white px-4 text-zinc-900 py-2 font-semibold transition-all duration-300 relative z-10 group-hover:scale-105">
                Contact me
              </div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="xl:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
              aria-label="Home"
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
              aria-label="Services"
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
              aria-label="Projects"
            ></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 xl:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div
          className={`absolute top-20 left-0 right-0 bg-zinc-900/95 backdrop-blur-md transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4 py-6 flex flex-col gap-2">
            <button
              onClick={() => handleMenuClick("home")}
              className={`px-4 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-800/50 rounded-lg ${
                activeSection === "home" ? "bg-zinc-800/50" : ""
              }`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === "home"
                    ? "w-2 h-2 bg-indigo-400"
                    : "w-2 h-2 transparent"
                }`}
              ></div>
              <span className="text-lg">Home</span>
            </button>
            <button
              onClick={() => handleMenuClick("services")}
              className={`px-4 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-800/50 rounded-lg ${
                activeSection === "services" ? "bg-zinc-800/50" : ""
              }`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === "services"
                    ? "w-2 h-2 bg-indigo-400"
                    : "w-2 h-2 transparent"
                }`}
              ></div>
              <span className="text-lg">Services</span>
            </button>
            <button
              onClick={() => handleMenuClick("skills")}
              className={`px-4 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-800/50 rounded-lg ${
                activeSection === "skills" ? "bg-zinc-800/50" : ""
              }`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === "skills"
                    ? "w-2 h-2 bg-indigo-400"
                    : "w-2 h-2 transparent"
                }`}
              ></div>
              <span className="text-lg">Skills</span>
            </button>
            <button
              onClick={() => handleMenuClick("projects")}
              className={`px-4 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-800/50 rounded-lg ${
                activeSection === "projects" ? "bg-zinc-800/50" : ""
              }`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === "projects"
                    ? "w-2 h-2 bg-indigo-400"
                    : "w-2 h-2 transparent"
                }`}
              ></div>
              <span className="text-lg">Projects</span>
            </button>
            <button
              onClick={() => handleMenuClick("workflow")}
              className={`px-4 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-800/50 rounded-lg ${
                activeSection === "workflow" ? "bg-zinc-800/50" : ""
              }`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === "workflow"
                    ? "w-2 h-2 bg-indigo-400"
                    : "w-2 h-2 transparent"
                }`}
              ></div>
              <span className="text-lg">Workflow</span>
            </button>
            <button
              onClick={() => handleMenuClick("contact")}
              className={`px-4 py-3 flex items-center gap-3 transition-all duration-300 hover:bg-zinc-800/50 rounded-lg ${
                activeSection === "contact" ? "bg-zinc-800/50" : ""
              }`}
            >
              <div
                className={`rounded-full transition-all duration-300 ${
                  activeSection === "contact"
                    ? "w-2 h-2 bg-indigo-400"
                    : "w-2 h-2 transparent"
                }`}
              ></div>
              <span className="text-lg">Contact</span>
            </button>

            <div className="mt-4 pt-4 border-t border-zinc-800 space-y-3">
              <a
                href="/files/resume.pdf"
                download="Le_Huy_Thai_Resume.pdf"
                className="w-full bg-zinc-800/50 hover:bg-zinc-700/50 text-white font-medium rounded-full flex items-center justify-center gap-2 p-4 transition-all duration-300 border border-zinc-700/30"
              >
                <ArrowBigDownDash className="w-5 h-5" />
                Download CV
              </a>
              <button
                onClick={() => handleMenuClick("contact")}
                className="w-full bg-gradient-to-br from-indigo-700 to-violet-700 cursor-pointer rounded-full flex items-center justify-center gap-2 p-4 overflow-hidden group transition-all duration-300"
              >
                <span className="text-white font-semibold">Contact me</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
