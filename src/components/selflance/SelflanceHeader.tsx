"use client";

import React from "react";

export function SelflanceHeader() {
  return (
    <div className="fixed top-0 inset-x-0 z-50 flex justify-center">
      <header className="w-full flex items-center justify-between px-4 py-2.5 sm:px-6 sm:py-4 bg-[#0B1121]/90 backdrop-blur-md border-b border-gray-800/50 max-w-5xl mx-auto">
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <img
            src="/Selflance Logo.png"
            alt="Selflance Logo"
            className="h-8 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
          />
          <span className="text-[20px] sm:text-2xl font-extrabold text-white tracking-tight">
            Selflance<span className="text-[#df7626]">.</span>
          </span>
        </div>
      </header>
    </div>
  );
}
