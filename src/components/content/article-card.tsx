import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import type { Article } from "@/lib/content";
import { pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { dateParts } from "@/lib/utils";

/** News card with the date badge overlaid on the thumbnail (FR-NW-01). */
export async function ArticleCard({
  article,
  layout = "vertical",
}: {
  article: Article;
  layout?: "vertical" | "horizontal";
}) {
  const locale = await getLocale();
  const [t, tNav] = await Promise.all([
    getTranslations("news"),
    getTranslations("nav"),
  ]);

  const { day, month, year } = dateParts(article.publishedAt, locale);
  const href = `/news/${article.slug}`;
  const categoryLabel = tNav(
    article.category === "education" ? "news-education" : "news-csr",
  );

  const thumb = (
    <div className="relative aspect-4/3 overflow-hidden rounded-md bg-ink-100">
      <Image
        src={article.image}
        alt={pick(article.title, locale)}
        fill
        sizes="(min-width: 1024px) 33vw, 100vw"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute bottom-0 left-0 bg-brand-600/95 px-3 py-2 text-center text-white">
        <span className="block text-[20px] font-bold leading-none">{day}</span>
        <span className="block text-[11px] uppercase leading-tight">
          {month} {String(year).slice(-2)}
        </span>
      </div>
    </div>
  );

  if (layout === "horizontal") {
    return (
      <article className="group grid gap-6 sm:grid-cols-[280px_1fr]">
        <Link href={href} tabIndex={-1} aria-hidden>
          {thumb}
        </Link>
        <div>
          <p className="text-[14px] font-medium text-brand-400">{categoryLabel}</p>
          <h3 className="mt-1.5 text-[22px] font-normal leading-snug text-ink-900 md:text-[26px]">
            <Link href={href} className="transition-colors hover:text-brand-600">
              {pick(article.title, locale)}
            </Link>
          </h3>
          <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-ink-600">
            {pick(article.excerpt, locale)}
          </p>
          <Link
            href={href}
            className="mt-4 inline-block text-[14px] font-medium text-ink-700 underline underline-offset-4 transition-colors hover:text-brand-600"
          >
            {t("readingMore")}
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link href={href} tabIndex={-1} aria-hidden>
        {thumb}
      </Link>
      <p className="mt-4 text-[13px] font-medium text-brand-400">{categoryLabel}</p>
      <h3 className="mt-1.5 text-[19px] font-normal leading-snug text-ink-900">
        <Link href={href} className="transition-colors hover:text-brand-600">
          {pick(article.title, locale)}
        </Link>
      </h3>
      <p className="mt-2.5 line-clamp-3 text-[14px] leading-relaxed text-ink-500">
        {pick(article.excerpt, locale)}
      </p>
    </article>
  );
}
