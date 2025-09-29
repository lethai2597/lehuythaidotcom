import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // PWA configuration
  async headers() {
    return [
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  // Enable static optimization for better PWA performance
  trailingSlash: false,
  // Optimize images for PWA
  images: {
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
