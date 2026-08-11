"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";
import { RiStarFill } from "react-icons/ri";

export function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="testimonials">
      <SectionHeading
        eyebrow="Client reviews"
        title="What clients say after we ship."
        description="Real partnership language — craft, speed, and systems that keep working after launch."
        align="center"
      />

      <div ref={ref} className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {TESTIMONIALS.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="glass flex h-full flex-col rounded-3xl p-6 sm:p-7"
          >
            <div className="flex gap-0.5 text-gold" aria-label={`${t.rating} star rating`}>
              {Array.from({ length: t.rating }).map((_, s) => (
                <RiStarFill key={s} className="h-4 w-4" />
              ))}
            </div>
            <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-navy/75">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-6 flex items-center gap-3 border-t border-[rgba(0,59,115,0.08)] pt-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-sky to-orange text-xs font-bold text-white">
                {t.name
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </span>
              <div>
                <p className="font-display text-sm font-semibold text-navy">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted">{t.role}</p>
              </div>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </Section>
  );
}
