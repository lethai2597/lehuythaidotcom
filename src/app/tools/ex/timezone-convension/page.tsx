import { Server, Globe, ArrowDown } from "lucide-react";

// Đây là dữ liệu giả lập bạn nhận được từ API/backend
// Chuỗi ISO 8601 với 'Z' ở cuối biểu thị đây là giờ UTC
const utcDateStringFromServer = "2026-01-01T01:30:00.000Z";

export default function TimezoneExample() {
  // JavaScript Date object tự động hiểu chuỗi ISO 8601 là UTC
  const localDate = new Date(utcDateStringFromServer);

  // Dùng toLocaleString để trình duyệt tự chuyển về múi giờ của người dùng
  // và định dạng theo ngôn ngữ của họ (ở đây là tiếng Việt)
  const userFriendlyDisplayTime = localDate.toLocaleString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="h-screen mx-auto text-white flex flex-col justify-center items-center p-4"
      style={{ aspectRatio: "9/16" }}
    >
      <div className="w-full max-w-sm mx-auto p-6 bg-zinc-800 rounded-3xl shadow-lg flex flex-col gap-4">
        {/* SERVER SIDE */}
        <div className="p-4 bg-zinc-900 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Server className="w-6 h-6 text-sky-400" />
            <h2 className="font-bold text-lg">Server Gửi Về</h2>
          </div>
          <p className="font-mono text-yellow-300 bg-black bg-opacity-25 p-2 rounded-md text-center">
            {utcDateStringFromServer}
          </p>
          <p className="text-xs text-zinc-400 text-center mt-2">
            (Giờ chuẩn UTC)
          </p>
        </div>

        <ArrowDown className="w-10 h-10 text-zinc-500 self-center" />

        {/* CLIENT SIDE */}
        <div className="p-4 bg-zinc-900 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-6 h-6 text-green-400" />
            <h2 className="font-bold text-lg">Client Hiển Thị</h2>
          </div>
          <p className="font-sans text-green-300 bg-black bg-opacity-25 p-3 rounded-md text-center text-lg">
            {userFriendlyDisplayTime}
          </p>
          <p className="text-xs text-zinc-400 text-center mt-2">
            (Đã đổi sang giờ địa phương của bạn)
          </p>
        </div>
      </div>
    </div>
  );
}
