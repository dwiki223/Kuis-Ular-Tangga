/**
 * Ringkasan Materi Bahasa Indonesia Kelas 8:
 * Teks Iklan, Slogan, dan Poster (Kurikulum Merdeka & Kurtilas)
 */

export interface MatrixRow {
  media: string;
  gambar: boolean | string;
  kata: boolean | string;
  gerak: boolean | string;
  suara: boolean | string;
  fokusUtama: string;
}

export const CURRICULUM_MATRIX: MatrixRow[] = [
  {
    media: 'Teks Iklan',
    gambar: 'Ya (Visual menarik)',
    kata: 'Ya (Persuasif & informatif)',
    gerak: 'Ya (Pada media elektronik/digital)',
    suara: 'Ya (Pada media radio/TV/video)',
    fokusUtama: 'Mempromosikan produk barang, jasa, atau gagasan dengan kombinasi media paling lengkap.'
  },
  {
    media: 'Slogan',
    gambar: 'Tidak diutamakan',
    kata: 'Sangat Utama (Ringkas & berima)',
    gerak: 'Tidak',
    suara: 'Dapat diucapkan (Lisan/semboyan)',
    fokusUtama: 'Kekuatan kalimat pendek yang berkesan sebagai moto, visi, atau pedoman hidup.'
  },
  {
    media: 'Poster',
    gambar: 'Sangat Utama (Ilustrasi mencolok)',
    kata: 'Ya (Singkat & padat)',
    gerak: 'Tidak (Media cetak plakat)',
    suara: 'Tidak',
    fokusUtama: 'Daya tarik visual di tempat umum dengan ukuran plakat yang mudah dilihat dari kejauhan.'
  }
];

export const CURRICULUM_GUIDE = {
  babTitle: 'Bab II: Menemukan Pola dalam Iklan, Slogan, dan Poster',
  jenjang: 'Bahasa Indonesia SMP/MTs Kelas VIII',
  definisi: [
    {
      nama: 'Teks Iklan',
      arti: 'Pemberitahuan kepada khalayak mengenai barang atau jasa yang dijual, dipasang di media massa (cetak, elektronik, atau internet) untuk membujuk orang membeli atau menggunakan produk tersebut.',
      fungsi: 'Komersial (penjualan produk), Nonkomersial (layanan masyarakat, kampanye sosial), dan Pengumuman.',
      contoh: '"Pakai Sabun Wangi Herbal, Segar Sepanjang Hari! Kulit Sehat Alami Tanpa Iritasi."'
    },
    {
      nama: 'Slogan',
      arti: 'Perkataan atau kalimat pendek yang menarik, mencolok, dan mudah diingat untuk menjelaskan tujuan suatu ideologi, golongan, organisasi, atau partai politik, serta sering menjadi semboyan hidup.',
      fungsi: 'Membangkitkan semangat, menyampaikan visi, mengedukasi masyarakat dengan kalimat puitis berima.',
      contoh: '"Buku adalah Jendela Dunia", "Tiada Hari Tanpa Prestasi", "Bersih Pangkal Sehat".'
    },
    {
      nama: 'Poster',
      arti: 'Karya seni atau desain grafis yang memuat komposisi gambar dan huruf di atas kertas berukuran besar, diaplikasikan dengan cara ditempel di dinding atau tempat umum yang strategis.',
      fungsi: 'Menarik perhatian khalayak ramai dengan kombinasi warna kontras, ilustrasi kuat, dan teks seruan singkat.',
      contoh: '"Poster Hari Bumi: Lindungi Hutan, Selamatkan Masa Depan Bumi Kita! Ayo Tanam Satu Pohon Hari Ini!"'
    }
  ],
  kaidahKebahasaan: [
    {
      kaidah: 'Kalimat Persuasif',
      makna: 'Bersifat membujuk, merayu, atau meyakinkan pembaca agar tertarik dan bersedia mengikuti pesan yang disampaikan.',
      ciri: 'Menggunakan kata-kata positif yang menggugah selera atau keyakinan, seperti: "Dijamin puas", "Pilihan tepat keluarga Indonesia".'
    },
    {
      kaidah: 'Kalimat Imperatif',
      makna: 'Mengandung perintah, ajakan, larangan, atau dorongan untuk bertindak.',
      ciri: 'Ditandai kata ajakan (Ayo, Mari), perintah (Gunakanlah, Belilah), atau larangan (Jangan, Hindari).'
    },
    {
      kaidah: 'Berima & Puitis (Rima Kata)',
      makna: 'Memiliki keselarasan bunyi akhir suku kata yang indah didengar sehingga mudah melekat di ingatan.',
      ciri: 'Contoh: "Kecil menanam, tua memanen", "Belajar di waktu muda, bahagia di waktu tua".'
    },
    {
      kaidah: 'Ringkas & Berdaya Sugesti',
      makna: 'Menggunakan kalimat hemat tanpa kata mubazir, namun mampu meninggalkan kesan psikologis yang mendalam.',
      ciri: 'Tidak bertele-tele, langsung menembus benak audiens.'
    }
  ],
  faktaDanOpini: {
    penjelasan: 'Di dalam teks iklan niaga, penting bagi siswa kelas 8 untuk kritis membedakan mana klaim yang berupa fakta terverifikasi dan mana yang berupa opini subjektif penjual.',
    faktaCiri: 'Objektif, memuat data konkret, angka, lokasi, izin edar (BPOM/Halal), spesifikasi teknis, atau jam operasional yang bisa dibuktikan secara ilmiah.',
    opiniCiri: 'Subjektif, memuat kata sifat superlatif (paling, terhebat, terbaik, nomor 1), persepsi rasa, atau klaim kepuasan yang bervariasi bagi setiap orang.',
    contohTabel: [
      { fakta: 'Mengandung 500 mg Vitamin C dan kalsium murni.', opini: 'Minuman penyegar paling nikmat tiada tanding.' },
      { fakta: 'Toko Buka setiap hari pukul 08.00 - 21.00 WIB.', opini: 'Pelayanan paling ramah dan menyenangkan di kota ini.' },
      { fakta: 'Terdaftar resmi di BPOM dengan nomor RI MD 123456.', opini: 'Krim ajaib yang bikin wajah bersinar seketika.' }
    ]
  }
};
