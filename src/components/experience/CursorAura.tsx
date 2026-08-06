"use client";

import { useEffect, useState } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

/** Soft brand-light aura that follows the cursor across the page */
export function CursorAura() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const sx = useSpring(x, { stiffness: 180, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 28, mass: 0.4 });
  const bg = useMotionTemplate`radial-gradient(380px circle at ${sx}px ${sy}px, rgba(0,174,239,0.08), rgba(241,90,36,0.04) 30%, transparent 58%)`;

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[45] mix-blend-multiply"
      style={{ background: bg }}
    />
  );
}
