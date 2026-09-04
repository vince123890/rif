import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { RichText } from "@/components/ui/rich-text";
import { DocumentActions } from "@/components/content/document-actions";
import { ShieldIcon } from "@/components/ui/page-icons";

const PAGE_KEY = "anti-fraud";
const ROUTE = "/gcg/anti-fraud";

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

  return (
    <ContentPage
      title={pick(page.title, locale)}
      route={ROUTE}
      icon={<ShieldIcon />}
      crumbs={[
    { label: tNav("gcg"), href: "/gcg/anti-fraud" },
      ]}
    >
      <RichText html={pick(page.body, locale)} />
      {page.document ? <DocumentActions file={page.document} className="mt-10" /> : null}
    </ContentPage>
  );
}
