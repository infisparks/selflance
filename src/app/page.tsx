"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { event as fbEvent, customEvent as fbCustomEvent, getPreservedQueryString } from "@/lib/fpixel";
import { SelflanceHeader } from "@/components/selflance/SelflanceHeader";
import { SelflanceHero } from "@/components/selflance/SelflanceHero";
import { GrowthBottleneckSection } from "@/components/selflance/GrowthBottleneckSection";
import { GrowthPartnerSection } from "@/components/selflance/GrowthPartnerSection";
import { WhatWeBuildSection } from "@/components/selflance/WhatWeBuildSection";
import { PortfolioShowcaseSection } from "@/components/selflance/PortfolioShowcaseSection";
import { SituationCheckSection } from "@/components/selflance/SituationCheckSection";
import { TargetAudienceSection } from "@/components/selflance/TargetAudienceSection";
import { DeliverablesSection } from "@/components/selflance/DeliverablesSection";
import { WhyChooseUsSection } from "@/components/selflance/WhyChooseUsSection";
import { DevelopmentProcessSection } from "@/components/selflance/DevelopmentProcessSection";
import { BeforeYouBookSection } from "@/components/selflance/BeforeYouBookSection";
import { SelflanceFinalCTA } from "@/components/selflance/SelflanceFinalCTA";
import { StickyMobileCTA } from "@/components/StickyMobileCTA";
import { FloatingWhatsAppCTA } from "@/components/FloatingWhatsAppCTA";
import { BookingModal } from "@/components/BookingModal";
import { VideoModal } from "@/components/VideoModal";

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

  const [videoModal, setVideoModal] = useState<{
    isOpen: boolean;
    title: string;
    author: string;
    embedId?: string;
  }>({
    isOpen: false,
    title: "",
    author: "",
    embedId: undefined,
  });

  // Dispatch PageView via Node.js CAPI
  useEffect(() => {
    if (typeof window === "undefined") return;

    const serverUrl = (process.env.NEXT_PUBLIC_WHATSAPP_SERVER_URL || "https://self.infiplus.in").replace(/\/$/, "");
    const params = new URLSearchParams(window.location.search);
    const testCode = params.get("test_event_code") || params.get("fbtest") || undefined;

    fetch(`${serverUrl}/api/whatsapp/capi-event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "PageView",
        eventSourceUrl: window.location.href,
        testEventCode: testCode,
      }),
    }).catch((err) => console.error("Async CAPI PageView trigger error:", err));
  }, []);

  const handleOpenBooking = useCallback(() => {
    if (typeof window !== "undefined") {
      const preserved = getPreservedQueryString();
      window.history.replaceState({}, "", window.location.pathname + preserved);
    }

    fbEvent("Lead", {
      content_name: "CTA Button Click",
      currency: isUS ? "USD" : "INR",
      value: 0,
    });
    fbCustomEvent("ButtonClick", {
      button_name: "Book Strategy Session CTA",
    });

    setBookingConfig({
      isOpen: true,
      step: 1,
      leadId: null,
      createdDate: null,
      campaignName: null,
    });
  }, [isUS]);

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

  const handleOpenVideo = useCallback(() => {
    setVideoModal({
      isOpen: true,
      title: "Selflance Digital Growth Engine",
      author: "Selflance Technology Team",
      embedId: "Otgmq0_YlnQ",
    });
  }, []);

  const handleCloseVideo = useCallback(() => {
    setVideoModal({
      isOpen: false,
      title: "",
      author: "",
      embedId: undefined,
    });
  }, []);

  return (
    <div className="w-full text-white bg-[#0B1121] min-h-screen antialiased selection:bg-[#df7626] selection:text-white relative overflow-x-hidden">
      {/* URL Parameter Direct Link & Country Handler */}
      <Suspense fallback={null}>
        <URLParamsHandler
          onConfigureBooking={handleConfigureBooking}
          onCountryChange={handleCountryChange}
        />
      </Suspense>

      {/* Fixed Navigation Header with CTA */}
      <SelflanceHeader onBookClick={handleOpenBooking} />

      {/* Section 1: Hero Section */}
      <SelflanceHero
        isUS={isUS}
        onBookClick={handleOpenBooking}
        onVideoClick={handleOpenVideo}
      />

      {/* Section 2: The Growth Bottleneck */}
      <GrowthBottleneckSection isUS={isUS} />

      {/* Section 3: Technology Growth Partner / Our Philosophy */}
      <GrowthPartnerSection isUS={isUS} />

      {/* Section 4: What We Build */}
      <WhatWeBuildSection />

      {/* Section 4.5: Featured Portfolio & Design Showcase */}
      <PortfolioShowcaseSection />

      {/* Section 5: Company Situation Check */}
      <SituationCheckSection isUS={isUS} />

      {/* Section 6: Target Audience Fit */}
      <TargetAudienceSection isUS={isUS} />

      {/* Section 7: Strategy Session Deliverables */}
      <DeliverablesSection isUS={isUS} />

      {/* Section 8: Why Businesses Choose Selflance */}
      <WhyChooseUsSection isUS={isUS} />

      {/* Section 9: Our Development Process */}
      <DevelopmentProcessSection />

      {/* Section 10: Before You Book Notice */}
      <BeforeYouBookSection isUS={isUS} />

      {/* Section 11: Final CTA Banner & Footer */}
      <SelflanceFinalCTA isUS={isUS} onBookClick={handleOpenBooking} />

      {/* Fixed Floating CTA Bar (Appears upon scroll) */}
      <StickyMobileCTA onBookClick={handleOpenBooking} />

      {/* Fixed Floating WhatsApp CTA Button (918850448767) */}
      <FloatingWhatsAppCTA />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingConfig.isOpen}
        onClose={handleCloseBooking}
        initialStep={bookingConfig.step}
        initialLeadId={bookingConfig.leadId}
        initialCreatedDate={bookingConfig.createdDate}
        campaignName={bookingConfig.campaignName || "selflance"}
      />

      {/* Video Modal */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={handleCloseVideo}
        title={videoModal.title}
        author={videoModal.author}
        embedId={videoModal.embedId}
        onBookClick={handleOpenBooking}
      />
    </div>
  );
}
