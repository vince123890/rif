import type {
  Article,
  Award,
  CsrActivity,
  DocumentItem,
  HeroSlide,
  Person,
  Product,
  Vacancy,
} from "./types";

/**
 * Placeholder content (RS-01 mitigation: "gunakan konten placeholder sementara").
 * Facts here are taken from the existing rif.co.id pages; imagery comes from the
 * Figma reference file. Everything is replaced by Strapi once content is handed over.
 */

export const heroSlides: HeroSlide[] = [
  {
    id: "hero-1",
    image: "/images/hero-jakarta.jpg",
    kicker: {
      id: "PEMBIAYAAN KORPORASI TERPERCAYA",
      en: "TRUSTED CORPORATE FINANCING",
    },
    title: { id: "Beyond Finance,", en: "Beyond Finance," },
    titleAccent: {
      id: "for a Brighter Future.",
      en: "for a Brighter Future.",
    },
    lead: {
      id: "Solusi pembiayaan korporasi yang mendukung pertumbuhan bisnis Anda, didukung kekuatan Resona Group dari Jepang.",
      en: "Corporate financing solutions that support your business growth, backed by the strength of Resona Group of Japan.",
    },
  },
  {
    id: "hero-2",
    image: "/images/hero-port.jpg",
    kicker: { id: "SEJAK 1984", en: "SINCE 1984" },
    title: { id: "Mitra Pembiayaan", en: "Your Financing Partner" },
    titleAccent: { id: "Bisnis Anda.", en: "for Growth." },
    lead: {
      id: "Lebih dari empat dekade mendampingi korporasi Indonesia dengan fasilitas pembiayaan investasi, modal kerja, dan anjak piutang.",
      en: "More than four decades supporting Indonesian corporations with investment financing, working capital, and factoring facilities.",
    },
  },
  {
    id: "hero-3",
    image: "/images/meeting-team.jpg",
    kicker: { id: "TATA KELOLA YANG BAIK", en: "GOOD GOVERNANCE" },
    title: { id: "Transparan,", en: "Transparent," },
    titleAccent: { id: "Aman, Terpercaya.", en: "Secure, Trusted." },
    lead: {
      id: "Berizin dan diawasi oleh Otoritas Jasa Keuangan, dengan komitmen penuh pada keterbukaan informasi.",
      en: "Licensed and supervised by the Indonesia Financial Services Authority, with a full commitment to information disclosure.",
    },
  },
];

