import { MonitorCheck, Plus, Presentation, QrCode } from "lucide-react";
import Link from "next/link";
import DownloadApp from "@/components/DownloadApp";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">Lê Huy Thái</h1>
        <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-8">
          Tổng hợp công cụ có ích cho đời
        </p>

        {/* Download App Button */}
        <div className="flex justify-center gap-4 items-center">
          <DownloadApp />

          <a
            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            href="https://www.facebook.com/ko.ten.2571997/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Plus className="w-5 h-5" />
            <span>Request new tool</span>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link
          href="/tools/slide-maker"
          className="bg-zinc-800 rounded-2xl p-8 flex items-center gap-8 hover:bg-zinc-700 transition-colors duration-200"
        >
          <Presentation className="w-14 h-14" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-zinc-100 mb-1">
              Simple Slide Maker
            </h2>
            <div className="flex items-center gap-2 text-green-400">
              <div className="flex items-center gap-1">
                <MonitorCheck className="w-4 h-4" />
                <span className="text-sm">Desktop Only</span>
              </div>
            </div>
          </div>
        </Link>

        <Link
          href="/tools/qr-generator"
          className="bg-zinc-800 rounded-2xl p-8 flex items-center gap-8 hover:bg-zinc-700 transition-colors duration-200"
        >
          <QrCode className="w-14 h-14" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-zinc-100 mb-1">
              QR Code Generator
            </h2>
          </div>
        </Link>

        <a
          href="https://www.facebook.com/ko.ten.2571997/"
          className="bg-zinc-800 rounded-2xl p-8 flex items-center gap-8 hover:bg-zinc-700 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Plus className="w-14 h-14" />
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-zinc-100 mb-1">
              Request new tool
            </h2>
            <div className="text-sm">Contact me to request new tool</div>
          </div>
        </a>
      </div>
    </div>
  );
}
