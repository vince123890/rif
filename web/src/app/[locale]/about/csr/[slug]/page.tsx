import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";

import { getCsrActivities, getCsrActivity, pick } from "@/lib/content";
import { routing, Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { RichText } from "@/components/ui/rich-text";
import { LeafIcon } from "@/components/ui/page-icons";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const items = await getCsrActivities();
  return routing.locales.flatMap((locale) =>
    items.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const item = await getCsrActivity(slug);
  if (!item) return {};

  return buildMetadata({
    locale,
    title: pick(item.title, locale),
    description: pick(item.summary, locale),
    path: `/about/csr/${slug}`,
    image: item.image,
  });
}

/** FR-AB-11 — detail page behind each CSR photo. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const item = await getCsrActivity(slug);
  if (!item) notFound();

  const tNav = await getTranslations("nav");

  return (
    <ContentPage
      title={pick(item.title, locale)}
      route="/about/csr"
      icon={<LeafIcon />}
      crumbs={[
        { label: tNav("about"), href: "/about/management-message" },
        { label: tNav("csr"), href: "/about/csr" },
      ]}
    >
      <time dateTime={item.date} className="text-[14px] text-ink-500">
        {formatDate(item.date, locale)}
      </time>

      <div className="relative mt-6 aspect-16/9 overflow-hidden rounded-lg bg-ink-100">
        <Image
          src={item.image}
          alt={pick(item.title, locale)}
          fill
          priority
          sizes="(min-width: 1024px) 880px, 100vw"
          className="object-cover"
        />
      </div>

      <p className="mt-8 text-[17px] leading-relaxed text-ink-700">
        {pick(item.summary, locale)}
      </p>
      <RichText html={pick(item.body, locale)} className="mt-5" />

      <Link
        href="/about/csr"
        className="mt-10 inline-flex items-center gap-2 text-[15px] font-medium text-brand-600 transition-colors hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        {tNav("csr")}
      </Link>
    </ContentPage>
  );
}
