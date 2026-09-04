import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Check } from "lucide-react";

import { getProduct, getProducts, pick, pickList } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { RichText } from "@/components/ui/rich-text";
import { HandshakeIcon } from "@/components/ui/page-icons";

export async function generateStaticParams() {
  const products = await getProducts();
  return routing.locales.flatMap((locale) =>
    products.map((p) => ({ locale, slug: p.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};

  return buildMetadata({
    locale,
    title: pick(product.name, locale),
    description: pick(product.summary, locale),
    path: `/products/${slug}`,
    image: product.image,
  });
}

/** FR-PS-01..03 — informational product page (no transaction features). */
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const product = await getProduct(slug);
  if (!product) notFound();

  const tNav = await getTranslations("nav");

  return (
    <ContentPage
      title={pick(product.name, locale)}
      route={`/products/${slug}`}
      icon={<HandshakeIcon />}
      wide
      crumbs={[{ label: tNav("products"), href: "/products" }]}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-14">
        <div>
          <div className="relative aspect-4/3 overflow-hidden rounded-[16px] bg-ink-100">
            <Image
              src={product.image}
              alt={pick(product.name, locale)}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>

          <ul className="mt-7 space-y-3 rounded-[16px] border border-brand-200 bg-brand-50 p-6">
            {pickList(product.highlights, locale).map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-[15px] text-ink-700"
              >
                <Check
                  className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-[24px] font-normal leading-snug text-ink-900 md:text-[28px]">
            {pick(product.summary, locale)}
          </h2>
          <RichText html={pick(product.body, locale)} className="mt-7" />
        </div>
      </div>
    </ContentPage>
  );
}
