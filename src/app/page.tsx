"use client";

import { useCallback, useState } from "react";
import { Loader } from "@/components/layout/Loader";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { Footer } from "@/components/layout/Footer";
import { CursorAura } from "@/components/experience/CursorAura";
import { Hero } from "@/components/sections/Hero";
import { WhyOmGeaks } from "@/components/sections/WhyOmGeaks";
import { TechStack } from "@/components/sections/TechStack";
import { Services } from "@/components/sections/Services";
import { AIAgents } from "@/components/sections/AIAgents";
import { Industries } from "@/components/sections/Industries";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";
import { HomeJsonLd } from "@/components/seo/HomeJsonLd";

export default function HomePage() {
  const [ready, setReady] = useState(false);
  const onComplete = useCallback(() => setReady(true), []);

  return (
    <>
      <HomeJsonLd />
      <Loader onComplete={onComplete} />
      <div className="noise-overlay" aria-hidden />
      <CursorAura />
      <Navbar visible={ready} />
      <ContactDock />
      <AIAssistant enabled={ready} />
      <SmoothScroll>
        <main className="relative z-10">
          <Hero />
          <WhyOmGeaks />
          <Services />
          <AIAgents />
          <TechStack />
          <Industries />
          <WorkShowcase />
          <Process />
          <Testimonials />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
