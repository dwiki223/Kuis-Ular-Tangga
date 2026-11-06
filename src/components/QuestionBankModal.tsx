import React, { useState } from 'react';
import { CategoryType, Question } from '../types/game';
import { HelpCircle, Plus, Search, X, CheckCircle2, BookOpen } from 'lucide-react';

interface QuestionBankModalProps {
  questions: Question[];
  onAddQuestion: (newQuestion: Question) => void;
  onClose: () => void;
}

export const QuestionBankModal: React.FC<QuestionBankModalProps> = ({
  questions,
  onAddQuestion,
  onClose,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isAdding, setIsAdding] = useState<boolean>(false);

  // New question form state
  const [newCat, setNewCat] = useState<CategoryType>('IKLAN');
  const [newDiff, setNewDiff] = useState<'MUDAH' | 'SEDANG' | 'SULIT'>('SEDANG');
  const [newPrompt, setNewPrompt] = useState<string>('');
  const [newOpt0, setNewOpt0] = useState<string>('');
  const [newOpt1, setNewOpt1] = useState<string>('');
  const [newOpt2, setNewOpt2] = useState<string>('');
  const [newOpt3, setNewOpt3] = useState<string>('');
  const [newCorrect, setNewCorrect] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState<string>('');
  const [newCurriculumRef, setNewCurriculumRef] = useState<string>('Soal Kustom Guru Kelas 8');

  const filteredQuestions = questions.filter(q => {
    const matchesCat = filterCategory === 'ALL' || q.category === filterCategory;
    const matchesSearch = q.prompt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.explanation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleSubmitNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim() || !newOpt0.trim() || !newOpt1.trim() || !newOpt2.trim() || !newOpt3.trim()) {
      return;
    }

    const created: Question = {
      id: `custom-${Date.now()}`,
      category: newCat,
      difficulty: newDiff,
      prompt: newPrompt.trim(),
      options: [newOpt0.trim(), newOpt1.trim(), newOpt2.trim(), newOpt3.trim()],
      correctAnswerIndex: newCorrect,
      explanation: newExplanation.trim() || 'Pembahasan materi pembelajaran oleh guru kelas.',
      curriculumRef: newCurriculumRef.trim() || 'Bahasa Indonesia Kelas 8'
    };

    onAddQuestion(created);
    setIsAdding(false);
    // Reset form
    setNewPrompt('');
    setNewOpt0('');
    setNewOpt1('');
    setNewOpt2('');
    setNewOpt3('');
    setNewExplanation('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-auto max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-display font-extrabold text-white">
                Bank Soal Kurikulum & Soal Kustom Guru
              </h2>
              <p className="text-xs text-slate-400">
                Total {questions.length} Soal Tersedia dalam Sesi Permainan Ini
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAdding(!isAdding)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 hover:bg-amber-400 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{isAdding ? 'Lihat Daftar Soal' : 'Tambah Soal Baru'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Add Question Form View */}
        {isAdding ? (
          <form onSubmit={handleSubmitNew} className="flex-1 overflow-y-auto py-4 space-y-4 text-xs pr-2">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Formulir Buat Soal Pembelajaran Baru</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Kategori Materi:</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value as CategoryType)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="IKLAN">Teks Iklan</option>
                    <option value="SLOGAN">Teks Slogan</option>
                    <option value="POSTER">Teks Poster</option>
                    <option value="FAKTA_OPINI">Fakta vs Opini</option>
                    <option value="VISUAL_CASE">Studi Kasus Visual</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-400 block mb-1 font-semibold">Tingkat Kesulitan:</label>
                  <select
                    value={newDiff}
                    onChange={(e) => setNewDiff(e.target.value as 'MUDAH' | 'SEDANG' | 'SULIT')}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white"
                  >
                    <option value="MUDAH">Mudah (100 Poin)</option>
                    <option value="SEDANG">Sedang (120 Poin)</option>
                    <option value="SULIT">Sulit (150 Poin)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Pertanyaan Kuis:</label>
                <textarea
                  rows={3}
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  placeholder="Ketik pertanyaan kuis Bahasa Indonesia kelas 8..."
                  required
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* 4 Options */}
              <div className="space-y-2">
                <label className="text-slate-400 block font-semibold">Pilihan Jawaban (Pilih radio untuk jawaban benar):</label>
                {[
                  { val: newOpt0, setVal: setNewOpt0, idx: 0, label: 'A' },
                  { val: newOpt1, setVal: setNewOpt1, idx: 1, label: 'B' },
                  { val: newOpt2, setVal: setNewOpt2, idx: 2, label: 'C' },
                  { val: newOpt3, setVal: setNewOpt3, idx: 3, label: 'D' },
                ].map((opt) => (
                  <div key={opt.idx} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="correctChoice"
                      checked={newCorrect === opt.idx}
                      onChange={() => setNewCorrect(opt.idx)}
                      className="w-4 h-4 accent-amber-500"
                      title="Tandai sebagai jawaban benar"
                    />
                    <span className="font-bold text-white w-4">{opt.label}.</span>
                    <input
                      type="text"
                      value={opt.val}
                      onChange={(e) => opt.setVal(e.target.value)}
                      placeholder={`Opsi ${opt.label}...`}
                      required
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Penjelasan Edukatif (Pembahasan):</label>
                <textarea
                  rows={2}
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  placeholder="Mengapa jawaban ini benar? Jelaskan konsep/aturan bahasanya..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-semibold">Referensi KD / Kurikulum:</label>
                <input
                  type="text"
                  value={newCurriculumRef}
                  onChange={(e) => setNewCurriculumRef(e.target.value)}
                  placeholder="Contoh: KD 3.3 / Kurikulum Merdeka Bab 2"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition-colors"
                >
                  Simpan ke Bank Soal
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-2">
            {/* Filter & Search Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kata kunci soal..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto text-xs">
                {['ALL', 'IKLAN', 'SLOGAN', 'POSTER', 'FAKTA_OPINI', 'VISUAL_CASE'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
                      filterCategory === cat
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-950 border border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat === 'ALL' ? 'Semua' : cat.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3">
              {filteredQuestions.map((q, idx) => (
                <div key={q.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-slate-500">#{idx + 1}</span>
                      <span className="font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-amber-400">
                        {q.category.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium">{q.difficulty}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{q.curriculumRef}</span>
                  </div>

                  <p className="font-bold text-white text-sm leading-relaxed">
                    {q.prompt}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isCorrect = oIdx === q.correctAnswerIndex;
                      return (
                        <div
                          key={oIdx}
                          className={`p-2 rounded-lg border text-xs flex items-center justify-between ${
                            isCorrect
                              ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200 font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span><strong>{String.fromCharCode(65 + oIdx)}.</strong> {opt}</span>
                          {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                        </div>
                      );
                    })}
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 text-[11px] text-slate-300">
                    <strong className="text-amber-400">Pembahasan: </strong>{q.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