export const products: Product[] = [
  {
    slug: "investment-financing",
    name: { id: "Pembiayaan Investasi", en: "Investment Financing" },
    summary: {
      id: "Pembiayaan Investasi yang dilakukan dengan cara Sewa Pembiayaan dan Jual dan Sewa Balik.",
      en: "Investment Financing provided through Finance Lease and Sale and Lease Back schemes.",
    },
    image: "/images/exec-port.jpg",
    highlights: {
      id: ["Sewa Pembiayaan (Finance Lease)", "Jual dan Sewa Balik (Sale and Lease Back)"],
      en: ["Finance Lease", "Sale and Lease Back"],
    },
    body: {
      id: `<h2>Manfaat Sewa Pembiayaan</h2>
<ol>
<li>Investasi aset tetap dapat dilakukan tanpa memengaruhi modal kerja pelanggan. Selain itu, karena jangka waktu yang panjang dan metode pembayaran yang fleksibel, pelanggan dapat menyesuaikan metode pembayaran berdasarkan kondisi keuangan mereka.</li>
<li>Perencanaan Pajak. Selama masa sewa, pembayaran sewa (pokok dan bunga) merupakan biaya yang dapat dikurangkan dari penghasilan bruto pelanggan.</li>
</ol>
<h2>Objek Pembiayaan</h2>
<p>Fasilitas pembiayaan yang disediakan termasuk namun tidak terbatas untuk membiayai mesin industri, tool dan equipment, alat berat, kendaraan komersial, perangkat TI, serta aset produktif lainnya.</p>`,
      en: `<h2>Benefits of Finance Lease</h2>
<ol>
<li>Fixed-asset investment can be made without affecting the customer's working capital. With long tenors and flexible payment methods, customers can align repayments with their financial condition.</li>
<li>Tax planning. During the lease period, lease payments (principal and interest) are deductible from the customer's gross income.</li>
</ol>
<h2>Financed Objects</h2>
<p>The facilities provided include but are not limited to industrial machinery, tools and equipment, heavy equipment, commercial vehicles, IT equipment, and other productive assets.</p>`,
    },
  },
  {
    slug: "working-capital",
    name: { id: "Modal Kerja", en: "Working Capital" },
    summary: {
      id: "Pembiayaan Modal Kerja yang dilakukan dengan cara Pembiayaan Fasilitas Modal Usaha.",
      en: "Working Capital financing provided through Business Capital Facility schemes.",
    },
    image: "/images/client-meeting.jpg",
    highlights: {
      id: ["Alat Berat", "Mesin Industri", "Perangkat TI", "Kendaraan Operasional"],
      en: ["Heavy Equipment", "Industrial Machinery", "IT Equipment", "Operational Vehicles"],
    },
    body: {
      id: `<p>Adapun Fasilitas Pembiayaan yang disediakan oleh PT Resona Indonesia Finance termasuk namun tidak terbatas untuk membiayai:</p>
<ol>
<li>Mesin Industri (welding, binder, driller, mesin tekstil, dll.);</li>
<li>Tool dan Equipment (mold, dies, jig, compressor, dll.);</li>
<li>Alat Berat;</li>
<li>Mobil Penumpang dan/atau Kendaraan Komersial;</li>
<li>Komputer dan/atau Aksesoris;</li>
<li>Peralatan TI (software, dll.); dan</li>
<li>Lainnya.</li>
</ol>
<p>Untuk memenuhi kebutuhan nasabah serta merealisasikan visinya, PT Resona Indonesia Finance berkomitmen untuk selalu berinovasi dalam menyediakan berbagai macam fasilitas pembiayaan sekaligus memenuhi segala peraturan terkait Lembaga Pembiayaan yang dikeluarkan oleh pemerintah Republik Indonesia, khususnya Otoritas Jasa Keuangan.</p>`,
      en: `<p>The financing facilities provided by PT Resona Indonesia Finance include but are not limited to:</p>
<ol>
<li>Industrial machinery (welding, binder, driller, textile machines, etc.);</li>
<li>Tools and equipment (mold, dies, jig, compressor, etc.);</li>
<li>Heavy equipment;</li>
<li>Passenger cars and/or commercial vehicles;</li>
<li>Computers and/or accessories;</li>
<li>IT equipment (software, etc.); and</li>
<li>Others.</li>
</ol>
<p>To meet customer needs and realise its vision, PT Resona Indonesia Finance is committed to continuous innovation in providing a wide range of financing facilities while complying with all financing-institution regulations issued by the Government of the Republic of Indonesia, particularly the Financial Services Authority.</p>`,
    },
  },
  {
    slug: "factoring",
    name: { id: "Anjak Piutang", en: "Factoring" },
    summary: {
      id: "Fasilitas Anjak Piutang untuk membantu pengelolaan arus kas melalui pengalihan piutang dagang.",
      en: "Factoring facilities that help manage cash flow through the transfer of trade receivables.",
    },
    image: "/images/containers.jpg",
    highlights: {
      id: ["Pengalihan piutang dagang", "Optimalisasi arus kas", "Jangka waktu fleksibel"],
      en: ["Transfer of trade receivables", "Cash-flow optimisation", "Flexible tenor"],
    },
    body: {
      id: `<p>Anjak Piutang merupakan kegiatan pembiayaan dalam bentuk pembelian piutang dagang jangka pendek suatu perusahaan berikut pengurusan atas piutang tersebut.</p>
<p>Fasilitas ini membantu perusahaan memperoleh likuiditas lebih cepat atas tagihan yang belum jatuh tempo, sehingga arus kas operasional dapat dijaga tanpa menambah beban aset tetap.</p>`,
      en: `<p>Factoring is a financing activity in the form of purchasing a company's short-term trade receivables together with the administration of those receivables.</p>
<p>This facility helps companies obtain liquidity sooner against invoices that are not yet due, keeping operational cash flow healthy without adding fixed-asset burden.</p>`,
    },
  },
];

