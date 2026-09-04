# BUSINESS REQUIREMENTS DOCUMENT (BRD)
## Revamp Corporate Website — PT Resona Indonesia Finance

| | |
|---|---|
| **Project Name** | Revamp Corporate Website |
| **Project Code** | revamp-corporate-website |
| **Client** | PT Resona Indonesia Finance (RIF) |
| **Platform** | Web Corporate (Next.js + Strapi Headless CMS) |
| **Prepared By** | Vincent |
| **Document Version** | 1.0 |
| **Status** | Draft — Menunggu Approval Client |
| **Klasifikasi** | Internal Use Only |

### Document Revisions

| Version | Date | Change Note |
|---|---|---|
| 1.0 | 2 September 2026 | Initial BRD — dikonsolidasikan dari Analysis Output Document v1.1, List Menu, dan Requirement Detail dari RIF |

---

## 1. Executive Summary

PT Resona Indonesia Finance (RIF), anak perusahaan dari Bank Resona Perdania (Japan Holding), membutuhkan pembangunan ulang (revamp) website korporat yang ada saat ini. Website existing sedang dalam masa perbaikan akibat ditemukannya celah keamanan pada plugin **File Manager** di CMS PHP custom yang digunakan — celah tersebut bahkan sempat dimanfaatkan untuk menyisipkan malware. Selain itu terdapat kerentanan tingkat *critical* pada cPanel/WHM di hosting Biznet GIO yang wajib ditangani.

Proyek ini menghadirkan platform informasi perusahaan yang **modern, aman, dan minimalis**, dengan memindahkan pengelolaan konten dari CMS PHP monolitik ke **Strapi.io** (Headless CMS berbasis Node.js) dan menyajikan tampilan melalui **Next.js**. Pendekatan *API-first* ini secara arsitektural menghilangkan kelas kerentanan yang umum ditemukan pada CMS monolitik berbasis PHP.

| Ringkasan Proyek | Nilai |
|---|---|
| Total Effort | 89 mandays (termasuk buffer 10%) |
| Timeline | 8 minggu |
| Tim | 7 orang |
| Integrasi Sistem Internal | Tidak ada |
| Sifat Website | Informasional murni (non-transaksional) |

---

## 2. Latar Belakang & Problem Statement

### 2.1 Kondisi Saat Ini (As-Is)

| Aspek | Kondisi Existing | Dampak Bisnis |
|---|---|---|
| **CMS** | CMS PHP custom dengan plugin File Manager | Celah keamanan aktif; malware pernah masuk melalui plugin ini |
| **Infrastruktur** | Hosting Biznet GIO (cPanel + WHM) | Terdapat kerentanan level *critical* yang belum ditangani |
| **Ketersediaan** | Website dalam masa perbaikan | Informasi perusahaan tidak dapat diakses publik & nasabah korporat |
| **Keamanan** | Tanpa WAF, tanpa MFA pada dashboard CMS, tanpa error monitoring | Insiden keamanan tidak terdeteksi dini; risiko reputasi bagi perusahaan pembiayaan di bawah pengawasan OJK |
| **Pengelolaan Konten** | Upload file via plugin File Manager yang rawan | Proses update konten periodik (SBDP, laporan) berisiko |

### 2.2 Problem Statement

> Website korporat RIF saat ini tidak dapat diandalkan sebagai kanal informasi resmi perusahaan karena kerentanan keamanan pada layer aplikasi (plugin CMS) maupun layer infrastruktur (cPanel/WHM), sehingga perusahaan tidak memiliki kanal digital yang aman dan tepercaya untuk memenuhi kewajiban keterbukaan informasi kepada publik, regulator, dan mitra korporat.

### 2.3 Kondisi yang Diharapkan (To-Be)

- Website korporat aktif, aman, dan dapat diakses publik 24/7 dengan tampilan modern dan minimalis.
- Pengelolaan konten mandiri oleh tim RIF melalui dashboard CMS yang terlindungi MFA, tanpa ketergantungan pada developer untuk update rutin.
- Layer keamanan berlapis: WAF di level hosting, MFA pada CMS, serta monitoring error dan akses secara real-time.
- Arsitektur *headless* yang memisahkan pengelolaan data dari penyajian tampilan, sehingga permukaan serangan jauh lebih kecil.

---

## 3. Tujuan Bisnis (Business Objectives)

