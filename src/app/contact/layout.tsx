import type { Metadata } from "next";
import { OG_IMAGE, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact | Software & App Development Ludhiana",
  description:
    "Contact OmGeaks in Samrala, Ludhiana (Punjab) for custom software, website development, and mobile app projects. Email, WhatsApp, or send a brief today.",
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: "Contact OmGeaks",
    description:
      "Start a software, website, or mobile app project with OmGeaks Pvt. Ltd. in Ludhiana, Punjab.",
    url: `${SITE_URL}/contact`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact OmGeaks",
    description:
      "Start a software, website, or mobile app project with OmGeaks Pvt. Ltd. in Ludhiana, Punjab.",
    images: [OG_IMAGE.url],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      {children}
    </>
  );
}
