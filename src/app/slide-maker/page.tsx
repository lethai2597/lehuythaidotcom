"use client";

import { useState, useEffect, useRef } from "react";
import { Play, ChevronRight } from "lucide-react";

interface SlideElement {
  type: "h1" | "h2" | "h3" | "list" | "image" | "content";
  content: string;
  items?: string[]; // for list items
  src?: string; // for image src
  alt?: string; // for image alt
  lines?: string[]; // for content type
}

interface RevealState {
  visibleLines: number;
  isComplete: boolean;
}

// Simple markdown parser - now creates a single slide with all content
function parseMarkdown(markdown: string): SlideElement[] {
  const lines = markdown.split("\n").filter((line) => line.trim() !== "");
  const allContent: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    // Headers
    if (trimmed.startsWith("# ")) {
      allContent.push(`# ${trimmed.substring(2)}`);
    } else if (trimmed.startsWith("## ")) {
      allContent.push(`## ${trimmed.substring(3)}`);
    } else if (trimmed.startsWith("### ")) {
      allContent.push(`### ${trimmed.substring(4)}`);
    }
    // Lists
    else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      allContent.push(trimmed);
    }
    // Images
    else if (
      trimmed.startsWith("![") &&
      trimmed.includes("](") &&
      trimmed.endsWith(")")
    ) {
      allContent.push(trimmed);
    }
    // Regular text (not empty lines)
    else if (trimmed !== "") {
      allContent.push(trimmed);
    }
  }

  // Create a single slide with all content
  return [
    {
      type: "content",
      content: allContent.join("\n"),
      lines: allContent,
    } as SlideElement & { lines: string[] },
  ];
}

