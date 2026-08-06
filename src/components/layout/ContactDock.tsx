"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { Logo } from "@/components/brand/Logo";
import { COMPANY } from "@/lib/brand";
import { cn } from "@/lib/utils";

type DockItemProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  glow: string;
  children: ReactNode;
  className?: string;
};

function DockItem({ label, href, onClick, glow, children, className }: DockItemProps) {
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const btnRef = useRef<HTMLElement | null>(null);

  const spawnRipple = (e: React.MouseEvent | React.PointerEvent) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
    setTimeout(() => setRipples((r) => r.filter((p) => p.id !== id)), 600);
  };

  const inner = (
    <>
      <span className="sr-only">{label}</span>
      <span
        className="pointer-events-none absolute -top-9 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/60 bg-navy/90 px-2.5 py-1 text-[10px] font-medium tracking-wide text-white opacity-0 shadow-lg backdrop-blur-md transition duration-300 group-hover/item:opacity-100 group-hover/item:-translate-y-0.5"
        aria-hidden
      >
        {label}
      </span>
      <span
        className={cn(
          "pointer-events-none absolute inset-0 rounded-full opacity-0 blur-md transition duration-400 group-hover/item:opacity-100",
          glow
        )}
        aria-hidden
      />
      <span className="relative z-10 flex items-center justify-center">{children}</span>
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          className="pointer-events-none absolute rounded-full bg-white/50"
          style={{ left: r.x, top: r.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
          initial={{ scale: 0, opacity: 0.55 }}
          animate={{ scale: 8, opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </>
  );

  const classes = cn(
    "group/item relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full",
    "border border-white/70 bg-white/75 text-navy shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]",
    "backdrop-blur-md transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky/40",
    className
  );

  const spring = {
    type: "spring" as const,
    stiffness: 420,
    damping: 22,
    mass: 0.6,
  };

  if (href) {
    return (
      <motion.a
        ref={(n) => {
          btnRef.current = n;
        }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={classes}
        onClick={spawnRipple}
        whileHover={{ y: -4, scale: 1.1 }}
        whileTap={{ scale: 0.94 }}
        transition={spring}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={(n) => {
        btnRef.current = n;
      }}
      type="button"
      aria-label={label}
      className={classes}
      onClick={(e) => {
        spawnRipple(e);
        onClick?.();
      }}
      whileHover={{ y: -4, scale: 1.1 }}
      whileTap={{ scale: 0.94 }}
      transition={spring}
    >
      {inner}
    </motion.button>
  );
}

/** Floating dock: WhatsApp + scroll-to-top only */
export function ContactDock() {
  const [visible, setVisible] = useState(true);
  const [showTop, setShowTop] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;

      setShowTop(y > 500);

      if (y < 48) {
        setVisible(true);
      } else if (delta > 8) {
        setVisible(false);
      } else if (delta < -8) {
        setVisible(true);
      }

      lastY.current = y;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-50 sm:bottom-7 sm:right-6">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto"
          >
            <div
              className={cn(
                "relative flex items-center gap-2 rounded-full px-2.5 py-2",
                "border border-white/70 bg-white/55 shadow-[0_18px_50px_rgba(5,25,55,0.14),inset_0_1px_0_rgba(255,255,255,0.85)]",
                "backdrop-blur-xl backdrop-saturate-150"
              )}
            >
              <div
                className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-sky/10 via-transparent to-orange/10"
                aria-hidden
              />

              <DockItem
                label="Chat on WhatsApp"
                href={COMPANY.whatsapp}
                glow="bg-[#25D366]/40"
                className="text-[#25D366]"
              >
                <FaWhatsapp className="h-[1.15rem] w-[1.15rem]" />
              </DockItem>

              <AnimatePresence initial={false}>
                {showTop && (
                  <motion.div
                    key="top"
                    initial={{ width: 0, opacity: 0, scale: 0.7 }}
                    animate={{ width: "auto", opacity: 1, scale: 1 }}
                    exit={{ width: 0, opacity: 0, scale: 0.7 }}
                    transition={{ type: "spring", stiffness: 400, damping: 26 }}
                    className="overflow-hidden"
                  >
                    <div className="flex items-center gap-2 pl-0.5">
                      <span className="h-6 w-px bg-navy/10" aria-hidden />
                      <DockItem
                        label="Back to top"
                        glow="bg-gradient-to-br from-sky/40 to-orange/35"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                      >
                        <Logo variant="icon" className="h-5 w-auto" />
                      </DockItem>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** @deprecated Use ContactDock */
export const ScrollToTop = ContactDock;
