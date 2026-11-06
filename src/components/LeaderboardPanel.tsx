import React from 'react';
import { Player } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
import { Trophy, Flame, Shield, Bot, Award, Medal } from 'lucide-react';

interface LeaderboardPanelProps {
  players: Player[];
  activePlayerId: number;
}

export const LeaderboardPanel: React.FC<LeaderboardPanelProps> = ({
  players,
  activePlayerId,
}) => {
  // Sort players by score descending, then position descending
  const sortedPlayers = [...players].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.position - a.position;
  });

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return (
          <div className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm">
            1
          </div>
        );
      case 2:
        return (
          <div className="w-5 h-5 rounded-full bg-slate-300 text-slate-950 flex items-center justify-center font-black text-xs shadow-sm">
            2
          </div>
        );
      case 3:
        return (
          <div className="w-5 h-5 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-xs shadow-sm">
            3
          </div>
        );
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs">
            {rank}
          </div>
        );
    }
  };

  return (
    <div className="w-full bg-white/95 border-2 border-amber-300 rounded-2xl p-4 sm:p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-amber-200">
        <div className="flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-600" />
          <h3 className="font-display font-black text-sm text-slate-900">
            Papan Klasemen Siswa
          </h3>
        </div>
        <span className="text-[11px] text-slate-500 font-mono font-bold">
          {players.length} Pemain Aktif
        </span>
      </div>

      <div className="space-y-2">
        {sortedPlayers.map((player, index) => {
          const rank = index + 1;
          const isActive = player.id === activePlayerId;

          return (
            <div
              key={player.id}
              className={`p-2.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                isActive
                  ? 'bg-amber-100/90 border-amber-400 shadow-md ring-2 ring-amber-300/60'
                  : 'bg-slate-50/80 border-slate-200 hover:border-amber-300 hover:bg-amber-50/30'
              }`}
            >
              {/* Left: Rank, Avatar, Name */}
              <div className="flex items-center gap-2.5 min-w-0">
                {getRankBadge(rank)}

                <div className="shrink-0 flex items-center justify-center">
                  <PlayerPawn
                    player={player}
                    isActive={isActive}
                    isLeader={rank === 1}
                    size="sm"
                  />
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black text-slate-900 truncate">
                      {player.name}
                    </span>
                    {player.isBot && (
                      <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-indigo-100 text-indigo-800 border border-indigo-200">
                        AI
                      </span>
                    )}
                    {player.hasShield && (
                      <span title="Perisai Aktif">
                        <Shield className="w-3 h-3 text-amber-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-500 font-medium truncate">
                    Petak #{player.position} · {player.avatar.name}
                  </div>
                </div>
              </div>

              {/* Right: Score & Streak */}
              <div className="flex flex-col items-end shrink-0">
                <span className="font-mono text-xs font-black text-amber-700 tabular-nums">
                  {player.score} Pts
                </span>
                {player.streak >= 2 ? (
                  <span className="text-[10px] font-bold text-rose-600 flex items-center gap-0.5">
                    <Flame className="w-2.5 h-2.5 fill-rose-600" />
                    <span>{player.streak}x Beruntun</span>
                  </span>
                ) : (
                  <span className="text-[10px] text-slate-500 font-medium">
                    Posisi {Math.round((player.position / 30) * 100)}%
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
