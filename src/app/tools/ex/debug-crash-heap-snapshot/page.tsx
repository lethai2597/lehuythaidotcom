"use client";

import { Zap, MemoryStick, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

// Hàm format bytes cho dễ đọc
const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export default function MemoryLeakExample() {
  const [, setLeakyArray] = useState<string[][]>([]);
  const [memoryUsage, setMemoryUsage] = useState<MemoryInfo | null>(null);

  const causeLeak = () => {
    // Tạo 1 triệu phần tử mới để gây rò rỉ bộ nhớ
    const newLeakyData = new Array(1000000).fill("Oops!");
    setLeakyArray((prev) => [...prev, newLeakyData]);

    // Cập nhật thông tin bộ nhớ ngay lập tức
    // `performance.memory` là một API đồng bộ, nên chúng ta có thể lấy giá trị ngay
    setMemoryUsage(
      (performance as Performance & { memory: MemoryInfo }).memory
    );
  };

  return (
    <div
      className="h-screen mx-auto text-white flex flex-col justify-center items-center px-20"
      style={{ aspectRatio: "9/16" }}
    >
      <div className="w-full max-w-sm mx-auto p-6 bg-zinc-800 rounded-3xl flex flex-col gap-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <AlertTriangle className="text-yellow-400 w-8 h-8" />
          <h1 className="text-2xl font-bold text-zinc-100">Memory Leak Test</h1>
        </div>

        <p className="text-zinc-400 text-sm">
          Mỗi lần nhấn nút, một lượng lớn dữ liệu sẽ được thêm vào mà không được
          giải phóng.
        </p>

        <div className="p-4 bg-zinc-900 rounded-xl">
          <div className="flex items-center gap-3 justify-center">
            <MemoryStick className="w-6 h-6 text-cyan-400" />
            <span className="font-mono text-lg text-zinc-200">
              {memoryUsage
                ? formatBytes(memoryUsage.usedJSHeapSize)
                : "Chưa có dữ liệu"}
            </span>
          </div>
          <div className="text-xs text-zinc-500 mt-1">Bộ nhớ đang sử dụng</div>
        </div>

        <button
          onClick={causeLeak}
          className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-xl transition-transform transform active:scale-95"
        >
          <Zap className="w-5 h-5" />
          Gây Rò Rỉ Bộ Nhớ
        </button>
      </div>
    </div>
  );
}
