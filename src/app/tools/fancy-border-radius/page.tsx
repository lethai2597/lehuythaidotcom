"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

// Each edge has 1 handle
interface EdgeHandles {
  top: number; // Handle position on top edge (0-100%)
  right: number; // Handle position on right edge (0-100%)
  bottom: number; // Handle position on bottom edge (0-100%)
  left: number; // Handle position on left edge (0-100%)
}

export default function FancyBorderRadius() {
  const containerRef = useRef<HTMLDivElement>(null);
  const size = 400; // Fixed size
  const [copied, setCopied] = useState(false);
  const [isDragging, setIsDragging] = useState<string | null>(null);

  // Each edge has 1 handle
  // Default values to produce: 42% 58% 26% 74% / 40% 72% 28% 61%
  const [handles, setHandles] = useState<EdgeHandles>({
    top: 42,    // top-left horizontal = 42%, top-right horizontal = 58% (100-42)
    right: 72,  // top-right vertical = 72%, bottom-right vertical = 28% (100-72)
    bottom: 74, // bottom-right horizontal = 26% (100-74), bottom-left horizontal = 74%
    left: 40,   // top-left vertical = 40%, bottom-left vertical = 60% (100-40)
  });

  // Calculate CSS border-radius value
  // Format: horizontal-values / vertical-values
  // Each corner uses the handle from its two adjacent edges
  const calculateBorderRadius = useCallback((): string => {
    // Top-left corner: uses top edge (horizontal from left) and left edge (vertical from top)
    const topLeftH = handles.top;
    const topLeftV = handles.left;

    // Top-right corner: uses top edge (horizontal from right, inverted) and right edge (vertical from top)
    const topRightH = 100 - handles.top;
    const topRightV = handles.right;

    // Bottom-right corner: uses bottom edge (horizontal from right, inverted) and right edge (vertical from bottom, inverted)
    const bottomRightH = 100 - handles.bottom;
    const bottomRightV = 100 - handles.right;

    // Bottom-left corner: uses bottom edge (horizontal from left) and left edge (vertical from bottom, inverted)
    const bottomLeftH = handles.bottom;
    const bottomLeftV = 100 - handles.left;

    const horizontalValues = [topLeftH, topRightH, bottomRightH, bottomLeftH];
    const verticalValues = [topLeftV, topRightV, bottomRightV, bottomLeftV];

    const hStr = horizontalValues.map((v) => `${Math.round(v)}%`).join(" ");
    const vStr = verticalValues.map((v) => `${Math.round(v)}%`).join(" ");

    return `${hStr} / ${vStr}`;
  }, [handles]);

  const borderRadiusValue = calculateBorderRadius();

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    edge: keyof EdgeHandles
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(edge);
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      let percentage = 0;

      if (isDragging === "top" || isDragging === "bottom") {
        // Horizontal edges (top or bottom)
        const x = e.clientX - rect.left;
        percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      } else {
        // Vertical edges (left or right)
        const y = e.clientY - rect.top;
        percentage = Math.max(0, Math.min(100, (y / rect.height) * 100));
      }

      setHandles((prev) => ({
        ...prev,
        [isDragging]: percentage,
      }));
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(null);
  }, []);

  // Mouse move and up handlers
  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const copyToClipboard = async () => {
    const cssValue = `border-radius: ${borderRadiusValue};`;
    try {
      await navigator.clipboard.writeText(cssValue);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  const resetHandles = () => {
    setHandles({
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    });
  };

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Fancy Border Radius
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Create fancy border-radius by dragging the control points
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Preview Section */}
          <div className="bg-zinc-800 rounded-4xl p-8">
            <div className="pb-8">
              <h2 className="text-xl font-semibold mb-2">Preview</h2>
              <p className="text-sm text-zinc-300">
                Drag the control points on each edge to change border-radius
              </p>
            </div>

            <div className="flex flex-col items-center gap-6">
              {/* Container with handles */}
              <div
                ref={containerRef}
                className="relative border-2 border-dashed rounded-2xl border-white"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  minWidth: `${size}px`,
                  minHeight: `${size}px`,
                }}
              >
                {/* Shape preview */}
                <div
                  className="absolute inset-0"
                  style={{
                    borderRadius: borderRadiusValue,
                    background:
                      "linear-gradient(135deg, #5A2E8F 0%, #E93E8F 100%)",
                    boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
                  }}
                />

                {/* Top edge handle */}
                <div
                  className="absolute top-0 cursor-grab active:cursor-grabbing w-4 h-4 bg-white rounded-sm transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-125 transition-transform shadow-lg"
                  style={{
                    left: `${handles.top}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "top")}
                />

                {/* Right edge handle */}
                <div
                  className="absolute right-0 cursor-grab active:cursor-grabbing w-4 h-4 bg-white rounded-sm transform translate-x-1/2 -translate-y-1/2 z-10 hover:scale-125 transition-transform shadow-lg"
                  style={{
                    top: `${handles.right}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "right")}
                />

                {/* Bottom edge handle */}
                <div
                  className="absolute bottom-0 cursor-grab active:cursor-grabbing w-4 h-4 bg-white rounded-sm transform -translate-x-1/2 translate-y-1/2 z-10 hover:scale-125 transition-transform shadow-lg"
                  style={{
                    left: `${handles.bottom}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "bottom")}
                />

                {/* Left edge handle */}
                <div
                  className="absolute left-0 cursor-grab active:cursor-grabbing w-4 h-4 bg-white rounded-sm transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-125 transition-transform shadow-lg"
                  style={{
                    top: `${handles.left}%`,
                  }}
                  onMouseDown={(e) => handleMouseDown(e, "left")}
                />
              </div>
            </div>
          </div>

          {/* Settings Section */}
          <div className="bg-zinc-800 rounded-4xl p-8 flex flex-col">
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-white mb-2">
                CSS Value
              </h2>
              <p className="text-sm">Copy border-radius value</p>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              {/* Border radius display */}
              <div className="space-y-2">
                <Label>border-radius:</Label>
                <div className="bg-zinc-900 rounded-lg p-4 font-mono text-sm text-white break-all">
                  {borderRadiusValue}
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
                  onClick={resetHandles}
                  className="bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                >
                  Reset
                </Button>
              </div>

              {/* Info */}
              <div className="text-xs text-zinc-400 space-y-1 mt-auto pt-4 border-t border-zinc-700">
                <p>• Each edge has 1 control point</p>
                <p>• Drag control points along the edge to adjust</p>
                <p>• Control points are the vertices of border-radius</p>
                <p>• Values are calculated as percentages</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