| ID | Objective | Success Criteria |
|---|---|---|
| BO-01 | Menghilangkan celah keamanan yang ada pada website existing | Tidak ada temuan vulnerability kategori *critical/high* pada saat security testing sebelum go-live |
| BO-02 | Menyediakan kanal informasi korporat yang modern dan representatif | Seluruh 8 menu utama tayang; look & feel selaras dengan induk (Bank Resona Perdania) namun lebih disederhanakan |
| BO-03 | Memberikan kemandirian pengelolaan konten kepada tim RIF | Tim RIF dapat melakukan update SBDP, laporan, berita, dan lowongan tanpa bantuan developer |
| BO-04 | Memenuhi kewajiban keterbukaan informasi | Dokumen GCG, Laporan Keuangan, Sustainability Report, dan SBDP dapat diakses & diunduh publik |
| BO-05 | Meningkatkan keterjangkauan website di mesin pencari | Basic SEO terimplementasi; GA4 & GTM aktif untuk pengukuran trafik |

### 3.1 Target Audiens

| Segmen | Kebutuhan Utama |
|---|---|
| **Korporasi / B2B** (audiens utama) | Informasi produk pembiayaan, kredibilitas & tata kelola perusahaan, laporan keuangan |
| **Publik umum** | Profil perusahaan, berita, kegiatan CSR, kanal pengaduan |
| **Regulator / OJK** | Dokumen GCG, AML-CFT, laporan keuangan audited, laporan penanganan pengaduan |
| **Pencari kerja** | Informasi lowongan dan kanal lamaran |

---

## 4. Ruang Lingkup (Scope)

### 4.1 In Scope

- Pembangunan ulang seluruh halaman website korporat (8 menu utama, kedalaman maksimal 3 level).
- Implementasi Strapi.io sebagai Headless CMS beserta content type dan dashboard pengelolaan.
- Pengembangan frontend Next.js dengan dukungan dua bahasa (Bahasa Indonesia & English).
- Security hardening: WAF, MFA (OTP email) pada CMS, Sentry error monitoring.
- Basic SEO (meta title/description, heading tags, robots.txt, sitemap, image alt, pagespeed).
- Setup Google Analytics 4 & Google Tag Manager.
- Migrasi konten dari CMS PHP lama ke Strapi.
- Deployment ke hosting existing Biznet GIO, UAT, dan serah terima.

### 4.2 Out of Scope

- Fitur transaksional apa pun (pengajuan pembiayaan online, simulasi kredit, pembayaran).
- Integrasi langsung dengan sistem perbankan atau sistem core internal RIF.
- Integrasi API media sosial (feed otomatis); hanya link/ikon statis.
- Pembangunan form internal — seluruh form menggunakan **Microsoft Forms** melalui link/embed.
- Pengadaan hosting baru — menggunakan hosting existing Biznet GIO.
- Penyediaan konten (copywriting, foto, dokumen PDF) — disediakan oleh pihak RIF.
- Aplikasi mobile native.
- Advanced SEO / SEO campaign berkelanjutan.

### 4.3 Asumsi

- Seluruh materi konten (teks final, foto, dan dokumen PDF) disediakan lengkap oleh RIF sesuai jadwal yang disepakati.
- Akses ke hosting Biznet GIO (cPanel/WHM) beserta kredensial dan mail server diberikan pada awal proyek.
- Akun Microsoft Forms, Google Analytics, dan Jobstreet disiapkan dan dimiliki oleh pihak RIF.
- Proses review dan approval dari pihak RIF berjalan sesuai timeline yang disepakati.
- Konten dwibahasa (ID/EN) disediakan oleh RIF untuk kedua bahasa.

#### Aset & Data

**Aset Brand & Desain**

- Logo perusahaan disediakan RIF dalam format vektor (AI/EPS/SVG) beserta versi PNG transparan.
- Panduan identitas visual (brand guideline, palet warna, dan font korporat) disediakan RIF. Apabila tidak tersedia, tim desain akan mengusulkan panduan visual dengan mengacu pada website induk Bank Resona Perdania untuk mendapatkan persetujuan RIF.
- Lisensi font korporat (apabila menggunakan font berbayar) menjadi tanggung jawab dan atas nama RIF.

**Aset Foto & Gambar**

- Seluruh foto (manajemen, kegiatan CSR, penghargaan, kantor, banner) disediakan RIF dalam resolusi tinggi dan siap pakai — tim pengembang tidak melakukan sesi pemotretan, pembuatan ilustrasi, maupun pengadaan stock photo.
- Hak cipta dan izin penggunaan atas seluruh foto, gambar, dan materi visual menjadi tanggung jawab pihak RIF.
- Bagan struktur organisasi disediakan dalam resolusi yang memadai agar tetap terbaca saat menggunakan fasilitas zoom (FR-AB-08).
- Pekerjaan pengolahan gambar yang dilakukan tim pengembang terbatas pada resize, kompresi, dan optimasi web — bukan editing atau desain ulang.

