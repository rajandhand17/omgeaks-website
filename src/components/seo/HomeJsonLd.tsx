"use client";

import { faqJsonLd } from "@/lib/seo";

/** FAQ schema only on the home page (where FAQ content exists). */
export function HomeJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
    />
  );
}
