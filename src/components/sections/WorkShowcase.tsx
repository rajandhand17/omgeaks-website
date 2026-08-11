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
    eyebrow: "Live AI demo",
    title: "Aether Agent Core",
    body: "A cinematic neural core — orbital guardrails, live spark fields, and node-to-node intelligence. This is how OmGeaks presents AI: premium, spatial, and production-minded.",
    stack: ["LLM agents", "Three.js", "Guardrails", "Realtime"],
  },
  {
    id: "lumina",
    variant: "commerce" as const,
    eyebrow: "Luxury product demo",
    title: "Lumina Commerce Stage",
    body: "Gold-lit 3D merchandising for brands that must feel expensive on first glance — jewellery, fashion, D2C. WebGL staging plus conversion-first storefront language.",
    stack: ["WebGL", "eCommerce UX", "Next.js", "Brand 3D"],
  },
  {
    id: "helios",
    variant: "ops" as const,
    eyebrow: "Ops hologram",
    title: "Helios Command Bars",
    body: "A holographic operations ring for CRMs, clinics, and control rooms — pulsing telemetry columns, orbital status, and the visual language of a high-end command deck.",
    stack: ["3D data", "Cloud ops", "Realtime UI", "Dashboards"],
  },
] as const;

const COMING_SOON = [
  {
    code: "01",
    title: "OmGeaks Aether OS",
    status: "In design · Q4 2026",
    audience: "Founders, agencies, and ops-heavy SMEs",
    summary:
      "A private AI operations layer: agents that read CRM, WhatsApp, and documents, then execute tasks with logs and human approval. Built as a product OmGeaks will run for clients — not a one-off chatbot.",
    details: [
      "Multi-agent workspace with role-based access",
      "WhatsApp + email + CRM connectors",
      "Audit trail and confidence-based escalation",
      "White-label option for agencies",
    ],
    stack: "Next.js · FastAPI · LLM tools · n8n",
    next: "Private design partner round — 6 seats",
  },
  {
    code: "02",
    title: "Meridian 3D Store",
    status: "Prototype · Q1 2027",
    audience: "Fashion, jewellery, and premium D2C brands",
    summary:
      "A luxury eCommerce kit: cinematic 3D product staging, studio lighting, and a checkout path designed for Indian payments. The storefront should feel like a flagship, not a template.",
    details: [
      "WebGL product viewers with material presets",
      "UPI / Razorpay checkout and GST invoicing",
      "Inventory, variants, and order ops",
      "SEO schema for product and collection pages",
    ],
    stack: "Next.js · Three.js · Razorpay · Schema.org",
    next: "Interactive prototype on selected SKUs",
  },
  {
    code: "03",
    title: "Pulse Clinic Intelligence",
    status: "Research · 2027",
    audience: "Clinics and diagnostic centres in India",
    summary:
      "Healthcare operations with a calm clinical UI: appointment intelligence, document agents, and staff roles. Architecture is compliance-minded from day one — privacy, access, and audit.",
    details: [
      "Appointment + reminder automation",
      "Secure document summarisation",
      "Role-based staff access",
      "Compliance-minded data architecture",
    ],
    stack: "Flutter / web · Python · encrypted storage",
    next: "Clinic discovery interviews in Punjab",
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
          description="Interactive product studies at the graphic standard OmGeaks ships for ambitious websites, software, and apps. Not mock screenshots — live WebGL."
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
              <div className="relative h-72 sm:h-80">
                <LuxuryDemoCanvas variant={demo.variant} />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy to-transparent" />
                <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-sky backdrop-blur-md">
                  Live 3D
                </span>
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
          description="Detailed roadmap — each line is a real product track OmGeaks is designing for 2026–27, with audience, stack, and the next milestone."
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
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-orange">
                  For {item.audience}
                </p>
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
                <div className="mt-5 flex flex-wrap gap-3 text-xs text-navy/55">
                  <span className="rounded-full border border-[rgba(0,59,115,0.1)] bg-[#f5f8fc] px-3 py-1">
                    Stack · {item.stack}
                  </span>
                  <span className="rounded-full border border-[rgba(0,59,115,0.1)] bg-[#f5f8fc] px-3 py-1">
                    Next · {item.next}
                  </span>
                </div>
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
