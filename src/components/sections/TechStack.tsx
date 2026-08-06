"use client";

import {
  SiPython,
  SiLaravel,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiDocker,
  SiN8N,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { RiSparkling2Line } from "react-icons/ri";
import { motion, useInView } from "framer-motion";
import { useRef, type ComponentType } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Container";

type IconType = ComponentType<{ className?: string }>;

const ICONS: { name: string; Icon: IconType }[] = [
  { name: "Python", Icon: SiPython },
  { name: "Laravel", Icon: SiLaravel },
  { name: "FastAPI", Icon: SiFastapi },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Flutter", Icon: SiFlutter },
  { name: "Docker", Icon: SiDocker },
  { name: "AWS", Icon: FaAws },
  { name: "OpenAI", Icon: RiSparkling2Line },
  { name: "n8n", Icon: SiN8N },
];

export function TechStack() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <Section id="tech" divider>
      <SectionHeading
        eyebrow="Stack"
        title="Technologies we ship with"
        description="Python, FastAPI, React, Next.js, Flutter, Docker, AWS, OpenAI, n8n — production tools, not slideware."
        align="center"
      />

      <div
        ref={ref}
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 md:gap-4"
      >
        {ICONS.map(({ name, Icon }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
            className="glass group flex flex-col items-center justify-center gap-3 rounded-2xl px-4 py-6 transition duration-400 hover:-translate-y-1 hover:border-sky/25"
          >
            <Icon className="h-7 w-7 text-navy/70 transition group-hover:text-deep-blue sm:h-8 sm:w-8" />
            <span className="text-xs font-medium tracking-wide text-navy/55">{name}</span>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
