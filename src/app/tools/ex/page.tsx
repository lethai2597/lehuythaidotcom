"use client";

import Link from "next/link";


const EXAMPLES = [
  {
    title: "Debug Crash Heap Snapshot",
    href: "/ex/debug-crash-heap-snapshot",
  },
  {
    title: "Timezone Convension",
    href: "/ex/timezone-convension",
  },
];

export default function ContentExample() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Các ví dụ</h1>
        <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-8">
          Tổng hợp các ví dụ có ích cho đời
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-center">
        {EXAMPLES.map((example) => (
          <Link
            key={example.href}
            href={example.href}
            className="bg-zinc-800 rounded-xl text-2xl p-8 flex items-center gap-8 hover:bg-zinc-700 transition-colors duration-200"
          >
            {example.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
