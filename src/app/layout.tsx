import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam-pro",
  subsets: ["latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lê Huy Thái | lehuythai.com",
  description: "Lê Huy Thái",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Lê Huy Thái",
  },
  icons: {
    icon: [
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "Lê Huy Thái | lehuythai.com",
    description: "Khám phá portfolio của Lê Huy Thái - Full-stack Developer",
    url: "https://lehuythai.com",
    siteName: "lehuythai.com",
    images: [
      {
        url: "/icons/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Lê Huy Thái",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Lê Huy Thái | lehuythai.com",
    description: "Khám phá portfolio của Lê Huy Thái - Full-stack Developer",
    images: ["/icons/apple-touch-icon.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#18181b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Explicit icon links for better share sheet support */}
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#18181b" />
      </head>
      <body
        className={`${beVietnamPro.variable} antialiased bg-zinc-950 text-zinc-200 min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
