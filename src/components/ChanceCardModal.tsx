import React, { useEffect } from 'react';
import { ChanceCard, Player } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> Maju +{card.value} Petak
          </span>
        );
      case 'STEP_BACK':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-rose-100 text-rose-900 border border-rose-300 shadow-sm">
            <RotateCcw className="w-3.5 h-3.5 text-rose-600" /> Mundur {card.value} Petak
          </span>
        );
      case 'BONUS_POINTS':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-amber-100 text-amber-900 border border-amber-300 shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-600" /> Bonus +{card.value} Poin
          </span>
        );
      case 'EXTRA_TURN':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-orange-100 text-orange-900 border border-orange-300 shadow-sm">
            <Flame className="w-3.5 h-3.5 text-orange-600" /> Lempar Dadu Ekstra!
          </span>
        );
      case 'SHIELD':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-sky-100 text-sky-900 border border-sky-300 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-sky-600" /> Perisai Anti-Salah Aktif
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl text-center relative overflow-hidden animate-scale-in">
        {/* Decorative Top Glow */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 shadow-lg shadow-amber-400/30 text-slate-950 mx-auto">
            <Sparkles className="w-8 h-8 text-slate-950" />
          </div>

          <div>
            <div className="text-xs font-black text-amber-600 uppercase tracking-widest mb-1">
              KARTU PELUANG KREATIF
            </div>
            <h3 className="font-display font-black text-2xl text-slate-900">
              {card.title}
            </h3>
            <div className="flex items-center justify-center gap-2 mt-2 p-1.5 rounded-xl bg-amber-50 border border-amber-200 max-w-fit mx-auto">
              <PlayerPawn player={player} isActive={true} size="sm" />
              <span className="text-xs text-slate-800 font-black">{player.name}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/70 border-2 border-amber-200 text-sm text-slate-800 font-medium leading-relaxed shadow-sm">
            "{card.description}"
          </div>

          <div className="pt-2">
            {getEffectBadge()}
          </div>

          <button
            type="button"
            onClick={onApplyCard}
            className="w-full mt-4 py-3.5 px-6 rounded-2xl font-display font-black text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 transition-all shadow-lg shadow-amber-400/30 border border-amber-400 flex items-center justify-center gap-2"
          >
            <span>Terapkan Efek Kartu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
