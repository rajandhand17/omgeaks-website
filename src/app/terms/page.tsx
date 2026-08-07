import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { COMPANY } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms governing use of the OmGeaks website and enquiries submitted through it.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar visible />
      <ContactDock />
      <SmoothScroll>
        <main className="relative z-10 section-pad pb-20 pt-32 md:pb-28 md:pt-40">
          <article className="mx-auto max-w-3xl">
            <p className="eyebrow mb-4">Legal</p>
            <h1 className="font-display text-4xl font-bold text-navy md:text-5xl">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-muted">Last updated: August 2026</p>

            <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-navy/75">
              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Agreement</h2>
                <p>
                  By using{" "}
                  <Link href="/" className="text-sky hover:underline">
                    omgeaks.com
                  </Link>
                  , you agree to these terms. If you do not agree, please do not use the site.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Website use</h2>
                <p>
                  Content on this site is for general information about OmGeaks and our services.
                  We may update pages without notice. We do not guarantee that the site will always
                  be available or error-free.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Enquiries &amp; proposals</h2>
                <p>
                  Submitting a contact form or messaging us does not create a client engagement.
                  Project scope, fees, and deliverables are only binding when confirmed in a written
                  agreement between you and OmGeaks.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Intellectual property</h2>
                <p>
                  Branding, design, copy, and other materials on this site belong to OmGeaks or our
                  licensors. You may not copy or reuse them without permission, except for fair
                  personal viewing of the site.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Limitation of liability</h2>
                <p>
                  To the fullest extent permitted by law, OmGeaks is not liable for any indirect or
                  consequential loss arising from use of this website or reliance on its content.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Governing law</h2>
                <p>
                  These terms are governed by the laws of India, without regard to conflict-of-law
                  rules.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="font-display text-xl font-semibold text-navy">Contact</h2>
                <p>
                  Questions:{" "}
                  <a href={`mailto:${COMPANY.email}`} className="text-sky hover:underline">
                    {COMPANY.email}
                  </a>
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
