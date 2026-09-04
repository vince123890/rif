import { getTranslations } from "next-intl/server";
import { MapPin, Phone } from "lucide-react";

import { site } from "@/config/site";
import { visibleNavigation } from "@/config/navigation";
import { Link } from "@/i18n/routing";
import { Logo } from "./logo";
import { MainNav } from "./main-nav";

export async function SiteHeader() {
  const t = await getTranslations("nav");
  const nav = visibleNavigation();

  // Labels resolve on the server so the client nav stays a thin shell.
  const items = nav.map((n) => ({
    key: n.key,
    label: t(n.key),
    href: n.href,
    children: n.children?.map((c) => ({
      key: c.key,
      label: t(c.key),
      href: c.href,
      children: c.children?.map((g) => ({
        key: g.key,
        label: t(g.key),
        href: g.href,
      })),
    })),
  }));

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar — brand lockup left, contact right */}
      <div className="hidden border-b border-ink-200 bg-white lg:block">
        <div className="container-rif flex h-[72px] items-center justify-between">
          <Link href="/" aria-label={site.name}>
            <Logo />
          </Link>
          <div className="flex items-center gap-8 text-[13px] text-ink-500">
            <span className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-brand-600" aria-hidden />
              {site.address.short}
            </span>
            <a
              href={`tel:${site.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex items-center gap-2 transition-colors hover:text-brand-600"
            >
              <Phone className="h-4 w-4 text-brand-600" aria-hidden />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <MainNav items={items} />
    </header>
  );
}
