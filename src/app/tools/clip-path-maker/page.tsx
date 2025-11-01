"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Copy, Check, RotateCcw, Triangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Point = {
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
};

type PresetShape = {
  name: string;
  points: Point[];
  icon?: React.ReactNode;
};

// Simple icon components for shapes
const ShapeIcon = ({ sides, className }: { sides: number; className?: string }) => {
  const size = 16;
  const center = size / 2;
  const radius = size / 2 - 2;
  const points: string[] = [];
  
  for (let i = 0; i < sides; i++) {
    const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push(`${x},${y}`);
  }
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className={className}>
      <polygon points={points.join(" ")} fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
};

const TrapezoidIcon = ({ className }: { className?: string }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" className={className}>
    <polygon points="4,2 12,2 14,14 2,14" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const ParallelogramIcon = ({ className }: { className?: string }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" className={className}>
    <polygon points="5,2 15,2 11,14 1,14" fill="none" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);

const PRESET_SHAPES: PresetShape[] = [
  {
    name: "Triangle",
    points: [
      { x: 50, y: 0 },
      { x: 0, y: 100 },
      { x: 100, y: 100 },
    ],
    icon: <Triangle className="w-4 h-4" />,
  },
  {
    name: "Trapezoid",
    points: [
      { x: 20, y: 0 },
      { x: 80, y: 0 },
      { x: 100, y: 100 },
      { x: 0, y: 100 },
    ],
    icon: <TrapezoidIcon />,
  },
  {
    name: "Parallelogram",
    points: [
      { x: 25, y: 0 },
      { x: 100, y: 0 },
      { x: 75, y: 100 },
      { x: 0, y: 100 },
    ],
    icon: <ParallelogramIcon />,
  },
  {
    name: "Rhombus",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 50 },
      { x: 50, y: 100 },
      { x: 0, y: 50 },
    ],
    icon: <ShapeIcon sides={4} />,
  },
  {
    name: "Pentagon",
    points: [
      { x: 50, y: 0 },
      { x: 93, y: 25 },
      { x: 75, y: 100 },
      { x: 25, y: 100 },
      { x: 7, y: 25 },
    ],
    icon: <ShapeIcon sides={5} />,
  },
  {
    name: "Hexagon",
    points: [
      { x: 50, y: 0 },
      { x: 100, y: 25 },
      { x: 100, y: 75 },
      { x: 50, y: 100 },
      { x: 0, y: 75 },
      { x: 0, y: 25 },
    ],
    icon: <ShapeIcon sides={6} />,
  },
  {
    name: "Heptagon",
    points: [
      { x: 50, y: 0 },
      { x: 93, y: 14 },
      { x: 100, y: 57 },
      { x: 79, y: 100 },
      { x: 21, y: 100 },
      { x: 0, y: 57 },
      { x: 7, y: 14 },
    ],
    icon: <ShapeIcon sides={7} />,
  },
  {
    name: "Octagon",
    points: [
      { x: 30, y: 0 },
      { x: 70, y: 0 },
      { x: 100, y: 30 },
      { x: 100, y: 70 },
      { x: 70, y: 100 },
      { x: 30, y: 100 },
      { x: 0, y: 70 },
      { x: 0, y: 30 },
    ],
    icon: <ShapeIcon sides={8} />,
  },
];

const DEMO_BACKGROUNDS = [
  {
    name: "Solid Color",
    type: "color" as const,
    value: "#667eea",
  },
  {
    name: "Landscape",
    type: "image" as const,
    value: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
  },
  {
    name: "Ocean",
    type: "image" as const,
    value: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=600&fit=crop",
  },
  {
    name: "City",
    type: "image" as const,
    value: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
  },
];

