"use client";

import Image from "next/image";
import { ProductScreen } from "@/components/work/ProductScreens";
import type { WorkProject } from "@/lib/work";

function Laptop({ children }: { children: React.ReactNode }) {
  return (
    <div className="work-laptop w-[78%] max-w-[420px]">
      <div className="overflow-hidden rounded-t-[10px] border-[10px] border-[#1b1b1d] bg-black shadow-[0_30px_60px_rgba(0,0,0,0.45)]">
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0a0a]">{children}</div>
      </div>
      <div className="relative mx-auto h-2.5 w-[108%] -translate-x-[4%] rounded-b-xl bg-gradient-to-b from-[#2a2a2e] to-[#111]">
        <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b bg-[#3a3a40]" />
      </div>
    </div>
  );
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div className="work-phone w-[42%] max-w-[210px]">
      <div className="relative overflow-hidden rounded-[2rem] border-[8px] border-[#1b1b1d] bg-black shadow-[0_30px_50px_rgba(0,0,0,0.4)]">
        <span className="absolute left-1/2 top-1.5 z-10 h-1.5 w-12 -translate-x-1/2 rounded-full bg-[#2a2a2e]" />
        <div className="relative aspect-[9/19] overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

export function DeviceStage({ project, featured = false }: { project: WorkProject; featured?: boolean }) {
  return (
    <div
      className={`work-stage relative overflow-hidden rounded-[1.75rem] ${
        featured ? "aspect-[4/5] sm:aspect-[5/4] min-h-[420px]" : "aspect-[4/5] min-h-[340px]"
      }`}
    >
      <Image
        src={project.stage}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover"
        priority={featured}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10" />
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        {project.device === "video" && project.video ? (
          <div className="relative w-[min(72%,340px)] overflow-hidden rounded-[1.4rem] border-[6px] border-[#1b1b1d] shadow-[0_28px_60px_rgba(0,0,0,0.45)]">
            <video
              className="aspect-[9/10] w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster={project.poster}
              aria-label={`${project.title} product film`}
            >
              <source src={project.video} type="video/mp4" />
            </video>
          </div>
        ) : project.device === "phone" ? (
          <Phone>
            <ProductScreen id={project.screen} />
          </Phone>
        ) : (
          <Laptop>
            <ProductScreen id={project.screen} />
          </Laptop>
        )}
      </div>
      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-md">
        {project.category}
      </span>
    </div>
  );
}
