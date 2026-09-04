import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Localised long date, e.g. "18 Juli 2025" / "18 July 2025". */
export function formatDate(value: string | Date, locale: string) {
  const d = typeof value === "string" ? new Date(value) : value;
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}

/** Short date parts for the badge overlaid on news thumbnails. */
export function dateParts(value: string | Date, locale: string) {
  const d = typeof value === "string" ? new Date(value) : value;
  const loc = locale === "id" ? "id-ID" : "en-GB";
  return {
    day: new Intl.DateTimeFormat(loc, { day: "2-digit" }).format(d),
    month: new Intl.DateTimeFormat(loc, { month: "short" }).format(d),
    year: d.getFullYear(),
  };
}
