"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Check } from "lucide-react";

import type { Product } from "@/lib/content";
import { pick, pickList } from "@/lib/content";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Tabbed product panel — the "Pembiayaan Investasi / Modal Kerja / Anjak Piutang"
 * card from the existing site (FR-HM-02, FR-PS-01..03).
 */
export function ProductTabs({ products }: { products: Product[] }) {
  const t = useTranslations("common");
  const locale = useLocale();
  const [active, setActive] = useState(0);

  if (!products.length) return null;
  const product = products[active];

  return (
    <div className="overflow-hidden rounded-lg border border-brand-200 bg-white shadow-sm">
      {/* Tab list */}
      <div role="tablist" aria-label="Products" className="flex flex-wrap gap-1 border-b border-ink-200 px-4 pt-4 sm:px-8">
        {products.map((p, i) => (
          <button
            key={p.slug}
            role="tab"
            id={`tab-${p.slug}`}
            aria-selected={i === active}
            aria-controls={`panel-${p.slug}`}
            onClick={() => setActive(i)}
            className={cn(
              "relative -mb-px border-b-2 px-4 py-3 text-[15px] transition-colors",
              i === active
                ? "border-brand-600 font-bold text-brand-600"
                : "border-transparent text-ink-500 hover:text-ink-800",
            )}
          >
            {pick(p.name, locale)}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`panel-${product.slug}`}
        aria-labelledby={`tab-${product.slug}`}
        className="grid gap-8 p-6 sm:p-8 lg:grid-cols-2 lg:gap-12"
      >
        <div className="relative aspect-4/3 overflow-hidden rounded-md bg-ink-100">
          <Image
            src={product.image}
            alt={pick(product.name, locale)}
            fill
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h3 className="text-[22px] font-normal leading-snug text-ink-900 md:text-[26px]">
            {pick(product.summary, locale)}
          </h3>

          <ul className="mt-6 space-y-3 border-t border-ink-200 pt-6">
            {pickList(product.highlights, locale).map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-ink-600">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-400" aria-hidden />
                {item}
              </li>
            ))}
          </ul>

          {/* Multi-currency marks, as on the existing product card */}
          <div className="mt-7 flex gap-3" aria-label="IDR, USD, JPY">
            {["Rp", "$", "¥"].map((c) => (
              <span
                key={c}
                className="grid h-11 w-11 place-items-center rounded-full bg-brand-600 text-[17px] font-bold text-white"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <ButtonLink href={`/products/${product.slug}`} variant="accent">
              {t("more")}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}
