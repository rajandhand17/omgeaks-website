"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/brand/Logo";

type LoaderProps = {
  onComplete: () => void;
};

/** Cinematic boot — OG icon only, ring pulse, neural glow */
export function Loader({ onComplete }: LoaderProps) {
  const [done, setDone] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1100);
    const t3 = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 650);
    }, 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-white"
          exit={{ opacity: 0, filter: "blur(12px)", scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Initializing OmGeaks systems"
          role="status"
        >
          <div className="absolute inset-0" aria-hidden>
            <motion.div
              className="absolute left-1/2 top-1/2 h-[55vmax] w-[55vmax] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(0,174,239,0.22), rgba(241,90,36,0.12) 45%, transparent 70%)",
              }}
              animate={{ scale: [0.85, 1.08, 0.95], rotate: [0, 25] }}
              transition={{ duration: 3.2, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute left-[30%] top-[35%] h-40 w-40 rounded-full bg-sky/25 blur-3xl"
              animate={{ x: [0, 30, -10], y: [0, -20, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute right-[28%] bottom-[32%] h-44 w-44 rounded-full bg-orange/20 blur-3xl"
              animate={{ x: [0, -25, 15], y: [0, 15, -10] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44">
              <motion.span
                className="absolute inset-0 rounded-full border border-sky/30"
                animate={{ rotate: 360, scale: phase >= 1 ? [1, 1.08, 1] : 1 }}
                transition={{
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                  scale: { duration: 1.6, repeat: Infinity, ease: "easeInOut" },
                }}
              />
              <motion.span
                className="absolute inset-3 rounded-full border border-dashed border-orange/35"
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                className="absolute inset-6 rounded-full border border-gold/25"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: phase >= 1 ? 1 : 0, scale: phase >= 1 ? 1 : 0.8 }}
              />

              <motion.div
                initial={{ scale: 0.7, opacity: 0, filter: "blur(10px)" }}
                animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="relative"
              >
                <div className="absolute inset-[-40%] animate-pulse-glow rounded-full bg-gradient-to-br from-sky/30 to-orange/25 blur-2xl" />
                <Logo variant="icon" className="relative h-16 sm:h-20" priority />
              </motion.div>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: phase >= 2 ? 1 : 0, y: phase >= 2 ? 0 : 8 }}
              className="mt-8 text-[10px] font-semibold uppercase tracking-[0.32em] text-navy/40"
            >
              Systems initializing
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
