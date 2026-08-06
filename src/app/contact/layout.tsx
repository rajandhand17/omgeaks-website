import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation with OmGeaks. Call, WhatsApp, or send a project brief — we respond within one business day.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
