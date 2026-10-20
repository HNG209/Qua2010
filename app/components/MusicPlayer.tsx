"use client";

import React, { useEffect, useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.55;
    audio.loop = true;

    // Attempt autoplay immediately
    const startAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setHasInteracted(true);
        setShowHint(false);
      } catch {
        // Autoplay policy prevented playback, wait for first user gesture
        setIsPlaying(false);
      }
    };

    startAudio();

    // Unlock audio on first user touch/click/scroll if blocked
    const handleFirstGesture = () => {
      if (audio && audio.paused) {
        audio
          .play()
          .then(() => {
            setIsPlaying(true);
            setHasInteracted(true);
            setShowHint(false);
          })
          .catch(() => { });
      }
      removeListeners();
    };

    const removeListeners = () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("scroll", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("scroll", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    // Hide initial hint after 6s anyway
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 6000);

    return () => {
      removeListeners();
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasInteracted(true);
          setShowHint(false);
        })
        .catch((err) => {
          console.error("Audio playback error:", err);
        });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <>
      <audio ref={audioRef} src="/LAVIEM.wav" preload="auto" />

      {/* Floating Music Widget */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Helper popup banner when not yet started */}
        {showHint && !isPlaying && (
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-950/80 backdrop-blur-md border border-pink-500/40 text-pink-200 text-xs shadow-lg animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-pink-300">
              <path d="M18 3a1 1 0 0 0-1.196-.98l-10 2A1 1 0 0 0 6 5v9.114A4.369 4.369 0 0 0 5 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0 0 15 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3Z" />
            </svg>
            <span>Chạm bất kỳ đâu để bật</span>
          </div>
        )}

        <button
          onClick={togglePlay}
          className="group relative flex items-center gap-2 p-1.5 pr-3 rounded-full bg-pink-950/70 hover:bg-pink-900/80 backdrop-blur-md border border-pink-500/30 hover:border-pink-400/60 transition-all duration-300 shadow-[0_4px_20px_rgba(244,63,94,0.3)] active:scale-95"
          title={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}
          aria-label={isPlaying ? "Tạm dừng nhạc" : "Phát nhạc nền"}
        >
          {/* Spinning Mini Vinyl Record */}
          <div
            className={`w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-900 via-rose-950 to-zinc-900 border-2 border-pink-400/50 flex items-center justify-center relative shadow-inner overflow-hidden ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""
              }`}
          >
            <div className="w-3.5 h-3.5 rounded-full bg-pink-500/80 border border-white/60 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            {/* Vinyl grooves */}
            <div className="absolute inset-0.5 rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute inset-1.5 rounded-full border border-white/10 pointer-events-none" />
          </div>

          {/* Equalizer animation & Label */}
          <div className="flex flex-col text-left">
            <span className="text-[11px] font-medium tracking-wide text-pink-100 flex items-center gap-1.5">
              <span>LAVIEM</span>
              {isPlaying && (
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 h-2.5 bg-pink-400 rounded-full animate-[bounce_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-3.5 bg-rose-300 rounded-full animate-[bounce_0.8s_ease-in-out_infinite_0.2s]" />
                  <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-[bounce_0.5s_ease-in-out_infinite_0.4s]" />
                </span>
              )}
            </span>
            <span className="text-[9px] text-pink-300/70">
              {isPlaying ? "Đang phát" : "Nhấn để phát"}
            </span>
          </div>

          {/* Play/Pause status icon */}
          <div className="w-5 h-5 flex items-center justify-center text-pink-300 group-hover:text-pink-100 transition-colors ml-1">
            {isPlaying ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M6.75 5.25a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Zm9 0a.75.75 0 0 1 .75.75v12a.75.75 0 0 1-1.5 0v-12a.75.75 0 0 1 .75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </button>
      </div>
    </>
  );
}
