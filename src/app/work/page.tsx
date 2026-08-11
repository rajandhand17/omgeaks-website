import type { Metadata } from "next";
import { WorkPageClient } from "./WorkPageClient";
import { OG_IMAGE, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Work & Demos | Websites, Apps & CRM",
  description:
    "OmGeaks work demos: cinematic website films, mobile apps, CRM software, and eCommerce — shown in device mockups with full project descriptions.",
  alternates: { canonical: `${SITE_URL}/work` },
  openGraph: {
    title: "OmGeaks Work & Demos",
    description:
      "Websites, mobile apps, CRM, and software demos presented as product films.",
    url: `${SITE_URL}/work`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "OmGeaks Work & Demos",
    description: "Websites, mobile apps, CRM, and software demos presented as product films.",
    images: [OG_IMAGE.url],
  },
};

export default function WorkPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Work", path: "/work" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <WorkPageClient />
    </>
  );
}
