import React from 'react';
import { Compass, X, Check, Dices, ArrowUpRight, ArrowDownRight, Zap, Trophy, Shield } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-extrabold text-white">
                Aturan & Cara Bermain
              </h2>
              <p className="text-xs text-slate-400">
                Panduan Permainan Papan Interaktif Kelas 8 SMP
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-300 pr-2">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Dices className="w-4 h-4 text-amber-400" />
              <span>1. Alur Giliran & Lemparan Dadu</span>
            </h4>
            <p className="leading-relaxed">
              Permainan dimainkan bergantian mulai dari Pemain 1 hingga 6. Pada giliranmu, tekan tombol <strong>"Lempar Dadu"</strong>. Pionmu akan otomatis melangkah sejumlah angka dadu (1 - 6) di sepanjang 30 petak lintasan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>2. Menjawab Kuis Materi Pembelajaran</span>
            </h4>
            <p className="leading-relaxed">
              Ketika mendarat di petak <strong>Iklan, Slogan, Poster, Fakta vs Opini, atau Studi Kasus</strong>, muncul pertanyaan pilihan ganda (A, B, C, D) dengan batas waktu.
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-slate-400">
              <li><strong className="text-emerald-400">Jawaban Benar:</strong> Memperoleh +100 sampai +150 poin serta bonus kecepatan! Pionmu aman di petak tersebut.</li>
              <li><strong className="text-rose-400">Jawaban Salah / Waktu Habis:</strong> Tidak memperoleh poin, dan pionmu dapat mundur 1 petak karena belum menguasai materi, kecuali memiliki <em>Perisai</em> aktif!</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span>3. Sistem Ular Tangga (Tangga Naik & Kepala Ular)</span>
            </h4>
            <ul className="space-y-2 pl-4 list-disc text-slate-400">
              <li>
                <strong className="text-emerald-400">🪜 Tangga Naik:</strong> Jika mendarat di petak bawah tangga (misal: Petak #4, #9, #15, #21), pionmu akan langsung memanjat tangga menuju petak di atasnya! Jawab kuis di petak tujuan untuk mengamankan posisimu.
              </li>
              <li>
                <strong className="text-rose-400">🐍 Kepala Ular:</strong> Awas! Jika mendarat di petak kepala ular (Petak #12 Kalimat Rancu, #17 Typo Ejaan, #23 Klaim Menipu, #28 Plagiasi Iklan), pionmu akan meluncur turun ke petak ekor ular di bawahnya.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <span>4. Kartu Peluang & Duel Cepat</span>
            </h4>
            <ul className="space-y-2 pl-4 list-disc text-slate-400">
              <li><strong>Petak Peluang (#6, #19, #29):</strong> Mengambil kartu misteri acak (Langkah maju, poin ekstra, perisai pelindung, atau giliran tambahan).</li>
              <li><strong>Petak Duel (#10, #24):</strong> Menantang siswa lain untuk adu kecepatan menjawab 1 pertanyaan perebutan 200 poin!</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 space-y-2">
            <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>5. Garis FINIS (Puncak Petak 30) & Pemenang</span>
            </h4>
            <p className="leading-relaxed">
              Permainan selesai seketika ada pemain yang mencapai <strong>Puncak Petak 30 (FINIS)</strong>. Juara ditentukan berdasarkan skor akumulasi tertinggi dan akurasi ketepatan materi! Guru dapat mencetak rapor analisis capaian setiap siswa di akhir permainan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Mengerti, Siap Bermain!
          </button>
        </div>
      </div>
    </div>
  );
};
