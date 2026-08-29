"use client";

import React from "react";

interface WhatWeBuildSectionProps {
  isUS?: boolean;
}

export function WhatWeBuildSection({ isUS = false }: WhatWeBuildSectionProps) {
  const servicesIN = [
    {
      title: "Mobile Apps",
      emoji: "📱",
      badge: "iOS & Android",
      badgeCol: "text-[#C084FC] bg-[#A855F7]/10 border-[#A855F7]/20",
      topLine: "from-[#A855F7] to-[#C084FC]",
      hoverBorder: "hover:border-[#A855F7]",
      iconCol: "text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/30",
      desc: "iOS, Android and cross-platform applications engineered for scale, performance and user delight.",
      footer: "Native • Flutter • React Native",
    },
    {
      title: "Web Applications",
      emoji: "💻",
      badge: "Portals & SaaS",
      badgeCol: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/20",
      topLine: "from-[#60A5FA] to-[#3B82F6]",
      hoverBorder: "hover:border-[#60A5FA]",
      iconCol: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/30",
      desc: "Custom websites, portals, dashboards and high-speed business platforms built to convert.",
      footer: "Next.js • React • High Performance",
    },
    {
      title: "Business Software",
      emoji: "⚙️",
      badge: "CRM & ERP",
      badgeCol: "text-[#FDBA74] bg-[#df7626]/10 border-[#df7626]/20",
      topLine: "from-[#df7626] to-[#F59E0B]",
      hoverBorder: "hover:border-[#df7626]",
      iconCol: "text-[#df7626] bg-[#df7626]/10 border-[#df7626]/30",
      desc: "CRM, ERP, management systems and custom internal tools tailored to your operational rules.",
      footer: "Custom Dashboards • Workflow Engine",
    },
    {
      title: "E-Commerce",
      emoji: "🛒",
      badge: "Scale Commerce",
      badgeCol: "text-[#86EFAC] bg-emerald-500/10 border-emerald-500/20",
      topLine: "from-emerald-400 to-teal-500",
      hoverBorder: "hover:border-emerald-400",
      iconCol: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      desc: "Custom e-commerce applications and platforms optimized for checkout speed and retention.",
      footer: "High Conversion • Secure Gateways",
    },
    {
      title: "APIs & Integrations",
      emoji: "🔗",
      badge: "Connectivity",
      badgeCol: "text-[#93C5FD] bg-blue-500/10 border-blue-500/20",
      topLine: "from-blue-400 to-indigo-500",
      hoverBorder: "hover:border-blue-400",
      iconCol: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      desc: "Connect your product with the tools, payment processors and services your business already uses.",
      footer: "REST & GraphQL • Webhooks • CRM Sync",
    },
    {
      title: "UI/UX Design",
      emoji: "🎨",
      badge: "Experience",
      badgeCol: "text-[#F472B6] bg-pink-500/10 border-pink-500/20",
      topLine: "from-pink-500 to-purple-500",
      hoverBorder: "hover:border-pink-500",
      iconCol: "text-pink-400 bg-pink-500/10 border-pink-500/30",
      desc: "Modern, intuitive interfaces designed around your users' behavior and your core business goals.",
      footer: "User Research • Wireframing • Design Systems",
    },
  ];

  const servicesUS = [
    {
      title: "Mobile App Development",
      emoji: "📱",
      badge: "iOS & Android",
      badgeCol: "text-[#C084FC] bg-[#A855F7]/10 border-[#A855F7]/20",
      topLine: "from-[#A855F7] to-[#C084FC]",
      hoverBorder: "hover:border-[#A855F7]",
      iconCol: "text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/30",
      desc: "Build iOS, Android or cross-platform applications designed around your users and business metrics.",
      footer: "Native • Flutter • React Native",
    },
    {
      title: "Web Applications",
      emoji: "💻",
      badge: "SaaS & Portals",
      badgeCol: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/20",
      topLine: "from-[#60A5FA] to-[#3B82F6]",
      hoverBorder: "hover:border-[#60A5FA]",
      iconCol: "text-[#60A5FA] bg-[#60A5FA]/10 border-[#60A5FA]/30",
      desc: "Build custom platforms, client portals, real-time dashboards and scalable business applications.",
      footer: "Next.js • React • High Performance",
    },
    {
      title: "Custom Business Software",
      emoji: "⚙️",
      badge: "Internal Systems",
      badgeCol: "text-[#FDBA74] bg-[#df7626]/10 border-[#df7626]/20",
      topLine: "from-[#df7626] to-[#F59E0B]",
      hoverBorder: "hover:border-[#df7626]",
      iconCol: "text-[#df7626] bg-[#df7626]/10 border-[#df7626]/30",
      desc: "CRM, ERP and internal systems designed around your actual workflows and operational bottlenecks.",
      footer: "Custom Dashboards • Workflow Engine",
    },
    {
      title: "E-Commerce",
      emoji: "🛒",
      badge: "Digital Commerce",
      badgeCol: "text-[#86EFAC] bg-emerald-500/10 border-emerald-500/20",
      topLine: "from-emerald-400 to-teal-500",
      hoverBorder: "hover:border-emerald-400",
      iconCol: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
      desc: "Build scalable digital commerce experiences engineered for customer conversion and retention.",
      footer: "Headless Commerce • Payment Gateways",
    },
    {
      title: "API & Backend Development",
      emoji: "🔗",
      badge: "Infrastructure",
      badgeCol: "text-[#93C5FD] bg-blue-500/10 border-blue-500/20",
      topLine: "from-blue-400 to-indigo-500",
      hoverBorder: "hover:border-blue-400",
      iconCol: "text-blue-400 bg-blue-500/10 border-blue-500/30",
      desc: "Build the reliable cloud infrastructure, microservices and seamless integrations your product needs.",
      footer: "REST & GraphQL • Microservices • Cloud",
    },
    {
      title: "UI/UX Design",
      emoji: "🎨",
      badge: "Product Experience",
      badgeCol: "text-[#F472B6] bg-pink-500/10 border-pink-500/20",
      topLine: "from-pink-500 to-purple-500",
      hoverBorder: "hover:border-pink-500",
      iconCol: "text-pink-400 bg-pink-500/10 border-pink-500/30",
      desc: "Create intuitive, high-conversion product experiences and interactive prototypes before development begins.",
      footer: "Figma • UX Architecture • Design Systems",
    },
  ];

  const services = isUS ? servicesUS : servicesIN;

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-900/15 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="bg-[#0F1629]/90 border border-[#2A3552]/80 rounded-2xl sm:rounded-3xl p-5 sm:p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Top badge */}
        <div className="flex justify-center sm:justify-start mb-4">
          <div className="inline-flex items-center gap-2 bg-[#60A5FA]/10 border border-[#60A5FA]/20 rounded-full px-3 py-1 text-[#60A5FA] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#60A5FA] animate-ping"></span>
            End-to-End Capabilities
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white text-center sm:text-left leading-snug sm:leading-tight mb-3">
          {isUS ? (
            <>
              One Development Partner.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#6366F1] to-[#A855F7]">
                From Idea to Launch.
              </span>
            </>
          ) : (
            <>
              One Team.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] via-[#6366F1] to-[#A855F7]">
                From Idea to Launch.
              </span>
            </>
          )}
        </h2>

        <p className="text-gray-300 text-xs sm:text-base leading-relaxed text-center sm:text-left mb-8 max-w-2xl font-medium">
          Selflance helps businesses bring digital products to life across the complete development journey.
        </p>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {services.map((item, idx) => (
            <div
              key={idx}
              className={`relative group bg-gradient-to-b from-[#131C35] to-[#0F1629] border border-[#2A3552] ${item.hoverBorder} rounded-2xl p-5 sm:p-6 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between`}
            >
              <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${item.topLine} opacity-80 group-hover:opacity-100 transition-opacity`}></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl ${item.iconCol} flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    {item.emoji}
                  </div>
                  <span className={`text-[10px] font-bold ${item.badgeCol} px-2.5 py-0.5 rounded-full uppercase tracking-wider`}>
                    {item.badge}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">{item.title}</h3>
                <p className="text-gray-300 text-xs sm:text-sm font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-800/60 flex items-center gap-1.5 text-[11px] text-[#60A5FA] font-bold">
                <span>{item.footer}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
