import type { MetadataRoute } from "next";

import { site } from "@/config/site";
import { flattenRoutes } from "@/config/navigation";
import { routing } from "@/i18n/routing";
import { getArticles, getCsrActivities, getProducts } from "@/lib/content";

/** NFR-PF-02 — sitemap.xml covering both locales with hreflang alternates. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, products, csr] = await Promise.all([
    getArticles(),
    getProducts(),
    getCsrActivities(),
  ]);

  // Section landings only redirect to their first child, so they are not
  // canonical URLs and must stay out of the sitemap.
  const redirectOnly = new Set([
    "/about",
    "/about/company-profile",
    "/gcg",
    "/corporate-secretary",
  ]);

  const paths = [
    ...flattenRoutes().filter((p) => !redirectOnly.has(p)),
    ...products.map((p) => `/products/${p.slug}`),
    ...articles.map((a) => `/news/${a.slug}`),
    ...csr.map((c) => `/about/csr/${c.slug}`),
  ];

  const unique = Array.from(new Set(paths));

  return unique.flatMap((p) =>
    routing.locales.map((locale) => ({
      url: `${site.url}/${locale}${p === "/" ? "" : p}`,
      lastModified: new Date(),
      changeFrequency: p === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: p === "/" ? 1 : p.split("/").length <= 2 ? 0.8 : 0.6,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            `${site.url}/${l}${p === "/" ? "" : p}`,
          ]),
        ),
      },
    })),
  );
}
