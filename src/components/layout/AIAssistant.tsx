"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiCloseLine, RiSparkling2Line } from "react-icons/ri";
import { Logo } from "@/components/brand/Logo";
import { ASSISTANT_REPLIES } from "@/lib/constants";
import { COMPANY } from "@/lib/brand";
import { cn } from "@/lib/utils";

type Msg = { role: "assistant" | "user"; text: string };

/**
 * Floating assistant: greets, offers quick replies, routes to WhatsApp or consultation.
 * Not a full conversational AI.
 */
export function AIAssistant({ enabled = true }: { enabled?: boolean }) {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [pulse, setPulse] = useState(true);
  const [step, setStep] = useState<"greet" | "routed">("greet");
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "assistant",
      text: "Hi — I'm the OmGeaks guide. What do you want to build?",
    },
  ]);

  useEffect(() => {
    if (!enabled) return;
    const t = setTimeout(() => {
      setReady(true);
      setOpen(true);
    }, 4200);
    return () => clearTimeout(t);
  }, [enabled]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => setPulse(false), 8000);
    return () => clearTimeout(t);
  }, [open]);

  const route = (reply: (typeof ASSISTANT_REPLIES)[number]) => {
    setMessages((m) => [
      ...m,
      { role: "user", text: reply.label },
      {
        role: "assistant",
        text:
          reply.id === "consult"
            ? "Perfect. I'll take you to book a consultation — or you can message us on WhatsApp right away."
            : `Got it — ${reply.label}. Connect with our team on WhatsApp, or book a consultation if you prefer a call.`,
      },
    ]);
    setStep("routed");
  };

  const waUrl = (intent: string) => {
    const text = encodeURIComponent(
      `Hi OmGeaks — I'm interested in: ${intent}. Looking forward to talking.`
    );
    return `${COMPANY.whatsapp}?text=${text}`;
  };

  if (!enabled || !ready) return null;

  return (
    <div className="pointer-events-none fixed bottom-5 left-4 z-50 sm:bottom-7 sm:left-6">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="false"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="pointer-events-auto mb-3 w-[min(100vw-2rem,22rem)] overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_22px_60px_rgba(5,25,55,0.16)] backdrop-blur-xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[rgba(0,59,115,0.06)] bg-gradient-to-r from-sky/8 via-white to-orange/8 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <Logo variant="icon" className="h-7 w-auto" />
                <div>
                  <p id={titleId} className="font-display text-sm font-semibold text-navy">
                    OmGeaks Guide
                  </p>
                  <p className="text-[10px] text-navy/45">Quick routing · not a chatbot</p>
                </div>
              </div>
              <button
                type="button"
                aria-label="Close assistant"
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-navy/45 transition hover:bg-navy/5 hover:text-navy"
              >
                <RiCloseLine className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-64 space-y-2.5 overflow-y-auto px-4 py-3" aria-live="polite">
              {messages.map((msg, i) => (
                <div
                  key={`${msg.role}-${i}`}
                  className={cn(
                    "max-w-[90%] rounded-2xl px-3 py-2 text-[13px] leading-relaxed",
                    msg.role === "assistant"
                      ? "bg-bg-soft text-navy/80"
                      : "ml-auto bg-navy text-white"
                  )}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            <div className="border-t border-[rgba(0,59,115,0.06)] px-3 py-3">
              {step === "greet" ? (
                <div className="flex flex-wrap gap-1.5">
                  {ASSISTANT_REPLIES.map((reply) => (
                    <button
                      key={reply.id}
                      type="button"
                      onClick={() => route(reply)}
                      className="rounded-full border border-[rgba(0,59,115,0.1)] bg-white px-2.5 py-1.5 text-[11px] font-medium text-navy/70 transition hover:border-sky/30 hover:text-navy"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <a
                    href={waUrl(messages.find((m) => m.role === "user")?.text ?? "a project")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition hover:brightness-105"
                  >
                    Continue on WhatsApp
                  </a>
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[rgba(0,59,115,0.12)] bg-white px-4 py-2.5 text-xs font-semibold text-navy transition hover:border-sky/30"
                  >
                    Book a consultation
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={open ? "Hide OmGeaks guide" : "Open OmGeaks guide"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full border border-white/80 bg-white/85 shadow-[0_14px_40px_rgba(5,25,55,0.16)] backdrop-blur-xl"
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
      >
        {pulse && (
          <span className="absolute inset-0 animate-ping rounded-full bg-sky/25" aria-hidden />
        )}
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky/15 to-orange/15" aria-hidden />
        {open ? (
          <RiCloseLine className="relative h-5 w-5 text-navy" />
        ) : (
          <span className="relative flex flex-col items-center">
            <Logo variant="icon" className="h-7 w-auto" />
            <RiSparkling2Line className="absolute -right-1 -top-1 h-3 w-3 text-orange" />
          </span>
        )}
      </motion.button>
    </div>
  );
}
