import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/** NFR-PF-02 — robots.txt. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
