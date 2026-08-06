"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  /** "icon" = OG mark only · "full" = icon + OMGEAKS wordmark */
  variant?: "icon" | "full";
  className?: string;
  priority?: boolean;
};

/**
 * Brand assets from the official OmGeaks logo — never redesigned.
 * Icon: header, loader, favicon, mobile menu, scroll-to-top
 * Full: footer, contact, about
 */
export function Logo({ variant = "icon", className, priority = false }: LogoProps) {
  if (variant === "icon") {
    return (
      <span className={cn("relative inline-flex shrink-0", className)}>
        <Image
          src="/logos/omgeaks-icon.png"
          alt="OmGeaks"
          width={433}
          height={253}
          priority={priority}
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex shrink-0", className)}>
      <Image
        src="/logos/omgeaks-logo.png"
        alt="OmGeaks"
        width={1024}
        height={682}
        priority={priority}
        className="h-full w-auto object-contain"
      />
    </span>
  );
}
