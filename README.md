# RIF Corporate Website — Frontend

Frontend Next.js untuk revamp website korporat **PT Resona Indonesia Finance**.

> Scope repositori ini adalah **frontend saja**. CMS (Strapi) dan infrastruktur berada di luar repositori ini — kontrak integrasinya didokumentasikan di [`docs/API - RIF Corporate Website.md`](docs/API%20-%20RIF%20Corporate%20Website.md).

## Dokumen Acuan

| Dokumen | Isi |
|---|---|
| [`docs/BRD - RIF Revamp Corporate Website.md`](docs/BRD%20-%20RIF%20Revamp%20Corporate%20Website.md) | Business Requirements Document — sitemap, FR, NFR |
| [`docs/API - RIF Corporate Website.md`](docs/API%20-%20RIF%20Corporate%20Website.md) | Kontrak API & spesifikasi content type Strapi |
| `docs/Figma dan Capture/Resona Perdania.fig` | Referensi desain (design token diekstrak dari file ini) |
| `docs/Figma dan Capture/existing/` | Tangkapan layar website RIF existing |

## Menjalankan

```bash
npm install
npm run dev      # http://localhost:3000 → redirect ke /id
```

```bash
npm run build    # production build
npm run lint     # eslint
```

### Environment

Salin `.env.example` ke `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://www.rif.co.id
NEXT_PUBLIC_GA_ID=          # opsional
NEXT_PUBLIC_GTM_ID=         # opsional

# Diisi saat integrasi Strapi (Phase 3)
STRAPI_URL=
STRAPI_API_TOKEN=
```

## Tech Stack

| Layer | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router, React Server Components) |
| Bahasa | TypeScript |
| Styling | Tailwind CSS v4 |
| i18n | next-intl (ID / EN) |
| Ikon | lucide-react |
| Font | Lato (sesuai file Figma) |

## Design System

Token diekstrak langsung dari `Resona Perdania.fig` (canvas *Playground Hijau*) dan didefinisikan di [`src/app/globals.css`](src/app/globals.css):

| Token | Nilai | Penggunaan |
|---|---|---|
| `brand-600` | `#006F4F` | Warna utama — header, footer, banner |
| `brand-400` | `#1AA67D` | Aksen hijau terang |
| `accent-400` | `#F58220` | CTA, link "halaman selanjutnya" |
| `ink-900` | `#101828` | Judul |
| `ink-600` | `#4A5565` | Teks isi |
| Font | Lato | 12 / 14 / 16 / 20 / 24 / 40 / 48 px |

## Struktur

```
src/
├── app/[locale]/          # Halaman (App Router, per locale)
├── components/
│   ├── layout/            # Header, footer, page hero, next-page link
│   ├── content/           # Document list, product tabs, news, zoom image
│   ├── home/              # Hero carousel
│   └── ui/                # Button, section, rich text, ikon banner
├── config/
│   ├── navigation.ts      # Sitemap — sumber tunggal (BRD §5)
│   └── site.ts            # Data perusahaan & link eksternal
├── i18n/                  # Routing & request config next-intl
├── lib/content/           # Content layer — titik integrasi Strapi
└── messages/              # id.json, en.json
```

## Cakupan Fitur

Seluruh 8 menu utama pada BRD §5 (kedalaman maksimal 3 level), dalam dua bahasa:

- **Home** — hero slider, produk, laporan, berita (FR-HM-01..04)
- **About** — sambutan manajemen, profil perusahaan (9 sub-halaman), CSR, privasi, Bank Resona Perdania (FR-AB-01..13)
- **GCG** — anti fraud, pakta integritas, GCG, APU-PPT (FR-GC-01..04)
- **Corporate Secretary** — laporan keberlanjutan, laporan keuangan, strategi bisnis, privasi (FR-CS-01..04)
- **Product & Service** — 3 produk pembiayaan + SBDP (FR-PS-01..04)
- **News** — list, detail, kategori, filter tahun (FR-NW-01..05)
- **Careers** — daftar lowongan, empty state, apply (FR-CR-01..04)
- **Contact** — info kontak, peta, tautan Microsoft Forms (FR-CT-01..05)

Global: navigasi 3 level responsif, footer, switcher bahasa, enable/disable menu, SEO dasar (metadata, sitemap.xml, robots.txt, JSON-LD), GA4/GTM.

## Status Data

Halaman saat ini memakai **konten placeholder** di `src/lib/content/data.ts` (mitigasi RS-01 pada BRD). Fakta perusahaan diambil dari website RIF existing; foto berasal dari file Figma referensi.

Untuk go-live, ganti implementasi fungsi di `src/lib/content/index.ts` dengan pemanggilan Strapi sesuai dokumen API — **tanpa mengubah halaman atau komponen**.

### Aset yang masih perlu disediakan RIF

- Logo resmi (vektor SVG/AI/EPS) — saat ini memakai placeholder
- Bagan struktur organisasi resolusi tinggi — saat ini memakai placeholder SVG
- Foto direksi & komisaris
- Dokumen PDF final (GCG, AML-CFT, laporan keuangan, SBDP, dll.)
- URL Microsoft Forms & Jobstreet yang sebenarnya
