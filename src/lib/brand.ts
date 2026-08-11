/** OmGeaks brand — extracted from official logo */
export const BRAND = {
  white: "#FFFFFF",
  soft: "#F5F8FC",
  elevated: "#EEF3FA",
  gray: "#E8EEF6",
  navy: "#051937",
  navyMid: "#0A2540",
  deepBlue: "#003B73",
  sky: "#00AEEF",
  skySoft: "#33C1F5",
  orange: "#F15A24",
  gold: "#FBB03B",
  muted: "rgba(5, 25, 55, 0.62)",
  dim: "rgba(5, 25, 55, 0.42)",
} as const;

export const COMPANY = {
  name: "OmGeaks",
  /** Must match Google Business Profile listing name */
  legalName: "Omgeaks PVT. LTD.",
  tagline: "Engineering Intelligent Digital Products",
  positioning: "AI & Product Engineering",
  email: "hello@omgeaks.com",
  emailInbox: "rajandhand17@gmail.com",
  phone: "+91 97808 88877",
  phoneRaw: "919780888877",
  location: "Samrala, Ludhiana, Punjab · India",
  whatsapp: "https://wa.me/919780888877",
  /** Google Business Profile share link */
  googleBusinessProfile: "https://share.google/8rHcBNOddSkJW5FMS",
  address: {
    streetAddress: "Street No 2, Kamal Colony",
    addressLocality: "Samrala",
    addressRegion: "Punjab",
    addressArea: "Ludhiana",
    postalCode: "141114",
    addressCountry: "IN",
  },
  geo: {
    latitude: 30.8364,
    longitude: 76.1931,
  },
  openingHours: ["Mo-Su 09:00-23:00"] as string[],
} as const;

/** Single-line address for UI + schema */
export function formatCompanyAddress() {
  const a = COMPANY.address;
  return `${a.streetAddress}, ${a.addressLocality}, ${a.addressArea}, ${a.addressRegion} ${a.postalCode}, India`;
}
