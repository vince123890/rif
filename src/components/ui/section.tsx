import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section wrapper with the alternating white / tinted background rhythm
 * used across the design.
 */
export function Section({
  children,
  tone = "white",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "white" | "mint" | "gray" | "brand";
  className?: string;
  id?: string;
}) {
  const tones = {
    white: "bg-white",
    mint: "bg-surface-mint",
    gray: "bg-ink-50",
    brand: "bg-brand-600 text-white",
  } as const;

  return (
    <section id={id} className={cn("py-16 md:py-20 lg:py-24", tones[tone], className)}>
      {children}
    </section>
  );
}

/** Centred eyebrow + heading + lead, matching the fig section headers. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  tone = "dark",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  tone?: "dark" | "light";
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-[13px] font-bold uppercase tracking-[0.14em]",
            tone === "light" ? "text-accent-300" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-[28px] font-normal leading-tight md:text-[38px]",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={cn(
            "mt-4 text-[16px] leading-relaxed",
            tone === "light" ? "text-white/80" : "text-ink-500",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
