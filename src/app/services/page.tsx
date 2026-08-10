import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { Button } from "@/components/ui/Button";
import { SERVICE_PAGES } from "@/lib/services-pages";
import { OG_IMAGE, SITE_URL, breadcrumbJsonLd } from "@/lib/seo";
import { formatCompanyAddress } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Software, Website & Mobile App Services",
  description:
    "OmGeaks services: custom software development, website development, mobile app development, and AI agents — IT company in Samrala, Ludhiana, Punjab.",
  alternates: { canonical: `${SITE_URL}/services` },
  openGraph: {
    title: "OmGeaks Services — Software, Websites & Mobile Apps",
    description:
      "Explore OmGeaks services for software, websites, mobile apps, and AI automation.",
    url: `${SITE_URL}/services`,
    images: [OG_IMAGE],
  },
};

export default function ServicesHubPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }}
      />
      <Navbar visible />
      <ContactDock />
      <SmoothScroll>
        <main className="relative z-10">
          <section className="section-pad bg-gradient-to-b from-[#f5f8fc] to-white pb-14 pt-32 md:pt-40">
            <div className="mx-auto max-w-[900px]">
              <p className="eyebrow mb-4">What OmGeaks builds</p>
              <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1.08] text-navy">
                Software, websites, mobile apps &amp; AI — one engineering company
              </h1>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                OmGeaks Pvt. Ltd. is a software company in {formatCompanyAddress().split(", India")[0]}{" "}
                helping businesses design, build, and launch digital products that rank, convert, and
                scale.
              </p>
            </div>
          </section>

          <section className="section-pad pb-20">
            <div className="mx-auto grid max-w-[1100px] gap-4 md:grid-cols-2">
              {SERVICE_PAGES.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group rounded-2xl border border-[rgba(0,59,115,0.1)] bg-white p-7 shadow-[0_12px_40px_rgba(5,25,55,0.04)] transition hover:-translate-y-1 hover:border-sky/30"
                >
                  <h2 className="font-display text-2xl font-semibold text-navy group-hover:text-deep-blue">
                    {service.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                    {service.intro}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-medium text-sky">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
            <div className="mx-auto mt-12 max-w-[1100px] text-center">
              <Button href="/contact" variant="primary">
                Book a free consultation
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
