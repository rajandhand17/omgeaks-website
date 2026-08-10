import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { COMPANY } from "@/lib/brand";
import { OG_IMAGE, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How OmGeaks collects, uses, and protects information submitted through omgeaks.com.",
  alternates: { canonical: `${SITE_URL}/privacy` },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Privacy Policy · OmGeaks",
    description:
      "How OmGeaks collects, uses, and protects information submitted through omgeaks.com.",
    url: `${SITE_URL}/privacy`,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy · OmGeaks",
    images: [OG_IMAGE.url],
  },
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar visible />
      <ContactDock />
      <SmoothScroll>
        <main className="relative z-10 section-pad pb-20 pt-32 md:pb-28 md:pt-40">
          <article className="mx-auto max-w-3xl">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="font-display text-4xl font-bold text-navy md:text-5xl">Privacy Policy</h1>
            <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>

            <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-navy/75">
              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Who we are</h2>
                <p>
                  OmGeaks (&ldquo;we&rdquo;, &ldquo;us&rdquo;) operates{" "}
                  <Link href="/" className="text-sky hover:underline">
                    omgeaks.com
                  </Link>
                  . This policy explains how we handle information when you use our website or
                  contact us.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Information we collect</h2>
                <p>When you submit the contact form or message us, we may receive:</p>
                <ul className="list-disc space-y-1 pl-5">
                  <li>Name, email address, phone number, and company name</li>
                  <li>Project details or other content you choose to share</li>
                  <li>Basic technical data such as browser type and approximate location from standard server logs</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">How we use it</h2>
                <p>We use this information to respond to enquiries, discuss potential work, and improve our website. We do not sell your personal information.</p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Sharing</h2>
                <p>
                  Form submissions may be processed by email delivery providers so your message can
                  reach{" "}
                  <a href={`mailto:${COMPANY.email}`} className="text-sky hover:underline">
                    {COMPANY.email}
                  </a>
                  . We only share what is needed to deliver and respond to your enquiry.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Retention</h2>
                <p>
                  We keep enquiry-related correspondence for as long as needed to respond and manage
                  the relationship, or as required by law.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Your choices</h2>
                <p>
                  To access, correct, or delete information you sent us, email{" "}
                  <a href={`mailto:${COMPANY.email}`} className="text-sky hover:underline">
                    {COMPANY.email}
                  </a>
                  .
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Contact</h2>
                <p>
                  Questions about this policy:{" "}
                  <a href={`mailto:${COMPANY.email}`} className="text-sky hover:underline">
                    {COMPANY.email}
                  </a>{" "}
                  or{" "}
                  <Link href="/contact" className="text-sky hover:underline">
                    our contact page
                  </Link>
                  .
                </p>
              </section>
            </div>
          </article>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
