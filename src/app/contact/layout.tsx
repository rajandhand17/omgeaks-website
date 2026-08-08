import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact OmGeaks | Book a Consultation",
  description:
    "Contact OmGeaks — AI & Product Engineering IT company. Email hello@omgeaks.com, WhatsApp, or send a project brief. We respond within one business day.",
  alternates: { canonical: "https://omgeaks.com/contact" },
  openGraph: {
    title: "Contact OmGeaks | Book a Consultation",
    description:
      "Reach OmGeaks for AI agents, automation, custom software, mobile apps, CRM, and cloud projects.",
    url: "https://omgeaks.com/contact",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
