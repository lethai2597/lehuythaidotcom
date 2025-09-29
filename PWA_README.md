# PWA Setup Guide

## Tổng quan
Dự án đã được cấu hình để hoạt động như một Progressive Web App (PWA) với các tính năng:

- ✅ **Manifest.json** - Cấu hình app metadata
- ✅ **Service Worker** - Cache và offline functionality  
- ✅ **Install Prompt** - Nút cài đặt app
- ✅ **Offline Page** - Trang hiển thị khi mất mạng
- ✅ **Icons** - Đầy đủ các kích thước icon cho PWA

## Các file đã tạo/cập nhật

### 1. Manifest (`/public/manifest.json`)
```json
{
  "name": "LeHuyThai.com",
  "short_name": "LeHuyThai", 
  "description": "Trang web demo được xây dựng với Next.js 15 và Tailwind CSS 4",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#18181b",
  "theme_color": "#18181b",
  "icons": [...]
}
```

### 2. Service Worker (`/public/sw.js`)
- Cache static assets
- Serve offline page khi mất mạng
- Auto-update cache khi có version mới

### 3. PWA Installer Component (`/src/components/PWAInstaller.tsx`)
- Hiển thị nút "Cài đặt App" khi browser hỗ trợ
- Tự động ẩn sau khi cài đặt

### 4. Offline Page (`/src/app/offline/page.tsx`)
- Trang hiển thị khi không có mạng
- Nút "Thử lại" để reload

### 5. Layout Updates (`/src/app/layout.tsx`)
- Metadata cho PWA
- Viewport configuration
- Icon definitions

### 6. Next.js Config (`/next.config.ts`)
- Headers cho service worker
- Cache optimization
- Image optimization

## Cách test PWA

### 1. Development
```bash
pnpm dev
```

### 2. Production
```bash
pnpm build
pnpm start
```

### 3. Test PWA Features
1. Mở Chrome DevTools (F12)
2. Vào tab "Application" > "Manifest" - kiểm tra manifest
3. Vào tab "Application" > "Service Workers" - kiểm tra SW
4. Vào tab "Lighthouse" - chạy PWA audit
5. Test offline: DevTools > Network > Offline

### 4. Install App
- Trên desktop: Click icon "+" trên address bar
- Trên mobile: Browser sẽ hiện banner "Add to Home Screen"
- Hoặc click nút "Cài đặt App" (nếu hiển thị)

## PWA Checklist

- [x] Web App Manifest
- [x] Service Worker
- [x] HTTPS (required for PWA)
- [x] Responsive design
- [x] App icons (multiple sizes)
- [x] Offline functionality
- [x] Install prompt
- [x] Fast loading
- [x] Accessible

## Lưu ý

- PWA chỉ hoạt động trên HTTPS (trừ localhost)
- Service Worker sẽ tự động register khi load trang
- Cache sẽ được update khi có version mới
- Offline page chỉ hiển thị khi navigate (không phải API calls)
