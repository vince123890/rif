import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export type Crumb = { label: string; href?: string };

/**
 * Inner-page banner, built to the fig spec (frame "Desktop - 52"):
 *
 *   container  1392x540, radius 50, inset 24px from the page edge
 *   photo      full-bleed, covered by #006F4F at 80% + black at 5%
 *   accents    41x41 white/30% corner brackets, white/5% circles
 *   base       5px #F58220 bar along the bottom edge
 *   title      64px white, with the leading word in accent orange
 *   subtitle   24px white, centred, max ~1000px
 */
export async function PageHero({
  title,
  titleAccent,
  subtitle,
  crumbs = [],
  image = "/images/meeting-boardroom.jpg",
}: {
  title: string;
  /** Leading fragment rendered in orange, as in the fig. */
  titleAccent?: string;
  subtitle?: string;
  crumbs?: Crumb[];
  image?: string;
}) {
  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <section className="bg-canvas px-4 pt-4 sm:px-6 sm:pt-6">
      <div className="relative isolate mx-auto max-w-[1392px] overflow-hidden rounded-[28px] md:rounded-[50px]">
        {/* Photo */}
        <Image
          src={image}
          alt=""
          fill
          priority
          sizes="(min-width: 1440px) 1392px, 100vw"
          className="object-cover"
        />

        {/* Brand wash — fig: #006F4F at 80%, plus a 5% black knock-down */}
        <div aria-hidden className="absolute inset-0 bg-brand-600/80" />
        <div aria-hidden className="absolute inset-0 bg-black/5" />

        {/* Decorative circles (fig: white at 5%) */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-16 h-[325px] w-[325px] rounded-full bg-white/5"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-28 h-[365px] w-[365px] rounded-full bg-white/[0.06]"
        />


        {/* Corner brackets — fig: 41x41, white at 30% */}
        <Bracket className="left-5 top-5" corner="tl" />
        <Bracket className="right-5 top-5" corner="tr" />
        <Bracket className="bottom-9 left-5" corner="bl" />
        <Bracket className="bottom-9 right-5" corner="br" />

        <div className="relative flex min-h-[320px] flex-col items-center justify-center px-6 py-16 text-center md:min-h-[420px] md:py-20 lg:min-h-[500px]">
          {crumbs.length > 0 && (
            <nav aria-label={t("breadcrumb")} className="mb-6">
              <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[14px] text-white/80">
                <li>
                  <Link
                    href="/"
                    className="rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/25"
                  >
                    {tNav("home")}
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-2">
                    <ChevronRight
                      className="h-3.5 w-3.5 text-white/50"
                      aria-hidden
                    />
                    {c.href ? (
                      <Link
                        href={c.href}
                        className="rounded-full bg-white/15 px-4 py-1.5 backdrop-blur-sm transition-colors hover:bg-white/25"
                      >
                        {c.label}
                      </Link>
                    ) : (
                      <span className="rounded-full bg-brand-700/60 px-4 py-1.5 backdrop-blur-sm">
                        {c.label}
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* fig: 64px, leading fragment in #F58220 */}
          <h1 className="max-w-4xl text-[34px] font-bold leading-[1.12] tracking-[-0.01em] text-white md:text-[50px] lg:text-[64px]">
            {titleAccent ? (
              <span className="text-accent-400">{titleAccent}</span>
            ) : null}
            {titleAccent && title ? " " : null}
            {title}
          </h1>

          {subtitle ? (
            <p className="mt-6 max-w-[1000px] text-[16px] leading-relaxed text-white/85 md:text-[20px] lg:text-[24px]">
              {subtitle}
            </p>
          ) : null}
        </div>

        {/* Base rule — fig: 5px #F58220 */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-[5px] bg-accent-400" />
      </div>
    </section>
  );
}

/** 41×41 corner bracket, white at 30% (fig). */
function Bracket({
  className,
  corner,
}: {
  className?: string;
  corner: "tl" | "tr" | "bl" | "br";
}) {
  const sides = {
    tl: "border-l-[3px] border-t-[3px]",
    tr: "border-r-[3px] border-t-[3px]",
    bl: "border-b-[3px] border-l-[3px]",
    br: "border-b-[3px] border-r-[3px]",
  } as const;

  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute hidden h-[41px] w-[41px] border-white/30 sm:block",
        sides[corner],
        className,
      )}
    />
  );
}
