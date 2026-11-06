import React from 'react';
import { Volume2, VolumeX, BookOpen, HelpCircle, RotateCcw, Monitor } from 'lucide-react';

interface HeaderNavProps {
  currentTab: 'GAME' | 'MODULE' | 'QUESTIONS' | 'RULES';
  onSelectTab: (tab: 'GAME' | 'MODULE' | 'QUESTIONS' | 'RULES') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  presentationMode: boolean;
  onTogglePresentation: () => void;
  onResetGame: () => void;
  gameActive: boolean;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  presentationMode,
  onTogglePresentation,
  onResetGame,
  gameActive,
}) => {
  return (
    <header className="w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 sticky top-0 z-40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center shadow-md shadow-orange-500/20 text-slate-950 font-black text-xl">
            PJ
          </div>
          <div className="flex flex-col">
            <span className="font-display font-extrabold text-base md:text-lg tracking-tight text-white whitespace-nowrap">
              Papan Juara Bahasa
            </span>
            <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap">
              Iklan, Slogan & Poster · Kelas 8 SMP
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          <button
            onClick={() => onSelectTab('GAME')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'GAME'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Papan Permainan
          </button>

          <button
            onClick={() => onSelectTab('MODULE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'MODULE'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Modul Belajar</span>
          </button>

          <button
            onClick={() => onSelectTab('QUESTIONS')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              currentTab === 'QUESTIONS'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Bank Soal Guru</span>
          </button>

          <button
            onClick={() => onSelectTab('RULES')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              currentTab === 'RULES'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Aturan Main
          </button>
        </nav>

        {/* Zone 3: Primary Utilities & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onTogglePresentation}
            title={presentationMode ? 'Mode Biasa' : 'Mode Layar Kelas (Teks Besar)'}
            className={`p-2 rounded-lg border transition-colors ${
              presentationMode
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
            aria-label="Toggle Mode Presentasi"
          >
            <Monitor className="w-4 h-4" />
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Matikan Suara' : 'Nyalakan Suara'}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700 transition-colors"
            aria-label="Toggle Suara"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {gameActive && (
            <button
              onClick={onResetGame}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-300 bg-rose-950/50 border border-rose-800/60 rounded-lg hover:bg-rose-900/60 transition-colors whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ulangi Sesi</span>
            </button>
          )}
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-1.5 border-t border-slate-800/60 bg-slate-950/90 text-xs">
        <button
          onClick={() => onSelectTab('GAME')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'GAME' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
        >
          Permainan
        </button>
        <button
          onClick={() => onSelectTab('MODULE')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'MODULE' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
        >
          Modul
        </button>
        <button
          onClick={() => onSelectTab('QUESTIONS')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'QUESTIONS' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
        >
          Soal Guru
        </button>
        <button
          onClick={() => onSelectTab('RULES')}
          className={`px-2.5 py-1 rounded font-medium ${currentTab === 'RULES' ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400'}`}
        >
          Aturan
        </button>
      </div>
    </header>
  );
};