export const sustainabilityReports: DocumentItem[] = [2025, 2024, 2023].map(
  (year) => ({
    id: `sr-${year}`,
    year,
    title: {
      id: `Laporan Keberlanjutan ${year}`,
      en: `Sustainability Report ${year}`,
    },
    file: { url: `/documents/sustainability-report-${year}.pdf`, mime: "application/pdf" },
  }),
);

export const financialReports: DocumentItem[] = [2025, 2024, 2023, 2022].map(
  (year) => ({
    id: `fr-${year}`,
    year,
    title: {
      id: `Laporan Keuangan ${year} (Audit)`,
      en: `Financial Report ${year} (Audited)`,
    },
    file: { url: `/documents/financial-report-${year}.pdf`, mime: "application/pdf" },
  }),
);

/** SBDP is published monthly (FR-PS-04). */
export const sbdpDocuments: DocumentItem[] = [
  ...Array.from({ length: 9 }, (_, i) => ({
    id: `sbdp-2026-${i + 1}`,
    year: 2026,
    month: i + 1,
    title: {
      id: `SBDP Periode ${String(i + 1).padStart(2, "0")}/2026`,
      en: `Basic Lending Rate Period ${String(i + 1).padStart(2, "0")}/2026`,
    },
    file: {
      url: `/documents/sbdp-2026-${String(i + 1).padStart(2, "0")}.pdf`,
      mime: "application/pdf",
    },
  })),
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `sbdp-2025-${i + 1}`,
    year: 2025,
    month: i + 1,
    title: {
      id: `SBDP Periode ${String(i + 1).padStart(2, "0")}/2025`,
      en: `Basic Lending Rate Period ${String(i + 1).padStart(2, "0")}/2025`,
    },
    file: {
      url: `/documents/sbdp-2025-${String(i + 1).padStart(2, "0")}.pdf`,
      mime: "application/pdf",
    },
  })),
];

