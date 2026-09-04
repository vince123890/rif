import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";

import { getCsrActivities, pick } from "@/lib/content";
import { Link } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { LeafIcon } from "@/components/ui/page-icons";
import { formatDate } from "@/lib/utils";

const ROUTE = "/about/csr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "csr", path: ROUTE });
}

/** FR-AB-11 — CSR gallery; each photo links to a detail page. */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, tc, activities] = await Promise.all([
    getTranslations("nav"),
    getTranslations("common"),
    getCsrActivities(),
  ]);

  return (
    <ContentPage
      title={tNav("csr")}
      route={ROUTE}
      icon={<LeafIcon />}
      wide
      crumbs={[{ label: tNav("about"), href: "/about/management-message" }]}
    >
      <p className="mb-10 max-w-3xl text-[16px] leading-relaxed text-ink-700">
        {locale === "id"
          ? "PT Resona Indonesia Finance berkomitmen memberikan kontribusi nyata bagi masyarakat dan lingkungan melalui berbagai program tanggung jawab sosial perusahaan."
          : "PT Resona Indonesia Finance is committed to making a tangible contribution to society and the environment through a range of corporate social responsibility programmes."}
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {activities.map((c) => (
          <article
            key={c.slug}
            className="group overflow-hidden rounded-[16px] border border-ink-200 bg-white transition-shadow hover:shadow-md"
          >
            <Link href={`/about/csr/${c.slug}`} tabIndex={-1} aria-hidden>
              <div className="relative aspect-16/10 bg-ink-100">
                <Image
                  src={c.image}
                  alt={pick(c.title, locale)}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="p-7">
              <time
                dateTime={c.date}
                className="text-[13px] font-medium text-brand-400"
              >
                {formatDate(c.date, locale)}
              </time>
              <h2 className="mt-1.5 text-[20px] font-bold leading-snug text-ink-900">
                <Link
                  href={`/about/csr/${c.slug}`}
                  className="transition-colors hover:text-brand-600"
                >
                  {pick(c.title, locale)}
                </Link>
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-700">
                {pick(c.summary, locale)}
              </p>
              <Link
                href={`/about/csr/${c.slug}`}
                className="mt-5 inline-flex items-center gap-2 text-[14px] font-bold text-accent-400 transition-colors hover:text-accent-500"
              >
                {tc("readMore")}
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden
                />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </ContentPage>
  );
}
