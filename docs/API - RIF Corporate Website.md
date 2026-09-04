# API CONTRACT — Revamp Corporate Website RIF
## Frontend (Next.js) ⇄ Headless CMS (Strapi v5)

| | |
|---|---|
| **Project** | Revamp Corporate Website — PT Resona Indonesia Finance |
| **Dokumen** | API Contract & Content Type Specification |
| **Versi** | 1.0 |
| **Referensi** | `docs/BRD - RIF Revamp Corporate Website.md` (FR-CM-01, FR-CM-02) |
| **Status** | Draft — untuk implementasi Phase 3 |

---

## 1. Ringkasan

Frontend Next.js **tidak pernah** memanggil Strapi langsung dari komponen. Seluruh akses data melewati satu modul:

```
src/lib/content/index.ts   ← satu-satunya titik integrasi
```

Saat ini modul tersebut membaca data placeholder dari `src/lib/content/data.ts`. Untuk go-live, isi fungsi-fungsi di modul itu diganti dengan `fetch()` ke Strapi — **tanpa mengubah satu pun halaman atau komponen**.

| Layer | Teknologi | Keterangan |
|---|---|---|
| Frontend | Next.js 16 (App Router, RSC) | Fetch dilakukan di Server Component |
| CMS | Strapi v5 (Node.js) | REST API, auto-generated (FR-CM-02) |
| Auth | Read-only API Token (Bearer) | Disimpan sebagai server-side env var |
| Format | JSON | `data` / `meta` envelope bawaan Strapi |

### 1.1 Environment Variables

```bash
# .env.local — JANGAN gunakan prefix NEXT_PUBLIC_ untuk token
STRAPI_URL=https://cms.rif.co.id
STRAPI_API_TOKEN=<read-only token>

# Boleh publik
NEXT_PUBLIC_SITE_URL=https://www.rif.co.id
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

> **Keamanan (NFR-SC):** `STRAPI_API_TOKEN` bersifat **read-only** dan hanya dipakai di server. Token tidak boleh ter-bundle ke browser — karena itu tanpa prefix `NEXT_PUBLIC_`.

### 1.2 Konvensi Umum

- **Base URL:** `{STRAPI_URL}/api`
- **Header:** `Authorization: Bearer {STRAPI_API_TOKEN}`
- **Lokalisasi:** setiap request menyertakan `?locale=id` atau `?locale=en` (FR-GL-03). Gunakan Strapi i18n plugin.
- **Media:** field gambar/PDF dikembalikan sebagai objek `{ url, mime, size, alternativeText }`. URL relatif harus di-prefix `STRAPI_URL`.
- **Publikasi:** hanya entri berstatus `published` yang tampil. Draft tidak boleh terekspos ke publik.
- **Fallback bahasa (RS-02):** bila konten EN belum tersedia, frontend otomatis menampilkan konten ID (lihat fungsi `pick()`).

### 1.3 Caching & Revalidation

```ts
fetch(url, {
  headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
  next: { revalidate: 300, tags: ["articles"] },  // ISR 5 menit
});
```

| Konten | Revalidate | Alasan |
|---|---|---|
| Halaman statis (profil, GCG, privasi) | 3600 s | Jarang berubah |
| Laporan, SBDP | 600 s | Update bulanan/semesteran |
| Berita, Lowongan | 300 s | Insidental |
| Navigasi / menu | 3600 s | Struktur stabil |

Untuk publikasi instan, aktifkan **Strapi webhook** → `POST /api/revalidate` dengan secret, lalu panggil `revalidateTag()`.

---

## 2. Content Types

Ringkasan seluruh collection/single type yang harus dibuat di Strapi.

| # | API ID | Tipe | i18n | Kebutuhan BRD |
|---|---|---|---|---|
| 1 | `hero-slide` | Collection | ✅ | FR-HM-01 |
| 2 | `product` | Collection | ✅ | FR-PS-01..03, FR-HM-02 |
| 3 | `document` | Collection | ✅ | FR-CS-01/02, FR-PS-04, FR-HM-03 |
| 4 | `article` | Collection | ✅ | FR-NW-01..05, FR-HM-04 |
| 5 | `vacancy` | Collection | ✅ | FR-CR-01..04 |
| 6 | `person` | Collection | ✅ | FR-AB-07 |
| 7 | `award` | Collection | ✅ | FR-AB-10 |
| 8 | `csr-activity` | Collection | ✅ | FR-AB-11 |
| 9 | `static-page` | Collection | ✅ | FR-AB-01..13, FR-GC-01..04, FR-CS-03/04 |
| 10 | `organization-structure` | Single | ✅ | FR-AB-08 |
| 11 | `navigation-item` | Collection | ✅ | FR-GL-01, FR-GL-04 |
| 12 | `site-setting` | Single | ✅ | FR-CT-01, FR-GL-02 |

---

## 3. Endpoint Specification

### 3.1 Hero Slide — `FR-HM-01`

**`GET /api/hero-slides`**

| Query | Nilai |
|---|---|
| `locale` | `id` \| `en` |
| `populate` | `image` |
| `sort` | `order:asc` |
| `filters[active][$eq]` | `true` |

<details><summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "documentId": "abc123",
      "kicker": "PEMBIAYAAN KORPORASI TERPERCAYA",
      "title": "Beyond Finance,",
      "titleAccent": "for a Brighter Future.",
      "lead": "Solusi pembiayaan korporasi yang mendukung pertumbuhan bisnis Anda.",
      "order": 1,
      "active": true,
      "image": {
        "url": "/uploads/hero_jakarta_a1b2.jpg",
        "mime": "image/jpeg",
        "width": 1920,
        "height": 1080,
        "alternativeText": "Kawasan bisnis Jakarta"
      }
    }
  ],
  "meta": { "pagination": { "page": 1, "pageSize": 25, "total": 3 } }
}
```
</details>

