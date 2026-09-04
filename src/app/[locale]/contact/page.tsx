import { getTranslations, setRequestLocale } from "next-intl/server";
import { ExternalLink, MapPin, Phone } from "lucide-react";

import { site } from "@/config/site";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { SupportIcon } from "@/components/ui/page-icons";

const ROUTE = "/contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "contact", path: ROUTE });
}

/** FR-CT-01..05 — contact details, map, and external Microsoft Forms links. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, t, tc] = await Promise.all([
    getTranslations("nav"),
    getTranslations("contact"),
    getTranslations("common"),
  ]);

  const links = [
    { intro: t("formIntro"), label: t("formLink"), href: site.external.contactForm },
    {
      intro: t("complaintIntro"),
      label: t("complaintLink"),
      href: site.external.complaintReport,
    },
    {
      intro: t("surveyIntro"),
      label: t("surveyLink"),
      href: site.external.satisfactionSurvey,
    },
  ];

  return (
    <ContentPage
      title={tNav("contact")}
      route={ROUTE}
      icon={<SupportIcon />}
      wide
    >
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <h2 className="text-[30px] font-normal text-brand-600 md:text-[36px]">
            {t("title")}
          </h2>
          <p className="mt-3 text-[16px] text-ink-600">{t("lead")}</p>

          <dl className="mt-8 space-y-6">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <Phone className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-[14px] text-ink-500">{t("byPhone")}</dt>
                <dd className="mt-0.5 text-[16px] text-ink-800">
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors hover:text-brand-600"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                <MapPin className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <dt className="text-[14px] text-ink-500">{t("byOffice")}</dt>
                <dd className="mt-0.5 text-[16px] leading-relaxed text-ink-800">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </dd>
              </div>
            </div>
          </dl>

          {/* FR-CT-03/04/05 — external forms */}
          <div className="mt-10 space-y-6 border-t border-ink-200 pt-8">
            {links.map((l) => (
              <div key={l.label}>
                <p className="text-[15px] leading-relaxed text-ink-600">
                  {l.intro}
                </p>
                <a
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-2 text-[15px] font-bold text-brand-600 underline underline-offset-4 transition-colors hover:text-brand-700"
                >
                  {l.label}
                  <ExternalLink className="h-4 w-4" aria-hidden />
                  <span className="sr-only"> ({tc("externalLink")})</span>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* FR-CT-02 — Google Maps embed */}
        <div>
          <div className="overflow-hidden rounded-lg border border-ink-200">
            <iframe
              src={site.mapEmbedUrl}
              title={`${site.name} — ${locale === "id" ? "Lokasi" : "Location"}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[420px] w-full border-0"
            />
          </div>
          <a
            href={site.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-brand-600 hover:text-brand-700"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Google Maps
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </ContentPage>
  );
}
