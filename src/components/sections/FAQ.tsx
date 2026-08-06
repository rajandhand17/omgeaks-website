"use client";

import { useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { FAQ_ITEMS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Answers before the first call"
        description="Straight answers about how we work, what we build, and how engagements start."
      />

      <div ref={ref} className="mx-auto max-w-3xl space-y-3">
        {FAQ_ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={item.q}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "overflow-hidden rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white transition",
                isOpen && "border-sky/20 shadow-[0_12px_32px_rgba(5,25,55,0.05)]"
              )}
            >
              <button
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span className="font-display text-[0.95rem] font-semibold text-navy sm:text-base">
                  {item.q}
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-bg-soft text-navy/60">
                  {isOpen ? <RiSubtractLine className="h-4 w-4" /> : <RiAddLine className="h-4 w-4" />}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted sm:px-6 sm:pb-6">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
