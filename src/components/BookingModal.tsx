"use client";

import React, { useState, useEffect } from "react";
import {
  saveOrUpdateLead,
  findExistingLead,
  checkExistingLeadByEmailOrPhone,
  sanitizeEmailToId,
  getBookedSlotsForDate,
  sanitizeSlotKey,
  LeadData,
} from "@/lib/firebase";
import { getCampaignConfig, DEFAULT_CAMPAIGN_ID } from "@/config/campaigns";
import { event as fbEvent, customEvent as fbCustomEvent, getPreservedQueryString } from "@/lib/fpixel";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: 1 | 2 | 3 | 4;
  initialLeadId?: string | null;
  initialCreatedDate?: string | null;
  campaignName?: string;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Exact 8 daily time slots
const DAILY_TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "02:00 PM",
  "03:00 PM",
  "07:00 PM",
  "09:00 PM",
];

export function isSlotTimePassed(
  timeStr: string,
  day: number,
  month: number,
  year: number
): boolean {
  const now = new Date();

  if (year < now.getFullYear()) return true;
  if (year === now.getFullYear() && month < now.getMonth()) return true;
  if (year === now.getFullYear() && month === now.getMonth() && day < now.getDate()) return true;
  if (year > now.getFullYear() || month > now.getMonth() || day > now.getDate()) return false;

  const match = timeStr.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return false;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours < 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  const slotDate = new Date(year, month, day, hours, minutes, 0, 0);
  return slotDate.getTime() <= now.getTime();
}

