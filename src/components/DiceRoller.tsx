import React, { useState, useEffect } from 'react';
import { Player } from '../types/game';
import { Dices, Sparkles, Bot, Shield, Flame } from 'lucide-react';

interface DiceRollerProps {
  activePlayer: Player;
  isRolling: boolean;
  diceValue: number;
  onRoll: () => void;
  canRoll: boolean;
  soundEnabled: boolean;
}

export const DiceRoller: React.FC<DiceRollerProps> = ({
  activePlayer,
  isRolling,
  diceValue,
  onRoll,
  canRoll,
}) => {
  const [botCountdown, setBotCountdown] = useState<number>(1);

  // Auto-roll for bot player
  useEffect(() => {
    if (activePlayer.isBot && canRoll && !isRolling) {
      setBotCountdown(1);
      const timer = setTimeout(() => {
        onRoll();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [activePlayer.id, activePlayer.isBot, canRoll, isRolling, onRoll]);

  // Render dots on dice face
  const renderDots = (value: number) => {
    const dotClasses = "w-3 h-3 rounded-full bg-slate-900 shadow-inner";
    switch (value) {
      case 1:
        return (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-rose-600 shadow-inner ring-2 ring-rose-300/40" />
          </div>
        );
      case 2:
        return (
          <div className="w-full h-full flex justify-between p-2">
            <div className={dotClasses} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 3:
        return (
          <div className="w-full h-full flex justify-between p-2">
            <div className={dotClasses} />
            <div className={`${dotClasses} self-center`} />
            <div className={`${dotClasses} self-end`} />
          </div>
        );
      case 4:
        return (
          <div className="w-full h-full grid grid-cols-2 gap-2 p-2 place-items-center">
            <div className={dotClasses} /><div className={dotClasses} />
            <div className={dotClasses} /><div className={dotClasses} />
          </div>
        );
      case 5:
        return (
          <div className="w-full h-full relative p-2">
            <div className="absolute top-2 left-2"><div className={dotClasses} /></div>
            <div className="absolute top-2 right-2"><div className={dotClasses} /></div>
            <div className="absolute inset-0 m-auto w-3 h-3"><div className={dotClasses} /></div>
            <div className="absolute bottom-2 left-2"><div className={dotClasses} /></div>
            <div className="absolute bottom-2 right-2"><div className={dotClasses} /></div>
          </div>
        );
      case 6:
      default:
        return (
          <div className="w-full h-full grid grid-cols-2 gap-1.5 p-2 place-items-center">
            <div className={dotClasses} /><div className={dotClasses} />
            <div className={dotClasses} /><div className={dotClasses} />
            <div className={dotClasses} /><div className={dotClasses} />
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Active Player Status Badge */}
      <div className="flex items-center gap-3.5 w-full md:w-auto">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-xl text-white shadow-lg ring-2 ring-white/20 shrink-0"
          style={{ backgroundColor: activePlayer.avatar.color }}
        >
          {activePlayer.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              GILIRAN SAAT INI
            </span>
            {activePlayer.isBot ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                <Bot className="w-2.5 h-2.5" /> Bot AI
              </span>
            ) : (
              <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                Siswa
              </span>
            )}
            {activePlayer.hasShield && (
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800" title="Perisai Anti-Salah Aktif">
                <Shield className="w-2.5 h-2.5 text-amber-400" /> Perisai
              </span>
            )}
            {activePlayer.streak >= 2 && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-semibold px-1.5 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                <Flame className="w-2.5 h-2.5 text-rose-400 fill-rose-400" /> {activePlayer.streak}x
              </span>
            )}
          </div>

          <h3 className="font-display font-bold text-lg text-white truncate">
            {activePlayer.name}
            <span className="text-xs font-normal text-slate-400 ml-2">
              ({activePlayer.avatar.name})
            </span>
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span>Petak: <strong className="text-white">#{activePlayer.position} / 30</strong></span>
            <span>·</span>
            <span>Skor: <strong className="text-amber-400 font-mono tabular-nums">{activePlayer.score} Poin</strong></span>
          </div>
        </div>
      </div>

      {/* Dice & Roll Action */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Animated Dice Box */}
        <div className="relative perspective-1000">
          <div
            className={`w-14 h-14 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl shadow-lg border-2 border-amber-200 flex items-center justify-center transition-all ${
              isRolling ? 'animate-roll shadow-amber-500/30 ring-4 ring-amber-400/40' : 'hover:scale-105'
            }`}
          >
            {renderDots(diceValue)}
          </div>
          {isRolling && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-bold text-amber-400 whitespace-nowrap animate-pulse">
              Mengocok...
            </div>
          )}
        </div>

        {/* Action Button */}
        {activePlayer.isBot ? (
          <div className="text-xs text-indigo-300 font-medium py-3 px-5 rounded-xl bg-indigo-950/60 border border-indigo-800/80 flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-400 animate-spin" />
            <span>Bot sedang berpikir ({botCountdown}s)...</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onRoll}
            disabled={!canRoll || isRolling}
            className={`py-3 px-6 rounded-xl font-display font-extrabold text-sm flex items-center gap-2 transition-all shadow-md ${
              canRoll && !isRolling
                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 shadow-amber-500/20 active:scale-95'
                : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
            }`}
          >
            <Dices className={`w-4 h-4 ${isRolling ? 'animate-spin' : ''}`} />
            <span>{isRolling ? 'Mengocok Dadu...' : 'Lempar Dadu'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
