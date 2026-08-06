"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";

export function Process() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="process">
      <SectionHeading
        eyebrow="Development Process"
        title="A clear path from idea to production"
        description="Structured delivery with senior ownership at every stage — no black boxes."
      />

      <div ref={ref} className="relative">
        <div
          className="absolute left-[1.15rem] top-4 bottom-4 w-px bg-gradient-to-b from-sky via-orange to-gold md:left-1/2 md:-translate-x-px"
          aria-hidden
        />

        <div className="space-y-8 md:space-y-0">
          {PROCESS_STEPS.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="relative grid gap-4 md:grid-cols-2 md:gap-10 md:py-6"
              >
                <div className={`${left ? "md:pr-12 md:text-right" : "md:col-start-2 md:pl-12"} pl-12 md:pl-0`}>
                  <span className="font-display text-sm font-bold tracking-widest text-sky">
                    {step.step}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-semibold text-navy">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </div>

                <span
                  className="absolute left-3 top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-sky to-orange shadow-[0_0_0_3px_rgba(0,174,239,0.15)] md:left-1/2 md:-translate-x-1/2"
                  aria-hidden
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