**Dokumen PDF**

- Seluruh dokumen (GCG, AML-CFT, Integrity Pact, Laporan Keuangan, Sustainability Report, SBDP) disediakan RIF dalam format PDF final yang sudah ditandatangani/disahkan, siap dipublikasikan.
- Dokumen PDF diasumsikan berukuran wajar untuk diakses via web; dokumen berukuran sangat besar akan dikompresi terlebih dahulu oleh tim pengembang atas persetujuan RIF.
- Tim pengembang tidak melakukan penyusunan, konversi, maupun perubahan isi dokumen.

**Data Migrasi**

- RIF menyediakan akses (backup database dan/atau file) ke CMS PHP lama untuk keperluan migrasi konten.
- Ruang lingkup migrasi mencakup konten yang **masih relevan dan disetujui untuk dipertahankan** — daftar konten yang dimigrasikan difinalisasi bersama RIF sebelum Phase 4 dimulai. Estimasi migrasi (7.59 mandays) disusun atas dasar volume konten existing; penambahan volume signifikan akan diproses sebagai Change Request (CR).
- Konten hasil migrasi diasumsikan dapat digunakan apa adanya; penulisan ulang (rewrite) atau penyuntingan konten berada di luar scope.
- Konten lama yang mengandung malware, script berbahaya, atau file mencurigakan **tidak akan dimigrasikan** dan akan dilaporkan kepada tim RIF.
- Verifikasi akhir atas kelengkapan dan keakuratan konten hasil migrasi dilakukan oleh pihak RIF pada tahap UAT.

**Kepemilikan Data**

- Seluruh konten, aset, dan data yang tersimpan pada website merupakan milik PT Resona Indonesia Finance.
- Website tidak menyimpan data pribadi pengunjung — seluruh pengumpulan data (form kontak, kuesioner kepuasan, lamaran kerja) dilakukan melalui platform eksternal (Microsoft Forms dan Jobstreet) yang berada di bawah kendali dan kebijakan privasi RIF.

### 4.4 Batasan (Constraints)

- Hosting tetap di Biznet GIO (cPanel + WHM) — tidak berpindah penyedia.
- Update berkala cPanel/WHM dikoordinasikan bersama tim DOT dalam lingkup *managed service*.
- Look & feel mengacu pada website induk Bank Resona Perdania, dengan penyederhanaan.

---

## 5. Sitemap & Struktur Menu

Total **8 menu utama** dengan kedalaman maksimal 3 level. Menu terbesar adalah *About Resona Indonesia Finance* dengan 2 sub-menu dan 7+ sub-sub-menu di bawah Company Profile.

| No | Menu Utama | Sub Menu | Sub-Sub Menu |
|---|---|---|---|
| 1 | **Home** | | |
| 1.1 | | Slide Banner | |
| 1.2 | | Product & Services | |
| 1.3 | | Report | |
| 1.4 | | News | |
| 2 | **About Resona Indonesia Finance** | | |
| 2.1 | | Message From The Management | |
| 2.2 | | Company Profile | |
| 2.2.1 | | | Vision and Mission |
| 2.2.2 | | | Company At a Glance |
| 2.2.3 | | | History |
| 2.2.4 | | | Business License * |
| 2.2.5 | | | Finance Facilities * |
| 2.2.6 | | | Management |
| 2.2.7 | | | Organization Structure |
| 2.2.8 | | | Structure of Shareholder |
| 2.2.9 | | | Award |
| 2.3 | | Corporate Social Responsibility | |
| 2.4 | | Terms of Privacy | |
| 2.5 | | Bank Resona Perdania | |
| 3 | **Good Corporate Governance** | | |
| 3.1 | | Anti Fraud | |
| 3.2 | | Integrity Pact | |
| 3.3 | | Good Corporate Governance | |
| 3.4 | | AML-CFT Policy Statement | |
| 4 | **Corporate Secretary** | | |
| 4.1 | | Sustainability Report | |
| 4.2 | | Financial Report (Audited) | |
| 4.3 | | Business Strategy and Future Plan | |
| 4.4 | | Terms of Privacy | |
| 5 | **Product & Service** | | |
| 5.1 | | Product | Lihat catatan §5.1 |
| 5.2 | | SBDP — Basic Lending Rate * | |
| 6 | **News** | | |
| 6.1 | | Education * | |
| 6.2 | | CSR * | |
| 7 | **Careers** | | |
| 8 | **Contact Us** | | |

