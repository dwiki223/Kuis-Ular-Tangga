import React, { useState } from 'react';
import { CURRICULUM_GUIDE, CURRICULUM_MATRIX } from '../data/curriculumData';
import { BookOpen, X, CheckCircle2, AlertCircle, FileText, Sparkles, Layers } from 'lucide-react';

interface LearningModuleModalProps {
  onClose: () => void;
}

export const LearningModuleModal: React.FC<LearningModuleModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'MATRIKS' | 'DEFINISI' | 'KEBAHASAAN' | 'FAKTA_OPINI'>('MATRIKS');

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col text-slate-900">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-amber-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-100 text-amber-700 border border-amber-300 shadow-sm">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-black text-slate-900">
                Modul Pembelajaran Bahasa Indonesia Kelas 8
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Materi Lengkap: Teks Iklan, Slogan, dan Poster (Kurikulum Merdeka & K13)
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

        {/* Tab Selection */}
        <div className="flex items-center gap-2 py-3 border-b border-amber-200 overflow-x-auto shrink-0 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('MATRIKS')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
              activeTab === 'MATRIKS'
                ? 'bg-amber-400 text-slate-950 font-black border-amber-500 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-slate-900'
            }`}
          >
            Tabel Perbandingan Unsur
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('DEFINISI')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
              activeTab === 'DEFINISI'
                ? 'bg-amber-400 text-slate-950 font-black border-amber-500 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-slate-900'
            }`}
          >
            Ciri & Fungsi Media
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('KEBAHASAAN')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
              activeTab === 'KEBAHASAAN'
                ? 'bg-amber-400 text-slate-950 font-black border-amber-500 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-slate-900'
            }`}
          >
            Kaidah Kebahasaan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('FAKTA_OPINI')}
            className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-colors border ${
              activeTab === 'FAKTA_OPINI'
                ? 'bg-amber-400 text-slate-950 font-black border-amber-500 shadow-sm'
                : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-slate-900'
            }`}
          >
            Fakta vs Opini
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 text-sm text-slate-700 pr-2">
          {activeTab === 'MATRIKS' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200">
                <h4 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-amber-600" />
                  <span>Matriks Perbedaan Unsur Pembentuk (Iklan vs Slogan vs Poster)</span>
                </h4>
                <p className="text-xs text-slate-600 mb-4 font-medium">
                  Salah satu kompetensi kunci kelas 8 adalah memahami perbedaan unsur visual, tekstual, gerak, dan audio pada masing-masing media komunikasi persuasif.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-amber-300 text-slate-700 font-bold">
                        <th className="py-2.5 px-3">Bentuk Teks</th>
                        <th className="py-2.5 px-3">Gambar</th>
                        <th className="py-2.5 px-3">Kata-Kata</th>
                        <th className="py-2.5 px-3">Gerak</th>
                        <th className="py-2.5 px-3">Suara</th>
                        <th className="py-2.5 px-3">Fokus & Ciri Khas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-200/80">
                      {CURRICULUM_MATRIX.map((row, i) => (
                        <tr key={i} className="hover:bg-amber-100/50">
                          <td className="py-3 px-3 font-black text-slate-900 whitespace-nowrap">{row.media}</td>
                          <td className="py-3 px-3">{row.gambar}</td>
                          <td className="py-3 px-3">{row.kata}</td>
                          <td className="py-3 px-3">{row.gerak}</td>
                          <td className="py-3 px-3">{row.suara}</td>
                          <td className="py-3 px-3 text-slate-700 leading-relaxed font-medium">{row.fokusUtama}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Memory Trick / Jembatan Keledai */}
              <div className="p-4 rounded-2xl bg-amber-100/80 border-2 border-amber-300 text-xs space-y-1.5 shadow-sm">
                <div className="font-black text-amber-900 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Tips Menghafal Cepat untuk Siswa:</span>
                </div>
                <p className="text-slate-800 font-medium">
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
                <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-2">
                  <h4 className="text-base font-black text-slate-900 flex items-center justify-between">
                    <span>{item.nama}</span>
                    <span className="text-xs text-amber-700 font-bold">{item.fungsi}</span>
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {item.arti}
                  </p>
                  <div className="p-2.5 rounded-xl bg-white border border-amber-200 text-xs text-slate-800 shadow-sm">
                    <strong className="text-amber-700 font-bold">Contoh Konkret:</strong> {item.contoh}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'KEBAHASAAN' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {CURRICULUM_GUIDE.kaidahKebahasaan.map((kaidah, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-2">
                    <h5 className="font-black text-amber-800 text-sm">
                      {kaidah.kaidah}
                    </h5>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {kaidah.makna}
                    </p>
                    <div className="text-[11px] text-slate-600 pt-1 border-t border-amber-200 font-medium">
                      <strong>Ciri/Contoh:</strong> {kaidah.ciri}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'FAKTA_OPINI' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-amber-50/60 border-2 border-amber-200 space-y-3">
                <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <span>Keterampilan Literasi Kritis: Membedakan Fakta dan Opini</span>
                </h4>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {CURRICULUM_GUIDE.faktaDanOpini.penjelasan}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-emerald-50 border-2 border-emerald-300 text-xs space-y-1 shadow-sm">
                    <div className="font-black text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Kalimat FAKTA (Objektif)</span>
                    </div>
                    <p className="text-slate-700 font-medium">{CURRICULUM_GUIDE.faktaDanOpini.faktaCiri}</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-rose-50 border-2 border-rose-300 text-xs space-y-1 shadow-sm">
                    <div className="font-black text-rose-800 flex items-center gap-1.5">
                      <AlertCircle className="w-4 h-4 text-rose-600" />
                      <span>Kalimat OPINI (Subjektif)</span>
                    </div>
                    <p className="text-slate-700 font-medium">{CURRICULUM_GUIDE.faktaDanOpini.opiniCiri}</p>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-black text-slate-900 block mb-2">Contoh Perbandingan Kalimat:</span>
                  <div className="space-y-2">
                    {CURRICULUM_GUIDE.faktaDanOpini.contohTabel.map((cth, i) => (
                      <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-300 text-emerald-950 font-medium">
                          <strong className="font-black text-emerald-800">Fakta:</strong> "{cth.fakta}"
                        </div>
                        <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-300 text-rose-950 font-medium">
                          <strong className="font-black text-rose-800">Opini:</strong> "{cth.opini}"
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
        <div className="pt-4 border-t border-amber-200 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-xs transition-all shadow-md border border-amber-400"
          >
            Tutup & Kembali ke Papan
          </button>
        </div>
      </div>
    </div>
  );
};
