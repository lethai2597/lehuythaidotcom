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
      {/* Back to home button */}
      <Link
        href="/tools"
        className="absolute top-6 left-6 z-50 p-3 rounded-full bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
        title="Về trang chủ"
      >
        <Home className="w-5 h-5" />
      </Link>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            QR Code Generator
          </h1>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Tạo mã QR đẹp và tùy chỉnh cho mọi nhu cầu
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-zinc-800 rounded-4xl p-8">
            <div className="pb-8">
              <h2 className="text-xl font-semibold mb-2">Tạo QR Code</h2>
              <p className="text-sm text-zinc-300">
                Nhập nội dung và tùy chỉnh giao diện
              </p>
            </div>

            <div className="space-y-6">
              {/* Text Input */}
              <div className="space-y-2">
                <Label htmlFor="qr-content">Nội dung QR Code</Label>
                <Textarea
                  id="qr-content"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Nhập URL, text, hoặc dữ liệu khác..."
                  className="min-h-[120px] bg-zinc-900 border-none"
                />
              </div>

              {/* Preset Buttons */}
              <div className="space-y-2">
                <Label>Mẫu có sẵn</Label>
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
                <Label>Kích thước: {size}px</Label>
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
                  <Label>Màu QR</Label>
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
                  <Label>Màu nền</Label>
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
                  <span className="font-medium">Tùy chỉnh nâng cao</span>
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
                    <Label>Mức độ sửa lỗi</Label>
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
                          Thấp (L) - QR nhỏ nhất
                        </SelectItem>
                        <SelectItem value="M">
                          Trung bình (M) - Cân bằng tốt
                        </SelectItem>
                        <SelectItem value="Q">
                          Cao (Q) - Chịu che khuất 25%
                        </SelectItem>
                        <SelectItem value="H">
                          Rất cao (H) - Chịu che khuất 30%
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Margin */}
                  <div className="space-y-2">
                    <Label>Khoảng cách: {margin}px</Label>
                    <Slider
                      value={[margin]}
                      onValueChange={(value) => setMargin(value[0])}
                      min={0}
                      max={10}
                      step={1}
                      className="w-full [&_[data-slot=slider-track]]:bg-zinc-700 [&_[data-slot=slider-range]]:bg-white [&_[data-slot=slider-thumb]]:bg-white [&_[data-slot=slider-thumb]]:border-white [&_[data-slot=slider-thumb]]:hover:bg-pink-50"
                    />
                    <div className="flex justify-between text-xs text-zinc-400">
                      <span>0px - Sát viền</span>
                      <span>10px - Rộng rãi</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="bg-zinc-800 rounded-4xl p-8 flex flex-col">
            <div className="pb-8">
              <h2 className="text-xl font-semibold text-white mb-2">Kết quả</h2>
              <p className="text-sm">Xem trước và tải xuống QR Code</p>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              <div className="flex-1 space-y-6">
                {/* QR Code Display */}
                <div className="flex justify-center">
                  {isGenerating ? (
                    <div className="w-64 h-64 bg-zinc-700 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-zinc-400">
                        <div className="animate-spin w-8 h-8 border-2 border-zinc-400 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-sm">Đang tạo QR Code...</p>
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
                        <p className="text-sm">Nhập nội dung để tạo QR Code</p>
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
                      Tải xuống
                    </Button>
                    <Button
                      onClick={copyQR}
                      className="flex-1 bg-zinc-700 hover:bg-zinc-600 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Đã sao chép
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Sao chép
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="text-xs text-zinc-400 space-y-1">
                <p>
                  • Mức độ sửa lỗi cao hơn = QR code lớn hơn nhưng bền vững hơn
                </p>
                <p>• Kích thước tối thiểu: 128px, tối đa: 512px</p>
                <p>• Hỗ trợ: URL, text, email, số điện thoại, WiFi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
