import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { Button } from "@/components/ui/Button";
import type { ServicePageContent } from "@/lib/services-pages";
import { SERVICE_PAGES } from "@/lib/services-pages";
import { COMPANY } from "@/lib/brand";
import { formatCompanyAddress } from "@/lib/seo";

export function ServiceLanding({ service }: { service: ServicePageContent }) {
  return (
    <>
      <Navbar visible />
      <ContactDock />
      <SmoothScroll>
        <main className="relative z-10">
          <section className="section-pad border-b border-[rgba(0,59,115,0.08)] bg-gradient-to-b from-[#f5f8fc] to-white pb-16 pt-32 md:pb-20 md:pt-40">
            <div className="mx-auto max-w-[900px]">
              <p className="eyebrow mb-4">OmGeaks services</p>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3.4rem)] font-bold leading-[1.1] tracking-tight text-navy">
                {service.h1}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">{service.intro}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/contact" variant="primary">
                  Start your project
                </Button>
                <Button href={COMPANY.whatsapp} variant="secondary">
                  WhatsApp us
                </Button>
              </div>
              <p className="mt-6 text-sm text-navy/45">
                Based in {formatCompanyAddress()} — serving clients across India & globally.
              </p>
            </div>
          </section>

          <section className="section-pad py-16 md:py-20">
            <div className="mx-auto grid max-w-[1100px] gap-6 md:grid-cols-3">
              {service.highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white p-6 shadow-[0_12px_40px_rgba(5,25,55,0.04)]"
                >
                  <h2 className="font-display text-xl font-semibold text-navy">{item.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="section-pad bg-[#f5f8fc] py-16 md:py-20">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-display text-3xl font-bold text-navy">What you get</h2>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-[rgba(0,59,115,0.08)] bg-white px-4 py-3 text-sm text-navy/80"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-sky" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="section-pad py-16 md:py-20">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-display text-3xl font-bold text-navy">FAQ</h2>
              <div className="mt-8 space-y-4">
                {service.faqs.map((item) => (
                  <div
                    key={item.q}
                    className="rounded-2xl border border-[rgba(0,59,115,0.08)] bg-white p-5"
                  >
                    <h3 className="font-display text-lg font-semibold text-navy">{item.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section-pad border-t border-[rgba(0,59,115,0.08)] py-16">
            <div className="mx-auto max-w-[900px]">
              <h2 className="font-display text-2xl font-bold text-navy">Related services</h2>
              <div className="mt-6 flex flex-wrap gap-3">
                {SERVICE_PAGES.filter((s) => s.slug !== service.slug).map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="rounded-full border border-[rgba(0,59,115,0.12)] bg-white px-4 py-2 text-sm text-navy/70 transition hover:border-sky/40 hover:text-navy"
                  >
                    {s.title}
                  </Link>
                ))}
                <Link
                  href="/services"
                  className="rounded-full border border-[rgba(0,59,115,0.12)] bg-white px-4 py-2 text-sm text-navy/70 transition hover:border-sky/40 hover:text-navy"
                >
                  All services
                </Link>
              </div>
              <div className="mt-10 rounded-2xl bg-navy px-6 py-8 text-white md:px-10">
                <h2 className="font-display text-2xl font-semibold">
                  Ready to build with OmGeaks?
                </h2>
                <p className="mt-2 max-w-xl text-white/70">
                  Tell us about your software, website, or mobile app idea — we&apos;ll reply within
                  one business day.
                </p>
                <div className="mt-6">
                  <Button href="/contact" variant="secondary">
                    Contact OmGeaks
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
