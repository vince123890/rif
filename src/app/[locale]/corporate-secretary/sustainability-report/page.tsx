import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSustainabilityReports } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getBanner, splitTitle } from "@/config/page-banners";
import { ContentPage } from "@/components/layout/content-page";
import { DocumentList } from "@/components/content/document-list";

const ROUTE = "/corporate-secretary/sustainability-report";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "sustainability-report", path: ROUTE });
}

/** FR-CS-01 — reports grouped per year, with View PDF & Download. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, documents] = await Promise.all([
    getTranslations("nav"),
    getSustainabilityReports(),
  ]);

  const banner = getBanner(ROUTE, locale);

  return (
    <ContentPage
      titleAccent={splitTitle(tNav("sustainability-report"), banner?.accentWords).accent}
      title={splitTitle(tNav("sustainability-report"), banner?.accentWords).rest}
      subtitle={banner?.subtitle}
      image={banner?.image}
      route={ROUTE}
      wide
      crumbs={[
        { label: tNav("corporate-secretary"), href: ROUTE },
      ]}
    >
      <DocumentList documents={documents} />
    </ContentPage>
  );
}
