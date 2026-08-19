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
    title: "Diamond Boutique (Siddiqui Coutures)",
    subtitle: "Quick 30-Second Distributorship & Custom Fitting Assessment",
    questions: [
      {
        num: 1,
        question: "Aapko kis cheez ke liye inquiry karni hai? *",
        field: "solutionType",
        options: [
          { label: "B2B Wholesale / Reseller Bulk Orders", key: "A" },
          { label: "Personal Shopping (Ready-Made Suits)", key: "B" },
          { label: "Unstitched Lawn + In-House Master Stitching", key: "C" },
          { label: "Attar Gali Physical Store Visit Appointment", key: "D" },
        ],
      },
      {
        num: 2,
        question: "Aapka Business ya Requirement Model kya hai? *",
        field: "projectCategory",
        options: [
          { label: "Retail Cloth Shop / Store Owner", key: "A" },
          { label: "Home Boutique Owner / Tailor", key: "B" },
          { label: "Online Instagram / WhatsApp Reseller", key: "C" },
          { label: "Personal Shopper (Wedding / Festive / Eid)", key: "D" },
          { label: "Wholesale Distributor / Semi-Wholesaler", key: "E" },
          { label: "Other / Exploring Catalog", key: "F" },
        ],
      },
      {
        num: 3,
        question: "Aapko kitne suits ka order / collection chahiye? *",
        field: "projectTimeline",
        options: [
          { label: "Bulk Lot (30 se 100+ Suits)", key: "A" },
          { label: "Trial / Starter Lot (10 se 25 Suits)", key: "B" },
          { label: "Personal / Bridal Collection (3 se 5 Suits)", key: "C" },
          { label: "Single Outfit Trial Order", key: "D" },
        ],
      },
      {
        num: 4,
        question: "Aap kab visit karna ya order receive karna chahte hain? *",
        field: "userRole",
        options: [
          { label: "Immediately (Within 24–48 Hours)", key: "A" },
          { label: "Isi hafte (This Week)", key: "B" },
          { label: "Agle hafte (Next Week)", key: "C" },
          { label: "Pehle WhatsApp catalogue aur rates dekhna hai", key: "D" },
        ],
      },
    ],
  },
  diamond_boutique: {
    id: "diamond_boutique",
    title: "Diamond Boutique (Siddiqui Coutures)",
    subtitle: "Quick 30-Second Distributorship & Custom Fitting Assessment",
    questions: [
      {
        num: 1,
        question: "Aapko kis cheez ke liye inquiry karni hai? *",
        field: "solutionType",
        options: [
          { label: "B2B Wholesale / Reseller Bulk Orders", key: "A" },
          { label: "Personal Shopping (Ready-Made Suits)", key: "B" },
          { label: "Unstitched Lawn + In-House Master Stitching", key: "C" },
          { label: "Attar Gali Physical Store Visit Appointment", key: "D" },
        ],
      },
      {
        num: 2,
        question: "Aapka Business ya Requirement Model kya hai? *",
        field: "projectCategory",
        options: [
          { label: "Retail Cloth Shop / Store Owner", key: "A" },
          { label: "Home Boutique Owner / Tailor", key: "B" },
          { label: "Online Instagram / WhatsApp Reseller", key: "C" },
          { label: "Personal Shopper (Wedding / Festive / Eid)", key: "D" },
          { label: "Wholesale Distributor / Semi-Wholesaler", key: "E" },
          { label: "Other / Exploring Catalog", key: "F" },
        ],
      },
      {
        num: 3,
        question: "Aapko kitne suits ka order / collection chahiye? *",
        field: "projectTimeline",
        options: [
          { label: "Bulk Lot (30 se 100+ Suits)", key: "A" },
          { label: "Trial / Starter Lot (10 se 25 Suits)", key: "B" },
          { label: "Personal / Bridal Collection (3 se 5 Suits)", key: "C" },
          { label: "Single Outfit Trial Order", key: "D" },
        ],
      },
      {
        num: 4,
        question: "Aap kab visit karna ya order receive karna chahte hain? *",
        field: "userRole",
        options: [
          { label: "Immediately (Within 24–48 Hours)", key: "A" },
          { label: "Isi hafte (This Week)", key: "B" },
          { label: "Agle hafte (Next Week)", key: "C" },
          { label: "Pehle WhatsApp catalogue aur rates dekhna hai", key: "D" },
        ],
      },
    ],
  },
  firstoptionagency: {
    id: "firstoptionagency",
    title: "Diamond Boutique (Siddiqui Coutures)",
    subtitle: "Quick 30-Second Distributorship & Custom Fitting Assessment",
    questions: [
      {
        num: 1,
        question: "Aapko kis cheez ke liye inquiry karni hai? *",
        field: "solutionType",
        options: [
          { label: "B2B Wholesale / Reseller Bulk Orders", key: "A" },
          { label: "Personal Shopping (Ready-Made Suits)", key: "B" },
          { label: "Unstitched Lawn + In-House Master Stitching", key: "C" },
          { label: "Attar Gali Physical Store Visit Appointment", key: "D" },
        ],
      },
      {
        num: 2,
        question: "Aapka Business ya Requirement Model kya hai? *",
        field: "projectCategory",
        options: [
          { label: "Retail Cloth Shop / Store Owner", key: "A" },
          { label: "Home Boutique Owner / Tailor", key: "B" },
          { label: "Online Instagram / WhatsApp Reseller", key: "C" },
          { label: "Personal Shopper (Wedding / Festive / Eid)", key: "D" },
          { label: "Wholesale Distributor / Semi-Wholesaler", key: "E" },
          { label: "Other / Exploring Catalog", key: "F" },
        ],
      },
      {
        num: 3,
        question: "Aapko kitne suits ka order / collection chahiye? *",
        field: "projectTimeline",
        options: [
          { label: "Bulk Lot (30 se 100+ Suits)", key: "A" },
          { label: "Trial / Starter Lot (10 se 25 Suits)", key: "B" },
          { label: "Personal / Bridal Collection (3 se 5 Suits)", key: "C" },
          { label: "Single Outfit Trial Order", key: "D" },
        ],
      },
      {
        num: 4,
        question: "Aap kab visit karna ya order receive karna chahte hain? *",
        field: "userRole",
        options: [
          { label: "Immediately (Within 24–48 Hours)", key: "A" },
          { label: "Isi hafte (This Week)", key: "B" },
          { label: "Agle hafte (Next Week)", key: "C" },
          { label: "Pehle WhatsApp catalogue aur rates dekhna hai", key: "D" },
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
