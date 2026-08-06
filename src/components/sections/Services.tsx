"use client";

import {
  RiRobot2Line,
  RiFlowChart,
  RiOrganizationChart,
  RiSmartphoneLine,
  RiServerLine,
  RiToolsLine,
  RiPuzzleLine,
} from "react-icons/ri";
import { SERVICES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";
import { MorphCard } from "@/components/experience/ScrollMorph";

const ICONS = {
  RiRobot2Line,
  RiFlowChart,
  RiOrganizationChart,
  RiSmartphoneLine,
  RiServerLine,
  RiToolsLine,
  RiPuzzleLine,
} as const;

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        eyebrow="What we build"
        title="Seven capabilities. One engineering standard."
        description="Clear offerings — each designed to connect into a single operating system for your business."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((service, i) => {
          const Icon = ICONS[service.icon as keyof typeof ICONS];
          return (
            <MorphCard key={service.title} index={i} className="!p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky/12 via-white to-orange/10 ring-1 ring-[rgba(0,59,115,0.08)]">
                {Icon && <Icon className="h-5 w-5 text-deep-blue" aria-hidden />}
              </div>
              <h3 className="font-display text-lg font-semibold text-navy">{service.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
              <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky">
                {service.outcome}
              </p>
            </MorphCard>
          );
        })}
      </div>
    </Section>
  );
}
