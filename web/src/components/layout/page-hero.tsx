import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { Link } from "@/i18n/routing";

export type Crumb = { label: string; href?: string };

/**
 * The green gradient page banner used on every inner page of the RIF site:
 * breadcrumb, H1, and a large watermark glyph on the right.
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
      {/* Gradient wash — dark green to a lighter tint on the right, as in the design */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-brand-700 via-brand-600 to-brand-400/70"
      />
      {icon ? (
        <div
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 text-white/[0.14] md:block lg:right-16 [&>svg]:h-[230px] [&>svg]:w-[230px]"
        >
          {icon}
        </div>
      ) : null}

      <div className="container-rif relative py-16 md:py-20 lg:py-24">
        <nav aria-label={t("breadcrumb")}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-white/75">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                {tNav("home")}
              </Link>
            </li>
            {crumbs.map((c) => (
              <li key={c.label} className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-white/50" aria-hidden />
                {c.href ? (
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                ) : (
                  <span>{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <h1 className="mt-3 max-w-4xl text-[34px] font-normal leading-[1.15] text-white md:text-[46px] lg:text-[54px]">
          {title}
        </h1>
      </div>
    </section>
  );
}
