"use client";

import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { RiPhoneLine, RiMailLine, RiMapPinLine } from "react-icons/ri";
import { FaWhatsapp } from "react-icons/fa6";
import { Logo } from "@/components/brand/Logo";
import { Navbar } from "@/components/layout/Navbar";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { ContactDock } from "@/components/layout/ContactDock";
import { AIAssistant } from "@/components/layout/AIAssistant";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { COMPANY } from "@/lib/constants";
import { ENQUIRY_EMAIL_SUBJECT } from "@/lib/contact-email";
import { SITE_URL, formatCompanyAddress } from "@/lib/seo";

const inputClass =
  "mt-2 w-full rounded-xl border border-[rgba(0,59,115,0.12)] bg-white px-4 py-3 text-sm text-navy outline-none transition focus:border-sky/50 disabled:opacity-60";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot — bots fill this; humans never see it
    if (String(data.get("website") || "").trim()) {
      setSent(true);
      form.reset();
      setLoading(false);
      return;
    }

    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim() || "—";
    const company = String(data.get("company") || "").trim() || "—";
    const message = String(data.get("message") || "").trim();

    const payload = {
      name,
      email,
      phone,
      company,
      message,
      _subject: ENQUIRY_EMAIL_SUBJECT,
      _template: "table",
      _captcha: "false",
      _replyto: email,
      // Helps FormSubmit format a cleaner, brand-labelled message
      "Enquiry type": "Website contact form",
      Source: `${SITE_URL}/contact`,
    };

    try {
      const apiRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, company, message }),
      });
      const apiJson = (await apiRes.json()) as {
        ok?: boolean;
        error?: string;
        needsActivation?: boolean;
        fallback?: boolean;
      };

      if (apiRes.ok && apiJson.ok) {
        setSent(true);
        form.reset();
        return;
      }

      if (apiJson.needsActivation) {
        throw new Error(apiJson.error || "Activate the form email, then submit again.");
      }

      const targets = [...new Set([COMPANY.email, COMPANY.emailInbox])];
      const results = await Promise.all(
        targets.map(async (to) => {
          const fsRes = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(to)}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
          });
          const fsJson = (await fsRes.json().catch(() => ({}))) as {
            success?: string | boolean;
            message?: string;
          };
          const ok =
            fsJson.success === true || String(fsJson.success).toLowerCase() === "true";
          return { to, ok, msg: fsJson.message || "" };
        })
      );

      if (!results.some((r) => r.ok)) {
        const msg = results[0]?.msg || apiJson.error || "Failed to send message.";
        if (/activat/i.test(msg)) {
          throw new Error(
            `Check ${COMPANY.email} and ${COMPANY.emailInbox} (inbox + spam) for a FormSubmit “Activate Form” email, click it once, then submit again.`
          );
        }
        throw new Error(msg);
      }

      setSent(true);
      form.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="noise-overlay" aria-hidden />
      <Navbar visible />
      <ContactDock />
      <AIAssistant />
      <SmoothScroll>
        <main className="relative z-10">
          <section className="section-pad relative overflow-hidden pb-20 pt-32 md:pb-28 md:pt-40">
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="aurora left-1/4 top-1/4 h-[35vw] w-[35vw] bg-sky/15" />
              <div className="aurora bottom-1/4 right-1/4 h-[30vw] w-[30vw] bg-orange/12" />
            </div>

            <div className="relative z-10 mx-auto max-w-[1200px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12 max-w-2xl"
              >
                <Logo variant="full" className="mb-8 h-24 md:h-28" priority />
                <p className="eyebrow mb-4">Contact</p>
                <h1 className="font-display text-4xl font-bold leading-[1.05] text-navy md:text-5xl lg:text-6xl">
                  Contact OmGeaks in Samrala, Ludhiana —{" "}
                  <span className="text-gradient">start your project</span>
                </h1>
                <p className="mt-4 max-w-xl text-muted md:text-lg">
                  Tell us about your software, website, or mobile app idea. We typically respond
                  within one business day.
                </p>
              </motion.div>

              <div className="grid gap-6 lg:grid-cols-12">
                <div className="space-y-3 lg:col-span-4">
                  {[
                    {
                      label: "WhatsApp",
                      value: COMPANY.phone,
                      href: COMPANY.whatsapp,
                      Icon: FaWhatsapp,
                    },
                    {
                      label: "Email",
                      value: COMPANY.email,
                      href: `mailto:${COMPANY.email}`,
                      Icon: RiMailLine,
                    },
                    {
                      label: "Phone",
                      value: COMPANY.phone,
                      href: `tel:+${COMPANY.phoneRaw}`,
                      Icon: RiPhoneLine,
                    },
                    {
                      label: "Address",
                      value: formatCompanyAddress(),
                      href: COMPANY.googleBusinessProfile,
                      Icon: RiMapPinLine,
                    },
                    {
                      label: "Google",
                      value: "Omgeaks PVT. LTD. — Business Profile",
                      href: COMPANY.googleBusinessProfile,
                      Icon: RiMapPinLine,
                    },
                  ].map((card, i) => (
                    <motion.div
                      key={card.label}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.5 }}
                    >
                      <Card hover={false} className="!p-4">
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,59,115,0.1)] bg-bg-soft">
                            <card.Icon
                              className={`h-4 w-4 ${card.label === "WhatsApp" ? "text-[#25D366]" : "text-sky"}`}
                            />
                          </span>
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.22em] text-navy/40">
                              {card.label}
                            </p>
                            {card.href ? (
                              <a
                                href={card.href}
                                target={card.href.startsWith("http") ? "_blank" : undefined}
                                rel={
                                  card.href.startsWith("http") ? "noopener noreferrer" : undefined
                                }
                                className="mt-1 block font-medium text-navy hover:text-sky"
                              >
                                {card.value}
                              </a>
                            ) : (
                              <p className="mt-1 font-medium text-navy">{card.value}</p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                <Card hover={false} className="lg:col-span-8 !p-6 md:!p-8">
                  {sent ? (
                    <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                      <p className="font-display text-2xl font-semibold text-navy">
                        Message received.
                      </p>
                      <p className="mt-2 text-muted">
                        Your enquiry was sent. We&apos;ll respond within one business day.
                      </p>
                      <a
                        href={COMPANY.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 text-sm font-medium text-[#25D366] hover:underline"
                      >
                        Or continue on WhatsApp →
                      </a>
                    </div>
                  ) : (
                    <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
                      {/* Honeypot — leave empty */}
                      <input
                        type="text"
                        name="website"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden
                        className="absolute -left-[9999px] h-0 w-0 opacity-0"
                      />
                      <label className="block text-xs uppercase tracking-[0.18em] text-navy/45">
                        Name
                        <input required name="name" disabled={loading} className={inputClass} />
                      </label>
                      <label className="block text-xs uppercase tracking-[0.18em] text-navy/45">
                        Email
                        <input
                          required
                          type="email"
                          name="email"
                          disabled={loading}
                          className={inputClass}
                        />
                      </label>
                      <label className="block text-xs uppercase tracking-[0.18em] text-navy/45">
                        Phone
                        <input type="tel" name="phone" disabled={loading} className={inputClass} />
                      </label>
                      <label className="block text-xs uppercase tracking-[0.18em] text-navy/45">
                        Company
                        <input name="company" disabled={loading} className={inputClass} />
                      </label>
                      <label className="block text-xs uppercase tracking-[0.18em] text-navy/45 sm:col-span-2">
                        Project details
                        <textarea
                          required
                          name="message"
                          rows={5}
                          disabled={loading}
                          className={`${inputClass} resize-none`}
                        />
                      </label>
                      {error && (
                        <p className="text-sm text-orange sm:col-span-2" role="alert">
                          {error}
                        </p>
                      )}
                      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                        <Button
                          type="submit"
                          variant="primary"
                          disabled={loading}
                          className="w-full sm:w-auto"
                        >
                          {loading ? "Sending…" : "Send Message"}
                        </Button>
                        <a
                          href={COMPANY.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 text-sm font-medium text-[#25D366] hover:underline"
                        >
                          <FaWhatsapp className="h-4 w-4" />
                          WhatsApp {COMPANY.phone}
                        </a>
                      </div>
                    </form>
                  )}
                </Card>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </SmoothScroll>
    </>
  );
}
