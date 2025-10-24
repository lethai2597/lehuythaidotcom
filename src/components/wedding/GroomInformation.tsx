"use client";

import { MapPin, Phone, QrCode } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import QRModal from "./QRModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function GroomInformation() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-40">
      <motion.div 
        className="container mx-auto flex flex-col md:flex-row p-8 gap-8 md:gap-16 items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div 
          className="relative md:w-2/5 w-full order-2 md:order-1"
          initial={{ opacity: 0, x: 50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
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
        </motion.div>
        <motion.div 
          className="flex-1 text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <div className="text-2xl font-merriweather mb-2">CHÚ RỂ</div>
          <h2 className="text-7xl xl:text-9xl mb-4 font-medium font-allura leading-tight text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-400">
            Huy Thái
          </h2>

          <div className="mb-8 max-w-xl mx-auto font-merriweather text-gray-700 leading-relaxed">
            &ldquo;Mong bạn sắp xếp thời gian để đến dự lễ cưới và bữa cơm thân mật
            của chúng mình. Cảm ơn bạn đã đến dự.&rdquo;
          </div>

          <div className="mb-12">
            <div className="text-2xl font-bold font-merriweather mb-4 text-yellow-800/80">
              TIỆC CƯỚI
            </div>
            <div className="text-xl font-merriweather mb-4">
              15 GIỜ 0&apos; - THỨ BẢY - 25 Tháng 10, 2025
            </div>

            <div className="text-2xl font-bold font-merriweather mb-4 text-yellow-800/80">
              LỄ CƯỚI
            </div>
            <div className="text-xl font-merriweather mb-4">
              10 GIỜ 0&apos; - CHỦ NHẬT - 26 Tháng 10, 2025
            </div>

            <div className="text-2xl font-bold font-merriweather mb-4 text-yellow-800/80">
              TẠI
            </div>

            <div className="text-2xl font-merriweather font-bold mb-8">
              KHU 3 - THANH THUỶ - PHÚ THỌ
            </div>
          </div>

          <motion.div 
            className="flex items-center flex-wrap justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            <a 
              href="tel:0961741678"
              className="flex font-merriweather items-center justify-center cursor-pointer  transition-all duration-300 px-6 py-3 rounded-3xl font-bold flex-col gap-3 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
            >
              <Phone className="w-6 h-6" />
              <span>0961 741 678</span>
            </a>

            <a 
              href="https://maps.app.goo.gl/bC6piUzynDB775d3A"
              target="_blank"
              rel="noopener noreferrer"
              className="flex font-merriweather items-center justify-center cursor-pointer  transition-all duration-300 px-6 py-3 rounded-3xl font-bold flex-col gap-3 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
            >
              <MapPin className="w-6 h-6" />
              <span>LOCATION</span>
            </a>

            <button
              onClick={() => setIsQRModalOpen(true)}
              className="flex font-merriweather items-center justify-center cursor-pointer  transition-all duration-300 px-6 py-3 rounded-3xl font-bold flex-col gap-3 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
            >
              <QrCode className="w-6 h-6" />
              <span>QR CODE</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* QR Modal */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        qrImage="/wedding/groom-qr.jpg"
      />
    </section>
  );
}
