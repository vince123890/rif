"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";

import { Link, usePathname } from "@/i18n/routing";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  children?: NavItem[];
};

export function MainNav({ items }: { items: NavItem[] }) {
  const t = useTranslations("common");
  const pathname = usePathname();
  const [open, setOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close any open menu when the route changes. Deriving this during render
  // (rather than in an effect) avoids a cascading re-render on every nav.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(null);
    setMobileOpen(false);
  }

  // Dismiss the desktop dropdown on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <div ref={navRef} className="bg-brand-600 shadow-sm">
      <div className="container-rif flex h-16 items-center justify-between lg:h-[52px]">
        {/* Mobile brand */}
        <Link href="/" className="lg:hidden" aria-label={site.name}>
          <Logo tone="light" />
        </Link>

        {/* Desktop menu */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {items.map((item) => {
              const hasKids = !!item.children?.length;
              const expanded = open === item.key;

              return (
                <li key={item.key} className="relative">
                  {hasKids ? (
                    <button
                      type="button"
                      aria-expanded={expanded}
                      aria-haspopup="true"
                      onClick={() => setOpen(expanded ? null : item.key)}
                      onMouseEnter={() => setOpen(item.key)}
                      className={cn(
                        "flex items-center gap-1 px-3 py-4 text-[14px] font-medium transition-colors",
                        isActive(item.href) || expanded
                          ? "text-accent-300"
                          : "text-white hover:text-accent-300",
                      )}
                    >
                      {item.label}
                      <ChevronDown
                        className={cn(
                          "h-3.5 w-3.5 transition-transform duration-200",
                          expanded && "rotate-180",
                        )}
                        aria-hidden
                      />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onMouseEnter={() => setOpen(null)}
                      className={cn(
                        "block px-3 py-4 text-[14px] font-medium transition-colors",
                        isActive(item.href)
                          ? "text-accent-300"
                          : "text-white hover:text-accent-300",
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {hasKids && expanded && (
                    <div
                      onMouseLeave={() => setOpen(null)}
                      className="absolute left-0 top-full z-50 min-w-[290px] animate-fade-up rounded-b-md border-t-2 border-accent-400 bg-white py-2 shadow-xl"
                    >
                      <ul>
                        {item.children!.map((child) => (
                          <SubMenuItem key={child.key} item={child} />
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <button
            type="button"
            className="rounded-md p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && <MobileMenu items={items} isActive={isActive} />}
    </div>
  );
}

/** Second level, with an optional flyout for the third (Company Profile). */
function SubMenuItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const hasKids = !!item.children?.length;

  if (!hasKids) {
    return (
      <li>
        <Link
          href={item.href}
          className="block px-5 py-2.5 text-[14px] text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
        >
          {item.label}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-5 py-2.5 text-left text-[14px] text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
      >
        {item.label}
        <ChevronRight className="h-3.5 w-3.5 shrink-0" aria-hidden />
      </button>

      {open && (
        <div className="absolute left-full top-0 z-50 min-w-[270px] rounded-md border-t-2 border-accent-400 bg-white py-2 shadow-xl">
          <ul>
            {item.children!.map((g) => (
              <li key={g.key}>
                <Link
                  href={g.href}
                  className="block px-5 py-2.5 text-[14px] text-ink-700 transition-colors hover:bg-brand-50 hover:text-brand-600"
                >
                  {g.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

function MobileMenu({
  items,
  isActive,
}: {
  items: NavItem[];
  isActive: (href: string) => boolean;
}) {
  const [expanded, setExpanded] = useState<string[]>([]);
  const toggle = (key: string) =>
    setExpanded((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );

  return (
    <nav
      aria-label="Mobile"
      className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-white/15 bg-brand-600 pb-6 lg:hidden"
    >
      <ul className="container-rif divide-y divide-white/10">
        {items.map((item) => {
          const hasKids = !!item.children?.length;
          const isOpen = expanded.includes(item.key);

          return (
            <li key={item.key}>
              <div className="flex items-center">
                <Link
                  href={item.href}
                  className={cn(
                    "flex-1 py-3.5 text-[15px] font-medium",
                    isActive(item.href) ? "text-accent-300" : "text-white",
                  )}
                >
                  {item.label}
                </Link>
                {hasKids && (
                  <button
                    type="button"
                    onClick={() => toggle(item.key)}
                    aria-expanded={isOpen}
                    aria-label={item.label}
                    className="p-3 text-white/80"
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                )}
              </div>

              {hasKids && isOpen && (
                <ul className="space-y-0.5 pb-3 pl-4">
                  {item.children!.map((child) => (
                    <li key={child.key}>
                      <Link
                        href={child.href}
                        className="block py-2 text-[14px] text-white/85"
                      >
                        {child.label}
                      </Link>
                      {child.children?.length ? (
                        <ul className="mb-1 space-y-0.5 border-l border-white/20 pl-4">
                          {child.children.map((g) => (
                            <li key={g.key}>
                              <Link
                                href={g.href}
                                className="block py-1.5 text-[13px] text-white/70"
                              >
                                {g.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
