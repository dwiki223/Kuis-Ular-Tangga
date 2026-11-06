import React, { useState } from 'react';
import { CURRICULUM_GUIDE, CURRICULUM_MATRIX } from '../data/curriculumData';
import { BookOpen, X, CheckCircle2, AlertCircle, FileText, Sparkles, Layers } from 'lucide-react';

interface LearningModuleModalProps {
  onClose: () => void;
}

export const LearningModuleModal: React.FC<LearningModuleModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'MATRIKS' | 'DEFINISI' | 'KEBAHASAAN' | 'FAKTA_OPINI'>('MATRIKS');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-extrabold text-white">
                Modul Pembelajaran Bahasa Indonesia Kelas 8
              </h2>
              <p className="text-xs text-slate-400">
                Materi Lengkap: Teks Iklan, Slogan, dan Poster (Kurikulum Merdeka & K13)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-2 py-3 border-b border-slate-800 overflow-x-auto shrink-0 text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('MATRIKS')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'MATRIKS' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tabel Perbandingan Unsur
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('DEFINISI')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'DEFINISI' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Ciri & Fungsi Media
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('KEBAHASAAN')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'KEBAHASAAN' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Kaidah Kebahasaan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('FAKTA_OPINI')}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              activeTab === 'FAKTA_OPINI' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Fakta vs Opini
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 text-sm text-slate-300 pr-2">
          {activeTab === 'MATRIKS' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-400" />
                  <span>Matriks Perbedaan Unsur Pembentuk (Iklan vs Slogan vs Poster)</span>
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Salah satu kompetensi kunci kelas 8 adalah memahami perbedaan unsur visual, tekstual, gerak, dan audio pada masing-masing media komunikasi persuasif.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400">
                        <th className="py-2.5 px-3">Bentuk Teks</th>
                        <th className="py-2.5 px-3">Gambar</th>
                        <th className="py-2.5 px-3">Kata-Kata</th>
                        <th className="py-2.5 px-3">Gerak</th>
                        <th className="py-2.5 px-3">Suara</th>
                        <th className="py-2.5 px-3">Fokus & Ciri Khas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80">
                      {CURRICULUM_MATRIX.map((row, i) => (
                        <tr key={i} className="hover:bg-slate-900/50">
                          <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{row.media}</td>
                          <td className="py-3 px-3">{row.gambar}</td>
                          <td className="py-3 px-3">{row.kata}</td>
                          <td className="py-3 px-3">{row.gerak}</td>
                          <td className="py-3 px-3">{row.suara}</td>
                          <td className="py-3 px-3 text-slate-300 leading-relaxed">{row.fokusUtama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Memory Trick / Jembatan Keledai */}
              <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs space-y-1.5">
                <div className="font-bold text-amber-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Tips Menghafal Cepat untuk Siswa:</span>
                </div>
                <p className="text-slate-300">
                  • <strong>Iklan</strong>: Paling lengkap (gambar + kata + gerak + suara) untuk promosi produk.<br/>
                  • <strong>Slogan</strong>: Mengutamakan kata-kata berima dan semboyan hidup yang pendek.<br/>
                  • <strong>Poster</strong>: Mengutamakan gambar mencolok pada plakat besar di ruang publik.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'DEFINISI' && (
            <div className="space-y-4">
              {CURRICULUM_GUIDE.definisi.map((item, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <h4 className="text-base font-bold text-white flex items-center justify-between">
                    <span>{item.nama}</span>
                    <span className="text-xs text-amber-400 font-normal">{item.fungsi}</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {item.arti}
                  </p>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
                    <strong className="text-amber-300">Contoh Konkret:</strong> {item.contoh}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'KEBAHASAAN' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CURRICULUM_GUIDE.kaidahKebahasaan.map((kaidah, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h5 className="font-bold text-amber-400 text-sm">
                      {kaidah.kaidah}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {kaidah.makna}
                    </p>
                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                      <strong>Ciri/Contoh:</strong> {kaidah.ciri}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'FAKTA_OPINI' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Keterampilan Literasi Kritis: Membedakan Fakta dan Opini</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {CURRICULUM_GUIDE.faktaDanOpini.penjelasan}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-xs space-y-1">
                    <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Kalimat FAKTA (Objektif)</span>
                    </div>
                    <p className="text-slate-300">{CURRICULUM_GUIDE.faktaDanOpini.faktaCiri}</p>
                  </div>

                  <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-xs space-y-1">
                    <div className="font-bold text-rose-400 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4" />
                      <span>Kalimat OPINI (Subjektif)</span>
                    </div>
                    <p className="text-slate-300">{CURRICULUM_GUIDE.faktaDanOpini.opiniCiri}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-bold text-white block mb-2">Contoh Perbandingan Kalimat:</span>
                  <div className="space-y-2">
                    {CURRICULUM_GUIDE.faktaDanOpini.contohTabel.map((cth, i) => (
                      <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded bg-slate-900 border border-emerald-900/60 text-emerald-200">
                          <strong>Fakta:</strong> "{cth.fakta}"
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-rose-900/60 text-rose-200">
                          <strong>Opini:</strong> "{cth.opini}"
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Tutup & Kembali ke Papan
          </button>
        </div>
      </div>
    </div>
  );
};
