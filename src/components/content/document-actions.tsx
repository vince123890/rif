import { getTranslations } from "next-intl/server";
import { Download, FileText } from "lucide-react";

import type { MediaFile } from "@/lib/content";
import { cn } from "@/lib/utils";

/** FR-GC-02 — "View PDF" / "Download" pair for a single attached document. */
export async function DocumentActions({
  file,
  className,
}: {
  file: MediaFile;
  className?: string;
}) {
  const t = await getTranslations("common");

  const cls =
    "inline-flex items-center gap-2 rounded-[12px] border border-ink-200 bg-white px-4 py-2.5 " +
    "text-[14px] font-medium text-ink-700 transition-colors hover:border-brand-600 hover:text-brand-600";

  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      <a href={file.url} download className={cls}>
        <Download className="h-4 w-4" aria-hidden />
        {t("download")}
      </a>
      <a
        href={file.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        <FileText className="h-4 w-4" aria-hidden />
        {t("viewPdf")}
      </a>
    </div>
  );
}
