import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { getAwards, pick } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { AwardIcon } from "@/components/ui/page-icons";

const ROUTE = "/about/company-profile/award";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "award", path: ROUTE });
}

/** FR-AB-10 — award gallery; each item carries a short explanation. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, awards] = await Promise.all([
    getTranslations("nav"),
    getAwards(),
  ]);

  return (
    <ContentPage
      title={tNav("award")}
      route={ROUTE}
      icon={<AwardIcon />}
      wide
      crumbs={[
        { label: tNav("about"), href: "/about/management-message" },
        {
          label: tNav("company-profile"),
          href: "/about/company-profile/vision-mission",
        },
      ]}
    >
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {awards.map((a) => (
          <article
            key={a.id}
            className="group overflow-hidden rounded-lg border border-ink-200 bg-white transition-shadow hover:shadow-md"
          >
            <div className="relative aspect-square bg-ink-50">
              <Image
                src={a.image}
                alt={pick(a.title, locale)}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="border-t border-ink-100 p-6">
              <p className="text-[13px] font-bold uppercase tracking-wide text-brand-400">
                {a.year}
              </p>
              <h2 className="mt-1.5 text-[18px] font-bold leading-snug text-ink-900">
                {pick(a.title, locale)}
              </h2>
              <p className="mt-2.5 text-[14px] leading-relaxed text-ink-600">
                {pick(a.description, locale)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
