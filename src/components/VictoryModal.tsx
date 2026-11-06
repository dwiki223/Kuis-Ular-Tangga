import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Player } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
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
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl relative my-auto animate-scale-in">
        {/* Celebration Header */}
        <div className="text-center space-y-2 pb-6 border-b border-amber-200">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-amber-400/30 mb-1">
            <Trophy className="w-10 h-10" />
          </div>
          <div className="text-xs font-black tracking-widest text-amber-600 uppercase">
            PERMAINAN SELESAI · GARIS FINIS TERCAPAI
          </div>
          <h2 className="text-2xl sm:text-4xl font-display font-black text-slate-900">
            Selamat, {winner.name} Meraih Gelar Juara!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto">
            Kompetisi materi Teks Iklan, Slogan, dan Poster Bahasa Indonesia Kelas 8 telah selesai dengan hasil gemilang!
          </p>
        </div>

        {/* Top 3 Podium Visual */}
        <div className="py-6 flex items-end justify-center gap-3 sm:gap-6">
          {/* Rank 2 */}
          {top2 && (
            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <div className="mb-2">
                <PlayerPawn player={top2} isActive={false} size="md" />
              </div>
              <span className="text-xs font-black text-slate-900 truncate max-w-full">{top2.name}</span>
              <span className="text-[11px] text-slate-600 font-mono font-bold">{top2.score} Poin</span>
              <div className="w-full h-24 bg-slate-100 border-t-4 border-slate-400 rounded-t-2xl flex flex-col items-center justify-center mt-2 shadow-sm border border-slate-200">
                <span className="text-2xl font-black text-slate-700">2</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-bold">Perak</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Tallest) */}
          {top1 && (
            <div className="flex flex-col items-center flex-1 max-w-[160px]">
              <div className="text-amber-500 animate-bounce mb-1">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="mb-2">
                <PlayerPawn player={top1} isActive={true} isLeader={true} size="lg" />
              </div>
              <span className="text-sm font-black text-amber-800 truncate max-w-full">{top1.name}</span>
              <span className="text-xs text-amber-700 font-mono font-black">{top1.score} Poin</span>
              <div className="w-full h-32 bg-gradient-to-t from-amber-400 to-yellow-300 border-t-4 border-amber-500 rounded-t-2xl flex flex-col items-center justify-center mt-2 shadow-lg text-slate-950 border border-amber-300">
                <span className="text-3xl font-black">1</span>
                <span className="text-[10px] uppercase tracking-wider font-black">Juara Emas</span>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {top3 && (
            <div className="flex flex-col items-center flex-1 max-w-[140px]">
              <div className="mb-2">
                <PlayerPawn player={top3} isActive={false} size="md" />
              </div>
              <span className="text-xs font-black text-slate-900 truncate max-w-full">{top3.name}</span>
              <span className="text-[11px] text-slate-600 font-mono font-bold">{top3.score} Poin</span>
              <div className="w-full h-16 bg-amber-100/70 border-t-4 border-amber-700 rounded-t-2xl flex flex-col items-center justify-center mt-2 shadow-sm border border-amber-200">
                <span className="text-xl font-black text-amber-800">3</span>
                <span className="text-[9px] uppercase tracking-wider text-amber-800 font-bold">Perunggu</span>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Learning Assessment Table for Teacher */}
        <div className="bg-amber-50/60 rounded-2xl border-2 border-amber-200 p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between pb-2 border-b border-amber-200">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-amber-600" />
              <h3 className="font-black text-sm text-slate-900">
                Rapor Capaian Pembelajaran Siswa (Asesmen Formatif)
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-bold">SMP Kelas 8 · Bahasa Indonesia</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-amber-200 text-slate-600">
                  <th className="py-2 px-2 font-bold">Peringkat</th>
                  <th className="py-2 px-2 font-bold">Nama Siswa</th>
                  <th className="py-2 px-2 font-bold">Petak Akhir</th>
                  <th className="py-2 px-2 font-bold">Total Skor</th>
                  <th className="py-2 px-2 font-bold">Akurasi Soal</th>
                  <th className="py-2 px-2 font-bold">Streak Tertinggi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-200/80 font-mono">
                {sorted.map((p, idx) => {
                  const totalAnswered = p.history.length;
                  const totalCorrect = p.history.filter(h => h.isCorrect).length;
                  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

                  return (
                    <tr key={p.id} className="text-slate-800">
                      <td className="py-2.5 px-2 font-black text-slate-900">#{idx + 1}</td>
                      <td className="py-2.5 px-2 font-sans font-bold flex items-center gap-2 text-slate-900">
                        <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: p.avatar.color }} />
                        <span>{p.name}</span>
                        {p.isBot && <span className="text-[9px] text-slate-500 font-normal">(Bot)</span>}
                      </td>
                      <td className="py-2.5 px-2 font-semibold">#{p.position} / 30</td>
                      <td className="py-2.5 px-2 text-amber-800 font-black">{p.score} Poin</td>
                      <td className="py-2.5 px-2 font-sans">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          accuracy >= 75 ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                          accuracy >= 50 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                          'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {totalCorrect}/{totalAnswered} ({accuracy}%)
                        </span>
                      </td>
                      <td className="py-2.5 px-2 font-semibold">{p.highestStreak}x</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-amber-200 mt-6">
          <button
            type="button"
            onClick={handlePrint}
            className="w-full sm:w-auto px-5 py-3 rounded-2xl border-2 border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Cetak / Simpan Rapor Hasil Belajar</span>
          </button>

          <button
            type="button"
            onClick={onPlayAgain}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-display font-black text-sm shadow-lg shadow-amber-400/30 border border-amber-400 flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Mulai Permainan Baru</span>
          </button>
        </div>
      </div>
    </div>
  );
};