| Field | Tipe | Wajib | Catatan |
|---|---|---|---|
| `kicker` | Text | – | Label kecil di atas judul |
| `title` | Text | ✅ | Baris pertama judul |
| `titleAccent` | Text | – | Baris kedua (ditebalkan) |
| `lead` | Text (long) | ✅ | Paragraf pendukung |
| `image` | Media (single) | ✅ | Rasio 16:9, min. 1920×1080 |
| `order` | Integer | ✅ | Urutan slide |
| `active` | Boolean | ✅ | Tampil/sembunyikan tanpa hapus |

---

### 3.2 Product — `FR-PS-01..03`

**`GET /api/products`** · **`GET /api/products?filters[slug][$eq]={slug}`**

`populate=image` · `sort=order:asc`

<details><summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "slug": "investment-financing",
      "name": "Pembiayaan Investasi",
      "summary": "Pembiayaan Investasi yang dilakukan dengan cara Sewa Pembiayaan dan Jual dan Sewa Balik.",
      "highlights": [
        { "text": "Sewa Pembiayaan (Finance Lease)" },
        { "text": "Jual dan Sewa Balik (Sale and Lease Back)" }
      ],
      "body": "<h2>Manfaat Sewa Pembiayaan</h2><ol><li>...</li></ol>",
      "order": 1,
      "image": { "url": "/uploads/exec_port.jpg", "mime": "image/jpeg" }
    }
  ]
}
```
</details>

| Field | Tipe | Catatan |
|---|---|---|
| `slug` | UID | **Enum tetap:** `investment-financing`, `working-capital`, `factoring` (OI-01 — sesuai *Requirement Detail dari RIF*) |
| `name` | Text | Nama produk |
| `summary` | Text (long) | Kalimat pembuka pada tab |
| `highlights` | Component (repeatable) | Daftar bullet bercentang |
| `body` | Rich text (HTML) | Isi halaman detail |
| `image` | Media | Rasio 4:3 |

> Halaman produk **murni informasional** — tidak ada fitur transaksi, pengajuan, maupun simulasi (BRD §6.5).

---

### 3.3 Document — `FR-CS-01`, `FR-CS-02`, `FR-PS-04`

Satu content type untuk seluruh dokumen PDF, dibedakan lewat `category`.

**`GET /api/documents`**

| Query | Nilai |
|---|---|
| `filters[category][$eq]` | `sustainability-report` \| `financial-report` \| `sbdp` |
| `filters[year][$eq]` | `2025` (opsional — filter "Sort by Year") |
| `populate` | `file,thumbnail` |
| `sort` | `year:desc,month:desc` |

<details><summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "title": "Laporan Keuangan 2025 (Audit)",
      "category": "financial-report",
      "year": 2025,
      "month": null,
      "file": {
        "url": "/uploads/lk_2025_audit.pdf",
        "mime": "application/pdf",
        "size": 2458.31
      },
      "thumbnail": { "url": "/uploads/lk_2025_thumb.jpg" }
    }
  ]
}
```
</details>

