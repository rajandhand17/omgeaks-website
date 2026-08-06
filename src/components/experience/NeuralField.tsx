"use client";

import { useEffect, useRef } from "react";
import {
  createOGTargets,
  dist,
  nodeColor,
  randomInUnit,
  type Vec2,
} from "@/lib/neural";

type Node = {
  pos: Vec2;
  home: Vec2;
  target: Vec2;
  vel: Vec2;
  r: number;
  phase: number;
};

type Pulse = { a: number; b: number; t: number; speed: number };

type NeuralFieldProps = {
  className?: string;
  density?: number;
};

/**
 * Animated neural field that morphs toward the OG mark,
 * reacts to cursor, and streams data along edges.
 */
export function NeuralField({ className, density = 1 }: NeuralFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = createOGTargets();
    const count = Math.round(targets.length * density);

    let nodes: Node[] = targets.slice(0, count).map((t, i) => {
      const scatter = randomInUnit();
      return {
        pos: { ...scatter },
        home: { ...scatter },
        target: { ...t },
        vel: { x: 0, y: 0 },
        r: 1.6 + (i % 4) * 0.45,
        phase: Math.random() * Math.PI * 2,
      };
    });

    // Extra ambient nodes for depth
    const ambient = Math.round(28 * density);
    for (let i = 0; i < ambient; i++) {
      const p = randomInUnit();
      nodes.push({
        pos: { ...p },
        home: { ...p },
        target: {
          x: 0.15 + Math.random() * 0.7,
          y: 0.12 + Math.random() * 0.76,
        },
        vel: { x: 0, y: 0 },
        r: 1.1 + Math.random(),
        phase: Math.random() * Math.PI * 2,
      });
    }

    let pulses: Pulse[] = [];
    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let start = performance.now();
    let morph = 0;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
        active: true,
      };
    };
    const onLeave = () => {
      mouse.current.active = false;
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    const linkDist = 0.14;

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      morph = reduced ? 1 : Math.min(1, t / 2.4);

      ctx.clearRect(0, 0, w, h);

      // Soft vignette lighting
      const g = ctx.createRadialGradient(
        w * (0.35 + mouse.current.x * 0.15),
        h * (0.4 + mouse.current.y * 0.1),
        0,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.72
      );
      g.addColorStop(0, "rgba(0,174,239,0.07)");
      g.addColorStop(0.45, "rgba(251,176,59,0.04)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      // Evolve nodes
      for (const n of nodes) {
        const breathe = reduced
          ? 0
          : Math.sin(t * 0.9 + n.phase) * 0.008 + Math.cos(t * 0.55 + n.phase * 1.3) * 0.006;
        const tx = n.target.x + breathe;
        const ty = n.target.y + Math.sin(t * 0.7 + n.phase) * 0.006;
        const mx = n.home.x + (tx - n.home.x) * morph;
        const my = n.home.y + (ty - n.home.y) * morph;

        let ax = (mx - n.pos.x) * 0.045;
        let ay = (my - n.pos.y) * 0.045;

        if (mouse.current.active && !reduced) {
          const dx = n.pos.x - mouse.current.x;
          const dy = n.pos.y - mouse.current.y;
          const d = Math.hypot(dx, dy) || 0.0001;
          if (d < 0.18) {
            const force = (0.18 - d) * 0.012;
            ax += (dx / d) * force;
            ay += (dy / d) * force;
          }
        }

        n.vel.x = (n.vel.x + ax) * 0.86;
        n.vel.y = (n.vel.y + ay) * 0.86;
        n.pos.x += n.vel.x;
        n.pos.y += n.vel.y;
      }

      // Edges
      const edges: [number, number][] = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (dist(nodes[i].pos, nodes[j].pos) < linkDist) {
            edges.push([i, j]);
          }
        }
      }

      ctx.lineWidth = 1;
      for (const [i, j] of edges) {
        const a = nodes[i].pos;
        const b = nodes[j].pos;
        const midX = (a.x + b.x) / 2;
        const grad = ctx.createLinearGradient(a.x * w, a.y * h, b.x * w, b.y * h);
        if (midX < 0.45) {
          grad.addColorStop(0, "rgba(0,174,239,0.28)");
          grad.addColorStop(1, "rgba(0,59,115,0.12)");
        } else if (midX < 0.55) {
          grad.addColorStop(0, "rgba(0,174,239,0.2)");
          grad.addColorStop(1, "rgba(241,90,36,0.22)");
        } else {
          grad.addColorStop(0, "rgba(241,90,36,0.28)");
          grad.addColorStop(1, "rgba(251,176,59,0.2)");
        }
        ctx.strokeStyle = grad;
        ctx.beginPath();
        ctx.moveTo(a.x * w, a.y * h);
        ctx.lineTo(b.x * w, b.y * h);
        ctx.stroke();
      }

      // Spawn pulses
      if (!reduced && edges.length && Math.random() < 0.08) {
        const e = edges[(Math.random() * edges.length) | 0];
        pulses.push({ a: e[0], b: e[1], t: 0, speed: 0.012 + Math.random() * 0.02 });
      }
      pulses = pulses.filter((p) => p.t < 1);
      for (const p of pulses) {
        p.t += p.speed;
        const a = nodes[p.a]?.pos;
        const b = nodes[p.b]?.pos;
        if (!a || !b) continue;
        const x = (a.x + (b.x - a.x) * p.t) * w;
        const y = (a.y + (b.y - a.y) * p.t) * h;
        const col = nodeColor(a.x + (b.x - a.x) * p.t);
        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.85 * (1 - Math.abs(p.t - 0.5) * 1.4);
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Nodes
      for (const n of nodes) {
        const x = n.pos.x * w;
        const y = n.pos.y * h;
        const col = nodeColor(n.pos.x);
        const pulse = 0.7 + Math.sin(t * 2.2 + n.phase) * 0.3;

        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.globalAlpha = 0.18 * pulse;
        ctx.arc(x, y, n.r * 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.globalAlpha = 0.95;
        ctx.fillStyle = "#ffffff";
        ctx.arc(x, y, n.r + 0.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = col;
        ctx.arc(x, y, n.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Center brand glow accent
      ctx.beginPath();
      ctx.fillStyle = "rgba(0,174,239,0.04)";
      ctx.arc(w * 0.34, h * 0.48, Math.min(w, h) * 0.12, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = "rgba(241,90,36,0.04)";
      ctx.arc(w * 0.66, h * 0.48, Math.min(w, h) * 0.12, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
