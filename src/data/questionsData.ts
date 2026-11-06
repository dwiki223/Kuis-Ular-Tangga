import { AvatarOption, BoardTile, ChanceCard, LadderConnection, Question, SnakeConnection } from '../types/game';

export const AVATAR_OPTIONS: AvatarOption[] = [
  {
    id: 'pena',
    name: 'Pena Sakti',
    role: 'Penyusun Slogan & Diksi',
    color: '#0284c7', // Sky Blue
    bgClass: 'bg-sky-500',
    borderClass: 'border-sky-400',
    textClass: 'text-sky-400',
    badgeClass: 'bg-sky-950 text-sky-300 border-sky-800',
    icon: 'Feather',
    bio: 'Pakar memilih kata-kata puitis berima dan kalimat persuasif yang menyentuh hati.'
  },
  {
    id: 'kuas',
    name: 'Kuas Emas',
    role: 'Desainer Visual Poster',
    color: '#f97316', // Orange
    bgClass: 'bg-orange-500',
    borderClass: 'border-orange-400',
    textClass: 'text-orange-400',
    badgeClass: 'bg-orange-950 text-orange-300 border-orange-800',
    icon: 'Palette',
    bio: 'Ahli tata letak, perpaduan warna mencolok, dan proporsi gambar di ruang publik.'
  },
  {
    id: 'megafon',
    name: 'Megafon Sakti',
    role: 'Komunikator Iklan Niaga',
    color: '#ef4444', // Red
    bgClass: 'bg-red-500',
    borderClass: 'border-red-400',
    textClass: 'text-red-400',
    badgeClass: 'bg-red-950 text-red-300 border-red-800',
    icon: 'Megaphone',
    bio: 'Menguasai daya bujuk komersial, struktur orientasi produk, dan kalimat ajakan imperatif.'
  },
  {
    id: 'detektif',
    name: 'Detektif Bahasa',
    role: 'Pemeriksa Fakta vs Opini',
    color: '#8b5cf6', // Violet
    bgClass: 'bg-violet-500',
    borderClass: 'border-violet-400',
    textClass: 'text-violet-400',
    badgeClass: 'bg-violet-950 text-violet-300 border-violet-800',
    icon: 'Search',
    bio: 'Kritis meneliti klaim iklan, memilah bukti ilmiah autentik dari klaim manis penjual.'
  },
  {
    id: 'kamera',
    name: 'Kamera Lensa',
    role: 'Kreator Layanan Masyarakat',
    color: '#10b981', // Emerald
    bgClass: 'bg-emerald-500',
    borderClass: 'border-emerald-400',
    textClass: 'text-emerald-400',
    badgeClass: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    icon: 'Camera',
    bio: 'Fokus pada kampanye sosial, penyelamatan lingkungan, dan literasi digital generasi muda.'
  },
  {
    id: 'buku',
    name: 'Buku Cendekia',
    role: 'Penjaga Kaidah Kebahasaan',
    color: '#eab308', // Amber
    bgClass: 'bg-amber-500',
    borderClass: 'border-amber-400',
    textClass: 'text-amber-400',
    badgeClass: 'bg-amber-950 text-amber-300 border-amber-800',
    icon: 'BookOpen',
    bio: 'Menjaga tata bahasa baku, kehematan kata, dan mencegah kalimat rancu serta typo.'
  }
];

export const LADDERS: LadderConnection[] = [
  { id: 'ladder-1', from: 4, to: 14, name: 'Tangga Diksi Berima', color: '#10b981' },
  { id: 'ladder-2', from: 9, to: 20, name: 'Tangga Poster Persuasif', color: '#0ea5e9' },
  { id: 'ladder-3', from: 15, to: 26, name: 'Tangga Kaidah Imperatif', color: '#f59e0b' },
  { id: 'ladder-4', from: 21, to: 29, name: 'Tangga Prestasi Emas', color: '#eab308' },
];

export const SNAKES: SnakeConnection[] = [
  { id: 'snake-1', from: 12, to: 5, name: 'Ular Kalimat Rancu', color: '#ef4444' },
  { id: 'snake-2', from: 17, to: 7, name: 'Ular Typo & Ejaan', color: '#f97316' },
  { id: 'snake-3', from: 23, to: 11, name: 'Ular Klaim Menipu', color: '#ec4899' },
  { id: 'snake-4', from: 28, to: 16, name: 'Ular Plagiasi Iklan', color: '#dc2626' },
];