export const articles: Article[] = [
  {
    slug: "program-literasi-keuangan-smk-2025",
    category: "education",
    title: {
      id: "Program Literasi Keuangan PT Resona Indonesia Finance kepada Pelajar SMK",
      en: "Financial Literacy Program by PT Resona Indonesia Finance to Students",
    },
    excerpt: {
      id: "Kamis, 19 Juni 2025, PT Resona Indonesia Finance (“RIF”) telah menyelenggarakan kegiatan Literasi Keuangan kepada 125 pelajar di SMK Mitra Industri MM2100.",
      en: "On Thursday, 19 June 2025, PT Resona Indonesia Finance (“RIF”) held a Financial Literacy activity for 125 students at SMK Mitra Industri MM2100.",
    },
    body: {
      id: `<p>Kamis, 19 Juni 2025, PT Resona Indonesia Finance (“RIF”) telah menyelenggarakan kegiatan Literasi Keuangan kepada 125 pelajar di SMK Mitra Industri MM2100 dengan tema “Memanfaatkan Perusahaan Pembiayaan untuk Masa Depan yang Lebih Baik”.</p>
<p>Kegiatan ini merupakan bagian dari komitmen RIF dalam mendukung program peningkatan literasi keuangan nasional yang dicanangkan oleh Otoritas Jasa Keuangan. Melalui sesi interaktif, para pelajar diperkenalkan pada peran industri pembiayaan, produk-produk pembiayaan, serta pentingnya pengelolaan keuangan yang bijak sejak dini.</p>
<p>RIF berharap kegiatan ini dapat membekali generasi muda dengan pemahaman keuangan yang memadai sebelum memasuki dunia kerja.</p>`,
      en: `<p>On Thursday, 19 June 2025, PT Resona Indonesia Finance (“RIF”) held a Financial Literacy activity for 125 students at SMK Mitra Industri MM2100 under the theme “Leveraging Financing Companies for a Better Future”.</p>
<p>The activity is part of RIF's commitment to supporting the national financial-literacy programme launched by the Financial Services Authority. Through interactive sessions, students were introduced to the role of the financing industry, financing products, and the importance of prudent financial management from an early age.</p>
<p>RIF hopes this activity equips the younger generation with adequate financial understanding before entering the workforce.</p>`,
    },
    image: "/images/meeting-presentation.jpg",
    publishedAt: "2025-07-18",
    tags: ["Keuangan", "Pendidikan", "Literasi"],
  },
  {
    slug: "kelompok-tani-hutan-kth-2024",
    category: "csr",
    title: {
      id: "Kelompok Tani Hutan (KTH) 2024",
      en: "Forest Farmer Group (KTH) 2024",
    },
    excerpt: {
      id: "Dalam kegiatan CSR, bantuan diberikan kepada KTH Srengseng Hijau Lestari sebagai bentuk kepedulian terhadap kelestarian lingkungan.",
      en: "As part of its CSR activities, assistance was provided to KTH Srengseng Hijau Lestari as a form of care for environmental sustainability.",
    },
    body: {
      id: `<p>Dalam kegiatan Tanggung Jawab Sosial Perusahaan, PT Resona Indonesia Finance memberikan bantuan kepada Kelompok Tani Hutan (KTH) Srengseng Hijau Lestari.</p>
<p>Bantuan ini merupakan wujud kepedulian perusahaan terhadap kelestarian lingkungan dan pemberdayaan masyarakat sekitar. Program ini sejalan dengan komitmen keberlanjutan yang menjadi bagian dari strategi jangka panjang perusahaan.</p>`,
      en: `<p>As part of its Corporate Social Responsibility activities, PT Resona Indonesia Finance provided assistance to the Forest Farmer Group (KTH) Srengseng Hijau Lestari.</p>
<p>The assistance reflects the company's care for environmental sustainability and the empowerment of surrounding communities. The programme aligns with the sustainability commitment that forms part of the company's long-term strategy.</p>`,
    },
    image: "/images/archive-1973.jpg",
    publishedAt: "2024-10-23",
    tags: ["CSR", "Lingkungan"],
  },
];

export const vacancies: Vacancy[] = [];

export const management: Person[] = [
  {
    id: "p1",
    name: "Iding Suherdi",
    position: { id: "Komisaris Independen", en: "Independent Commissioner" },
    board: "commissioners",
  },
  {
    id: "p2",
    name: "Eiichiro Sakai",
    position: { id: "Komisaris", en: "Commissioner" },
    board: "commissioners",
  },
  {
    id: "p3",
    name: "Takeshi Amata",
    position: { id: "Presiden Direktur", en: "President Director" },
    board: "directors",
  },
  {
    id: "p4",
    name: "Yuki Tanaka",
    position: { id: "Direktur", en: "Director" },
    board: "directors",
  },
  {
    id: "p5",
    name: "Evy Budijanti",
    position: { id: "Direktur", en: "Director" },
    board: "directors",
  },
  {
    id: "p6",
    name: "Sriyono",
    position: { id: "Direktur", en: "Director" },
    board: "directors",
  },
];

