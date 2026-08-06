"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Agent = {
  name: string;
  status: "active" | "idle" | "deploying";
  load: number;
};

const AGENTS_SEED: Agent[] = [
  { name: "Research", status: "active", load: 72 },
  { name: "Ops Auto", status: "active", load: 58 },
  { name: "Support", status: "idle", load: 18 },
  { name: "Analyst", status: "deploying", load: 91 },
];

const ACTIVITY = [
  "Agent Research synthesized 14 sources",
  "Pipeline deploy → production us-east-1",
  "Automation flow CRM→Slack completed",
  "Cloud scale event: +2 GPU workers",
  "Guardrail check passed · latency 84ms",
  "n8n webhook synced 312 events",
];

function useLiveNumber(base: number, variance: number, interval = 1400) {
  const [v, setV] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setV(base + Math.round((Math.random() - 0.5) * variance));
    }, interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return v;
}

export function CommandDashboard({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-40, 40], [8, -8]);
  const rotateY = useTransform(sx, [-40, 40], [-10, 10]);
  const glareX = useTransform(sx, [-40, 40], [18, 82]);
  const glareY = useTransform(sy, [-40, 40], [18, 82]);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.55), transparent 45%)`;
  const cloudX = useTransform(sx, (v) => v * 0.25);
  const cloudY = useTransform(sy, (v) => v * 0.2);
  const deployX = useTransform(sx, (v) => v * -0.2);
  const deployY = useTransform(sy, (v) => v * 0.25);

  const requests = useLiveNumber(18420, 120);
  const latency = useLiveNumber(84, 18);
  const uptime = useLiveNumber(99, 0);
  const [agents, setAgents] = useState(AGENTS_SEED);
  const [logs, setLogs] = useState(ACTIVITY.slice(0, 4));
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTick((t) => t + 1);
      setAgents((prev) =>
        prev.map((a) => {
          const load = Math.max(8, Math.min(98, a.load + Math.round((Math.random() - 0.45) * 12)));
          let status = a.status;
          if (status === "deploying" && Math.random() > 0.7) status = "active";
          else if (load > 85 && Math.random() > 0.8) status = "deploying";
          else if (status === "idle" && Math.random() > 0.85) status = "active";
          return { ...a, load, status };
        })
      );
      setLogs((prev) => {
        const next = ACTIVITY[Math.floor(Math.random() * ACTIVITY.length)];
        return [next, ...prev].slice(0, 5);
      });
    }, 2200);
    return () => clearInterval(id);
  }, []);

  const bars = useMemo(
    () => Array.from({ length: 18 }, (_, i) => 20 + ((tick + i * 7) % 17) * 4 + (i % 3) * 8),
    [tick]
  );

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width - 0.5) * 80);
    my.set(((e.clientY - r.top) / r.height - 0.5) * 80);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={cn("relative w-full [transform-style:preserve-3d]", className)}
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-sky/20 via-transparent to-orange/20 blur-2xl"
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -right-4 top-8 hidden h-28 w-40 rounded-2xl border border-white/40 bg-white/45 shadow-lg backdrop-blur-md sm:block"
        style={{ x: cloudX, y: cloudY, translateZ: 40 }}
        aria-hidden
      >
        <div className="p-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-navy/40">Cloud</p>
          <p className="mt-1 font-display text-sm font-semibold text-navy">AWS · 4 regions</p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-navy/5">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-sky to-orange"
              animate={{ width: ["42%", "68%", "55%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute -left-3 bottom-16 hidden h-24 w-36 rounded-2xl border border-white/50 bg-white/50 shadow-lg backdrop-blur-md sm:block"
        style={{ x: deployX, y: deployY, translateZ: 55 }}
        aria-hidden
      >
        <div className="p-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-navy/40">Deploy</p>
          <p className="mt-1 font-display text-sm font-semibold text-navy">v2.4.1 live</p>
          <p className="mt-1 text-[10px] text-sky">● healthy</p>
        </div>
      </motion.div>

      <div className="glass-strong relative overflow-hidden rounded-[1.75rem] border border-white/70 p-4 shadow-[0_30px_80px_rgba(5,25,55,0.12)] sm:rounded-[2rem] sm:p-5">
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{ background: glare }}
          aria-hidden
        />

        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-deep-blue">
                AI Operations
              </p>
              <h3 className="font-display text-lg font-semibold text-navy sm:text-xl">
                Command Center
              </h3>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-bg-soft px-3 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-sky/60" />
                <span className="relative h-2 w-2 rounded-full bg-sky" />
              </span>
              <span className="text-[10px] font-medium text-navy/55">Live systems</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { label: "Requests / hr", value: requests.toLocaleString() },
              { label: "P95 latency", value: `${latency}ms` },
              { label: "Uptime", value: `${uptime}.98%` },
            ].map((m) => (
              <div
                key={m.label}
                className="rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white/70 p-3"
              >
                <p className="text-[9px] uppercase tracking-[0.16em] text-navy/40">{m.label}</p>
                <p className="mt-1 font-display text-base font-bold text-navy sm:text-lg">{m.value}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white/60 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/40">
                Agent status
              </p>
              <ul className="space-y-2">
                {agents.map((a) => (
                  <li key={a.name} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        a.status === "active" && "bg-sky",
                        a.status === "idle" && "bg-navy/25",
                        a.status === "deploying" && "animate-pulse bg-orange"
                      )}
                    />
                    <span className="w-16 text-xs font-medium text-navy">{a.name}</span>
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-navy/5">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-sky via-orange to-gold"
                        animate={{ width: `${a.load}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span className="w-8 text-right text-[10px] text-navy/40">{a.load}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white/60 p-3">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/40">
                Throughput
              </p>
              <div className="flex h-24 items-end gap-1">
                {bars.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t-sm bg-gradient-to-t from-sky/80 to-orange/70"
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ opacity: 0.45 + (i % 5) * 0.1 }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-[rgba(0,59,115,0.08)] bg-navy/[0.03] p-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/40">
              Activity stream
            </p>
            <ul className="space-y-1.5">
              {logs.map((line, i) => (
                <motion.li
                  key={`${line}-${i}-${tick}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1 - i * 0.15, x: 0 }}
                  className="truncate font-mono text-[10px] text-navy/55 sm:text-[11px]"
                >
                  <span className="text-sky">›</span> {line}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