export const BOARD_TILES: BoardTile[] = [
  { index: 1, type: 'START', title: 'Gerbang Literasi', description: 'Titik awal perjalanan petualangan Ular Tangga bahasa Indonesia.' },
  { index: 2, type: 'IKLAN', title: 'Unsur Teks Iklan', description: 'Uji pengetahuan unsur gambar, kata-kata, gerak, dan suara.' },
  { index: 3, type: 'SLOGAN', title: 'Slogan Motivasi', description: 'Semboyan belajar dan visi generasi cerdas berakhlak.' },
  { index: 4, type: 'LADDER', title: 'Tangga Diksi Berima', description: 'Tangga prestasi! Melompat naik ke Petak #14.', ladderTo: 14 },
  { index: 5, type: 'FAKTA_OPINI', title: 'Ekor Ular / Uji Fakta', description: 'Ekor Ular 1. Uji ketelitian data konkret vs klaim subjektif.' },
  { index: 6, type: 'CHANCE', title: 'Peluang Kreatif', description: 'Ambil kartu misteri dan raih kejutan langkah atau poin!' },
  { index: 7, type: 'POSTER', title: 'Ekor Ular / Tata Letak', description: 'Ekor Ular 2. Kuis prinsip visual dan keterbacaan poster.' },
  { index: 8, type: 'IKLAN', title: 'Iklan Layanan Masyarakat', description: 'Pesan sosial demi kebaikan bersama dan edukasi publik.' },
  { index: 9, type: 'LADDER', title: 'Tangga Poster Kreatif', description: 'Desain postermu luar biasa! Memanjat tangga ke Petak #20.', ladderTo: 20 },
  { index: 10, type: 'DUEL', title: 'Arena Duel Cepat', description: 'Adu kecerdasan bahasa 2 pemain berebut 200 poin!' },
  { index: 11, type: 'VISUAL_CASE', title: 'Studi Kasus: Poster Laut', description: 'Analisis visual poster kampanye penyelamatan laut.' },
  { index: 12, type: 'SNAKE', title: 'Ular Kalimat Rancu', description: 'Awas kepala ular! Kalimat tidak baku, meluncur ke Petak #5.', snakeTo: 5, trapTo: 5 },
  { index: 13, type: 'IKLAN', title: 'Struktur Teks Iklan', description: 'Orientasi produk, tubuh iklan, dan rincian kontak.' },
  { index: 14, type: 'SLOGAN', title: 'Puncak Tangga / Slogan', description: 'Puncak tangga diksi. Semboyan pelestarian lingkungan.' },
  { index: 15, type: 'LADDER', title: 'Tangga Kaidah Bahasa', description: 'Kaidah imperatifmu tepat! Memanjat tangga ke Petak #26.', ladderTo: 26 },
  { index: 16, type: 'FAKTA_OPINI', title: 'Ekor Ular / Data Lab', description: 'Ekor Ular 4. Memilah izin edar BPOM dari rayuan iklan.' },
  { index: 17, type: 'SNAKE', title: 'Ular Typo & Ejaan', description: 'Awas kepala ular! Typo fatal, meluncur turun ke Petak #7.', snakeTo: 7, trapTo: 7 },
  { index: 18, type: 'VISUAL_CASE', title: 'Studi Kasus: Perpustakaan', description: 'Analisis visual iklan layanan literasi digital.' },
  { index: 19, type: 'CHANCE', title: 'Peluang Emas', description: 'Kartu kejutan literasi menanti langkahmu!' },
  { index: 20, type: 'POSTER', title: 'Puncak Tangga / Ruang Publik', description: 'Puncak tangga poster. Lokasi strategis penempelan poster.' },
  { index: 21, type: 'LADDER', title: 'Tangga Prestasi Emas', description: 'Tangga emas dekat finis! Melesat naik ke Petak #29.', ladderTo: 29 },
  { index: 22, type: 'IKLAN', title: 'Kaidah Imperatif', description: 'Kata seruan dan ajakan yang membakar minat konsumen.' },
  { index: 23, type: 'SNAKE', title: 'Ular Klaim Menipu', description: 'Awas kepala ular! Klaim opini palsu, meluncur ke Petak #11.', snakeTo: 11, trapTo: 11 },
  { index: 24, type: 'DUEL', title: 'Arena Duel Cepat', description: 'Tantangan rebutan poin antarpemain!' },
  { index: 25, type: 'SLOGAN', title: 'Slogan Kesehatan Remaja', description: 'Prinsip pola hidup sehat dan pencegahan penyakit.' },
  { index: 26, type: 'POSTER', title: 'Puncak Tangga / Tipografi', description: 'Puncak tangga kaidah. Ukuran font poster di ruang umum.' },
  { index: 27, type: 'FAKTA_OPINI', title: 'Klaim Superlatif', description: 'Hati-hati kata "terbaik", "termurah", dan "nomor satu"!' },
  { index: 28, type: 'SNAKE', title: 'Ular Plagiasi Iklan', description: 'Awas kepala ular raksasa! Menjiplak karya, terjatuh ke Petak #16.', snakeTo: 16, trapTo: 16 },
  { index: 29, type: 'CHANCE', title: 'Peluang Gerbang Juara', description: 'Puncak tangga prestasi. 1 langkah lagi menuju kemenangan!' },
  { index: 30, type: 'FINISH', title: 'Panggung Juara Bahasa', description: 'Garis finis puncak Ular Tangga! Juara Komunikator Bahasa Indonesia!' }
];

