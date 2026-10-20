"use client";

import React, { useEffect, useState, useRef } from "react";
import LottieAnimation from "./LottieAnimation";

interface CareerWish {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  quote: string;
  content: string;
  lottieSrc: string;
  color: string;
}

const CAREER_WISHES: CareerWish[] = [
  {
    id: "wish-1",
    number: "01",
    title: "Bản Lĩnh Khởi Đầu – Tự Tin Dẫn Lối",
    subtitle: "Khát vọng & Ngọn lửa nhiệt huyết",
    quote: "“Hành trình vạn dặm bắt đầu từ một bước chân kiên định.”",
    content:
      "Chúc Ngọc Huệ luôn giữ trọn ngọn lửa đam mê và sự tự tin trên mỗi bước đường sự nghiệp. Dù đối diện với bất kỳ thử thách hay dự án mới nào, Huệ cũng sẽ luôn bản lĩnh, quyết đoán và mở lối cho những cơ hội tuyệt vời nhất.",
    lottieSrc: "/Flower2.json",
    color: "from-rose-500/25 via-pink-500/10 to-transparent",
  },
  {
    id: "wish-2",
    number: "02",
    title: "Trí Tuệ Sắc Bén – Tỏa Sáng Từng Dự Án",
    subtitle: "Tài năng & Dấu ấn khác biệt",
    quote: "“Viên ngọc càng mài càng sáng, tài năng của Huệ là duy nhất.”",
    content:
      "Mong rằng tư duy sáng tạo, sự nhạy bén và tính cẩn trọng tỉ mỉ của Huệ sẽ luôn là chìa khóa mở ra những giải pháp đột phá. Trong từng chiến dịch, Ngọc Huệ luôn là mảnh ghép sáng giá, nhận được sự nể trọng và tin cậy tuyệt đối.",
    lottieSrc: "/Flowers.json",
    color: "from-amber-500/25 via-rose-500/10 to-transparent",
  },
  {
    id: "wish-3",
    number: "03",
    title: "Kiên Cường Vượt Sóng – Chinh Phục Thử Thách",
    subtitle: "Bản lĩnh thép & Vững vàng trước áp lực",
    quote: "“Áp lực tạo nên kim cương, thử thách tôn vinh người bản lĩnh.”",
    content:
      "Công việc sẽ có những lúc deadline gấp gáp hay áp lực dồn dập, nhưng chúc Huệ luôn giữ được tâm thế bình thản, kiên cường và nụ cười rạng ngời. Hãy tin rằng mỗi thử thách vượt qua đều là bước đệm đưa Huệ lên một tầm cao mới.",
    lottieSrc: "/FlowerHug.json",
    color: "from-fuchsia-500/25 via-pink-500/10 to-transparent",
  },
  {
    id: "wish-4",
    number: "04",
    title: "Thăng Tiến Vượt Bậc – Thành Tựu Vang Dội",
    subtitle: "Nấc thang mới & Đỉnh cao công danh",
    quote: "“Gieo tận tâm thầm lặng, gặt thành tựu rực rỡ vẻ vang.”",
    content:
      "Mọi nỗ lực và cống hiến không ngừng nghỉ của Ngọc Huệ chắc chắn sẽ được đền đáp bằng những trái ngọt xứng đáng. Chúc con đường công danh của Huệ vạn sự hanh thông, sớm thăng tiến đến những vị trí cao hơn mà Huệ luôn ấp ủ.",
    lottieSrc: "/Rose.json",
    color: "from-yellow-500/25 via-rose-500/10 to-transparent",
  },
  {
    id: "wish-5",
    number: "05",
    title: "Cân Bằng Trọn Vẹn – Rực Rỡ Mà An Yên",
    subtitle: "Work-Life Harmony & Tâm hồn an nhiên",
    quote: "“Thành công trọn vẹn là khi công việc thăng hoa và trái tim luôn mỉm cười.”",
    content:
      "Sự nghiệp tỏa sáng nhưng sức khỏe, nụ cười và sự an yên của Ngọc Huệ luôn là điều quý báu nhất. Chúc Huệ luôn tìm thấy niềm hứng khởi mỗi ngày đi làm, luôn biết cách nuông chiều bản thân và sống một đời rực rỡ, hạnh phúc ngập tràn.",
    lottieSrc: "/FlowerHug.json",
    color: "from-pink-500/25 via-rose-500/10 to-transparent",
  },
];

