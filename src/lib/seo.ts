import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";

/**
 * NFR-PF-02 — per-page meta title/description plus hreflang alternates.
 */
export async function buildMetadata({
  locale,
  titleKey,
  title,
  description,
  path,
  image,
}: {
  locale: string;
  /** Key under the `nav` namespace; used when `title` is not given. */
  titleKey?: string;
  title?: string;
  description?: string;
  path: string;
  image?: string;
}): Promise<Metadata> {
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tSeo = await getTranslations({ locale, namespace: "seo" });

  const resolved = title ?? (titleKey ? tNav(titleKey) : site.shortName);
  const desc = description ?? tSeo("defaultDescription");

  return {
    title: resolved,
    description: desc,
    alternates: {
      canonical: `/${locale}${path === "/" ? "" : path}`,
      languages: {
        id: `/id${path === "/" ? "" : path}`,
        en: `/en${path === "/" ? "" : path}`,
      },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "id" ? "id_ID" : "en_US",
      url: `${site.url}/${locale}${path === "/" ? "" : path}`,
      title: `${resolved} | ${site.shortName}`,
      description: desc,
      images: image ? [{ url: image }] : undefined,
    },
  };
}
