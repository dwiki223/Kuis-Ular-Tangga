import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player } from '../types/game';
import { playSound } from '../utils/audio';
import { Trophy, Medal, Printer, RotateCcw, Award, CheckCircle, BarChart3 } from 'lucide-react';

interface VictoryModalProps {
  players: Player[];
  winner: Player;
  soundEnabled: boolean;
  onPlayAgain: () => void;
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  players,
  winner,
  soundEnabled,
  onPlayAgain,
}) => {
  useEffect(() => {
    playSound.victory(soundEnabled);

    // Confetti celebration effect
    const end = Date.now() + 2500;
    const colors = ['#f59e0b', '#ef4444', '#10b981', '#3b82f6', '#8b5cf6'];

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }, [soundEnabled]);

  // Sort players by score
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const top1 = sorted[0];
  const top2 = sorted[1];
  const top3 = sorted[2];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-amber-500/60 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-scale-in">
        {/* Celebration Header */}
        <div className="text-center space-y-2 pb-6 border-b border-slate-800">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-500/30 mb-1">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="text-xs font-extrabold tracking-widest text-amber-400 uppercase">
            PERMAINAN SELESAI · GARIS FINIS TERCAPAI
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-white">
            Selamat, {winner.name} Meraih Gelar Juara!
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto">
            Kompetisi materi Teks Iklan, Slogan, dan Poster Bahasa Indonesia Kelas 8 telah selesai dengan hasil gemilang!
          </p>
        </div>

        {/* Top 3 Podium Visual */}
        <div className="py-6 flex items-end justify-center gap-3 sm:gap-6">
          {/* Rank 2 */}
          {top2 && (
            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md mb-2 text-sm"
                style={{ backgroundColor: top2.avatar.color }}
              >
                {top2.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-white truncate max-w-full">{top2.name}</span>
              <span className="text-[11px] text-slate-400 font-mono">{top2.score} Poin</span>
              <div className="w-full h-24 bg-slate-800 border-t-4 border-slate-400 rounded-t-xl flex flex-col items-center justify-center mt-2 shadow-inner">
                <span className="text-2xl font-black text-slate-300">2</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Perak</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Tallest) */}
          {top1 && (
            <div className="flex flex-col items-center flex-1 max-w-[160px]">
              <div className="text-amber-400 animate-bounce mb-1">
                <Trophy className="w-6 h-6" />
              </div>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-xl text-white shadow-xl ring-4 ring-amber-400/40 mb-2"
                style={{ backgroundColor: top1.avatar.color }}
              >
                {top1.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-extrabold text-amber-300 truncate max-w-full">{top1.name}</span>
              <span className="text-xs text-amber-400 font-mono font-bold">{top1.score} Poin</span>
              <div className="w-full h-32 bg-gradient-to-t from-amber-600 to-amber-500 rounded-t-xl flex flex-col items-center justify-center mt-2 shadow-xl text-slate-950">
                <span className="text-3xl font-black">1</span>
                <span className="text-[10px] uppercase tracking-wider font-extrabold">Juara Emas</span>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {top3 && (
            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white shadow-md mb-2 text-sm"
                style={{ backgroundColor: top3.avatar.color }}
              >
                {top3.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-xs font-bold text-white truncate max-w-full">{top3.name}</span>
              <span className="text-[11px] text-slate-400 font-mono">{top3.score} Poin</span>
              <div className="w-full h-16 bg-slate-800 border-t-4 border-amber-700 rounded-t-xl flex flex-col items-center justify-center mt-2 shadow-inner">
                <span className="text-xl font-black text-amber-600">3</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Perunggu</span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Learning Assessment Table for Teacher */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-400" />
              <h3 className="font-bold text-sm text-white">
                Rapor Capaian Pembelajaran Siswa (Asesmen Formatif)
              </h3>
            </div>
            <span className="text-xs text-slate-400">SMP Kelas 8 · Bahasa Indonesia</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="py-2 px-2 font-medium">Peringkat</th>
                  <th className="py-2 px-2 font-medium">Nama Siswa</th>
                  <th className="py-2 px-2 font-medium">Petak Akhir</th>
                  <th className="py-2 px-2 font-medium">Total Skor</th>
                  <th className="py-2 px-2 font-medium">Akurasi Soal</th>
                  <th className="py-2 px-2 font-medium">Streak Tertinggi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {sorted.map((p, idx) => {
                  const totalAnswered = p.history.length;
                  const totalCorrect = p.history.filter(h => h.isCorrect).length;
                  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

                  return (
                    <tr key={p.id} className="text-slate-300">
                      <td className="py-2.5 px-2 font-bold text-white">#{idx + 1}</td>
                      <td className="py-2.5 px-2 font-sans font-bold flex items-center gap-2 text-white">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.avatar.color }} />
                        <span>{p.name}</span>
                        {p.isBot && <span className="text-[9px] text-slate-400 font-normal">(Bot)</span>}
                      </td>
                      <td className="py-2.5 px-2">#{p.position} / 30</td>
                      <td className="py-2.5 px-2 text-amber-400 font-bold">{p.score} Poin</td>
                      <td className="py-2.5 px-2 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          accuracy >= 75 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          accuracy >= 50 ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                          'bg-slate-800 text-slate-400'
                        }`}>
                          {totalCorrect}/{totalAnswered} ({accuracy}%)
                        </span>
                      </td>
                      <td className="py-2.5 px-2">{p.highestStreak}x</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800 mt-6">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan Rapor Hasil Belajar</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-display font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Permainan Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
