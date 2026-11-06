import React, { useState } from 'react';
import { BOARD_TILES, LADDERS, SNAKES } from '../data/questionsData';
import { BoardTile, Player, TileType } from '../types/game';
import { 
  Megaphone, Sparkles, Palette, Search, Image as ImageIcon, 
  HelpCircle, Zap, ArrowUpRight, ArrowDownRight, Flag, Trophy,
  Eye, EyeOff
} from 'lucide-react';

interface GameBoardProps {
  players: Player[];
  activePlayerIndex: number;
  onTileClick?: (tile: BoardTile) => void;
}

// Coordinate mapping for 30 tiles (6 cols x 5 rows, serpentine winding upwards)
// Row 4 (Bottom): 1 -> 2 -> 3 -> 4 -> 5 -> 6
// Row 3: 12 <- 11 <- 10 <- 9 <- 8 <- 7
// Row 2: 13 -> 14 -> 15 -> 16 -> 17 -> 18
// Row 1: 24 <- 23 <- 22 <- 21 <- 20 <- 19
// Row 0 (Top): 25 -> 26 -> 27 -> 28 -> 29 -> 30 (FINIS)
const TILE_COORDINATES: Record<number, { col: number; row: number }> = {
  1: { col: 0, row: 4 },
  2: { col: 1, row: 4 },
  3: { col: 2, row: 4 },
  4: { col: 3, row: 4 },
  5: { col: 4, row: 4 },
  6: { col: 5, row: 4 },
  7: { col: 5, row: 3 },
  8: { col: 4, row: 3 },
  9: { col: 3, row: 3 },
  10: { col: 2, row: 3 },
  11: { col: 1, row: 3 },
  12: { col: 0, row: 3 },
  13: { col: 0, row: 2 },
  14: { col: 1, row: 2 },
  15: { col: 2, row: 2 },
  16: { col: 3, row: 2 },
  17: { col: 4, row: 2 },
  18: { col: 5, row: 2 },
  19: { col: 5, row: 1 },
  20: { col: 4, row: 1 },
  21: { col: 3, row: 1 },
  22: { col: 2, row: 1 },
  23: { col: 1, row: 1 },
  24: { col: 0, row: 1 },
  25: { col: 0, row: 0 },
  26: { col: 1, row: 0 },
  27: { col: 2, row: 0 },
  28: { col: 3, row: 0 },
  29: { col: 4, row: 0 },
  30: { col: 5, row: 0 },
};

