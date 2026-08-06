"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

const NODES = [
  "Sense",
  "Reason",
  "Act",
  "Learn",
  "Scale",
] as const;

/** Cinematic bridge: neural story between hero and product sections */
export function EcosystemBridge() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const line = useTransform(scrollYProgress, [0.15, 0.55], [0, 1]);

  return (
    <section ref={ref} className="section-pad relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-1/2 top-0 h-px w-[min(90%,56rem)] -translate-x-1/2 bg-gradient-to-r from-transparent via-sky/40 to-transparent" />
        <div className="absolute left-[12%] top-1/3 h-56 w-56 rounded-full bg-sky/10 blur-3xl" />
        <div className="absolute right-[10%] bottom-1/4 h-56 w-56 rounded-full bg-orange/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mx-auto mb-4 justify-center"
        >
          Connected intelligence
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-3xl font-display text-[1.85rem] font-bold leading-[1.12] tracking-tight text-navy sm:text-4xl md:text-[2.6rem]"
        >
          One ecosystem. Agents, automation, and products{" "}
          <span className="text-gradient">operating as one system</span>.
        </motion.h2>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-[8%] right-[8%] top-1/2 h-px -translate-y-1/2 bg-navy/10" />
          <motion.div
            className="absolute left-[8%] top-1/2 h-0.5 origin-left -translate-y-1/2 bg-gradient-to-r from-sky via-orange to-gold"
            style={{ scaleX: line, width: "84%" }}
          />

          <div className="relative grid grid-cols-5 gap-2">
            {NODES.map((node, i) => (
              <motion.div
                key={node}
                initial={{ opacity: 0, y: 20, scale: 0.85 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex flex-col items-center gap-3"
              >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white bg-white shadow-[0_10px_30px_rgba(5,25,55,0.08)] sm:h-14 sm:w-14">
                  <span
                    className="absolute inset-0 animate-pulse-glow rounded-full opacity-50"
                    style={{
                      background:
                        i < 2
                          ? "radial-gradient(circle, rgba(0,174,239,0.35), transparent 70%)"
                          : i > 2
                            ? "radial-gradient(circle, rgba(241,90,36,0.35), transparent 70%)"
                            : "radial-gradient(circle, rgba(251,176,59,0.4), transparent 70%)",
                    }}
                  />
                  <span
                    className="relative h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
                    style={{
                      background: i < 2 ? "#00AEEF" : i > 2 ? "#F15A24" : "#FBB03B",
                    }}
                  />
                </span>
                <span className="font-display text-[11px] font-semibold tracking-wide text-navy sm:text-sm">
                  {node}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
