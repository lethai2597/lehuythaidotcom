"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

interface RSVPFormData {
  name: string;
  side: "bride" | "groom" | "";
  attending: boolean;
  needTransport: boolean | undefined;
}

export default function RSVP() {
  const { ref, isVisible } = useScrollAnimation();
  const [formData, setFormData] = useState<RSVPFormData>({
    name: "",
    side: "",
    attending: true,
    needTransport: undefined,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: "rsvp@wedding.com", // Placeholder email
          message: `${formData.name}|${
            formData.side === "bride" ? "Cô dâu" : "Chú rể"
          }|${formData.attending ? "Tham " : "Không"} tham dự|${
            formData.needTransport === undefined
              ? "Không"
              : formData.needTransport
              ? "Có"
              : "Không"
          } dùng xe`,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          side: "",
          attending: true,
          needTransport: undefined,
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section ref={ref} id="rsvp" className="py-40 bg-yellow-700/5">
      <motion.div 
        className="container mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="text-center mb-12">
          <h2 className="text-9xl font-medium font-allura mb-4 leading-tight text-transparent bg-clip-text bg-gradient-to-br from-black to-gray-400">
            RSVP
          </h2>
          <p className="text-gray-500 font-merriweather max-w-xl mx-auto">
            Xác nhận sự có mặt của bạn
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-6xl mx-auto">
          {/* Ảnh bên trái */}
          <div className="relative">
            <div className="overflow-hidden aspect-square md:aspect-auto">
              <Image
                src="/wedding/18.jpg"
                alt="Wedding Hero"
                width={1168}
                height={1752}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 border-1 border-yellow-800/30 m-4"></div>
          </div>

          {/* Form bên phải */}
          <div className="flex items-center flex-1">
            <div className="p-16 bg-white w-full shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Tên */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-merriweather font-bold">
                    HỌ VÀ TÊN *
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="NGUYỄN VĂN A"
                    required
                    className="h-12 text-xl"
                  />
                </div>

                {/* Chọn bên */}
                <div className="space-y-3">
                  <Label className="font-merriweather font-semibold text-gray-700">
                    Bạn thuộc bên *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        id="side-bride"
                        name="side"
                        checked={formData.side === "bride"}
                        onChange={() =>
                          setFormData({ ...formData, side: "bride" })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="side-bride"
                        className={`block w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-center font-merriweather font-medium text-sm border-1 ${
                          formData.side === "bride"
                            ? "border-yellow-800/50 bg-yellow-800/5 text-yellow-800"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        CÔ DÂU
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="radio"
                        id="side-groom"
                        name="side"
                        checked={formData.side === "groom"}
                        onChange={() =>
                          setFormData({ ...formData, side: "groom" })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="side-groom"
                        className={`block w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-center font-merriweather font-medium text-sm border-1 ${
                          formData.side === "groom"
                            ? "border-yellow-800/50 bg-yellow-800/5 text-yellow-800"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        CHÚ RỂ
                      </label>
                    </div>
                  </div>
                </div>

                {/* Xác nhận tham dự */}
                <div className="space-y-3">
                  <Label className="font-merriweather font-semibold text-gray-700">
                    BẠN CÓ THỂ THAM DỰ KHÔNG? *
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        type="radio"
                        id="attending-yes"
                        name="attending"
                        checked={formData.attending}
                        onChange={() =>
                          setFormData({ ...formData, attending: true })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="attending-yes"
                        className={`block w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-center font-merriweather font-medium text-sm border-1 ${
                          formData.attending
                            ? "border-yellow-800/50 bg-yellow-800/5 text-yellow-800"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        CÓ
                      </label>
                    </div>

                    <div className="relative">
                      <input
                        type="radio"
                        id="attending-no"
                        name="attending"
                        checked={!formData.attending}
                        onChange={() =>
                          setFormData({ ...formData, attending: false })
                        }
                        className="sr-only"
                      />
                      <label
                        htmlFor="attending-no"
                        className={`block w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-center font-merriweather font-medium text-sm border-1 ${
                          !formData.attending
                            ? "border-yellow-800/50 bg-yellow-800/5 text-yellow-800"
                            : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        KHÔNG
                      </label>
                    </div>
                  </div>
                </div>

                {/* Xe đưa đón */}
                {formData.attending && (
                  <div className="space-y-3">
                    <Label className="font-merriweather font-semibold text-gray-700">
                      CẦN XE ĐƯA ĐÓN TỪ HÀ NỘI?
                    </Label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="relative">
                        <input
                          type="radio"
                          id="transport-yes"
                          name="transport"
                          checked={formData.needTransport === true}
                          onChange={() =>
                            setFormData({ ...formData, needTransport: true })
                          }
                          className="sr-only"
                        />
                        <label
                          htmlFor="transport-yes"
                          className={`block w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-center font-merriweather font-medium text-sm border-1 ${
                            formData.needTransport === true
                              ? "border-yellow-800/50 bg-yellow-800/5 text-yellow-800"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          CÓ
                        </label>
                      </div>

                      <div className="relative">
                        <input
                          type="radio"
                          id="transport-no"
                          name="transport"
                          checked={formData.needTransport === false}
                          onChange={() =>
                            setFormData({ ...formData, needTransport: false })
                          }
                          className="sr-only"
                        />
                        <label
                          htmlFor="transport-no"
                          className={`block w-full p-3 rounded-xl cursor-pointer transition-all duration-200 text-center font-merriweather font-medium text-sm border-1 ${
                            formData.needTransport === false
                              ? "border-yellow-800/50 bg-yellow-800/5 text-yellow-800"
                              : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          KHÔNG
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting ||
                      !formData.name.trim() ||
                      !formData.side ||
                      (formData.attending &&
                        formData.needTransport === undefined)
                    }
                    className="w-full h-12 font-merriweather font-bold bg-yellow-700 hover:bg-yellow-800 text-white rounded-full transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>ĐANG GỬI...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Send className="w-5 h-5" />
                        <span>GỬI XÁC NHẬN</span>
                      </div>
                    )}
                  </Button>
                </div>

                {/* Status Messages */}
                {submitStatus === "success" && (
                  <div className="text-green-600 text-sm rounded-lg font-merriweather text-center">
                    CẢM ƠN BẠN ĐÃ XÁC NHẬN! CHÚNG MÌNH RẤT MONG ĐƯỢC GẶP BẠN.
                  </div>
                )}

                {submitStatus === "error" && (
                  <div className="text-red-600 text-sm rounded-lg font-merriweather text-center">
                    CÓ LỖI XẢY RA. VUI LÒNG THỬ LẠI SAU.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
