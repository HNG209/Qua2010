"use client";

import React from "react";
import LottieAnimation from "./LottieAnimation";

export default function HeroSection() {
  const scrollToWishes = () => {
    const el = document.getElementById("career-wishes");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToLetter = () => {
    const el = document.getElementById("special-letter");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-12 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] h-[340px] sm:h-[500px] rounded-full bg-gradient-to-tr from-rose-600/25 via-pink-500/20 to-amber-500/10 blur-[90px] -z-10 pointer-events-none animate-pulse-glow" />

      {/* Date badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-rose-500/20 to-pink-500/20 border border-pink-400/40 text-pink-200 text-xs sm:text-sm font-medium mb-6 shadow-lg backdrop-blur-md">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
        <span className="tracking-widest uppercase">Ngày Phụ Nữ Việt Nam • 20.10</span>
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
      </div>

      {/* Main greeting title */}
      <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair font-black text-rose-50 tracking-tight leading-[1.15] mb-2">
        Happy Vietnamese
        <br />
        <span className="text-rose-gradient">Women&apos;s Day</span>
      </h1>

      {/* Dedicated recipient name */}
      <div className="my-3">
        <p className="text-xs sm:text-sm text-pink-300 uppercase tracking-widest font-sans mb-1">
          Dành tặng đóa hoa rạng ngời
        </p>
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-dancing font-bold text-gold-gradient py-1">
          Ngọc Huệ
        </h2>
      </div>

      {/* Centerpiece: Blooming Rose Lottie Animation */}
      <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 my-4 flex items-center justify-center">
        {/* Soft radial glow behind rose */}
        <div className="absolute inset-0 rounded-full bg-rose-500/15 blur-2xl -z-10" />
        <LottieAnimation src="/Rose.json" className="w-full h-full" />
      </div>

      {/* Intro inspirational greeting */}
      <p className="max-w-xl text-sm sm:text-base md:text-lg text-pink-100/90 font-sans leading-relaxed px-4 mb-8">
        Chúc <span className="font-semibold text-rose-300">Ngọc Huệ</span> có một ngày 20/10 ngập tràn niềm vui, hoa tươi và những điều ngọt ngào nhất. Chúc Huệ sự nghiệp thăng hoa, rạng rỡ và vạn sự như ý!
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 z-10">
        <button
          onClick={scrollToWishes}
          className="px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm sm:text-base shadow-[0_10px_25px_rgba(244,63,94,0.4)] hover:shadow-[0_15px_30px_rgba(244,63,94,0.6)] transition-all duration-300 active:scale-95 flex items-center gap-2"
        >
          <span>Lời chúc</span>
        </button>

        <button
          onClick={scrollToLetter}
          className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-pink-400/30 hover:border-pink-300/60 text-pink-200 font-medium text-sm sm:text-base backdrop-blur-md transition-all duration-300 active:scale-95 flex items-center gap-2"
        >
          <span>Mở thư</span>
        </button>
      </div>

      {/* Scroll indicator bouncing down */}
      <div
        onClick={scrollToWishes}
        className="mt-12 flex flex-col items-center gap-2 cursor-pointer text-pink-300/60 hover:text-pink-200 transition-colors"
      >
        <span className="text-[11px] font-sans tracking-widest uppercase">Cuộn xuống</span>
        <div className="w-5 h-8 rounded-full border-2 border-pink-400/40 flex items-start justify-center p-1">
          <div className="w-1 h-2 rounded-full bg-pink-300 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