> \* Item bertanda bintang muncul pada dokumen *Requirement Detail dari RIF* namun **belum tercantum** pada sitemap Analysis Output Document v1.1. Lihat §5.1 (Open Items) — perlu konfirmasi client karena berdampak pada effort dan timeline.

### 5.1 Open Items — Perlu Konfirmasi Client

Terdapat perbedaan antara dokumen sumber yang **harus diselesaikan sebelum development dimulai**:

| ID | Item | Analysis Output Doc | Requirement Detail RIF | Dampak |
|---|---|---|---|---|
| OI-01 | **Nama produk pembiayaan** | Finance Lease, Sale and Lease Back, Working Capital | Investment Financing, Working Capital, **Factoring** | Konten & judul halaman berbeda; jumlah halaman tetap 3 |
| OI-02 | **SBDP (Basic Lending Rate)** | Tidak ada di sitemap | Ada — tampil per tahun & per bulan, download/view PDF | Menu tambahan; sudah masuk estimasi effort (2.53 mandays) |
| OI-03 | **Business License & Finance Facilities** | Tidak ada | Ada di bawah Company Profile | 2 halaman tambahan |
| OI-04 | **Struktur menu News** | Menu tunggal | Terbagi 2 kategori: Education & CSR, dengan riwayat per tahun | Perlu kategorisasi & filter tahun pada modul News |
| OI-05 | **Kurs (Exchange Rate)** | Tidak ada di sitemap/fitur | Tidak ada — namun muncul pada sheet effort (List Grid + CRUD Kurs) | Perlu klarifikasi apakah modul Kurs termasuk scope |
| OI-06 | **Modul Careers** | Apply → redirect Jobstreet | Terdapat status "Available Jobs / Not Available / Apply Job Now" | Perlu state kosong ketika tidak ada lowongan |
| OI-07 | **Menu Language** | Multilanguage ID/EN | Tercantum sebagai item menu Home (1.9) | Konfirmasi penempatan language switcher |

> **Catatan:** Sesuai kesepakatan proyek, perubahan atau penambahan menu setelah BRD ini disetujui akan diproses sebagai **Change Request (CR)** dan berdampak pada timeline serta effort.

---

## 6. Kebutuhan Fungsional (Functional Requirements)

Kode prioritas: **M** = Must Have, **S** = Should Have, **C** = Could Have.

### 6.1 Modul Home

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-HM-01 | Hero Banner Slider | Carousel gambar + teks highlight perusahaan, dikelola via CMS (tambah/ubah/hapus/urutkan slide) | M |
| FR-HM-02 | Section Product & Services | Ringkasan 3 produk utama dengan tautan ke halaman Product & Service | M |
| FR-HM-03 | Section Report | Highlight laporan terbaru (Financial / Sustainability Report) dengan tautan ke Corporate Secretary | M |
| FR-HM-04 | Section News | Highlight berita/artikel terbaru dengan tautan ke halaman News | M |

### 6.2 Modul About Resona Indonesia Finance

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-AB-01 | Message From The Management | Halaman teks sambutan manajemen disertai foto pejabat terkait; dikelola via CMS | M |
| FR-AB-02 | Vision and Mission | Halaman teks visi & misi perusahaan | M |
| FR-AB-03 | Company At a Glance | Ringkasan profil perusahaan (angka kunci & fakta singkat) | M |
| FR-AB-04 | History | Timeline atau narasi sejarah berdirinya RIF (*Short Journey*) | M |
| FR-AB-05 | Business License | Halaman teks informasi izin usaha *(pending OI-03)* | S |
| FR-AB-06 | Finance Facilities | Halaman teks fasilitas pembiayaan *(pending OI-03)* | S |
| FR-AB-07 | Management | Profil direksi & komisaris (foto + nama + jabatan) | M |
| FR-AB-08 | Organization Structure | Gambar/bagan struktur organisasi dengan **fasilitas zoom**; upload image via CMS | M |
| FR-AB-09 | Structure of Shareholder | Informasi komposisi pemegang saham (teks / infografis) | M |
| FR-AB-10 | Award | Galeri multi-gambar penghargaan; setiap item dapat ditautkan ke penjelasan singkat | M |
| FR-AB-11 | Corporate Social Responsibility | Image slider/gallery foto kegiatan CSR + deskripsi singkat per kegiatan (±1 paragraf); setiap foto dapat ditautkan ke halaman penjelasan detail. Update per semester via CMS | M |
| FR-AB-12 | Terms of Privacy | Halaman statis teks kebijakan privasi | M |
| FR-AB-13 | Bank Resona Perdania | Penjelasan singkat perusahaan induk + tautan ke website BRP (eksternal, buka tab baru) | M |

