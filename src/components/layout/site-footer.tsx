import { getTranslations } from "next-intl/server";

import { site } from "@/config/site";
import { visibleNavigation } from "@/config/navigation";
import { Link } from "@/i18n/routing";
import { Logo } from "./logo";

/** FR-GL-02 — footer: contact summary, key links, map, legal statement. */
export async function SiteFooter() {
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);

  const menu = visibleNavigation();

  // "TAUTAN" — deep links to the most requested pages, as on the current site.
  const quickLinks = [
    "/about/company-profile/management",
    "/about/company-profile/award",
    "/about/csr",
    "/about/privacy",
    "/gcg/anti-fraud",
    "/corporate-secretary/sustainability-report",
    "/corporate-secretary/financial-report",
    "/corporate-secretary/business-strategy",
    "/about/bank-resona-perdania",
  ];
  const keyOf = (href: string) => href.split("/").filter(Boolean).pop()!;

  return (
    <footer className="bg-brand-600 text-white/90">
      <div className="container-rif grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.3fr] lg:gap-8">
        {/* Company */}
        <div>
          <Logo tone="light" />
          <p className="mt-5 text-[13px] leading-relaxed text-white/80">
            {t("about")}
          </p>

          <div className="mt-6 space-y-1">
            <p className="text-[12px] italic text-white/60">
              {t("addressLabel")}
            </p>
            <p className="text-[14px]">{site.address.line1}</p>
            <p className="text-[14px]">{site.address.line2}</p>
          </div>

          <div className="mt-5 space-y-1">
            <p className="text-[12px] italic text-white/60">{t("phoneLabel")}</p>
            <p className="text-[14px]">
              {site.phone} / {site.fax}
            </p>
          </div>
        </div>

        {/* Main menu */}
        <nav aria-label={t("menu")}>
          <h2 className="mb-4 text-[15px] font-bold tracking-wide text-white">
            {t("menu")}
          </h2>
          <ul className="space-y-2.5">
            {menu.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="text-[14px] text-white/85 transition-colors hover:text-accent-300"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick links */}
        <nav aria-label={t("links")}>
          <h2 className="mb-4 text-[15px] font-bold tracking-wide text-white">
            {t("links")}
          </h2>
          <ul className="space-y-2.5">
            {quickLinks.map((href) => (
              <li key={href}>
                <Link
                  href={href}
                  className="text-[14px] text-white/85 transition-colors hover:text-accent-300"
                >
                  {tNav(keyOf(href))}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Location */}
        <div>
          <h2 className="mb-4 text-[15px] font-bold tracking-wide text-white">
            {t("location")}
          </h2>
          <div className="overflow-hidden rounded-md border border-white/20">
            <iframe
              src={site.mapEmbedUrl}
              title={`${site.name} — ${t("location")}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[260px] w-full border-0"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-rif flex flex-col gap-2 py-5 text-[13px] md:flex-row md:items-center md:justify-between">
          <p className="font-bold">{t("ojk")}</p>
          <p className="text-white/80">
            ©{new Date().getFullYear()} {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
