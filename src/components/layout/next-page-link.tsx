import { getTranslations } from "next-intl/server";
import { ChevronRight } from "lucide-react";

import { nextRoute } from "@/config/navigation";
import { Link } from "@/i18n/routing";

/** "HALAMAN SELANJUTNYA: <Page> ›" band that closes every inner page. */
export async function NextPageLink({ current }: { current: string }) {
  const next = nextRoute(current);
  if (!next) return null;

  const [t, tNav] = await Promise.all([
    getTranslations("common"),
    getTranslations("nav"),
  ]);

  const key = next === "/" ? "home" : next.split("/").filter(Boolean).pop()!;
  let label: string;
  try {
    label = tNav(key);
  } catch {
    return null;
  }

  return (
    <section className="border-t border-ink-200 bg-white">
      <div className="container-rif py-12 text-center">
        <p className="text-[14px] uppercase tracking-wide text-ink-500">
          {t("nextPage")}
        </p>
        <Link
          href={next}
          className="group mt-2 inline-flex items-center gap-2 text-[26px] text-accent-400 transition-colors hover:text-accent-500 md:text-[34px]"
        >
          {label}
          <ChevronRight
            className="h-7 w-7 transition-transform duration-200 group-hover:translate-x-1"
            aria-hidden
          />
        </Link>
      </div>
    </section>
  );
}
