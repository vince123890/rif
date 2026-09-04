import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";

import { Link } from "@/i18n/routing";

export type Crumb = { label: string; href?: string };

/**
 * Inner-page banner.
 *
 * Follows the fig's dark-green surface treatment: solid #006F4F with a
 * large low-opacity decorative glyph, breadcrumb above a bold 40px title.
 */
export async function PageHero({
  title,
  crumbs = [],
  icon,
}: {
  title: string;
  crumbs?: Crumb[];
  icon?: ReactNode;
}) {
  const t = await getTranslations("common");
  const tNav = await getTranslations("nav");

  return (
    <section className="relative isolate overflow-hidden bg-brand-600">
      {/* Soft depth wash */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-500"
      />

      {/* Watermark glyph — fig uses white at ~5–14% */}
      {icon ? (
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 text-white/10 md:block lg:right-12 [&>svg]:h-[260px] [&>svg]:w-[260px]"
        >
          {icon}
        </div>
      ) : null}

      <div className="container-rif relative py-16 md:py-20 lg:py-24">
        <nav aria-label={t("breadcrumb")}>
          <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[14px] text-white/70">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                {tNav("home")}
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight
                  className="h-3.5 w-3.5 text-white/45"
                  aria-hidden
                />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* fig: 40px Bold headings */}
        <h1 className="mt-4 max-w-4xl text-[32px] font-bold leading-[1.12] tracking-[-0.01em] text-white md:text-[44px] lg:text-[52px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
