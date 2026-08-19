"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { event as fbEvent, customEvent as fbCustomEvent, getPreservedQueryString } from "@/lib/fpixel";
import { BookingModal } from "@/components/BookingModal";

// Product Data Object for Rich Catalog & Quickview Modal
interface ProductItem {
  id: string;
  title: string;
  category: string;
  badge: string;
  tag: string;
  tagClass: string;
  subtitle: string;
  feature: string;
  desc: string;
  fabric: string;
  dupatta: string;
  bottom: string;
  stitching: string;
  img: string;
  tags: string[];
}

const PRODUCTS_DATA: Record<string, ProductItem> = {
  violet: {
    id: "violet",
    title: "Royal Violet & Antique Gold Embroidered Luxury Lawn",
    category: "Heavy Resham Neckwork • 3-Piece Suite",
    badge: "100% Original Brand",
    tag: "Hot Seller",
    tagClass: "bg-purple-700 text-white",
    subtitle: "Heavy Resham • 3-Piece",
    feature: "Pure Lawn + Silk Dupatta",
    desc: "Deep royal violet pure lawn featuring intricate antique gold Resham threadwork on the neckline and sleeves, scalloped embroidered daman, luxury botanical printed silk dupatta, and structured violet cigarette trousers.",
    fabric: "High-Density 80x80 Pure Lawn",
    dupatta: "Premium Digital Printed Silk Dupatta (2.5 Mtr)",
    bottom: "Dyed Lawn Cigarette Trouser (2.5 Mtr)",
    stitching: "In-House Master Stitching Available at Counter",
    img: "/product/royal-violet-gold-embroidered-suit.webp",
    tags: ["unstitched", "readymade"],
  },
  ivory: {
    id: "ivory",
    title: "Ivory White Schiffli Chikankari with Pink Floral Dupatta",
    category: "Schiffli Cutwork • 3-Piece Summer Suite",
    badge: "Schiffli Chikankari",
    tag: "Summer Best",
    tagClass: "bg-red-600 text-white",
    subtitle: "Chikankari • 3-Piece",
    feature: "Heavy Schiffli + Chiffon Dupatta",
    desc: "Breathable pure white lawn with all-over delicate schiffli chikankari cutwork, pastel pink floral resham embroidery on neck and sleeves, baby pink scalloped lace hem, floral printed pure chiffon dupatta & tailored white trousers.",
    fabric: "Pure Schiffli Cutwork 80x80 Lawn",
    dupatta: "Soft Floral Printed Chiffon Dupatta (2.5 Mtr)",
    bottom: "Solid White Pure Lawn Trouser (2.5 Mtr)",
    stitching: "Custom Neck Pattern & Trouser Fitting Available",
    img: "/product/ivory-pink-schiffli-lawn-suit.webp",
    tags: ["unstitched", "readymade"],
  },
  crimson: {
    id: "crimson",
    title: "Classic Cream & Crimson Ruby Red Resham Suit",
    category: "Resham Threadwork • Festive 3-Piece",
    badge: "Festive Edition",
    tag: "Tailor Fit",
    tagClass: "bg-purple-800 text-white",
    subtitle: "Ruby Resham • 3-Piece",
    feature: "Master Stitching Available",
    desc: "Regal off-white breathable lawn with rich crimson ruby red floral threadwork along the center panel and sleeves, contrast red hem piping, designer ruby red trousers, and matching border-finished printed dupatta.",
    fabric: "Luxury Breathable Lawn with Fine Weave",
    dupatta: "Contrast Border Heavy Lawn Dupatta (2.5 Mtr)",
    bottom: "Crimson Red Solid Trouser (2.5 Mtr)",
    stitching: "Master Tailor In-House Fitting Guarantee",
    img: "/product/crimson-ruby-embroidered-suit.webp",
    tags: ["unstitched", "stitching"],
  },
  blue: {
    id: "blue",
    title: "Sapphire Royal Blue Digital Lawn & Cutwork Suit",
    category: "Digital Print & Lace • 3-Piece Luxury",
    badge: "Trending Blue",
    tag: "Wholesale",
    tagClass: "bg-blue-600 text-white",
    subtitle: "Digital Lawn • 3-Piece",
    feature: "80x80 Lawn + Scalloped Lace",
    desc: "Royal sapphire blue 80x80 pure lawn adorned with intricate white floral booti work, decorative sleeve cuff lace, scalloped daman border, matching blue cigarette trousers, and a lightweight printed dupatta.",
    fabric: "High-Density 80x80 Premium Lawn",
    dupatta: "Digital Printed Lightweight Lawn Dupatta",
    bottom: "Sapphire Blue Matching Trouser (2.5 Mtr)",
    stitching: "Custom Sleeves & Daman Lace Finishing",
    img: "/product/sapphire-blue-luxury-lawn-suit.webp",
    tags: ["unstitched", "wholesale"],
  },
  wine: {
    id: "wine",
    title: "Deep Wine Maroon Tone-on-Tone Heavy Embroidered Suit",
    category: "Tone-on-Tone Resham • Evening Partywear",
    badge: "Partywear",
    tag: "Heavy Work",
    tagClass: "bg-red-700 text-white",
    subtitle: "Tone-on-Tone • 3-Piece",
    feature: "Rich Embroidery + Silk Dupatta",
    desc: "Opulent deep wine maroon lawn fabric with dense all-over tone-on-tone and pink resham floral embroidery, cutwork hem borders, matching dyed trousers, and a printed floral silk dupatta designed for weddings and festive evenings.",
    fabric: "Dense Heavy Embroidered Luxury Lawn",
    dupatta: "Floral Botanical Silk Dupatta (2.5 Mtr)",
    bottom: "Deep Maroon Tailored Trouser (2.5 Mtr)",
    stitching: "Lining & Inner Attachment Available",
    img: "/product/wine-maroon-heavy-embroidered-suit.webp",
    tags: ["readymade", "stitching"],
  },
  lavender: {
    id: "lavender",
    title: "Lavender Lilac Botanical Floral & Schiffli Lace Suit",
    category: "Pastel Garden • 3-Piece Lawn",
    badge: "Pastel Luxury",
    tag: "2026 Lot",
    tagClass: "bg-purple-600 text-white",
    subtitle: "Pastel Lawn • 3-Piece",
    feature: "Botanical Garden Silk Dupatta",
    desc: "Soothing pastel lavender lilac lawn with vertical schiffli embroidered stripes, botanical floral garden motifs, delicate triangle lace trims on sleeves and daman, pure printed silk dupatta, and matching lilac bottoms.",
    fabric: "Ultra-Soft Pastel Summer Lawn",
    dupatta: "Botanical Garden Printed Silk Dupatta (2.5 Mtr)",
    bottom: "Lavender Lilac Pure Cotton Trouser (2.5 Mtr)",
    stitching: "In-House Master Stitching Available at Counter",
    img: "/product/lavender-lilac-botanical-lawn-suit.webp",
    tags: ["unstitched", "wholesale"],
  },
};