### 6.3 Modul Good Corporate Governance

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-GC-01 | Anti Fraud | Halaman teks kebijakan anti-fraud + dokumen PDF | M |
| FR-GC-02 | Integrity Pact | Dokumen PDF dengan opsi **View PDF** (preview in-browser) dan **Download** | M |
| FR-GC-03 | Good Corporate Governance | Halaman teks tata kelola + dokumen PDF | M |
| FR-GC-04 | AML-CFT Policy Statement | Halaman teks kebijakan APU-PPT + dokumen PDF | M |

### 6.4 Modul Corporate Secretary

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-CS-01 | Sustainability Report | Daftar laporan dikelompokkan **per tahun**, dengan thumbnail, opsi View PDF & Download. Update per semester | M |
| FR-CS-02 | Financial Report (Audited) | Daftar laporan dengan **filter/sort berdasarkan tahun** (opsi *All* dan per tahun), thumbnail, View PDF & Download. Update tahunan | M |
| FR-CS-03 | Business Strategy and Future Plan | Halaman teks / PDF, update insidental | M |
| FR-CS-04 | Terms of Privacy | Halaman statis teks | M |

> **Pola tampilan dokumen (berlaku untuk FR-CS-01, FR-CS-02, dan FR-PS-04):** daftar per tahun → klik tahun → tampil PDF preview + opsi download.

### 6.5 Modul Product & Service

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-PS-01 | Halaman Produk 1 | Deskripsi informasional produk *(nama final pending OI-01)* | M |
| FR-PS-02 | Halaman Produk 2 | Deskripsi informasional produk *(nama final pending OI-01)* | M |
| FR-PS-03 | Halaman Produk 3 | Deskripsi informasional produk *(nama final pending OI-01)* | M |
| FR-PS-04 | SBDP — Basic Lending Rate | Daftar dokumen SBDP **per tahun dan per bulan**, opsi View PDF & Download. Update 1×/bulan via CMS *(pending OI-02)* | M |

> Seluruh halaman produk bersifat informasional — **tidak ada fitur transaksi, pengajuan, maupun simulasi**.

### 6.6 Modul News

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-NW-01 | List Artikel | Daftar berita & kegiatan perusahaan dengan thumbnail foto dan tautan *Read More* | M |
| FR-NW-02 | Detail Artikel | Halaman detail: judul, tanggal, isi teks, dan foto | M |
| FR-NW-03 | Kategori Artikel | Pengelompokan artikel ke kategori **Education** dan **CSR** *(pending OI-04)* | S |
| FR-NW-04 | Filter Riwayat per Tahun | Menampilkan riwayat artikel dikelompokkan per tahun (*Recent Posts per Year*) | S |
| FR-NW-05 | Pengelolaan via CMS | Tim RIF dapat membuat, mengubah, dan menghapus artikel (teks + upload gambar) | M |

### 6.7 Modul Careers

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-CR-01 | Daftar Lowongan Aktif | Daftar posisi yang tersedia (jabatan, requirement, deskripsi) | M |
| FR-CR-02 | State "Not Available" | Tampilan khusus ketika tidak ada lowongan aktif | M |
| FR-CR-03 | Apply Job Now | Tombol *Apply* → redirect ke Jobstreet (eksternal). Alternatif: posting teks/PDF lowongan langsung di halaman | M |
| FR-CR-04 | Pengelolaan via CMS | CRUD lowongan kerja oleh tim RIF | M |

### 6.8 Modul Contact Us

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-CT-01 | Informasi Kontak | Alamat kantor, nomor telepon, dan email perusahaan.<br>Telp: 021 - 570 1956<br>Alamat: Sampoerna Strategic Square South Tower, Level 9, Jl. Jend. Sudirman Kav. 45-46, Jakarta Selatan 12930 | M |
| FR-CT-02 | Google Maps Embed | Peta lokasi kantor tertanam di halaman | M |
| FR-CT-03 | Form Kontak | Tautan/embed menuju **Microsoft Forms** (tidak ada form internal) | M |
| FR-CT-04 | Laporan Penanganan Pengaduan | Tautan menuju *Customer Complaints Handling Report* (per tahun) | M |
| FR-CT-05 | Kuesioner Kepuasan | Tautan menuju *Customer Satisfaction Questionnaire* | M |

