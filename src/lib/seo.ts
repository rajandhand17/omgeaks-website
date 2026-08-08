import { COMPANY } from "@/lib/brand";
import { FAQ_ITEMS, SERVICES } from "@/lib/constants";

export const SITE_URL = "https://omgeaks.com";

export const SEO_KEYWORDS = [
  "OmGeaks",
  "OmGeaks IT company",
  "OmGeaks AI",
  "IT company",
  "IT company India",
  "software development company",
  "AI product engineering",
  "AI agents development",
  "business automation company",
  "custom software development",
  "mobile app development company",
  "enterprise CRM development",
  "cloud solutions AWS",
  "product engineering company",
  "web development company",
  "AI automation services",
  "Next.js development company",
  "Laravel development company",
  "Flutter app development",
] as const;

export const DEFAULT_TITLE = "OmGeaks — AI & Product Engineering | IT Company";
export const DEFAULT_DESCRIPTION =
  "OmGeaks is an AI & Product Engineering IT company building AI agents, business automation, custom software, mobile apps, enterprise CRM, and cloud platforms for businesses worldwide.";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY.name,
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/omgeaks-logo.png`,
    image: `${SITE_URL}/logos/omgeaks-logo.png`,
    description: DEFAULT_DESCRIPTION,
    email: COMPANY.email,
    telephone: COMPANY.phone,
    foundingDate: "2024",
    slogan: COMPANY.tagline,
    areaServed: "Worldwide",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phone,
        availableLanguage: ["English", "Hindi"],
      },
    ],
    sameAs: [COMPANY.whatsapp],
    knowsAbout: SERVICES.map((s) => s.title),
    makesOffer: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.description,
        provider: { "@id": `${SITE_URL}/#organization` },
      },
    })),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: COMPANY.name,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}