export const awards: Award[] = [
  {
    id: "a1",
    year: 2024,
    title: {
      id: "Penghargaan Kinerja Perusahaan Pembiayaan",
      en: "Multifinance Company Performance Award",
    },
    description: {
      id: "Apresiasi atas kinerja keuangan dan tata kelola perusahaan sepanjang tahun 2024.",
      en: "Recognition of financial performance and corporate governance throughout 2024.",
    },
    image: "/images/products-blocks.jpg",
  },
  {
    id: "a2",
    year: 2018,
    title: {
      id: "Infobank Multifinance Award",
      en: "Infobank Multifinance Award",
    },
    description: {
      id: "Penghargaan atas predikat kinerja keuangan “Sangat Bagus”.",
      en: "Award for a “Very Good” financial performance rating.",
    },
    image: "/images/financial-docs.jpg",
  },
  {
    id: "a3",
    year: 2017,
    title: {
      id: "Best Multifinance Award",
      en: "Best Multifinance Award",
    },
    description: {
      id: "Penghargaan atas kinerja perusahaan pembiayaan terbaik pada kategorinya.",
      en: "Award for the best financing company performance in its category.",
    },
    image: "/images/city-skyline-alt.jpg",
  },
];

export const csrActivities: CsrActivity[] = [
  {
    slug: "kth-srengseng-hijau-lestari",
    title: {
      id: "Kelompok Tani Hutan Srengseng Hijau Lestari",
      en: "Srengseng Hijau Lestari Forest Farmer Group",
    },
    summary: {
      id: "Bantuan kepada kelompok tani hutan sebagai wujud kepedulian terhadap kelestarian lingkungan.",
      en: "Assistance to a forest farmer group as a form of care for environmental sustainability.",
    },
    body: {
      id: "<p>Program pemberdayaan kelompok tani hutan melalui penyediaan sarana produksi dan pendampingan budidaya, guna mendukung kelestarian kawasan hijau di wilayah Srengseng.</p>",
      en: "<p>An empowerment programme for a forest farmer group through the provision of production facilities and cultivation guidance, supporting the preservation of green areas in the Srengseng region.</p>",
    },
    image: "/images/green-sustainability.jpg",
    date: "2024-10-23",
  },
  {
    slug: "literasi-keuangan-pelajar",
    title: {
      id: "Literasi Keuangan untuk Pelajar",
      en: "Financial Literacy for Students",
    },
    summary: {
      id: "Edukasi keuangan kepada 125 pelajar SMK Mitra Industri MM2100.",
      en: "Financial education for 125 students of SMK Mitra Industri MM2100.",
    },
    body: {
      id: "<p>Kegiatan literasi keuangan dengan tema “Memanfaatkan Perusahaan Pembiayaan untuk Masa Depan yang Lebih Baik”, mengenalkan peran industri pembiayaan kepada generasi muda.</p>",
      en: "<p>A financial literacy activity themed “Leveraging Financing Companies for a Better Future”, introducing the role of the financing industry to the younger generation.</p>",
    },
    image: "/images/meeting-presentation.jpg",
    date: "2025-06-19",
  },
  {
    slug: "bantuan-pendidikan",
    title: { id: "Program Bantuan Pendidikan", en: "Education Assistance Program" },
    summary: {
      id: "Dukungan sarana belajar bagi sekolah mitra di sekitar wilayah operasional.",
      en: "Support for learning facilities at partner schools near operational areas.",
    },
    body: {
      id: "<p>Penyediaan sarana dan prasarana belajar untuk meningkatkan kualitas pendidikan di sekolah mitra.</p>",
      en: "<p>Provision of learning facilities and infrastructure to improve education quality at partner schools.</p>",
    },
    image: "/images/officer-review.jpg",
    date: "2024-05-14",
  },
  {
    slug: "kegiatan-sosial-masyarakat",
    title: { id: "Kegiatan Sosial Masyarakat", en: "Community Social Activity" },
    summary: {
      id: "Kegiatan bakti sosial bersama masyarakat sekitar kantor perusahaan.",
      en: "Community service activities with residents around the company office.",
    },
    body: {
      id: "<p>Kegiatan bakti sosial yang melibatkan karyawan perusahaan bersama masyarakat sekitar.</p>",
      en: "<p>Community service activities involving company employees together with local residents.</p>",
    },
    image: "/images/meeting-boardroom.jpg",
    date: "2024-03-08",
  },
];
