"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Download, FileText } from "lucide-react";

import type { DocumentItem } from "@/lib/content";
import { pick } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Document listing with "Sort by Year" filter (FR-CS-01/02, FR-PS-04).
 * Set `groupByMonth` for SBDP, which is published monthly.
 */
export function DocumentList({
  documents,
  groupByMonth = false,
}: {
  documents: DocumentItem[];
  groupByMonth?: boolean;
}) {
  const t = useTranslations("common");
  const tReports = useTranslations("reports");
  const locale = useLocale();
  const [year, setYear] = useState<number | "all">("all");

  const years = useMemo(
    () => Array.from(new Set(documents.map((d) => d.year))).sort((a, b) => b - a),
    [documents],
  );

  const filtered = useMemo(
    () => (year === "all" ? documents : documents.filter((d) => d.year === year)),
    [documents, year],
  );

  const monthName = (m: number) =>
    new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
      month: "long",
    }).format(new Date(2000, m - 1, 1));

  if (!documents.length) {
    return (
      <p className="rounded-[12px] border border-dashed border-ink-200 bg-ink-50 px-6 py-12 text-center text-ink-500">
        {tReports("empty")}
      </p>
    );
  }

  return (
    <div>
      {/* Year filter */}
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <label
          htmlFor="year-filter"
          className="text-[15px] font-medium text-ink-700"
        >
          {t("sortByYear")}
        </label>
        <select
          id="year-filter"
          value={year}
          onChange={(e) =>
            setYear(e.target.value === "all" ? "all" : Number(e.target.value))
          }
          className="h-11 min-w-[180px] rounded-[12px] border border-ink-200 bg-white px-3 text-[15px] text-ink-800 transition-colors hover:border-brand-600 focus:border-brand-600"
        >
          <option value="all">{t("allYears")}</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {groupByMonth ? (
        <div className="space-y-12">
          {years
            .filter((y) => year === "all" || y === year)
            .map((y) => {
              const docs = filtered.filter((d) => d.year === y);
              if (!docs.length) return null;
              return (
                <div key={y}>
                  <h2 className="mb-5 text-[24px] font-bold text-brand-600">
                    {tReports("documentFor")} {y}
                  </h2>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {docs.map((doc) => (
                      <li
                        key={doc.id}
                        className="rounded-[12px] border border-ink-200 bg-white p-4 transition-shadow hover:shadow-md"
                      >
                        <p className="text-[15px] font-bold text-ink-900">
                          {doc.month ? monthName(doc.month) : pick(doc.title, locale)}
                        </p>
                        <p className="mt-0.5 text-[13px] text-ink-500">{y}</p>
                        <DocActions doc={doc} className="mt-3" compact />
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
        </div>
      ) : (
        <ul className="divide-y divide-ink-200">
          {filtered.map((doc) => (
            <li key={doc.id} className="py-8 first:pt-0">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-[24px] font-normal text-ink-900 md:text-[28px]">
                  {pick(doc.title, locale)}
                </h2>
              </div>
              <DocActions doc={doc} className="mt-4" />
            </li>
          ))}
        </ul>
      )}

      {!filtered.length && (
        <p className="py-10 text-center text-ink-500">{t("noData")}</p>
      )}
    </div>
  );
}

/** Download + View PDF pair, per the "pola tampilan dokumen" in the BRD. */
export function DocActions({
  doc,
  className,
  compact = false,
}: {
  doc: DocumentItem;
  className?: string;
  compact?: boolean;
}) {
  const t = useTranslations("common");
  const locale = useLocale();
  const label = pick(doc.title, locale);

  const cls = cn(
    "inline-flex items-center gap-2 rounded-[12px] border border-ink-200 bg-white font-medium text-ink-700",
    "transition-colors hover:border-brand-600 hover:text-brand-600",
    compact ? "px-3 py-1.5 text-[13px]" : "px-4 py-2.5 text-[14px]",
  );

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a href={doc.file.url} download className={cls} aria-label={`${t("download")} — ${label}`}>
        <Download className="h-4 w-4" aria-hidden />
        {t("download")}
      </a>
      <a
        href={doc.file.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
        aria-label={`${t("viewPdf")} — ${label}`}
      >
        <FileText className="h-4 w-4" aria-hidden />
        {t("viewPdf")}
      </a>
    </div>
  );
}
