"use client";

import React, { useState, useEffect } from "react";

interface SelflanceHeroProps {
  isUS?: boolean;
  onBookClick: () => void;
  onVideoClick?: () => void;
}

const testimonialsIN = [
  {
    avatar: "https://i.pravatar.cc/80?img=33",
    borderColor: "border-[#6366F1]/40",
    quote: "Revenue ₹80L se ₹2.6Cr ho gayi — sirf 8 mahine mein. Selflance ka system ne sab badal diya.",
    name: "Rahul Mehta",
    role: "· E-commerce Founder",
    badge: "↑ 3.2x Revenue",
    badgeColor: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=47",
    borderColor: "border-[#A855F7]/40",
    quote: "Humara CRM + automation system ne manual work 70% reduce kar diya. Sales team ab 2x zyada deals close kar rahi hai.",
    name: "Priya Sharma",
    role: "· SaaS Co-founder",
    badge: "70% Less Work",
    badgeColor: "text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/20",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=60",
    borderColor: "border-[#df7626]/40",
    quote: "6 mahine mein ₹12Cr ka project deliver hua — on time, on budget. Aisa koi aur agency nahi karti.",
    name: "Anil Verma",
    role: "· Retail Chain Owner",
    badge: "₹12Cr Delivered",
    badgeColor: "text-[#df7626] bg-[#df7626]/10 border-[#df7626]/20",
  },
];

const testimonialsUS = [
  {
    avatar: "https://i.pravatar.cc/80?img=33",
    borderColor: "border-[#6366F1]/40",
    quote: "Revenue grew 3.2x in 8 months. Selflance's automated system changed everything for us.",
    name: "Rahul Mehta",
    role: "· E-commerce Founder",
    badge: "↑ 3.2x Revenue",
    badgeColor: "text-green-400 bg-green-400/10 border-green-400/20",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=47",
    borderColor: "border-[#A855F7]/40",
    quote: "Our CRM + automation workflow reduced manual labor by 70%. The sales team is closing 2x more deals.",
    name: "Priya Sharma",
    role: "· SaaS Co-founder",
    badge: "70% Less Work",
    badgeColor: "text-[#A855F7] bg-[#A855F7]/10 border-[#A855F7]/20",
  },
  {
    avatar: "https://i.pravatar.cc/80?img=60",
    borderColor: "border-[#df7626]/40",
    quote: "Delivered a complex $1.5M enterprise platform in 6 months—on time and on budget.",
    name: "Anil Verma",
    role: "· Retail Chain Owner",
    badge: "$1.5M Delivered",
    badgeColor: "text-[#df7626] bg-[#df7626]/10 border-[#df7626]/20",
  },
];

