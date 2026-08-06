"use client";

import {
  useCallback,
  useRef,
  type ButtonHTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  magnetic?: boolean;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  onClick?: (e: ReactMouseEvent<HTMLElement>) => void;
};

export function Button({
  children,
  className,
  href,
  variant = "primary",
  magnetic = true,
  onClick,
  type = "button",
  disabled,
}: ButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = useCallback(
    (e: ReactMouseEvent<HTMLElement>) => {
      if (!magnetic || !ref.current) return;
      if (window.matchMedia("(pointer: coarse)").matches) return;
      const el = ref.current;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate3d(${x * 0.22}px, ${y * 0.22}px, 0)`;
    },
    [magnetic]
  );

  const onLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate3d(0,0,0)";
  }, []);

  const styles = cn(
    "btn-premium relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[0.8125rem] font-semibold tracking-[0.02em] will-change-transform sm:px-8 sm:py-4",
    variant === "primary" &&
      "bg-navy text-white shadow-[0_12px_32px_rgba(5,25,55,0.22)] hover:shadow-[0_16px_40px_rgba(0,174,239,0.25)]",
    variant === "secondary" &&
      "border border-[rgba(0,59,115,0.14)] bg-white text-navy shadow-[0_8px_24px_rgba(5,25,55,0.05)] hover:border-sky/40",
    variant === "ghost" && "bg-transparent px-5 text-navy/65 hover:text-navy",
    disabled && "pointer-events-none opacity-60",
    className
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a
          ref={(node) => {
            ref.current = node;
          }}
          href={href}
          className={styles}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          onClick={onClick}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={(node) => {
          ref.current = node;
        }}
        href={href}
        className={styles}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={(node) => {
        ref.current = node;
      }}
      type={type}
      disabled={disabled}
      className={styles}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

/** @deprecated Use Button */
export const MagneticButton = Button;
