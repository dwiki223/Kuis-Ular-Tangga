import React, { useState } from 'react';
import { AVATAR_OPTIONS } from '../data/questionsData';
import { AvatarOption, Player, GameSettings } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
import { Users, Bot, User, Play, Sparkles, Clock, Compass } from 'lucide-react';

interface PlayerSetupProps {
  onStartGame: (players: Player[], settings: GameSettings) => void;
  defaultSettings: GameSettings;
}

interface PlayerDraft {
  name: string;
  avatarId: string;
  isBot: boolean;
}

export const PlayerSetup: React.FC<PlayerSetupProps> = ({ onStartGame, defaultSettings }) => {
  const [playerCount, setPlayerCount] = useState<number>(6);
  const [settings, setSettings] = useState<GameSettings>(defaultSettings);

  const defaultNames = ['Dwiki (Ketua)', 'Rina', 'Budi', 'Ayu', 'Fajar', 'Siti'];

  const [playersDraft, setPlayersDraft] = useState<PlayerDraft[]>([
    { name: 'Dwiki (Ketua)', avatarId: 'pena', isBot: false },
    { name: 'Rina', avatarId: 'kuas', isBot: false },
    { name: 'Budi', avatarId: 'megafon', isBot: false },
    { name: 'Ayu', avatarId: 'detektif', isBot: false },
    { name: 'Fajar', avatarId: 'kamera', isBot: false },
    { name: 'Siti', avatarId: 'buku', isBot: false },
  ]);

  const updateDraft = (index: number, field: keyof PlayerDraft, value: string | boolean) => {
    setPlayersDraft(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handleStart = () => {
    const activePlayers: Player[] = playersDraft.slice(0, playerCount).map((draft, idx) => {
      const avatar = AVATAR_OPTIONS.find(a => a.id === draft.avatarId) || AVATAR_OPTIONS[idx % AVATAR_OPTIONS.length];
      return {
        id: idx + 1,
        name: draft.name.trim() || `Pemain ${idx + 1}`,
        avatar,
        isBot: draft.isBot,
        position: 1,
        score: 0,
        streak: 0,
        highestStreak: 0,
        hasShield: false,
        history: [],
        stats: {
          iklanCorrect: 0,
          iklanTotal: 0,
          sloganCorrect: 0,
          sloganTotal: 0,
          posterCorrect: 0,
          posterTotal: 0,
          faktaOpiniCorrect: 0,
          faktaOpiniTotal: 0,
        }
      };
    });

    onStartGame(activePlayers, settings);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Hero Banner Showcase */}
      <div className="relative rounded-2xl overflow-hidden mb-8 border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src="/src/assets/images/board_game_banner_1793933434204.jpg"
            alt="Board Game Bahasa Indonesia SMP Kelas 8"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-60 hover:opacity-75 transition-opacity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>MULTPLAYER EDUKATIF 2 - 6 ORANG</span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-300">BAHASA INDONESIA SMP KELAS 8</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight text-balance">
              Petualangan Papan: Iklan, Slogan & Poster
            </h1>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mt-1">
              Jelajahi 30 petak penuh tantangan kuis interaktif, analisis gambar, dadu virtual, tangga prestasi, dan duel cepat bersama teman sekelasmu!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Player Count & Configuration (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player Count Selector */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h2 className="text-base font-bold text-white">Jumlah Pemain</h2>
              </div>
              <span className="text-xs text-slate-400">Direkomendasikan: 6 Orang untuk Kompetisi Penuh</span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPlayerCount(num)}
                  className={`py-3 px-2 rounded-xl text-center border font-display font-bold transition-all ${
                    playerCount === num
                      ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  <div className="text-lg leading-none">{num}</div>
                  <div className="text-[10px] mt-1 font-sans font-medium uppercase tracking-wider">
                    {num === 6 ? 'Maks (6)' : `${num} Pemain`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Player Cards Configuration */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center justify-between">
              <span>Profil {playerCount} Pemain & Karakter</span>
              <span className="text-xs font-normal text-slate-400">Pass-and-play di proyektor kelas atau dengan AI</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: playerCount }).map((_, idx) => {
                const draft = playersDraft[idx] || { name: defaultNames[idx], avatarId: AVATAR_OPTIONS[idx].id, isBot: false };
                const avatar = AVATAR_OPTIONS.find(a => a.id === draft.avatarId) || AVATAR_OPTIONS[idx];

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-colors flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="shrink-0">
                          <PlayerPawn
                            player={{
                              id: idx + 1,
                              name: draft.name.trim() || `P${idx + 1}`,
                              avatar,
                              isBot: draft.isBot,
                              position: 1,
                              score: 0,
                              streak: 0,
                              highestStreak: 0,
                              hasShield: false,
                              history: [],
                              stats: {
                                iklanCorrect: 0,
                                iklanTotal: 0,
                                sloganCorrect: 0,
                                sloganTotal: 0,
                                posterCorrect: 0,
                                posterTotal: 0,
                                faktaOpiniCorrect: 0,
                                faktaOpiniTotal: 0,
                              }
                            }}
                            isActive={false}
                            size="sm"
                          />
                        </div>
                        <input
                          type="text"
                          value={draft.name}
                          onChange={(e) => updateDraft(idx, 'name', e.target.value)}
                          placeholder={`Nama Pemain ${idx + 1}`}
                          className="bg-slate-900 border border-slate-700 rounded px-2.5 py-1 text-xs font-semibold text-white focus:outline-none focus:border-amber-400 w-32 sm:w-36"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => updateDraft(idx, 'isBot', !draft.isBot)}
                        className={`text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1 transition-colors ${
                          draft.isBot
                            ? 'bg-indigo-950 text-indigo-300 border border-indigo-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}
                        title={draft.isBot ? 'Dikontrol Komputer (Bot)' : 'Dikontrol Siswa (Manusia)'}
                      >
                        {draft.isBot ? (
                          <>
                            <Bot className="w-3 h-3 text-indigo-400" />
                            <span>Bot AI</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3 text-emerald-400" />
                            <span>Siswa</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Avatar Selection Picker */}
                    <div className="flex flex-col gap-1.5 pt-1 border-t border-slate-900">
                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span className="font-medium text-slate-300">{avatar.name}</span>
                        <span className="text-[10px] text-slate-500 truncate max-w-[150px]">{avatar.role}</span>
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {AVATAR_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => updateDraft(idx, 'avatarId', opt.id)}
                            className={`w-6 h-6 rounded-md transition-all shrink-0 ${
                              draft.avatarId === opt.id
                                ? 'ring-2 ring-amber-400 scale-110 shadow-sm'
                                : 'opacity-40 hover:opacity-90'
                            }`}
                            style={{ backgroundColor: opt.color }}
                            title={`${opt.name} - ${opt.role}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Game Rules & Settings (1 Col) */}
        <div className="space-y-6">
          {/* Rules & Game Objective Brief */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Panduan Petak Papan</h2>
            </div>
            <ul className="text-xs text-slate-300 space-y-2.5">
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-1 shrink-0" />
                <span><strong>Petak Iklan:</strong> Kuis ciri, fungsi, unsur gambar/suara, dan struktur teks iklan niaga/layanan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                <span><strong>Petak Slogan:</strong> Kuis semboyan puitis, rima kata, dan visi hidup bermakna.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 mt-1 shrink-0" />
                <span><strong>Petak Poster:</strong> Kuis desain visual, ruang publik, dan kalimat ajakan imperatif.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1 shrink-0" />
                <span><strong>Fakta vs Opini:</strong> Bedakan data konkret laboratorium vs klaim subjektif penjual.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                <span><strong>Peluang & Tangga:</strong> Raih kartu kejutan dan tangga pintas jika sukses menjawab!</span>
              </li>
            </ul>
          </div>

          {/* Time Limit Setting */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white">Batas Waktu per Kuis</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: '30 Detik (Standar)', value: 30 },
                { label: '15 Detik (Cepat)', value: 15 },
                { label: '45 Detik (Santai)', value: 45 },
                { label: 'Tanpa Timer', value: 0 },
              ].map(item => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setSettings(s => ({ ...s, timerSeconds: item.value }))}
                  className={`py-2 px-2.5 rounded-lg border font-medium transition-colors ${
                    settings.timerSeconds === item.value
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/50'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start CTA */}
          <button
            type="button"
            onClick={handleStart}
            className="w-full py-4 px-6 rounded-xl font-display font-extrabold text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-xl shadow-amber-500/25 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Mulai Permainan ({playerCount} Pemain)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
