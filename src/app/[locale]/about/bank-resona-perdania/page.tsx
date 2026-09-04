import { getTranslations, setRequestLocale } from "next-intl/server";
import { Globe } from "lucide-react";

import { getStaticPage } from "@/lib/content/pages";
import { pick } from "@/lib/content";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { getBanner, splitTitle } from "@/config/page-banners";
import { ContentPage } from "@/components/layout/content-page";
import { RichText } from "@/components/ui/rich-text";
import { BankIcon } from "@/components/ui/page-icons";

const ROUTE = "/about/bank-resona-perdania";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "bank-resona-perdania", path: ROUTE });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const page = getStaticPage("bank-resona-perdania")!;
  const [tNav, t] = await Promise.all([
    getTranslations("nav"),
    getTranslations("common"),
  ]);

  const banner = getBanner(ROUTE, locale);

  return (
    <ContentPage
      titleAccent={splitTitle(pick(page.title, locale), banner?.accentWords).accent}
      title={splitTitle(pick(page.title, locale), banner?.accentWords).rest}
      subtitle={banner?.subtitle}
      image={banner?.image}
      route={ROUTE}
      icon={<BankIcon />}
      crumbs={[{ label: tNav("about"), href: "/about/management-message" }]}
    >
      <RichText html={pick(page.body, locale)} />

      {/* FR-AB-13 — external link to the parent company, new tab */}
      <a
        href={site.external.bankResonaPerdania}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-[12px] border border-ink-200 bg-white px-5 py-3 text-[15px] font-medium text-ink-700 transition-colors hover:border-brand-600 hover:text-brand-600"
      >
        <Globe className="h-4 w-4" aria-hidden />
        {t("clickHere")}
        <span className="sr-only"> ({t("externalLink")})</span>
      </a>
    </ContentPage>
  );
}
