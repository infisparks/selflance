"use client";

import React from "react";

export function FloatingWhatsAppCTA() {
  const phoneNumber = "918850448767";
  const defaultMessage = "Hi Selflance, I'd like to discuss a software development & automation project for my business.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-40 flex items-center">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (+91 8850448767)"
        title="Chat on WhatsApp (+91 8850448767)"
        className="group relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.65)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        {/* Pulsing online green beacon */}
        <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-400 border border-[#0F1629]"></span>
        </span>

        {/* WhatsApp Icon */}
        <i className="fa-brands fa-whatsapp text-xl sm:text-2xl"></i>

        {/* Desktop Tooltip on Hover */}
        <span className="hidden sm:group-hover:flex absolute right-full mr-2.5 bg-[#0F1629]/95 text-white text-[11px] font-bold px-2.5 py-1 rounded-lg border border-[#25D366]/40 shadow-lg whitespace-nowrap items-center gap-1.5 pointer-events-none transition-all">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
}