### 6.9 Navigasi & Global

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-GL-01 | Header & Main Navigation | Menu navigasi utama hingga 3 level, responsif di seluruh perangkat | M |
| FR-GL-02 | Footer | Informasi kontak ringkas, tautan menu penting, dan pernyataan legal | M |
| FR-GL-03 | Multilanguage ID/EN | Peralihan bahasa Indonesia ↔ English pada seluruh halaman (Next.js i18n / next-intl) | M |
| FR-GL-04 | Enable/Disable Menu | Pengaturan tampil/sembunyikan menu di frontend melalui CMS **tanpa menghapus konten** — mendukung publikasi bertahap | M |
| FR-GL-05 | Responsive Design | Tampilan optimal pada desktop, tablet, dan mobile | M |

### 6.10 CMS & Administrasi

| ID | Kebutuhan | Deskripsi | Prioritas |
|---|---|---|---|
| FR-CM-01 | Headless CMS (Strapi.io) | Strapi mengelola konten (Model) & logika bisnis (Controller/Services), menyajikan data ke Next.js via REST API / GraphQL. Tidak ada komponen View di Strapi | M |
| FR-CM-02 | Auto-generated API & CRUD | Endpoint CRUD dan dokumentasi API dihasilkan otomatis untuk setiap content type | M |
| FR-CM-03 | Media Library | Upload & pengelolaan PDF serta gambar melalui Strapi media library — **menggantikan plugin File Manager** yang rawan pada CMS existing | M |
| FR-CM-04 | MFA (Multi-Factor Authentication) | Login dashboard Strapi dilindungi OTP via email, memanfaatkan mail server hosting Biznet GIO | M |
| FR-CM-05 | Manajemen User & Role | Pengaturan hak akses pengguna CMS sesuai peran | M |

---

## 7. Kebutuhan Non-Fungsional (Non-Functional Requirements)

### 7.1 Keamanan

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| NFR-SC-01 | Web Application Firewall (WAF) | Diterapkan di level server/hosting untuk memfilter trafik berbahaya |
| NFR-SC-02 | MFA pada CMS | OTP via email untuk seluruh akses dashboard Strapi |
| NFR-SC-03 | Error Monitoring (Sentry) | Notifikasi real-time apabila terjadi error atau anomali akses |
| NFR-SC-04 | Log Akses & Error | Log tersimpan dan dapat diteruskan sebagai laporan bulanan kepada tim RIF |
| NFR-SC-05 | cPanel/WHM Update Management | Update berkala dikoordinasikan bersama tim DOT dalam lingkup managed service |
| NFR-SC-06 | Security Testing | Pengujian keamanan dilakukan sebelum go-live; tidak boleh ada temuan critical/high yang belum ditangani |
| NFR-SC-07 | Eliminasi File Manager Plugin | Tidak menggunakan plugin file manager berbasis PHP; seluruh pengelolaan file melalui Strapi media library |

### 7.2 Performa & Kualitas

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| NFR-PF-01 | Page Speed | Optimasi kecepatan halaman termasuk kompresi gambar dan lazy loading |
| NFR-PF-02 | Basic SEO | Meta title & description, heading tags, robots.txt, sitemap.xml, image alt text |
| NFR-PF-03 | Analytics | Google Analytics 4 dan Google Tag Manager terpasang dan aktif |
| NFR-PF-04 | Kompatibilitas Browser | Berfungsi baik pada browser modern (Chrome, Firefox, Safari, Edge) versi terkini |
| NFR-PF-05 | Responsivitas | Tampilan adaptif pada resolusi desktop, tablet, dan mobile |

### 7.3 Operasional

| ID | Kebutuhan | Deskripsi |
|---|---|---|
| NFR-OP-01 | Hosting | Tetap menggunakan Biznet GIO (cPanel + WHM) existing dengan penguatan security layer |
| NFR-OP-02 | Kemandirian Konten | Tim RIF dapat memperbarui seluruh konten periodik tanpa bantuan developer |
| NFR-OP-03 | Dokumentasi & Training | Serah terima disertai dokumentasi penggunaan CMS |

### 7.4 Frekuensi Update Konten

| Jenis Konten | Frekuensi | Format |
|---|---|---|
| SBDP (Suku Bunga Dasar Pembiayaan) | 1× per bulan | PDF |
| Laporan Literasi & CSR | Per semester | PDF + gambar |
| Sustainability Report | Per semester | PDF + thumbnail |
| Laporan Keuangan (Audited) | Tahunan | PDF + thumbnail |
| Berita / News | Insidental | Teks + gambar |
| Lowongan Kerja | Insidental | Teks |

