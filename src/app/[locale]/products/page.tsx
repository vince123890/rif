import { getTranslations, setRequestLocale } from "next-intl/server";

import { getProducts } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";
import { ContentPage } from "@/components/layout/content-page";
import { ProductTabs } from "@/components/content/product-tabs";
import { HandshakeIcon } from "@/components/ui/page-icons";

const ROUTE = "/products";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata({ locale, titleKey: "products", path: ROUTE });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tNav, products] = await Promise.all([
    getTranslations("nav"),
    getProducts(),
  ]);

  return (
    <ContentPage
      title={tNav("products")}
      route={ROUTE}
      icon={<HandshakeIcon />}
      wide
    >
      <p className="mb-8 text-[16px] text-ink-600">
        PT Resona Indonesia Finance{" "}
        {locale === "id"
          ? "menyediakan Fasilitas Pembiayaan berupa:"
          : "provides financing facilities in the form of:"}
      </p>
      <ProductTabs products={products} />
    </ContentPage>
  );
}
