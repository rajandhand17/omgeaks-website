import { COMPANY, formatCompanyAddress } from "@/lib/brand";
import { FAQ_ITEMS, SERVICES } from "@/lib/constants";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://omgeaks.com";

export const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "OmGeaks Pvt. Ltd. — Software, Website & Mobile App Development Company",
} as const;

export const SEO_KEYWORDS = [
  "OmGeaks",
  "Omgeaks",
  "OmGeaks Pvt Ltd",
  "OmGeaks Pvt. Ltd.",
  "OmGeaks Private Limited",
  "OmGeaks software company",
  "OmGeaks Ludhiana",
  "OmGeaks Samrala",
  "software development company",
  "software development company Ludhiana",
  "website development company",
  "website development Ludhiana",
  "web development company Punjab",
  "mobile app development company",
  "Android app development",
  "iOS app development",
  "Flutter app development",
  "IT company Ludhiana",
  "IT company Punjab",
  "IT company Samrala",
  "custom software development",
  "business software development",
  "AI product engineering",
  "AI agents development",
  "business automation company",
  "enterprise CRM development",
  "Next.js development company",
  "Laravel development company",
] as const;

export const DEFAULT_TITLE =
  "OmGeaks | Software, Website & Mobile App Development | Ludhiana, Punjab";
export const DEFAULT_DESCRIPTION =
  "OmGeaks Pvt. Ltd. (brand: OmGeaks) is the official website of the software company in Samrala, Ludhiana, Punjab. We build custom software, websites, mobile apps, AI agents, and cloud platforms.";

function postalAddress() {
  const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry, addressArea } =
    COMPANY.address;

  return {
    "@type": "PostalAddress",
    streetAddress: `${streetAddress}, ${addressArea}`,
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
  };
}

function sameAsLinks() {
  return [COMPANY.whatsapp, COMPANY.googleBusinessProfile].filter(Boolean);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": `${SITE_URL}/#organization`,
    name: "OmGeaks",
    alternateName: ["OmGeaks Pvt. Ltd.", "Omgeaks", "OmGeaks Private Limited"],
    legalName: COMPANY.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/logos/omgeaks-logo.png`,
    image: `${SITE_URL}${OG_IMAGE.url}`,
    description: DEFAULT_DESCRIPTION,
    disambiguatingDescription:
      "OmGeaks (OmGeaks Pvt. Ltd.) is an Indian software company based in Samrala, Ludhiana, Punjab. It is not related to Omega Pvt. Ltd. or any Omega brand.",
    email: COMPANY.email,
    telephone: COMPANY.phone,
    foundingDate: "2024",
    slogan: COMPANY.tagline,
    areaServed: ["IN", "Worldwide"],
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: COMPANY.email,
        telephone: COMPANY.phone,
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Punjabi"],
      },
    ],
    sameAs: sameAsLinks(),
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

/** LocalBusiness schema — supports Google Business Profile / local SEO */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: "OmGeaks",
    alternateName: ["OmGeaks Pvt. Ltd.", "Omgeaks", "OmGeaks Private Limited"],
    url: SITE_URL,
    image: [`${SITE_URL}${OG_IMAGE.url}`, `${SITE_URL}/logos/omgeaks-logo.png`],
    logo: `${SITE_URL}/logos/omgeaks-logo.png`,
    description: DEFAULT_DESCRIPTION,
    disambiguatingDescription:
      "OmGeaks Pvt. Ltd. is a software company in Samrala, Ludhiana, Punjab — distinct from Omega Pvt. Ltd.",
    email: COMPANY.email,
    telephone: COMPANY.phone,
    priceRange: "$$",
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: COMPANY.geo.latitude,
      longitude: COMPANY.geo.longitude,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "23:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Samrala" },
      { "@type": "City", name: "Ludhiana" },
      { "@type": "State", name: "Punjab" },
      { "@type": "Country", name: "India" },
    ],
    hasMap: COMPANY.googleBusinessProfile,
    sameAs: sameAsLinks(),
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "OmGeaks",
    alternateName: "OmGeaks Pvt. Ltd.",
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

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

export { formatCompanyAddress };
