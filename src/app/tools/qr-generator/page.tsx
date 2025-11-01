"use client";

import { useState, useEffect, useCallback } from "react";
import {
  QrCode,
  Download,
  Home,
  Copy,
  Check,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";
import QRCodeLib from "qrcode";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import Image from "next/image";

export default function QRGenerator() {
  const [text, setText] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState(256);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "Q" | "H">("M");
  const [margin, setMargin] = useState(4);
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const generateQR = useCallback(async () => {
    if (!text.trim()) return;

    setIsGenerating(true);
    try {
      const options = {
        errorCorrectionLevel: errorLevel,
        margin: margin,
        color: {
          dark: color,
          light: backgroundColor,
        },
        width: size,
      };

      const url = await QRCodeLib.toDataURL(text, options);
      setQrCodeUrl(url);
    } catch (error) {
      console.error("Error generating QR code:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [text, errorLevel, margin, color, backgroundColor, size]);

  // Auto-generate QR when settings change
  useEffect(() => {
    if (text.trim()) {
      const timeoutId = setTimeout(() => {
        generateQR();
      }, 500); // Debounce 500ms

      return () => clearTimeout(timeoutId);
    }
  }, [text, size, errorLevel, margin, color, backgroundColor, generateQR]);

  const downloadQR = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.download = `qr-code-${Date.now()}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyQR = async () => {
    if (!qrCodeUrl) return;

    try {
      const response = await fetch(qrCodeUrl);
      const blob = await response.blob();
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob,
        }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying QR code:", error);
    }
  };

  const presetTexts = [
    { label: "Website", value: "https://lehuythai.com" },
    { label: "Email", value: "mailto:contact@example.com" },
    { label: "Phone", value: "tel:+84123456789" },
    { label: "WiFi", value: "WIFI:T:WPA;S:NetworkName;P:password123;;" },
  ];

  return (
    <div className="">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            QR Code Generator
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Create beautiful and customizable QR codes for any need
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-zinc-800 rounded-4xl p-8">
            <div className="pb-8">
              <h2 className="text-xl font-semibold mb-2">Create QR Code</h2>
              <p className="text-sm text-zinc-300">
                Enter content and customize appearance
              </p>
            </div>

            <div className="space-y-6">
              {/* Text Input */}
              <div className="space-y-2">
                <Label htmlFor="qr-content">QR Code Content</Label>
                <Textarea
                  id="qr-content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter URL, text, or other data..."
                  className="min-h-[120px] bg-zinc-900 border-none"
                />
              </div>

              {/* Preset Buttons */}
              <div className="space-y-2">
                <Label>Presets</Label>
                <div className="grid grid-cols-2 gap-2">
                  {presetTexts.map((preset) => (
                    <Button
                      key={preset.label}
                      onClick={() => setText(preset.value)}
                      className="bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                    >
                      {preset.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Size Setting */}
              <div className="space-y-2">
                <Label>Size: {size}px</Label>
                <Slider
                  value={[size]}
                  onValueChange={(value) => setSize(value[0])}
                  min={128}
                  max={512}
                  step={32}
                  className="w-full [&_[data-slot=slider-track]]:bg-zinc-700 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:hover:bg-pink-50"
                />
              </div>

              {/* Colors */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>QR Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: color }}
                      ></div>
                      <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="absolute inset-0 w-10 h-10 opacity-0"
                      />
                    </div>

                    <Input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="flex-1 bg-zinc-900 border-none focus:ring-white font-mono text-sm"
                      placeholder="#000000"
                      maxLength={7}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <div
                        className="w-10 h-10 rounded-lg"
                        style={{ backgroundColor: backgroundColor }}
                      ></div>
                      <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        className="absolute inset-0 w-10 h-10 opacity-0"
                      />
                    </div>

                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1 bg-zinc-900 border-none focus:ring-white font-mono text-sm"
                      placeholder="#ffffff"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Settings Toggle */}
              <Button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="w-full bg-zinc-700 hover:bg-zinc-600 cursor-pointer justify-between"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Advanced Settings</span>
                </div>
                {showAdvanced ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </Button>

              {/* Advanced Settings */}
              {showAdvanced && (
                <div className="space-y-4">
                  {/* Error Level */}
                  <div className="space-y-2">
                    <Label>Error Correction Level</Label>
                    <Select
                      value={errorLevel}
                      onValueChange={(value: "L" | "M" | "Q" | "H") =>
                        setErrorLevel(value)
                      }
                    >
                      <SelectTrigger className="bg-zinc-700 border-none w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-700 border-zinc-700">
                        <SelectItem value="L">
                          Low (L) - Smallest QR
                        </SelectItem>
                        <SelectItem value="M">
                          Medium (M) - Good balance
                        </SelectItem>
                        <SelectItem value="Q">
                          High (Q) - 25% damage resistant
                        </SelectItem>
                        <SelectItem value="H">
                          Very High (H) - 30% damage resistant
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Margin */}
                  <div className="space-y-2">
                    <Label>Margin: {margin}px</Label>
                    <Slider
                      value={[margin]}
                      onValueChange={(value) => setMargin(value[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full [&_[data-slot=slider-track]]:bg-zinc-700 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:hover:bg-pink-50"
                    />
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>0px - No margin</span>
                      <span>10px - Spacious</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-zinc-800 rounded-4xl p-8 flex flex-col">
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-white mb-2">Result</h2>
              <p className="text-sm">Preview and download QR Code</p>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              <div className="flex-1 space-y-6">
                {/* QR Code Display */}
                <div className="flex justify-center">
                  {isGenerating ? (
                    <div className="w-64 h-64 bg-zinc-700 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-zinc-400">
                        <div className="animate-spin w-8 h-8 border-2 border-zinc-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-sm">Generating QR Code...</p>
                      </div>
                    </div>
                  ) : qrCodeUrl ? (
                    <Image
                      src={qrCodeUrl}
                      alt="Generated QR Code"
                      className="max-w-full h-auto rounded-2xl shadow-lg"
                      width={256}
                      height={256}
                    />
                  ) : (
                    <div className="w-64 h-64 bg-zinc-700 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-zinc-400">
                        <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                        <p className="text-sm">Enter content to<br />generate QR Code</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {qrCodeUrl && (
                  <div className="flex gap-3">
                    <Button
                      onClick={downloadQR}
                      className="flex-1 cursor-pointer bg-white hover:bg-zinc-100 text-zinc-900"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button
                      onClick={copyQR}
                      className="flex-1 bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-xs text-zinc-400 space-y-1">
                <p>
                  • Higher error correction = Larger QR code but more durable
                </p>
                <p>• Minimum size: 128px, Maximum: 512px</p>
                <p>• Supports: URL, text, email, phone number, WiFi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
