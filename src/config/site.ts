/** Company facts — BRD §6.8 (FR-CT-01) and the existing site footer. */
export const site = {
  name: "PT Resona Indonesia Finance",
  shortName: "Resona Indonesia Finance",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.rif.co.id",
  phone: "021 - 570 1956",
  fax: "021 - 570 1961",
  email: "pengaduan@rif.co.id",
  address: {
    line1: "Sampoerna Strategic Square South Tower, Level 9",
    line2: "Jl. Jend. Sudirman Kav. 45-46, Jakarta Selatan 12930",
    short: "Jl. Jend. Sudirman Kav. 45-46 - Jakarta Selatan 12930",
  },
  /** FR-CT-02 — Google Maps embed. */
  mapEmbedUrl:
    "https://www.google.com/maps?q=Sampoerna+Strategic+Square+South+Tower+Jakarta&output=embed",
  mapLink: "https://maps.google.com/?q=PT+Resona+Indonesia+Finance+Jakarta",
  /** BRD §8.2 — external integrations. */
  external: {
    bankResonaPerdania: "https://www.perdania.co.id/",
    jobstreet: "https://www.jobstreet.co.id/",
    /** FR-CT-03/04/05 — Microsoft Forms links, supplied by RIF. */
    contactForm: "https://forms.office.com/",
    complaintReport: "https://forms.office.com/",
    satisfactionSurvey: "https://forms.office.com/",
  },
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID,
    gtmId: process.env.NEXT_PUBLIC_GTM_ID,
  },
} as const;