---

## 8. Arsitektur & Technology Stack

| Layer | Teknologi |
|---|---|
| **Frontend** | HTML5, CSS3, TailwindCSS, JavaScript, Next.js (React) |
| **CMS / Backend** | Strapi.io (Node.js) — Headless CMS |
| **Database** | MySQL / PostgreSQL (via Strapi) |
| **Hosting** | Biznet GIO (cPanel + WHM) — existing |
| **Security** | WAF, MFA (OTP Email), Sentry |
| **Integrasi Eksternal** | Google Maps Embed, Microsoft Forms (link/embed), Jobstreet (redirect) |
| **Analytics** | Google Analytics 4, Google Tag Manager |
| **Internationalization** | next-intl (ID/EN) |

### 8.1 Prinsip Arsitektur

- **API-First / Headless** — Strapi menyajikan data melalui REST API / GraphQL; seluruh rendering tampilan ditangani Next.js. Pemisahan ini menghilangkan kelas kerentanan yang umum pada CMS monolitik PHP.
- **Tanpa integrasi sistem internal** — tidak ada koneksi ke sistem perbankan maupun sistem transaksional apa pun.
- **Konten murni informasional** — tidak ada transaksi, tidak ada integrasi media sosial langsung, tidak ada form internal.

### 8.2 Integrasi Eksternal

| Sistem | Tujuan | Metode |
|---|---|---|
| Google Maps | Menampilkan lokasi kantor | Embed iframe |
| Microsoft Forms | Form kontak, kuesioner kepuasan nasabah | Link / embed |
| Jobstreet | Kanal lamaran pekerjaan | Redirect eksternal |
| Bank Resona Perdania | Informasi perusahaan induk | Tautan eksternal |

---

## 9. Timeline & Effort

### 9.1 Ringkasan

| Parameter | Nilai |
|---|---|
| Total Effort | **89 mandays** (sudah termasuk buffer 10%) |
| Timeline | **8 minggu** |
| Jumlah Tim | **7 orang** |

### 9.2 Komposisi Tim

| Peran | Jumlah |
|---|---|
| Project Manager (PM) | 1 |
| System Analyst (SA) | 1 |
| Fullstack Web Developer (FS) | 1 |
| Quality Assurance (QA) | 1 |
| DevOps (DO) | 1 |
| UI/UX Designer (DS) | 1 |
| SEO Engineer | 1 |

### 9.3 Fase Proyek

| Phase | Kegiatan | Estimasi |
|---|---|---|
| Phase 1 | Requirement finalisasi, sitemap approval, UI/UX design prototype | Week 1–2 |
| Phase 2 | Setup infrastruktur (hosting, domain, Strapi, Next.js), design approval | Week 2–3 |
| Phase 3 | Development frontend (Next.js) + backend CMS (Strapi) | Week 4–7 |
| Phase 4 | Integrasi, QA testing, security testing, UAT | Week 8–9 |
| Phase 5 | Deployment, go-live, serah terima | Week 9 |

> Catatan: pembagian fase pada dokumen analisis mencantumkan Week 9, sementara *timeline estimation* menyebut 8 minggu. Perlu penyelarasan pada saat kick-off.

### 9.4 Breakdown Effort per Modul

| Workflow / Module | Mandays |
|---|---|
| Requirement Gathering | 7.50 |
| UI/UX Design Prototyping | 10.80 |
| Initial Setup (Infrastruktur + Security Layer) | 12.71 |
| Home (Hero Banner + Sections) | 4.81 |
| About RIF (seluruh sub-halaman + CSR) | 8.60 |
| Good Corporate Governance | 3.80 |
| Corporate Secretary | 5.31 |
| Product & Service (3 produk + SBDP) | 5.57 |
| Careers (halaman + CRUD lowongan) | 7.84 |
| Kurs (List Grid + CRUD) *(pending OI-05)* | 7.08 |
| News | 3.04 |
| Contact Us | 2.53 |
| Navigation & Global (Header, Footer, Multilanguage) | 10.12 |
| SEO & Analytics (Basic SEO + GA4/GTM) | 5.06 |
| Migrasi Data | 7.59 |
| UAT & Bug Fixing | 2.97 |
| Deployment & Go-Live | 1.82 |
| **TOTAL (dengan buffer 10%)** | **± 89** |

