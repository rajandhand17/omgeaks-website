"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { NeuralField } from "@/components/experience/NeuralField";
import { CommandDashboard } from "@/components/experience/CommandDashboard";
import { COMPANY } from "@/lib/brand";

const ease = [0.16, 1, 0.3, 1] as const;

const TRUST = [
  { value: "Software", label: "Custom systems" },
  { value: "Websites", label: "SEO & conversion" },
  { value: "Mobile apps", label: "iOS & Android" },
] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const fieldY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden pt-24 md:pt-28"
    >
      <motion.div style={{ y: fieldY }} className="absolute inset-0 z-0" aria-hidden>
        <NeuralField className="h-full w-full" density={0.85} />
        <div className="absolute inset-0 bg-gradient-to-b from-white/55 via-white/20 to-white" />
        <div className="absolute inset-y-0 left-0 w-[min(100%,32rem)] bg-gradient-to-r from-white via-white/85 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="section-pad relative z-10 mx-auto grid w-full max-w-[1200px] items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-20"
      >
        <div className="flex max-w-xl flex-col items-start">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="eyebrow mb-5"
          >
            AI & Product Engineering · Ludhiana, Punjab
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.16, ease }}
            className="font-display text-[clamp(2.35rem,5.8vw,3.75rem)] font-bold leading-[1.08] tracking-[-0.035em] text-navy"
          >
            OmGeaks — software, websites &amp; mobile apps{" "}
            <span className="text-gradient">engineered for growth</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease }}
            className="mt-5 max-w-lg text-[1.05rem] leading-[1.7] text-muted"
          >
            Official website of OmGeaks Pvt. Ltd. (OmGeaks) — a software company in
            Samrala, Ludhiana, Punjab. We build custom software, websites, mobile apps, and
            AI automation that help your business get found and scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease }}
            className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center"
          >
            <Button href="/contact" variant="primary" className="w-full sm:w-auto">
              Book a Consultation
            </Button>
            <Button
              href={COMPANY.whatsapp}
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Chat on WhatsApp
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="mt-10 grid w-full grid-cols-3 gap-3 border-t border-[rgba(0,59,115,0.08)] pt-6"
          >
            {TRUST.map((item) => (
              <li key={item.value}>
                <p className="font-display text-sm font-semibold text-navy sm:text-base">
                  {item.value}
                </p>
                <p className="mt-0.5 text-[11px] text-muted sm:text-xs">{item.label}</p>
              </li>
            ))}
          </motion.ul>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <CommandDashboard />
          <p className="mt-3 text-center text-[10px] uppercase tracking-[0.18em] text-navy/35 lg:text-left">
            Live operations view · agents · deploys · automation
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
