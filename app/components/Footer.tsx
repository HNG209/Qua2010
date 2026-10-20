"use client";

import React from "react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-12 px-4 border-t border-rose-500/10 bg-gradient-to-b from-transparent to-pink-950/30 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center justify-center gap-3 text-rose-400">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
          <span className="w-16 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span className="w-16 h-px bg-gradient-to-r from-transparent via-rose-500/50 to-transparent" />
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        </div>

        <p className="font-dancing text-2xl sm:text-3xl text-rose-200">
          Mãi luôn rạng rỡ và hạnh phúc nhé, Ngọc Huệ!
        </p>

        <p className="text-xs text-pink-300/60 font-sans tracking-wide">
          20 Tháng 10 • Ngày Phụ Nữ Việt Nam
          <br />
          Dedicated with admiration & best wishes.
        </p>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-pink-300 hover:text-pink-100 text-xs transition-colors shadow-sm"
        >
          <span>↑</span>
          <span>Lên đầu trang</span>
        </button>
      </div>
    </footer>
  );
}
