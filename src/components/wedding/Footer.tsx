"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
            <div className="text-2xl font-bold text-gray-800">TT</div>
          </div>
          
          {/* Simple text */}
          <p className="text-gray-600 mb-4">
            Cảm ơn bạn đã là một phần quan trọng trong ngày đặc biệt của chúng tôi
          </p>
          
          {/* Date */}
          <p className="text-gray-800 font-medium">
            26 Tháng 10, 2025
          </p>
        </div>
      </div>
    </footer>
  );
}
