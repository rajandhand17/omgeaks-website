import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="aurora left-1/4 top-1/4 h-[40vw] w-[40vw] bg-sky/15" />
        <div className="aurora bottom-1/4 right-1/4 h-[35vw] w-[35vw] bg-orange/12" />
      </div>
      <div className="relative z-10 max-w-lg">
        <Link href="/" aria-label="OmGeaks home" className="inline-flex justify-center">
          <Logo variant="icon" className="mx-auto h-12 w-auto" priority />
        </Link>
        <p className="mt-10 text-[10px] font-semibold uppercase tracking-[0.28em] text-navy/40">
          404
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold text-navy md:text-5xl">
          Page not found
        </h1>
        <p className="mt-4 text-muted">
          That link doesn&apos;t lead anywhere on OmGeaks. Head home or start a conversation with
          us.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary">
            Back to home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </main>
  );
}
