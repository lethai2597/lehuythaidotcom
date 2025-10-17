"use client";

import { useState, useEffect } from "react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'JK Wedding Invitation',
          text: 'You are invited to our wedding!',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (err) {
        console.log('Error copying:', err);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/60 backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="text-2xl font-bold text-gray-800">TT</div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
            >
              HOME
            </button>
            <button
              onClick={() => scrollToSection("our-story")}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
            >
              OUR STORY
            </button>
            <button
              onClick={() => scrollToSection("bride-groom")}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
            >
              BRIDE & GROOM
            </button>
            <button
              onClick={() => scrollToSection("rsvp")}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
            >
              RSVP
            </button>
            <button
              onClick={() => scrollToSection("photo-gallery")}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
            >
              GALLERY
            </button>
          </nav>

          {/* Share Button */}
          <div className="flex items-center space-x-2">
            <button 
              onClick={handleShare}
              className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm"
            >
              SHARE
            </button>
            <span className="text-gray-800">→</span>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-800"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4 pt-4">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm text-left"
              >
                HOME
              </button>
              <button
                onClick={() => scrollToSection("our-story")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm text-left"
              >
                OUR STORY
              </button>
              <button
                onClick={() => scrollToSection("bride-groom")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm text-left"
              >
                BRIDE & GROOM
              </button>
              <button
                onClick={() => scrollToSection("rsvp")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm text-left"
              >
                RSVP
              </button>
              <button
                onClick={() => scrollToSection("photo-gallery")}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm text-left"
              >
                GALLERY
              </button>
              <button
                onClick={handleShare}
                className="text-gray-800 hover:text-gray-600 transition-colors duration-200 font-medium tracking-wide uppercase text-sm text-left"
              >
                SHARE
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
