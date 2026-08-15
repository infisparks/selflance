export interface QuestionOption {
  label: string;
  key: string;
}

export interface QualificationQuestion {
  num: number;
  question: string;
  field: string;
  options: QuestionOption[];
}

export interface CampaignConfig {
  id: string;
  title: string;
  subtitle: string;
  questions: QualificationQuestion[];
}

export const CAMPAIGNS: Record<string, CampaignConfig> = {
  selflance: {
    id: "selflance",
    title: "Selflance Technology Partner",
    subtitle: "Quick 30-Second Software Project Assessment",
    questions: [
      {
        num: 1,
        question: "What do you need to build? *",
        field: "solutionType",
        options: [
          { label: "Mobile App (iOS & Android)", key: "A" },
          { label: "Website / Web Application", key: "B" },
          { label: "Both (Mobile App + Website)", key: "C" },
          { label: "Custom Software / Enterprise Solution", key: "D" },
        ],
      },
      {
        num: 2,
        question: "What category does your mobile app / project belong to? *",
        field: "projectCategory",
        options: [
          { label: "Healthcare & Medical", key: "A" },
          { label: "E-commerce", key: "B" },
          { label: "Real Estate", key: "C" },
          { label: "Taxi & Ride-Hailing", key: "D" },
          { label: "Food Delivery", key: "E" },
          { label: "Grocery Delivery", key: "F" },
          { label: "Salon & Beauty", key: "G" },
          { label: "Education (EdTech)", key: "H" },
          { label: "Travel & Tourism", key: "I" },
          { label: "Fitness & Wellness", key: "J" },
          { label: "Logistics & Delivery", key: "K" },
          { label: "Booking & Appointment", key: "L" },
          { label: "Restaurant & Hospitality", key: "M" },
          { label: "Other", key: "N" },
        ],
      },
      {
        num: 3,
        question: "When are you planning to start this project? *",
        field: "projectTimeline",
        options: [
          { label: "Ready to start immediately (Within 1-2 weeks)", key: "A" },
          { label: "In 1–3 weeks", key: "B" },
          { label: "In 2–3 months", key: "C" },
          { label: "Just exploring / Feasibility stage", key: "D" },
        ],
      },
      {
        num: 4,
        question: "Are you the founder or decision maker? *",
        field: "userRole",
        options: [
          { label: "Yes, Founder / Co-Founder", key: "A" },
          { label: "Yes, CEO / Business Owner", key: "B" },
          { label: "Product / Tech / Project Manager", key: "C" },
          { label: "Decision Maker / Team Lead", key: "D" },
          { label: "Other / Exploring for company", key: "E" },
        ],
      },
    ],
  },
  firstoptionagency: {
    id: "firstoptionagency",
    title: "Selflance Technology Partner",
    subtitle: "Quick 30-Second Software Project Assessment",
    questions: [
      {
        num: 1,
        question: "What do you need to build? *",
        field: "solutionType",
        options: [
          { label: "Mobile App (iOS & Android)", key: "A" },
          { label: "Website / Web Application", key: "B" },
          { label: "Both (Mobile App + Website)", key: "C" },
          { label: "Custom Software / Enterprise Solution", key: "D" },
        ],
      },
      {
        num: 2,
        question: "What category does your mobile app / project belong to? *",
        field: "projectCategory",
        options: [
          { label: "Healthcare & Medical", key: "A" },
          { label: "E-commerce", key: "B" },
          { label: "Real Estate", key: "C" },
          { label: "Taxi & Ride-Hailing", key: "D" },
          { label: "Food Delivery", key: "E" },
          { label: "Grocery Delivery", key: "F" },
          { label: "Salon & Beauty", key: "G" },
          { label: "Education (EdTech)", key: "H" },
          { label: "Travel & Tourism", key: "I" },
          { label: "Fitness & Wellness", key: "J" },
          { label: "Logistics & Delivery", key: "K" },
          { label: "Booking & Appointment", key: "L" },
          { label: "Restaurant & Hospitality", key: "M" },
          { label: "Other", key: "N" },
        ],
      },
      {
        num: 3,
        question: "When are you planning to start this project? *",
        field: "projectTimeline",
        options: [
          { label: "Ready to start immediately (Within 1-2 weeks)", key: "A" },
          { label: "In 1–3 weeks", key: "B" },
          { label: "In 2–3 months", key: "C" },
          { label: "Just exploring / Feasibility stage", key: "D" },
        ],
      },
      {
        num: 4,
        question: "Are you the founder or decision maker? *",
        field: "userRole",
        options: [
          { label: "Yes, Founder / Co-Founder", key: "A" },
          { label: "Yes, CEO / Business Owner", key: "B" },
          { label: "Product / Tech / Project Manager", key: "C" },
          { label: "Decision Maker / Team Lead", key: "D" },
          { label: "Other / Exploring for company", key: "E" },
        ],
      },
    ],
  },
  doctors_growth: {
    id: "doctors_growth",
    title: "Doctors & Clinic Growth Campaign",
    subtitle: "Help Us Tailor Your Patient Acquisition Strategy",
    questions: [
      {
        num: 1,
        question: "What type of practice do you run? *",
        field: "practiceType",
        options: [
          { label: "Dental Clinic", key: "A" },
          { label: "Dermatology / Cosmetology", key: "B" },
          { label: "Multispecialty Hospital", key: "C" },
          { label: "Ayurveda / Wellness", key: "D" },
          { label: "Solo Practitioner", key: "E" },
        ],
      },
      {
        num: 2,
        question: "How many new patients do you want per month? *",
        field: "targetPatients",
        options: [
          { label: "15 – 30 new patients", key: "A" },
          { label: "30 – 60 new patients", key: "B" },
          { label: "60+ high-value surgeries/treatments", key: "C" },
        ],
      },
      {
        num: 3,
        question: "Are you currently running Google or Meta Ads? *",
        field: "currentAdsStatus",
        options: [
          { label: "Yes, in-house", key: "A" },
          { label: "Yes, with another agency", key: "B" },
          { label: "No, never tried before", key: "C" },
        ],
      },
    ],
  },
};

export const DEFAULT_CAMPAIGN_ID = "selflance";

export function getCampaignConfig(campaignId?: string | null): CampaignConfig {
  if (campaignId && CAMPAIGNS[campaignId]) {
    return CAMPAIGNS[campaignId];
  }
  return CAMPAIGNS[DEFAULT_CAMPAIGN_ID];
}
