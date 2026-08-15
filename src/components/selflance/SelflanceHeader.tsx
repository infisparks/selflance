"use client";

import React from "react";

interface SelflanceHeaderProps {
  onBookClick?: () => void;
}

export function SelflanceHeader({ onBookClick }: SelflanceHeaderProps) {
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 sm:px-4 pt-2 sm:pt-3">
      <header className="w-full flex items-center justify-between px-3.5 py-2 sm:px-6 sm:py-2.5 bg-[#0B1121]/90 backdrop-blur-md border border-[#2A3552]/80 rounded-2xl max-w-5xl mx-auto shadow-lg shadow-black/40">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center justify-center cursor-pointer group"
        >
          <img
            src="/Selflance Logo.png"
            alt="Selflance Logo"
            className="h-8 sm:h-10 md:h-11 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </div>

        {onBookClick && (
          <button
            onClick={onBookClick}
            className="bg-gradient-to-r from-[#df7626] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-3.5 py-2 sm:px-5 sm:py-2 rounded-xl sm:rounded-full shadow-[0_0_20px_rgba(223,118,38,0.35)] hover:shadow-[0_0_25px_rgba(223,118,38,0.55)] transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer flex-shrink-0"
          >
            <span>Book Strategy Call</span>
            <i className="fa-solid fa-arrow-right text-[10px] sm:text-xs"></i>
          </button>
        )}
      </header>
    </div>
  );
}
