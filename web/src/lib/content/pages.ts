import type { StaticPage } from "./types";

/**
 * Rich-text pages managed as single-type entries in the CMS.
 * Keyed by the last segment of their route.
 */
export const staticPages: Record<string, StaticPage> = {
  "management-message": {
    key: "management-message",
    title: {
      id: "Sambutan Manajemen",
      en: "Message From The Management",
    },
    body: {
      id: `<h2>Para Pemegang Saham dan Pemangku Kepentingan yang terhormat,</h2>
<p>Perekonomian global menunjukkan kinerja yang bervariasi, dipengaruhi oleh tensi geopolitik, fragmentasi perdagangan, serta dinamika kebijakan moneter di berbagai negara. Dalam situasi ketidakpastian ini, Indonesia berhasil mencatatkan pertumbuhan ekonomi yang terjaga, ditopang oleh permintaan domestik dan sektor jasa keuangan yang tetap resilien.</p>
<p>Sejalan dengan hal ini, sektor jasa keuangan tumbuh kontributif didukung oleh tingkat permodalan yang kuat, likuiditas memadai, dan profil risiko yang terjaga. Perusahaan Pembiayaan mencatatkan kinerja yang tercermin dari pertumbuhan total aset, likuiditas, dan ekuitas.</p>
<p>Menghadapi tantangan ekonomi dan geopolitik global, stabilitas sistem keuangan Indonesia terus resilien dengan optimisme terhadap kinerja domestik yang terkendali. PT Resona Indonesia Finance berkomitmen untuk terus menghadirkan solusi pembiayaan yang relevan bagi pertumbuhan bisnis nasabah.</p>
<p>Kami mengucapkan terima kasih atas kepercayaan dan dukungan seluruh pemangku kepentingan. Bersama, kami akan terus membangun masa depan yang lebih baik.</p>`,
      en: `<h2>Dear Shareholders and Stakeholders,</h2>
<p>The global economy has shown varied performance, influenced by geopolitical tensions, trade fragmentation, and monetary policy dynamics across countries. Amid this uncertainty, Indonesia has recorded steady economic growth, supported by domestic demand and a resilient financial services sector.</p>
<p>In line with this, the financial services sector grew contributively, supported by strong capitalisation, adequate liquidity, and a well-maintained risk profile. Financing companies recorded performance reflected in the growth of total assets, liquidity, and equity.</p>
<p>Facing global economic and geopolitical challenges, Indonesia's financial system stability remains resilient with optimism toward well-managed domestic performance. PT Resona Indonesia Finance is committed to continuing to deliver financing solutions relevant to our customers' business growth.</p>
<p>We extend our gratitude for the trust and support of all stakeholders. Together, we will continue building a brighter future.</p>`,
    },
  },

  "vision-mission": {
    key: "vision-mission",
    title: { id: "Visi dan Misi", en: "Vision and Mission" },
    body: {
      id: `<h2>Visi</h2>
<p>Menjadi Perusahaan Pembiayaan yang sehat dan memiliki daya saing.</p>
<h2>Misi</h2>
<ul>
<li>Menciptakan lingkungan kerja yang kondusif dan berdaya kreatif produktif bagi Sumber Daya Manusia RIF;</li>
<li>Mengoptimalkan pelayanan prima kepada Nasabah;</li>
<li>Menjunjung tinggi penerapan Tata Kelola Perusahaan yang baik dalam penyelenggaraan usaha;</li>
<li>Memaksimalkan nilai RIF bagi seluruh Pemangku Kepentingan;</li>
<li>Meningkatkan kontribusi RIF untuk pertumbuhan ekonomi nasional, langsung jawab sosial dan kelestarian lingkungan.</li>
</ul>`,
      en: `<h2>Vision</h2>
<p>To become a sound and competitive financing company.</p>
<h2>Mission</h2>
<ul>
<li>Create a conducive working environment that is creative and productive for RIF's human resources;</li>
<li>Optimise excellent service to customers;</li>
<li>Uphold the implementation of good corporate governance in conducting business;</li>
<li>Maximise RIF's value for all stakeholders;</li>
<li>Increase RIF's contribution to national economic growth, social responsibility, and environmental sustainability.</li>
</ul>`,
    },
  },

  "at-a-glance": {
    key: "at-a-glance",
    title: { id: "Sekilas Perusahaan", en: "Company At a Glance" },
    body: {
      id: `<p>PT Resona Indonesia Finance (untuk selanjutnya disebut “Perusahaan”) didirikan pada tanggal 15 Agustus 1984 berdasarkan akta No. 157 tanggal 15 Agustus 1984 yang dibuat dihadapan Lieyono, S.H., sebagai pengganti dari Musjaffak yang merupakan pengganti dari Misahardi Wilamarta S.H., notaris di Jakarta. Perusahaan tergabung dalam kelompok Resona Grup.</p>
<p>Pada pendiriannya, Perusahaan telah mengalami beberapa kali pergantian nama. Pada tahun 1984 Perusahaan didirikan dengan nama PT Daiwa Lippo Leasing Corporation. Selanjutnya, pada tahun 1994, Perusahaan berubah nama menjadi PT Daiwa Lippo Finance. Kemudian pada tahun 2003 hingga saat ini, Perusahaan mengganti nama menjadi PT Resona Indonesia Finance.</p>
<h2>Kegiatan Usaha Berdasarkan Anggaran Dasar</h2>
<p>Sesuai dengan pasal 3 Anggaran Dasar Perusahaan, Perusahaan dapat melaksanakan kegiatan usaha yang meliputi pembiayaan barang dan/atau jasa sebagai berikut:</p>
<ol>
<li>Pembiayaan Investasi;</li>
<li>Pembiayaan Modal Kerja;</li>
<li>Pembiayaan Multiguna;</li>
<li>Kegiatan usaha pembiayaan lain berdasarkan persetujuan Otoritas Jasa Keuangan.</li>
</ol>
<h2>Kegiatan Usaha Selama Tahun Berjalan</h2>
<p>Perusahaan menjalankan kegiatan usaha dalam bentuk pembiayaan investasi dan pembiayaan modal kerja. Adapun Fasilitas Pembiayaan yang disediakan oleh Perusahaan termasuk namun tidak terbatas untuk membiayai mesin industri, tool dan equipment, alat berat, mobil penumpang dan/atau kendaraan komersial, komputer dan/atau aksesoris, serta peralatan TI.</p>`,
      en: `<p>PT Resona Indonesia Finance (hereinafter referred to as the “Company”) was established on 15 August 1984 under deed No. 157 dated 15 August 1984, drawn up before Lieyono, S.H., as substitute for Musjaffak, who was the substitute for Misahardi Wilamarta S.H., notary in Jakarta. The Company is part of the Resona Group.</p>
<p>Since its establishment the Company has changed its name several times. In 1984 the Company was founded as PT Daiwa Lippo Leasing Corporation. In 1994 it was renamed PT Daiwa Lippo Finance. From 2003 to the present the Company has operated as PT Resona Indonesia Finance.</p>
<h2>Business Activities Under the Articles of Association</h2>
<p>In accordance with Article 3 of the Company's Articles of Association, the Company may carry out business activities covering the financing of goods and/or services as follows:</p>
<ol>
<li>Investment Financing;</li>
<li>Working Capital Financing;</li>
<li>Multipurpose Financing;</li>
<li>Other financing business activities subject to the approval of the Financial Services Authority.</li>
</ol>
<h2>Business Activities During the Year</h2>
<p>The Company conducts its business in the form of investment financing and working capital financing. The financing facilities provided include but are not limited to industrial machinery, tools and equipment, heavy equipment, passenger cars and/or commercial vehicles, computers and/or accessories, and IT equipment.</p>`,
    },
  },

  "business-license": {
    key: "business-license",
    title: { id: "Izin Usaha", en: "Business License" },
    body: {
      id: `<ol>
<li>Keputusan Menteri Keuangan Republik Indonesia No.KEP-197/KM.6/2003 tentang Perubahan atas Keputusan Menteri Keuangan No.655/KMK.017/1994 tentang Pemberian Izin Usaha dalam Bidang Lembaga Pembiayaan kepada PT Resona Indonesia Finance.</li>
<li>Keputusan Menteri Keuangan No.055/KMK.017/1994 tentang Pemberian Izin Usaha Lembaga Pembiayaan kepada PT Daiwa Lippo Finance.</li>
<li>Keputusan Menteri Keuangan Republik Indonesia No.KEP-145/KM.11/1984 tentang Pemberian Izin Usaha dalam Bidang Leasing kepada PT Daiwa Lippo Leasing Corporation.</li>
</ol>`,
      en: `<ol>
<li>Decree of the Minister of Finance of the Republic of Indonesia No. KEP-197/KM.6/2003 concerning the Amendment to Decree of the Minister of Finance No. 655/KMK.017/1994 on the Granting of a Business License in the Field of Financing Institutions to PT Resona Indonesia Finance.</li>
<li>Decree of the Minister of Finance No. 055/KMK.017/1994 concerning the Granting of a Financing Institution Business License to PT Daiwa Lippo Finance.</li>
<li>Decree of the Minister of Finance of the Republic of Indonesia No. KEP-145/KM.11/1984 concerning the Granting of a Business License in the Field of Leasing to PT Daiwa Lippo Leasing Corporation.</li>
</ol>`,
    },
  },

  "finance-facilities": {
    key: "finance-facilities",
    title: { id: "Fasilitas Pembiayaan", en: "Finance Facilities" },
    body: {
      id: `<p>PT RIF berfokus pada penyediaan Fasilitas Pembiayaan dalam bentuk:</p>
<h3>1. Pembiayaan Investasi</h3>
<p>Pembiayaan Investasi yang dilakukan dengan cara:</p>
<ul>
<li>Sewa Pembiayaan; dan</li>
<li>Jual dan Sewa Balik.</li>
</ul>
<h3>2. Pembiayaan Modal Kerja</h3>
<p>Pembiayaan Modal Kerja yang dilakukan dengan cara Pembiayaan Fasilitas Modal Usaha.</p>
<p>Fasilitas Pembiayaan yang disediakan oleh PT RIF termasuk namun tidak terbatas pada pembiayaan:</p>
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
      en: `<p>PT RIF focuses on providing financing facilities in the form of:</p>
<h3>1. Investment Financing</h3>
<p>Investment financing provided through:</p>
<ul>
<li>Finance Lease; and</li>
<li>Sale and Lease Back.</li>
</ul>
<h3>2. Working Capital Financing</h3>
<p>Working capital financing provided through Business Capital Facility schemes.</p>
<p>The financing facilities provided by PT RIF include but are not limited to:</p>
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

  shareholders: {
    key: "shareholders",
    title: { id: "Struktur Pemegang Saham", en: "Structure of Shareholder" },
    body: {
      id: `<p>Per 31 Desember 2024, struktur pemegang saham Perusahaan adalah sebagai berikut:</p>
<table>
<thead><tr><th>Pemegang Saham</th><th>Kepemilikan</th></tr></thead>
<tbody>
<tr><td>PT Bank Resona Perdania</td><td>99,99%</td></tr>
<tr><td>Resona Bank, Ltd.</td><td>0,01%</td></tr>
</tbody>
</table>
<p><strong>Catatan:</strong> Seluruh anggota Direksi dan Dewan Komisaris Perusahaan tidak memiliki saham pada Perusahaan.</p>`,
      en: `<p>As of 31 December 2024, the Company's shareholder structure was as follows:</p>
<table>
<thead><tr><th>Shareholder</th><th>Ownership</th></tr></thead>
<tbody>
<tr><td>PT Bank Resona Perdania</td><td>99.99%</td></tr>
<tr><td>Resona Bank, Ltd.</td><td>0.01%</td></tr>
</tbody>
</table>
<p><strong>Note:</strong> No members of the Board of Directors or the Board of Commissioners hold shares in the Company.</p>`,
    },
  },

  privacy: {
    key: "privacy",
    title: { id: "Ketentuan Privasi", en: "Terms of Privacy" },
    body: {
      id: `<p>PT Resona Indonesia Finance menghormati privasi setiap pengunjung situs web ini dan berkomitmen melindungi setiap informasi yang disampaikan kepada kami.</p>
<h2>Informasi yang Kami Kumpulkan</h2>
<p>Situs web ini bersifat informasional dan tidak mengumpulkan data pribadi pengunjung secara langsung. Seluruh pengumpulan data — termasuk formulir kontak, kuesioner kepuasan, dan lamaran kerja — dilakukan melalui platform eksternal yang tunduk pada kebijakan privasi masing-masing penyedia.</p>
<h2>Penggunaan Cookie</h2>
<p>Situs ini dapat menggunakan cookie analitik untuk memahami cara pengunjung menggunakan situs, sehingga kami dapat meningkatkan kualitas layanan. Anda dapat menonaktifkan cookie melalui pengaturan peramban Anda.</p>
<h2>Keamanan Informasi</h2>
<p>Kami menerapkan langkah pengamanan teknis dan organisasi yang wajar untuk melindungi informasi dari akses, pengungkapan, perubahan, atau perusakan yang tidak sah.</p>
<h2>Tautan ke Situs Lain</h2>
<p>Situs ini memuat tautan ke situs pihak ketiga. Kami tidak bertanggung jawab atas praktik privasi maupun isi dari situs tersebut.</p>
<h2>Perubahan Ketentuan</h2>
<p>Ketentuan privasi ini dapat diperbarui sewaktu-waktu. Perubahan akan dipublikasikan pada halaman ini.</p>`,
      en: `<p>PT Resona Indonesia Finance respects the privacy of every visitor to this website and is committed to protecting any information submitted to us.</p>
<h2>Information We Collect</h2>
<p>This website is informational and does not directly collect visitors' personal data. All data collection — including the contact form, satisfaction questionnaire, and job applications — is carried out through external platforms subject to their respective privacy policies.</p>
<h2>Use of Cookies</h2>
<p>This site may use analytics cookies to understand how visitors use the site so that we can improve the quality of our service. You may disable cookies through your browser settings.</p>
<h2>Information Security</h2>
<p>We apply reasonable technical and organisational safeguards to protect information from unauthorised access, disclosure, alteration, or destruction.</p>
<h2>Links to Other Sites</h2>
<p>This site contains links to third-party websites. We are not responsible for the privacy practices or content of those sites.</p>
<h2>Changes to These Terms</h2>
<p>These privacy terms may be updated from time to time. Any changes will be published on this page.</p>`,
    },
  },

  "bank-resona-perdania": {
    key: "bank-resona-perdania",
    title: { id: "Bank Resona Perdania", en: "Bank Resona Perdania" },
    body: {
      id: `<h2>Bank Resona Perdania</h2>
<p>Bank Resona Perdania (“Bank”) didirikan pada tanggal 15 Februari 1956 dan mulai efektif beroperasi sejak tanggal 1 Februari 1958. Bank Resona Perdania merupakan bank joint venture pertama di Indonesia yang merupakan bukti nyata usaha Indonesia dan Jepang dalam meningkatkan kerja sama ekonomi, khususnya di sektor perbankan.</p>
<p>Anda dapat mengunjungi halaman Bank Resona Perdania dengan klik tautan berikut:</p>`,
      en: `<h2>Bank Resona Perdania</h2>
<p>Bank Resona Perdania (“the Bank”) was established on 15 February 1956 and commenced operations effectively on 1 February 1958. Bank Resona Perdania was the first joint-venture bank in Indonesia, a concrete testament to Indonesian and Japanese efforts to strengthen economic cooperation, particularly in the banking sector.</p>
<p>You can visit the Bank Resona Perdania website via the following link:</p>`,
    },
  },

  "anti-fraud": {
    key: "anti-fraud",
    title: { id: "Anti Fraud", en: "Anti Fraud" },
    body: {
      id: `<p>PT Resona Indonesia Finance berkomitmen untuk menerapkan strategi anti fraud secara menyeluruh guna mencegah, mendeteksi, dan menangani setiap potensi kecurangan dalam kegiatan operasional perusahaan.</p>
<h2>Pilar Strategi Anti Fraud</h2>
<ol>
<li><strong>Pencegahan</strong> — penerapan anti fraud awareness, identifikasi kerawanan, dan know your employee.</li>
<li><strong>Deteksi</strong> — kebijakan whistleblowing, surprise audit, dan sistem pengawasan.</li>
<li><strong>Investigasi, Pelaporan, dan Sanksi</strong> — standar investigasi, mekanisme pelaporan, dan pengenaan sanksi yang tegas.</li>
<li><strong>Pemantauan, Evaluasi, dan Tindak Lanjut</strong> — pemantauan berkelanjutan atas tindak lanjut hasil investigasi.</li>
</ol>
<h2>Pelaporan</h2>
<p>Setiap pihak dapat menyampaikan laporan dugaan fraud melalui kanal pengaduan resmi Perusahaan. Kerahasiaan identitas pelapor dijamin sesuai ketentuan yang berlaku.</p>`,
      en: `<p>PT Resona Indonesia Finance is committed to implementing a comprehensive anti-fraud strategy to prevent, detect, and handle any potential fraud in the Company's operational activities.</p>
<h2>Anti-Fraud Strategy Pillars</h2>
<ol>
<li><strong>Prevention</strong> — anti-fraud awareness, vulnerability identification, and know your employee.</li>
<li><strong>Detection</strong> — whistleblowing policy, surprise audits, and surveillance systems.</li>
<li><strong>Investigation, Reporting, and Sanctions</strong> — investigation standards, reporting mechanisms, and firm imposition of sanctions.</li>
<li><strong>Monitoring, Evaluation, and Follow-up</strong> — continuous monitoring of follow-up on investigation results.</li>
</ol>
<h2>Reporting</h2>
<p>Any party may submit a report of suspected fraud through the Company's official complaint channels. The confidentiality of the reporter's identity is guaranteed in accordance with applicable provisions.</p>`,
    },
    document: { url: "/documents/anti-fraud-policy.pdf", mime: "application/pdf" },
  },

  "integrity-pact": {
    key: "integrity-pact",
    title: { id: "Pakta Integritas", en: "Integrity Pact" },
    body: {
      id: `<p>Pakta Integritas merupakan pernyataan komitmen seluruh jajaran PT Resona Indonesia Finance untuk menjalankan tugas dan tanggung jawab secara jujur, transparan, serta bebas dari benturan kepentingan, korupsi, kolusi, dan nepotisme.</p>
<p>Dokumen Pakta Integritas dapat dilihat dan diunduh melalui tautan berikut.</p>`,
      en: `<p>The Integrity Pact is a statement of commitment by all levels of PT Resona Indonesia Finance to carry out duties and responsibilities honestly, transparently, and free from conflicts of interest, corruption, collusion, and nepotism.</p>
<p>The Integrity Pact document can be viewed and downloaded via the link below.</p>`,
    },
    document: { url: "/documents/integrity-pact.pdf", mime: "application/pdf" },
  },

  "good-corporate-governance": {
    key: "good-corporate-governance",
    title: {
      id: "Tata Kelola Perusahaan yang Baik",
      en: "Good Corporate Governance",
    },
    body: {
      id: `<p>PT Resona Indonesia Finance menerapkan prinsip Tata Kelola Perusahaan yang Baik (Good Corporate Governance) sebagai landasan dalam menjalankan seluruh kegiatan usaha.</p>
<h2>Prinsip Tata Kelola</h2>
<ul>
<li><strong>Transparansi</strong> — keterbukaan dalam proses pengambilan keputusan dan penyampaian informasi material.</li>
<li><strong>Akuntabilitas</strong> — kejelasan fungsi dan pertanggungjawaban organ Perusahaan.</li>
<li><strong>Pertanggungjawaban</strong> — kesesuaian pengelolaan Perusahaan dengan peraturan perundang-undangan.</li>
<li><strong>Independensi</strong> — pengelolaan secara profesional tanpa benturan kepentingan.</li>
<li><strong>Kewajaran</strong> — keadilan dalam memenuhi hak pemangku kepentingan.</li>
</ul>
<h2>Struktur Tata Kelola</h2>
<p>Struktur tata kelola Perusahaan terdiri dari Rapat Umum Pemegang Saham, Dewan Komisaris, dan Direksi, yang didukung oleh fungsi Audit Internal, Manajemen Risiko, dan Kepatuhan.</p>
<p>Laporan Pelaksanaan Tata Kelola Perusahaan yang Baik dapat diunduh melalui tautan berikut.</p>`,
      en: `<p>PT Resona Indonesia Finance applies the principles of Good Corporate Governance as the foundation for conducting all its business activities.</p>
<h2>Governance Principles</h2>
<ul>
<li><strong>Transparency</strong> — openness in decision-making and the disclosure of material information.</li>
<li><strong>Accountability</strong> — clarity of function and accountability of the Company's organs.</li>
<li><strong>Responsibility</strong> — compliance of the Company's management with laws and regulations.</li>
<li><strong>Independence</strong> — professional management free from conflicts of interest.</li>
<li><strong>Fairness</strong> — equity in fulfilling stakeholders' rights.</li>
</ul>
<h2>Governance Structure</h2>
<p>The Company's governance structure comprises the General Meeting of Shareholders, the Board of Commissioners, and the Board of Directors, supported by the Internal Audit, Risk Management, and Compliance functions.</p>
<p>The Good Corporate Governance Implementation Report can be downloaded via the link below.</p>`,
    },
    document: { url: "/documents/gcg-report.pdf", mime: "application/pdf" },
  },

  "aml-cft": {
    key: "aml-cft",
    title: {
      id: "Pernyataan Kebijakan APU-PPT",
      en: "AML-CFT Policy Statement",
    },
    body: {
      id: `<p>PT Resona Indonesia Finance berkomitmen penuh untuk menerapkan program Anti Pencucian Uang dan Pencegahan Pendanaan Terorisme (APU-PPT) sesuai dengan peraturan Otoritas Jasa Keuangan dan ketentuan perundang-undangan yang berlaku.</p>
<h2>Komitmen Perusahaan</h2>
<ul>
<li>Menerapkan prinsip mengenali pengguna jasa (Customer Due Diligence) secara konsisten;</li>
<li>Melakukan pemantauan dan pengkinian data nasabah secara berkala;</li>
<li>Melaporkan transaksi keuangan mencurigakan kepada PPATK sesuai ketentuan;</li>
<li>Menyelenggarakan pelatihan APU-PPT secara berkelanjutan bagi seluruh karyawan;</li>
<li>Menunjuk pejabat yang bertanggung jawab atas penerapan program APU-PPT.</li>
</ul>
<p>Pernyataan kebijakan lengkap dapat diunduh melalui tautan berikut.</p>`,
      en: `<p>PT Resona Indonesia Finance is fully committed to implementing the Anti-Money Laundering and Countering the Financing of Terrorism (AML-CFT) programme in accordance with the regulations of the Financial Services Authority and applicable laws.</p>
<h2>Company Commitment</h2>
<ul>
<li>Consistently applying Customer Due Diligence principles;</li>
<li>Conducting periodic monitoring and updating of customer data;</li>
<li>Reporting suspicious financial transactions to PPATK in accordance with regulations;</li>
<li>Providing continuous AML-CFT training for all employees;</li>
<li>Appointing officials responsible for implementing the AML-CFT programme.</li>
</ul>
<p>The full policy statement can be downloaded via the link below.</p>`,
    },
    document: { url: "/documents/aml-cft-policy.pdf", mime: "application/pdf" },
  },

  "business-strategy": {
    key: "business-strategy",
    title: {
      id: "Strategi Bisnis dan Rencana Masa Depan",
      en: "Business Strategy and Future Plan",
    },
    body: {
      id: `<h2>Strategi Bisnis</h2>
<p>PT Resona Indonesia Finance memfokuskan strategi bisnisnya pada penguatan portofolio pembiayaan yang sehat, dengan menyasar segmen korporasi — khususnya perusahaan Jepang dan mitra usaha yang beroperasi di Indonesia.</p>
<ul>
<li>Memperkuat kualitas aset melalui penerapan manajemen risiko yang prudent;</li>
<li>Mengoptimalkan sinergi dengan Bank Resona Perdania dan Resona Group;</li>
<li>Meningkatkan efisiensi operasional melalui digitalisasi proses bisnis;</li>
<li>Mengembangkan kompetensi sumber daya manusia secara berkelanjutan.</li>
</ul>
<h2>Rencana Masa Depan</h2>
<p>Perusahaan akan terus mengembangkan produk pembiayaan yang relevan dengan kebutuhan nasabah, sekaligus memperkuat penerapan aspek keberlanjutan (ESG) dalam pengambilan keputusan bisnis.</p>`,
      en: `<h2>Business Strategy</h2>
<p>PT Resona Indonesia Finance focuses its business strategy on strengthening a sound financing portfolio, targeting the corporate segment — particularly Japanese companies and business partners operating in Indonesia.</p>
<ul>
<li>Strengthening asset quality through prudent risk management;</li>
<li>Optimising synergy with Bank Resona Perdania and the Resona Group;</li>
<li>Improving operational efficiency through business process digitalisation;</li>
<li>Developing human resource competencies on a continuous basis.</li>
</ul>
<h2>Future Plan</h2>
<p>The Company will continue to develop financing products relevant to customer needs, while strengthening the application of sustainability (ESG) considerations in business decision-making.</p>`,
    },
  },
};

export function getStaticPage(key: string) {
  return staticPages[key] ?? null;
}
