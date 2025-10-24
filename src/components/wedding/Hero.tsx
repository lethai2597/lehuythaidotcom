import Image from "next/image";
import { MapPin, Phone, QrCode } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import CircularText from "../CircularText";
import QRModal from "./QRModal";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Hero() {
  const [isBrideQRModalOpen, setIsBrideQRModalOpen] = useState(false);
  const [isGroomQRModalOpen, setIsGroomQRModalOpen] = useState(false);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="hero" className="py-40 font-allura">
      <motion.div 
        className="container mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-16 items-center relative"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-7xl md:text-9xl gap-4 grid text-center md:text-left">
          <div className="">
            Save
          </div>
          <div className="">
            The
          </div>
          <div className="">
            Dates
          </div>

          <div className="md:mt-16 w-40 h-40 relative flex items-center justify-center scale-75 xl:scale-100 mx-auto md:mx-0">
            <CircularText
              text="You are invited * "
              onHover="slowDown"
              spinDuration={20}
              className="font-sans -ml-0 animate-pulse relative z-10"
            />
            <div className="absolute w-full h-full top-0 left-0 z-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-gray-600 border-4 border-gray-200"></div>
            </div>
          </div>
        </div>
        <div className="relative grid gap-8 justify-items-center">
          <div className="relative">
            <div className="max-w-xs md:max-w-auto aspect-square md:aspect-[1/2] rounded-full overflow-hidden">
              <Image
                src="/wedding/24.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'left bottom' }}
              />
            </div>
            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
            <div className="absolute bottom-0 right-0 text-9xl text-yellow-900/70">
              01
            </div>
          </div>
          <div className="h-12 w-[1px] bg-gray-200"></div>
          <div className="text-center">
            <div className="text-gray-500 mb-2 font-sans">18 July 2021</div>
            <div className="text-2xl font-merriweather">ĐIỂM BẮT ĐẦU</div>
          </div>
        </div>
        <div className="relative grid gap-8 justify-items-center">
          <div className="relative">
            <div className="max-w-xs md:max-w-auto aspect-square md:aspect-[1/2] rounded-full overflow-hidden">
              <Image
                src="/wedding/7.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
            <div className="absolute bottom-0 right-0 text-9xl text-yellow-900/70">
              02
            </div>
          </div>
          <div className="h-12 w-[1px] bg-gray-200"></div>
          <div className="text-center">
            <div className="text-gray-500 mb-2 font-sans">26 October 2025</div>
            <div className="text-2xl font-merriweather">LÀ NGÀY CƯỚI</div>
          </div>
        </div>
        <div className="relative grid gap-8 justify-items-center">
          <div className="relative">
            <div className="max-w-xs md:max-w-auto aspect-square md:aspect-[1/2] rounded-full overflow-hidden">
              <Image
                src="/wedding/23.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
                style={{ objectPosition: 'bottom' }}
              />
            </div>
            <div className="absolute inset-0 border-2 border-white/30 m-4 rounded-full"></div>
            <div className="absolute bottom-0 right-0 text-9xl text-yellow-900/70">
              03
            </div>
          </div>
          <div className="h-12 w-[1px] bg-gray-200"></div>
          <div className="text-center">
            <div className="text-gray-500 mb-2 font-sans">Và</div>
            <div className="text-2xl font-merriweather">ĐẾN VÔ TẬN</div>
          </div>
        </div>
      </motion.div>

      {/* THÔNG TIN NHANH */}
      <motion.div 
        className="pt-16"
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-merriweather font-bold text-gray-800">
              THÔNG TIN NHANH
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {/* Cô dâu */}
            <div className="text-center bg-gray-50 rounded-4xl p-4 md:p-8">
              <div className="text-2xl font-merriweather mb-4">
                CÔ DÂU
              </div>
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="tel:0396842631"
                  className="flex font-merriweather items-center justify-center cursor-pointer transition-all duration-300 px-4 py-3 rounded-3xl font-bold flex-col gap-2 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm truncate">0396 842 631</span>
                </a>

                <a 
                  href="https://maps.app.goo.gl/23u6DTQAnZ3CG6xn6?g_st=ipc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex font-merriweather items-center justify-center cursor-pointer transition-all duration-300 px-4 py-3 rounded-3xl font-bold flex-col gap-2 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm truncate">LOCATION</span>
                </a>

                <button
                  onClick={() => setIsBrideQRModalOpen(true)}
                  className="flex font-merriweather items-center justify-center cursor-pointer transition-all duration-300 px-4 py-3 rounded-3xl font-bold flex-col gap-2 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-sm truncate">QR CODE</span>
                </button>
              </div>
            </div>

            {/* Chú rể */}
            <div className="text-center bg-gray-50 rounded-4xl p-4 md:p-8">
              <div className="text-2xl font-merriweather mb-4">
                CHÚ RỂ
              </div>
              <div className="grid grid-cols-3 gap-4">
                <a 
                  href="tel:0961741678"
                  className="flex font-merriweather items-center justify-center space-x-2 cursor-pointer transition-all duration-300 px-4 py-3 rounded-3xl font-bold flex-col gap-2 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-sm truncate">0961 741 678</span>
                </a>

                <a 
                  href="https://maps.app.goo.gl/bC6piUzynDB775d3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex font-merriweather items-center justify-center space-x-2 cursor-pointer transition-all duration-300 px-4 py-3 rounded-3xl font-bold flex-col gap-2 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="text-sm truncate">LOCATION</span>
                </a>

                <button
                  onClick={() => setIsGroomQRModalOpen(true)}
                  className="flex font-merriweather items-center justify-center space-x-2 cursor-pointer transition-all duration-300 px-4 py-3 rounded-3xl font-bold flex-col gap-2 text-yellow-800/60 hover:text-yellow-800/80 bg-yellow-800/5"
                >
                  <QrCode className="w-5 h-5" />
                  <span className="text-sm truncate">QR CODE</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* QR Modals */}
      <QRModal
        isOpen={isBrideQRModalOpen}
        onClose={() => setIsBrideQRModalOpen(false)}
        qrImage="/wedding/bride-qr.jpg"
      />
      
      <QRModal
        isOpen={isGroomQRModalOpen}
        onClose={() => setIsGroomQRModalOpen(false)}
        qrImage="/wedding/groom-qr.jpg"
      />
    </section>
  );
}
