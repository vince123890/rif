import { getTranslations, setRequestLocale } from "next-intl/server";
import { Briefcase, MapPin } from "lucide-react";

import { getVacancies, pick, pickList } from "@/lib/content";
import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { getBanner, splitTitle } from "@/config/page-banners";
import { ContentPage } from "@/components/layout/content-page";
import { ButtonLink } from "@/components/ui/button";
import { RichText } from "@/components/ui/rich-text";
import { formatDate } from "@/lib/utils";

const ROUTE = "/careers";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "careers", path: ROUTE });
}

/** FR-CR-01/02/03 — vacancy list, empty state, and Apply → Jobstreet. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, t, vacancies] = await Promise.all([
    getTranslations("nav"),
    getTranslations("careers"),
    getVacancies(),
  ]);

  const banner = getBanner(ROUTE, locale);

  return (
    <ContentPage
      titleAccent={splitTitle(tNav("careers"), banner?.accentWords).accent}
      title={splitTitle(tNav("careers"), banner?.accentWords).rest}
      subtitle={banner?.subtitle}
      image={banner?.image}
      route={ROUTE}
      wide
    >
      <h2 className="text-[30px] font-normal text-brand-600 md:text-[36px]">
        {t("available")}
      </h2>

      {vacancies.length === 0 ? (
        /* FR-CR-02 — "Not Available" state */
        <div className="mt-10 rounded-[16px] border border-dashed border-ink-200 bg-ink-50 px-6 py-16 text-center">
          <Briefcase className="mx-auto h-10 w-10 text-ink-300" aria-hidden />
          <p className="mt-4 text-[22px] font-normal text-ink-800">
            {t("notAvailable")}
          </p>
          <p className="mx-auto mt-2 max-w-md text-[15px] text-ink-500">
            {t("emptyState")}
          </p>
          <div className="mt-8">
            <ButtonLink href={site.external.jobstreet} variant="accent" external>
              {t("apply")}
            </ButtonLink>
          </div>
        </div>
      ) : (
        <ul className="mt-10 space-y-6">
          {vacancies.map((v) => (
            <li
              key={v.id}
              className="rounded-[16px] border border-ink-200 bg-white p-7 transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h3 className="text-[22px] font-bold text-ink-900">
                    {pick(v.title, locale)}
                  </h3>
                  <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] text-ink-500">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4" aria-hidden />
                      {pick(v.location, locale)}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Briefcase className="h-4 w-4" aria-hidden />
                      {pick(v.type, locale)}
                    </span>
                    <span>
                      {t("postedOn")} {formatDate(v.postedAt, locale)}
                    </span>
                  </div>
                </div>
                <ButtonLink
                  href={v.applyUrl ?? site.external.jobstreet}
                  variant="accent"
                  external
                >
                  {t("apply")}
                </ButtonLink>
              </div>

              <div className="mt-6 border-t border-ink-200 pt-6">
                <h4 className="text-[16px] font-bold text-ink-900">
                  {t("description")}
                </h4>
                <RichText
                  html={pick(v.description, locale)}
                  className="mt-2 text-[15px]"
                />

                {pickList(v.requirements, locale).length > 0 && (
                  <>
                    <h4 className="mt-6 text-[16px] font-bold text-ink-900">
                      {t("requirements")}
                    </h4>
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] text-ink-700 marker:text-brand-400">
                      {pickList(v.requirements, locale).map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </ContentPage>
  );
}
