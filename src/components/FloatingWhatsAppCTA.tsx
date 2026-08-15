"use client";

import React, { useState } from "react";

export function FloatingWhatsAppCTA() {
  const [isHovered, setIsHovered] = useState(false);
  const phoneNumber = "918850448767";
  const defaultMessage = "Hi Selflance, I'd like to discuss a software development & automation project for my business.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      {/* Expanded Label on Hover / Desktop Pill */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="flex items-center gap-2.5 bg-[#0F1629]/95 hover:bg-[#15203B] text-white border border-[#25D366]/40 hover:border-[#25D366] px-3.5 py-2.5 rounded-full shadow-[0_10px_30px_rgba(37,211,102,0.3)] backdrop-blur-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {/* WhatsApp Icon Circle */}
        <div className="relative w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md flex-shrink-0">
          <i className="fa-brands fa-whatsapp text-lg"></i>
          {/* Pulsing beacon */}
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-[#0F1629]"></span>
          </span>
        </div>

        {/* Text Details */}
        <div className="text-left pr-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
              Online • Quick Reply
            </span>
          </div>
          <p className="text-xs sm:text-sm font-black text-white leading-none">
            Chat on WhatsApp
          </p>
        </div>
      </a>
    </div>
  );
}
