"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Section } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DeviceStage } from "@/components/work/DeviceStage";
import { FEATURED_WORK_IDS, WORK_PROJECTS } from "@/lib/work";

const HOME_DEMOS = WORK_PROJECTS.filter((p) =>
  (FEATURED_WORK_IDS as readonly string[]).includes(p.id)
);

const COMING_SOON = [
  {
    code: "01",
    title: "OmGeaks Aether OS",
    status: "In design · Q4 2026",
    audience: "Founders, agencies, and ops-heavy SMEs",
    summary:
      "A private AI operations layer: agents that read CRM, WhatsApp, and documents, then execute tasks with logs and human approval.",
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
      "A luxury eCommerce kit: cinematic 3D product staging, studio lighting, and Indian payments.",
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
      "Healthcare operations with a calm clinical UI: appointment intelligence, document agents, and staff roles.",
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
          title="Shown like a product film — websites, apps, CRM."
          description="Lifestyle device mockups and 3D motion, then a clear description of what ships. Open the full studio for every category."
        />

        <div ref={ref} className="grid gap-6 md:grid-cols-2">
          {HOME_DEMOS.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/work#${project.id}`} className="group block">
                <DeviceStage project={project} featured={i === 0} />
                <div className="mt-4 px-1">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-sky">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-xl font-semibold text-navy group-hover:text-deep-blue">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{project.summary}</p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/work" variant="primary">
            View all work demos
          </Button>
        </div>
      </Section>

      <Section id="coming-soon" className="!pt-0">
        <SectionHeading
          eyebrow="Coming soon"
          title="Products we are building next."
          description="Detailed roadmap — each line is a real product track OmGeaks is designing for 2026–27."
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
      </Section>
    </>
  );
}
