"use client";

import React from "react";

interface BeforeYouBookSectionProps {
  isUS?: boolean;
  onBookClick?: () => void;
}

export function BeforeYouBookSection({ isUS = false, onBookClick }: BeforeYouBookSectionProps) {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-purple-900/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-[#0F1629]/90 border border-[#6366F1]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-full px-3 py-1 text-[#818CF8] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#6366F1] animate-pulse"></span>
            {isUS ? "Project Assessment" : "Free Assessment"}
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-4xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-4">
          {isUS ? (
            <>
              Let&apos;s See What It Will Take to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Build Your Product.
              </span>
            </>
          ) : (
            <>
              Let&apos;s See If Your Project Is a{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
                Good Fit.
              </span>
            </>
          )}
        </h2>

        {/* Paragraphs */}
        <div className="space-y-4 text-xs sm:text-base text-gray-300 font-medium leading-relaxed mb-8">
          {isUS ? (
            <>
              <p>
                Answer a few quick questions about your project. We&apos;ll use your answers to understand:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-gray-200">
                <div className="flex items-center gap-2">
                  <span className="text-[#6366F1] font-bold">✔</span>
                  <span>What you&apos;re building</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6366F1] font-bold">✔</span>
                  <span>Where you are right now</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6366F1] font-bold">✔</span>
                  <span>What you need help with</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#6366F1] font-bold">✔</span>
                  <span>Your expected timeline</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <span className="text-[#6366F1] font-bold">✔</span>
                  <span>Your approximate investment range</span>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm pt-1">
                If your project is a fit, you&apos;ll be able to book a direct strategy call on our calendar.
              </p>
            </>
          ) : (
            <>
              <p className="text-gray-200 font-medium">
                You don&apos;t need to know the technology. You don&apos;t need a technical specification. You don&apos;t need to know exactly how the product should be built.
              </p>
              <p>
                Tell us what you&apos;re trying to create. We&apos;ll ask a few quick questions about your project first.
              </p>
              <p className="text-[#A5B4FC] font-semibold">
                If it looks like we&apos;re a good fit, you&apos;ll be able to choose a time for a 1-on-1 strategy call.
              </p>
            </>
          )}
        </div>

        {/* CTA and Box */}
        <div className="bg-gradient-to-r from-[#6366F1]/15 via-[#A855F7]/15 to-transparent border-l-4 border-[#6366F1] rounded-r-xl p-5 sm:p-7 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm sm:text-lg font-extrabold leading-snug">
              {isUS ? "Ready to map out your product?" : "Ready to turn your idea into a real product?"}
            </p>
            <p className="text-gray-400 text-xs mt-1">
              ⚡ Takes about 2 minutes • No technical knowledge required
            </p>
          </div>

          {onBookClick && (
            <button
              onClick={onBookClick}
              className="w-full sm:w-auto bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all cursor-pointer whitespace-nowrap shrink-0"
            >
              {isUS ? "Start My Project Assessment →" : "Check If My Project Is a Fit →"}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
