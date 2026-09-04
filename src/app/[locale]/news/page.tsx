import { getTranslations, setRequestLocale } from "next-intl/server";

import { getArticleFacets, getArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getBanner, splitTitle } from "@/config/page-banners";
import { ContentPage } from "@/components/layout/content-page";
import { ArticleCard } from "@/components/content/article-card";
import { NewsSidebar } from "@/components/content/news-sidebar";
import { NewsIcon } from "@/components/ui/page-icons";

const ROUTE = "/news";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "news", path: ROUTE });
}

/** FR-NW-01/03/04 — article list with category and year filters. */
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; year?: string }>;
}) {
  const { locale } = await params;
  const { category, year } = await searchParams;
  setRequestLocale(locale);

  const activeCategory =
    category === "education" || category === "csr" ? category : undefined;
  const activeYear = year && /^\d{4}$/.test(year) ? Number(year) : undefined;

  const [tNav, t, articles, facets] = await Promise.all([
    getTranslations("nav"),
    getTranslations("news"),
    getArticles({ category: activeCategory, year: activeYear }),
    getArticleFacets(),
  ]);

  const banner = getBanner(ROUTE, locale);

  return (
    <ContentPage
      titleAccent={splitTitle(tNav("news"), banner?.accentWords).accent}
      title={splitTitle(tNav("news"), banner?.accentWords).rest}
      subtitle={banner?.subtitle}
      image={banner?.image}
      route={ROUTE}
      icon={<NewsIcon />}
      wide
    >
      <div className="grid gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
        <div>
          {articles.length ? (
            <div className="divide-y divide-ink-200">
              {articles.map((a) => (
                <div key={a.slug} className="py-10 first:pt-0 last:pb-0">
                  <ArticleCard article={a} layout="horizontal" />
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-[12px] border border-dashed border-ink-200 bg-ink-50 px-6 py-16 text-center text-ink-500">
              {t("empty")}
            </p>
          )}
        </div>

        <NewsSidebar
          facets={facets}
          activeCategory={activeCategory}
          activeYear={activeYear}
        />
      </div>
    </ContentPage>
  );
}