export const GameBoard: React.FC<GameBoardProps> = ({
  players,
  activePlayerIndex,
  onTileClick,
}) => {
  const [showOverlays, setShowOverlays] = useState<boolean>(true);

  // 5 rows rendered from top (Row 0) to bottom (Row 4)
  const rows = [
    [25, 26, 27, 28, 29, 30], // Top row (FINIS at 30)
    [24, 23, 22, 21, 20, 19], // Row 1 (Reverse)
    [13, 14, 15, 16, 17, 18], // Row 2 (Forward)
    [12, 11, 10, 9, 8, 7],    // Row 3 (Reverse)
    [1, 2, 3, 4, 5, 6],       // Bottom row (START at 1)
  ];

  // Helper for center coordinates in SVG space (0..600 x 0..500)
  const getCenter = (tileNum: number) => {
    const coord = TILE_COORDINATES[tileNum] || { col: 0, row: 4 };
    return {
      x: coord.col * 100 + 50,
      y: coord.row * 100 + 50,
    };
  };

  const getTileTheme = (tile: BoardTile) => {
    // If it's a snake head
    if (tile.type === 'SNAKE' || tile.snakeTo !== undefined) {
      return {
        bg: 'bg-red-950/75 border-red-500/70 text-red-200',
        badge: 'bg-red-600 text-white shadow-sm',
        icon: <span className="text-xs">🐍</span>,
        label: 'Ular'
      };
    }

    // If it's a ladder foot
    if (tile.type === 'LADDER' || tile.ladderTo !== undefined) {
      return {
        bg: 'bg-emerald-950/75 border-emerald-500/70 text-emerald-200',
        badge: 'bg-emerald-500 text-slate-950 shadow-sm',
        icon: <ArrowUpRight className="w-3.5 h-3.5" />,
        label: 'Tangga'
      };
    }

    switch (tile.type) {
      case 'START':
        return {
          bg: 'bg-teal-950/90 border-teal-400 text-teal-200 ring-1 ring-teal-400/40',
          badge: 'bg-teal-400 text-slate-950 font-bold',
          icon: <Flag className="w-3.5 h-3.5" />,
          label: 'START'
        };
      case 'FINISH':
        return {
          bg: 'bg-gradient-to-br from-amber-950 via-yellow-950 to-orange-950 border-amber-400 text-amber-200 ring-2 ring-amber-400/50 shadow-xl',
          badge: 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black',
          icon: <Trophy className="w-3.5 h-3.5" />,
          label: 'FINIS'
        };
      case 'IKLAN':
        return {
          bg: 'bg-sky-950/70 border-sky-600/50 text-sky-200',
          badge: 'bg-sky-500 text-slate-950',
          icon: <Megaphone className="w-3.5 h-3.5" />,
          label: 'Iklan'
        };
      case 'SLOGAN':
        return {
          bg: 'bg-teal-950/70 border-teal-600/50 text-teal-200',
          badge: 'bg-teal-500 text-slate-950',
          icon: <Sparkles className="w-3.5 h-3.5" />,
          label: 'Slogan'
        };
      case 'POSTER':
        return {
          bg: 'bg-orange-950/70 border-orange-600/50 text-orange-200',
          badge: 'bg-orange-500 text-slate-950',
          icon: <Palette className="w-3.5 h-3.5" />,
          label: 'Poster'
        };
      case 'FAKTA_OPINI':
        return {
          bg: 'bg-violet-950/70 border-violet-600/50 text-violet-200',
          badge: 'bg-violet-500 text-white',
          icon: <Search className="w-3.5 h-3.5" />,
          label: 'Fakta/Opini'
        };
      case 'VISUAL_CASE':
        return {
          bg: 'bg-pink-950/70 border-pink-600/50 text-pink-200',
          badge: 'bg-pink-500 text-white',
          icon: <ImageIcon className="w-3.5 h-3.5" />,
          label: 'Kasus'
        };
      case 'CHANCE':
        return {
          bg: 'bg-amber-950/70 border-amber-500/60 text-amber-200',
          badge: 'bg-amber-400 text-slate-950',
          icon: <HelpCircle className="w-3.5 h-3.5" />,
          label: 'Peluang'
        };
      case 'DUEL':
        return {
          bg: 'bg-rose-950/70 border-rose-600/60 text-rose-200',
          badge: 'bg-rose-500 text-white',
          icon: <Zap className="w-3.5 h-3.5" />,
          label: 'Duel'
        };
      default:
        return {
          bg: 'bg-slate-900/70 border-slate-700/60 text-slate-200',
          badge: 'bg-slate-700 text-white',
          icon: null,
          label: 'Petak'
        };
    }
  };

  return (
    <div className="w-full bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl relative overflow-hidden">
      {/* Board Theme Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80 relative z-20">
        <div className="flex items-center gap-2.5">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <div>
            <h2 className="font-display font-extrabold text-base sm:text-lg text-white flex items-center gap-2">
              <span>Papan Ular Tangga Literasi (1 - 30)</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700 font-normal">
                Tangga Naik 🪜 · Ular Meluncur 🐍
              </span>
            </h2>
            <p className="text-[11px] text-slate-400">
              Bergerak meliuk ke atas dari Petak 1 (Bawah) menuju Puncak Finis Petak 30 (Atas)
            </p>
          </div>
        </div>

        {/* Overlay Toggle & Quick Legend */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
              showOverlays
                ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            {showOverlays ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Ular & Tangga Visual</span>
          </button>
        </div>
      </div>

      {/* Relative Container for the Board Grid and SVG overlay */}
      <div className="relative w-full">
        {/* SVG Graphic Overlay: Ladders and Snakes */}
        {showOverlays && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
            viewBox="0 0 600 500"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Ladder Rail Gradient */}
              <linearGradient id="ladderGrad" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#34d399" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>

              {/* Snake Gradient Red */}
              <linearGradient id="snakeRedGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#b91c1c" />
              </linearGradient>

              {/* Snake Gradient Magenta */}
              <linearGradient id="snakePinkGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f43f5e" />
                <stop offset="50%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#9d174d" />
              </linearGradient>

              {/* Drop Shadow filter */}
              <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.6" />
              </filter>
            </defs>

            {/* --- 1. RENDER LADDERS (Tangga) --- */}
            {LADDERS.map((ladder) => {
              const start = getCenter(ladder.from); // Foot (bottom)
              const end = getCenter(ladder.to);     // Top (higher)

              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const len = Math.hypot(dx, dy) || 1;
              const nx = -dy / len; // Perpendicular normal
              const ny = dx / len;
              const halfWidth = 8;  // Ladder width = 16px

              // Left & Right Rails
              const x1L = start.x + nx * halfWidth;
              const y1L = start.y + ny * halfWidth;
              const x2L = end.x + nx * halfWidth;
              const y2L = end.y + ny * halfWidth;

              const x1R = start.x - nx * halfWidth;
              const y1R = start.y - ny * halfWidth;
              const x2R = end.x - nx * halfWidth;
              const y2R = end.y - ny * halfWidth;

              // Rungs (Anak tangga)
              const rungCount = Math.max(4, Math.floor(len / 28));
              const rungs = [];
              for (let i = 1; i < rungCount; i++) {
                const t = i / rungCount;
                const rxL = x1L + (x2L - x1L) * t;
                const ryL = y1L + (y2L - y1L) * t;
                const rxR = x1R + (x2R - x1R) * t;
                const ryR = y1R + (y2R - y1R) * t;
                rungs.push(
                  <line
                    key={`rung-${ladder.id}-${i}`}
                    x1={rxL}
                    y1={ryL}
                    x2={rxR}
                    y2={ryR}
                    stroke="#fef08a"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                );
              }

              return (
                <g key={ladder.id} filter="url(#shadow)" opacity="0.92">
                  {/* Left Rail */}
                  <line
                    x1={x1L}
                    y1={y1L}
                    x2={x2L}
                    y2={y2L}
                    stroke="url(#ladderGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Right Rail */}
                  <line
                    x1={x1R}
                    y1={y1R}
                    x2={x2R}
                    y2={y2R}
                    stroke="url(#ladderGrad)"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  {/* Rungs */}
                  {rungs}
                </g>
              );
            })}

            {/* --- 2. RENDER SNAKES (Ular) --- */}
            {SNAKES.map((snake, sIdx) => {
              const head = getCenter(snake.from); // Head at higher tile
              const tail = getCenter(snake.to);   // Tail at lower tile

              // Calculate undulating curve points
              const mx = (head.x + tail.x) / 2;
              const my = (head.y + tail.y) / 2;
              const offset = sIdx % 2 === 0 ? 35 : -35;
              const ctrl1X = head.x + (sIdx % 2 === 0 ? offset : -offset);
              const ctrl1Y = (head.y + my) / 2;
              const ctrl2X = tail.x + (sIdx % 2 === 0 ? -offset : offset);
              const ctrl2Y = (tail.y + my) / 2;

              const pathData = `M ${head.x} ${head.y} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${tail.x} ${tail.y}`;
              const gradId = sIdx % 2 === 0 ? 'url(#snakeRedGrad)' : 'url(#snakePinkGrad)';

              return (
                <g key={snake.id} filter="url(#shadow)" opacity="0.94">
                  {/* Snake Body Outline / Glow */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#1e293b"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Snake Body Core */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={gradId}
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Snake Belly Scales / Striped Dots */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#fef08a"
                    strokeWidth="3.5"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    opacity="0.85"
                  />

                  {/* Snake Tail (Pointy end) */}
                  <circle cx={tail.x} cy={tail.y} r="4" fill="#ef4444" />

                  {/* Snake Head (At higher square) */}
                  <g transform={`translate(${head.x}, ${head.y})`}>
                    {/* Forked Tongue */}
                    <path
                      d="M 0 -12 L 0 -18 L -3 -22 M 0 -18 L 3 -22"
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    {/* Head Oval */}
                    <ellipse cx="0" cy="-3" rx="10" ry="12" fill={gradId} stroke="#7f1d1d" strokeWidth="1.5" />
                    {/* Eyes */}
                    <circle cx="-4" cy="-5" r="2.5" fill="#ffffff" />
                    <circle cx="-4" cy="-5" r="1.2" fill="#000000" />
                    <circle cx="4" cy="-5" r="2.5" fill="#ffffff" />
                    <circle cx="4" cy="-5" r="1.2" fill="#000000" />
                    {/* Nostrils */}
                    <circle cx="-1.5" cy="-10" r="0.7" fill="#450a0a" />
                    <circle cx="1.5" cy="-10" r="0.7" fill="#450a0a" />
                  </g>
                </g>
              );
            })}
          </svg>
        )}

        {/* 6x5 Grid of Tiles (Winding from Bottom to Top) */}
        <div className="space-y-2 sm:space-y-2.5 relative z-10">
          {rows.map((rowTileNums, rIdx) => {
            return (
              <div key={rIdx} className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {rowTileNums.map((tileIndex) => {
                  const tile = BOARD_TILES.find(t => t.index === tileIndex) || BOARD_TILES[tileIndex - 1];
                  const theme = getTileTheme(tile);
                  const playersOnTile = players.filter(p => p.position === tileIndex);

                  // Is this tile a snake head or tail?
                  const snakeHere = SNAKES.find(s => s.from === tileIndex);
                  const snakeTailHere = SNAKES.find(s => s.to === tileIndex);
                  // Is this tile a ladder foot or top?
                  const ladderHere = LADDERS.find(l => l.from === tileIndex);
                  const ladderTopHere = LADDERS.find(l => l.to === tileIndex);

                  return (
                    <div
                      key={tileIndex}
                      onClick={() => onTileClick?.(tile)}
                      className={`relative min-h-[96px] sm:min-h-[110px] rounded-xl border p-2 flex flex-col justify-between transition-all cursor-pointer group hover:scale-[1.03] hover:z-25 ${theme.bg} ${
                        tile.type === 'START' ? 'shadow-lg shadow-teal-500/20' : ''
                      } ${tile.type === 'FINISH' ? 'shadow-xl shadow-amber-500/25 ring-2 ring-amber-400' : ''}`}
                      title={`Petak #${tile.index}: ${tile.title} (${tile.description})`}
                    >
                      {/* Top Header: Tile Number & Badge */}
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-white bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-800">
                          {tile.index}
                        </span>

                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 ${theme.badge}`}>
                          {theme.icon}
                          <span className="hidden md:inline">{theme.label}</span>
                        </span>
                      </div>

                      {/* Tile Title & Ular/Tangga Action Indicators */}
                      <div className="my-1">
                        <p className="text-[10px] sm:text-xs font-bold leading-tight line-clamp-2 text-white">
                          {tile.title}
                        </p>

                        {/* Tangga naik indicator */}
                        {ladderHere && (
                          <div className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5 mt-0.5 bg-emerald-950/80 px-1 rounded border border-emerald-800/60">
                            <ArrowUpRight className="w-2.5 h-2.5" />
                            <span>Naik ke #{ladderHere.to}</span>
                          </div>
                        )}

                        {/* Puncak tangga indicator */}
                        {ladderTopHere && (
                          <div className="text-[8px] font-semibold text-emerald-300 flex items-center gap-0.5 mt-0.5 opacity-80">
                            <span>🪜 Puncak Tangga</span>
                          </div>
                        )}

                        {/* Kepala Ular indicator */}
                        {snakeHere && (
                          <div className="text-[9px] font-bold text-red-400 flex items-center gap-0.5 mt-0.5 bg-red-950/80 px-1 rounded border border-red-800/60 animate-pulse">
                            <ArrowDownRight className="w-2.5 h-2.5" />
                            <span>Ular! Meluncur #{snakeHere.to}</span>
                          </div>
                        )}

                        {/* Ekor Ular indicator */}
                        {snakeTailHere && (
                          <div className="text-[8px] font-semibold text-red-300 flex items-center gap-0.5 mt-0.5 opacity-80">
                            <span>🐾 Ekor Ular</span>
                          </div>
                        )}
                      </div>

                      {/* Player Tokens Sitting on this Tile */}
                      <div className="min-h-[22px] flex items-center gap-1 flex-wrap pt-1 border-t border-slate-800/60">
                        {playersOnTile.length === 0 ? (
                          <div className="h-4" />
                        ) : (
                          playersOnTile.map((player) => {
                            const isActive = players[activePlayerIndex]?.id === player.id;
                            return (
                              <div
                                key={player.id}
                                className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-black text-white shadow-md transition-all ${
                                  isActive
                                    ? 'ring-2 ring-white scale-125 shadow-lg animate-bounce z-30'
                                    : 'opacity-90'
                                }`}
                                style={{ backgroundColor: player.avatar.color }}
                                title={`${player.name} (${player.avatar.name})`}
                              >
                                {player.name.charAt(0).toUpperCase()}
                              </div>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
