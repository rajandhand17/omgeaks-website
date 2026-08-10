import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";
import { OG_IMAGE, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About | IT Company in Samrala, Ludhiana",
  description:
    "About OmGeaks Pvt. Ltd. — a software company in Samrala, Ludhiana (Punjab) building custom software, websites, mobile apps, and AI systems for businesses worldwide.",
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: "About OmGeaks Pvt. Ltd.",
    description:
      "Software, website, and mobile app development company based in Ludhiana, Punjab.",
    url: `${SITE_URL}/about`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "About OmGeaks Pvt. Ltd.",
    description:
      "Software, website, and mobile app development company based in Ludhiana, Punjab.",
    images: [OG_IMAGE.url],
  },
};

export default function AboutPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <AboutPageClient />
    </>
  );
}
