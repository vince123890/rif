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
  /**
   * FR-CT-02 — Google Maps embed.
   * Pinned to the office's exact coordinates rather than a text search, so
   * the marker always lands on the RIF entry rather than a nearby match.
   */
  coordinates: { lat: -6.216808, lng: 106.8179903 },
  mapEmbedUrl:
    "https://www.google.com/maps?q=Resona+Indonesia+Finance,+PT.@-6.216808,106.8179903&ll=-6.216808,106.8179903&z=17&output=embed",
  mapLink:
    "https://www.google.com/maps/place/Resona+Indonesia+Finance,+PT./@-6.216808,106.8179903,17z/data=!3m1!4b1!4m6!3m5!1s0x2e69f6aadf66e215:0x4c6e0fb1645a58c4!8m2!3d-6.216808!4d106.8179903!16s%2Fg%2F1v4lzjkk",
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
