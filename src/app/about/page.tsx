import type { Metadata } from "next";
import { AboutPageClient } from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About",
  description:
    "OmGeaks is an AI & Product Engineering company building AI agents, automation, enterprise software, and cloud platforms for ambitious teams worldwide.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
