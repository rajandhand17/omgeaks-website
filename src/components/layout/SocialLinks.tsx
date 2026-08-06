"use client";

import { FaWhatsapp } from "react-icons/fa6";
import { COMPANY } from "@/lib/brand";
import { cn } from "@/lib/utils";

/** WhatsApp only — Instagram/LinkedIn removed by request */
export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a
        href={COMPANY.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(0,59,115,0.1)] bg-white text-[#25D366] transition hover:-translate-y-0.5 hover:border-[#25D366]/40 hover:shadow-[0_8px_20px_rgba(37,211,102,0.2)]"
      >
        <FaWhatsapp className="h-4 w-4" />
      </a>
    </div>
  );
}
