import { getTranslations, setRequestLocale } from "next-intl/server";

import { getFinancialReports } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getBanner, splitTitle } from "@/config/page-banners";
import { ContentPage } from "@/components/layout/content-page";
import { DocumentList } from "@/components/content/document-list";
import { ChartIcon } from "@/components/ui/page-icons";

const ROUTE = "/corporate-secretary/financial-report";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "financial-report", path: ROUTE });
}

/** FR-CS-02 — audited reports with a "Sort by Year" filter (All / per year). */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, documents] = await Promise.all([
    getTranslations("nav"),
    getFinancialReports(),
  ]);

  const banner = getBanner(ROUTE, locale);

  return (
    <ContentPage
      titleAccent={splitTitle(tNav("financial-report"), banner?.accentWords).accent}
      title={splitTitle(tNav("financial-report"), banner?.accentWords).rest}
      subtitle={banner?.subtitle}
      image={banner?.image}
      route={ROUTE}
      icon={<ChartIcon />}
      wide
      crumbs={[
        {
          label: tNav("corporate-secretary"),
          href: "/corporate-secretary/sustainability-report",
        },
      ]}
    >
      <DocumentList documents={documents} />
    </ContentPage>
  );
}
