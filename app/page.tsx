import FallingFlowers from "./components/FallingFlowers";
import MusicPlayer from "./components/MusicPlayer";
import ScrollProgress from "./components/ScrollProgress";
import HeroSection from "./components/HeroSection";
import CareerSection from "./components/CareerSection";
import SpecialLetter from "./components/SpecialLetter";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0f040d] text-[#fbf5f8] overflow-hidden">
      {/* Scroll Progress Bar at the very top */}
      <ScrollProgress />

      {/* Free-Falling Flowers Overlay (Daisy, Rose, Sunflower from public/) */}
      <FallingFlowers />

      {/* Background Music Player (/LAVIEM.wav) with Vinyl Record Widget */}
      <MusicPlayer />

      {/* Content wrapper with subtle ambient background mesh */}
      <div className="relative z-10">
        {/* Hero Section with Rose Lottie Animation */}
        <HeroSection />

        {/* Scrollable Career Wishes Section */}
        <CareerSection />

        {/* Interactive Special Envelope & Final Best Wish */}
        <SpecialLetter />

        {/* Footer with warm wishes & Scroll to top */}
        <Footer />
      </div>
    </main>
  );
}