| Field | Tipe | Catatan |
|---|---|---|
| `title` | Text | Judul dokumen |
| `category` | Enumeration | `sustainability-report`, `financial-report`, `sbdp` |
| `year` | Integer | Wajib — dasar pengelompokan |
| `month` | Integer (1–12) | **Hanya untuk SBDP** (terbit bulanan) |
| `file` | Media (single) | PDF final bertanda tangan |
| `thumbnail` | Media (single) | Opsional — sampul laporan |

**Endpoint bantu — daftar tahun untuk dropdown filter:**

```
GET /api/documents?filters[category][$eq]=financial-report&fields[0]=year&sort=year:desc
```

> **Pola tampilan dokumen (BRD §6.4):** daftar per tahun → klik tahun → PDF preview + opsi download. Frontend menyediakan tombol **Unduh** dan **Lihat PDF** untuk setiap entri.

---

### 3.4 Article (News) — `FR-NW-01..05`

**`GET /api/articles`**

| Query | Nilai |
|---|---|
| `filters[category][$eq]` | `education` \| `csr` (FR-NW-03) |
| `$gte` / `$lte` `publishedAt` | Filter tahun (FR-NW-04) |
| `populate` | `image` |
| `sort` | `publishedAt:desc` |
| `pagination[page]`, `pagination[pageSize]` | Paginasi |

**`GET /api/articles?filters[slug][$eq]={slug}&populate=image`** — detail artikel.

