"use client";

import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const LuxuryDemoCanvas = dynamic(
  () => import("@/components/demos/LuxuryDemoCanvas").then((m) => m.LuxuryDemoCanvas),
  { ssr: false, loading: () => <div className="h-full w-full bg-[#051937]" /> }
);

const DEMOS = [
  {
    id: "aether",
    variant: "agent" as const,
    eyebrow: "AI demo",
    title: "Aether Agent Core",
    body: "Live 3D visualisation of an OmGeaks AI agent — distorted neural core, orbital guardrails, and real-time spark fields. Built to show how intelligence can feel cinematic, not clinical.",
    stack: ["LLM agents", "Three.js", "Guardrails"],
  },
  {
    id: "lumina",
    variant: "commerce" as const,
    eyebrow: "Product demo",
    title: "Lumina Commerce Stage",
    body: "Premium 3D storefront language — floating device cluster, gold/cyan lighting, and luxury product presence for eCommerce and brand sites that need to feel expensive on first glance.",
    stack: ["Next.js", "WebGL", "eCommerce UX"],
  },
  {
    id: "helios",
    variant: "ops" as const,
    eyebrow: "Ops demo",
    title: "Helios Command Bars",
    body: "Animated operations hologram — pulsing performance columns and orbital telemetry. The visual language we use for CRMs, dashboards, and enterprise control rooms.",
    stack: ["Realtime UI", "3D data", "Cloud ops"],
  },
] as const;

const COMING_SOON = [
  {
    code: "01",
    title: "OmGeaks Aether OS",
    status: "In design · Q4 2026",
    summary:
      "A private AI operations layer for businesses — agents that read your CRM, WhatsApp, and documents, then execute tasks with logs and human approval.",
    details: [
      "Multi-agent workspace with role-based access",
      "WhatsApp + email + CRM connectors",
      "Audit trail and confidence-based escalation",
      "White-label option for agencies",
    ],
  },
  {
    code: "02",
    title: "Meridian 3D Store",
    status: "Prototype · Q1 2027",
    summary:
      "A luxury eCommerce kit with 3D product staging, cinematic lighting, and conversion-first checkout — for fashion, jewellery, and premium D2C brands.",
    details: [
      "WebGL product viewers",
      "UPI / Razorpay checkout",
      "Inventory + GST invoicing",
      "SEO schema for product pages",
    ],
  },
  {
    code: "03",
    title: "Pulse Clinic Intelligence",
    status: "Research · 2027",
    summary:
      "A healthcare operations product: appointment intelligence, document agents, and a calm clinical dashboard designed for Indian clinics and diagnostic centres.",
    details: [
      "Appointment + reminder automation",
      "Secure document summarisation",
      "Role-based staff access",
      "Compliance-minded architecture",
    ],
  },
] as const;

export function WorkShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <>
      <Section id="work">
        <SectionHeading
          eyebrow="Work demos"
          title="High-fidelity demos — AI, 3D, and luxury motion."
          description="These are interactive product studies: the graphic and animation standard OmGeaks ships for ambitious websites, software, and apps."
        />

        <div ref={ref} className="grid gap-6 lg:grid-cols-3">
          {DEMOS.map((demo, i) => (
            <motion.article
              key={demo.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden rounded-[1.75rem] border border-[rgba(0,59,115,0.1)] bg-navy shadow-[0_24px_60px_rgba(5,25,55,0.18)]"
            >
              <div className="relative h-56 sm:h-64">
                <LuxuryDemoCanvas variant={demo.variant} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy to-transparent" />
              </div>
              <div className="p-6">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky">
                  {demo.eyebrow}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold text-white">{demo.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{demo.body}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {demo.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-white/70"
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

      <Section id="coming-soon" className="!pt-0">
          <SectionHeading
            eyebrow="Coming soon"
            title="Products we are building next."
            description="Detailed roadmap — not vapour. Each line is a real product track OmGeaks is designing for 2026–27."
          />
          <div className="space-y-4">
            {COMING_SOON.map((item, i) => (
              <motion.article
                key={item.code}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-8%" }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-6 rounded-[1.75rem] border border-[rgba(0,59,115,0.1)] bg-white p-6 md:grid-cols-[7rem_1fr] md:p-8"
              >
                <p className="font-display text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-sky to-orange">
                  {item.code}
                </p>
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-display text-2xl font-semibold text-navy">{item.title}</h3>
                    <span className="rounded-full bg-[#f5f8fc] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-sky">
                      {item.status}
                    </span>
                  </div>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
                    {item.summary}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {item.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-navy/75">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button href="/contact" variant="primary">
              Partner on a coming-soon build
            </Button>
          </div>
      </Section>
    </>
  );
}
