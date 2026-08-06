"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

type ScrollMorphProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Section-to-section morph: scale + blur + slide instead of simple fade */
export function ScrollMorph({ children, className, delay = 0 }: ScrollMorphProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [48, 0, 0, -24]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.96, 1, 1, 0.985]);

  return (
    <motion.div
      ref={ref}
      style={{ y, scale }}
      initial={{ opacity: 0, filter: "blur(8px)" }}
      animate={
        inView
          ? { opacity: 1, filter: "blur(0px)" }
          : { opacity: 0, filter: "blur(8px)" }
      }
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

type MorphCardProps = {
  children: ReactNode;
  className?: string;
  index?: number;
};

export function MorphCard({ children, className, index = 0 }: MorphCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={
        inView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 20 }
      }
      transition={{
        duration: 0.55,
        delay: index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      }}
      className={cn(
        "glass group relative overflow-hidden rounded-2xl p-6 [transform-style:preserve-3d] sm:rounded-3xl sm:p-7",
        "hover:border-sky/30 hover:shadow-[0_28px_70px_rgba(5,25,55,0.1),0_0_0_1px_rgba(241,90,36,0.12)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-sky/[0.08] via-transparent to-orange/[0.1]" />
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-sky/25 to-gold/20 blur-2xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