<details><summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "slug": "program-literasi-keuangan-smk-2025",
      "title": "Program Literasi Keuangan PT Resona Indonesia Finance kepada Pelajar SMK",
      "excerpt": "Kamis, 19 Juni 2025, PT Resona Indonesia Finance telah menyelenggarakan kegiatan Literasi Keuangan...",
      "body": "<p>Kamis, 19 Juni 2025, ...</p>",
      "category": "education",
      "tags": ["Keuangan", "Pendidikan", "Literasi"],
      "publishedAt": "2025-07-18T00:00:00.000Z",
      "image": { "url": "/uploads/literasi_2025.jpg", "mime": "image/jpeg" }
    }
  ],
  "meta": { "pagination": { "page": 1, "pageSize": 10, "total": 2, "pageCount": 1 } }
}
```
</details>

| Field | Tipe | Catatan |
|---|---|---|
| `slug` | UID (dari `title`) | URL artikel |
| `title` | Text | Judul |
| `excerpt` | Text (long) | Ringkasan pada list & meta description |
| `body` | Rich text (HTML) | Isi artikel |
| `category` | Enumeration | `education`, `csr` |
| `tags` | JSON / relation | Daftar tag |
| `image` | Media | Thumbnail + hero artikel |
| `publishedAt` | DateTime | Tanggal tayang |

**Facet sidebar** (kategori, tahun, recent posts, tags) dihitung frontend dari hasil query di atas — tidak perlu endpoint terpisah. Bila volume artikel besar, sediakan:

```
GET /api/articles/facets   → { categories:[{key,count}], years:[{year,count}], tags:[...] }
```

---

### 3.5 Vacancy (Careers) — `FR-CR-01..04`

**`GET /api/vacancies?filters[active][$eq]=true&sort=postedAt:desc`**

<details><summary>Response</summary>

```json
{
  "data": [
    {
      "id": 1,
      "title": "Credit Analyst",
      "location": "Jakarta Selatan",
      "type": "Full Time",
      "description": "<p>Melakukan analisa kelayakan kredit calon nasabah korporasi.</p>",
      "requirements": [
        { "text": "S1 Akuntansi / Manajemen Keuangan" },
        { "text": "Pengalaman minimal 2 tahun di industri pembiayaan" }
      ],
      "applyUrl": "https://www.jobstreet.co.id/...",
      "postedAt": "2026-09-01T00:00:00.000Z",
      "active": true
    }
  ]
}
```
</details>

| Field | Tipe | Catatan |
|---|---|---|
| `title` | Text | Nama posisi |
| `location` | Text | Lokasi penempatan |
| `type` | Text | Full Time / Contract |
| `description` | Rich text | Deskripsi pekerjaan |
| `requirements` | Component (repeatable) | Kualifikasi |
| `applyUrl` | Text (URL) | Link Jobstreet; kosong → fallback ke URL default |
| `active` | Boolean | Kontrol tayang |

> **`data: []` adalah kondisi sah** — frontend menampilkan state **"Tidak tersedia / Not Available"** beserta tombol *Apply Job Now* (FR-CR-02, OI-06).

---

### 3.6 Person (Management) — `FR-AB-07`

**`GET /api/people?populate=photo&sort=order:asc`**

| Field | Tipe | Catatan |
|---|---|---|
| `name` | Text | Nama lengkap (tidak dilokalisasi) |
| `position` | Text | Jabatan (dilokalisasi ID/EN) |
| `board` | Enumeration | `commissioners`, `directors` |
| `photo` | Media | Opsional — fallback ke ikon |
| `order` | Integer | Urutan tampil |

---

### 3.7 Award — `FR-AB-10`

**`GET /api/awards?populate=image&sort=year:desc`**

| Field | Tipe | Catatan |
|---|---|---|
| `title` | Text | Nama penghargaan |
| `description` | Text (long) | Penjelasan singkat (link to short explanation) |
| `year` | Integer | Tahun perolehan |
| `image` | Media | Foto piala/sertifikat |

---

### 3.8 CSR Activity — `FR-AB-11`

**`GET /api/csr-activities?populate=image&sort=date:desc`**
**`GET /api/csr-activities?filters[slug][$eq]={slug}&populate=image`**

| Field | Tipe | Catatan |
|---|---|---|
| `slug` | UID | URL halaman detail |
| `title` | Text | Nama kegiatan |
| `summary` | Text (long) | ±1 paragraf pada kartu galeri |
| `body` | Rich text | Penjelasan detail |
| `image` | Media | Foto kegiatan |
| `date` | Date | Tanggal kegiatan |

> Update per semester via CMS.

---

### 3.9 Static Page — `FR-AB-*`, `FR-GC-*`, `FR-CS-03/04`

Satu content type untuk seluruh halaman teks. Dibedakan dengan `key`.

**`GET /api/static-pages?filters[key][$eq]={key}&populate=document`**

<details><summary>Daftar <code>key</code> yang valid</summary>

| `key` | Halaman | Kebutuhan |
|---|---|---|
| `management-message` | Sambutan Manajemen | FR-AB-01 |
| `vision-mission` | Visi dan Misi | FR-AB-02 |
| `at-a-glance` | Sekilas Perusahaan | FR-AB-03 |
| `history` | Sejarah | FR-AB-04 |
| `business-license` | Izin Usaha | FR-AB-05 |
| `finance-facilities` | Fasilitas Pembiayaan | FR-AB-06 |
| `shareholders` | Struktur Pemegang Saham | FR-AB-09 |
| `privacy` | Ketentuan Privasi | FR-AB-12 / FR-CS-04 |
| `bank-resona-perdania` | Bank Resona Perdania | FR-AB-13 |
| `anti-fraud` | Anti Fraud | FR-GC-01 |
| `integrity-pact` | Pakta Integritas | FR-GC-02 |
| `good-corporate-governance` | Tata Kelola Perusahaan yang Baik | FR-GC-03 |
| `aml-cft` | Pernyataan Kebijakan APU-PPT | FR-GC-04 |
| `business-strategy` | Strategi Bisnis dan Rencana Masa Depan | FR-CS-03 |

</details>

| Field | Tipe | Catatan |
|---|---|---|
| `key` | UID | Identifier tetap (lihat tabel) |
| `title` | Text | Judul halaman (juga dipakai meta title) |
| `body` | Rich text (HTML) | Isi halaman |
| `document` | Media (single) | Opsional — PDF lampiran (GCG, AML-CFT, Pakta Integritas) |
| `metaDescription` | Text | Opsional — SEO (NFR-PF-02) |

---

### 3.10 Organization Structure (Single Type) — `FR-AB-08`

**`GET /api/organization-structure?populate=image`**

```json
{
  "data": {
    "title": "Struktur Organisasi",
    "image": {
      "url": "/uploads/org_structure_2026.png",
      "width": 2400, "height": 1600, "mime": "image/png"
    },
    "updatedAt": "2026-01-15T00:00:00.000Z"
  }
}
```

> Gambar harus beresolusi memadai agar tetap terbaca saat **zoom** (BRD §4.3). Frontend menyediakan zoom in/out, drag-to-pan, dan mode fullscreen.

---

### 3.11 Navigation — `FR-GL-01`, `FR-GL-04`

**`GET /api/navigation-items?sort=order:asc&populate=children`**

<details><summary>Response</summary>

```json
{
  "data": [
    {
      "key": "about",
      "label": "Tentang Kami",
      "href": "/about",
      "order": 2,
      "enabled": true,
      "children": [
        { "key": "management-message", "label": "Sambutan Manajemen", "href": "/about/management-message", "enabled": true }
      ]
    }
  ]
}
```
</details>

| Field | Tipe | Catatan |
|---|---|---|
| `key` | UID | Cocok dengan key i18n frontend |
| `label` | Text | Label menu (dilokalisasi) |
| `href` | Text | Path tanpa prefix locale |
| `order` | Integer | Urutan |
| `enabled` | Boolean | **FR-GL-04** — sembunyikan menu **tanpa menghapus konten** |
| `parent` / `children` | Relation (self) | Maksimal 3 level (BRD §5) |

> Selama `navigation-item` belum diisi, frontend memakai sitemap statis di `src/config/navigation.ts` sebagai fallback.

---

### 3.12 Site Setting (Single Type) — `FR-CT-01`, `FR-GL-02`

**`GET /api/site-setting`**

```json
{
  "data": {
    "companyName": "PT Resona Indonesia Finance",
    "phone": "021 - 570 1956",
    "fax": "021 - 570 1961",
    "email": "pengaduan@rif.co.id",
    "addressLine1": "Sampoerna Strategic Square South Tower, Level 9",
    "addressLine2": "Jl. Jend. Sudirman Kav. 45-46, Jakarta Selatan 12930",
    "mapEmbedUrl": "https://www.google.com/maps?q=...&output=embed",
    "footerAbout": "PT Resona Indonesia Finance didirikan pada tanggal 15 Agustus 1984...",
    "ojkStatement": "PT Resona Indonesia Finance berizin dan diawasi oleh Otoritas Jasa Keuangan (OJK)",
    "externalLinks": {
      "bankResonaPerdania": "https://www.perdania.co.id/",
      "jobstreet": "https://www.jobstreet.co.id/...",
      "contactForm": "https://forms.office.com/...",
      "complaintReport": "https://forms.office.com/...",
      "satisfactionSurvey": "https://forms.office.com/..."
    }
  }
}
```

> **FR-CT-03/04/05** — seluruh formulir memakai **Microsoft Forms** melalui link/embed; tidak ada form internal (BRD §4.2).

---

## 4. Integrasi Eksternal (Non-Strapi)

| Sistem | Metode | Catatan |
|---|---|---|
| Google Maps | `<iframe>` embed | Tidak memerlukan API key untuk mode embed |
| Microsoft Forms | Link / embed | URL dari `site-setting.externalLinks` |
| Jobstreet | Redirect (`target="_blank"`) | FR-CR-03 |
| Bank Resona Perdania | Link eksternal | FR-AB-13 |
| Google Analytics 4 / GTM | Script tag | `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID` |

> Tidak ada integrasi API media sosial (BRD §4.2) — hanya ikon/link statis.

---

## 5. Error Handling

| HTTP | Kondisi | Perilaku Frontend |
|---|---|---|
| `200` + `data: []` | Tidak ada entri | Tampilkan empty state (mis. "Tidak tersedia") — **bukan error** |
| `200` + `data: null` | Single type belum diisi | Tampilkan fallback/placeholder |
| `404` | Slug tidak ditemukan | `notFound()` → halaman 404 |
| `401` / `403` | Token invalid / kedaluwarsa | Log ke Sentry; tampilkan halaman error |
| `5xx` / timeout | Strapi down | Sajikan cache ISR terakhir; log ke Sentry (NFR-SC-03) |

```ts
async function strapi<T>(path: string, opts?: RequestInit & { revalidate?: number }) {
  const res = await fetch(`${process.env.STRAPI_URL}/api${path}`, {
    ...opts,
    headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
    next: { revalidate: opts?.revalidate ?? 300 },
  });
  if (!res.ok) throw new Error(`Strapi ${res.status} on ${path}`);
  return (await res.json()) as { data: T; meta?: unknown };
}
```

---

## 6. Mapping Fungsi Frontend → Endpoint

Seluruh fungsi berada di `src/lib/content/index.ts`.

| Fungsi | Endpoint Strapi |
|---|---|
| `getHeroSlides()` | `GET /api/hero-slides?locale={l}&populate=image&sort=order:asc&filters[active][$eq]=true` |
| `getProducts()` | `GET /api/products?locale={l}&populate=image&sort=order:asc` |
| `getProduct(slug)` | `GET /api/products?locale={l}&filters[slug][$eq]={slug}&populate=image` |
| `getSustainabilityReports()` | `GET /api/documents?locale={l}&filters[category][$eq]=sustainability-report&populate=file,thumbnail&sort=year:desc` |
| `getFinancialReports()` | `GET /api/documents?locale={l}&filters[category][$eq]=financial-report&populate=file,thumbnail&sort=year:desc` |
| `getSbdpDocuments()` | `GET /api/documents?locale={l}&filters[category][$eq]=sbdp&populate=file&sort=year:desc,month:desc` |
| `getArticles({category,year,limit})` | `GET /api/articles?locale={l}&populate=image&sort=publishedAt:desc` + filter |
| `getArticle(slug)` | `GET /api/articles?locale={l}&filters[slug][$eq]={slug}&populate=image` |
| `getArticleFacets()` | Dihitung dari `getArticles()`, atau `GET /api/articles/facets` |
| `getVacancies()` | `GET /api/vacancies?locale={l}&filters[active][$eq]=true&sort=postedAt:desc` |
| `getManagement()` | `GET /api/people?locale={l}&populate=photo&sort=order:asc` |
| `getAwards()` | `GET /api/awards?locale={l}&populate=image&sort=year:desc` |
| `getCsrActivities()` | `GET /api/csr-activities?locale={l}&populate=image&sort=date:desc` |
| `getCsrActivity(slug)` | `GET /api/csr-activities?locale={l}&filters[slug][$eq]={slug}&populate=image` |
| `getStaticPage(key)` | `GET /api/static-pages?locale={l}&filters[key][$eq]={key}&populate=document` |

---

## 7. Keamanan API (NFR-SC)

1. **Read-only token** — API token Strapi hanya diberi izin `find` / `findOne`. Tidak ada `create`/`update`/`delete` dari frontend.
2. **Server-side only** — token tidak pernah dikirim ke browser; seluruh fetch berjalan di Server Component / Route Handler.
3. **Public role dimatikan** — role `Public` di Strapi tidak diberi akses apa pun; semua request wajib membawa Bearer token.
4. **MFA pada dashboard** — login admin Strapi dilindungi OTP email (FR-CM-04).
5. **Media library** — seluruh unggahan PDF/gambar melewati Strapi Media Library; **tidak ada plugin file manager PHP** (NFR-SC-07).
6. **Rate limiting & WAF** — diterapkan di level hosting/reverse proxy (NFR-SC-01).
7. **CORS** — Strapi hanya mengizinkan origin domain produksi RIF.
8. **Sanitasi rich text** — konten HTML berasal dari editor terautentikasi. Titik render tunggal ada di `src/components/ui/rich-text.tsx`; bila kelak ada sumber tak tepercaya, sanitasi ditambahkan di sana.

---

## 8. Checklist Implementasi (Phase 3)

- [ ] Buat 12 content type sesuai §2 beserta seluruh field
- [ ] Aktifkan plugin **i18n** dan tambahkan locale `id` (default) & `en`
- [ ] Aktifkan plugin **Users & Permissions**; matikan seluruh akses role `Public`
- [ ] Terbitkan **read-only API token**; simpan ke `.env` frontend
- [ ] Konfigurasi **CORS** untuk domain produksi
- [ ] Aktifkan **MFA/OTP email** pada admin Strapi (FR-CM-04)
- [ ] Ganti implementasi `src/lib/content/index.ts` ke `fetch` Strapi
- [ ] Siapkan webhook `on publish` → `/api/revalidate`
- [ ] Migrasikan konten dari CMS PHP lama (BRD §4.3 — Data Migrasi)
- [ ] Uji fallback bahasa EN → ID (RS-02)
- [ ] Uji empty state: Careers kosong, dokumen kosong, artikel kosong

---

## 9. Catatan Open Items

Endpoint berikut menunggu keputusan client (BRD §5.1):

| ID | Item | Dampak pada API |
|---|---|---|
| OI-01 | Nama produk | **Sudah diselesaikan** — `investment-financing`, `working-capital`, `factoring` (sesuai *Requirement Detail dari RIF*) |
| OI-02 | SBDP | Sudah masuk sebagai `document.category = sbdp` |
| OI-03 | Business License & Finance Facilities | Sudah masuk sebagai `static-page` |
| OI-04 | Kategori News | Sudah masuk sebagai `article.category` |
| OI-05 | **Modul Kurs (Exchange Rate)** | **Belum dibuat** — perlu konfirmasi apakah termasuk scope. Bila ya, tambahkan content type `exchange-rate` (`currency`, `buyRate`, `sellRate`, `effectiveDate`) |
| OI-06 | State Careers kosong | Sudah ditangani — `data: []` → empty state |
| OI-07 | Language switcher | Sudah ditangani via query `?locale=` |
