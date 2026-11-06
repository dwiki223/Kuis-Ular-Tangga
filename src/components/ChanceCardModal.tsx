import React, { useEffect } from 'react';
import { ChanceCard, Player } from '../types/game';
import { playSound } from '../utils/audio';
import { Sparkles, ArrowRight, ShieldCheck, Trophy, RotateCcw, Flame } from 'lucide-react';

interface ChanceCardModalProps {
  player: Player;
  card: ChanceCard;
  soundEnabled: boolean;
  onApplyCard: () => void;
}

export const ChanceCardModal: React.FC<ChanceCardModalProps> = ({
  player,
  card,
  soundEnabled,
  onApplyCard,
}) => {
  useEffect(() => {
    playSound.chance(soundEnabled);
  }, [soundEnabled]);

  const getEffectBadge = () => {
    switch (card.effectType) {
      case 'STEP_FORWARD':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Maju +{card.value} Petak
          </span>
        );
      case 'STEP_BACK':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-700">
            <RotateCcw className="w-3.5 h-3.5 text-rose-400" /> Mundur {card.value} Petak
          </span>
        );
      case 'BONUS_POINTS':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> Bonus +{card.value} Poin
          </span>
        );
      case 'EXTRA_TURN':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-950 text-orange-300 border border-orange-700">
            <Flame className="w-3.5 h-3.5 text-orange-400" /> Lempar Dadu Ekstra!
          </span>
        );
      case 'SHIELD':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-950 text-sky-300 border border-sky-700">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" /> Perisai Anti-Salah Aktif
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-500/70 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden animate-scale-in">
        {/* Decorative Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 shadow-lg shadow-amber-500/30 text-slate-950 mx-auto">
            <Sparkles className="w-8 h-8" />
          </div>

          <div>
            <div className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
              KARTU PELUANG KREATIF
            </div>
            <h3 className="font-display font-extrabold text-xl text-white">
              {card.title}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Pemain: <strong className="text-slate-200">{player.name}</strong>
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-sm text-slate-300 leading-relaxed">
            "{card.description}"
          </div>

          <div className="pt-2">
            {getEffectBadge()}
          </div>

          <button
            type="button"
            onClick={onApplyCard}
            className="w-full mt-4 py-3.5 px-6 rounded-xl font-display font-bold text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2"
          >
            <span>Terapkan Efek Kartu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
