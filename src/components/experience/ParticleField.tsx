"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";

type ParticleFieldProps = {
  count?: number;
  className?: string;
};

export function ParticleField({ count = 36, className }: ParticleFieldProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${(i * 37) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 2 + (i % 4),
        delay: (i % 10) * 0.35,
        duration: 8 + (i % 7),
        color: i % 3 === 0 ? "#00AEEF" : i % 3 === 1 ? "#F15A24" : "#FBB03B",
      })),
    [count]
  );

  return (
    <div className={className} aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full opacity-40"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, (p.id % 2 === 0 ? 1 : -1) * 10, 0],
            opacity: [0.15, 0.55, 0.15],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
