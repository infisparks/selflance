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
        question: "What type of software or digital solution does your business need? *",
        field: "softwareType",
        options: [
          { label: "Custom Software (CRM / ERP / Internal Portal)", key: "A" },
          { label: "Mobile App Development (iOS & Android)", key: "B" },
          { label: "High-Converting Enterprise Website / Web App", key: "C" },
          { label: "Business Process & Workflow Automation (APIs & Bots)", key: "D" },
          { label: "Complete End-to-End Digital Transformation", key: "E" },
        ],
      },
      {
        num: 2,
        question: "What is your primary growth bottleneck or goal right now? *",
        field: "primaryGoal",
        options: [
          { label: "Automate manual work & scale team efficiency", key: "A" },
          { label: "Scale sales, leads & customer acquisition online", key: "B" },
          { label: "Upgrade / replace slow or outdated legacy systems", key: "C" },
          { label: "Build a brand-new software / SaaS product from scratch", key: "D" },
          { label: "Multi-branch / multi-location operations management", key: "E" },
        ],
      },
      {
        num: 3,
        question: "What is your target timeline to start this development project? *",
        field: "projectTimeline",
        options: [
          { label: "Ready to start immediately (Within 1-2 weeks)", key: "A" },
          { label: "Planning to start this month (2-4 weeks)", key: "B" },
          { label: "Next quarter / Exploring scope & feasibility", key: "C" },
          { label: "Need a 1-on-1 strategy call first to plan roadmap & budget", key: "D" },
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
        question: "What type of software or digital solution does your business need? *",
        field: "softwareType",
        options: [
          { label: "Custom Software (CRM / ERP / Internal Portal)", key: "A" },
          { label: "Mobile App Development (iOS & Android)", key: "B" },
          { label: "High-Converting Enterprise Website / Web App", key: "C" },
          { label: "Business Process & Workflow Automation (APIs & Bots)", key: "D" },
          { label: "Complete End-to-End Digital Transformation", key: "E" },
        ],
      },
      {
        num: 2,
        question: "What is your primary growth bottleneck or goal right now? *",
        field: "primaryGoal",
        options: [
          { label: "Automate manual work & scale team efficiency", key: "A" },
          { label: "Scale sales, leads & customer acquisition online", key: "B" },
          { label: "Upgrade / replace slow or outdated legacy systems", key: "C" },
          { label: "Build a brand-new software / SaaS product from scratch", key: "D" },
          { label: "Multi-branch / multi-location operations management", key: "E" },
        ],
      },
      {
        num: 3,
        question: "What is your target timeline to start this development project? *",
        field: "projectTimeline",
        options: [
          { label: "Ready to start immediately (Within 1-2 weeks)", key: "A" },
          { label: "Planning to start this month (2-4 weeks)", key: "B" },
          { label: "Next quarter / Exploring scope & feasibility", key: "C" },
          { label: "Need a 1-on-1 strategy call first to plan roadmap & budget", key: "D" },
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
