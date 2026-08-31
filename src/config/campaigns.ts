export interface QuestionOption {
  label: string;
  key: string;
}

export interface QualificationQuestion {
  num: number;
  question: string;
  field: string;
  type?: "single" | "multi" | "textarea";
  placeholder?: string;
  helper?: string;
  options?: QuestionOption[];
  usOptions?: QuestionOption[];
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
    title: "Selflance Technologies",
    subtitle: "Project Assessment & Strategy Session",
    questions: [
      {
        num: 1,
        question: "What are you looking to build?",
        field: "solutionType",
        type: "single",
        options: [
          { label: "Mobile App", key: "A" },
          { label: "Web Application", key: "B" },
          { label: "Business Software / CRM / ERP", key: "C" },
          { label: "E-Commerce Platform", key: "D" },
          { label: "Website", key: "E" },
          { label: "AI / Automation Solution", key: "F" },
          { label: "Something Else", key: "G" },
        ],
      },
      {
        num: 2,
        question: "Where are you right now?",
        field: "projectStage",
        type: "single",
        options: [
          { label: "Just an idea", key: "A" },
          { label: "Planning / researching", key: "B" },
          { label: "MVP ready to build", key: "C" },
          { label: "Existing product that needs improvement", key: "D" },
          { label: "Existing business looking for a new system", key: "E" },
        ],
      },
      {
        num: 3,
        question: "What's your approximate project investment?",
        field: "projectBudget",
        type: "single",
        options: [
          { label: "₹50K – ₹1L", key: "A" },
          { label: "₹1L – ₹3L", key: "B" },
          { label: "₹3L – ₹5L", key: "C" },
          { label: "₹5L – ₹10L", key: "D" },
          { label: "₹10L+", key: "E" },
          { label: "Not sure yet", key: "F" },
        ],
        usOptions: [
          { label: "$1K – $5K", key: "A" },
          { label: "$5K – $10K", key: "B" },
          { label: "$10K – $25K", key: "C" },
          { label: "$25K – $50K", key: "D" },
          { label: "$50K+", key: "E" },
          { label: "Not sure yet", key: "F" },
        ],
      },
      {
        num: 4,
        question: "When are you looking to start?",
        field: "projectTimeline",
        type: "single",
        options: [
          { label: "Immediately", key: "A" },
          { label: "Within 30 days", key: "B" },
          { label: "1–3 months", key: "C" },
          { label: "3–6 months", key: "D" },
          { label: "Just exploring", key: "E" },
        ],
      },
    ],
  },
  firstoptionagency: {
    id: "firstoptionagency",
    title: "Selflance Technologies",
    subtitle: "Project Assessment & Strategy Session",
    questions: [
      {
        num: 1,
        question: "What are you looking to build?",
        field: "solutionType",
        type: "single",
        options: [
          { label: "Mobile App", key: "A" },
          { label: "Web Application", key: "B" },
          { label: "Business Software / CRM / ERP", key: "C" },
          { label: "E-Commerce Platform", key: "D" },
          { label: "Website", key: "E" },
          { label: "AI / Automation Solution", key: "F" },
          { label: "Something Else", key: "G" },
        ],
      },
      {
        num: 2,
        question: "Where are you right now?",
        field: "projectStage",
        type: "single",
        options: [
          { label: "Just an idea", key: "A" },
          { label: "Planning / researching", key: "B" },
          { label: "MVP ready to build", key: "C" },
          { label: "Existing product that needs improvement", key: "D" },
          { label: "Existing business looking for a new system", key: "E" },
        ],
      },
      {
        num: 3,
        question: "What's your approximate project investment?",
        field: "projectBudget",
        type: "single",
        options: [
          { label: "₹50K – ₹1L", key: "A" },
          { label: "₹1L – ₹3L", key: "B" },
          { label: "₹3L – ₹5L", key: "C" },
          { label: "₹5L – ₹10L", key: "D" },
          { label: "₹10L+", key: "E" },
          { label: "Not sure yet", key: "F" },
        ],
        usOptions: [
          { label: "$1K – $5K", key: "A" },
          { label: "$5K – $10K", key: "B" },
          { label: "$10K – $25K", key: "C" },
          { label: "$25K – $50K", key: "D" },
          { label: "$50K+", key: "E" },
          { label: "Not sure yet", key: "F" },
        ],
      },
      {
        num: 4,
        question: "When are you looking to start?",
        field: "projectTimeline",
        type: "single",
        options: [
          { label: "Immediately", key: "A" },
          { label: "Within 30 days", key: "B" },
          { label: "1–3 months", key: "C" },
          { label: "3–6 months", key: "D" },
          { label: "Just exploring", key: "E" },
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
        question: "What type of practice do you run?",
        field: "practiceType",
        type: "single",
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
        question: "How many new patients do you want per month?",
        field: "targetPatients",
        type: "single",
        options: [
          { label: "15 – 30 new patients", key: "A" },
          { label: "30 – 60 new patients", key: "B" },
          { label: "60+ high-value surgeries/treatments", key: "C" },
        ],
      },
      {
        num: 3,
        question: "Are you currently running Google or Meta Ads?",
        field: "currentAdsStatus",
        type: "single",
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
