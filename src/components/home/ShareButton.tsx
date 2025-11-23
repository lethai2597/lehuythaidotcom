"use client";

import { Share2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function ShareButton() {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    // Kiểm tra xem Web Share API có được hỗ trợ không
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setIsSupported(true);
    }
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: "Lê Huy Thái | lehuythai.com",
      text: "Khám phá portfolio của Lê Huy Thái - Full-stack Developer",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy URL vào clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Đã sao chép link vào clipboard!");
      }
    } catch (error) {
      // Người dùng đã hủy hoặc có lỗi
      if ((error as Error).name !== "AbortError") {
        // Nếu không phải lỗi hủy, thử fallback
        try {
          await navigator.clipboard.writeText(window.location.href);
          alert("Đã sao chép link vào clipboard!");
        } catch (clipboardError) {
          console.error("Lỗi khi sao chép:", clipboardError);
        }
      }
    }
  };

  // Chỉ hiển thị nút nếu Web Share API được hỗ trợ hoặc có clipboard API
  if (typeof navigator === "undefined") {
    return null;
  }

  return (
    <button
      onClick={handleShare}
      className="fixed bottom-6 cursor-pointer right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 active:scale-95 backdrop-blur-sm border border-white/20"
      aria-label="Chia sẻ trang"
      title="Chia sẻ trang này"
    >
      <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
    </button>
  );
}

