"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, COMPANY } from "@/lib/constants";

/** Footer uses the FULL logo (icon + OMGEAKS wordmark) */
export function Footer() {
  return (
    <footer className="relative section-pad border-t border-[rgba(0,59,115,0.08)] bg-white pb-10 pt-16 md:pt-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Logo variant="full" className="h-20 md:h-24" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              AI & Product Engineering company building intelligent agents,
              automation, and enterprise software that scales.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" className="!px-6 !py-2.5 text-xs">
                Book a Consultation
              </Button>
              <SocialLinks />
            </div>
          </div>

          <div className="flex flex-wrap gap-12 text-sm text-navy/55 sm:gap-16">
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy/35">
                Navigate
              </p>
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="link-lux block">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-navy/35">
                Contact
              </p>
              <a href={`mailto:${COMPANY.email}`} className="link-lux block">
                {COMPANY.email}
              </a>
              <a href={`tel:+${COMPANY.phoneRaw}`} className="link-lux block">
                {COMPANY.phone}
              </a>
              <a
                href={COMPANY.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition hover:text-[#25D366]"
              >
                WhatsApp {COMPANY.phone}
              </a>
              <p className="text-navy/40">{COMPANY.location}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[rgba(0,59,115,0.08)] pt-6 text-xs text-navy/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OmGeaks. All rights reserved.</p>
          <p className="text-navy/30">AI & Product Engineering</p>
        </div>
      </div>
    </footer>
  );
}
