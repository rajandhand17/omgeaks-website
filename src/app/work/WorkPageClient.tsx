"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { Footer } from "@/components/layout/Footer";
import { WorkGallery } from "@/components/work/WorkGallery";
import { Button } from "@/components/ui/Button";

export function WorkPageClient() {
  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar visible />
      <ContactDock />
      <AIAssistant />
      <SmoothScroll>
        <main className="relative z-10">
          <section className="section-pad relative overflow-hidden pb-12 pt-32 md:pb-16 md:pt-40">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="aurora left-1/4 top-1/4 h-[35vw] w-[35vw] bg-sky/15" />
              <div className="aurora bottom-1/4 right-1/4 h-[30vw] w-[30vw] bg-orange/12" />
            </div>
            <div className="relative z-10 mx-auto max-w-[1200px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl"
              >
                <p className="eyebrow mb-4">Work &amp; demos</p>
                <h1 className="font-display text-4xl font-bold leading-[1.08] text-navy md:text-5xl lg:text-6xl">
                  Websites, apps, CRMs — shown like a{" "}
                  <span className="text-gradient">product film</span>
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
                  Each demo is a real product type OmGeaks builds: lifestyle device mockups, 3D
                  motion, and a clear description of what ships. Not icon grids. Not stock screenshots.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="section-pad pb-24 pt-0">
            <div className="mx-auto max-w-[1200px]">
              <WorkGallery />
              <div className="mt-20 rounded-[1.75rem] border border-[rgba(0,59,115,0.1)] bg-navy px-8 py-12 text-center text-white md:px-14">
                <h2 className="font-display text-3xl font-semibold">Have a brand that needs this standard?</h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-white/65">
                  Cafés, jewellery, clinics, D2C, and internal software — we design the product and
                  the film it deserves.
                </p>
                <div className="mt-8 flex justify-center">
                  <Button href="/contact" variant="primary" className="!bg-white !text-navy">
                    Start a project
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
