"use client";

import React from "react";

interface DevelopmentProcessSectionProps {
  isUS?: boolean;
}

export function DevelopmentProcessSection({ isUS = false }: DevelopmentProcessSectionProps) {
  const stepsIN = [
    {
      num: "01",
      icon: "💡",
      title: "Tell Us Your Idea",
      desc: "Tell us what you're trying to build, your vision, and why it matters.",
      border: "hover:border-[#60A5FA]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(96,165,250,0.15)]",
      badgeCol: "bg-[#60A5FA]/15 border-[#60A5FA]/40 text-[#60A5FA]",
      hoverText: "group-hover:text-[#60A5FA]",
      lineGradient: "from-[#60A5FA] to-transparent",
    },
    {
      num: "02",
      icon: "📐",
      title: "Understand & Plan",
      desc: "We understand your requirements, target users and business objectives.",
      border: "hover:border-[#6366F1]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]",
      badgeCol: "bg-[#6366F1]/15 border-[#6366F1]/40 text-[#818CF8]",
      hoverText: "group-hover:text-[#818CF8]",
      lineGradient: "from-[#6366F1] to-transparent",
    },
    {
      num: "03",
      icon: "🎨",
      title: "Design",
      desc: "We create the product experience, wireframes, and intuitive user interface.",
      border: "hover:border-[#A855F7]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
      badgeCol: "bg-[#A855F7]/15 border-[#A855F7]/40 text-[#C084FC]",
      hoverText: "group-hover:text-[#C084FC]",
      lineGradient: "from-[#A855F7] to-transparent",
    },
    {
      num: "04",
      icon: "💻",
      title: "Develop",
      desc: "The product is built cleanly using the appropriate modern technology stack.",
      border: "hover:border-[#EC4899]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]",
      badgeCol: "bg-[#EC4899]/15 border-[#EC4899]/40 text-[#F472B6]",
      hoverText: "group-hover:text-[#F472B6]",
      lineGradient: "from-[#EC4899] to-transparent",
    },
    {
      num: "05",
      icon: "🧪",
      title: "Test",
      desc: "We test functionality, usability, performance, and security across devices.",
      border: "hover:border-[#df7626]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(223,118,38,0.15)]",
      badgeCol: "bg-[#df7626]/15 border-[#df7626]/40 text-[#df7626]",
      hoverText: "group-hover:text-[#df7626]",
      lineGradient: "from-[#df7626] to-transparent",
    },
    {
      num: "06",
      icon: "🚀",
      title: "Launch",
      desc: "Your product goes live with production deployment and zero friction.",
      border: "hover:border-yellow-400/60",
      shadow: "hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]",
      badgeCol: "bg-yellow-400/15 border-yellow-400/40 text-yellow-400",
      hoverText: "group-hover:text-yellow-400",
      lineGradient: "from-yellow-400 to-transparent",
    },
  ];

  const stepsUS = [
    {
      num: "01",
      icon: "💡",
      title: "Discovery",
      desc: "Understand the business model, target users and core product value.",
      border: "hover:border-[#60A5FA]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(96,165,250,0.15)]",
      badgeCol: "bg-[#60A5FA]/15 border-[#60A5FA]/40 text-[#60A5FA]",
      hoverText: "group-hover:text-[#60A5FA]",
      lineGradient: "from-[#60A5FA] to-transparent",
    },
    {
      num: "02",
      icon: "📐",
      title: "Planning",
      desc: "Define features, project scope, timeline, and appropriate technology stack.",
      border: "hover:border-[#6366F1]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(99,102,241,0.15)]",
      badgeCol: "bg-[#6366F1]/15 border-[#6366F1]/40 text-[#818CF8]",
      hoverText: "group-hover:text-[#818CF8]",
      lineGradient: "from-[#6366F1] to-transparent",
    },
    {
      num: "03",
      icon: "🎨",
      title: "UI/UX",
      desc: "Design an intuitive, high-conversion product experience.",
      border: "hover:border-[#A855F7]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(168,85,247,0.15)]",
      badgeCol: "bg-[#A855F7]/15 border-[#A855F7]/40 text-[#C084FC]",
      hoverText: "group-hover:text-[#C084FC]",
      lineGradient: "from-[#A855F7] to-transparent",
    },
    {
      num: "04",
      icon: "💻",
      title: "Development",
      desc: "Build the robust frontend, backend, and API infrastructure.",
      border: "hover:border-[#EC4899]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(236,72,153,0.15)]",
      badgeCol: "bg-[#EC4899]/15 border-[#EC4899]/40 text-[#F472B6]",
      hoverText: "group-hover:text-[#F472B6]",
      lineGradient: "from-[#EC4899] to-transparent",
    },
    {
      num: "05",
      icon: "🧪",
      title: "QA & Testing",
      desc: "Find and fix issues, optimize speed, and ensure cross-platform stability.",
      border: "hover:border-[#df7626]/60",
      shadow: "hover:shadow-[0_0_25px_rgba(223,118,38,0.15)]",
      badgeCol: "bg-[#df7626]/15 border-[#df7626]/40 text-[#df7626]",
      hoverText: "group-hover:text-[#df7626]",
      lineGradient: "from-[#df7626] to-transparent",
    },
    {
      num: "06",
      icon: "🚀",
      title: "Launch",
      desc: "Deploy your product to production with automated monitoring.",
      border: "hover:border-yellow-400/60",
      shadow: "hover:shadow-[0_0_25px_rgba(250,204,21,0.15)]",
      badgeCol: "bg-yellow-400/15 border-yellow-400/40 text-yellow-400",
      hoverText: "group-hover:text-yellow-400",
      lineGradient: "from-yellow-400 to-transparent",
    },
  ];

  const steps = isUS ? stepsUS : stepsIN;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] h-[320px] sm:h-[600px] bg-purple-900/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-gradient-to-b from-[#131829] via-[#0F1629] to-[#0A0E1A] border border-[#2A3552] rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.55)] relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#A855F7]/10 border border-[#A855F7]/30 rounded-full px-3.5 py-1 text-[#C084FC] text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 rounded-full bg-[#A855F7] animate-ping"></span>
            Proven Roadmap
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-2">
          {isUS ? (
            <>
              A Clear Path{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#60A5FA]">
                From Idea to Launch
              </span>
            </>
          ) : (
            <>
              From Idea to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A855F7] via-[#6366F1] to-[#60A5FA]">
                Working Product
              </span>
            </>
          )}
        </h2>

        <p className="text-gray-400 text-xs sm:text-sm font-medium text-center sm:text-left mb-8 max-w-2xl">
          {isUS
            ? "A systematic engineering workflow designed to reduce technical risk and move from concept to scalable deployment."
            : "From initial vision to live product, our structured 7-phase process keeps everything predictable and on track."}
        </p>

        {/* 7-Step Process Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className={`group relative bg-gradient-to-br from-[#121A2F] to-[#0D1322] border border-[#2A3552] ${step.border} rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-md ${step.shadow} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-8 h-8 rounded-xl border flex items-center justify-center font-extrabold text-xs shadow-sm ${step.badgeCol}`}>
                    {step.num}
                  </span>
                  <span className="text-lg">{step.icon}</span>
                </div>
                <h3 className={`text-white text-sm sm:text-base font-extrabold mb-1 ${step.hoverText} transition-colors`}>
                  {step.title}
                </h3>
                <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed font-medium">
                  {step.desc}
                </p>
              </div>
              <div className={`w-full h-1 bg-gradient-to-r ${step.lineGradient} rounded-full mt-4 opacity-40 group-hover:opacity-100 transition-opacity`}></div>
            </div>
          ))}

          {/* STEP 7 */}
          <div className="group relative bg-gradient-to-r from-[#121A2F] via-[#0F182E] to-[#141C35] border border-green-500/30 hover:border-green-400/70 rounded-2xl p-4 sm:p-5 transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(74,222,128,0.2)] sm:col-span-2 lg:col-span-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/40 flex items-center justify-center text-green-400 font-extrabold text-sm shadow-sm shrink-0">
                07
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-white text-sm sm:text-base font-extrabold group-hover:text-green-400 transition-colors">
                    {isUS ? "Growth" : "Improve & Scale"}
                  </h3>
                  <span className="bg-green-500/20 border border-green-500/40 text-green-400 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                    Post-Launch
                  </span>
                </div>
                <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed font-medium mt-0.5">
                  {isUS
                    ? "Improve, optimize, maintain and scale your platform as user demand increases."
                    : "Add features, optimize speed and scale infrastructure as your business grows."}
                </p>
              </div>
            </div>
            <span className="text-2xl hidden sm:block">📈</span>
          </div>
        </div>
      </div>
    </section>
  );
}
