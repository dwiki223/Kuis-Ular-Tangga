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
    <div className="w-full max-w-5xl mx-auto px-4 py-6">
      {/* Hero Banner Showcase */}
      <div className="relative rounded-3xl overflow-hidden mb-8 border-2 border-amber-300 bg-white shadow-xl">
        <div className="relative h-48 sm:h-64 w-full">
          <img
            src="/src/assets/images/board_game_banner_1793933434204.jpg"
            alt="Board Game Bahasa Indonesia SMP Kelas 8"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent flex flex-col justify-end p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-black text-amber-300 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>MULTIPLAYER EDUKATIF 2 - 6 ORANG</span>
              <span className="text-amber-400">·</span>
              <span className="text-white">BAHASA INDONESIA SMP KELAS 8</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-display font-black text-white tracking-tight text-balance">
              Petualangan Papan: Iklan, Slogan & Poster
            </h1>
            <p className="text-sm sm:text-base text-slate-200 max-w-2xl mt-1 font-medium">
              Jelajahi 30 petak penuh tantangan kuis interaktif, analisis gambar, dadu virtual, tangga prestasi, dan duel cepat bersama teman sekelasmu!
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Player Count & Configuration (2 Cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Player Count Selector */}
          <div className="bg-white/95 border-2 border-amber-300 rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-600" />
                <h2 className="text-base font-black text-slate-900">Jumlah Pemain</h2>
              </div>
              <span className="text-xs text-slate-500 font-semibold">Direkomendasikan: 6 Orang untuk Kompetisi Penuh</span>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {[2, 3, 4, 5, 6].map(num => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setPlayerCount(num)}
                  className={`py-3 px-2 rounded-xl text-center border-2 font-display font-black transition-all ${
                    playerCount === num
                      ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-md shadow-amber-400/30 scale-105'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-amber-300 hover:text-slate-900'
                  }`}
                >
                  <div className="text-xl leading-none font-black">{num}</div>
                  <div className="text-[10px] mt-1 font-sans font-bold uppercase tracking-wider">
                    {num === 6 ? 'Maks (6)' : `${num} Pemain`}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Player Cards Configuration */}
          <div className="bg-white/95 border-2 border-amber-300 rounded-2xl p-5 space-y-4 shadow-md">
            <h2 className="text-base font-black text-slate-900 flex items-center justify-between">
              <span>Profil {playerCount} Pemain & Karakter</span>
              <span className="text-xs font-semibold text-slate-500">Pass-and-play di kelas atau dengan AI</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Array.from({ length: playerCount }).map((_, idx) => {
                const draft = playersDraft[idx] || { name: defaultNames[idx], avatarId: AVATAR_OPTIONS[idx].id, isBot: false };
                const avatar = AVATAR_OPTIONS.find(a => a.id === draft.avatarId) || AVATAR_OPTIONS[idx];

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 hover:border-amber-400 transition-colors flex flex-col gap-3 shadow-sm"
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
                          className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-bold text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-400 w-32 sm:w-36 shadow-sm"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => updateDraft(idx, 'isBot', !draft.isBot)}
                        className={`text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1 transition-colors shadow-sm ${
                          draft.isBot
                            ? 'bg-indigo-100 text-indigo-900 border border-indigo-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}
                        title={draft.isBot ? 'Dikontrol Komputer (Bot)' : 'Dikontrol Siswa (Manusia)'}
                      >
                        {draft.isBot ? (
                          <>
                            <Bot className="w-3.5 h-3.5 text-indigo-600" />
                            <span>Bot AI</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Siswa</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Avatar Selection Picker */}
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-amber-200">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-800">{avatar.name}</span>
                        <span className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">{avatar.role}</span>
                      </div>

                      <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                        {AVATAR_OPTIONS.map((opt) => (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => updateDraft(idx, 'avatarId', opt.id)}
                            className={`w-6 h-6 rounded-md transition-all shrink-0 ${
                              draft.avatarId === opt.id
                                ? 'ring-2 ring-amber-500 scale-110 shadow-md'
                                : 'opacity-50 hover:opacity-100'
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
          <div className="bg-white/95 border-2 border-amber-300 rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Compass className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-black text-slate-900">Panduan Petak Papan</h2>
            </div>
            <ul className="text-xs text-slate-700 space-y-2.5 font-medium">
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500 mt-1 shrink-0" />
                <span><strong>Petak Iklan:</strong> Kuis ciri, fungsi, unsur gambar/suara, dan struktur teks iklan niaga/layanan.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 mt-1 shrink-0" />
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
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mt-1 shrink-0" />
                <span><strong>Peluang & Tangga:</strong> Raih kartu kejutan dan tangga pintas jika sukses menjawab!</span>
              </li>
            </ul>
          </div>

          {/* Time Limit Setting */}
          <div className="bg-white/95 border-2 border-amber-300 rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-black text-slate-900">Batas Waktu per Kuis</h2>
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
                  className={`py-2 px-2.5 rounded-lg border-2 font-bold transition-colors ${
                    settings.timerSeconds === item.value
                      ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-sm'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-amber-300 hover:text-slate-900'
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
            className="w-full py-4 px-6 rounded-2xl font-display font-black text-base text-slate-950 bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 shadow-xl shadow-amber-400/30 border border-amber-400 flex items-center justify-center gap-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Play className="w-5 h-5 fill-slate-950" />
            <span>Mulai Permainan ({playerCount} Pemain)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