export function SelflanceHero({ isUS = false, onBookClick, onVideoClick }: SelflanceHeroProps) {
  const [activeTestiIndex, setActiveTestiIndex] = useState(0);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const testimonials = isUS ? testimonialsUS : testimonialsIN;

  // Carousel auto advance
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestiIndex((prev) => (prev + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <main className="w-full max-w-5xl mx-auto pt-14 sm:pt-20 md:pt-24 pb-6 sm:pb-12 relative px-3 sm:px-6 z-10 flex flex-col items-center text-center gap-y-2.5 sm:gap-y-3.5 overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] bg-blue-900/20 blur-[90px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-[200px] h-[200px] bg-purple-500/10 blur-[80px] rounded-full pointer-events-none -z-10 animate-[float_8s_ease-in-out_infinite]"></div>

      {/* HEADLINE */}
      <h1 className="text-[21px] sm:text-3xl md:text-[46px] font-extrabold leading-[1.25] tracking-tight text-white drop-shadow-lg px-2 w-full max-w-[350px] sm:max-w-4xl mx-auto mt-1 sm:mt-0">
        {isUS ? (
          <>
            Have a Product Idea?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
              Let&apos;s Turn It Into Something Real.
            </span>
          </>
        ) : (
          <>
            Have an App or Software Idea?{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366F1] via-[#A855F7] to-[#df7626]">
              Let&apos;s Turn It Into a Real Product.
            </span>
          </>
        )}
      </h1>

      {/* SUB-HEADLINE */}
      <div className="text-[#94A3B8] text-[12px] sm:text-[14px] md:text-base leading-snug sm:leading-relaxed max-w-[340px] sm:max-w-3xl mx-auto font-medium px-1 space-y-1 sm:space-y-2">
        {isUS ? (
          <>
            <p>
              From product strategy and UI/UX to development, testing and launch — Selflance helps businesses build custom digital products without technical complexity.
            </p>
            <p className="text-gray-300 text-[11px] sm:text-xs">
              Whether you&apos;re launching an MVP, building a business application, or upgrading an existing product, we help you move from idea to launch.
            </p>
          </>
        ) : (
          <>
            <p>
              From UI/UX and development to backend, testing and launch — Selflance helps businesses build custom digital products without technical headaches.
            </p>
            <p className="text-gray-300 text-[11px] sm:text-xs">
              Whether you&apos;re launching a new app, building business software, or upgrading an existing product, our team can help you plan, build and launch it.
            </p>
          </>
        )}
      </div>

      {/* LIVE RESULTS TICKER */}
      <div
        className="w-full overflow-hidden relative my-0.5 max-w-2xl mx-auto"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex gap-2 animate-[ticker_18s_linear_infinite] hover:[animation-play-state:paused] w-max">
          {[1, 2].map((loopKey) => (
            <React.Fragment key={loopKey}>
              <div className="flex items-center gap-1.5 bg-[#111424] border border-[#2A3552] rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap shrink-0">
                <span className="text-green-400 text-[10px] sm:text-xs font-bold">&#8593; 3.2x</span>
                <span className="text-gray-400 text-[9px] sm:text-[11px]">Revenue Growth</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#111424] border border-[#2A3552] rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap shrink-0">
                <span className="text-[#6366F1] text-[10px] sm:text-xs font-bold">50+</span>
                <span className="text-gray-400 text-[9px] sm:text-[11px]">Digital Products Launched</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#111424] border border-[#2A3552] rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap shrink-0">
                <span className="text-[#df7626] text-[10px] sm:text-xs font-bold">
                  {isUS ? "$50M+" : "₹40Cr+"}
                </span>
                <span className="text-gray-400 text-[9px] sm:text-[11px]">
                  {isUS ? "Client Valuation" : "Revenue Generated"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#111424] border border-[#2A3552] rounded-full px-2.5 py-0.5 sm:px-3 sm:py-1 whitespace-nowrap shrink-0">
                <span className="text-yellow-400 text-[10px] sm:text-xs font-bold">&#9733; 4.9/5</span>
                <span className="text-gray-400 text-[9px] sm:text-[11px]">Client Rating</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* VIDEO CONTAINER */}
      <div className="relative w-full max-w-[320px] sm:max-w-lg lg:max-w-xl mx-auto group rounded-2xl transition-all duration-300 hover:shadow-[0_12px_35px_rgba(223,118,38,0.25)] shadow-[0_12px_35px_rgba(0,0,0,0.6)] z-20 border border-gray-700/60 bg-[#0A0F1C] overflow-hidden aspect-video">
        {isPlayingVideo ? (
          <iframe
            src="https://www.youtube-nocookie.com/embed/Otgmq0_YlnQ?autoplay=1&rel=0&modestbranding=1&playsinline=1"
            title="Selflance Digital Growth Engine Presentation"
            className="w-full h-full border-0 rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div
            onClick={() => setIsPlayingVideo(true)}
            className="relative w-full h-full cursor-pointer flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[#df7626]/15 blur-[25px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <img
              src="/thumbnail.png"
              alt="Selflance Digital Growth Engine Presentation"
              width={1672}
              height={941}
              className="w-full h-full object-cover block transform group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
              <div className="w-11 h-7.5 sm:w-16 sm:h-11 bg-[#FF0000] rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(255,0,0,0.6)] transform group-hover:scale-110 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-7 sm:h-7 text-white ml-0.5 sm:ml-1" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ROTATING TESTIMONIAL STRIP */}
      <div className="w-full max-w-[320px] sm:max-w-lg mx-auto relative">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${activeTestiIndex * 100}%)` }}
          >
            {testimonials.map((item, index) => (
              <div
                key={index}
                className="min-w-full bg-[#0F1629] border border-[#2A3552]/80 rounded-xl px-2.5 py-1.5 sm:px-4 sm:py-3 flex items-center gap-2.5 sm:gap-3 text-left"
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full border-2 ${item.borderColor} shrink-0 object-cover`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] sm:text-[11.5px] text-gray-300 leading-snug font-medium line-clamp-2">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="flex items-center justify-between mt-0.5 sm:mt-1.5">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-white">{item.name}</span>
                      <span className="text-[8px] sm:text-[9px] text-gray-500 ml-1">{item.role}</span>
                    </div>
                    <span
                      className={`text-[8px] sm:text-[9px] font-bold border rounded-full px-2 py-0.5 shrink-0 ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-1 sm:mt-1.5">
          {testimonials.map((_, i) => (
            <span
              key={i}
              onClick={() => setActiveTestiIndex(i)}
              className={`cursor-pointer h-1 rounded-full transition-all duration-300 ${
                i === activeTestiIndex ? "w-4 bg-[#6366F1]" : "w-1.5 bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* CTA BUTTON */}
      <div className="w-full max-w-[320px] sm:max-w-md mx-auto pt-0.5 sm:pt-1">
        <button
          onClick={onBookClick}
          className="group relative w-full bg-gradient-to-r from-[#7c3aed] to-[#6d28d9] hover:from-[#6d28d9] hover:to-[#5b21b6] text-white py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-[12.5px] sm:text-[15px] flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_8px_25px_-5px_rgba(109,40,217,0.6)] border-t border-white/20 border-b-[3px] border-b-[#4c1d95] active:border-b-0 active:translate-y-0.5 overflow-hidden px-3 cursor-pointer"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <span className="relative z-10 drop-shadow-sm tracking-wide text-center leading-tight">
            {isUS ? "Tell Us About Your Project →" : "Tell Us What You Want to Build →"}
          </span>
        </button>
      </div>

      {/* SUPPORTING TEXT PILL / TRUST BAR */}
      <div className="w-full max-w-[320px] sm:max-w-3xl mx-auto flex items-center justify-center flex-wrap gap-x-2.5 sm:gap-x-4 gap-y-0.5 text-[9px] sm:text-[11px] text-gray-300 font-medium pt-0.5">
        {isUS ? (
          <span>Product Strategy &bull; UI/UX &bull; Development &bull; Backend &bull; Launch</span>
        ) : (
          <span>Custom Development &bull; UI/UX &bull; Backend &bull; APIs &bull; Launch Support</span>
        )}
      </div>

      {/* SCARCITY PILL */}
      <div className="inline-flex items-center justify-center gap-1.5 text-[9.5px] sm:text-[11px] text-[#df7626] font-semibold tracking-wide bg-[#111424] px-3 py-0.5 sm:px-4 sm:py-1 rounded-full border border-[#df7626]/30 shadow-sm mt-0.5">
        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#df7626]" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z"
            clipRule="evenodd"
          />
        </svg>
        <span>Takes about 2 minutes &bull; Free assessment</span>
      </div>
    </main>
  );
}
