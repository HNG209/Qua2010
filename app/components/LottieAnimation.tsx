"use client";

import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Global cache for fetched animation JSONs to prevent duplicate network calls & memory bloat
const animationCache = new Map<string, object>();

// Dynamically import Lottie from lottie-react
const Lottie = dynamic(
  () => import("lottie-react").then((mod) => mod.Lottie),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-rose-400/30 border-t-rose-400 animate-spin" />
      </div>
    ),
  }
);

interface LottieAnimationProps {
  src: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  isActive?: boolean; // When passed, can prioritize rendering/playback
}

export default function LottieAnimation({
  src,
  className = "w-full h-full",
  loop = true,
  autoplay = true,
  isActive = true,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(
    animationCache.get(src) || null
  );
  const [inView, setInView] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // IntersectionObserver: Only render/play animation when in or near viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "100px 0px 100px 0px", // pre-load slightly before coming into view
        threshold: 0.05,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Fetch JSON if not cached
  useEffect(() => {
    if (animationCache.has(src)) {
      setAnimationData(animationCache.get(src)!);
      return;
    }

    let isMounted = true;
    fetch(src)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${src}`);
        return res.json();
      })
      .then((data) => {
        animationCache.set(src, data);
        if (isMounted) setAnimationData(data);
      })
      .catch((err) => {
        console.error("Lottie fetch error:", err);
      });

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {inView && animationData ? (
        <Lottie
          src={animationData}
          loop={loop}
          autoplay={autoplay && isActive}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border border-rose-400/20 bg-rose-500/5 animate-pulse" />
        </div>
      )}
    </div>
  );
}