export function BookingModal({
  isOpen,
  onClose,
  initialStep = 1,
  initialLeadId = null,
  initialCreatedDate = null,
  campaignName = DEFAULT_CAMPAIGN_ID,
}: BookingModalProps) {
  const activeCampaign = getCampaignConfig(campaignName);

  const [step, setStep] = useState<1 | 2 | 3 | 4>(initialStep);
  const [isReselectingSlot, setIsReselectingSlot] = useState<boolean>(false);
  const [showAlreadySubmittedPopup, setShowAlreadySubmittedPopup] = useState<boolean>(false);
  const [firebaseLeadId, setFirebaseLeadId] = useState<string | null>(initialLeadId);
  const [createdDate, setCreatedDate] = useState<string | null>(initialCreatedDate);

  const [contactInfo, setContactInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
    countryCode: "+91",
  });

  const [emailError, setEmailError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [isSubmittingStep1, setIsSubmittingStep1] = useState<boolean>(false);
  const [hasRestoredLead, setHasRestoredLead] = useState<boolean>(false);
  const [qAnswers, setQAnswers] = useState<Record<string, string>>({});
  const [activeQIndex, setActiveQIndex] = useState<number>(0);

  const realToday = new Date();
  const realTodayYear = realToday.getFullYear();
  const realTodayMonth = realToday.getMonth();
  const realTodayDay = realToday.getDate();

  const [currentYear, setCurrentYear] = useState<number>(realTodayYear);
  const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(realTodayMonth);
  const [selectedDay, setSelectedDay] = useState<number>(realTodayDay);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [bookedSlotsMap, setBookedSlotsMap] = useState<Record<string, boolean>>({});
  const [generatedMeetUrl, setGeneratedMeetUrl] = useState<string | null>(null);

  // Sync initialStep & dynamic countryCode default (+1 if c=us or country=us)
  useEffect(() => {
    if (isOpen) {
      if (initialStep && !isReselectingSlot && !hasRestoredLead) setStep(initialStep);
      if (initialLeadId) setFirebaseLeadId(initialLeadId);
      if (initialCreatedDate) setCreatedDate(initialCreatedDate);

      if (typeof window !== "undefined") {
        const params = new URLSearchParams(window.location.search);
        const country = (params.get("c") || params.get("country") || "").toLowerCase();
        if (country === "us") {
          setContactInfo((prev) => ({ ...prev, countryCode: "+1" }));
        }
      }
    } else {
      setHasRestoredLead(false);
    }
  }, [isOpen, initialStep, initialLeadId, initialCreatedDate, isReselectingSlot, hasRestoredLead]);

  // Sync URL path when step changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    const preservedQuery = getPreservedQueryString();

    if (!isOpen) {
      if (window.location.pathname !== "/") {
        window.history.replaceState({}, "", "/" + preservedQuery);
      }
      return;
    }

    let targetPath = "/form";
    if (step === 1) targetPath = "/form";
    else if (step === 2) targetPath = "/survey";
    else if (step === 3) targetPath = "/meeting";
    else if (step === 4) targetPath = "/success";

    if (window.location.pathname !== targetPath) {
      window.history.replaceState({}, "", targetPath + preservedQuery);
      if (typeof window.fbq === "function") {
        window.fbq("track", "PageView");
      }
    }
  }, [isOpen, step]);

  // Lead restoration logic
  useEffect(() => {
    async function restoreLead() {
      if (!isOpen || step === 4 || hasRestoredLead) return;

      const targetId = initialLeadId || (typeof window !== "undefined" ? localStorage.getItem("firstoption_lead_id") : null);
      const targetDate = initialCreatedDate || (typeof window !== "undefined" ? localStorage.getItem("firstoption_created_date") : null);

      let foundContact = false;
      let leadStatus: "partial" | "survey_completed" | "completed" | null = null;
      let hasSurvey = false;
      let hasMeeting = false;

      if (targetId) {
        const existingMatch = await findExistingLead(targetId, targetDate, activeCampaign.id);
        if (existingMatch && existingMatch.lead) {
          const fbLead = existingMatch.lead;
          setFirebaseLeadId(targetId);
          setCreatedDate(existingMatch.createdDate);
          if (fbLead.fullName && fbLead.phone) {
            setContactInfo({
              fullName: fbLead.fullName || "",
              email: fbLead.email || "",
              phone: fbLead.phone || "",
              countryCode: fbLead.countryCode || "+91",
            });
            if (fbLead.survey && Object.keys(fbLead.survey).length > 0) {
              setQAnswers(fbLead.survey as Record<string, string>);
              hasSurvey = true;
            }
            if (fbLead.meeting?.meetingDate && fbLead.meeting?.meetingTime) {
              setSelectedTimeSlot(fbLead.meeting.meetingTime);
              const parts = fbLead.meeting.meetingDate.split("-");
              if (parts.length === 3) {
                const y = parseInt(parts[0], 10);
                const m = parseInt(parts[1], 10) - 1;
                const d = parseInt(parts[2], 10);
                if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
                  setCurrentYear(y);
                  setCurrentMonthIndex(m);
                  setSelectedDay(d);
                }
              }
              hasMeeting = true;
            }

            leadStatus = fbLead.status || (hasMeeting ? "completed" : hasSurvey ? "survey_completed" : "partial");
            foundContact = true;
          }
        }
      }

      if (typeof window !== "undefined" && !foundContact) {
        try {
          const savedContact = localStorage.getItem("firstoption_user_contact");
          if (savedContact) {
            const parsed = JSON.parse(savedContact);
            if (parsed.fullName && parsed.phone) {
              setContactInfo({
                fullName: parsed.fullName || "",
                email: parsed.email || "",
                phone: parsed.phone || "",
                countryCode: parsed.countryCode || "+91",
              });
              foundContact = true;
            }
          }
        } catch (e) {
          console.error("LocalStorage restore error:", e);
        }
      }

      if (!foundContact && (initialStep === 2 || initialStep === 3)) {
        setStep(1);
        setShowAlreadySubmittedPopup(false);
        setHasRestoredLead(true);
        return;
      }

      if (foundContact && !isReselectingSlot) {
        if (hasMeeting || leadStatus === "completed") {
          if (initialStep === 1) {
            setShowAlreadySubmittedPopup(true);
          } else if (initialStep === 3 || initialStep === 4) {
            setStep(4);
            setShowAlreadySubmittedPopup(false);
          }
        } else if (hasSurvey || leadStatus === "survey_completed") {
          setShowAlreadySubmittedPopup(false);
          setStep(3);
        } else {
          setShowAlreadySubmittedPopup(false);
          setStep(2);
        }
      }

      setHasRestoredLead(true);
    }

    restoreLead();
  }, [isOpen, initialStep, initialLeadId, initialCreatedDate, activeCampaign.id, isReselectingSlot, hasRestoredLead]);

  // Calendar slot auto advance
  const [hasAutoAdvancedDate, setHasAutoAdvancedDate] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setHasAutoAdvancedDate(false);
      return;
    }

    if (step === 3 && !hasAutoAdvancedDate) {
      async function autoAdvanceToFirstAvailableDate() {
        const start = new Date();
        let checkDate = new Date(start);

        for (let i = 0; i < 30; i++) {
          const year = checkDate.getFullYear();
          const monthIndex = checkDate.getMonth();
          const day = checkDate.getDate();

          const formattedMonth = (monthIndex + 1).toString().padStart(2, "0");
          const formattedDay = day.toString().padStart(2, "0");
          const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

          const bookedMap = await getBookedSlotsForDate(dateStr, activeCampaign.id);

          if (!bookedMap["_blockedDate"]) {
            const hasAvailableSlot = DAILY_TIME_SLOTS.some((timeStr) => {
              const isPassed = isSlotTimePassed(timeStr, day, monthIndex, year);
              const slotKey = sanitizeSlotKey(timeStr);
              const isBooked = bookedMap[slotKey] === true;
              return !isPassed && !isBooked;
            });

            if (hasAvailableSlot) {
              setCurrentYear(year);
              setCurrentMonthIndex(monthIndex);
              setSelectedDay(day);
              setBookedSlotsMap(bookedMap);
              setHasAutoAdvancedDate(true);
              return;
            }
          }

          checkDate.setDate(checkDate.getDate() + 1);
        }

        setHasAutoAdvancedDate(true);
      }

      autoAdvanceToFirstAvailableDate();
    }
  }, [isOpen, step, activeCampaign.id, hasAutoAdvancedDate]);

  useEffect(() => {
    async function fetchSlots() {
      if (!isOpen || step !== 3) return;

      const formattedMonth = (currentMonthIndex + 1).toString().padStart(2, "0");
      const formattedDay = selectedDay.toString().padStart(2, "0");
      const appointmentDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;

      const bookedMap = await getBookedSlotsForDate(appointmentDateStr, activeCampaign.id);
      setBookedSlotsMap(bookedMap);
    }

    fetchSlots();
  }, [isOpen, step, selectedDay, currentMonthIndex, currentYear, activeCampaign.id]);

  const handleEmailBlur = async () => {
    if (contactInfo.email && contactInfo.email.includes("@")) {
      const res = await checkExistingLeadByEmailOrPhone(contactInfo.email, "", activeCampaign.id);
      if (res.emailExists) {
        setEmailError("Email already entered");
      }
    }
  };

  const handlePhoneBlur = async () => {
    const cleanPhone = contactInfo.phone.replace(/\D/g, "");
    if (cleanPhone.length === 10) {
      const res = await checkExistingLeadByEmailOrPhone("", cleanPhone, activeCampaign.id);
      if (res.phoneExists) {
        setPhoneError("Number already used");
      }
    }
  };

  if (!isOpen) return null;

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError(null);
    setPhoneError(null);

    const cleanPhone = contactInfo.phone.replace(/\D/g, "");
    let hasInputError = false;

    if (!contactInfo.email || !contactInfo.email.includes("@")) {
      setEmailError("Please enter a valid email address");
      hasInputError = true;
    }

    if (cleanPhone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit phone number");
      hasInputError = true;
    }

    if (hasInputError) return;

    setIsSubmittingStep1(true);

    try {
      const checkRes = await checkExistingLeadByEmailOrPhone(
        contactInfo.email,
        cleanPhone,
        activeCampaign.id
      );

      let isDuplicate = false;

      if (checkRes.emailExists) {
        setEmailError("Email already entered");
        isDuplicate = true;
      }

      if (checkRes.phoneExists) {
        setPhoneError("Number already used");
        isDuplicate = true;
      }

      if (isDuplicate) {
        setIsSubmittingStep1(false);
        return;
      }

      const emailPrefixId = sanitizeEmailToId(contactInfo.email);

      try {
        localStorage.setItem("firstoption_user_contact", JSON.stringify(contactInfo));
        localStorage.setItem("firstoption_lead_id", emailPrefixId);
      } catch (err) {
        console.error("LocalStorage save error:", err);
      }

      const leadPayload: LeadData = {
        fullName: contactInfo.fullName,
        email: contactInfo.email,
        phone: cleanPhone,
        countryCode: contactInfo.countryCode,
        status: "partial",
        pipelineStage: "in_progress",
        stageMovedAt: new Date().toISOString(),
      };

      const res = await saveOrUpdateLead(leadPayload, emailPrefixId, createdDate, activeCampaign.id);
      if (res) {
        setFirebaseLeadId(res.leadId);
        setCreatedDate(res.createdDate);
        if (res.leadData?.survey) {
          setQAnswers(res.leadData.survey as Record<string, string>);
        }
        try {
          localStorage.setItem("firstoption_created_date", res.createdDate);
        } catch (err) {
          console.error("LocalStorage leadId error:", err);
        }
      }

      setStep(2);

      fbEvent("Lead", {
        content_name: activeCampaign.title || "Growth Consultation Lead Form",
        currency: contactInfo.countryCode === "+1" ? "USD" : "INR",
        value: 0,
      });
      fbCustomEvent("FormSubmit", {
        form_name: "Step 1 Contact Form",
        campaign: activeCampaign.id,
      });

      const serverUrl = (process.env.NEXT_PUBLIC_WHATSAPP_SERVER_URL || "https://self.infiplus.in").replace(/\/$/, "");
      fetch(`${serverUrl}/api/whatsapp/auto-send-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: contactInfo.fullName,
          email: contactInfo.email,
          phone: `${contactInfo.countryCode}${cleanPhone}`,
        }),
      }).catch((err) => console.error("Async WhatsApp Welcome Error:", err));
    } catch (err) {
      console.error("Submit Step 1 Error:", err);
    } finally {
      setIsSubmittingStep1(false);
    }
  };

  const handleStep2Submit = async () => {
    const emailPrefixId = firebaseLeadId || sanitizeEmailToId(contactInfo.email);

    try {
      localStorage.setItem("firstoption_survey_answers", JSON.stringify(qAnswers));
      localStorage.setItem("firstoption_lead_status", "survey_completed");
    } catch (e) {
      console.error("LocalStorage survey save error:", e);
    }

    setStep(3);

    fbEvent("CompleteRegistration", {
      content_name: "Growth Consultation Survey",
      campaign: activeCampaign.id,
    });

    const surveyPayload: LeadData = {
      fullName: contactInfo.fullName,
      email: contactInfo.email,
      phone: contactInfo.phone.replace(/\D/g, ""),
      countryCode: contactInfo.countryCode,
      status: "survey_completed",
      pipelineStage: "survey_completed",
      stageMovedAt: new Date().toISOString(),
      survey: qAnswers,
    };

    saveOrUpdateLead(surveyPayload, emailPrefixId, createdDate, activeCampaign.id).catch((err) =>
      console.error("Async survey save error:", err)
    );
  };

  const handleReset = () => {
    setStep(1);
    setIsReselectingSlot(false);
    setShowAlreadySubmittedPopup(false);
    setActiveQIndex(0);
    onClose();
  };

  const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonthIndex, 1).getDay();

  const isPastDay = (day: number) => {
    if (currentYear < realTodayYear) return true;
    if (currentYear === realTodayYear && currentMonthIndex < realTodayMonth) return true;
    if (currentYear === realTodayYear && currentMonthIndex === realTodayMonth && day < realTodayDay) return true;
    return false;
  };

  const handlePrevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };

  const isPrevMonthDisabled =
    currentYear < realTodayYear ||
    (currentYear === realTodayYear && currentMonthIndex <= realTodayMonth);

  const formattedBookingDate = `${selectedDay.toString().padStart(2, "0")} ${MONTH_NAMES[currentMonthIndex]} ${currentYear}`;

  const handleSelectSlot = async (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);

    const formattedMonth = (currentMonthIndex + 1).toString().padStart(2, "0");
    const formattedDay = selectedDay.toString().padStart(2, "0");
    const appointmentDateStr = `${currentYear}-${formattedMonth}-${formattedDay}`;
    const emailPrefixId = firebaseLeadId || sanitizeEmailToId(contactInfo.email);

    try {
      localStorage.setItem("firstoption_meeting_booked", "true");
      localStorage.setItem("firstoption_lead_status", "completed");
    } catch (e) {
      console.error("LocalStorage meeting save error:", e);
    }

    setStep(4);

    fbEvent("Schedule", {
      content_name: `Strategy Session - ${appointmentDateStr} ${timeSlot}`,
      campaign: activeCampaign.id,
    });

    const meetingPayload: LeadData = {
      fullName: contactInfo.fullName,
      email: contactInfo.email,
      phone: contactInfo.phone.replace(/\D/g, ""),
      countryCode: contactInfo.countryCode,
      status: "completed",
      pipelineStage: "meeting_scheduled",
      stageMovedAt: new Date().toISOString(),
      survey: qAnswers,
      meeting: {
        meetingDate: appointmentDateStr,
        meetingTime: timeSlot,
        bookedAt: new Date().toISOString(),
      },
    };

    saveOrUpdateLead(meetingPayload, emailPrefixId, createdDate, activeCampaign.id).catch((err) =>
      console.error("Async meeting save error:", err)
    );

    // Trigger automated WhatsApp meeting confirmation & founder alert on 9958399157
    const serverUrl = (process.env.NEXT_PUBLIC_WHATSAPP_SERVER_URL || "https://self.infiplus.in").replace(/\/$/, "");
    const cleanPhone = contactInfo.phone.replace(/\D/g, "");
    const fullPhoneNumber = `${contactInfo.countryCode}${cleanPhone}`;

    fetch(`${serverUrl}/api/whatsapp/auto-send-meeting`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName: contactInfo.fullName,
        email: contactInfo.email,
        phone: fullPhoneNumber,
        date: appointmentDateStr,
        time: timeSlot,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.meetingUrl) {
          setGeneratedMeetUrl(data.meetingUrl);
        }
      })
      .catch((err) => console.error("Async WhatsApp Meeting Confirmation Error:", err));
  };

  const whatsappMessage = `Hi Selflance, I just booked a Strategy Session.\nName: ${contactInfo.fullName || "User"}\nEmail: ${contactInfo.email || "N/A"}\nPhone: ${contactInfo.countryCode} ${contactInfo.phone || "N/A"}\nBooked Slot: ${formattedBookingDate} at ${selectedTimeSlot || "02:00 PM"}`;
  const whatsappUrl = `https://wa.me/919958399157?text=${encodeURIComponent(whatsappMessage)}`;

  const qualificationQuestions = activeCampaign.questions;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto">
      {/* Already Submitted Popup */}
      {showAlreadySubmittedPopup ? (
        <div className="bg-gradient-to-b from-[#141A2D] via-[#0F1629] to-[#0B1121] text-white border border-[#df7626]/40 w-full max-w-md sm:max-w-lg rounded-3xl p-5 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative max-h-[92vh] overflow-y-auto font-sans text-center my-auto">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full text-gray-400 hover:text-white hover:bg-[#1E293B] flex items-center justify-center text-sm transition-colors cursor-pointer"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>

          <div className="w-16 h-16 rounded-full bg-[#df7626]/20 border-2 border-[#df7626] text-[#df7626] flex items-center justify-center text-3xl mx-auto shadow-lg mb-3">
            <i className="fa-solid fa-circle-check"></i>
          </div>

          <div className="inline-flex items-center space-x-1.5 bg-[#df7626]/10 border border-[#df7626]/30 px-3 py-1 rounded-full text-[#df7626] text-xs font-bold mb-3">
            <i className="fa-solid fa-shield-halved"></i>
            <span>Form Already Submitted</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            You&apos;ve Already Registered!
          </h3>

          <p className="text-xs sm:text-sm text-gray-300 font-medium leading-relaxed mt-2 max-w-sm mx-auto">
            We already have your contact details on file. For any query, assistance, or urgent strategy updates, contact us directly:
          </p>

          {contactInfo.fullName && (
            <div className="bg-[#0B1121] border border-[#2A3552] rounded-2xl p-3.5 mt-4 text-left text-xs space-y-1.5 font-mono shadow-inner">
              <div className="flex justify-between items-center text-gray-400">
                <span>Registered Name:</span>
                <span className="text-white font-bold font-sans">{contactInfo.fullName}</span>
              </div>
              {contactInfo.email && (
                <div className="flex justify-between items-center text-gray-400">
                  <span>Registered Email:</span>
                  <span className="text-[#df7626] font-bold">{contactInfo.email}</span>
                </div>
              )}
              {contactInfo.phone && (
                <div className="flex justify-between items-center text-gray-400">
                  <span>Registered Phone:</span>
                  <span className="text-white font-bold">{contactInfo.countryCode} {contactInfo.phone}</span>
                </div>
              )}
            </div>
          )}

          <div className="space-y-2.5 mt-5">
            <a
              href="https://wa.me/919100000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black p-3.5 rounded-2xl text-xs sm:text-sm uppercase tracking-wide flex items-center justify-center space-x-2 shadow-xl cursor-pointer"
            >
              <i className="fa-brands fa-whatsapp text-lg"></i>
              <span>Chat on WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setShowAlreadySubmittedPopup(false);
                  setIsReselectingSlot(true);
                  setStep(3);
                }}
                className="bg-[#df7626]/20 hover:bg-[#df7626]/30 border border-[#df7626]/40 text-[#df7626] font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-calendar-days text-xs"></i>
                <span>Book / Change Slot</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAlreadySubmittedPopup(false);
                  setStep(1);
                }}
                className="bg-[#131C35] hover:bg-[#1A233D] text-gray-300 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-pen-to-square text-xs"></i>
                <span>Fill New Details</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Step 1: Contact Form */}
          {step === 1 && (
            <div className="bg-gradient-to-b from-[#141A2D] via-[#0F1629] to-[#0B1121] text-white border border-[#6366F1]/40 w-full max-w-md sm:max-w-lg rounded-3xl p-4 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative max-h-[92vh] overflow-y-auto font-sans my-auto">
              <div className="flex items-center justify-between border-b border-[#2A3552] pb-3 mb-3">
                <div className="flex items-center space-x-2">
                  <span className="bg-[#6366F1]/20 border border-[#6366F1]/40 text-[#818CF8] text-[10px] font-black px-2.5 py-0.5 rounded-full">
                    Step 1 of 3
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wide">
                    Fast 30-Sec Booking
                  </span>
                </div>
                <button
                  onClick={handleReset}
                  className="w-7 h-7 rounded-full text-gray-400 hover:text-white hover:bg-[#1E293B] flex items-center justify-center text-sm transition-colors cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <form onSubmit={handleStep1Submit} className="space-y-3.5 text-left">
                <div className="text-center space-y-1">
                  <h3 className="text-base sm:text-xl font-black text-white leading-snug">
                    Claim Your 1-on-1 Strategy Session
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
                    Enter your details to reserve your custom business technology session
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Full Name <span className="text-[#df7626]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Enter your full name"
                    value={contactInfo.fullName}
                    onChange={(e) => {
                      const capitalized = e.target.value.replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());
                      setContactInfo({ ...contactInfo, fullName: capitalized });
                    }}
                    className="w-full bg-[#0B1121] border border-[#2A3552] focus:border-[#df7626] focus:ring-1 focus:ring-[#df7626] rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 shadow-inner outline-none transition-colors"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Work Email <span className="text-[#df7626]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="name@company.com"
                    value={contactInfo.email}
                    onChange={(e) => {
                      setContactInfo({ ...contactInfo, email: e.target.value });
                      if (emailError) setEmailError(null);
                    }}
                    onBlur={handleEmailBlur}
                    className={`w-full bg-[#0B1121] border ${
                      emailError ? "border-red-500" : "border-[#2A3552] focus:border-[#df7626] focus:ring-1 focus:ring-[#df7626]"
                    } rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-gray-500 shadow-inner outline-none transition-colors`}
                  />
                  {emailError && (
                    <p className="text-red-400 font-bold text-xs mt-1 animate-pulse flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{emailError}</span>
                    </p>
                  )}
                </div>

                {/* Phone Number with Country Code Dropdown */}
                <div>
                  <label className="block text-xs font-bold text-gray-300 mb-1">
                    Phone Number <span className="text-[#df7626]">*</span>
                  </label>
                  <div className={`flex items-center bg-[#0B1121] border ${
                    phoneError ? "border-red-500" : "border-[#2A3552] focus-within:border-[#df7626] focus-within:ring-1 focus-within:ring-[#df7626]"
                  } rounded-xl overflow-hidden shadow-inner`}>
                    <select
                      value={contactInfo.countryCode}
                      onChange={(e) => setContactInfo({ ...contactInfo, countryCode: e.target.value })}
                      className="bg-[#0D1426] text-white text-xs sm:text-sm font-bold border-r border-[#2A3552] px-2.5 py-2.5 sm:py-3 outline-none cursor-pointer focus:bg-[#131C35]"
                    >
                      <option value="+91">🇮🇳 +91 (IN)</option>
                      <option value="+1">🇺🇸 +1 (US)</option>
                    </select>
                    <input
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      pattern="[0-9]*"
                      maxLength={10}
                      required
                      placeholder={contactInfo.countryCode === "+1" ? "2125550199" : "9876543210"}
                      value={contactInfo.phone}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/\D/g, "");
                        setContactInfo({ ...contactInfo, phone: onlyNums });
                        if (phoneError) setPhoneError(null);
                      }}
                      onBlur={handlePhoneBlur}
                      className="w-full px-3 py-2.5 sm:py-3 text-sm text-white bg-transparent placeholder-gray-500 focus:outline-none font-mono tracking-wider"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-400 font-bold text-xs mt-1 animate-pulse flex items-center space-x-1">
                      <span>⚠️</span>
                      <span>{phoneError}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingStep1}
                  className="w-full bg-gradient-to-r from-[#df7626] via-[#ea580c] to-[#d97706] hover:from-[#ea580c] hover:to-[#df7626] text-white py-3.5 sm:py-4 rounded-2xl font-extrabold text-sm sm:text-base flex flex-col items-center justify-center space-y-0.5 shadow-[0_8px_25px_-5px_rgba(223,118,38,0.5)] border-t border-white/20 border-b-4 border-[#9a3412] active:border-b-0 active:translate-y-0.5 overflow-hidden transition-all cursor-pointer mt-4 disabled:opacity-50"
                >
                  <div className="text-sm sm:text-base font-black text-white flex items-center justify-center space-x-2 uppercase tracking-wide">
                    {isSubmittingStep1 ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin text-sm"></i>
                        <span>VERIFYING DETAILS...</span>
                      </>
                    ) : (
                      <>
                        <span>CONTINUE TO SELECT SLOT</span>
                        <i className="fa-solid fa-arrow-right text-xs sm:text-sm"></i>
                      </>
                    )}
                  </div>
                  <div className="text-[10px] sm:text-xs font-extrabold text-amber-200">
                    ⚡ 100% Free Strategy Session • No Sales Pitch
                  </div>
                </button>
              </form>
            </div>
          )}

          {/* Step 2: Qualification Questionnaire */}
          {step === 2 && (
            <div className="bg-[#0F1629] text-white border border-[#2A3552] w-full max-w-xl rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto font-sans flex flex-col justify-between my-auto">
              <div>
                <div className="flex items-center justify-between border-b border-[#2A3552] pb-2.5 mb-3">
                  <h3 className="text-xs sm:text-base font-bold text-white tracking-wide truncate">
                    {activeCampaign.subtitle}
                  </h3>
                  <button
                    onClick={handleReset}
                    className="w-7 h-7 rounded-full text-gray-400 hover:text-white hover:bg-[#1E293B] flex items-center justify-center text-sm cursor-pointer"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>

                {(() => {
                  const currentQ = qualificationQuestions[activeQIndex];
                  if (!currentQ) return null;
                  return (
                    <div className="space-y-4 pt-1">
                      <div className="text-sm sm:text-lg md:text-xl font-medium text-gray-100 flex items-start space-x-2">
                        <span className="text-[#df7626] font-bold flex-shrink-0">{currentQ.num} ➔</span>
                        <span>{currentQ.question}</span>
                      </div>

                      <div className="space-y-2 pt-1 max-w-md">
                        {currentQ.options.map((opt) => {
                          const isSelected = qAnswers[currentQ.field] === opt.label;
                          return (
                            <button
                              key={opt.key}
                              type="button"
                              onClick={() => {
                                setQAnswers({ ...qAnswers, [currentQ.field]: opt.label });
                                if (activeQIndex < qualificationQuestions.length - 1) {
                                  setActiveQIndex(activeQIndex + 1);
                                }
                              }}
                              className={`w-full text-left p-2.5 sm:p-3.5 rounded-xl border flex items-center justify-between transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-[#6366F1]/20 border-2 border-[#6366F1] text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]"
                                  : "bg-[#131C35] border-[#2A3552] text-gray-200 hover:border-[#6366F1]/50 hover:bg-[#1A233D]"
                              }`}
                            >
                              <span className="text-xs sm:text-sm font-semibold">{opt.label}</span>
                              <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-[#2A3552] text-gray-400 text-[10px] sm:text-xs font-mono flex items-center justify-center bg-[#0B1121] flex-shrink-0">
                                {opt.key}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <div className="pt-4 border-t border-[#2A3552] flex items-center justify-between mt-5">
                <div className="flex items-center space-x-3">
                  {activeQIndex === qualificationQuestions.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleStep2Submit}
                      className="bg-gradient-to-r from-[#df7626] to-[#ea580c] text-white font-extrabold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm uppercase tracking-wide flex items-center space-x-2 shadow-lg cursor-pointer"
                    >
                      <span>Submit</span>
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setActiveQIndex(activeQIndex + 1)}
                      className="bg-gradient-to-r from-[#df7626] to-[#ea580c] text-white font-bold px-4 py-1.5 sm:py-2 rounded-full text-xs flex items-center space-x-1.5 shadow cursor-pointer"
                    >
                      <span>OK</span>
                      <i className="fa-solid fa-chevron-right text-xs"></i>
                    </button>
                  )}
                  <span className="text-[11px] text-gray-400 font-mono hidden sm:inline">
                    press <span className="text-white font-bold">Enter ↵</span>
                  </span>
                </div>

                <div className="flex items-center space-x-1.5">
                  <button
                    type="button"
                    disabled={activeQIndex === 0}
                    onClick={() => setActiveQIndex(Math.max(0, activeQIndex - 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#df7626]/20 border border-[#df7626]/40 text-[#df7626] hover:bg-[#df7626] hover:text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-up text-xs"></i>
                  </button>
                  <button
                    type="button"
                    disabled={activeQIndex === qualificationQuestions.length - 1}
                    onClick={() => setActiveQIndex(Math.min(qualificationQuestions.length - 1, activeQIndex + 1))}
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#df7626]/20 border border-[#df7626]/40 text-[#df7626] hover:bg-[#df7626] hover:text-white flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                  >
                    <i className="fa-solid fa-chevron-down text-xs"></i>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Calendar & Time Slots */}
          {step === 3 && (
            <div className="bg-[#0B1121] text-white border border-[#2A3552] w-full max-w-lg rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 shadow-2xl relative max-h-[92vh] overflow-y-auto font-sans space-y-3 my-auto">
              <div className="flex items-center justify-between border-b border-[#2A3552] pb-2.5">
                <p className="text-xs sm:text-sm font-bold text-gray-300">
                  Select date &amp; time for your Strategy Call
                </p>
                <button
                  onClick={handleReset}
                  className="w-7 h-7 rounded-full text-gray-400 hover:text-white hover:bg-[#1E293B] flex items-center justify-center text-sm cursor-pointer"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              <div className="bg-[#0F1629] border border-[#2A3552] rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 space-y-3.5 shadow-xl">
                <div className="flex items-center justify-between border-b border-[#2A3552] pb-2.5">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#df7626] shadow">
                      <img src="/founder.png" alt="Selflance Team" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-base font-bold text-white leading-tight">
                        Your Technology Strategy Session
                      </h4>
                      <p className="text-[11px] text-[#df7626] font-semibold">Selflance Strategy Team</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 bg-[#df7626]/10 border border-[#df7626]/30 px-2.5 py-1 rounded-full text-[10px] sm:text-xs text-[#df7626] font-mono font-bold">
                    <i className="fa-regular fa-clock"></i>
                    <span>45 min</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-gray-400 px-1">
                  <div className="flex items-center space-x-1.5 font-mono">
                    <i className="fa-solid fa-globe text-[#df7626]"></i>
                    <span>Asia/Calcutta (GMT+5:30)</span>
                  </div>
                </div>

                {/* Calendar Card */}
                <div className="border border-[#2A3552] rounded-xl sm:rounded-2xl p-3 bg-[#131C35] space-y-3">
                  <div className="flex items-center justify-between text-xs font-extrabold text-white px-1">
                    <button
                      type="button"
                      disabled={isPrevMonthDisabled}
                      onClick={handlePrevMonth}
                      className="px-2.5 py-1 rounded-lg bg-[#0B1121] border border-[#2A3552] hover:bg-[#1E293B] text-[#df7626] flex items-center space-x-1 transition-colors disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                    >
                      <i className="fa-solid fa-chevron-left text-[10px]"></i>
                      <span>Prev</span>
                    </button>

                    <span className="text-sm font-black text-white tracking-wide bg-[#0B1121] px-3 py-1 rounded-lg border border-[#2A3552]">
                      {MONTH_NAMES[currentMonthIndex]} {currentYear}
                    </span>

                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="px-2.5 py-1 rounded-lg bg-[#0B1121] border border-[#2A3552] hover:bg-[#1E293B] text-[#df7626] flex items-center space-x-1 transition-colors cursor-pointer"
                    >
                      <span>Next</span>
                      <i className="fa-solid fa-chevron-right text-[10px]"></i>
                    </button>
                  </div>

                  <div className="grid grid-cols-7 text-center text-[9px] sm:text-[10px] font-bold text-gray-400 border-b border-[#2A3552] pb-1">
                    <span>SUN</span>
                    <span>MON</span>
                    <span>TUE</span>
                    <span>WED</span>
                    <span>THU</span>
                    <span>FRI</span>
                    <span>SAT</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs font-mono font-bold">
                    {[...Array(firstDayOfWeek)].map((_, emptyIdx) => (
                      <div key={`empty-${emptyIdx}`} className="p-1 sm:p-1.5" />
                    ))}

                    {[...Array(daysInMonth)].map((_, i) => {
                      const dayNum = i + 1;
                      const isSelected = selectedDay === dayNum;
                      const isPast = isPastDay(dayNum);

                      return (
                        <button
                          key={dayNum}
                          disabled={isPast}
                          onClick={() => setSelectedDay(dayNum)}
                          className={`p-1.5 sm:p-2 rounded-xl transition-all text-xs font-bold cursor-pointer ${
                            isPast
                              ? "text-gray-600 bg-[#0B1121]/40 opacity-30 pointer-events-none line-through"
                              : isSelected
                              ? "bg-gradient-to-r from-[#df7626] to-[#ea580c] text-white font-black shadow-[0_0_15px_rgba(223,118,38,0.4)] scale-105"
                              : "text-gray-200 hover:bg-[#1E293B] hover:text-[#df7626]"
                          }`}
                        >
                          {dayNum}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Picker */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-200">
                    <span>📅 {formattedBookingDate}</span>
                    <span className="text-[#df7626] text-[10px] uppercase font-mono">Select Time Slot</span>
                  </div>

                  {(() => {
                    if (bookedSlotsMap["_blockedDate"]) {
                      return (
                        <div className="p-3.5 text-center rounded-xl bg-red-950/40 border border-red-800/60 space-y-1.5 my-1">
                          <p className="text-xs text-red-400 font-bold flex items-center justify-center space-x-1.5">
                            <i className="fa-solid fa-ban"></i>
                            <span>This date is marked as booked / unavailable.</span>
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Please select another date from the calendar above.
                          </p>
                        </div>
                      );
                    }

                    const activeSlots = DAILY_TIME_SLOTS.filter(
                      (time) => !isSlotTimePassed(time, selectedDay, currentMonthIndex, currentYear)
                    );

                    if (activeSlots.length === 0) {
                      return (
                        <div className="p-3 text-center rounded-xl bg-[#131C35] border border-[#2A3552] space-y-1.5 my-1">
                          <p className="text-xs text-[#df7626] font-bold flex items-center justify-center space-x-1">
                            <span>⏰</span>
                            <span>All time slots for today have passed.</span>
                          </p>
                          <p className="text-[11px] text-gray-400">
                            Please select tomorrow or an upcoming date from the calendar above.
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 max-h-48 overflow-y-auto p-1">
                        {activeSlots.map((time) => {
                          const slotKey = sanitizeSlotKey(time);
                          const isBooked = bookedSlotsMap[slotKey] === true;

                          return (
                            <button
                              key={time}
                              disabled={isBooked}
                              onClick={() => handleSelectSlot(time)}
                              className={`w-full p-2.5 rounded-xl text-xs font-bold transition-all shadow cursor-pointer ${
                                isBooked
                                  ? "bg-[#0B1121] border border-[#2A3552] text-gray-600 line-through opacity-50 cursor-not-allowed flex items-center justify-center space-x-1"
                                  : "bg-gradient-to-r from-[#df7626] to-[#ea580c] hover:from-[#ea580c] hover:to-[#df7626] text-white font-extrabold hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-1"
                              }`}
                            >
                              <i className="fa-regular fa-clock text-[11px]"></i>
                              <span>{isBooked ? `${time} (Booked)` : time}</span>
                            </button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Final Success Confirmation */}
          {step === 4 && (
            <div className="bg-[#0F1629] text-white border border-emerald-500/40 w-full max-w-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-2xl relative text-center space-y-4 font-sans my-auto">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center text-2xl sm:text-3xl mx-auto shadow-lg">
                ✓
              </div>

              <div>
                <h4 className="text-lg sm:text-xl font-black text-white">
                  Appointment Slot Booked Successfully! 🎉
                </h4>
                <p className="text-xs text-[#df7626] font-bold mt-1">
                  {formattedBookingDate} at {selectedTimeSlot}
                </p>
              </div>

              <div className="bg-[#0B1121] border border-[#2A3552] rounded-2xl p-3.5 text-left text-xs text-gray-300 space-y-1 font-mono">
                <div><span className="text-gray-500">Name:</span> {contactInfo.fullName || "User"}</div>
                <div><span className="text-gray-500">Phone:</span> {contactInfo.countryCode} {contactInfo.phone || "N/A"}</div>
                <div><span className="text-gray-500">Campaign:</span> {activeCampaign.title}</div>
                <div><span className="text-gray-500">Booked Slot:</span> {formattedBookingDate} ({selectedTimeSlot})</div>
                {generatedMeetUrl && (
                  <div className="pt-1.5 border-t border-[#2A3552] text-indigo-300">
                    <span className="text-gray-500 block">Google Meet Link:</span>
                    <a href={generatedMeetUrl} target="_blank" rel="noopener noreferrer" className="font-bold underline text-indigo-400 break-all hover:text-white">
                      🎥 {generatedMeetUrl}
                    </a>
                  </div>
                )}
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleReset}
                className="block w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 sm:py-3.5 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wide shadow-xl transition-transform active:scale-98 cursor-pointer"
              >
                <i className="fa-brands fa-whatsapp mr-2 text-base"></i>
                Confirm Slot On WhatsApp &amp; Finish
              </a>

              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.location.search) {
                      window.history.replaceState({}, "", window.location.pathname);
                    }
                    setIsReselectingSlot(true);
                    setStep(3);
                  }}
                  className="flex-1 bg-[#df7626]/20 hover:bg-[#df7626]/30 border border-[#df7626]/40 text-[#df7626] font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <i className="fa-solid fa-calendar-pen text-xs"></i>
                  <span>Change / Reselect Slot</span>
                </button>
                <button
                  onClick={handleReset}
                  className="bg-[#131C35] hover:bg-[#1A233D] text-gray-300 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
