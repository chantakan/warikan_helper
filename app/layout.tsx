// app/layout.tsx
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "割り勘計算アプリ",
  description: "メンバー間での支払いを簡単に清算できるアプリケーション",
  // 以下のmetadataも必要に応じて追加できます
  /*
  openGraph: {
    title: '割り勘計算アプリ',
    description: 'メンバー間での支払いを簡単に清算できるアプリケーション',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '割り勘計算アプリ',
    description: 'メンバー間での支払いを簡単に清算できるアプリケーション',
  },
  */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-pink-300`}
      >
        {children}
      </body>
    </html>
  );
}