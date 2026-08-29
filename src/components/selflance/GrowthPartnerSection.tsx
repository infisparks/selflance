"use client";

import React from "react";

interface GrowthPartnerSectionProps {
  isUS?: boolean;
}

export function GrowthPartnerSection({ isUS = false }: GrowthPartnerSectionProps) {
  const pointsIN = [
    { title: "Your Business", sub: "Model & Strategy", icon: "🏢" },
    { title: "Your Users", sub: "Needs & Pain Points", icon: "👥" },
    { title: "Your Goals", sub: "Key Milestones", icon: "🎯" },
    { title: "Required Features", sub: "Core Functionality", icon: "⚡" },
    { title: "Budget & Timeline", sub: "Realistic Planning", icon: "⏱️" },
  ];

  const pointsUS = [
    { title: "Your Business Model", sub: "Revenue Architecture", icon: "🏢" },
    { title: "Your Users", sub: "Behavior & Retention", icon: "👥" },
    { title: "Your Product Goals", sub: "Growth Objectives", icon: "🎯" },
    { title: "Core Features", sub: "Essential Value", icon: "⚡" },
    { title: "Technical Architecture", sub: "Growth & Scalability", icon: "⏱️" },
  ];

  const points = isUS ? pointsUS : pointsIN;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-900/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-[#0F1629]/90 border border-[#2A3552]/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-3 py-1 text-[#818cf8] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping"></span>
            {isUS ? "Strategy First" : "Outcome Focused"}
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-3">
          {isUS ? (
            <>
              We Don&apos;t Start With Code.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                We Start With Your Business.
              </span>
            </>
          ) : (
            <>
              Don&apos;t Start With Technology.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Start With the Problem You Want to Solve.
              </span>
            </>
          )}
        </h2>

        {/* Subtext */}
        <p className="text-gray-300 text-xs sm:text-base leading-relaxed text-center sm:text-left mb-8 max-w-3xl font-medium">
          {isUS
            ? "Before recommending a technology stack or development approach, we look at your complete business ecosystem:"
            : "Before development begins, we take time to understand your core fundamentals:"}
        </p>

        {/* Points Timeline Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 mb-8">
          {points.map((pt, idx) => (
            <div
              key={idx}
              className={`relative overflow-hidden bg-[#131C35] border border-[#2A3552] rounded-xl p-4 min-h-[105px] sm:min-h-[110px] flex flex-col justify-between hover:border-[#6366F1] transition-all duration-300 group shadow-lg ${
                idx === 4 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-base">{pt.icon}</span>
                  <span className="text-[10px] font-extrabold text-[#A5B4FC] tracking-widest uppercase">0{idx + 1}</span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-white group-hover:text-[#A5B4FC] transition-colors leading-snug">
                  {pt.title}
                </h3>
              </div>
              <div className="relative z-10 text-[11px] text-gray-400 font-semibold mt-2">
                {pt.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Outcome Callout Box */}
        <div className="bg-gradient-to-r from-[#6366F1]/15 via-[#A855F7]/15 to-transparent border-l-4 border-[#6366F1] rounded-r-xl p-4 sm:p-6">
          <p className="text-gray-300 text-xs sm:text-sm font-semibold mb-1">
            {isUS ? "Then we help determine what should actually be built." : "Then we can determine the right way to build it."}
          </p>
          <p className="text-white text-sm sm:text-lg font-extrabold leading-snug">
            {isUS ? (
              <>
                Because building the wrong product faster{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-amber-300">
                  doesn&apos;t make it successful.
                </span>
              </>
            ) : (
              <>
                Because the right product isn&apos;t the one with the most features.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300">
                  It&apos;s the one that solves the right problem.
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </section>
  );
}
