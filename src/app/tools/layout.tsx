"use client";

import { ArrowRight, ChevronRight, Home, ToolCase } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isToolsPage = pathname === "/tools";

  return (
    <>
      <div className="flex gap-4 p-4 items-center">
        <Link
          href="/"
          className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
          title="Về trang chủ"
        >
          <Home className="w-5 h-5" />
        </Link>
        {!isToolsPage && (
          <>
            <ChevronRight className="w-5 h-5" />
            <Link
              href="/tools"
              className="flex gap-2 items-center p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
            >
              <ToolCase />
              <span className="text-sm">Tools</span>
            </Link>
          </>
        )}
      </div>

      <div>{children}</div>
    </>
  );
}
