import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { getArticle, getArticles, pick } from "@/lib/content";
import { routing, Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/config/site";
import { ContentPage } from "@/components/layout/content-page";
import { RichText } from "@/components/ui/rich-text";
import { NewsIcon } from "@/components/ui/page-icons";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const articles = await getArticles();
  return routing.locales.flatMap((locale) =>
    articles.map((a) => ({ locale, slug: a.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  return buildMetadata({
    locale,
    title: pick(article.title, locale),
    description: pick(article.excerpt, locale),
    path: `/news/${slug}`,
    image: article.image,
  });
}

/** FR-NW-02 — article detail: title, date, body, photo. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const article = await getArticle(slug);
  if (!article) notFound();

  const [tNav, t] = await Promise.all([
    getTranslations("nav"),
    getTranslations("news"),
  ]);

  const categoryLabel = tNav(
    article.category === "education" ? "news-education" : "news-csr",
  );

  // NFR-PF-02 — structured data for the article.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: pick(article.title, locale),
    description: pick(article.excerpt, locale),
    image: `${site.url}${article.image}`,
    datePublished: article.publishedAt,
    publisher: { "@type": "Organization", name: site.name },
  };

  return (
    <ContentPage
      title={pick(article.title, locale)}
      route="/news"
      icon={<NewsIcon />}
      crumbs={[{ label: tNav("news"), href: "/news" }]}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px]">
        <span className="rounded-full bg-brand-50 px-3 py-1 font-medium text-brand-600">
          {categoryLabel}
        </span>
        <time dateTime={article.publishedAt} className="text-ink-500">
          {formatDate(article.publishedAt, locale)}
        </time>
      </div>

      <div className="relative mt-8 aspect-16/9 overflow-hidden rounded-lg bg-ink-100">
        <Image
          src={article.image}
          alt={pick(article.title, locale)}
          fill
          priority
          sizes="(min-width: 1024px) 880px, 100vw"
          className="object-cover"
        />
      </div>

      <RichText html={pick(article.body, locale)} className="mt-10" />

      {article.tags.length > 0 && (
        <ul className="mt-10 flex flex-wrap gap-2 border-t border-ink-200 pt-8">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded border border-ink-200 px-3 py-1.5 text-[13px] text-ink-600"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/news"
        className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-brand-600 transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {t("backToList")}
      </Link>
    </ContentPage>
  );
}
