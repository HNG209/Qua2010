"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

interface FlowerItem {
  id: number;
  src: string;
  left: number; // percentage
  size: number; // px
  duration: number; // seconds
  delay: number; // seconds
  swayDuration: number; // seconds
  rotateDirection: number; // 1 or -1
  opacity: number;
}

const FLOWER_IMAGES = [
  "/daisy_drop.png",
  "/rose_drop.png",
  "/sunflower_drop.png",
];

export default function FallingFlowers() {
  const [flowers, setFlowers] = useState<FlowerItem[]>([]);

  useEffect(() => {
    // Optimized count for silky-smooth performance especially on mobile browsers
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const count = isMobile ? 6 : 10;

    const items: FlowerItem[] = [];
    for (let i = 0; i < count; i++) {
      const src = FLOWER_IMAGES[i % FLOWER_IMAGES.length];
      const left = Math.random() * 92 + 4; // 4% to 96%
      const size = isMobile
        ? Math.floor(Math.random() * 16) + 24 // 24px to 40px
        : Math.floor(Math.random() * 24) + 28; // 28px to 52px
      const duration = Math.random() * 8 + 9; // 9s to 17s for gentle descent
      const delay = -(Math.random() * 14); // negative delay so screen is pre-filled immediately
      const swayDuration = Math.random() * 3 + 3.5; // 3.5s to 6.5s
      const rotateDirection = Math.random() > 0.5 ? 1 : -1;
      const opacity = Math.random() * 0.25 + 0.65; // 0.65 to 0.9

      items.push({
        id: i,
        src,
        left,
        size,
        duration,
        delay,
        swayDuration,
        rotateDirection,
        opacity,
      });
    }

    setFlowers(items);
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-20 overflow-hidden"
      aria-hidden="true"
    >
      {flowers.map((flower) => (
        <div
          key={flower.id}
          className="absolute top-0 will-change-transform"
          style={{
            left: `${flower.left}%`,
            animation: `flowerFall ${flower.duration}s linear infinite`,
            animationDelay: `${flower.delay}s`,
          }}
        >
          <div
            style={{
              animation: `flowerSway ${flower.swayDuration}s ease-in-out infinite alternate`,
              opacity: flower.opacity,
            }}
          >
            <div
              style={{
                width: `${flower.size}px`,
                height: `${flower.size}px`,
                filter: "drop-shadow(0 3px 8px rgba(0, 0, 0, 0.25))",
              }}
            >
              <Image
                src={flower.src}
                alt="Flower drop"
                width={flower.size}
                height={flower.size}
                className="w-full h-full object-contain select-none"
                priority={flower.id < 4}
                unoptimized
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
