import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { CompassIcon } from "@/components/ui/page-icons";
import { milestones } from "@/lib/content/milestones";

const ROUTE = "/about/company-profile/history";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "history", path: ROUTE });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");
  const key = locale === "en" ? "en" : "id";

  return (
    <ContentPage
      title={tNav("history")}
      route={ROUTE}
      icon={<CompassIcon />}
      wide
      crumbs={[
        { label: tNav("about"), href: "/about/management-message" },
        {
          label: tNav("company-profile"),
          href: "/about/company-profile/vision-mission",
        },
      ]}
    >
      <ol className="relative space-y-10 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-0.5 before:bg-brand-200 md:before:left-[calc(6rem+7px)]">
        {milestones.map((m, i) => (
          <li key={i} className="relative pl-8 md:pl-[calc(6rem+2rem)]">
            {/* Year rail (desktop) */}
            <span className="absolute left-0 top-0 hidden w-24 text-right text-[22px] font-bold text-brand-600 md:block">
              {m.year}
            </span>
            {/* Node */}
            <span
              aria-hidden
              className="absolute left-0 top-2 h-4 w-4 rounded-full border-[3px] border-white bg-brand-600 ring-2 ring-brand-200 md:left-24"
            />
            <div className="rounded-[16px] border border-ink-200 bg-white p-6 transition-shadow hover:shadow-md">
              <p className="text-[13px] font-bold uppercase tracking-wide text-brand-400">
                <span className="md:hidden">{m.year} · </span>
                {m.month[key]}
              </p>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-700">
                {m.body[key]}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </ContentPage>
  );
}