// Slide component
function SlideDisplay({
  slide,
  onNext,
  onExit,
  autoStart = false,
}: {
  slide: SlideElement;
  onNext: () => void;
  onExit: () => void;
  autoStart?: boolean;
}) {
  const [revealState, setRevealState] = useState<RevealState>({
    visibleLines: 0,
    isComplete: false,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset reveal state when slide changes
    setRevealState({
      visibleLines: 0,
      isComplete: false,
    });
  }, [slide]);

  // Auto-start effect
  useEffect(() => {
    if (
      autoStart &&
      slide.type === "content" &&
      slide.lines &&
      slide.lines.length > 0
    ) {
      setRevealState({
        visibleLines: 1,
        isComplete: false,
      });
    }
  }, [autoStart, slide]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        if (slide.type === "content" && slide.lines) {
          // For content, reveal lines one by one
          if (revealState.visibleLines < slide.lines.length) {
            setRevealState((prev) => ({
              ...prev,
              visibleLines: prev.visibleLines + 1,
            }));
          } else {
            // Do nothing when complete - only ESC to exit
          }
        } else {
          // For other elements, do nothing - only ESC to exit
        }
      } else if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onNext, onExit, slide.type, slide.lines, revealState.visibleLines]);

  // Auto scroll to the latest visible line
  useEffect(() => {
    if (
      slide.type === "content" &&
      slide.lines &&
      revealState.visibleLines > 0 &&
      containerRef.current
    ) {
      const visibleElements =
        containerRef.current.querySelectorAll("[data-line-index]");
      const lastVisibleElement = visibleElements[revealState.visibleLines - 1];
      if (lastVisibleElement) {
        // If it's the last line, scroll to end of container
        if (revealState.visibleLines === slide.lines.length) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        } else {
          lastVisibleElement.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }
    }
  }, [revealState.visibleLines, slide.type, slide.lines]);

  const renderElement = () => {
    if (slide.type === "content" && slide.lines) {
      return (
        <div className="w-full">
          <div className="space-y-8">
            {slide.lines.map((line, index) => {
              const isVisible = index < revealState.visibleLines;
              const trimmed = line.trim();

              // Render different types of content
              if (trimmed.startsWith("# ")) {
                return (
                  <h1
                    key={index}
                    data-line-index={index}
                    className={`text-8xl text-white mt-16 font-bold text-left leading-tight transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {trimmed.substring(2)}
                  </h1>
                );
              } else if (trimmed.startsWith("## ")) {
                return (
                  <h2
                    key={index}
                    data-line-index={index}
                    className={`text-7xl mt-16 text-white font-semibold text-left leading-tight transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {trimmed.substring(3)}
                  </h2>
                );
              } else if (trimmed.startsWith("### ")) {
                return (
                  <h3
                    key={index}
                    data-line-index={index}
                    className={`text-5xl mt-16 text-white font-medium text-left leading-tight transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {trimmed.substring(4)}
                  </h3>
                );
              } else if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
                return (
                  <div
                    key={index}
                    data-line-index={index}
                    className={`text-4xl text-left leading-tight transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    <span className="mr-3">•</span>
                    {trimmed.substring(2)}
                  </div>
                );
              } else if (
                trimmed.startsWith("![") &&
                trimmed.includes("](") &&
                trimmed.endsWith(")")
              ) {
                const match = trimmed.match(/!\[(.*?)\]\((.*?)\)/);
                if (match) {
                  return (
                    <div
                      key={index}
                      data-line-index={index}
                      className={`flex justify-center items-center transition-all duration-500 ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={match[2]}
                        alt={match[1] || "Slide image"}
                        className="max-w-full max-h-[500px] rounded-3xl object-contain"
                      />
                    </div>
                  );
                }
              }
              // Regular text
              else {
                return (
                  <p
                    key={index}
                    data-line-index={index}
                    className={`text-4xl text-left leading-tight transition-all duration-500 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }`}
                  >
                    {trimmed}
                  </p>
                );
              }
            })}
          </div>
        </div>
      );
    }

    // Fallback for other slide types (shouldn't happen with new parser)
    return null;
  };

  return (
    <div className="h-screen flex items-center justify-center p-8 relative overflow-hidden text-2xl font-semibold">
      <div className="max-w-7xl w-full relative z-10">
        {/* Sticky header outside of scrollable container */}
        {revealState.visibleLines > 1 && (
          <div className="absolute top-0 w-full z-30 mb-0">
            <div className="h-32 bg-gradient-to-b from-zinc-900 to-transparent pointer-events-none" />
          </div>
        )}

        <div
          ref={containerRef}
          className="h-[800px] overflow-y-auto scrollbar-hide mb-8 relative"
        >
          <div className="w-full relative leading-tight">{renderElement()}</div>
        </div>

        {/* Navigation hint */}
        <div className="flex items-center justify-end space-x-3 text-zinc-300 text-sm">
          <span className="flex items-center gap-4">
            {slide.type === "content" &&
            slide.lines &&
            revealState.visibleLines < slide.lines.length ? (
              <>
                <span className="text-zinc-500">•</span>
                <span>
                  Dòng {revealState.visibleLines}/{slide.lines.length}
                </span>
              </>
            ) : null}
            {slide.type === "content" &&
              slide.lines &&
              revealState.visibleLines <= slide.lines.length && (
                <>
                  <span className="text-zinc-500">•</span>{" "}
                  <span className="text-zinc-500">Esc để thoát</span>
                </>
              )}
          </span>
        </div>
      </div>
    </div>
  );
}

// Title display component
function TitleDisplay({
  title,
  onStart,
  onExit,
}: {
  title: string;
  onStart: () => void;
  onExit: () => void;
}) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        onStart();
      } else if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onStart, onExit]);

  return (
    <div className="h-screen flex items-center justify-center p-8 relative overflow-hidden">
      <div className="max-w-7xl w-full relative z-10 text-center">
        <h1 className="text-8xl text-white font-bold leading-tight mb-8">
          {title}
        </h1>

        {/* Navigation hint */}
        <div className="flex items-center justify-center space-x-4 text-zinc-300 text-sm">
          <span className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Enter để bắt đầu
          </span>

          <span className="text-zinc-500">•</span>

          <span className="text-zinc-500">Esc để thoát</span>
        </div>
      </div>
    </div>
  );
}

// Main component
export default function MarkdownToSlide() {
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [slides, setSlides] = useState<SlideElement[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isSlideMode, setIsSlideMode] = useState(false);
  const [isTitleMode, setIsTitleMode] = useState(false);

  const handleStart = () => {
    const parsedSlides = parseMarkdown(markdown);
    setSlides(parsedSlides);
    setCurrentSlideIndex(0);
    setIsTitleMode(true);
  };

  const handleTitleStart = () => {
    setIsTitleMode(false);
    setIsSlideMode(true);
  };

  const handleSlideNext = () => {
    // Since we only have one slide now, just go back to editor
    setIsSlideMode(false);
    setCurrentSlideIndex(0);
  };

  const handleExit = () => {
    setIsSlideMode(false);
    setIsTitleMode(false);
    setCurrentSlideIndex(0);
  };

  if (isTitleMode && title.trim()) {
    return (
      <TitleDisplay
        title={title}
        onStart={handleTitleStart}
        onExit={handleExit}
      />
    );
  }

  if (isSlideMode && slides.length > 0) {
    return (
      <SlideDisplay
        slide={slides[currentSlideIndex]}
        onNext={handleSlideNext}
        onExit={handleExit}
        autoStart={true}
      />
    );
  }

  return (
    <div className="">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Simple Slide Maker
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Tạo slide thuyết trình đơn giản
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Input Section */}
          <div className="bg-zinc-800 rounded-4xl p-8">
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-zinc-100">
                Nhập nội dung
              </h2>
              <p className="text-sm text-zinc-300 mt-1">
                Tiêu đề hiện trước, các dòng sau line by line
              </p>
            </div>

            <div className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Nhập tiêu đề slide..."
                  className="w-full p-4 rounded-2xl bg-zinc-900 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Markdown Input */}
              <div>
                <label className="block text-sm font-medium text-zinc-200 mb-2">
                  Nội dung
                </label>
                <textarea
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder={`## Tiêu đề lớn  
### Tiêu đề nhỏ

Đoạn văn

- Mục 1
- Mục 2
- Mục 3

![](đường-dẫn-ảnh)`}
                  className="w-full h-80 p-4 rounded-3xl font-mono text-sm bg-zinc-900 scrollbar-hide text-zinc-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={handleStart}
                  disabled={!markdown.trim() || !title.trim()}
                  className="inline-flex items-center gap-3 px-6 py-3 bg-white text-zinc-900 rounded-xl font-medium hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  <Play className="w-5 h-5" />
                  Bắt đầu Slide
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
