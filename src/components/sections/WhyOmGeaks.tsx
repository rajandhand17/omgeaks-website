"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { DIFFERENTIATORS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";

/** Why trust OmGeaks — one purpose: differentiation */
export function WhyOmGeaks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <Section id="why">
      <SectionHeading
        eyebrow="Why OmGeaks"
        title="Built for companies that need systems, not slides"
        description="Four reasons teams choose us when the work has to run in production."
      />

      <div ref={ref} className="grid gap-4 md:grid-cols-2">
        {DIFFERENTIATORS.map((item, i) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white/80 p-6 transition hover:border-sky/25 hover:shadow-[0_16px_40px_rgba(5,25,55,0.06)] sm:p-7"
          >
            <span className="font-display text-xs font-bold tracking-[0.2em] text-sky">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 font-display text-lg font-semibold text-navy">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
