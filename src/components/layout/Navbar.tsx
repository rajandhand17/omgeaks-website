"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar({ visible }: { visible: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!visible) return null;

  return (
    <motion.header
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "py-2.5" : "py-5"
      )}
    >
      <div className="section-pad mx-auto max-w-[1200px]">
        <div
          className={cn(
            "flex items-center justify-between rounded-full px-4 py-2 transition-all duration-500 sm:px-5 md:px-6",
            scrolled
              ? "glass-strong shadow-[0_14px_40px_rgba(5,25,55,0.08)]"
              : "bg-transparent"
          )}
        >
          {/* OG icon only — never show OMGEAKS wordmark in nav */}
          <Link href="/" className="relative z-10 shrink-0" aria-label="OmGeaks home">
            <Logo variant="icon" className="h-7 w-auto sm:h-8 md:h-9" priority />
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-5 xl:gap-7 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-lux text-[0.8rem] font-medium tracking-wide text-navy/55"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Button href="/contact" variant="primary" className="!px-5 !py-2.5 text-[0.72rem]">
              Get a Quote
            </Button>
          </div>

          <button
            type="button"
            className="relative z-10 flex h-10 w-10 items-center justify-center lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <div className="space-y-1.5">
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-navy transition-transform duration-300",
                  open && "translate-y-[4px] rotate-45"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-navy transition-all duration-300",
                  open && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-5 rounded-full bg-navy transition-transform duration-300",
                  open && "-translate-y-[4px] -rotate-45"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-strong absolute inset-x-4 top-[4.25rem] rounded-3xl p-6 lg:hidden"
          >
            <div className="mb-5 flex justify-center">
              <Logo variant="icon" className="h-10" />
            </div>
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-xl font-semibold text-navy"
                >
                  {link.label}
                </Link>
              ))}
              <Button
                href="/contact"
                className="mt-2 w-full"
                magnetic={false}
                onClick={() => setOpen(false)}
              >
                Get a Quote
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
