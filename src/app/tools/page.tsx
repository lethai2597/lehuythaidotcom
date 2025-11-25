import {
  MonitorCheck,
  Plus,
  Presentation,
  QrCode,
  SquareRoundCorner,
  Scissors,
  LucideIcon,
  Hexagon,
} from "lucide-react";
import Link from "next/link";

type ToolItem = {
  id: string;
  title: string;
  icon: LucideIcon;
  href: string;
  badge?: {
    icon: LucideIcon;
    text: string;
    color?: string;
  };
};

const tools: ToolItem[] = [
  {
    id: "slide-maker",
    title: "Simple Slide Maker",
    icon: Presentation,
    href: "/tools/slide-maker",
    badge: {
      icon: MonitorCheck,
      text: "Desktop Only",
      color: "text-green-400",
    },
  },
  {
    id: "qr-generator",
    title: "QR Code Generator",
    icon: QrCode,
    href: "/tools/qr-generator",
  },
  {
    id: "fancy-border-radius",
    title: "Fancy Border Radius",
    icon: SquareRoundCorner,
    href: "/tools/fancy-border-radius",
  },
  {
    id: "clip-path-maker",
    title: "Clip Path Maker",
    icon: Hexagon,
    href: "/tools/clip-path-maker",
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4">My Tools</h1>
        <p className="text-zinc-300 text-lg max-w-2xl mx-auto mb-8">
          I make tools to help me and others.
        </p>

        {/* Download App Button */}
        <div className="flex justify-center gap-4 items-center">
          <a
            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
            href="https://www.facebook.com/lehuythaidotcom.fb/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Plus className="w-5 h-5" />
            <span>Request new tool</span>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const BadgeIcon = tool.badge?.icon;

          return (
            <Link
              key={tool.id}
              href={tool.href}
              className="bg-zinc-800 rounded-2xl p-6 flex items-center gap-4 hover:bg-zinc-700 transition-colors duration-200"
            >
              <Icon className="w-10 h-10" />
              <div className="flex-1">
                <h2 className="font-semibold text-zinc-100 mb-1">
                  {tool.title}
                </h2>
                {tool.badge && BadgeIcon && (
                  <div
                    className={`flex items-center gap-2 ${
                      tool.badge.color || "text-green-400"
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      <BadgeIcon className="w-4 h-4" />
                      <span className="text-sm">{tool.badge.text}</span>
                    </div>
                  </div>
                )}
              </div>
            </Link>
          );
        })}

        <a
          href="https://www.facebook.com/lehuythaidotcom.fb/"
          className="bg-zinc-800 rounded-2xl p-6 flex items-center gap-4 hover:bg-zinc-700 transition-colors duration-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Plus className="w-10 h-10" />
          <div className="flex-1">
            <h2 className="font-semibold text-zinc-100 mb-1">
              Request new tool
            </h2>
            <div className="text-sm text-zinc-400">
              Contact me to request new tool
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