> Angka pada tabel di atas bersumber dari file *[TIMELINE & EFFORT] RIF - Revamp Corporate Website.xlsx*. Terdapat dua versi sheet perhitungan (83.66 dan 89.37 mandays) dengan cakupan item yang sedikit berbeda; **89 mandays** adalah angka yang tercantum resmi pada Analysis Output Document dan digunakan sebagai acuan.

---

## 10. Deliverables

| No | Deliverable | Fase |
|---|---|---|
| 1 | Business Requirements Document (dokumen ini) | Phase 1 |
| 2 | Sitemap final yang disetujui | Phase 1 |
| 3 | UI/UX Design Prototype | Phase 1–2 |
| 4 | Website korporat Next.js (production-ready) | Phase 3 |
| 5 | Strapi CMS dengan content type & dashboard terkonfigurasi | Phase 3 |
| 6 | Security layer terpasang (WAF, MFA, Sentry) | Phase 2–4 |
| 7 | Laporan hasil QA & security testing | Phase 4 |
| 8 | Konten hasil migrasi dari CMS lama | Phase 4 |
| 9 | Website live di hosting Biznet GIO | Phase 5 |
| 10 | Dokumentasi penggunaan CMS & serah terima | Phase 5 |

---

## 11. Risiko & Mitigasi

| ID | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| RS-01 | Konten (teks, foto, PDF) dari RIF terlambat disediakan | Timeline development & migrasi mundur | Sepakati jadwal penyerahan konten pada kick-off; gunakan konten placeholder sementara |
| RS-02 | Konten dwibahasa (EN) belum tersedia lengkap | Fitur multilanguage tidak dapat diuji penuh | Konfirmasi ketersediaan konten EN di awal; sediakan mekanisme fallback bahasa |
| RS-03 | Kerentanan *critical* pada cPanel/WHM belum tertangani saat go-live | Website baru tetap berisiko | Koordinasi patching dengan tim DOT & Biznet GIO sebelum Phase 5 |
| RS-04 | Open Items (§5.1) belum diputuskan | Rework pada struktur menu & konten | Finalisasi seluruh Open Items sebelum Phase 3 dimulai |
| RS-05 | Perubahan/penambahan menu setelah approval | Timeline & effort bertambah | Diproses sebagai Change Request (CR) dengan re-estimasi |
| RS-06 | Keterbatasan hosting cPanel untuk menjalankan Node.js (Strapi + Next.js) | Deployment gagal atau performa tidak optimal | Validasi kapabilitas server Biznet GIO pada Phase 2 (Initial Setup) sebelum development penuh |
| RS-07 | Proses review/approval client lambat | Seluruh fase mundur | Tetapkan SLA review pada kick-off dan checkpoint mingguan |

---

## 12. Catatan Proyek

- Analisis awal dilakukan berdasarkan hasil diskusi meeting dengan **Pak Bayu** dan **Bu Evi** (RIF) serta content list yang telah dikirimkan.
- Masih dimungkinkan adanya perubahan menu dan sub-menu sesuai kebutuhan klien; perubahan akan berpengaruh pada timeline dan efforts.
- Apabila terdapat perubahan atau penambahan fitur ketika proyek berjalan dan di luar scope yang disepakati, maka akan masuk sebagai **Change Request (CR)**.
- Mandays yang tercantum sudah termasuk **buffer 10%**.
- Estimasi ini mencakup beberapa item di luar development website murni yang **dapat di-*takeout*** apabila tidak termasuk dalam scope yang disepakati:
  - Security hardening (WAF setup, MFA CMS)
  - Basic SEO Implementation
  - Error monitoring setup (Sentry)
  - Server configuration support (cPanel/WHM)

---

## 13. Approval

| Peran | Nama | Tanda Tangan | Tanggal |
|---|---|---|---|
| Prepared by (System Analyst) | Vincent | | |
| Reviewed by (Project Manager) | | | |
| Approved by (Client — PT Resona Indonesia Finance) | | | |

---

### Lampiran — Dokumen Sumber

| Dokumen | Lokasi |
|---|---|
| Analysis Output Document v1.1 | `docs/Analysis/[ANALYSIS OUTPUT DOCUMENT] RIF - Revamp Corporate Website.docx` |
| Deck Presentasi Development | `docs/Analysis/[Deck] RIF - Revamp Corporate Website Development.pptx` |
| Timeline & Effort | `docs/Analysis/[TIMELINE & EFFORT] RIF - Revamp Corporate Website.xlsx` |
| List Menu | `docs/Requirement/list menu.docx` |
| Requirement Detail dari RIF | `docs/Requirement/Requirement Detail dari RIF.xlsx` |
