import { getTranslations, setRequestLocale } from "next-intl/server";

import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { ZoomableImage } from "@/components/content/zoomable-image";
import { PeopleIcon } from "@/components/ui/page-icons";

const ROUTE = "/about/company-profile/organization-structure";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "organization-structure", path: ROUTE });
}

/** FR-AB-08 — organisation chart image with a zoom facility. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tNav = await getTranslations("nav");

  return (
    <ContentPage
      title={tNav("organization-structure")}
      route={ROUTE}
      icon={<PeopleIcon />}
      wide
      crumbs={[
        { label: tNav("about"), href: "/about/management-message" },
        {
          label: tNav("company-profile"),
          href: "/about/company-profile/vision-mission",
        },
      ]}
    >
      <ZoomableImage
        src="/images/org-structure.svg"
        alt={tNav("organization-structure")}
        width={1400}
        height={900}
      />
    </ContentPage>
  );
}
