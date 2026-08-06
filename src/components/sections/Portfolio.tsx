"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PORTFOLIO } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";

const accents = [
  "from-sky/15 via-white to-deep-blue/8",
  "from-orange/12 via-white to-gold/15",
  "from-gold/15 via-white to-sky/12",
  "from-deep-blue/8 via-white to-orange/12",
] as const;

export function Portfolio() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="work">
      <SectionHeading
        eyebrow="Outcomes"
        title="Work measured by what changed in the business"
        description="Selected engagements across finance, healthcare, commerce, and enterprise operations."
      />

      <div ref={ref} className="grid gap-4 md:grid-cols-2">
        {PORTFOLIO.map((project, i) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="group overflow-hidden rounded-3xl border border-[rgba(0,59,115,0.08)] bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(5,25,55,0.07)]"
          >
            <div
              className={`relative flex h-36 items-end bg-gradient-to-br ${accents[i % accents.length]} p-5 sm:h-40`}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-navy/45">
                {project.category}
              </p>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-xl font-semibold text-navy">{project.title}</h3>
                <span className="shrink-0 text-xs text-navy/35">{project.year}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.description}</p>
              <p className="mt-4 text-sm font-semibold text-deep-blue">{project.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-bg-soft px-2.5 py-1 text-[10px] font-medium text-navy/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </Section>
  );
}
