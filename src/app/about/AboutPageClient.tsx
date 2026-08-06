"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { WHY_POINTS } from "./content";

export function AboutPageClient() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar visible />
      <ContactDock />
      <AIAssistant />
      <SmoothScroll>
        <main className="relative z-10">
          <section className="section-pad relative overflow-hidden pb-16 pt-32 md:pb-24 md:pt-40">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="aurora left-1/4 top-1/4 h-[35vw] w-[35vw] bg-sky/15" />
              <div className="aurora bottom-1/4 right-1/4 h-[30vw] w-[30vw] bg-orange/12" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1200px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-14 max-w-3xl"
              >
                {/* Full logo on About page */}
                <Logo variant="full" className="mb-8 h-24 md:h-28" priority />
                <p className="eyebrow mb-4">About OmGeaks</p>
                <h1 className="font-display text-4xl font-bold leading-[1.08] text-navy md:text-5xl lg:text-6xl">
                  An AI & Product Engineering company built for{" "}
                  <span className="text-gradient">serious products</span>.
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                  We are not a generic web design agency. OmGeaks engineers AI agents,
                  business automation, enterprise CRM, SaaS platforms, and cloud systems
                  that help ambitious companies scale with confidence.
                </p>
              </motion.div>

              <div className="grid gap-5 md:grid-cols-2">
                {WHY_POINTS.map((point, i) => (
                  <motion.div
                    key={point.title}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, duration: 0.55 }}
                  >
                    <Card className="h-full">
                      <h2 className="font-display text-lg font-semibold text-navy">{point.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              >
                <Button href="/contact" variant="primary">
                  Book a Consultation
                </Button>
                <Button href="/#services" variant="secondary">
                  View Services
                </Button>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
