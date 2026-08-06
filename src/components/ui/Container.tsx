import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("container-xl section-pad", className)}>{children}</Tag>;
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  divider?: boolean;
};

export function Section({ children, id, className, divider = true }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(divider ? "section-block" : "relative py-[clamp(4.5rem,9vw,7.5rem)]", className)}
    >
      <Container>{children}</Container>
    </section>
  );
}
