import React from 'react';
import { Compass, X, Check, Dices, ArrowUpRight, ArrowDownRight, Zap, Trophy, Shield } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 shadow-sm">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
                Aturan & Cara Bermain
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Panduan Permainan Papan Interaktif Kelas 8 SMP
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors border border-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4 text-xs text-slate-700 pr-2">
          <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-2 shadow-sm">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Dices className="w-4 h-4 text-amber-600" />
              <span>1. Alur Giliran & Lemparan Dadu</span>
            </h4>
            <p className="leading-relaxed font-medium">
              Permainan dimainkan bergantian mulai dari Pemain 1 hingga 6. Pada giliranmu, tekan tombol <strong>"Lempar Dadu"</strong>. Pionmu akan otomatis melangkah sejumlah angka dadu (1 - 6) di sepanjang 30 petak lintasan.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-2 shadow-sm">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>2. Menjawab Kuis Materi Pembelajaran</span>
            </h4>
            <p className="leading-relaxed font-medium">
              Ketika mendarat di petak <strong>Iklan, Slogan, Poster, Fakta vs Opini, atau Studi Kasus</strong>, muncul pertanyaan pilihan ganda (A, B, C, D) dengan batas waktu.
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-slate-700 font-medium">
              <li><strong className="text-emerald-700 font-bold">Jawaban Benar:</strong> Memperoleh +100 sampai +150 poin serta bonus kecepatan! Pionmu aman di petak tersebut.</li>
              <li><strong className="text-rose-700 font-bold">Jawaban Salah / Waktu Habis:</strong> Tidak memperoleh poin, dan pionmu dapat mundur 1 petak karena belum menguasai materi, kecuali memiliki <em>Perisai</em> aktif!</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-2 shadow-sm">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <ArrowUpRight className="w-4 h-4 text-emerald-600" />
              <span>3. Sistem Ular Tangga (Tangga Naik & Kepala Ular)</span>
            </h4>
            <ul className="space-y-2 pl-4 list-disc text-slate-700 font-medium">
              <li>
                <strong className="text-emerald-700 font-bold">🪜 Tangga Naik:</strong> Jika mendarat di petak bawah tangga (misal: Petak #4, #9, #15, #21), pionmu akan langsung memanjat tangga menuju petak di atasnya! Jawab kuis di petak tujuan untuk mengamankan posisimu.
              </li>
              <li>
                <strong className="text-rose-700 font-bold">🐍 Kepala Ular:</strong> Awas! Jika mendarat di petak kepala ular (Petak #12 Kalimat Rancu, #17 Typo Ejaan, #23 Klaim Menipu, #28 Plagiasi Iklan), pionmu akan meluncur turun ke petak ekor ular di bawahnya.
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-2 shadow-sm">
            <h4 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-600" />
              <span>4. Kartu Peluang & Duel Cepat</span>
            </h4>
            <ul className="space-y-2 pl-4 list-disc text-slate-700 font-medium">
              <li><strong>Petak Peluang (#6, #19, #29):</strong> Mengambil kartu misteri acak (Langkah maju, poin ekstra, perisai pelindung, atau giliran tambahan).</li>
              <li><strong>Petak Duel (#10, #24):</strong> Menantang siswa lain untuk adu kecepatan menjawab 1 pertanyaan perebutan 200 poin!</li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-amber-100/70 border-2 border-amber-300 space-y-2 shadow-sm">
            <h4 className="font-black text-amber-900 text-sm flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-600" />
              <span>5. Garis FINIS (Puncak Petak 30) & Pemenang</span>
            </h4>
            <p className="leading-relaxed text-slate-800 font-medium">
              Permainan selesai seketika ada pemain yang mencapai <strong>Puncak Petak 30 (FINIS)</strong>. Juara ditentukan berdasarkan skor akumulasi tertinggi dan akurasi ketepatan materi! Guru dapat mencetak rapor analisis capaian setiap siswa di akhir permainan.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-amber-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs transition-all shadow-md border border-amber-400"
          >
            Mengerti, Siap Bermain!
          </button>
        </div>
      </div>
    </div>
  );
};
