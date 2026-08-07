"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";
import { RiDoubleQuotesL } from "react-icons/ri";

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client voice"
        title="What partners value in how we work"
        description="Themes we hear repeatedly: production rigor, clear communication, and outcomes that compound."
        align="center"
      />

      <div ref={ref} className="grid gap-5 md:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex h-full flex-col rounded-3xl p-6 sm:p-7"
          >
            <RiDoubleQuotesL className="h-6 w-6 text-sky/50" />
            <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy/75">&ldquo;{t.quote}&rdquo;</p>
            <footer className="mt-6 border-t border-[rgba(0,59,115,0.08)] pt-4">
              <p className="font-display text-sm font-semibold text-navy">{t.name}</p>
              <p className="mt-0.5 text-xs text-muted">{t.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}