function URLParamsHandler({
  onConfigureBooking,
  onCountryChange,
}: {
  onConfigureBooking: (config: {
    isOpen: boolean;
    step: 1 | 2 | 3 | 4;
    leadId: string | null;
    createdDate: string | null;
    campaignName: string | null;
  }) => void;
  onCountryChange: (isUS: boolean) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const countryParam = (searchParams.get("c") || searchParams.get("country") || "").toLowerCase();
    onCountryChange(countryParam === "us");

    const pathname = window.location.pathname;
    const stepParam = searchParams.get("step");
    const bookingParam =
      searchParams.get("booking") ||
      searchParams.get("book") ||
      searchParams.get("form") ||
      searchParams.get("openBooking");
    const leadIdParam = searchParams.get("leadId");
    const createdDateParam = searchParams.get("createdDate");
    const campaignParam = searchParams.get("campaign");

    let targetStep: 1 | 2 | 3 | 4 | null = null;

    if (pathname === "/form") targetStep = 1;
    else if (pathname === "/survey") targetStep = 2;
    else if (pathname === "/meeting") targetStep = 3;
    else if (pathname === "/success") targetStep = 4;
    else if (stepParam === "survey" || stepParam === "2") targetStep = 2;
    else if (stepParam === "meeting" || stepParam === "3") targetStep = 3;
    else if (stepParam === "4" || stepParam === "success") targetStep = 4;
    else if (
      stepParam === "1" ||
      stepParam === "contact" ||
      stepParam === "form" ||
      stepParam === "book" ||
      bookingParam
    )
      targetStep = 1;
    else if (campaignParam) targetStep = 1;

    if (targetStep !== null) {
      onConfigureBooking({
        isOpen: true,
        step: targetStep,
        leadId: leadIdParam,
        createdDate: createdDateParam,
        campaignName: campaignParam,
      });
    }
  }, [searchParams, onConfigureBooking, onCountryChange]);

  return null;
}

