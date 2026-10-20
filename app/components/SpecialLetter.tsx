"use client";

import React, { useState, useEffect, useRef } from "react";
import LottieAnimation from "./LottieAnimation";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  shape: "circle" | "rect" | "heart";
}

export default function SpecialLetter() {
  const [isOpen, setIsOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Trigger celebration confetti & petals
  const triggerConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "#ff69b4",
      "#ff1493",
      "#ffd700",
      "#ffb6c1",
      "#ff758c",
      "#ffffff",
      "#f43f5e",
      "#fbbf24",
    ];

    const newParticles: Particle[] = [];
    const count = window.innerWidth < 768 ? 55 : 90;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 7 + 3;
      newParticles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.52,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 8,
        opacity: 1,
        shape: Math.random() > 0.4 ? "circle" : Math.random() > 0.5 ? "rect" : "heart",
      });
    }

    particlesRef.current = newParticles;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const remaining: Particle[] = [];

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.vx *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;
        p.opacity -= 0.008;

        if (p.opacity > 0 && p.y < canvas.height + 20) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.shape === "circle") {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
          } else if (p.shape === "rect") {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
          } else {
            // Heart shape
            ctx.beginPath();
            const topCurveHeight = p.size * 0.3;
            ctx.moveTo(0, topCurveHeight);
            ctx.bezierCurveTo(0, 0, -p.size / 2, 0, -p.size / 2, topCurveHeight);
            ctx.bezierCurveTo(
              -p.size / 2,
              (p.size + topCurveHeight) / 2,
              0,
              (p.size + topCurveHeight) / 2,
              0,
              p.size
            );
            ctx.bezierCurveTo(
              0,
              (p.size + topCurveHeight) / 2,
              p.size / 2,
              (p.size + topCurveHeight) / 2,
              p.size / 2,
              topCurveHeight
            );
            ctx.bezierCurveTo(p.size / 2, 0, 0, 0, 0, topCurveHeight);
            ctx.fill();
          }

          ctx.restore();
          remaining.push(p);
        }
      });

      particlesRef.current = remaining;

      if (remaining.length > 0) {
        animationFrameRef.current = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    render();
  };

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => {
      triggerConfetti();
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="special-letter" className="relative w-full py-16 sm:py-24 px-4 flex flex-col items-center">
      {/* Canvas for confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 w-full h-full"
      />

      {/* Decorative blooming header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-3 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
          <span>Bức Thư Bí Mật Dành Riêng Cho Ngọc Huệ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-playfair font-bold text-rose-50 tracking-tight mb-3">
          Món Quà Cuối Cùng
        </h2>
        <p className="text-xs sm:text-base text-pink-200/80 font-sans max-w-md mx-auto leading-relaxed">
          Chạm vào phong thư để mở ra bức thư cùng lời chúc tốt đẹp và trọn vẹn nhất nhân ngày 20/10 gửi tới <span className="font-semibold text-rose-300">Ngọc Huệ</span>.
        </p>
      </div>

      {/* Interactive Letter Display using Lottie Loveletter animation */}
      <div className="relative w-full max-w-md flex flex-col items-center justify-center">
        {/* Ambient Glow */}
        <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-gradient-to-tr from-rose-600/30 via-pink-500/25 to-amber-500/20 blur-3xl -z-10 animate-pulse-glow pointer-events-none" />

        {/* Lottie Animated Envelope Container */}
        <div
          onClick={handleOpen}
          className="group cursor-pointer relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl p-4 flex flex-col items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95"
        >
          {/* Lottie Animation: Loveletter.json */}
          <div className="w-full h-full filter drop-shadow-[0_15px_35px_rgba(244,63,94,0.4)]">
            <LottieAnimation src="/Loveletter.json" className="w-full h-full" />
          </div>

          {/* Floating Tap Prompt Badge */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-950/80 border border-pink-400/40 text-pink-100 text-xs font-medium shadow-lg backdrop-blur-md group-hover:border-pink-300 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
            <span>Chạm để mở thư</span>
          </div>
        </div>
      </div>

      {/* Full Screen Reading Modal */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsOpen(false)}
        >
          {/* Letter Card */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-gradient-to-b from-[#fffbf5] via-[#fff7f0] to-[#fdf2e9] text-zinc-800 rounded-3xl p-6 sm:p-9 shadow-[0_25px_70px_rgba(244,63,94,0.4)] border-4 border-[#e8d5be] transition-all transform scale-100"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 flex items-center justify-center transition-colors shadow-sm text-sm font-bold"
              aria-label="Đóng thư"
            >
              ✕
            </button>

            {/* Header with animated FlowerHug icon */}
            <div className="flex items-center justify-between border-b-2 border-dashed border-rose-300/60 pb-3 mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-rose-100/60 border border-rose-300/50 p-1">
                  <LottieAnimation src="/FlowerHug.json" className="w-full h-full" />
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs font-sans font-bold tracking-widest uppercase text-rose-600 block">
                    20.10.2026 • Ngày Phụ Nữ Việt Nam
                  </span>
                  <span className="text-xs text-zinc-600 font-sans">
                    Dành riêng cho Ngọc Huệ
                  </span>
                </div>
              </div>

              {/* Postal stamp seal */}
              <div className="w-11 h-12 border-2 border-rose-400/60 rounded p-1 flex flex-col items-center justify-center text-rose-700 bg-rose-50/60">
                <span className="text-[10px] font-bold">20/10</span>
                <span className="text-[10px] uppercase font-semibold">VN</span>
              </div>
            </div>

            {/* Letter Title */}
            <div className="text-center mb-5">
              <h3 className="font-dancing text-3xl sm:text-4xl font-bold text-rose-800 mb-1">
                Gửi Đóa Hoa Ngọc Huệ
              </h3>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto" />
            </div>

            {/* Letter Body Text (Warmly addressing Huệ) */}
            <div className="space-y-4 font-sans text-xs sm:text-sm md:text-base leading-relaxed text-zinc-700 text-justify">
              <p className="first-letter:text-4xl first-letter:font-playfair first-letter:text-rose-700 first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                <strong className="text-rose-900 font-semibold">Ngọc Huệ thân mến!</strong> Nhân ngày Phụ Nữ Việt Nam 20/10, gửi đến Huệ những tình cảm ấm áp, sự trân trọng và những lời chúc ngọt ngào nhất từ tận đáy lòng.
              </p>

              <p>
                Chúc cho con đường sự nghiệp của Huệ luôn rộng mở và rực rỡ như những đóa hoa mùa xuân. Mong rằng mỗi mục tiêu Huệ đặt ra đều sẽ hoàn thành xuất sắc, mỗi thử thách Huệ đối mặt đều trở thành bậc thang vững chắc đưa Huệ vươn cao hơn nữa. Huệ luôn có sự thông minh, bản lĩnh và nguồn năng lượng tích cực mà ai cũng trân quý!
              </p>

              <p>
                Và hơn hết, chúc Huệ luôn giữ được sự an yên, dịu dàng với chính mình giữa cuộc sống nhiều bộn bề. Hãy luôn mỉm cười thật nhiều, luôn được yêu thương, trân trọng và hạnh phúc theo cách mà Huệ mong muốn nhất.
              </p>

              <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-center my-3">
                <p className="font-dancing text-xl sm:text-2xl text-rose-700 font-bold leading-normal">
                  &ldquo;Chúc Ngọc Huệ luôn xinh đẹp, rạng rỡ, sự nghiệp thăng hoa và trọn đời an vui!&rdquo;
                </p>
              </div>

              <div className="text-right font-dancing text-lg sm:text-xl text-rose-800 pt-2">
                Trân trọng & Yêu quý gửi tặng Huệ,
                <br />
                <span className="text-xs sm:text-sm font-sans font-semibold text-rose-600 block mt-1">
                  Happy Vietnamese Women&apos;s Day 20/10
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
