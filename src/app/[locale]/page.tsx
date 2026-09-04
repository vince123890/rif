import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FileText, Leaf } from "lucide-react";

import {
  getArticles,
  getFinancialReports,
  getHeroSlides,
  getProducts,
  getSustainabilityReports,
} from "@/lib/content";
import { Link } from "@/i18n/routing";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ProductTabs } from "@/components/content/product-tabs";
import { ArticleCard } from "@/components/content/article-card";
import { Section, SectionHeading } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [slides, products, articles, sustainability, financial] = await Promise.all([
    getHeroSlides(),
    getProducts(),
    getArticles({ limit: 3 }),
    getSustainabilityReports(),
    getFinancialReports(),
  ]);

  const stats = [
    { value: `${new Date().getFullYear() - 1984}+`, label: t("statYears") },
    { value: "1984", label: t("statSince") },
    { value: "Resona Group", label: t("statGroup") },
    { value: "OJK", label: t("statOjk") },
  ];

  return (
    <>
      {/* FR-HM-01 */}
      <HeroCarousel slides={slides} />

      {/* Company at a glance strip */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container-rif grid grid-cols-2 gap-8 py-12 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-[28px] font-bold leading-tight text-brand-600 md:text-[34px]">
                {s.value}
              </p>
              <p className="mt-1 text-[14px] text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Message from the management */}
      <Section tone="white">
        <div className="container-rif grid items-center gap-12 lg:grid-cols-[1fr_1.15fr]">
          <div className="relative aspect-4/3 overflow-hidden rounded-lg bg-ink-100">
            <Image
              src="/images/meeting-boardroom.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="eyebrow">{t("managementKicker")}</p>
            <h2 className="mt-3 text-[27px] font-normal leading-tight text-brand-600 md:text-[34px]">
              Para Pemegang Saham dan Pemangku Kepentingan yang terhormat,
            </h2>
            <p className="mt-5 text-[15px] leading-[1.85] text-ink-600">
              Perekonomian global menunjukkan kinerja yang bervariasi, dipengaruhi
              oleh tensi geopolitik, fragmentasi perdagangan, serta dinamika
              kebijakan moneter di berbagai negara. Dalam situasi ketidakpastian
              ini, Indonesia berhasil mencatatkan pertumbuhan ekonomi yang
              terjaga, ditopang oleh sektor jasa keuangan yang tetap resilien.
            </p>
            <p className="mt-4 text-[15px] leading-[1.85] text-ink-600">
              PT Resona Indonesia Finance terus berkomitmen menghadirkan solusi
              pembiayaan yang relevan bagi pertumbuhan bisnis nasabah, dengan
              tetap menjunjung tinggi prinsip kehati-hatian dan tata kelola
              perusahaan yang baik.
            </p>
            <div className="mt-8">
              <ButtonLink href="/about/management-message" variant="accent">
                {tc("more")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* FR-HM-02 — Product & Services */}
      <Section tone="gray">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("productsKicker")}
            title={t("productsTitle")}
            lead={t("productsLead")}
          />
          <div className="mt-12">
            <ProductTabs products={products} />
          </div>
        </div>
      </Section>

      {/* FR-HM-03 — Report highlights */}
      <Section tone="white">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("reportKicker")}
            title={t("reportTitle")}
            lead={t("reportLead")}
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <ReportCard
              icon={<Leaf className="h-6 w-6" aria-hidden />}
              title="Laporan Keberlanjutan"
              years={sustainability.slice(0, 3).map((d) => d.year)}
              href="/corporate-secretary/sustainability-report"
              cta={tc("more")}
            />
            <ReportCard
              icon={<FileText className="h-6 w-6" aria-hidden />}
              title="Laporan Keuangan"
              years={financial.slice(0, 3).map((d) => d.year)}
              href="/corporate-secretary/financial-report"
              cta={tc("more")}
            />
          </div>
        </div>
      </Section>

      {/* FR-HM-04 — News */}
      <Section tone="mint">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("newsKicker")}
            title={t("newsTitle")}
            lead={t("newsLead")}
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <ButtonLink href="/news" variant="accent">
              {tc("more")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

function ReportCard({
  icon,
  title,
  years,
  href,
  cta,
}: {
  icon: React.ReactNode;
  title: string;
  years: number[];
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-lg border border-ink-200 bg-white p-7 transition-shadow hover:shadow-md">
      <span className="grid h-12 w-12 place-items-center rounded-md bg-brand-50 text-brand-600">
        {icon}
      </span>
      <h3 className="mt-5 text-[21px] font-bold text-ink-900">{title}</h3>

      <ul className="mt-5 flex flex-wrap gap-2">
        {years.map((y) => (
          <li
            key={y}
            className="rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1 text-[13px] font-medium text-brand-700"
          >
            {y}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-7">
        <Link
          href={href}
          className="text-[14px] font-bold text-accent-400 underline underline-offset-4 transition-colors hover:text-accent-500"
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
