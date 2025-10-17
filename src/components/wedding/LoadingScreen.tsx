"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  isVisible: boolean;
  progress?: number;
}

export default function LoadingScreen({
  isVisible,
  progress = 0,
}: LoadingScreenProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isVisible]);

    if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-9999 bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl px-8">
        <div className="text-6xl md:text-8xl font-allura font-bold text-gray-800 relative z-10">
          Thuỷ Tiên
        </div>

        <div className="text-center text-9xl font-allura text-gray-300 scale-150 md:scale-[4] relative z-0 -mb-8">
          &
        </div>

        <div className="text-right text-6xl md:text-8xl font-allura font-bold text-gray-800 relative z-10">
          Huy Thái
        </div>

        <div className="text-center pt-16">
          <p className="text-xl text-gray-600 font-merriweather">
            Loading{dots}
          </p>
        </div>
      </div>
    </div>
  );
}
