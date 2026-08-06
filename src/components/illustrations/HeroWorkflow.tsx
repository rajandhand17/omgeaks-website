"use client";

import { motion } from "framer-motion";

const nodes = [
  { id: "ingest", label: "Ingest", x: 12, y: 28, color: "sky" },
  { id: "reason", label: "Reason", x: 38, y: 18, color: "deep" },
  { id: "act", label: "Act", x: 64, y: 28, color: "orange" },
  { id: "learn", label: "Learn", x: 88, y: 42, color: "gold" },
  { id: "memory", label: "Memory", x: 38, y: 58, color: "sky" },
  { id: "tools", label: "Tools", x: 64, y: 68, color: "orange" },
] as const;

const edges = [
  [0, 1],
  [1, 2],
  [2, 3],
  [1, 4],
  [4, 5],
  [2, 5],
  [4, 2],
] as const;

const fill: Record<string, string> = {
  sky: "#00AEEF",
  deep: "#003B73",
  orange: "#F15A24",
  gold: "#FBB03B",
};

/** Elegant AI workflow illustration inspired by brand gradients & node motifs */
export function HeroWorkflow() {
  return (
    <div className="relative aspect-[4/3] w-full">
      <div className="glass absolute inset-0 overflow-hidden rounded-[1.75rem] sm:rounded-[2rem]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f5f8fc] via-white to-[#fff8f0]" />
        <div className="grid-fade absolute inset-0 opacity-70" />

        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <linearGradient id="wf-edge" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00AEEF" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#F15A24" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#FBB03B" stopOpacity="0.55" />
            </linearGradient>
            <filter id="wf-glow">
              <feGaussianBlur stdDeviation="1.2" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {edges.map(([a, b], i) => {
            const n1 = nodes[a];
            const n2 = nodes[b];
            return (
              <motion.line
                key={`${a}-${b}`}
                x1={n1.x}
                y1={n1.y}
                x2={n2.x}
                y2={n2.y}
                stroke="url(#wf-edge)"
                strokeWidth="0.35"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.4 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              />
            );
          })}

          {nodes.map((n, i) => (
            <g key={n.id}>
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="5.5"
                fill="white"
                stroke={fill[n.color]}
                strokeWidth="0.45"
                filter="url(#wf-glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.55 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: `${n.x}px ${n.y}px` }}
              />
              <motion.circle
                cx={n.x}
                cy={n.y}
                r="1.8"
                fill={fill[n.color]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              />
              <motion.text
                x={n.x}
                y={n.y + 9.5}
                textAnchor="middle"
                fill="#051937"
                fontSize="2.6"
                fontFamily="var(--font-space-grotesk), system-ui, sans-serif"
                fontWeight="600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 0.85 + i * 0.08 }}
              >
                {n.label}
              </motion.text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between sm:bottom-5 sm:left-5 sm:right-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-navy/40">
            Agent workflow
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky" />
            <span className="text-[10px] text-navy/45">Live orchestration</span>
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gradient-to-br from-sky/30 to-transparent blur-2xl sm:h-32 sm:w-32"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-6 -left-4 h-28 w-28 rounded-full bg-gradient-to-tr from-orange/20 to-gold/20 blur-2xl"
        aria-hidden
      />
    </div>
  );
}
