import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tất cả các trường đều bắt buộc' },
        { status: 400 }
      );
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error('Missing Telegram configuration');
      return NextResponse.json(
        { error: 'Cấu hình Telegram chưa được thiết lập' },
        { status: 500 }
      );
    }

    // Format message for Telegram
    const telegramMessage = `
*${name}*(${email})
_${new Date().toLocaleString('vi-VN')}_

${message}
`;

    // Send message to Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Telegram API error:', errorData);
      return NextResponse.json(
        { error: 'Không thể gửi tin nhắn' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Tin nhắn đã được gửi thành công!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
}
