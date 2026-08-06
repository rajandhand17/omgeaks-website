"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  /** @deprecated Use `hover` */
  hoverTilt?: boolean;
};

export function Card({ children, className, hover, hoverTilt }: CardProps) {
  const enableHover = hover ?? hoverTilt ?? true;

  return (
    <motion.div
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 sm:rounded-3xl sm:p-7",
        "hover:border-sky/25 hover:shadow-[0_24px_60px_rgba(5,25,55,0.08),0_0_0_1px_rgba(241,90,36,0.1)]",
        className
      )}
      whileHover={
        enableHover ? { y: -6, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } } : undefined
      }
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute inset-0 bg-gradient-to-br from-sky/[0.05] via-transparent to-orange/[0.06]" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}

/** @deprecated Use Card */
export const GlassCard = Card;
