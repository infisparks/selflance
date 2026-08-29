"use client";

import React from "react";

interface WhyChooseUsSectionProps {
  isUS?: boolean;
}

export function WhyChooseUsSection({ isUS = false }: WhyChooseUsSectionProps) {
  const reasonsIN = [
    {
      title: "Custom-Built",
      desc: "Your product is built around your requirements — not a generic template.",
      badge: "Bespoke",
    },
    {
      title: "End-to-End Development",
      desc: "Design, development, backend, testing and launch support under one roof.",
      badge: "Full Cycle",
    },
    {
      title: "Experienced Professionals",
      desc: "Access vetted professionals across development, design and digital architecture.",
      badge: "Top Talent",
    },
    {
      title: "Flexible Starting Point",
      desc: "Start with an MVP and evolve your product systematically as your business grows.",
      badge: "Agile Scale",
    },
    {
      title: "Product Ownership",
      desc: "Your code, designs and assets remain 100% yours according to the project agreement.",
      badge: "100% IP Yours",
    },
    {
      title: "Long-Term Support",
      desc: "Your relationship doesn't have to end when the product launches.",
      badge: "Ongoing Partner",
    },
  ];

  const reasonsUS = [
    {
      title: "Custom Development",
      desc: "No one-size-fits-all solution. Tailored specifically to your business mechanics.",
      badge: "Tailored",
    },
    {
      title: "End-to-End Execution",
      desc: "Design → Development → Testing → Launch seamlessly coordinated.",
      badge: "Full Stack",
    },
    {
      title: "Experienced Professionals",
      desc: "Access development and digital expertise across the Selflance ecosystem.",
      badge: "Senior Engineers",
    },
    {
      title: "Flexible Engagement",
      desc: "Start with an MVP or build a larger scalable platform from the beginning.",
      badge: "Modular",
    },
    {
      title: "Product Ownership",
      desc: "Your product assets and codebase remain yours according to your agreement.",
      badge: "Full Ownership",
    },
    {
      title: "Ongoing Support",
      desc: "Continue improving, optimizing and scaling your product after launch.",
      badge: "Long-Term",
    },
  ];

  const reasons = isUS ? reasonsUS : reasonsIN;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-900/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-[#0F1629]/90 border border-[#2A3552]/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#A855F7]/10 border border-[#A855F7]/20 rounded-full px-3 py-1 text-[#D8B4FE] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-ping"></span>
            {isUS ? "Why Partner With Us" : "Why Selflance"}
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-4xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-3">
          {isUS ? (
            <>
              Built for Businesses That{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Take Their Product Seriously
              </span>
            </>
          ) : (
            <>
              Why Businesses{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Choose Selflance
              </span>
            </>
          )}
        </h2>

        <p className="text-gray-300 text-xs sm:text-base font-medium text-center sm:text-left mb-8 max-w-2xl">
          {isUS
            ? "We eliminate the risks of software development by providing dedicated senior execution and predictable delivery."
            : "A solid technology foundation built for scale, reliability, and long-term peace of mind."}
        </p>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {reasons.map((r, idx) => (
            <div
              key={idx}
              className="bg-[#131C35] border border-[#2A3552] rounded-2xl p-5 hover:border-[#A855F7]/60 transition-all duration-300 shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-extrabold text-xs shrink-0 group-hover:scale-110 transition-transform">
                    ✓
                  </div>
                  <span className="text-[10px] font-bold text-[#D8B4FE] bg-[#A855F7]/10 border border-[#A855F7]/20 px-2 py-0.5 rounded-full">
                    {r.badge}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#D8B4FE] transition-colors">
                  {r.title}
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed">
                  {r.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Banner Box */}
        <div className="bg-gradient-to-r from-[#6366F1]/15 via-[#A855F7]/15 to-transparent border-l-4 border-[#A855F7] rounded-r-xl p-4 sm:p-6 text-center sm:text-left">
          <p className="text-white text-sm sm:text-lg font-extrabold leading-snug">
            Technology is only valuable when it{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] to-[#A855F7]">
              drives real business growth.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
