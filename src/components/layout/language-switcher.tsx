"use client";

import { useState, useTransition, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ChevronDown, Globe } from "lucide-react";

import { routing, usePathname, useRouter } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = { id: "ID", en: "EN" };

/** FR-GL-03 — language switcher; keeps the visitor on the same page. */
export function LanguageSwitcher() {
  const t = useTranslations("common");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const switchTo = (next: string) => {
    setOpen(false);
    if (next === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: next as "id" | "en" });
    });
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("language")}
        aria-expanded={open}
        aria-haspopup="listbox"
        disabled={pending}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-md px-3 py-2 text-[14px] font-medium text-white transition-colors hover:bg-white/10 disabled:opacity-60"
      >
        <Globe className="h-4 w-4" aria-hidden />
        {LABELS[locale] ?? locale.toUpperCase()}
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[130px] overflow-hidden rounded-md border border-ink-200 bg-white py-1 shadow-xl"
        >
          {routing.locales.map((l) => (
            <li key={l}>
              <button
                type="button"
                role="option"
                aria-selected={l === locale}
                onClick={() => switchTo(l)}
                className={cn(
                  "block w-full px-4 py-2 text-left text-[14px] transition-colors hover:bg-brand-50",
                  l === locale
                    ? "font-bold text-brand-600"
                    : "text-ink-700 hover:text-brand-600",
                )}
              >
                {l === "id" ? "Bahasa Indonesia" : "English"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
