"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { COMPANY } from "@/lib/brand";

export function CTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section className="section-pad relative pb-20 pt-4 md:pb-28">
      <Container className="!px-0">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2rem] px-8 py-14 text-center sm:px-12 sm:py-16 md:rounded-[2.5rem] md:py-20"
        >
          <div className="absolute inset-0 bg-navy" />
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 15% 50%, rgba(0,174,239,0.35), transparent 55%), radial-gradient(ellipse 50% 70% at 90% 40%, rgba(241,90,36,0.3), transparent 50%), radial-gradient(ellipse 40% 50% at 60% 100%, rgba(251,176,59,0.2), transparent 50%)",
            }}
            aria-hidden
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-white/50">
              Contact OmGeaks
            </p>
            <h2 className="mt-4 font-display text-[1.85rem] font-bold leading-tight text-white sm:text-4xl md:text-[2.6rem]">
              Tell us what you want to build
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-[0.98rem] leading-relaxed text-white/65">
              Book a consultation or message us on WhatsApp. We typically respond within one business day.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button
                href="/contact"
                variant="secondary"
                className="w-full !bg-white !text-navy hover:!shadow-[0_12px_32px_rgba(0,174,239,0.25)] sm:w-auto"
              >
                Book a Consultation
              </Button>
              <Button
                href={COMPANY.whatsapp}
                variant="ghost"
                className="w-full !text-white/75 hover:!text-white sm:w-auto"
              >
                WhatsApp us →
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
