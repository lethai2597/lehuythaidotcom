"use client";

import {
  Phone,
  Mail,
  Facebook,
  Youtube,
  Send,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 20,
      stiffness: 100,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 120,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring" as const,
      damping: 25,
      stiffness: 100,
      delay: 0.2,
    },
  },
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Tin nhắn đã được gửi thành công! Mình sẽ phản hồi sớm nhất có thể.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Có lỗi xảy ra, vui lòng thử lại sau",
        });
      }
    } catch {
      setSubmitStatus({
        type: "error",
        message: "Có lỗi xảy ra, vui lòng thử lại sau",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 md:pt-40 md:pb-80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10 px-4">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            variants={titleVariants}
          >
            Kết nối với mình
          </motion.h2>
          <motion.p
            className="text-base md:text-lg max-w-2xl mx-auto text-zinc-400"
            variants={titleVariants}
          >
            Có ý tưởng hoặc dự án muốn thảo luận? Đừng ngần ngại liên hệ với
            mình. Mình luôn sẵn sàng lắng nghe và hợp tác!
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-16 w-full"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Contact Info */}
          <motion.div
            className="space-y-6 md:space-y-8 md:col-span-2"
            variants={itemVariants}
          >
            <motion.h3
              className="text-lg md:text-xl font-bold text-white mb-4 md:mb-8"
              variants={itemVariants}
            >
              Liên hệ mình
            </motion.h3>

            {/* Phone */}
            <motion.div
              className="flex items-center gap-3 md:gap-4"
              variants={itemVariants}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 md:w-6 md:h-6 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 mb-1">
                  Số điện thoại
                </h3>
                <a
                  href="tel:0961741678"
                  className="text-base md:text-lg font-semibold text-white hover:text-indigo-400 transition-colors"
                >
                  0961 741 678
                </a>
              </div>
            </motion.div>

            {/* Email */}
            <motion.div
              className="flex items-center gap-3 md:gap-4"
              variants={itemVariants}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 md:w-6 md:h-6 text-violet-400" />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-zinc-500 mb-1">
                  Email
                </h3>
                <a
                  href="mailto:lethai2597@gmail.com"
                  className="text-base md:text-lg font-semibold text-white hover:text-violet-400 transition-colors break-all"
                >
                  lethai2597@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Social Links */}
            <motion.div className="pt-6 md:pt-8" variants={itemVariants}>
              <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-8">
                Theo dõi mình
              </h3>
              <div className="space-y-3 md:space-y-4">
                <a
                  href="https://www.facebook.com/ko.ten.2571997/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <Facebook className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 mb-1">
                      Facebook
                    </h4>
                    <p className="text-base md:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      @ko.ten.2571997
                    </p>
                  </div>
                </a>

                <a
                  href="https://www.youtube.com/@lehuythaidotcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 group"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-500/10 flex items-center justify-center shrink-0 group-hover:bg-red-500/20 transition-colors">
                    <Youtube className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-zinc-500 mb-1">
                      Youtube
                    </h4>
                    <p className="text-base md:text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                      @lehuythaidotcom
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-zinc-900/50 backdrop-blur-sm p-6 md:p-8 rounded-3xl md:col-span-3"
            variants={formVariants}
          >
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold text-zinc-400 mb-2"
                  >
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nguyễn Văn A"
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 text-white placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800 transition-all text-sm md:text-base"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-zinc-400 mb-2"
                  >
                    Email/SĐT
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@... hoặc 09..."
                    className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 text-white placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800 transition-all text-sm md:text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-zinc-400 mb-2"
                >
                  Nội dung
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Chia sẻ ý tưởng hoặc dự án của bạn..."
                  rows={6}
                  className="w-full px-4 py-3 rounded-xl bg-zinc-800/50 text-white placeholder:text-zinc-500 focus:outline-none focus:bg-zinc-800 transition-all resize-none text-sm md:text-base"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full overflow-hidden relative px-6 md:px-8 py-3 md:py-4 bg-gradient-to-br from-indigo-700 to-violet-700 cursor-pointer rounded-full font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex items-center justify-center gap-2 text-white group-hover:scale-105 transition-all duration-300 text-sm md:text-base">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Đang gửi...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 md:w-5 md:h-5" />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </div>
              </button>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={`rounded-xl flex items-center gap-2 text-sm font-medium ${
                    submitStatus.type === "success"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {submitStatus.type === "success" && (
                    <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                  {submitStatus.type === "error" && (
                    <XCircle className="w-4 h-4 md:w-5 md:h-5" />
                  )}
                  <div className="flex-1">{submitStatus.message}</div>
                </div>
              )}
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
