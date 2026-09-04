/**
 * Per-page banner content: the photo behind the green wash, plus the
 * descriptive subtitle shown under the title.
 *
 * `accentWords` is how many leading words of the title render in orange —
 * the fig sets e.g. "**Company** Profile" with the first word in #F58220.
 * Photos are drawn from the asset set extracted out of the Figma file.
 */

export type BannerSpec = {
  image: string;
  /** Leading words rendered in accent orange. Defaults to 1. */
  accentWords?: number;
  subtitle: { id: string; en: string };
};

/** Keyed by the page's route. */
export const pageBanners: Record<string, BannerSpec> = {
  "/about/management-message": {
    image: "/images/meeting-boardroom.jpg",
    subtitle: {
      id: "Komitmen kami dalam menghadirkan solusi pembiayaan yang relevan bagi pertumbuhan bisnis nasabah.",
      en: "Our commitment to delivering financing solutions relevant to our customers' business growth.",
    },
  },
  "/about/company-profile/vision-mission": {
    image: "/images/meeting-presentation.jpg",
    accentWords: 2,
    subtitle: {
      id: "Arah dan tujuan yang memandu setiap langkah PT Resona Indonesia Finance.",
      en: "The direction and purpose guiding every step PT Resona Indonesia Finance takes.",
    },
  },
  "/about/company-profile/at-a-glance": {
    image: "/images/city-skyline-alt.jpg",
    subtitle: {
      id: "Lebih dari empat dekade mendampingi korporasi Indonesia dengan fasilitas pembiayaan yang tepercaya.",
      en: "More than four decades supporting Indonesian corporations with trusted financing facilities.",
    },
  },
  "/about/company-profile/history": {
    image: "/images/archive-office-1958.jpg",
    subtitle: {
      id: "Perjalanan kami mencerminkan komitmen selama bertahun-tahun terhadap kemajuan, integritas, dan peningkatan berkelanjutan.",
      en: "Our journey reflects years of commitment to progress, integrity, and continuous improvement.",
    },
  },
  "/about/company-profile/business-license": {
    image: "/images/documents-desk.jpg",
    subtitle: {
      id: "Perusahaan beroperasi berdasarkan izin usaha resmi yang diterbitkan oleh Kementerian Keuangan Republik Indonesia.",
      en: "The Company operates under official business licences issued by the Ministry of Finance of the Republic of Indonesia.",
    },
  },
  "/about/company-profile/finance-facilities": {
    image: "/images/containers.jpg",
    accentWords: 2,
    subtitle: {
      id: "Ragam fasilitas pembiayaan yang dirancang untuk mendukung kebutuhan investasi dan modal kerja korporasi.",
      en: "A range of financing facilities designed to support corporate investment and working capital needs.",
    },
  },
  "/about/company-profile/management": {
    image: "/images/meeting-team.jpg",
    subtitle: {
      id: "Jajaran manajemen kami mengedepankan nilai integritas, kepercayaan, dan inovasi dengan keahlian yang beragam.",
      en: "Our management team embodies the values of integrity, trust, and innovation, with diverse expertise and a shared commitment to excellence.",
    },
  },
  "/about/company-profile/organization-structure": {
    image: "/images/meeting-presentation.jpg",
    accentWords: 2,
    subtitle: {
      id: "Struktur organisasi yang menopang tata kelola dan efektivitas operasional perusahaan.",
      en: "The organisational structure underpinning the Company's governance and operational effectiveness.",
    },
  },
  "/about/company-profile/shareholders": {
    image: "/images/exec-port.jpg",
    accentWords: 2,
    subtitle: {
      id: "Komposisi kepemilikan saham PT Resona Indonesia Finance sebagai bagian dari kelompok Resona Grup.",
      en: "The shareholding composition of PT Resona Indonesia Finance as part of the Resona Group.",
    },
  },
  "/about/company-profile/award": {
    image: "/images/products-blocks.jpg",
    subtitle: {
      id: "Apresiasi atas kinerja keuangan dan penerapan tata kelola perusahaan yang baik.",
      en: "Recognition of our financial performance and the application of good corporate governance.",
    },
  },
  "/about/csr": {
    image: "/images/green-sustainability.jpg",
    accentWords: 2,
    subtitle: {
      id: "Kontribusi nyata bagi masyarakat dan lingkungan melalui berbagai program tanggung jawab sosial perusahaan.",
      en: "A tangible contribution to society and the environment through our corporate social responsibility programmes.",
    },
  },
  "/about/privacy": {
    image: "/images/security-lock.jpg",
    subtitle: {
      id: "Kami menghormati privasi setiap pengunjung dan berkomitmen melindungi informasi yang disampaikan kepada kami.",
      en: "We respect the privacy of every visitor and are committed to protecting the information submitted to us.",
    },
  },
  "/about/bank-resona-perdania": {
    image: "/images/hero-jakarta.jpg",
    accentWords: 2,
    subtitle: {
      id: "Bank joint venture pertama di Indonesia dan perusahaan induk PT Resona Indonesia Finance.",
      en: "The first joint-venture bank in Indonesia and the parent company of PT Resona Indonesia Finance.",
    },
  },

  "/gcg/anti-fraud": {
    image: "/images/security-lock.jpg",
    subtitle: {
      id: "Strategi anti fraud yang menyeluruh untuk mencegah, mendeteksi, dan menangani setiap potensi kecurangan.",
      en: "A comprehensive anti-fraud strategy to prevent, detect, and handle any potential fraud.",
    },
  },
  "/gcg/integrity-pact": {
    image: "/images/documents-desk.jpg",
    accentWords: 2,
    subtitle: {
      id: "Komitmen seluruh jajaran perusahaan untuk menjalankan tugas secara jujur, transparan, dan bebas benturan kepentingan.",
      en: "A commitment by all levels of the Company to act honestly, transparently, and free from conflicts of interest.",
    },
  },
  "/gcg/good-corporate-governance": {
    image: "/images/meeting-boardroom.jpg",
    accentWords: 2,
    subtitle: {
      id: "Prinsip transparansi, akuntabilitas, pertanggungjawaban, independensi, dan kewajaran sebagai landasan usaha kami.",
      en: "Transparency, accountability, responsibility, independence, and fairness as the foundation of our business.",
    },
  },
  "/gcg/aml-cft": {
    image: "/images/officer-review.jpg",
    accentWords: 2,
    subtitle: {
      id: "Penerapan program Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme sesuai ketentuan yang berlaku.",
      en: "Implementation of the Anti-Money Laundering and Countering the Financing of Terrorism programme in line with applicable regulations.",
    },
  },

  "/corporate-secretary/sustainability-report": {
    image: "/images/green-sustainability.jpg",
    accentWords: 2,
    subtitle: {
      id: "Laporan keberlanjutan yang merekam kinerja lingkungan, sosial, dan tata kelola perusahaan setiap tahun.",
      en: "Annual sustainability reports recording our environmental, social, and governance performance.",
    },
  },
  "/corporate-secretary/financial-report": {
    image: "/images/financial-docs.jpg",
    accentWords: 2,
    subtitle: {
      id: "Laporan keuangan tahunan yang telah diaudit, sebagai wujud keterbukaan informasi kepada publik.",
      en: "Audited annual financial reports, reflecting our transparency with the public.",
    },
  },
  "/corporate-secretary/business-strategy": {
    image: "/images/meeting-presentation.jpg",
    accentWords: 2,
    subtitle: {
      id: "Arah strategis dan rencana jangka panjang perusahaan dalam menghadapi dinamika industri pembiayaan.",
      en: "The Company's strategic direction and long-term plans amid the dynamics of the financing industry.",
    },
  },
  "/corporate-secretary/privacy": {
    image: "/images/security-lock.jpg",
    subtitle: {
      id: "Kami menghormati privasi setiap pengunjung dan berkomitmen melindungi informasi yang disampaikan kepada kami.",
      en: "We respect the privacy of every visitor and are committed to protecting the information submitted to us.",
    },
  },

  "/products": {
    image: "/images/client-meeting.jpg",
    accentWords: 1,
    subtitle: {
      id: "Kami menyediakan produk dan layanan pembiayaan tepercaya yang dirancang untuk mendukung pertumbuhan bisnis Anda.",
      en: "We provide trusted financing products and services designed to support the growth of your business.",
    },
  },
  "/products/investment-financing": {
    image: "/images/exec-port.jpg",
    accentWords: 1,
    subtitle: {
      id: "Pembiayaan investasi melalui Sewa Pembiayaan dan Jual dan Sewa Balik untuk kebutuhan aset tetap perusahaan.",
      en: "Investment financing through Finance Lease and Sale and Lease Back for your fixed-asset needs.",
    },
  },
  "/products/working-capital": {
    image: "/images/client-meeting.jpg",
    accentWords: 1,
    subtitle: {
      id: "Pembiayaan modal kerja untuk menjaga kelancaran operasional dan mendukung ekspansi usaha Anda.",
      en: "Working capital financing to keep operations running smoothly and support your business expansion.",
    },
  },
  "/products/factoring": {
    image: "/images/containers.jpg",
    accentWords: 1,
    subtitle: {
      id: "Fasilitas anjak piutang untuk mempercepat likuiditas atas tagihan yang belum jatuh tempo.",
      en: "Factoring facilities that accelerate liquidity against invoices not yet due.",
    },
  },
  "/products/sbdp": {
    image: "/images/calculator-desk.jpg",
    accentWords: 1,
    subtitle: {
      id: "Informasi Suku Bunga Dasar Pembiayaan yang dipublikasikan secara berkala setiap bulan.",
      en: "Basic Lending Rate information published on a regular monthly basis.",
    },
  },

  "/news": {
    image: "/images/meeting-presentation.jpg",
    subtitle: {
      id: "Dapatkan informasi terkini tentang perkembangan, kegiatan, dan program literasi keuangan kami.",
      en: "Stay updated with the latest developments, activities, and financial literacy programmes.",
    },
  },
  "/careers": {
    image: "/images/officer-review.jpg",
    subtitle: {
      id: "Bergabunglah bersama tim kami dan bangun karier di industri pembiayaan korporasi.",
      en: "Join our team and build your career in the corporate financing industry.",
    },
  },
  "/contact": {
    image: "/images/office-reception.jpg",
    subtitle: {
      id: "Kami siap membantu menjawab pertanyaan Anda seputar produk dan layanan pembiayaan kami.",
      en: "We are ready to answer your questions about our financing products and services.",
    },
  },
};

/**
 * Split a title so the first `accentWords` render in orange.
 * Falls back gracefully for single-word titles.
 */
export function splitTitle(title: string, accentWords = 1) {
  const parts = title.trim().split(/\s+/);

  // A single-word title has nothing to contrast against, so the whole word
  // takes the accent colour rather than losing it entirely.
  if (parts.length <= 1) return { accent: title, rest: "" };

  const n = Math.min(Math.max(accentWords, 1), parts.length - 1);
  return {
    accent: parts.slice(0, n).join(" "),
    rest: parts.slice(n).join(" "),
  };
}

export function getBanner(route: string, locale: string) {
  const spec = pageBanners[route];
  if (!spec) return null;
  return {
    image: spec.image,
    accentWords: spec.accentWords ?? 1,
    subtitle: locale === "en" ? spec.subtitle.en : spec.subtitle.id,
  };
}
