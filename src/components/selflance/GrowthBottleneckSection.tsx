"use client";

import React from "react";

interface GrowthBottleneckSectionProps {
  isUS?: boolean;
  onBookClick?: () => void;
}

export function GrowthBottleneckSection({ isUS = false, onBookClick }: GrowthBottleneckSectionProps) {
  const questionsIN = [
    "Who will design it?",
    "Who will develop it?",
    "Which technology should we use?",
    "How much will it cost?",
    "How long will it take?",
    "What happens if the developer disappears?",
  ];

  const questionsUS = [
    "What should be built first?",
    "Which technology is right?",
    "Who should build it?",
    "How much should you invest?",
    "How do you avoid expensive mistakes?",
    "How do you keep the project moving?",
  ];

  const questions = isUS ? questionsUS : questionsIN;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-red-600/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-gradient-to-b from-[#141A2D] via-[#0F1629] to-[#0A0E1A] border border-[#2A3552] rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-full px-3.5 py-1 text-red-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            The Reality
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-3">
          {isUS ? (
            <>
              You Know What You Want to Build.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 drop-shadow">
                But Building It Is Another Story.
              </span>
            </>
          ) : (
            <>
              Got the Idea.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-400 to-amber-400 drop-shadow">
                But Don&apos;t Know Where to Start?
              </span>
            </>
          )}
        </h2>

        {/* Intro text */}
        <div className="text-gray-300 text-xs sm:text-base leading-relaxed text-center sm:text-left mb-6 max-w-3xl font-medium space-y-1">
          {isUS ? (
            <>
              <p>Maybe you have the idea. Maybe you already have the business. Maybe you even have customers waiting.</p>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">But you still need to figure out:</p>
            </>
          ) : (
            <>
              <p>You may already know what you want to build.</p>
              <p className="text-gray-400 text-xs sm:text-sm font-semibold">But then come the difficult questions:</p>
            </>
          )}
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 mb-7 sm:mb-9">
          {questions.map((text, idx) => (
            <div
              key={idx}
              className="group flex items-center gap-3.5 bg-gradient-to-r from-[#1A1224] to-[#111827] border border-red-500/20 hover:border-red-500/70 rounded-2xl p-4 transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]"
            >
              <div className="w-8 h-8 rounded-xl bg-red-500/15 border border-red-500/40 flex items-center justify-center text-red-400 font-extrabold text-sm shrink-0 shadow-[0_0_10px_rgba(239,68,68,0.3)] group-hover:scale-110 transition-transform">
                ?
              </div>
              <span className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {text}
              </span>
            </div>
          ))}
        </div>

        {/* Result Highlight Callout */}
        <div className="relative bg-gradient-to-r from-red-950/40 via-orange-950/20 to-[#0F1629] border-l-4 border-red-500 rounded-r-2xl p-5 sm:p-7 shadow-lg overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            {isUS ? (
              <p className="text-white text-sm sm:text-base font-extrabold leading-snug">
                You shouldn&apos;t have to become a software engineer just to build your product.
              </p>
            ) : (
              <>
                <p className="text-gray-300 text-xs sm:text-sm font-medium">
                  And hiring multiple freelancers or agencies can make the entire process even harder.
                </p>
                <p className="text-white text-sm sm:text-base font-extrabold leading-snug">
                  You shouldn&apos;t have to become a technology expert just to build your product.
                </p>
              </>
            )}
          </div>

          {onBookClick && (
            <button
              onClick={onBookClick}
              className="bg-gradient-to-r from-[#df7626] to-[#ea580c] hover:from-[#ea580c] hover:to-[#c2410c] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(223,118,38,0.4)] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              Discuss My Project →
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
