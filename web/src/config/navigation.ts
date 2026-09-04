/**
 * Sitemap — BRD §5 "Sitemap & Struktur Menu".
 * 8 main menus, max depth 3.
 *
 * `enabled: false` hides an item from the frontend navigation without
 * deleting it (FR-GL-04, Enable/Disable Menu). When the Strapi CMS is
 * wired up this flag is what the `menu` collection drives.
 */

export type NavNode = {
  /** i18n key under `nav.*` */
  key: string;
  /** Locale-independent path, without the /{locale} prefix. */
  href: string;
  enabled?: boolean;
  children?: NavNode[];
};

export const navigation: NavNode[] = [
  { key: "home", href: "/" },
  {
    key: "about",
    href: "/about",
    children: [
      { key: "management-message", href: "/about/management-message" },
      {
        key: "company-profile",
        href: "/about/company-profile",
        children: [
          { key: "vision-mission", href: "/about/company-profile/vision-mission" },
          { key: "at-a-glance", href: "/about/company-profile/at-a-glance" },
          { key: "history", href: "/about/company-profile/history" },
          { key: "business-license", href: "/about/company-profile/business-license" },
          { key: "finance-facilities", href: "/about/company-profile/finance-facilities" },
          { key: "management", href: "/about/company-profile/management" },
          {
            key: "organization-structure",
            href: "/about/company-profile/organization-structure",
          },
          { key: "shareholders", href: "/about/company-profile/shareholders" },
          { key: "award", href: "/about/company-profile/award" },
        ],
      },
      { key: "csr", href: "/about/csr" },
      { key: "privacy", href: "/about/privacy" },
      { key: "bank-resona-perdania", href: "/about/bank-resona-perdania" },
    ],
  },
  {
    key: "gcg",
    href: "/gcg",
    children: [
      { key: "anti-fraud", href: "/gcg/anti-fraud" },
      { key: "integrity-pact", href: "/gcg/integrity-pact" },
      { key: "good-corporate-governance", href: "/gcg/good-corporate-governance" },
      { key: "aml-cft", href: "/gcg/aml-cft" },
    ],
  },
  {
    key: "corporate-secretary",
    href: "/corporate-secretary",
    children: [
      {
        key: "sustainability-report",
        href: "/corporate-secretary/sustainability-report",
      },
      { key: "financial-report", href: "/corporate-secretary/financial-report" },
      { key: "business-strategy", href: "/corporate-secretary/business-strategy" },
      { key: "privacy", href: "/corporate-secretary/privacy" },
    ],
  },
  {
    key: "products",
    href: "/products",
    children: [
      { key: "investment-financing", href: "/products/investment-financing" },
      { key: "working-capital", href: "/products/working-capital" },
      { key: "factoring", href: "/products/factoring" },
      { key: "sbdp", href: "/products/sbdp" },
    ],
  },
  {
    key: "news",
    href: "/news",
    children: [
      { key: "news-education", href: "/news?category=education" },
      { key: "news-csr", href: "/news?category=csr" },
    ],
  },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
];

/** Visible navigation tree (FR-GL-04). */
export function visibleNavigation(nodes: NavNode[] = navigation): NavNode[] {
  return nodes
    .filter((n) => n.enabled !== false)
    .map((n) => ({
      ...n,
      children: n.children ? visibleNavigation(n.children) : undefined,
    }));
}

/** Flattened list of real page routes, used for sitemap.xml and prev/next. */
export function flattenRoutes(nodes: NavNode[] = navigation): string[] {
  const out: string[] = [];
  const walk = (list: NavNode[]) => {
    for (const n of list) {
      if (n.enabled === false) continue;
      if (!n.href.includes("?")) out.push(n.href);
      if (n.children) walk(n.children);
    }
  };
  walk(nodes);
  return Array.from(new Set(out));
}

/**
 * "HALAMAN SELANJUTNYA" footer link seen on every existing RIF page —
 * walks the flattened sitemap in document order.
 */
export function nextRoute(current: string): string | null {
  const routes = flattenRoutes();
  const i = routes.indexOf(current);
  if (i === -1 || i === routes.length - 1) return null;
  return routes[i + 1];
}
