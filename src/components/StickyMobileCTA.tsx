"use client";

import React, { useState, useEffect } from "react";

export function StickyMobileCTA({ onBookClick }: { onBookClick: () => void }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA once user scrolls past 240px (past top hero section)
      if (window.scrollY > 240) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2 sm:w-full sm:max-w-xl z-40 transition-all duration-500 ease-out ${
        isVisible
          ? "translate-y-0 opacity-100 pointer-events-auto"
          : "translate-y-16 opacity-0 pointer-events-none"
      }`}
    >
      {/* Container: Glassmorphic Floating Pill Bar */}
      <div className="bg-[#0F1629]/95 border border-[#2A3552] rounded-2xl sm:rounded-full p-2.5 sm:p-2 sm:px-4 shadow-[0_10px_35px_rgba(0,0,0,0.8)] backdrop-blur-xl flex items-center justify-between gap-2.5">
        {/* Left Side: Pulsing Dot & Urgency Info */}
        <div className="flex items-center space-x-2.5 overflow-hidden pl-1">
          {/* Pulsing Live Urgency Badge */}
          <div className="relative flex-shrink-0 flex items-center justify-center">
            <span className="animate-ping absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </div>

          <div className="text-left leading-tight overflow-hidden">
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] sm:text-xs font-black text-amber-400 uppercase tracking-widest truncate">
                ⚡ Free 30-Min Strategy Call
              </span>
            </div>
            <p className="text-xs sm:text-sm font-extrabold text-white truncate">
              Ready To Scale Your Tech?
            </p>
          </div>
        </div>

        {/* Right Side: High-Impact Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={onBookClick}
            className="bg-gradient-to-r from-[#df7626] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-extrabold text-xs sm:text-sm py-2 px-3.5 sm:py-2.5 sm:px-5 rounded-xl sm:rounded-full uppercase tracking-wide flex items-center space-x-1.5 shadow-[0_0_20px_rgba(223,118,38,0.4)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <span>Book Strategy Call</span>
            <i className="fa-solid fa-arrow-right text-[11px]"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
