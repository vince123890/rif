import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Section wrapper.
 *
 * The fig alternates plain canvas sections with two signature treatments:
 * a full-bleed dark-green feature panel (radius 50) and a warm peach wash
 * behind the news block (#EDB886 at 10%).
 */
export function Section({
  children,
  tone = "canvas",
  className,
  id,
}: {
  children: ReactNode;
  tone?: "canvas" | "white" | "mint" | "peach";
  className?: string;
  id?: string;
}) {
  const tones = {
    canvas: "bg-canvas",
    white: "bg-white",
    mint: "bg-brand-50",
    peach: "bg-accent-200/10",
  } as const;

  return (
    <section
      id={id}
      className={cn("py-20 md:py-24 lg:py-28", tones[tone], className)}
    >
      {children}
    </section>
  );
}

/**
 * The dark-green feature panel from the fig — rounded 50px, inset from the
 * page edges, with a large low-opacity glyph bleeding out of one corner.
 */
export function FeaturePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="container-rif">
      <div
        className={cn(
          "relative isolate overflow-hidden rounded-[28px] bg-brand-600 px-6 py-16 md:rounded-[50px] md:px-12 md:py-20 lg:px-16",
          className,
        )}
      >
        {/* Decorative mark — fig uses a white vector at 5% opacity */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -right-16 -top-20 h-[420px] w-[420px] text-white/5"
          fill="none"
        >
          <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="8" />
          <circle cx="100" cy="100" r="62" stroke="currentColor" strokeWidth="8" />
          <path
            d="M62 148V56a4 4 0 0 1 4-4h44a30 30 0 0 1 11 58l24 38h-26l-21-34h-16v34z"
            fill="currentColor"
          />
        </svg>
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

/**
 * Section header: Japanese-plus-English eyebrow, 40px heading, 24px lead —
 * the exact rhythm measured in the fig.
 */
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
        "max-w-[900px]",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-[15px] tracking-[0.02em] md:text-[16px]",
            tone === "light" ? "text-white/80" : "text-brand-600",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={cn(
          "mt-4 text-[30px] font-bold leading-[1.15] md:text-[40px]",
          tone === "light" ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>

      {lead ? (
        <p
          className={cn(
            "mt-5 text-[17px] leading-[1.6] md:text-[24px]",
            tone === "light" ? "text-white/85" : "text-ink-500",
          )}
        >
          {lead}
        </p>
      ) : null}
    </div>
  );
}