export default function CareerSection() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Detect card in center of viewport as user scrolls
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight * 0.46;
        let closestIndex = 0;
        let closestDistance = Infinity;

        cardRefs.current.forEach((el, index) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const cardCenter = rect.top + rect.height / 2;
          const distance = Math.abs(cardCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        setActiveCardIndex(closestIndex);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial evaluation
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="career-wishes" className="relative w-full py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-300 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
          <span className="tracking-wide">Hành Trình Tỏa Sáng Của Ngọc Huệ</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-rose-50 tracking-tight mb-3">
          Những Lời Chúc Sự Nghiệp 20/10
        </h2>
        <p className="text-xs sm:text-base text-pink-200/80 font-sans max-w-xl mx-auto leading-relaxed">
          Cuộn xuống để khám phá từng thông điệp truyền cảm hứng được chắt lọc riêng dành tặng Huệ – đóa hoa tài sắc và bản lĩnh.
        </p>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative">
        {/* Continuous Glowing Timeline Track:
            - Left-aligned on mobile (left-4)
            - Centered on desktop (left-1/2)
        */}
        <div
          className="absolute left-4 sm:left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-rose-500 via-pink-400 to-rose-600 rounded-full shadow-[0_0_12px_rgba(244,63,94,0.6)] pointer-events-none z-0"
          aria-hidden="true"
        />

        {/* Milestone Cards */}
        <div className="space-y-12 sm:space-y-20">
          {CAREER_WISHES.map((wish, index) => {
            const isEven = index % 2 === 0;
            const isActive = activeCardIndex === index;

            return (
              <div
                key={wish.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } justify-between gap-6 md:gap-12 transition-all duration-500 ease-out`}
              >
                {/* Timeline Node Indicator */}
                <div
                  className={`absolute left-4 sm:left-6 md:left-1/2 -translate-x-1/2 top-6 md:top-1/2 md:-translate-y-1/2 z-30 flex items-center justify-center rounded-full transition-all duration-500 ease-out ${
                    isActive
                      ? "w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-tr from-rose-500 via-pink-400 to-amber-300 shadow-[0_0_20px_rgba(244,63,94,1)] ring-4 ring-pink-500/30 scale-110"
                      : "w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-zinc-900 border-2 border-rose-400/40 opacity-70 scale-95"
                  }`}
                  aria-hidden="true"
                >
                  <span
                    className={`text-[11px] sm:text-xs md:text-sm font-black tracking-tighter ${
                      isActive ? "text-white" : "text-pink-300"
                    }`}
                  >
                    {wish.number}
                  </span>
                </div>

                {/* Card Container with Dynamic Scale on Scroll */}
                <div
                  className={`w-full pl-10 sm:pl-14 md:pl-0 md:w-[46%] transition-all duration-500 ease-out ${
                    isActive
                      ? "scale-[1.03] sm:scale-105 opacity-100 z-20"
                      : "scale-[0.94] sm:scale-95 opacity-55 hover:opacity-85 z-10"
                  }`}
                >
                  <div
                    className={`relative p-5 sm:p-7 rounded-3xl bg-glass-card transition-all duration-500 overflow-hidden ${
                      isActive
                        ? "border-rose-400/80 shadow-[0_20px_50px_rgba(244,63,94,0.35)] ring-1 ring-rose-400/30"
                        : "border-rose-300/15 shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
                    }`}
                  >
                    {/* Background Ambient Gradient */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${wish.color} pointer-events-none transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-35"
                      }`}
                    />

                    {/* Card Top: Subtitle & Title */}
                    <div className="relative z-10 flex items-start justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-rose-300 block mb-1">
                          {wish.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl md:text-2xl font-sans font-bold text-white tracking-tight">
                          {wish.title}
                        </h3>
                      </div>

                      {/* Animated Badge for Mobile screens */}
                      <div className="md:hidden w-16 h-16 sm:w-20 sm:h-20 shrink-0 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.3)]">
                        <LottieAnimation
                          src={wish.lottieSrc}
                          className="w-full h-full"
                          isActive={isActive}
                        />
                      </div>
                    </div>

                    {/* Quote with Lora font */}
                    <div className="relative z-10 my-3 pl-3 border-l-2 border-rose-400/70 italic text-xs sm:text-sm text-pink-200/95 font-serif leading-relaxed">
                      {wish.quote}
                    </div>

                    {/* Content with Be Vietnam Pro font */}
                    <p className="relative z-10 text-xs sm:text-sm md:text-base text-pink-100/90 font-sans leading-relaxed text-justify">
                      {wish.content}
                    </p>
                  </div>
                </div>

                {/* Desktop Side Lottie Animation Showcase */}
                <div
                  className={`hidden md:flex md:w-[46%] justify-center items-center p-2 transition-all duration-500 ease-out ${
                    isActive ? "scale-105 opacity-100" : "scale-90 opacity-40"
                  }`}
                >
                  <div className="w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 filter drop-shadow-[0_0_35px_rgba(244,63,94,0.4)]">
                    <LottieAnimation
                      src={wish.lottieSrc}
                      className="w-full h-full"
                      isActive={isActive}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
