"use client";

import React from "react";

interface TargetAudienceSectionProps {
  isUS?: boolean;
}

export function TargetAudienceSection({ isUS = false }: TargetAudienceSectionProps) {
  const perfectIN = [
    "You have a serious business idea",
    "You want a custom app or software",
    "You're building an MVP",
    "You need to modernize an existing system",
    "You need CRM / ERP / business automation",
    "You want a long-term technology partner",
  ];

  const perfectUS = [
    "You're building a serious business or product",
    "You need a custom application or software",
    "You're launching an MVP",
    "You need to modernize an existing product",
    "You need custom business software",
    "You want a development partner rather than a one-off coder",
  ];

  const notFitIN = [
    "You're only looking for the cheapest developer",
    "You need a ₹5,000–₹10,000 basic website",
    "You're looking for a college / student project",
    "You haven't decided whether you actually want to build the product",
  ];

  const notFitUS = [
    "You're choosing purely on the lowest price",
    "You need a simple $100–$200 website",
    "You're looking for a student / college project",
    "You're not serious about building the product",
  ];

  const perfectList = isUS ? perfectUS : perfectIN;
  const notFitList = isUS ? notFitUS : notFitIN;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-indigo-900/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-[#0F1629]/90 border border-[#2A3552]/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/20 rounded-full px-3 py-1 text-[#818CF8] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-ping"></span>
            Project Qualification
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-4xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-8">
          {isUS ? (
            <>
              Is This a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Good Fit?
              </span>
            </>
          ) : (
            <>
              Is Selflance Right For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Your Project?
              </span>
            </>
          )}
        </h2>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Perfect Fit Column */}
          <div className="bg-[#131C35] border border-emerald-500/30 rounded-2xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-emerald-500/20">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-extrabold text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                ✓
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                We&apos;re a <span className="text-emerald-400">Good Fit</span> If:
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-200 font-medium">
              {perfectList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-emerald-400 font-bold shrink-0">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not A Fit Column */}
          <div className="bg-[#131C35] border border-red-500/30 rounded-2xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
            <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-red-500/20">
              <div className="w-8 h-8 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400 font-extrabold text-sm shadow-[0_0_10px_rgba(239,68,68,0.3)]">
                ✕
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                Probably <span className="text-red-400">Not A Fit</span> If:
              </h3>
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-gray-300 font-medium">
              {notFitList.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-red-400 font-bold shrink-0">✘</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
