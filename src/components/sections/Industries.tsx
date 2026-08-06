"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  RiHeartPulseLine,
  RiBankLine,
  RiBuilding2Line,
  RiBookOpenLine,
  RiShoppingBagLine,
  RiHome5Line,
} from "react-icons/ri";
import { INDUSTRIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";

const ICONS = [
  RiHeartPulseLine,
  RiBankLine,
  RiBuilding2Line,
  RiBookOpenLine,
  RiShoppingBagLine,
  RiHome5Line,
] as const;

export function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="industries">
      <SectionHeading
        eyebrow="Industries"
        title="Domain expertise where precision matters"
        description="We build for regulated, high-stakes environments where reliability is non-negotiable."
      />

      <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((industry, i) => {
          const Icon = ICONS[i];
          return (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="group flex gap-4 rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white/80 p-5 transition duration-400 hover:-translate-y-1 hover:border-sky/25 hover:shadow-[0_16px_40px_rgba(5,25,55,0.06)]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-bg-soft text-deep-blue transition group-hover:bg-gradient-to-br group-hover:from-sky/15 group-hover:to-orange/10">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-navy">{industry.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{industry.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
