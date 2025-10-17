"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  qrImage: string;
}

export default function QRModal({ isOpen, onClose, qrImage }: QRModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl md:rounded-4xl mx-10 max-w-2xl w-full shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute z-10 top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-6 h-6 md:w-10 md:h-10" />
        </button>

        {/* Content */}
        <div className="relative mx-auto">
          <Image
            src={qrImage}
            alt={`QR Code`}
            width={1000}
            height={1000}
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
}