export default function Home({
  defaultStep,
  defaultOpen = false,
}: {
  defaultStep?: 1 | 2 | 3 | 4;
  defaultOpen?: boolean;
} = {}) {
  const [isUS, setIsUS] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [quickviewProduct, setQuickviewProduct] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [videoTab, setVideoTab] = useState<"script1" | "script2">("script1");
  const [calcBusiness, setCalcBusiness] = useState<string>("retailer");
  const [calcQty, setCalcQty] = useState<number>(30);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const [bookingConfig, setBookingConfig] = useState<{
    isOpen: boolean;
    step: 1 | 2 | 3 | 4;
    leadId: string | null;
    createdDate: string | null;
    campaignName: string | null;
  }>({
    isOpen: defaultOpen || !!defaultStep,
    step: defaultStep || 1,
    leadId: null,
    createdDate: null,
    campaignName: null,
  });

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  }, []);

  const handleOpenBooking = useCallback(
    (source?: string) => {
      if (typeof window !== "undefined") {
        const preserved = getPreservedQueryString();
        window.history.replaceState({}, "", window.location.pathname + preserved);
      }

      fbEvent("Lead", {
        content_name: source || "CTA Button Click",
        currency: isUS ? "USD" : "INR",
        value: 0,
      });
      fbCustomEvent("ButtonClick", {
        button_name: source || "Book Consultation CTA",
      });

      setBookingConfig({
        isOpen: true,
        step: 1,
        leadId: null,
        createdDate: null,
        campaignName: "diamond_boutique",
      });
    },
    [isUS]
  );

  const handleCloseBooking = useCallback(() => {
    setBookingConfig({
      isOpen: false,
      step: 1,
      leadId: null,
      createdDate: null,
      campaignName: null,
    });
  }, []);

  const handleConfigureBooking = useCallback(
    (config: {
      isOpen: boolean;
      step: 1 | 2 | 3 | 4;
      leadId: string | null;
      createdDate: string | null;
      campaignName: string | null;
    }) => {
      setBookingConfig((prev) => {
        if (
          prev.isOpen === config.isOpen &&
          prev.step === config.step &&
          prev.leadId === config.leadId &&
          prev.createdDate === config.createdDate &&
          prev.campaignName === config.campaignName
        ) {
          return prev;
        }
        return config;
      });
    },
    []
  );

  const handleCountryChange = useCallback((usState: boolean) => {
    setIsUS(usState);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyStoreAddress = () => {
    const address =
      "Diamond Boutique / Siddiqui Coutures, 54/56, Shop No. 2, Khatija Bai Building, Kambekar Street, Attar Gali, Mumbai – 400003";
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(address)
        .then(() => {
          showToast("📍 Store Address copy ho gaya!");
        })
        .catch(() => {
          showToast("📍 Store Address: Attar Gali, Mumbai - 400003");
        });
    } else {
      showToast("📍 Store Address: Attar Gali, Mumbai - 400003");
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const filteredProducts = Object.values(PRODUCTS_DATA).filter((item) => {
    if (activeCategory === "all") return true;
    return item.tags.includes(activeCategory);
  });

  const minProfit = calcQty * 600;
  const maxProfit = calcQty * 900;
  const formatCurrency = (amt: number) => "₹" + amt.toLocaleString("en-IN");

  return (
    <div className="w-full bg-slate-50 text-slate-800 font-sans antialiased selection:bg-purple-600 selection:text-white relative overflow-x-hidden min-h-screen">
      {/* URL Parameter Direct Link & Country Handler */}
      <Suspense fallback={null}>
        <URLParamsHandler
          onConfigureBooking={handleConfigureBooking}
          onCountryChange={handleCountryChange}
        />
      </Suspense>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-900/95 text-white px-5 py-3 rounded-full text-xs font-bold shadow-2xl border border-purple-400/40 z-50 flex items-center gap-2 animate-in fade-in duration-200">
          <i className="fa-solid fa-circle-check text-amber-400"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative purple-gradient-hero text-white min-h-[100svh] flex flex-col justify-between py-4 sm:py-8 lg:py-12 overflow-hidden"
      >
        {/* Ambient Glowing Lights */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#c084fc_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Top Minimalist Brand Header */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex items-center justify-between pb-2.5 sm:pb-4 border-b border-purple-500/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-400 flex items-center justify-center text-white font-extrabold shadow-purple-glow">
                <i className="fa-solid fa-gem text-xs sm:text-base"></i>
              </div>
              <div>
                <div className="font-serif font-extrabold text-sm sm:text-base tracking-tight text-white flex items-center gap-1">
                  <span>DIAMOND</span>
                  <span className="gold-gradient-text">BOUTIQUE</span>
                </div>
                <div className="text-[8px] sm:text-[9.5px] tracking-wider text-purple-300 font-semibold uppercase -mt-0.5">
                  Siddiqui Coutures • Attar Gali, Mumbai
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <a
                href="tel:+919876543210"
                className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-purple-950/80 border border-purple-400/30 text-purple-200 hover:bg-purple-900 transition-all text-[10.5px] sm:text-xs font-semibold flex items-center gap-1"
              >
                <i className="fa-solid fa-phone text-[9.5px] text-amber-400"></i>
                <span className="hidden xs:inline">Call Karein</span>
              </a>
              <button
                onClick={() => handleOpenBooking("Top Bar Distributorship Inquiry")}
                className="gold-bg-gradient text-slate-950 font-bold px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-lg text-[10.5px] sm:text-xs shadow-sm hover:brightness-110 active:scale-95 transition-all flex items-center gap-1 cursor-pointer"
              >
                <i className="fa-solid fa-handshake text-[9.5px]"></i>
                <span>B2B Wholesale / Visit</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Hero Body Grid */}
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10 w-full my-auto py-2 sm:py-4">
          <div className="grid lg:grid-cols-12 gap-4 lg:gap-8 items-center">
            {/* Left/Center Column */}
            <div className="lg:col-span-7 space-y-3.5 sm:space-y-4 text-center lg:text-left flex flex-col justify-center">
              {/* Prestige Badge */}
              <div className="inline-flex items-center justify-center lg:justify-start gap-1.5 px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-200 text-[9.5px] sm:text-xs font-bold shadow-sm mx-auto lg:mx-0 max-w-fit">
                <i className="fa-solid fa-crown text-amber-400"></i>
                <span>LUXURY DESIGNER PAKISTANI SUITS &amp; MASTER STITCHING</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-xl xs:text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight text-white tracking-tight">
                Luxury Branded Pakistani Suits &amp; Master Fitting—
                <span className="gold-gradient-text block xs:inline">Sab Ek Hi Chhat Ke Neeche!</span>
              </h1>

              {/* Description in Hinglish */}
              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
                Market mein bhatakna aur tailors ke peeche bhagna band karo. Mumbai Attar Gali mein paayein premium Pakistani lawn collections, in-house master tailor fitting, aur direct wholesale supply.
              </p>

              {/* Mobile Product Thumbnail */}
              <div className="lg:hidden my-1">
                <div className="relative rounded-2xl overflow-hidden border border-purple-400/35 shadow-2xl bg-purple-950 max-w-xs mx-auto">
                  <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden group">
                    <img
                      src={
                        videoTab === "script1"
                          ? "/product/royal-violet-gold-embroidered-suit.webp"
                          : "/product/sapphire-blue-luxury-lawn-suit.webp"
                      }
                      alt="Diamond Boutique Luxury Pakistani Collection Preview"
                      className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 flex flex-col items-center justify-center text-center p-2">
                      <button
                        onClick={() => handleOpenBooking("Mobile Store Tour Inquiry")}
                        className="w-10 h-10 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 text-sm shadow-gold-glow hover:scale-110 active:scale-95 transition-all mb-1 cursor-pointer"
                      >
                        <i className="fa-solid fa-play ml-0.5"></i>
                      </button>
                      <span className="bg-black/75 text-amber-300 text-[9px] font-bold px-2 py-0.5 rounded-full border border-amber-500/40 backdrop-blur-md">
                        <i className="fa-solid fa-film text-red-400 mr-1"></i> Store Tour &amp; Premium Fabric Dekhein
                      </span>
                    </div>
                  </div>

                  <div className="p-2 bg-[#150430] border-t border-purple-500/25">
                    <p className="font-serif font-bold text-[10.5px] text-amber-300 text-center leading-snug">
                      {videoTab === "script1"
                        ? '"Mumbai Ki Garmi Mein Breathable Luxury Lawn Ka Real Comfort!"'
                        : '"Apna Boutique Chalana Sirf Kapde Bechna Nahi Hota... Sahi Quality Aur Genuine Fitting Zaroori Hai!"'}
                    </p>
                    <div className="grid grid-cols-2 gap-1.5 mt-1.5 pt-1.5 border-t border-white/10">
                      <button
                        onClick={() => setVideoTab("script1")}
                        className={`${
                          videoTab === "script1"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-purple-900 border border-purple-500/30 text-purple-200"
                        } font-bold py-1 px-1 rounded-lg text-[9.5px] transition-all text-center cursor-pointer`}
                      >
                        🛍️ Shoppers Ke Liye
                      </button>
                      <button
                        onClick={() => setVideoTab("script2")}
                        className={`${
                          videoTab === "script2"
                            ? "bg-amber-500 text-slate-950"
                            : "bg-purple-900 border border-purple-500/30 text-purple-200"
                        } font-bold py-1 px-1 rounded-lg text-[9.5px] transition-all text-center cursor-pointer`}
                      >
                        📦 Retailers (Wholesale)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Chips Matrix */}
              <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 py-1 max-w-lg mx-auto lg:mx-0 text-left">
                <div className="p-2 sm:p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/30 text-center">
                  <i className="fa-solid fa-certificate text-amber-400 text-xs sm:text-sm mb-0.5 block"></i>
                  <div className="text-[9.5px] sm:text-[11.5px] font-bold text-white leading-tight">Premium Brands</div>
                  <div className="text-[8px] sm:text-[8.5px] text-purple-200">Direct Brand Source</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/30 text-center">
                  <i className="fa-solid fa-scissors text-purple-300 text-xs sm:text-sm mb-0.5 block"></i>
                  <div className="text-[9.5px] sm:text-[11.5px] font-bold text-white leading-tight">Master Fitting</div>
                  <div className="text-[8px] sm:text-[8.5px] text-purple-200">In-House Tailor</div>
                </div>
                <div className="p-2 sm:p-2.5 rounded-xl bg-purple-950/70 border border-purple-500/30 text-center">
                  <i className="fa-solid fa-truck-ramp-box text-amber-400 text-xs sm:text-sm mb-0.5 block"></i>
                  <div className="text-[9.5px] sm:text-[11.5px] font-bold text-white leading-tight">B2B Wholesale</div>
                  <div className="text-[8px] sm:text-[8.5px] text-purple-200">Pan-India Supply</div>
                </div>
              </div>

              {/* Action CTA Buttons */}
              <div className="flex flex-col xs:flex-row items-center justify-center lg:justify-start gap-2.5 pt-1.5">
                <button
                  onClick={() => handleOpenBooking("Hero Distributorship Application")}
                  className="w-full xs:w-auto gold-bg-gradient-shimmer text-slate-950 font-black px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl shadow-gold-glow hover:brightness-110 active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer border-2 border-amber-300 ring-4 ring-amber-500/30 animate-pulse hover:animate-none"
                >
                  <i className="fa-solid fa-handshake-angle text-base text-slate-950"></i>
                  <span>BECOME A DISTRIBUTOR / RESELLER</span>
                  <span className="bg-slate-950 text-amber-300 text-[9px] font-black px-2 py-0.5 rounded-full ml-1 uppercase tracking-wider hidden sm:inline">
                    Wholesale
                  </span>
                </button>

                <button
                  onClick={() => scrollToSection("collections")}
                  className="w-full xs:w-auto bg-purple-950/90 hover:bg-purple-900 active:scale-95 text-amber-300 font-extrabold px-6 py-3.5 sm:py-4 rounded-xl shadow-purple-glow border border-purple-400/50 hover:border-amber-400 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-bag-shopping text-purple-300"></i>
                  <span>EXPLORE CATALOGUE</span>
                </button>
              </div>

              {/* Location & Store Timings */}
              <div className="text-[10px] sm:text-xs text-slate-300 flex items-center justify-center lg:justify-start gap-2 pt-0.5">
                <span>
                  <i className="fa-solid fa-location-dot text-amber-400 mr-1"></i> Attar Gali, Mumbai
                </span>
                <span>•</span>
                <span>
                  <i className="fa-solid fa-clock text-green-400 mr-1"></i> Khula Hai: 11 AM – 9:30 PM
                </span>
              </div>
            </div>

            {/* Desktop-Only Right Column Video & Photo Frame */}
            <div className="hidden lg:block lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-purple-400/40 shadow-2xl bg-purple-950 max-w-md mx-auto">
                <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group">
                  <img
                    src={
                      videoTab === "script1"
                        ? "/product/royal-violet-gold-embroidered-suit.webp"
                        : "/product/sapphire-blue-luxury-lawn-suit.webp"
                    }
                    alt="Diamond Boutique Luxury Pakistani Collection Preview"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40 flex flex-col items-center justify-center text-center p-4">
                    <button
                      onClick={() => handleOpenBooking("Featured Video Tour Inquiry")}
                      className="w-14 h-14 rounded-full gold-bg-gradient flex items-center justify-center text-slate-950 text-xl shadow-gold-glow hover:scale-110 active:scale-95 transition-all mb-2 cursor-pointer"
                    >
                      <i className="fa-solid fa-play ml-1"></i>
                    </button>
                    <span className="bg-black/75 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/40 backdrop-blur-md">
                      <i className="fa-solid fa-film text-red-400 mr-1"></i> Store Tour &amp; Premium Fabric Dekhein
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-[#150430] border-t border-purple-500/25">
                  <p className="font-serif font-bold text-xs sm:text-sm text-amber-300 text-center leading-snug">
                    {videoTab === "script1"
                      ? '"Mumbai Ki Garmi Aur Humidity Mein Breathable Luxury Lawn Ka Real Comfort!"'
                      : '"Apna Boutique Chalana Sirf Kapde Bechna Nahi Hota... Sahi Quality Aur Genuine Fitting Zaroori Hai!"'}
                  </p>
                  <p className="text-[10.5px] text-purple-200 text-center mt-1">
                    Siddiqui Coutures • Attar Gali, Mumbai
                  </p>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-white/10">
                    <button
                      onClick={() => setVideoTab("script1")}
                      className={`${
                        videoTab === "script1"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-purple-900 border border-purple-500/30 text-purple-200 hover:bg-amber-500 hover:text-slate-950"
                      } py-1.5 px-2 rounded-xl text-[11px] transition-all text-center cursor-pointer`}
                    >
                      🛍️ For Shoppers (Retail)
                    </button>
                    <button
                      onClick={() => setVideoTab("script2")}
                      className={`${
                        videoTab === "script2"
                          ? "bg-amber-500 text-slate-950 font-bold"
                          : "bg-purple-900 border border-purple-500/30 text-purple-200 hover:bg-amber-500 hover:text-slate-950"
                      } py-1.5 px-2 rounded-xl text-[11px] transition-all text-center cursor-pointer`}
                    >
                      📦 For Retailers (B2B Bulk)
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="text-center pt-1 pb-1 relative z-10">
          <button
            onClick={() => scrollToSection("collections")}
            className="text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-purple-300 hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Niche Scroll Karke Catalogue Dekhein</span>
            <i className="fa-solid fa-chevron-down animate-bounce text-[9px] text-amber-400"></i>
          </button>
        </div>
      </section>

      {/* SOCIAL PROOF & KEY TRUST METRICS STRIP */}
      <section className="bg-white py-5 sm:py-8 border-y border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:shadow-card-soft transition-all">
              <div className="text-xl sm:text-3xl font-extrabold font-serif text-purple-950 mb-0.5">100+</div>
              <div className="text-[11px] sm:text-sm font-bold text-slate-800">Retailers &amp; Boutiques</div>
              <div className="text-[9px] sm:text-[10px] text-purple-700 font-bold uppercase tracking-wider mt-0.5">
                <i className="fa-solid fa-truck-ramp-box mr-1"></i> Pan-India Wholesale
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:shadow-card-soft transition-all">
              <div className="text-xl sm:text-3xl font-extrabold font-serif text-purple-950 mb-0.5">10,000+</div>
              <div className="text-[11px] sm:text-sm font-bold text-slate-800">Happy Mumbai Clients</div>
              <div className="text-[9px] sm:text-[10px] text-purple-700 font-bold uppercase tracking-wider mt-0.5">
                <i className="fa-solid fa-heart mr-1"></i> 5-Star Reviews
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:shadow-card-soft transition-all">
              <div className="text-xl sm:text-3xl font-extrabold font-serif text-purple-950 mb-0.5">100%</div>
              <div className="text-[11px] sm:text-sm font-bold text-slate-800">Original Brands</div>
              <div className="text-[9px] sm:text-[10px] text-purple-700 font-bold uppercase tracking-wider mt-0.5">
                <i className="fa-solid fa-shield-check mr-1"></i> Guaranteed Lawn
              </div>
            </div>

            <div className="p-3 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center hover:shadow-card-soft transition-all">
              <div className="text-xl sm:text-3xl font-extrabold font-serif text-purple-950 mb-0.5">4.9 ★</div>
              <div className="text-[11px] sm:text-sm font-bold text-slate-800">Master Stitching</div>
              <div className="text-[9px] sm:text-[10px] text-purple-700 font-bold uppercase tracking-wider mt-0.5">
                <i className="fa-solid fa-scissors mr-1"></i> Perfect Fit
              </div>
            </div>
          </div>

          {/* Guarantee Ribbon */}
          <div className="mt-4 pt-3 sm:pt-4 border-t border-slate-200 flex flex-wrap justify-center items-center gap-2.5 sm:gap-8 text-slate-700 font-semibold text-[10.5px] sm:text-sm">
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-green-600"></i> No Replica / Duplicate
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-green-600"></i> Pure Breathable Fabric
            </span>
            <span className="flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-green-600"></i> Attar Gali Physical Store
            </span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE LUXURY CATALOG */}
      <section id="collections" className="py-10 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10">
            <span className="text-purple-700 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              2026 LATEST DESIGNER ARRIVALS
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Original Branded Pakistani Suits &amp; Stitching
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5">
              Dress par click karein aur full look, fabric details aur master fitting options dekhein.
            </p>
          </div>

          {/* Horizontal Pill Filters */}
          <div className="flex gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar pb-2.5 mb-5 sm:mb-8 justify-start sm:justify-center">
            {[
              { id: "all", label: "Sabhi (6)" },
              { id: "readymade", label: "👗 Ready-Made" },
              { id: "unstitched", label: "🧵 Original Lawn" },
              { id: "stitching", label: "✂️ Master Stitching" },
              { id: "wholesale", label: "📦 Wholesale Lots" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`shrink-0 text-[11px] sm:text-xs px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full border transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? "border-purple-700 bg-purple-700 text-white font-bold shadow-sm"
                    : "border-slate-300 bg-white text-slate-700 font-semibold hover:border-purple-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Product Grid (2 cols mobile, 3 cols desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setQuickviewProduct(product)}
                className="bg-white rounded-2xl overflow-hidden shadow-card-soft border border-slate-200/90 flex flex-col group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Badges */}
                  <div className="absolute top-2 left-2 right-2 flex justify-between items-start pointer-events-none">
                    <span className="bg-purple-950/90 backdrop-blur-md text-amber-300 font-extrabold text-[8px] sm:text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider border border-purple-400/40 shadow-sm">
                      {product.badge}
                    </span>
                    <span
                      className={`${product.tagClass} font-bold text-[7.5px] sm:text-[9.5px] px-1.5 py-0.5 rounded-md uppercase shadow-sm`}
                    >
                      {product.tag}
                    </span>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white/90 backdrop-blur-md text-purple-950 font-bold text-[10px] sm:text-xs px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      <i className="fa-solid fa-eye text-purple-700"></i> Full Dress Dekhein
                    </span>
                  </div>
                </div>

                <div className="p-2.5 sm:p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[9px] sm:text-[11px] font-bold text-purple-700 uppercase tracking-wider line-clamp-1">
                      {product.subtitle}
                    </div>
                    <h3 className="font-serif font-bold text-xs sm:text-base text-slate-900 mt-0.5 line-clamp-2 leading-snug group-hover:text-purple-700 transition-colors">
                      {product.title}
                    </h3>
                    <div className="mt-1.5 hidden xs:flex items-center gap-1 text-[9.5px] sm:text-xs text-slate-500 line-clamp-1">
                      <i className="fa-solid fa-circle-check text-green-600 text-[9px]"></i>
                      <span>{product.feature}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
                    <span className="text-[10px] sm:text-xs font-extrabold text-purple-900 flex items-center gap-1">
                      <i className="fa-solid fa-eye text-purple-600"></i> Details
                    </span>
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(
                        `Hi Diamond Boutique, mujhe ${product.title} order karna hai`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="bg-green-600 hover:bg-green-500 text-white font-bold p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-[10px] sm:text-xs flex items-center gap-1 shadow-sm transition-all"
                    >
                      <i className="fa-brands fa-whatsapp text-sm"></i>
                      <span className="hidden sm:inline">Order</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Catalog CTA */}
          <div className="mt-8 sm:mt-10 text-center">
            <a
              href="https://wa.me/919876543210?text=Hi%20Diamond%20Boutique,%20please%20send%20me%20your%20complete%20PDF%20catalog%20with%20prices"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl border border-purple-500/40 text-xs sm:text-sm shadow-md transition-all"
            >
              <i className="fa-solid fa-file-pdf text-red-400"></i> Full WhatsApp PDF Catalogue &amp; Price List Mangwayen →
            </a>
          </div>
        </div>
      </section>

      {/* THE BROKEN MARKET TRAP VS DIAMOND BOUTIQUE ADVANTAGE */}
      <section className="py-10 sm:py-16 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-red-400 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest bg-red-950/60 px-3 py-1 rounded-full border border-red-500/30">
              <i className="fa-solid fa-triangle-exclamation mr-1"></i> MARKET KA REAL SACH
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold mt-2">
              Aam Market Ka Dhoka vs Diamond Boutique Ka Bharosa
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm md:text-base mt-1.5">
              Kyun regular bazaar mein shopping aur tailoring dono mein log pareshan hote hain?
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {/* The Old Painful Way */}
            <div className="bg-slate-800/90 border border-red-500/30 rounded-2xl p-4 sm:p-7 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-700">
                <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-400 font-bold flex items-center justify-center text-sm">
                  ✕
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-red-300">
                  Aam Bazaar Ki Roz Ki Pareshani
                </h3>
              </div>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-xmark text-red-400 mt-1"></i>
                  <span>
                    <strong>Duplicate Saste Fabrics:</strong> Photos mein achha dikhta hai par 2 wash ke baad rang utar jaata hai aur fabric phat jaata hai.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-xmark text-red-400 mt-1"></i>
                  <span>
                    <strong>Tailor Ke Chakkar:</strong> Suit lene ke baad dusre tailor ke paas jao, hafte bhar delay aur fitting kharab kar dete hain.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-xmark text-red-400 mt-1"></i>
                  <span>
                    <strong>Resellers Ka Dead Stock:</strong> Purane out of fashion designs milte hain jisse boutique owners ka paisa atak jaata hai.
                  </span>
                </li>
              </ul>
            </div>

            {/* The Diamond Boutique Way */}
            <div className="bg-purple-950/90 border border-purple-400/40 rounded-2xl p-4 sm:p-7 space-y-3 sm:space-y-4 shadow-purple-glow">
              <div className="flex items-center gap-2.5 pb-2.5 border-b border-purple-900">
                <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-base sm:text-lg text-amber-300">
                  Diamond Boutique Ka Premium Standard
                </h3>
              </div>
              <ul className="space-y-2.5 sm:space-y-3.5 text-xs sm:text-slate-200">
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-amber-400 mt-1"></i>
                  <span>
                    <strong>100% Original Pakistani Brands:</strong> Pure luxury lawn, real silk dupattas aur authentic embroidery direct brand sources se.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-amber-400 mt-1"></i>
                  <span>
                    <strong>Counter Pe In-House Master Tailoring:</strong> Suit pasand karo aur wahin master tailor se perfect fitting karwao.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <i className="fa-solid fa-check text-amber-400 mt-1"></i>
                  <span>
                    <strong>Superfast Selling Wholesale Lots:</strong> Boutique owners ke liye daily fresh trending stock WhatsApp broadcast pe.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* B2B WHOLESALE RESELLER PORTAL & PROFIT CALCULATOR */}
      <section id="wholesale" className="py-10 sm:py-16 purple-gradient-hero text-white relative">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Reseller Pitch */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 text-[10.5px] sm:text-xs font-bold border border-purple-400/40">
                <i className="fa-solid fa-store"></i> WHOLESALE &amp; RESELLER HUB
              </div>

              <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold leading-tight">
                Apne Boutique Ya Online Business Ko Badhaiye{" "}
                <span className="gold-gradient-text">Original Pakistani Suits Ke Saath</span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                Kya aap boutique owner hain, ghar se resell karte hain, ya retail shop chalate hain? Diamond Boutique aapko dega authentic Pakistani inventory, sabse saste bulk rate tiers, aur fastest Pan-India dispatch.
              </p>

              <div className="space-y-2.5 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong>Kam Minimum Order (Low MOQ):</strong> Sirf 10 se 15 suits ke starter lot se shuruat karein.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong>Rozana WhatsApp Stock Updates:</strong> High-resolution photos &amp; video catalogues apne clients ko forward karne ke liye.
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <strong>All-India Courier &amp; Attar Gali Store Pickup:</strong> Direct shop se aakar lein ya courier se deliver karwayen.
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => handleOpenBooking("Wholesale Distributorship Portal")}
                  className="inline-flex items-center gap-2 gold-bg-gradient text-slate-950 font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-sm shadow-gold-glow hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <i className="fa-solid fa-handshake-angle text-base"></i> Apply For Direct Wholesale / Distributorship
                </button>
              </div>
            </div>

            {/* Right Column: Interactive Margin Calculator */}
            <div className="lg:col-span-5 bg-purple-950/90 border border-purple-400/40 rounded-2xl p-4 sm:p-7 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between pb-3 border-b border-purple-800">
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-lg text-amber-300">Bulk Margin Calculator</h3>
                  <p className="text-[10px] sm:text-[11px] text-purple-200">Apna retail profit check karein</p>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center text-base font-bold">
                  <i className="fa-solid fa-calculator"></i>
                </div>
              </div>

              <div className="space-y-3.5 pt-3">
                <div>
                  <label className="block text-[11px] sm:text-xs font-semibold text-slate-200 mb-1">
                    Aapka Business Model:
                  </label>
                  <select
                    value={calcBusiness}
                    onChange={(e) => setCalcBusiness(e.target.value)}
                    className="w-full bg-purple-900 border border-purple-400/40 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-300"
                  >
                    <option value="retailer">Local Retail Cloth Shop</option>
                    <option value="home_boutique">Home Boutique Owner / Tailor</option>
                    <option value="reseller">Online Instagram / WhatsApp Reseller</option>
                  </select>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-200 mb-1.5">
                    <span>Kitne Suits Chahiye (Volume):</span>
                    <span className="text-amber-400 font-extrabold text-xs sm:text-sm">{calcQty} Suits</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={calcQty}
                    onChange={(e) => setCalcQty(parseInt(e.target.value, 10))}
                    className="w-full accent-purple-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9.5px] text-purple-300 mt-0.5">
                    <span>10 Suits (Trial)</span>
                    <span>150 Suits (Mega Lot)</span>
                  </div>
                </div>

                {/* Calculation Output Widget */}
                <div className="bg-[#150430] p-3 sm:p-4 rounded-xl border border-purple-500/30 text-center space-y-1">
                  <div className="text-[10.5px] sm:text-[11px] font-semibold text-slate-300">
                    Aapka Estimated Net Munafa (Profit):
                  </div>
                  <div className="font-serif text-xl sm:text-3xl font-extrabold text-amber-400">
                    {formatCurrency(minProfit)} – {formatCurrency(maxProfit)}
                  </div>
                  <div className="text-[9px] sm:text-[10px] text-purple-300 font-medium">
                    *Based on average Mumbai retail margin of ₹600–₹900 per suit
                  </div>
                </div>

                <button
                  onClick={() => handleOpenBooking("Wholesale Calculator Quotation")}
                  className="w-full gold-bg-gradient text-slate-950 font-bold py-3 rounded-xl text-[11px] sm:text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
                >
                  Wholesale Rate Card &amp; Samples Mangwayen
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE 4-STEP PROCESS */}
      <section id="process" className="py-10 sm:py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-purple-700 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              BILKUL EASY &amp; SIMPLE
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Shopping &amp; Custom Stitching Kaise Kaam Karta Hai?
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5">
              Original suit select karne se lekar perfect fitting tak bas 4 aasan steps.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center group hover:border-purple-600 transition-all">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-900 text-amber-300 font-bold text-sm sm:text-lg flex items-center justify-center mx-auto mb-2 sm:mb-3.5 group-hover:scale-110 transition-transform">
                1
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-slate-900 mb-1">Shop Visit Ya Contact</h3>
              <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed">
                Attar Gali store pe aaiye ya video catalogue dekhein.
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center group hover:border-purple-600 transition-all">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-900 text-amber-300 font-bold text-sm sm:text-lg flex items-center justify-center mx-auto mb-2 sm:mb-3.5 group-hover:scale-110 transition-transform">
                2
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-slate-900 mb-1">Design Pasand Karein</h3>
              <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed">
                Ready-made, pure lawn ya silk dupattas select karein.
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center group hover:border-purple-600 transition-all">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-purple-900 text-amber-300 font-bold text-sm sm:text-lg flex items-center justify-center mx-auto mb-2 sm:mb-3.5 group-hover:scale-110 transition-transform">
                3
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-slate-900 mb-1">Master Stitching</h3>
              <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed">
                In-house master tailor se perfect fitting karwayen.
              </p>
            </div>

            <div className="bg-white p-3.5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative text-center group hover:border-purple-600 transition-all">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full gold-bg-gradient text-slate-950 font-bold text-sm sm:text-lg flex items-center justify-center mx-auto mb-2 sm:mb-3.5 group-hover:scale-110 transition-transform">
                4
              </div>
              <h3 className="font-serif font-bold text-xs sm:text-base text-slate-900 mb-1">Flawless Delivery</h3>
              <p className="text-[10.5px] sm:text-xs text-slate-600 leading-relaxed">
                Shop se collect karein ya courier delivery paayein.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED CUSTOMER TESTIMONIALS */}
      <section id="reviews" className="py-10 sm:py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-purple-700 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              CUSTOMER FEEDBACK
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Shoppers Aur Resellers Ka Bharosa
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5">
              Kyun log Diamond Boutique aur Siddiqui Coutures ko 4.9 rating dete hain?
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-2 sm:mb-3">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;Pehle Crawford Market se suit leke Bandra ke tailors ke chakkar kaatne padte the. Diamond Boutique ne sab solve kar diya! Fabric 100% original lawn hai aur master tailor ne pehle trial me hi perfect fitting bana di.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-900 text-amber-300 font-bold flex items-center justify-center text-xs">
                  AK
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Ayesha Khan</div>
                  <div className="text-[10px] text-slate-500">Retail Shopper • Bandra, Mumbai</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-2 sm:mb-3">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;Hum Pune me online boutique chalate hain aur 1 saal se bulk lots mangwa rahe hain. Inke wholesale rates se hume achha margin milta hai aur video catalogue forward karke sell karna bohot aasan ho jata hai!&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-600 text-slate-950 font-bold flex items-center justify-center text-xs">
                  RS
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Rukhsar Shaikh</div>
                  <div className="text-[10px] text-slate-500">Boutique Owner • Pune Reseller</div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 text-xs mb-2 sm:mb-3">
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                  <i className="fa-solid fa-star"></i>
                </div>
                <p className="text-slate-700 text-xs sm:text-sm italic leading-relaxed">
                  &ldquo;Mumbai ki garmi aur humidity me aisa breathable lawn milna bohot mushkil hota hai jo colour na chhodhe. Inke original suits ka fall aur look bilkul royal aata hai. Eid aur weddings ke liye best choice hai.&rdquo;
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-slate-200">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-purple-950 text-amber-400 font-bold flex items-center justify-center text-xs">
                  FA
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Fatima Ansari</div>
                  <div className="text-[10px] text-slate-500">Festive Shopper • South Mumbai</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PHYSICAL STORE LOCATION & VISITING HUB */}
      <section id="location" className="py-10 sm:py-16 bg-slate-100">
        <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
            <span className="text-purple-700 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              DUKAAN PE DIRECT AAO
            </span>
            <h2 className="font-serif text-xl sm:text-3xl md:text-4xl font-bold text-slate-900 mt-2">
              Attar Gali, Mumbai Store Pe Visit Karein
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm md:text-base mt-1.5">
              Fabric ko haath lagakar quality dekhein, aur master tailor se apna naap karwayen.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center bg-white p-4 sm:p-8 rounded-3xl border border-slate-200 shadow-card-soft">
            {/* Address & Actions */}
            <div className="lg:col-span-6 space-y-4 sm:space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-purple-950 text-amber-400 flex items-center justify-center text-lg sm:text-xl shrink-0 shadow-md">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base sm:text-xl text-slate-900">
                    Diamond Boutique / Siddiqui Coutures
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    54/56, Shop No. 2, Ground Floor, Khatija Bai Building,
                    <br />
                    Next to Doctor Iqbal Lodhia, Kambekar Street,
                    <br />
                    Attar Gali, Mumbai – 400003, Maharashtra, India.
                  </p>
                  <button
                    onClick={copyStoreAddress}
                    className="mt-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <i className="fa-solid fa-copy text-amber-600"></i> Address Copy Karein
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-0.5 flex items-center gap-1.5">
                    <i className="fa-solid fa-clock text-amber-600"></i> Dukan Ki Timings
                  </div>
                  <div className="text-xs text-slate-600">
                    Mon – Sat: 11:00 AM – 9:30 PM
                    <br />
                    <span className="text-green-700 font-semibold">🟢 Aaj Khula Hai</span>
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="text-xs font-bold text-slate-900 mb-0.5 flex items-center gap-1.5">
                    <i className="fa-solid fa-phone text-amber-600"></i> Direct Phone Line
                  </div>
                  <div className="text-xs text-slate-600 font-medium">
                    +91 98765 43210
                    <br />
                    +91 98200 12345
                  </div>
                </div>
              </div>

              {/* Direction CTAs */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href="https://maps.google.com/?q=Attar+Gali+Mumbai+Diamond+Boutique"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-bg-gradient text-slate-950 font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-map-location-dot"></i> Google Maps Me Rasta Dekhein
                </a>
                <button
                  onClick={() => handleOpenBooking("VIP Store Appointment")}
                  className="bg-purple-950 hover:bg-purple-900 text-white font-bold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 border border-purple-400/30 cursor-pointer"
                >
                  <i className="fa-solid fa-calendar-check text-amber-400"></i> VIP Shop Visit Book Karein
                </button>
              </div>
            </div>

            {/* Google Map Embed Container */}
            <div className="lg:col-span-6 rounded-2xl overflow-hidden border border-slate-300 shadow-inner h-64 sm:h-80 bg-slate-100 relative">
              <iframe
                title="Diamond Boutique Attar Gali Mumbai Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.71971775704!2d72.8315!3d18.9550!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTjCsDU3JzE4LjAiTiA3MsKwNDknNTMuNCJF!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section id="faq" className="py-10 sm:py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-3.5 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-10">
            <span className="text-purple-700 font-extrabold text-[10px] sm:text-[11px] uppercase tracking-widest bg-purple-100 px-3 py-1 rounded-full border border-purple-200">
              SAWAL &amp; JAWAB
            </span>
            <h2 className="font-serif text-xl sm:text-3xl font-bold text-slate-900 mt-2">
              Aapke Sawal, Hamare Jawab
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {[
              {
                q: "1. Kya aapke paas 100% original branded Pakistani suits milte hain?",
                a: "Haan bilkul 100% genuine! Hum official distributors aur direct brand networks se stock laate hain. Har lawn, silk dupatta aur embroidery patch authentic aur heavy density fabric ka hota hai. Zero duplicate guarantee.",
              },
              {
                q: "2. Kya main dukan pe hi custom stitching karwa sakti hoon?",
                a: "Haan! Siddiqui Coutures ke in-house master tailors dukan pe hi available hote hain. Aap unstitched suit select karein aur turant neck design, lace attachment, inner lining aur perfect fitting ke liye naap de sakte hain.",
              },
              {
                q: "3. Resellers aur shops ke liye wholesale order kaise hota hai?",
                a: "Hum all-India boutique owners aur online resellers ko low MOQ (sirf 10–15 suits) se supply karte hain. Hamare distributor desk se connect karke rozana PDF catalogue, set-wise rate list aur bulk transport facility le sakte hain.",
              },
              {
                q: "4. Agar hum Mumbai ke bahar rehte hain toh kaise order karein?",
                a: "Aap WhatsApp video call ya digital catalogue se suits pasand kar sakte hain. Hum express courier tracking ke saath safe packing karke poore Bharat me delivery dete hain.",
              },
            ].map((faq, index) => (
              <div key={index} className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-3.5 sm:p-5 text-left font-serif font-bold text-xs sm:text-base text-slate-900 flex justify-between items-center cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <i
                    className={`fa-solid fa-chevron-down text-purple-600 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  ></i>
                </button>
                {openFaq === index && (
                  <div className="p-3.5 sm:p-5 pt-0 text-xs sm:text-sm text-slate-600 border-t border-slate-200 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Final High-Converting Banner */}
          <div className="mt-10 sm:mt-12 purple-gradient-hero rounded-3xl p-5 sm:p-10 text-center text-white border-2 border-purple-400/40 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-3 sm:space-y-4">
              <span className="bg-amber-500 text-slate-950 font-extrabold text-[9.5px] sm:text-xs px-3.5 py-1 rounded-full uppercase tracking-widest">
                SHOPPING YA RESELLING START KAREIN
              </span>
              <h2 className="font-serif text-xl sm:text-3xl font-extrabold text-white">
                Apna Wardrobe Upgrade Karein Ya Apna Boutique Grow Karein
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm">
                Niche diye button par click karein aur direct VIP store appointment ya distributorship quotation paayein!
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-2.5 pt-1.5">
                <button
                  onClick={() => handleOpenBooking("Final Banner VIP Visit")}
                  className="gold-bg-gradient text-slate-950 font-extrabold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl shadow-gold-glow hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-calendar-check"></i> BOOK STORE VISIT NOW
                </button>
                <button
                  onClick={() => handleOpenBooking("Final Banner Distributor Application")}
                  className="bg-purple-900/90 hover:bg-purple-850 text-white font-extrabold px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl shadow-lg border border-purple-400/50 hover:border-amber-400 active:scale-95 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <i className="fa-solid fa-handshake text-amber-400"></i> APPLY FOR DISTRIBUTORSHIP
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LUXURY MIDNIGHT PURPLE FOOTER */}
      <footer className="bg-[#12032b] text-slate-300 py-10 sm:py-12 border-t-2 border-purple-900/80 text-xs relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 sm:gap-8 mb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5 text-white font-serif font-bold text-base sm:text-lg">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-amber-400 flex items-center justify-center text-white text-sm shadow-md">
                <i className="fa-solid fa-gem"></i>
              </div>
              <span className="tracking-wide text-white">DIAMOND BOUTIQUE</span>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              Siddiqui Coutures — Mumbai&apos;s premier hub for 100% original Pakistani suits, luxury unstitched lawn, in-house master tailoring, and pan-India B2B wholesale supply in Attar Gali.
            </p>
            <div className="flex items-center gap-3 pt-1 text-amber-400 text-sm">
              <span className="inline-flex items-center gap-1.5 text-xs text-purple-200 bg-purple-950 px-2.5 py-1 rounded-lg border border-purple-800">
                <i className="fa-solid fa-shield-check text-amber-400"></i> Verified Wholesaler
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 text-amber-300 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li>
                <button
                  onClick={() => scrollToSection("hero")}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <i className="fa-solid fa-chevron-right text-[9px] text-purple-400"></i> Home &amp; Video Tour
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("collections")}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <i className="fa-solid fa-chevron-right text-[9px] text-purple-400"></i> Collections Catalogue
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("wholesale")}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <i className="fa-solid fa-chevron-right text-[9px] text-purple-400"></i> B2B Wholesale Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("location")}
                  className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer text-left"
                >
                  <i className="fa-solid fa-chevron-right text-[9px] text-purple-400"></i> Attar Gali Store Directions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 text-amber-300 uppercase tracking-wider">
              Our Services
            </h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-[10px] text-purple-400"></i> 100% Original Pakistani Lawn
              </li>
              <li className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-[10px] text-purple-400"></i> Ready-Made Partywear Outfits
              </li>
              <li className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-[10px] text-purple-400"></i> In-House Master Stitching &amp; Fitting
              </li>
              <li className="flex items-center gap-1.5">
                <i className="fa-solid fa-check text-[10px] text-purple-400"></i> Pan-India Reseller Wholesale Lots
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-bold text-white text-sm mb-3 text-amber-300 uppercase tracking-wider">
              Visit Attar Gali Store
            </h4>
            <p className="leading-relaxed text-slate-300 text-xs">
              54/56, Shop No. 2, Ground Floor, Khatija Bai Bldg, Kambekar Street, Attar Gali, Mumbai – 400003.
            </p>
            <div className="mt-3 pt-2 border-t border-purple-900/60 space-y-1">
              <p className="text-amber-300 font-bold text-xs">
                <i className="fa-solid fa-phone text-amber-400 mr-1.5"></i> +91 98765 43210
              </p>
              <p className="text-purple-300 text-[11px]">
                <i className="fa-solid fa-clock mr-1.5 text-purple-400"></i> Mon–Sat: 11:00 AM – 9:30 PM
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-5 border-t border-purple-900 text-center flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-slate-400">
          <div>© 2026 Diamond Boutique (Siddiqui Coutures). All Rights Reserved.</div>
          <div className="text-amber-400/90 font-medium">Attar Gali, Mumbai Fashion District</div>
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Diamond%20Boutique,%20mujhe%20Pakistani%20Suits%20ke%20designs%20aur%20prices%20jaanne%20hain"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white w-12 h-12 sm:w-14 sm:h-14 p-3 rounded-full flex items-center justify-center text-xl sm:text-3xl shadow-2xl z-40 hover:scale-110 active:scale-95 transition-all"
        title="WhatsApp Support"
      >
        <i className="fa-brands fa-whatsapp"></i>
      </a>

      {/* QUICKVIEW FULL DRESS MODAL */}
      {quickviewProduct && (
        <div
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setQuickviewProduct(null)}
        >
          <div
            className="bg-white rounded-t-3xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden shadow-2xl border border-slate-200 relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Modal Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-3.5 border-b border-slate-100 bg-white sticky top-0 z-20">
              <div className="flex items-center gap-2">
                <span className="bg-purple-100 text-purple-900 font-extrabold text-[9.5px] sm:text-[10.5px] px-2.5 py-0.5 rounded-full uppercase border border-purple-200">
                  {quickviewProduct.badge}
                </span>
                <span className="text-[10px] text-green-700 font-bold hidden xs:inline">
                  <i className="fa-solid fa-circle-check"></i> In-Stock Attar Gali
                </span>
              </div>
              <button
                onClick={() => setQuickviewProduct(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-sm"></i>
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-4 sm:p-6 grid sm:grid-cols-12 gap-5 items-start">
              {/* Left Column: Image */}
              <div className="sm:col-span-6 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group relative aspect-[4/5] sm:aspect-square">
                <img
                  src={quickviewProduct.img}
                  alt={quickviewProduct.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-md text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                  <i className="fa-solid fa-magnifying-glass-plus mr-1 text-amber-400"></i> Full 3-Piece Look
                </div>
              </div>

              {/* Right Column: Dress Specifications */}
              <div className="sm:col-span-6 space-y-3.5 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-purple-700 uppercase tracking-wider">
                    {quickviewProduct.category}
                  </div>
                  <h3 className="font-serif font-bold text-base sm:text-xl text-slate-900 mt-0.5 leading-snug">
                    {quickviewProduct.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{quickviewProduct.desc}</p>

                  {/* Specifications Box */}
                  <div className="mt-3.5 p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs space-y-1.5">
                    <div className="font-bold text-purple-950 text-[11px] border-b border-purple-200/60 pb-1 mb-1 flex items-center gap-1.5">
                      <i className="fa-solid fa-gem text-amber-600"></i> Fabric &amp; Design Specs:
                    </div>
                    <div className="text-slate-700 text-[11px] flex items-start gap-1.5">
                      <span className="font-semibold text-purple-900 shrink-0">🧵 Fabric:</span>
                      <span>{quickviewProduct.fabric}</span>
                    </div>
                    <div className="text-slate-700 text-[11px] flex items-start gap-1.5">
                      <span className="font-semibold text-purple-900 shrink-0">🌸 Dupatta:</span>
                      <span>{quickviewProduct.dupatta}</span>
                    </div>
                    <div className="text-slate-700 text-[11px] flex items-start gap-1.5">
                      <span className="font-semibold text-purple-900 shrink-0">👖 Bottom:</span>
                      <span>{quickviewProduct.bottom}</span>
                    </div>
                    <div className="text-slate-700 text-[11px] flex items-start gap-1.5">
                      <span className="font-semibold text-purple-900 shrink-0">✂️ Fitting:</span>
                      <span>{quickviewProduct.stitching}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Order CTAs */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  <a
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(
                      `Hi Diamond Boutique,\nMujhe is suit ke baare mein order/inquire karna hai:\n*${quickviewProduct.title}*\nPhoto: ${quickviewProduct.img}\nDetails send karein.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-600 hover:bg-green-500 active:scale-95 text-white font-extrabold py-3 rounded-xl text-xs text-center flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <i className="fa-brands fa-whatsapp text-base"></i> Direct WhatsApp Pe Order Karein
                  </a>
                  <button
                    onClick={() => {
                      setQuickviewProduct(null);
                      handleOpenBooking("Full Dress Fitting Booking");
                    }}
                    className="w-full bg-purple-950 hover:bg-purple-900 text-amber-300 font-bold py-2.5 rounded-xl text-xs text-center transition-all flex items-center justify-center gap-1.5 border border-purple-400/30 cursor-pointer"
                  >
                    <i className="fa-solid fa-calendar-check text-[11px]"></i> Shop Pe Trial / Fitting Book Karein
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking & Survey Modal */}
      <BookingModal
        isOpen={bookingConfig.isOpen}
        onClose={handleCloseBooking}
        initialStep={bookingConfig.step}
        initialLeadId={bookingConfig.leadId}
        initialCreatedDate={bookingConfig.createdDate}
        campaignName={bookingConfig.campaignName || "diamond_boutique"}
      />
    </div>
  );
}
