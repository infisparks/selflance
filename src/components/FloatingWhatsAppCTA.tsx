"use client";

import React from "react";

export function FloatingWhatsAppCTA() {
  const phoneNumber = "918850448767";
  const defaultMessage = "Hi Selflance, I'd like to discuss a software development & automation project for my business.";
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex items-center group">
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp (+91 8850448767)"
        className="relative flex items-center justify-center bg-[#25D366] text-white w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] border border-white/20 hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer"
      >
        <i className="fa-brands fa-whatsapp text-2xl sm:text-2xl drop-shadow"></i>

        {/* Pulsing live online beacon */}
        <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 border-2 border-[#0B1121]"></span>
        </span>
      </a>
    </div>
  );
}
