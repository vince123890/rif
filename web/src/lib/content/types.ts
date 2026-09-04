/**
 * Content types mirroring the planned Strapi collections (FR-CM-01/02).
 * The frontend only depends on these shapes, so swapping the mock data
 * source for the Strapi REST client is a single-module change.
 */

export type Locale = "id" | "en";

/** A value supplied in both languages. */
export type I18nText = Record<Locale, string>;

export type MediaFile = {
  url: string;
  /** Bytes; rendered next to download buttons when known. */
  size?: number;
  mime?: string;
};

/** Slide on the home hero carousel (FR-HM-01). */
export type HeroSlide = {
  id: string;
  image: string;
  kicker: I18nText;
  title: I18nText;
  titleAccent?: I18nText;
  lead: I18nText;
};

/** Financing product (FR-PS-01..03). */
export type Product = {
  slug: "investment-financing" | "working-capital" | "factoring";
  name: I18nText;
  summary: I18nText;
  image: string;
  /** Bullet list of what the facility covers. */
  highlights: { id: string[]; en: string[] };
  body: I18nText;
};

/** A downloadable document grouped by year (FR-CS-01/02, FR-PS-04, FR-GC-*). */
export type DocumentItem = {
  id: string;
  title: I18nText;
  year: number;
  /** 1–12 when the document is issued monthly (SBDP). */
  month?: number;
  thumbnail?: string;
  file: MediaFile;
};

/** News article (FR-NW-01..05). */
export type Article = {
  slug: string;
  category: "education" | "csr";
  title: I18nText;
  excerpt: I18nText;
  body: I18nText;
  image: string;
  publishedAt: string;
  tags: string[];
};

/** Job vacancy (FR-CR-01..04). */
export type Vacancy = {
  id: string;
  title: I18nText;
  location: I18nText;
  type: I18nText;
  description: I18nText;
  requirements: { id: string[]; en: string[] };
  postedAt: string;
  applyUrl?: string;
};

/** Board member (FR-AB-07). */
export type Person = {
  id: string;
  name: string;
  position: I18nText;
  board: "commissioners" | "directors";
  photo?: string;
};

/** Award entry (FR-AB-10). */
export type Award = {
  id: string;
  year: number;
  title: I18nText;
  description: I18nText;
  image: string;
};

/** CSR activity (FR-AB-11). */
export type CsrActivity = {
  slug: string;
  title: I18nText;
  summary: I18nText;
  body: I18nText;
  image: string;
  date: string;
};

/** Simple rich-text page managed in the CMS. */
export type StaticPage = {
  key: string;
  title: I18nText;
  body: I18nText;
  /** Optional attached PDF, e.g. GCG / AML-CFT policy documents. */
  document?: MediaFile;
};