export const CHANCE_CARDS: ChanceCard[] = [
  {
    id: 'c1',
    title: 'Slogan Viral di Media Sosial',
    description: 'Slogan kampanye kebersihanmu dipakai serentak oleh seluruh siswa sekolah! Langkah maju 3 petak.',
    effectType: 'STEP_FORWARD',
    value: 3,
    icon: 'Sparkles'
  },
  {
    id: 'c2',
    title: 'Koreksi Typo dari Guru Bahasa',
    description: 'Terdapat kesalahan ejaan huruf kapital pada poster. Perbaiki dan mundur 1 petak.',
    effectType: 'STEP_BACK',
    value: 1,
    icon: 'AlertTriangle'
  },
  {
    id: 'c3',
    title: 'Juara 1 Lomba Poster Nasional',
    description: 'Desain postermu menggugah dewan juri dengan pesan lingkungan yang memikat! Dapatkan 200 Poin Bonus.',
    effectType: 'BONUS_POINTS',
    value: 200,
    icon: 'Trophy'
  },
  {
    id: 'c4',
    title: 'Perisai Kritis Anti-Hoaks',
    description: 'Kamu berhasil mendeteksi iklan palsu. Dapatkan perisai pelindung yang mencegah pengurangan poin pada kesalahan berikutnya!',
    effectType: 'SHIELD',
    value: 1,
    icon: 'ShieldCheck'
  },
  {
    id: 'c5',
    title: 'Megafon Tambahan!',
    description: 'Suara promosi kegiatan OSIS sangat membahana. Kamu berhak melempar dadu satu kali lagi!',
    effectType: 'EXTRA_TURN',
    value: 1,
    icon: 'Flame'
  },
  {
    id: 'c6',
    title: 'Diksi Kurang Padat',
    description: 'Sloganmu terlalu panjang seperti paragraf berita. Harus diedit agar lebih ringkas, mundur 2 petak.',
    effectType: 'STEP_BACK',
    value: 2,
    icon: 'RotateCcw'
  },
  {
    id: 'c7',
    title: 'Iklan Layanan Masyarakat Sukses',
    description: 'Warga desa antusias memilah sampah berkat iklan videomu. Melangkah maju 2 petak!',
    effectType: 'STEP_FORWARD',
    value: 2,
    icon: 'ArrowUpRight'
  },
  {
    id: 'c8',
    title: 'Kuis Dadakan Guru Berhasil',
    description: 'Kamu mampu menjelaskan perbedaan iklan, slogan, dan poster secara sempurna di depan kelas! +150 Poin.',
    effectType: 'BONUS_POINTS',
    value: 150,
    icon: 'CheckCircle'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // --- IKLAN ---
  {
    id: 'iklan-01',
    category: 'IKLAN',
    difficulty: 'MUDAH',
    prompt: 'Manakah unsur pembeda utama teks iklan dibandingkan slogan dan poster?',
    options: [
      'Hanya mengandalkan gambar tanpa ada tulisan sepatah kata pun',
      'Dapat memadukan unsur gambar, kata-kata, gerak, dan suara secara lengkap',
      'Hanya boleh dipasang pada kertas karton di dinding sekolah',
      'Selalu ditulis dalam bentuk puisi berbait-bait'
    ],
    correctAnswerIndex: 1,
    explanation: 'Iklan merupakan media komunikasi yang paling fleksibel karena dapat memadukan unsur gambar, teks, gerak, dan suara (khususnya pada media elektronik seperti televisi, radio, dan video internet).',
    curriculumRef: 'KD 3.3 / Kurikulum Merdeka: Ciri & Unsur Teks Iklan'
  },
  {
    id: 'iklan-02',
    category: 'IKLAN',
    difficulty: 'SEDANG',
    prompt: 'Sebuah iklan berbunyi: "Satu Nusa, Satu Bangsa, Tolak Narkoba Demi Generasi Emas!". Iklan ini termasuk ke dalam jenis iklan...',
    options: [
      'Iklan Niaga / Komersial',
      'Iklan Layanan Masyarakat (Nonkomersial)',
      'Iklan Permintaan Tenaga Kerja',
      'Iklan Penawaran Saham'
    ],
    correctAnswerIndex: 1,
    explanation: 'Iklan layanan masyarakat bertujuan mengajak khalayak peduli pada isu sosial, kesehatan, atau moral demi kepentingan umum tanpa mencari keuntungan materi (nonkomersial).',
    curriculumRef: 'Buku Bahasa Indonesia Kelas 8: Jenis-Jenis Teks Iklan'
  },
  {
    id: 'iklan-03',
    category: 'IKLAN',
    difficulty: 'SEDANG',
    prompt: 'Struktur teks iklan yang benar dan berurutan umumnya terdiri dari...',
    options: [
      'Orientasi (Judul Produk), Tubuh Iklan (Deskripsi Keunggulan), dan Justifikasi (Rincian Kontak/Penegasan)',
      'Tesis, Rangkaian Argumen, dan Penegasan Ulang',
      'Pernyataan Umum, Deretan Penjelas, dan Interpretasi',
      'Orientasi, Komplikasi, Resolusi, dan Koda'
    ],
    correctAnswerIndex: 0,
    explanation: 'Struktur baku teks iklan terdiri atas: (1) Judul/Orientasi pengenalan produk, (2) Tubuh iklan yang menguraikan keunggulan, serta (3) Justifikasi berupa informasi tempat pembelian atau legalitas.',
    curriculumRef: 'Struktur Teks Iklan SMP Kelas 8'
  },
  {
    id: 'iklan-04',
    category: 'IKLAN',
    difficulty: 'MUDAH',
    prompt: 'Kalimat berikut yang mencerminkan kaidah kebahasaan imperatif dalam iklan adalah...',
    options: [
      'Sepatu ini terbuat dari bahan kanvas pilihan.',
      'Segera pesan sekarang juga sebelum kehabisan!',
      'Udara pagi di lereng gunung terasa sangat sejuk.',
      'Kemarin saya membeli minuman rasa stroberi.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kalimat imperatif adalah kalimat yang berisi perintah, ajakan, atau desakan. Kata "Segera pesan sekarang juga!" merupakan bentuk imperatif persuasif.',
    curriculumRef: 'Kaidah Kebahasaan Teks Iklan Kelas 8'
  },
  {
    id: 'iklan-05',
    category: 'IKLAN',
    difficulty: 'SULIT',
    prompt: 'Mengapa teks iklan komersial harus dirancang dengan bahasa yang berdaya sugesti kuat?',
    options: [
      'Agar konsumen merasa dipaksa dan tidak memiliki pilihan lain',
      'Agar mampu mempengaruhi alam bawah sadar pembaca sehingga tertarik membeli produk',
      'Supaya pembaca bingung membedakan antara harga asli dan harga diskon',
      'Untuk memenuhi kuota kata minimum di media cetak'
    ],
    correctAnswerIndex: 1,
    explanation: 'Daya sugesti (daya bujuk) berfungsi membangkitkan rasa butuh dan keyakinan emosional pada konsumen sehingga mereka terdorong secara sukarela mengambil tindakan membeli.',
    curriculumRef: 'Fungsi Persuasif Teks Iklan'
  },

  // --- SLOGAN ---
  {
    id: 'slogan-01',
    category: 'SLOGAN',
    difficulty: 'MUDAH',
    prompt: 'Karakteristik utama dari slogan yang membedakannya dari teks lainnya adalah...',
    options: [
      'Memiliki rincian tabel harga dan nomor telepon toko',
      'Mengutamakan kepadatan kalimat pendek, mencolok, berima, dan mudah diingat',
      'Wajib dicetak di atas kertas kalkir berukuran A0',
      'Harus ditayangkan dengan latar musik berdurasi 3 menit'
    ],
    correctAnswerIndex: 1,
    explanation: 'Slogan mengutamakan kehematan kata yang padat makna, berima (puitis), dan memiliki daya lekat tinggi di ingatan pembaca sebagai semboyan hidup atau visi.',
    curriculumRef: 'Karakteristik Teks Slogan Kelas 8'
  },
  {
    id: 'slogan-02',
    category: 'SLOGAN',
    difficulty: 'MUDAH',
    prompt: 'Perhatikan slogan: "Buku adalah Jendela Dunia". Makna tersirat dari slogan pendidikan tersebut adalah...',
    options: [
      'Setiap jendela rumah harus dipasangi rak buku besar',
      'Dengan rajin membaca buku, kita dapat melihat dan memahami wawasan dunia yang luas',
      'Harga buku saat ini setara dengan harga kaca jendela bangunan',
      'Membaca buku sebaiknya dilakukan tepat di samping jendela terbuka'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kiasan "Jendela Dunia" menggambarkan bahwa buku membuka cakrawala pemikiran pembaca untuk menjelajahi segala ilmu pengetahuan di penjuru dunia.',
    curriculumRef: 'Analisis Makna Kias Slogan Kelas 8'
  },
  {
    id: 'slogan-03',
    category: 'SLOGAN',
    difficulty: 'SEDANG',
    prompt: 'Manakah slogan yang memiliki rima akhir bersuara selaras (puitis)?',
    options: [
      'Hutan Lestari, Bumi Berseri',
      'Jangan membuang sampah di saluran air warga',
      'Mobil ini memiliki empat buah roda dan mesin bertenaga',
      'Mari belajar setiap hari demi masa depan yang teratur'
    ],
    correctAnswerIndex: 0,
    explanation: '"Hutan Lestari, Bumi Berseri" memiliki keselarasan rima akhir bunyi "-ri" yang puitis dan enak dilafalkan, salah satu ciri khas slogan efektif.',
    curriculumRef: 'Unsur Kebahasaan Slogan Berima'
  },
  {
    id: 'slogan-04',
    category: 'SLOGAN',
    difficulty: 'SEDANG',
    prompt: 'Manakah slogan yang paling tepat untuk mengampanyekan kepedulian terhadap kesehatan remaja?',
    options: [
      'Makan Enak, Dompet Cepat Kosong',
      'Tubuh Bugar, Jiwa Tegar, Belajar Makin Pintar!',
      'Gunakan Sepeda Motor Setiap Saat Agar Tidak Lelah',
      'Tidur Seharian Adalah Kunci Ketenangan Hidup'
    ],
    correctAnswerIndex: 1,
    explanation: '"Tubuh Bugar, Jiwa Tegar, Belajar Makin Pintar!" memadukan pesan gizi/olahraga dengan semangat belajar remaja secara berima dan menggugah.',
    curriculumRef: 'Penyusunan Slogan Sesuai Konteks'
  },
  {
    id: 'slogan-05',
    category: 'SLOGAN',
    difficulty: 'SULIT',
    prompt: 'Sebuah organisasi sekolah memiliki prinsip: "Mengutamakan persatuan, saling menghormati keberagaman". Slogan yang paling ringkas dan tepat adalah...',
    options: [
      'Organisasi kami berdiri sejak tahun dua ribu dua puluh empat dan menghargai semua orang.',
      'Berbeda Namun Satu, Bersatu Kita Maju!',
      'Silakan datang ke rapat jika kamu tidak sedang sibuk di rumah.',
      'Saling menghormati adalah tugas mulia seluruh rakyat Indonesia di masa depan.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Slogan harus ringkas, lugas, dan memiliki daya gedor semboyan. "Berbeda Namun Satu, Bersatu Kita Maju!" merangkum nilai persatuan dalam 6 kata berima.',
    curriculumRef: 'Kreativitas Penulisan Slogan'
  },

  // --- POSTER ---
  {
    id: 'poster-01',
    category: 'POSTER',
    difficulty: 'MUDAH',
    prompt: 'Fokus utama yang paling ditekankan dalam media poster adalah...',
    options: [
      'Cerita dialog panjang antar-karakter tokoh',
      'Kekuatan visual/gambar yang mencolok dipadu teks ringkas yang terbaca dari kejauhan',
      'Efek suara bas yang menggelegar di ruang tertutup',
      'Halaman daftar isi dan bab pembuka yang tebal'
    ],
    correctAnswerIndex: 1,
    explanation: 'Poster dirancang untuk dipasang di dinding atau tempat umum, sehingga kekuatan visual (gambar, ilustrasi, warna kontras) dan teks ringkas menjadi elemen vital.',
    curriculumRef: 'Karakteristik Teks Poster Kelas 8'
  },
  {
    id: 'poster-02',
    category: 'POSTER',
    difficulty: 'SEDANG',
    prompt: 'Berikut ini adalah syarat penempatan poster yang efektif, KECUALI...',
    options: [
      'Dipasang di persimpangan jalan atau area dengan arus lalu lintas orang yang padat',
      'Diletakkan pada ketinggian yang sejajar dengan pandangan mata rata-rata',
      'Ditempel di lorong gelap yang jarang dilewati orang agar tidak cepat kotor',
      'Dipasang di dinding papan pengumuman sekolah yang terang dan bersih'
    ],
    correctAnswerIndex: 2,
    explanation: 'Poster harus diletakkan di tempat strategis yang ramai dilalui orang (publik) dengan pencahayaan cukup agar pesan dapat tersampaikan ke sebanyak mungkin khalayak.',
    curriculumRef: 'Kriteria Penempatan Poster di Tempat Umum'
  },
  {
    id: 'poster-03',
    category: 'POSTER',
    difficulty: 'SEDANG',
    prompt: 'Dalam merancang poster, mengapa penggunaan jenis huruf (font) yang berlebihan atau terlalu rumit harus dihindari?',
    options: [
      'Karena huruf rumit memakan tinta printer lebih banyak',
      'Karena pembaca yang lewat sepintas akan kesulitan membaca pesan dalam hitungan detik',
      'Karena hanya huruf kursif yang diakui oleh Kementerian Pendidikan',
      'Agar poster terlihat mirip dengan lembar koran harian'
    ],
    correctAnswerIndex: 1,
    explanation: 'Orang hanya memiliki waktu beberapa detik saat melintasi poster. Huruf harus tegas, mudah terbaca dari jarak beberapa meter, dan tidak membingungkan mata.',
    curriculumRef: 'Desain Komunikasi Visual Poster'
  },
  {
    id: 'poster-04',
    category: 'POSTER',
    difficulty: 'SULIT',
    prompt: 'Perhatikan kalimat poster berikut: "Satu Tetes Darahmu, Selamatkan Sejuta Senyum Harapan!". Kalimat ini menggunakan majas...',
    options: [
      'Litotes (merendahkan diri)',
      'Hiperbola (melebih-lebihkan untuk memberi penekanan emosional)',
      'Pleonasme (mengulang kata secara mubazir)',
      'Ironi (menyindir secara halus)'
    ],
    correctAnswerIndex: 1,
    explanation: '"Sejuta senyum harapan" merupakan majas hiperbola yang digunakan secara sengaja untuk memberikan efek gugahan kemanusiaan yang mendalam bagi calon pendonor darah.',
    curriculumRef: 'Gaya Bahasa (Majas) dalam Teks Poster'
  },

  // --- FAKTA VS OPINI ---
  {
    id: 'fo-01',
    category: 'FAKTA_OPINI',
    difficulty: 'MUDAH',
    prompt: 'Manakah kalimat berikut dalam teks iklan yang merupakan FAKTA?',
    options: [
      'Roti terenak yang bikin lidah bergoyang tanpa henti.',
      'Diproduksi dengan bahan baku 100% gandum utuh organik.',
      'Pilihan paling sempurna untuk sarapan pagi keluarga cerdas.',
      'Sensasi kelembutannya tidak tertandingi oleh roti mana pun.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kandungan bahan "100% gandum utuh organik" merupakan data bahan baku konkret yang dapat diuji di laboratorium (objektif/fakta), sedangkan kata "terenak" dan "paling sempurna" adalah opini subjektif.',
    curriculumRef: 'Membedakan Fakta dan Opini dalam Iklan'
  },
  {
    id: 'fo-02',
    category: 'FAKTA_OPINI',
    difficulty: 'SEDANG',
    prompt: 'Ciri utama kalimat OPINI dalam sebuah penawaran iklan adalah...',
    options: [
      'Menyebutkan tanggal kadaluwarsa dan nomor pendaftaran BPOM',
      'Menggunakan kata-kata sifat superlatif yang tidak memiliki tolok ukur pasti (contoh: terunggul, paling disukai)',
      'Memuat alamat lengkap pabrik dan nomor layanan pelanggan resmi',
      'Menyajikan hasil uji laboratorium independen terakreditasi'
    ],
    correctAnswerIndex: 1,
    explanation: 'Opini memuat penilaian pribadi atau bujukan menggunakan kata superlatif ("terbaik", "paling laris") yang bersifat relatif dan bergantung pada selera masing-masing orang.',
    curriculumRef: 'Ciri Kebahasaan Fakta dan Opini Kelas 8'
  },
  {
    id: 'fo-03',
    category: 'FAKTA_OPINI',
    difficulty: 'SEDANG',
    prompt: 'Perhatikan teks iklan: "(1) Susu Segar Murni mengandung 400 mg kalsium per sajian. (2) Menjadikan harimu penuh semangat tiada tara. (3) Telah teruji klinis oleh laboratorium pangan nasional. (4) Merupakan susu terbaik di jagat raya." Kalimat yang berupa OPINI adalah nomor...',
    options: [
      '(1) dan (3)',
      '(2) dan (4)',
      '(1) dan (2)',
      '(3) dan (4)'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kalimat (2) "penuh semangat tiada tara" dan (4) "terbaik di jagat raya" adalah pernyataan opini/perasaan subjektif, sementara (1) dan (3) memuat angka kalsium dan pengujian klinis yang nyata (fakta).',
    curriculumRef: 'Analisis Soal Asesmen Kompetensi Minimum (AKM) Bahasa Indonesia'
  },
  {
    id: 'fo-04',
    category: 'FAKTA_OPINI',
    difficulty: 'SULIT',
    prompt: 'Mengapa produsen iklan tetap menyisipkan kalimat opini di samping kalimat fakta?',
    options: [
      'Karena peraturan pemerintah melarang iklan hanya berisi fakta semata',
      'Karena kalimat opini berfungsi membangun citra emosional positif dan membujuk daya tarik pembeli',
      'Agar konsumen tidak dapat menuntut bila produk mengalami kerusakan',
      'Untuk menghemat biaya cetak brosur promosi'
    ],
    correctAnswerIndex: 1,
    explanation: 'Fakta memberikan landasan kepercayaan (kredibilitas), sedangkan opini memberikan sentuhan persuasif dan citra emosional agar konsumen terpikat untuk membeli.',
    curriculumRef: 'Fungsi Retorika Persuasi dalam Iklan Niaga'
  },

  // --- VISUAL CASES (Menggunakan gambar yang digenerate) ---
  {
    id: 'vc-01',
    category: 'VISUAL_CASE',
    difficulty: 'SEDANG',
    prompt: 'Perhatikan gambar poster berikut! Apakah pesan imperatif dan tujuan utama yang disampaikan oleh poster tersebut?',
    image: '/src/assets/images/poster_sampah_laut_1793933435285.jpg',
    options: [
      'Mengajak masyarakat berbelanja penyu di pasar hewan',
      'Mengajak menjaga kebersihan pantai, tidak membuang sampah sembarangan, dan melestarikan ekosistem laut',
      'Mempromosikan penjualan perahu nelayan modern',
      'Mengiklankan tempat wisata resort pantai bintang lima'
    ],
    correctAnswerIndex: 1,
    explanation: 'Poster tersebut secara gamblang menampilkan ilustrasi penyu laut, anak-anak membersihkan pantai, tempat sampah organik/anorganik, serta slogan "Selamatkan Laut Kita - Bersama Kita Bisa!".',
    curriculumRef: 'Analisis Teks Poster Visual Kelas 8'
  },
  {
    id: 'vc-02',
    category: 'VISUAL_CASE',
    difficulty: 'SEDANG',
    prompt: 'Berdasarkan poster penyelamatan laut di atas, manakah unsur slogan berima yang tercantum?',
    image: '/src/assets/images/poster_sampah_laut_1793933435285.jpg',
    options: [
      '"Selamatkan Laut Kita"',
      '"Bersama Kita Bisa!"',
      '"Dilarang Berenang Saat Ombak Pasang"',
      '"Diskon Tiket Masuk Pantai 50%"'
    ],
    correctAnswerIndex: 1,
    explanation: 'Semboyan "Bersama Kita Bisa!" merupakan bentuk slogan ajakan aksi kolektif yang singkat, tegas, dan memberi energi positif pada audiens.',
    curriculumRef: 'Analisis Unsur Bahasa dalam Poster Grafis'
  },
  {
    id: 'vc-03',
    category: 'VISUAL_CASE',
    difficulty: 'SEDANG',
    prompt: 'Perhatikan media iklan layanan masyarakat di perpustakaan berikut! Kalimat "Cerdas Digital! Baca, Pelajari, Berbagi" tergolong ke dalam unsur...',
    image: '/src/assets/images/iklan_layanan_masyarakat_1793933434558.jpg',
    options: [
      'Slogan motivasi literasi yang memuat rangkaian tindakan imperatif berurutan',
      'Daftar pustaka dari buku ensiklopedia',
      'Harga sewa laptop per jam di perpustakaan',
      'Surat izin izin mendirikan gedung perpustakaan'
    ],
    correctAnswerIndex: 0,
    explanation: '"Cerdas Digital! Baca, Pelajari, Berbagi" adalah slogan edukasi yang memadukan semboyan dengan tiga kata kerja ajakan (imperatif) yang ringkas dan mudah diingat.',
    curriculumRef: 'Integrasi Slogan dalam Iklan Layanan Masyarakat'
  },
  {
    id: 'vc-04',
    category: 'VISUAL_CASE',
    difficulty: 'MUDAH',
    prompt: 'Berdasarkan gambar iklan perpustakaan digital di atas, siapa sasaran khalayak (target pembaca) yang paling utama?',
    image: '/src/assets/images/iklan_layanan_masyarakat_1793933434558.jpg',
    options: [
      'Anak balita yang belum lancar membaca',
      'Para pelajar, siswa sekolah, dan generasi muda penuntut ilmu',
      'Petani kelapa sawit di pedalaman hutan',
      'Pengemudi truk antarkota antarprovinsi'
    ],
    correctAnswerIndex: 1,
    explanation: 'Visual menampilkan siswa berseragam sekolah SMP/SMA yang sedang belajar bersama dengan buku dan laptop, menandakan sasaran utamanya adalah pelajar dan generasi muda.',
    curriculumRef: 'Analisis Konteks Sasaran Khalayak Teks Iklan'
  },

  // --- SOAL LANJUTAN ---
  {
    id: 'iklan-06',
    category: 'IKLAN',
    difficulty: 'MUDAH',
    prompt: 'Iklan yang dipasang di surat kabar atau koran yang hanya terdiri atas beberapa baris teks singkatan tanpa gambar disebut...',
    options: [
      'Iklan Kolom',
      'Iklan Baris',
      'Iklan Advertorial',
      'Iklan Display'
    ],
    correctAnswerIndex: 1,
    explanation: 'Iklan baris adalah iklan cetak berukuran kecil yang hanya memuat beberapa baris tulisan singkat dengan kata-kata singkatan (misal: "BU", "Dijual Cpt", "Hub:") untuk menghemat biaya pemuatan.',
    curriculumRef: 'Bentuk-Bentuk Iklan Media Cetak'
  },
  {
    id: 'slogan-06',
    category: 'SLOGAN',
    difficulty: 'SEDANG',
    prompt: 'Perhatikan slogan: "Katakan TIDAK pada Narkoba!". Kalimat ini menggunakan bentuk ungkapan...',
    options: [
      'Penolakan tegas dan larangan untuk melindungi diri dari bahaya zat adiktif',
      'Pujian atas keberhasilan seseorang meraih juara kelas',
      'Pertanyaan yang tidak membutuhkan jawaban pasti',
      'Permohonan izin kepada orang tua saat bepergian'
    ],
    correctAnswerIndex: 0,
    explanation: 'Slogan tersebut mengandung pesan penolakan yang tegas (negasi imperatif) untuk menolak godaan narkoba secara mutlak demi masa depan yang sehat.',
    curriculumRef: 'Makna Kalimat Penolakan dalam Slogan'
  },
  {
    id: 'poster-05',
    category: 'POSTER',
    difficulty: 'SEDANG',
    prompt: 'Mengapa poster kampanye sosial sering memadukan warna kontras tinggi (misalnya kuning terang di atas latar biru dongker atau hitam)?',
    options: [
      'Agar cat poster cepat kering saat dicetak',
      'Agar tulisan dan objek memiliki daya tangkap mata yang kuat dan tidak membaur dengan latar belakang',
      'Karena peraturan daerah mewajibkan hanya menggunakan warna primer',
      'Untuk menakut-nakuti orang yang melihat poster tersebut'
    ],
    correctAnswerIndex: 1,
    explanation: 'Kontras warna tinggi memastikan keterbacaan (readability) yang optimal sehingga pesan penting dapat tertangkap mata secara instan dari kejauhan.',
    curriculumRef: 'Prinsip Desain Poster: Kontras & Visibilitas'
  },
  {
    id: 'fo-05',
    category: 'FAKTA_OPINI',
    difficulty: 'SULIT',
    prompt: 'Manakah dari pernyataan berikut yang merupakan kalimat OPINI yang menyamar seolah-olah FAKTA?',
    options: [
      'Sepeda motor ini berkapasitas mesin 150 cc dengan sistem injeksi.',
      'Berdasarkan riset kami, 99% orang pasti setuju bahwa ini adalah motor paling keren di jalanan.',
      'Garansi mesin resmi berlaku selama 3 tahun atau 30.000 km.',
      'Tersedia dalam 4 varian warna: hitam, merah, putih, dan biru.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Klaim "99% orang pasti setuju... paling keren" menggunakan angka semu untuk membungkus penilaian subjektif keindahan motor yang sebenarnya tidak bisa diukur mutlak (opini).',
    curriculumRef: 'Literasi Kritis: Membongkar Bias Opini dalam Iklan'
  }
];
