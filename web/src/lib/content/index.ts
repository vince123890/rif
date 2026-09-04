import type { I18nText, Locale } from "./types";
import * as data from "./data";

export * from "./types";

/**
 * Content access layer.
 *
 * Every page reads through these functions, so switching from the bundled
 * placeholder data to the Strapi REST API means reimplementing this module
 * only — no page or component changes.
 */

/** Pick the active language from a bilingual field, falling back to ID (RS-02). */
export function pick(value: I18nText | undefined, locale: string): string {
  if (!value) return "";
  return value[locale as Locale] || value.id || value.en || "";
}

export function pickList(
  value: { id: string[]; en: string[] } | undefined,
  locale: string,
): string[] {
  if (!value) return [];
  const list = value[locale as Locale];
  return list?.length ? list : value.id;
}

export async function getHeroSlides() {
  return data.heroSlides;
}

export async function getProducts() {
  return data.products;
}

export async function getProduct(slug: string) {
  return data.products.find((p) => p.slug === slug) ?? null;
}

export async function getSustainabilityReports() {
  return [...data.sustainabilityReports].sort((a, b) => b.year - a.year);
}

export async function getFinancialReports() {
  return [...data.financialReports].sort((a, b) => b.year - a.year);
}

export async function getSbdpDocuments() {
  return [...data.sbdpDocuments].sort(
    (a, b) => b.year - a.year || (b.month ?? 0) - (a.month ?? 0),
  );
}

export async function getArticles(opts?: {
  category?: "education" | "csr";
  year?: number;
  limit?: number;
}) {
  let list = [...data.articles].sort(
    (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt),
  );
  if (opts?.category) list = list.filter((a) => a.category === opts.category);
  if (opts?.year)
    list = list.filter((a) => new Date(a.publishedAt).getFullYear() === opts.year);
  if (opts?.limit) list = list.slice(0, opts.limit);
  return list;
}

export async function getArticle(slug: string) {
  return data.articles.find((a) => a.slug === slug) ?? null;
}

/** Counts used by the news sidebar facets (FR-NW-03/04). */
export async function getArticleFacets() {
  const all = data.articles;
  const categories = (["education", "csr"] as const)
    .map((c) => ({ key: c, count: all.filter((a) => a.category === c).length }))
    .filter((c) => c.count > 0);

  const years = Array.from(
    all.reduce((map, a) => {
      const y = new Date(a.publishedAt).getFullYear();
      return map.set(y, (map.get(y) ?? 0) + 1);
    }, new Map<number, number>()),
  )
    .map(([year, count]) => ({ year, count }))
    .sort((a, b) => b.year - a.year);

  const tags = Array.from(new Set(all.flatMap((a) => a.tags)));

  return { categories, years, tags };
}

export async function getVacancies() {
  return data.vacancies;
}

export async function getManagement() {
  return data.management;
}

export async function getAwards() {
  return [...data.awards].sort((a, b) => b.year - a.year);
}

export async function getCsrActivities() {
  return [...data.csrActivities].sort(
    (a, b) => +new Date(b.date) - +new Date(a.date),
  );
}

export async function getCsrActivity(slug: string) {
  return data.csrActivities.find((c) => c.slug === slug) ?? null;
}
