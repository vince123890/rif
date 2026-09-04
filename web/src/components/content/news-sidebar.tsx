import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { getArticles, pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

type Facets = {
  categories: { key: "education" | "csr"; count: number }[];
  years: { year: number; count: number }[];
  tags: string[];
};

/** Sidebar facets on the news list: Categories, Year, Recent posts, Tags. */
export async function NewsSidebar({
  facets,
  activeCategory,
  activeYear,
}: {
  facets: Facets;
  activeCategory?: "education" | "csr";
  activeYear?: number;
}) {
  const locale = await getLocale();
  const [t, tNav] = await Promise.all([
    getTranslations("news"),
    getTranslations("nav"),
  ]);

  const recent = await getArticles({ limit: 4 });

  const rowCls = (active: boolean) =>
    cn(
      "flex items-center justify-between gap-3 py-2 text-[15px] transition-colors",
      active ? "font-bold text-brand-600" : "text-ink-600 hover:text-brand-600",
    );

  return (
    <aside className="space-y-10">
      {/* Categories — FR-NW-03 */}
      {facets.categories.length > 0 && (
        <section>
          <h2 className="text-[19px] font-normal text-ink-900">
            {t("categories")}
          </h2>
          <ul className="mt-3 divide-y divide-ink-100 border-t border-ink-100">
            {facets.categories.map((c) => (
              <li key={c.key}>
                <Link
                  href={
                    activeCategory === c.key ? "/news" : `/news?category=${c.key}`
                  }
                  className={rowCls(activeCategory === c.key)}
                >
                  <span>
                    {tNav(c.key === "education" ? "news-education" : "news-csr")}
                  </span>
                  <span className="text-ink-400">({c.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Year — FR-NW-04 */}
      {facets.years.length > 0 && (
        <section>
          <h2 className="text-[19px] font-normal text-ink-900">{t("year")}</h2>
          <ul className="mt-3 divide-y divide-ink-100 border-t border-ink-100">
            {facets.years.map((y) => (
              <li key={y.year}>
                <Link
                  href={activeYear === y.year ? "/news" : `/news?year=${y.year}`}
                  className={rowCls(activeYear === y.year)}
                >
                  <span>{y.year}</span>
                  <span className="text-ink-400">({y.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recent posts */}
      {recent.length > 0 && (
        <section>
          <h2 className="text-[19px] font-normal text-ink-900">
            {t("recentPosts")}
          </h2>
          <ul className="mt-4 space-y-4">
            {recent.map((a) => (
              <li key={a.slug} className="flex gap-3">
                <Link
                  href={`/news/${a.slug}`}
                  tabIndex={-1}
                  aria-hidden
                  className="relative h-14 w-20 shrink-0 overflow-hidden rounded bg-ink-100"
                >
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0">
                  <p className="text-[12px] text-ink-500">
                    {formatDate(a.publishedAt, locale)}
                  </p>
                  <Link
                    href={`/news/${a.slug}`}
                    className="line-clamp-2 text-[14px] text-ink-700 transition-colors hover:text-brand-600"
                  >
                    {pick(a.title, locale)}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Tags */}
      {facets.tags.length > 0 && (
        <section>
          <h2 className="text-[19px] font-normal text-ink-900">{t("tags")}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {facets.tags.map((tag) => (
              <li
                key={tag}
                className="rounded border border-ink-200 px-3 py-1.5 text-[13px] text-ink-600"
              >
                {tag}
              </li>
            ))}
          </ul>
        </section>
      )}
    </aside>
  );
}
