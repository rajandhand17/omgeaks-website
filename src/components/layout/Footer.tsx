"use client";

import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SocialLinks } from "@/components/layout/SocialLinks";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, COMPANY, FOOTER_SERVICE_LINKS } from "@/lib/constants";
import { formatCompanyAddress } from "@/lib/seo";

/** Footer uses the FULL logo (icon + OMGEAKS wordmark) */
export function Footer() {
  return (
    <footer className="relative section-pad border-t border-[rgba(0,59,115,0.08)] bg-white pb-10 pt-16 md:pt-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-md">
            <Logo variant="full" className="h-20 md:h-24" />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              OmGeaks Pvt. Ltd. — software company in Samrala, Ludhiana (Punjab) building custom
              software, websites, mobile apps, and AI systems for businesses worldwide.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button href="/contact" variant="primary" className="!px-6 !py-2.5 text-xs">
                Get a Free Quote
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
                Services
              </p>
              {FOOTER_SERVICE_LINKS.map((l) => (
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
              <a
                href={COMPANY.googleBusinessProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="link-lux block text-navy/55"
              >
                {formatCompanyAddress()}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-[rgba(0,59,115,0.08)] pt-6 text-xs text-navy/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OmGeaks Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy" className="link-lux">
              Privacy
            </Link>
            <Link href="/terms" className="link-lux">
              Terms
            </Link>
            <span className="text-navy/30">Software · Websites · Mobile Apps</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
