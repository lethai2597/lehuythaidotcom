"use client";

import { Facebook, Youtube } from "lucide-react";
import Link from "next/link";

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

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/50">
      <div className="container mx-auto px-4 md:px-8 py-6 md:py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          {/* Left side - Logo and copyright */}
          <div className="flex flex-col gap-1 items-center md:items-start">
            <button
              onClick={() => scrollToSection("home")}
              className="text-base md:text-lg font-bold hover:text-zinc-400 transition-colors text-center md:text-left"
            >
              I&apos;m Thai
            </button>
            <p className="text-xs text-zinc-600">
              © {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* Right side - Contact button and social links */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Social Icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <a
                href="https://www.facebook.com/ko.ten.2571997/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-blue-400 transition-colors p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 md:w-5 md:h-5" />
              </a>

              <a
                href="https://www.youtube.com/@lehuythaidotcom"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-400 hover:text-red-400 transition-colors p-1"
                aria-label="Youtube"
              >
                <Youtube className="w-5 h-5 md:w-5 md:h-5" />
              </a>
            </div>

            <Link
              className="md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors"
              href="/tools"
            >
              Tools
            </Link>

            {/* Contact Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="md:px-4 py-1.5 md:py-2 text-xs md:text-sm text-zinc-300 hover:text-white transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
