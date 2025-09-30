import { Presentation } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">Công cụ vui</h1>
        <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
          Tổng hợp công cụ có ích cho đời
        </p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href="/slide-maker"
          className="bg-zinc-800 rounded-2xl p-8 flex items-center gap-8 hover:bg-zinc-700 transition-colors duration-200"
        >
          <Presentation className="w-10 h-10" />
          <h2 className="text-xl font-semibold text-zinc-100">
            Simple Slide Maker
          </h2>
        </Link>
      </div>
    </div>
  );
}