export default function ClipPathMaker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const size = 400;
  const [copied, setCopied] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<number | null>(null);
  const [points, setPoints] = useState<Point[]>(PRESET_SHAPES[0].points);
  const [selectedBackground, setSelectedBackground] = useState(DEMO_BACKGROUNDS[0]);
  const [customImageUrl, setCustomImageUrl] = useState("");

  // Calculate CSS clip-path value
  const calculateClipPath = useCallback((): string => {
    const pointsStr = points
      .map((p) => `${Math.round(p.x)}% ${Math.round(p.y)}%`)
      .join(", ");
    return `polygon(${pointsStr})`;
  }, [points]);

  const clipPathValue = calculateClipPath();

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingIndex(index);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (draggingIndex === null || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const padding = 10;
      // Calculate position relative to inner container (subtract padding)
      const x = ((e.clientX - rect.left - padding) / (rect.width - padding * 2)) * 100;
      const y = ((e.clientY - rect.top - padding) / (rect.height - padding * 2)) * 100;

      const clampedX = Math.max(0, Math.min(100, x));
      const clampedY = Math.max(0, Math.min(100, y));

      setPoints((prev) =>
        prev.map((p, i) =>
          i === draggingIndex ? { x: clampedX, y: clampedY } : p
        )
      );
    },
    [draggingIndex]
  );

  const handleMouseUp = useCallback(() => {
    setDraggingIndex(null);
  }, []);

  useEffect(() => {
    if (draggingIndex !== null) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [draggingIndex, handleMouseMove, handleMouseUp]);

  const copyToClipboard = async () => {
    const cssValue = `clip-path: ${clipPathValue};`;
    try {
      await navigator.clipboard.writeText(cssValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const applyPreset = (shape: PresetShape) => {
    setPoints([...shape.points]);
  };

  const resetToDefault = () => {
    setPoints(PRESET_SHAPES[0].points);
  };

  const currentBackground = customImageUrl 
    ? { type: "image" as const, value: customImageUrl }
    : selectedBackground;

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Clip Path Maker</h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Create CSS clip-path by dragging control points
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Preview Section - Takes 2 columns */}
          <div className="lg:col-span-2 bg-zinc-800 rounded-4xl p-8">
            <div className="pb-8">
              <h2 className="text-xl font-semibold mb-2">Preview</h2>
              <p className="text-sm text-zinc-300">
                Drag control points to change clip-path shape
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              {/* Container with clip-path - wrapper with padding for handles */}
              <div
                ref={containerRef}
                className="relative"
                style={{
                  width: `${size + 20}px`,
                  height: `${size + 20}px`,
                  padding: "10px",
                }}
              >
                {/* Inner container for clip-path */}
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    minWidth: `${size}px`,
                    minHeight: `${size}px`,
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                  }}
                >
                  {/* Background */}
                  {currentBackground.type === "color" ? (
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        background: currentBackground.value,
                        clipPath: clipPathValue,
                      }}
                    />
                  ) : (
                    <img
                      src={currentBackground.value}
                      alt="Demo"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{
                        clipPath: clipPathValue,
                      }}
                    />
                  )}
                </div>

                {/* Lines connecting points - outside overflow container */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    top: "10px",
                    left: "10px",
                    width: `${size}px`,
                    height: `${size}px`,
                    zIndex: 10,
                  }}
                >
                  <polygon
                    points={points
                      .map(
                        (p) =>
                          `${(p.x / 100) * size},${(p.y / 100) * size}`
                      )
                      .join(" ")}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.5)"
                    strokeWidth="2"
                  />
                </svg>

                {/* Points - positioned relative to outer container, outside overflow */}
                {points.map((point, index) => (
                  <div
                    key={index}
                    className="absolute cursor-grab active:cursor-grabbing w-5 h-5 bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 hover:scale-125 transition-transform shadow-lg border-2 border-zinc-900"
                    style={{
                      left: `calc(10px + ${(point.x / 100) * size}px)`,
                      top: `calc(10px + ${(point.y / 100) * size}px)`,
                      zIndex: 30,
                      pointerEvents: "auto",
                    }}
                    onMouseDown={(e) => handleMouseDown(e, index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-zinc-800 rounded-4xl p-8 flex flex-col space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            <div className="pb-4">
              <h2 className="text-xl font-semibold text-white mb-2">
                CSS Value
              </h2>
              <p className="text-sm text-zinc-300">Copy clip-path value</p>
            </div>

            {/* Clip-path display */}
            <div className="space-y-2">
              <Label>clip-path:</Label>
              <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm text-white break-all max-h-32 overflow-y-auto">
                {clipPathValue}
              </div>
            </div>

            {/* Copy and Reset buttons */}
            <div className="flex gap-3">
              <Button
                onClick={copyToClipboard}
                className="flex-1 cursor-pointer bg-white hover:bg-zinc-100 text-zinc-900"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy CSS
                  </>
                )}
              </Button>
              <Button
                onClick={resetToDefault}
                className="bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>

            {/* Preset shapes */}
            <div className="space-y-2">
              <Label>Preset Shapes</Label>
              <div className="grid grid-cols-2 gap-2">
                {PRESET_SHAPES.map((shape) => (
                  <Button
                    key={shape.name}
                    onClick={() => applyPreset(shape)}
                    className="bg-zinc-700 hover:bg-zinc-600 text-sm cursor-pointer flex items-center gap-2 justify-center"
                  >
                    {shape.icon}
                    {shape.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Demo background */}
            <div className="space-y-2">
              <Label>Demo Background</Label>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_BACKGROUNDS.map((bg) => (
                  <button
                    key={bg.name}
                    onClick={() => {
                      setSelectedBackground(bg);
                      setCustomImageUrl("");
                    }}
                    className={`aspect-video rounded-lg overflow-hidden border-2 transition-all ${
                      selectedBackground.name === bg.name && !customImageUrl
                        ? "border-white"
                        : "border-zinc-600 hover:border-zinc-500"
                    }`}
                  >
                    {bg.type === "color" ? (
                      <div
                        className="w-full h-full"
                        style={{ background: bg.value }}
                      />
                    ) : (
                      <img
                        src={bg.value}
                        alt={bg.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
              <input
                type="text"
                placeholder="Custom URL..."
                value={customImageUrl}
                onChange={(e) => {
                  setCustomImageUrl(e.target.value);
                }}
                className="w-full bg-zinc-900 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 border border-zinc-700 focus:border-white focus:outline-none"
              />
            </div>

            {/* Info */}
            <div className="text-xs text-zinc-400 space-y-1 pt-4 border-t border-zinc-700">
              <p>• Drag points to adjust the shape</p>
              <p>• Click preset to apply predefined shapes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

