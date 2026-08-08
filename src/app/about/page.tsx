import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About OmGeaks | AI & Product Engineering Company",
  description:
    "About OmGeaks — an AI & Product Engineering IT company building AI agents, business automation, enterprise software, mobile apps, CRM, and cloud platforms worldwide.",
  alternates: { canonical: "https://omgeaks.com/about" },
  openGraph: {
    title: "About OmGeaks | AI & Product Engineering Company",
    description:
      "Senior-led IT company specializing in AI agents, automation, and production software systems.",
    url: "https://omgeaks.com/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
