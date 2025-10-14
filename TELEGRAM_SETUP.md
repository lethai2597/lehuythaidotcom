# Hướng dẫn tích hợp Telegram Bot cho Form Liên hệ

## Bước 1: Tạo Telegram Bot

1. Mở Telegram và tìm `@BotFather`
2. Gửi lệnh `/newbot`
3. Đặt tên cho bot (ví dụ: "Le Huynh Thai Contact Bot")
4. Đặt username cho bot (ví dụ: "lehuythai_contact_bot")
5. **Lưu lại Bot Token** (dạng: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Bước 2: Lấy Chat ID

1. Gửi tin nhắn bất kỳ cho bot vừa tạo
2. Truy cập URL: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
3. Tìm `"chat":{"id":123456789}` trong response
4. **Lưu lại Chat ID** (số này)

## Bước 3: Cấu hình Environment Variables

Tạo file `.env.local` trong thư mục gốc của project:

```env
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
```

**Lưu ý:** 
- Thay `your_bot_token_here` bằng Bot Token thực tế
- Thay `your_chat_id_here` bằng Chat ID thực tế
- Không commit file `.env.local` vào Git

## Bước 4: Test

1. Chạy `pnpm dev`
2. Điền form liên hệ trên website
3. Kiểm tra Telegram để xem tin nhắn

## Tính năng đã tích hợp

✅ Gửi tin nhắn từ form về Telegram
✅ Loading state khi đang gửi
✅ Success/Error messages
✅ Form validation
✅ Responsive design
✅ Auto-clear form sau khi gửi thành công

## Format tin nhắn Telegram

Tin nhắn sẽ có format:
```
🆕 **Tin nhắn mới từ website**

👤 **Tên:** [Tên người gửi]
📧 **Email/SĐT:** [Email hoặc SĐT]

💬 **Nội dung:**
[Nội dung tin nhắn]

---
📅 Thời gian: [Thời gian gửi]
🌐 Website: lehuythaidotcom
```
