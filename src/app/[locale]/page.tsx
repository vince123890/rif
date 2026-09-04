import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Play } from "lucide-react";

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
import {
  FeaturePanel,
  Section,
  SectionHeading,
} from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { milestones } from "@/lib/content/milestones";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const [slides, products, articles, sustainability, financial] =
    await Promise.all([
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

      {/* Key facts strip */}
      <section className="border-b border-ink-200 bg-white">
        <div className="container-rif grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-[30px] font-bold leading-tight text-brand-600 md:text-[40px]">
                {s.value}
              </p>
              <p className="mt-1.5 text-[15px] text-ink-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---- HISTORY — the fig's signature section: timeline + video card ---- */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("historyKicker")}
            title={t("historyTitle")}
            lead={t("historyLead")}
          />

          <div className="mt-16 grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14">
            {/* Video / story card */}
            <div className="relative overflow-hidden rounded-[16px] bg-ink-900">
              <Image
                src="/images/city-skyline-alt.jpg"
                alt=""
                width={760}
                height={900}
                sizes="(min-width: 1024px) 380px, 100vw"
                className="h-full min-h-[320px] w-full object-cover opacity-70"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent p-8">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent-400 text-white">
                  <Play className="h-6 w-6 fill-current" aria-hidden />
                </span>
                <h3 className="mt-6 text-[20px] font-bold text-white">
                  {locale === "id"
                    ? "Video Profil Perusahaan"
                    : "Company Profile Video"}
                </h3>
                <p className="mt-1 text-[14px] text-white/80">
                  {locale === "id"
                    ? "Saksikan kisah kami"
                    : "Watch our story unfold"}
                </p>
              </div>
            </div>

            {/* Milestone timeline */}
            <ol className="relative space-y-8 before:absolute before:bottom-2 before:left-[7px] before:top-2 before:w-px before:bg-ink-300">
              {milestones.slice(0, 4).map((m, i) => (
                <li key={i} className="relative pl-9">
                  <span
                    aria-hidden
                    className="absolute left-0 top-1.5 h-3.5 w-3.5 rounded-full bg-accent-400 ring-4 ring-canvas"
                  />
                  <p className="text-[14px] font-bold text-ink-900">
                    {m.year} {m.month[locale === "en" ? "en" : "id"]}
                  </p>
                  <p className="mt-1.5 text-[16px] leading-relaxed text-ink-500">
                    {m.body[locale === "en" ? "en" : "id"]}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-14 text-center">
            <ButtonLink href="/about/company-profile/history" size="lg">
              {t("historyCta")}
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ---- REPORTS — dark green feature panel (fig: radius 50) ---- */}
      <div className="bg-canvas pb-20 md:pb-24 lg:pb-28">
        <FeaturePanel>
          <SectionHeading
            eyebrow={t("reportKicker")}
            title={t("reportTitle")}
            lead={t("reportLead")}
            tone="light"
          />

          <div className="mx-auto mt-14 grid max-w-4xl gap-6 md:grid-cols-2">
            <ReportCard
              title={
                locale === "id"
                  ? "Laporan Keberlanjutan"
                  : "Sustainability Report"
              }
              years={sustainability.slice(0, 3).map((d) => d.year)}
              href="/corporate-secretary/sustainability-report"
              cta={tc("more")}
            />
            <ReportCard
              title={
                locale === "id" ? "Laporan Keuangan" : "Financial Report"
              }
              years={financial.slice(0, 3).map((d) => d.year)}
              href="/corporate-secretary/financial-report"
              cta={tc("more")}
            />
          </div>
        </FeaturePanel>
      </div>

      {/* ---- MESSAGE FROM THE MANAGEMENT ---- */}
      <Section tone="white">
        <div className="container-rif grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="relative aspect-4/3 overflow-hidden rounded-[16px] bg-ink-100">
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
            <h2 className="mt-4 text-[28px] font-bold leading-tight text-ink-900 md:text-[36px]">
              {locale === "id"
                ? "Para Pemegang Saham dan Pemangku Kepentingan yang terhormat,"
                : "Dear Shareholders and Stakeholders,"}
            </h2>
            <p className="mt-6 text-[16px] leading-[1.9] text-ink-700">
              {locale === "id"
                ? "Perekonomian global menunjukkan kinerja yang bervariasi, dipengaruhi oleh tensi geopolitik, fragmentasi perdagangan, serta dinamika kebijakan moneter di berbagai negara. Dalam situasi ketidakpastian ini, Indonesia berhasil mencatatkan pertumbuhan ekonomi yang terjaga, ditopang oleh sektor jasa keuangan yang tetap resilien."
                : "The global economy has shown varied performance, influenced by geopolitical tensions, trade fragmentation, and monetary policy dynamics across countries. Amid this uncertainty, Indonesia has recorded steady economic growth, supported by a resilient financial services sector."}
            </p>
            <div className="mt-9">
              <ButtonLink href="/about/management-message" variant="accent">
                {tc("more")}
              </ButtonLink>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- PRODUCTS ---- */}
      <Section tone="canvas">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("productsKicker")}
            title={t("productsTitle")}
            lead={t("productsLead")}
          />
          <div className="mt-14">
            <ProductTabs products={products} />
          </div>
          <div className="mt-12 text-center">
            <ButtonLink href="/products" size="lg">
              {t("productsCta")}
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* ---- NEWS — peach wash (fig: #EDB886 @ 10%) ---- */}
      <Section tone="peach">
        <div className="container-rif">
          <SectionHeading
            eyebrow={t("newsKicker")}
            title={t("newsTitle")}
            lead={t("newsLead")}
          />

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <ButtonLink href="/news" size="lg">
              {t("newsCta")}
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  );
}

/** Report card sitting on the dark green panel. */
function ReportCard({
  title,
  years,
  href,
  cta,
}: {
  title: string;
  years: number[];
  href: string;
  cta: string;
}) {
  return (
    <div className="flex flex-col rounded-[16px] bg-white/95 p-8 transition-transform duration-300 hover:-translate-y-1">
      <h3 className="text-[20px] font-bold text-ink-900">{title}</h3>

      <ul className="mt-5 flex flex-wrap gap-2">
        {years.map((y) => (
          <li
            key={y}
            className="rounded-full bg-ink-50 px-4 py-1.5 text-[13px] font-bold text-ink-700"
          >
            {y}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Link
          href={href}
          className="group inline-flex items-center gap-2 text-[15px] font-bold text-accent-400 transition-colors hover:text-accent-500"
        >
          {cta}
          <ArrowRight
            className="h-4 w-4 transition-transform group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </div>
  );
}
