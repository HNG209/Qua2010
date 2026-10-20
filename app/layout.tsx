import type { Metadata, Viewport } from "next";
import { Lora, Dancing_Script, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";

const lora = Lora({
  variable: "--font-serif",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chúc Mừng 20/10 - Ngọc Huệ | Rạng Rỡ & Thành Công",
  description: "Trang web đặc biệt chúc mừng ngày Phụ Nữ Việt Nam 20/10 gửi tặng Ngọc Huệ. Chúc sự nghiệp thăng hoa, rạng rỡ và ngập tràn hạnh phúc!",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0f040d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${beVietnam.variable} ${lora.variable} ${dancingScript.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#0f040d] text-[#fbf5f8] overflow-x-hidden selection:bg-pink-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}

