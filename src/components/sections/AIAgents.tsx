"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AI_AGENTS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";
import { MorphCard } from "@/components/experience/ScrollMorph";

export function AIAgents() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="agents">
      <SectionHeading
        eyebrow="AI Agents"
        title="Agents designed for production workflows"
        description="Each agent has a job, a tool stack, and escalation rules — so your team can trust what runs unattended."
        align="center"
      />

      <div ref={ref} className="grid gap-4 md:grid-cols-2">
        {AI_AGENTS.map((agent, i) => (
          <MorphCard key={agent.title} index={i} className="!p-6 sm:!p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <span className="rounded-full bg-bg-soft px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-deep-blue">
                {agent.capability}
              </span>
              <span className="font-mono text-[10px] text-navy/40">{agent.stack}</span>
            </div>
            <h3 className="font-display text-xl font-semibold text-navy">{agent.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{agent.description}</p>
            <div className="mt-5 flex items-center gap-2">
              <motion.span
                animate={inView ? { opacity: [0.4, 1, 0.4] } : {}}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
                className="h-1.5 w-1.5 rounded-full bg-sky"
              />
              <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-navy/40">
                Ready for integration
              </span>
            </div>
          </MorphCard>
        ))}
      </div>
    </Section>
  );
}
