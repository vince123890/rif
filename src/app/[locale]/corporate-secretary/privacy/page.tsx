import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { getBanner, splitTitle } from "@/config/page-banners";
import { ContentPage } from "@/components/layout/content-page";
import { RichText } from "@/components/ui/rich-text";
import { DocumentActions } from "@/components/content/document-actions";
import { ShieldIcon } from "@/components/ui/page-icons";

const PAGE_KEY = "privacy";
const ROUTE = "/corporate-secretary/privacy";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const page = getStaticPage(PAGE_KEY);
  return buildMetadata({
    locale,
    title: pick(page?.title, locale),
    path: ROUTE,
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getStaticPage(PAGE_KEY);
  if (!page) notFound();

  const tNav = await getTranslations("nav");

  const banner = getBanner(ROUTE, locale);

  return (
    <ContentPage
      titleAccent={splitTitle(pick(page.title, locale), banner?.accentWords).accent}
      title={splitTitle(pick(page.title, locale), banner?.accentWords).rest}
      subtitle={banner?.subtitle}
      image={banner?.image}
      route={ROUTE}
      icon={<ShieldIcon />}
      crumbs={[
    { label: tNav("corporate-secretary"), href: "/corporate-secretary/sustainability-report" },
      ]}
    >
      <RichText html={pick(page.body, locale)} />
      {page.document ? <DocumentActions file={page.document} className="mt-10" /> : null}
    </ContentPage>
  );
}
