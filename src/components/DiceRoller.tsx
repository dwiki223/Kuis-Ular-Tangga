import React, { useState, useEffect } from 'react';
import { Player } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
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
    <div className="w-full bg-white/95 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Active Player Status Badge with 3D Pawn Showcase */}
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="p-1.5 rounded-2xl bg-amber-50 border border-amber-200 shadow-inner flex items-center justify-center shrink-0">
          <PlayerPawn player={activePlayer} isActive={true} size="lg" />
        </div>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-600">
              GILIRAN SAAT INI
            </span>
            {activePlayer.isBot ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 border border-indigo-300">
                <Bot className="w-3 h-3 text-indigo-600" /> Bot AI
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                Siswa
              </span>
            )}
            {activePlayer.hasShield && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300" title="Perisai Anti-Salah Aktif">
                <Shield className="w-3 h-3 text-amber-600" /> Perisai
              </span>
            )}
            {activePlayer.streak >= 2 && (
              <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-100 text-rose-800 border border-rose-300">
                <Flame className="w-3 h-3 text-rose-600 fill-rose-600" /> {activePlayer.streak}x
              </span>
            )}
          </div>

          <h3 className="font-display font-black text-xl text-slate-900 truncate">
            {activePlayer.name}
            <span className="text-xs font-semibold text-slate-500 ml-2">
              ({activePlayer.avatar.name})
            </span>
          </h3>

          <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
            <span>Petak: <strong className="text-slate-900 font-bold">#{activePlayer.position} / 30</strong></span>
            <span className="text-amber-400 font-bold">·</span>
            <span>Skor: <strong className="text-amber-700 font-mono font-black tabular-nums">{activePlayer.score} Poin</strong></span>
          </div>
        </div>
      </div>

      {/* Dice & Roll Action */}
      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Animated Dice Box */}
        <div className="relative perspective-1000">
          <div
            className={`w-14 h-14 bg-gradient-to-br from-white via-amber-50 to-amber-100 rounded-2xl shadow-lg border-2 border-amber-300 flex items-center justify-center transition-all ${
              isRolling ? 'animate-roll shadow-amber-400/50 ring-4 ring-amber-300/50' : 'hover:scale-105'
            }`}
          >
            {renderDots(diceValue)}
          </div>
          {isRolling && (
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-black text-amber-700 whitespace-nowrap animate-pulse">
              Mengocok...
            </div>
          )}
        </div>

        {/* Action Button */}
        {activePlayer.isBot ? (
          <div className="text-xs text-indigo-900 font-bold py-3 px-5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center gap-2 shadow-sm">
            <Bot className="w-4 h-4 text-indigo-600 animate-spin" />
            <span>Bot sedang berpikir ({botCountdown}s)...</span>
          </div>
        ) : (
          <button
            type="button"
            onClick={onRoll}
            disabled={!canRoll || isRolling}
            className={`py-3.5 px-6 rounded-xl font-display font-black text-sm flex items-center gap-2 transition-all shadow-md ${
              canRoll && !isRolling
                ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 shadow-amber-400/30 active:scale-95 border border-amber-400'
                : 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed'
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
