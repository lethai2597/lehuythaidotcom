"use client";

import { MapPin, Phone, QrCode } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import QRModal from "./QRModal";

export default function GroomInformation() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);

  return (
    <section className="py-40">
      <div className="container mx-auto flex flex-col md:flex-row p-8 gap-8 md:gap-16 items-center">
        <div className="relative md:w-2/5 w-full order-2 md:order-1">
          <div className="md:aspect-[5/8] relative aspect-square max-w-xs md:max-w-full mx-auto md:mx-0 rounded-full overflow-hidden">
            <Image
              src="/wedding/32.jpg"
              alt="Wedding Hero"
              width={1168}
              height={1752}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
          </div>
        </div>
        <div className="flex-1 text-center">
          <div className="text-2xl font-merriweather mb-2">CHÚ RỂ</div>
          <h2 className="text-7xl md:text-9xl mb-4 font-medium font-allura leading-tight text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-400">
            Huy Thái
          </h2>

          <div className="mb-8 max-w-xl mx-auto font-merriweather text-gray-700 leading-relaxed">
            "Mong bạn sắp xếp thời gian để đến dự lễ cưới và bữa cơm thân mật
            của chúng mình. Cảm ơn bạn đã đến dự."
          </div>

          <div className="mb-12">
            <div className="text-2xl font-bold font-merriweather mb-4 text-yellow-800/80">
              TIỆC CƯỚI
            </div>
            <div className="text-xl font-merriweather mb-4">
              15 GIỜ 0' - THỨ BẢY - 25 Tháng 10, 2025
            </div>

            <div className="text-2xl font-bold font-merriweather mb-4 text-yellow-800/80">
              LỄ CƯỚI
            </div>
            <div className="text-xl font-merriweather mb-4">
              10 GIỜ 0' - CHỦ NHẬT - 26 Tháng 10, 2025
            </div>

            <div className="text-2xl font-bold font-merriweather mb-4 text-yellow-800/80">
              TẠI
            </div>

            <div className="text-2xl font-merriweather font-bold mb-8">
              KHU 3 - THANH THUỶ - PHÚ THỌ
            </div>
          </div>

          <div className="flex items-center flex-wrap justify-center gap-4">
            <a 
              href="tel:0961741678"
              className="flex font-merriweather items-center justify-center space-x-2 cursor-pointer bg-yellow-800/60 hover:bg-yellow-800/80 transition-all duration-300 px-6 py-3 rounded-full font-bold text-white"
            >
              <Phone className="w-6 h-6" />
              <span>0961 741 678</span>
            </a>

            <a 
              href="https://maps.app.goo.gl/bC6piUzynDB775d3A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex font-merriweather items-center justify-center space-x-2 cursor-pointer bg-yellow-800/60 hover:bg-yellow-800/80 transition-all duration-300 px-6 py-3 rounded-full font-bold text-white"
            >
              <MapPin className="w-6 h-6" />
              <span>GOOGLE MAPS</span>
            </a>

            <button
              onClick={() => setIsQRModalOpen(true)}
              className="flex font-merriweather items-center justify-center space-x-2 cursor-pointer bg-yellow-800/60 hover:bg-yellow-800/80 transition-all duration-300 px-6 py-3 rounded-full font-bold text-white"
            >
              <QrCode className="w-6 h-6" />
              <span>QR CODE</span>
            </button>
          </div>
        </div>
      </div>

      {/* QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        qrImage="/wedding/groom-qr.jpg"
      />
    </section>
  );
}
