"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { DeviceStage } from "@/components/work/DeviceStage";
import { Button } from "@/components/ui/Button";
import { WORK_CATEGORIES, WORK_PROJECTS, type WorkCategory } from "@/lib/work";

export function WorkGallery() {
  const [filter, setFilter] = useState<WorkCategory>("All");
  const items = useMemo(
    () => (filter === "All" ? WORK_PROJECTS : WORK_PROJECTS.filter((p) => p.category === filter)),
    [filter]
  );

  return (
    <div>
      <div className="mb-10 flex flex-wrap gap-2">
        {WORK_CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition ${
              filter === cat
                ? "bg-navy text-white"
                : "border border-[rgba(0,59,115,0.12)] bg-white text-navy/60 hover:border-sky/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-16 md:space-y-24">
        {items.map((project, i) => (
          <motion.article
            key={project.id}
            id={project.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
          >
            <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
              <DeviceStage project={project} featured={i === 0 && filter === "All"} />
            </div>
            <div className={i % 2 === 1 ? "lg:order-1" : undefined}>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky">
                {project.eyebrow}
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold text-navy md:text-4xl">
                {project.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted md:text-lg">{project.description}</p>
              <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2 text-sm text-navy/75">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                    {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-[rgba(0,59,115,0.1)] bg-[#f5f8fc] px-3 py-1 text-[11px] text-navy/65"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <div className="mt-8">
                <Button href="/contact" variant="primary">
                  Build something like this
                </Button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
