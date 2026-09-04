import { getTranslations, setRequestLocale } from "next-intl/server";

import { getSbdpDocuments } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { DocumentList } from "@/components/content/document-list";
import { ChartIcon } from "@/components/ui/page-icons";

const ROUTE = "/products/sbdp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "sbdp", path: ROUTE });
}

/** FR-PS-04 — SBDP documents listed per year and per month. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, documents] = await Promise.all([
    getTranslations("nav"),
    getSbdpDocuments(),
  ]);

  return (
    <ContentPage
      title={tNav("sbdp")}
      route={ROUTE}
      icon={<ChartIcon />}
      wide
      crumbs={[{ label: tNav("products"), href: "/products" }]}
    >
      <DocumentList documents={documents} groupByMonth />
    </ContentPage>
  );
}
