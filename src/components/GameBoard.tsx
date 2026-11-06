import React, { useState } from 'react';
import { BOARD_TILES, LADDERS, SNAKES } from '../data/questionsData';
import { BoardTile, Player, TileType } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
import { 
  Megaphone, Sparkles, Palette, Search, Image as ImageIcon, 
  HelpCircle, Zap, ArrowUpRight, ArrowDownRight, Flag, Trophy,
  Eye, EyeOff, Crown, Compass
} from 'lucide-react';

interface GameBoardProps {
  players: Player[];
  activePlayerIndex: number;
  onTileClick?: (tile: BoardTile) => void;
}

// 6 columns x 5 rows grid coordinates for Petak 1 to 30
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

  // Highest score player gets the crown
  const highestScore = Math.max(...players.map(p => p.score), 0);
  const leaderId = highestScore > 0 ? players.find(p => p.score === highestScore)?.id : null;

  // 5 rows rendered from top (Row 0) to bottom (Row 4)
  const rows = [
    [25, 26, 27, 28, 29, 30], // Row 0 (Topmost: 25 -> 30 FINIS)
    [24, 23, 22, 21, 20, 19], // Row 1 (24 <- 19)
    [13, 14, 15, 16, 17, 18], // Row 2 (13 -> 18)
    [12, 11, 10, 9, 8, 7],    // Row 3 (12 <- 7)
    [1, 2, 3, 4, 5, 6],       // Row 4 (Bottom: 1 START -> 6)
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
    // START Tile (Petak 1)
    if (tile.type === 'START') {
      return {
        bg: 'bg-gradient-to-br from-emerald-100 via-teal-50 to-emerald-200 border-2 border-emerald-500 shadow-md text-emerald-950',
        badge: 'bg-emerald-600 text-white font-black',
        accentBar: 'bg-emerald-500',
        icon: <Flag className="w-3.5 h-3.5 text-white" />,
        label: 'MULAI'
      };
    }

    // FINISH Tile (Petak 30)
    if (tile.type === 'FINISH') {
      return {
        bg: 'bg-gradient-to-br from-yellow-200 via-amber-300 to-orange-200 border-2 border-amber-500 text-amber-950 shadow-xl ring-2 ring-amber-400',
        badge: 'bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 text-slate-950 font-black',
        accentBar: 'bg-amber-400',
        icon: <Trophy className="w-3.5 h-3.5 text-slate-950" />,
        label: 'FINIS 🏆'
      };
    }

    // SNAKE HEAD TILE
    if (tile.type === 'SNAKE' || tile.snakeTo !== undefined) {
      return {
        bg: 'bg-gradient-to-br from-rose-100 via-red-50 to-rose-200 border-2 border-rose-400 shadow-md text-rose-950',
        badge: 'bg-rose-600 text-white font-bold',
        accentBar: 'bg-rose-500',
        icon: <span className="text-xs">🐍</span>,
        label: 'Awas Ular'
      };
    }

    // LADDER FOOT TILE
    if (tile.type === 'LADDER' || tile.ladderTo !== undefined) {
      return {
        bg: 'bg-gradient-to-br from-emerald-100 via-lime-50 to-teal-100 border-2 border-emerald-500 shadow-md text-emerald-950',
        badge: 'bg-emerald-600 text-white font-bold',
        accentBar: 'bg-emerald-500',
        icon: <ArrowUpRight className="w-3.5 h-3.5 text-white" />,
        label: 'Naik Tangga'
      };
    }

    switch (tile.type) {
      case 'IKLAN':
        return {
          bg: 'bg-gradient-to-br from-sky-100 via-blue-50 to-cyan-100 border-2 border-sky-400 shadow-sm text-sky-950',
          badge: 'bg-sky-600 text-white font-bold',
          accentBar: 'bg-sky-500',
          icon: <Megaphone className="w-3.5 h-3.5 text-white" />,
          label: 'Iklan'
        };
      case 'SLOGAN':
        return {
          bg: 'bg-gradient-to-br from-teal-100 via-emerald-50 to-cyan-100 border-2 border-teal-400 shadow-sm text-teal-950',
          badge: 'bg-teal-600 text-white font-bold',
          accentBar: 'bg-teal-500',
          icon: <Sparkles className="w-3.5 h-3.5 text-white" />,
          label: 'Slogan'
        };
      case 'POSTER':
        return {
          bg: 'bg-gradient-to-br from-amber-100 via-orange-50 to-amber-200 border-2 border-orange-400 shadow-sm text-orange-950',
          badge: 'bg-orange-500 text-white font-bold',
          accentBar: 'bg-orange-500',
          icon: <Palette className="w-3.5 h-3.5 text-white" />,
          label: 'Poster'
        };
      case 'FAKTA_OPINI':
        return {
          bg: 'bg-gradient-to-br from-purple-100 via-violet-50 to-fuchsia-100 border-2 border-purple-400 shadow-sm text-purple-950',
          badge: 'bg-purple-600 text-white font-bold',
          accentBar: 'bg-purple-500',
          icon: <Search className="w-3.5 h-3.5 text-white" />,
          label: 'Fakta/Opini'
        };
      case 'VISUAL_CASE':
        return {
          bg: 'bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 border-2 border-pink-400 shadow-sm text-pink-950',
          badge: 'bg-pink-600 text-white font-bold',
          accentBar: 'bg-pink-500',
          icon: <ImageIcon className="w-3.5 h-3.5 text-white" />,
          label: 'Studi Kasus'
        };
      case 'CHANCE':
        return {
          bg: 'bg-gradient-to-br from-yellow-100 via-amber-50 to-yellow-200 border-2 border-yellow-500 shadow-sm text-amber-950',
          badge: 'bg-amber-500 text-slate-950 font-bold',
          accentBar: 'bg-yellow-400',
          icon: <HelpCircle className="w-3.5 h-3.5 text-slate-950" />,
          label: 'Peluang'
        };
      case 'DUEL':
        return {
          bg: 'bg-gradient-to-br from-rose-100 via-red-50 to-rose-200 border-2 border-rose-500 shadow-sm text-rose-950',
          badge: 'bg-rose-600 text-white font-bold',
          accentBar: 'bg-rose-500',
          icon: <Zap className="w-3.5 h-3.5 text-white" />,
          label: 'Duel Cepat'
        };
      default:
        return {
          bg: 'bg-slate-50 border-2 border-slate-300 text-slate-900',
          badge: 'bg-slate-600 text-white',
          accentBar: 'bg-slate-400',
          icon: null,
          label: 'Petak'
        };
    }
  };

  // Direction indicator for winding path
  const getDirectionArrow = (tileNum: number) => {
    // Turn points
    if (tileNum === 6) return '↑ Naik ke #7';
    if (tileNum === 12) return '↑ Naik ke #13';
    if (tileNum === 18) return '↑ Naik ke #19';
    if (tileNum === 24) return '↑ Naik ke #25';
    if (tileNum === 30) return '🏆 JUARA';
    // Row 4: 1-5 ->
    if (tileNum >= 1 && tileNum <= 5) return '→';
    // Row 3: 7-11 <-
    if (tileNum >= 7 && tileNum <= 11) return '←';
    // Row 2: 13-17 ->
    if (tileNum >= 13 && tileNum <= 17) return '→';
    // Row 1: 19-23 <-
    if (tileNum >= 19 && tileNum <= 23) return '←';
    // Row 0: 25-29 ->
    if (tileNum >= 25 && tileNum <= 29) return '→';
    return '';
  };

  return (
    <div className="w-full bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 border-4 border-amber-400 rounded-3xl p-3 sm:p-6 shadow-2xl relative overflow-hidden ring-4 ring-amber-300/50">
      {/* Decorative Wood-Trim Board Edge & Brass Corner Studs */}
      <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 shadow-md border border-yellow-200 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 shadow-md border border-yellow-200 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 shadow-md border border-yellow-200 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-gradient-to-br from-yellow-300 via-amber-400 to-amber-600 shadow-md border border-yellow-200 pointer-events-none" />

      {/* Deluxe Board Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-amber-300/80 relative z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-400 to-rose-400 flex items-center justify-center text-slate-950 font-black shadow-md">
            <Compass className="w-5 h-5 text-slate-950" />
          </div>
          <div>
            <h2 className="font-display font-black text-base sm:text-xl text-slate-900 tracking-tight flex items-center gap-2">
              <span>Arena Ular Tangga Bahasa Indonesia</span>
              <span className="hidden sm:inline-block text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-sm border border-amber-500">
                EDISI DELUXE SMP KELAS 8
              </span>
            </h2>
            <div className="flex items-center gap-3 text-xs mt-0.5 font-medium">
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <span>🪜 4 Tangga Prestasi</span>
              </span>
              <span className="text-amber-400 font-black">·</span>
              <span className="text-rose-600 font-bold flex items-center gap-1">
                <span>🐍 4 Ular Peluncur</span>
              </span>
              <span className="text-amber-400 font-black">·</span>
              <span className="text-amber-800 font-extrabold">
                🏁 Menuju Puncak Petak 30
              </span>
            </div>
          </div>
        </div>

        {/* Visual Overlay Toggle Switch */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowOverlays(!showOverlays)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              showOverlays
                ? 'bg-amber-400 text-slate-950 border-amber-500 shadow-amber-400/30 hover:bg-amber-300'
                : 'bg-white border-amber-200 text-slate-600 hover:text-slate-900'
            }`}
          >
            {showOverlays ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showOverlays ? 'Visual Ular & Tangga (Aktif)' : 'Sembunyikan Visual'}</span>
          </button>
        </div>
      </div>

      {/* Main Board Arena (Grid + SVG Overlay) */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-amber-300/80 bg-white shadow-xl p-2 sm:p-3">
        {/* SVG Graphic Overlay: Realistic 3D Ladders and Curving Snakes */}
        {showOverlays && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none z-15"
            viewBox="0 0 600 500"
            preserveAspectRatio="none"
          >
            <defs>
              {/* Wood Ladder Shading */}
              <linearGradient id="ladderWood" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="35%" stopColor="#d97706" />
                <stop offset="70%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>

              {/* Gold Rung Gradient */}
              <linearGradient id="rungGold" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stopColor="#b45309" />
                <stop offset="50%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#ca8a04" />
              </linearGradient>

              {/* Snake 1 Gradient (Ruby Red) */}
              <linearGradient id="snakeRuby" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#dc2626" />
                <stop offset="50%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#991b1b" />
              </linearGradient>

              {/* Snake 2 Gradient (Emerald Viper) */}
              <linearGradient id="snakeEmerald" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#065f46" />
              </linearGradient>

              {/* Snake 3 Gradient (Amethyst Purple) */}
              <linearGradient id="snakePurple" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#581c87" />
              </linearGradient>

              {/* Snake 4 Gradient (Coral Orange) */}
              <linearGradient id="snakeCoral" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#ea580c" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#c2410c" />
              </linearGradient>

              {/* Drop Shadow filter */}
              <filter id="boardShadow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.25" />
              </filter>
            </defs>

            {/* --- 1. RENDER LADDERS (Tangga Kayu & Emas) --- */}
            {LADDERS.map((ladder) => {
              const start = getCenter(ladder.from); // Foot (bawah)
              const end = getCenter(ladder.to);     // Top (atas)

              const dx = end.x - start.x;
              const dy = end.y - start.y;
              const len = Math.hypot(dx, dy) || 1;
              const nx = -dy / len;
              const ny = dx / len;
              const halfWidth = 9; // Width 18px

              // Left & Right Rails
              const x1L = start.x + nx * halfWidth;
              const y1L = start.y + ny * halfWidth;
              const x2L = end.x + nx * halfWidth;
              const y2L = end.y + ny * halfWidth;

              const x1R = start.x - nx * halfWidth;
              const y1R = start.y - ny * halfWidth;
              const x2R = end.x - nx * halfWidth;
              const y2R = end.y - ny * halfWidth;

              // Rungs
              const rungCount = Math.max(4, Math.floor(len / 26));
              const rungs = [];
              for (let i = 1; i < rungCount; i++) {
                const t = i / rungCount;
                const rxL = x1L + (x2L - x1L) * t;
                const ryL = y1L + (y2L - y1L) * t;
                const rxR = x1R + (x2R - x1R) * t;
                const ryR = y1R + (y2R - y1R) * t;
                rungs.push(
                  <g key={`rung-${ladder.id}-${i}`}>
                    {/* Shadow underneath rung */}
                    <line
                      x1={rxL}
                      y1={ryL + 2}
                      x2={rxR}
                      y2={ryR + 2}
                      stroke="#000000"
                      strokeWidth="4"
                      strokeLinecap="round"
                      opacity="0.4"
                    />
                    {/* Main Rung */}
                    <line
                      x1={rxL}
                      y1={ryL}
                      x2={rxR}
                      y2={ryR}
                      stroke="url(#rungGold)"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </g>
                );
              }

              return (
                <g key={ladder.id} filter="url(#boardShadow)" opacity="0.95">
                  {/* Ladder Cast Shadow */}
                  <line
                    x1={x1L + 3}
                    y1={y1L + 4}
                    x2={x2L + 3}
                    y2={y2L + 4}
                    stroke="#000000"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.3"
                  />
                  <line
                    x1={x1R + 3}
                    y1={y1R + 4}
                    x2={x2R + 3}
                    y2={y2R + 4}
                    stroke="#000000"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.3"
                  />

                  {/* Left Rail */}
                  <line
                    x1={x1L}
                    y1={y1L}
                    x2={x2L}
                    y2={y2L}
                    stroke="url(#ladderWood)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Right Rail */}
                  <line
                    x1={x1R}
                    y1={y1R}
                    x2={x2R}
                    y2={y2R}
                    stroke="url(#ladderWood)"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  {/* Top & Bottom Metal Caps */}
                  <circle cx={x1L} cy={y1L} r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx={x1R} cy={y1R} r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx={x2L} cy={y2L} r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
                  <circle cx={x2R} cy={y2R} r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />

                  {/* Rungs */}
                  {rungs}
                </g>
              );
            })}

            {/* --- 2. RENDER SNAKES (Ular Meliuk 3D) --- */}
            {SNAKES.map((snake, sIdx) => {
              const head = getCenter(snake.from); // Head at higher square
              const tail = getCenter(snake.to);   // Tail at lower square

              const offset = sIdx % 2 === 0 ? 42 : -42;
              const my = (head.y + tail.y) / 2;
              const ctrl1X = head.x + offset;
              const ctrl1Y = (head.y + my) / 2;
              const ctrl2X = tail.x - offset;
              const ctrl2Y = (tail.y + my) / 2;

              const pathData = `M ${head.x} ${head.y} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${tail.x} ${tail.y}`;

              const snakeGradients = [
                'url(#snakeRuby)',
                'url(#snakeEmerald)',
                'url(#snakePurple)',
                'url(#snakeCoral)',
              ];
              const gradId = snakeGradients[sIdx % snakeGradients.length];

              return (
                <g key={snake.id} filter="url(#boardShadow)" opacity="0.96">
                  {/* Snake Shadow */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#000000"
                    strokeWidth="16"
                    strokeLinecap="round"
                    opacity="0.4"
                    transform="translate(3, 5)"
                  />

                  {/* Outer Rim Dark Border */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#0f172a"
                    strokeWidth="15"
                    strokeLinecap="round"
                  />

                  {/* Vibrant Snake Skin Body */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke={gradId}
                    strokeWidth="11"
                    strokeLinecap="round"
                  />

                  {/* Golden Belly Scales Pattern */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#fef08a"
                    strokeWidth="3.5"
                    strokeDasharray="4 9"
                    strokeLinecap="round"
                    opacity="0.9"
                  />

                  {/* Curled Pointy Snake Tail */}
                  <circle cx={tail.x} cy={tail.y} r="5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1.5" />

                  {/* Character Snake Head (At higher square) */}
                  <g transform={`translate(${head.x}, ${head.y})`}>
                    {/* Forked Flicking Red Tongue */}
                    <path
                      d="M 0 -10 L 0 -17 L -4 -22 M 0 -17 L 4 -22"
                      fill="none"
                      stroke="#ef4444"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Head Ellipse */}
                    <ellipse cx="0" cy="-2" rx="12" ry="14" fill={gradId} stroke="#0f172a" strokeWidth="2" />

                    {/* Big Cute Expressive Eyes */}
                    <circle cx="-5" cy="-4" r="3.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
                    <circle cx="-5" cy="-4.5" r="1.8" fill="#000000" />
                    <circle cx="-6" cy="-5.5" r="0.8" fill="#ffffff" /> {/* Eye light shine */}

                    <circle cx="5" cy="-4" r="3.5" fill="#ffffff" stroke="#0f172a" strokeWidth="1" />
                    <circle cx="5" cy="-4.5" r="1.8" fill="#000000" />
                    <circle cx="4" cy="-5.5" r="0.8" fill="#ffffff" /> {/* Eye light shine */}

                    {/* Nostrils */}
                    <circle cx="-2" cy="-9" r="0.8" fill="#450a0a" />
                    <circle cx="2" cy="-9" r="0.8" fill="#450a0a" />
                  </g>
                </g>
              );
            })}
          </svg>
        )}

        {/* 6x5 Grid of Deluxe Tiles (1 to 30) */}
        <div className="space-y-2 sm:space-y-2.5 relative z-10">
          {rows.map((rowTileNums, rIdx) => {
            return (
              <div key={rIdx} className="grid grid-cols-6 gap-2 sm:gap-2.5">
                {rowTileNums.map((tileIndex) => {
                  const tile = BOARD_TILES.find(t => t.index === tileIndex) || BOARD_TILES[tileIndex - 1];
                  const theme = getTileTheme(tile);
                  const playersOnTile = players.filter(p => p.position === tileIndex);

                  // Snake / Ladder relationships
                  const snakeHere = SNAKES.find(s => s.from === tileIndex);
                  const snakeTailHere = SNAKES.find(s => s.to === tileIndex);
                  const ladderHere = LADDERS.find(l => l.from === tileIndex);
                  const ladderTopHere = LADDERS.find(l => l.to === tileIndex);

                  const dirArrow = getDirectionArrow(tileIndex);

                  return (
                    <div
                      key={tileIndex}
                      onClick={() => onTileClick?.(tile)}
                      className={`relative min-h-[105px] sm:min-h-[120px] rounded-2xl border-2 p-2 sm:p-2.5 flex flex-col justify-between transition-all cursor-pointer group hover:scale-[1.03] hover:z-25 overflow-hidden ${theme.bg} ${
                        tile.type === 'START' ? 'ring-2 ring-teal-400/60' : ''
                      } ${tile.type === 'FINISH' ? 'ring-2 ring-amber-400' : ''}`}
                      title={`Petak #${tile.index}: ${tile.title} - ${tile.description}`}
                    >
                      {/* Top Glowing Color Accent Bar */}
                      <div className={`absolute top-0 left-0 right-0 h-1 ${theme.accentBar} opacity-90`} />

                      {/* Header Row: Circular Coin Number & Badge & Direction Flow */}
                      <div className="flex items-center justify-between gap-1 relative z-10">
                        {/* Deluxe Bright Gold Coin Number Badge */}
                        <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-yellow-300 via-amber-300 to-amber-400 border border-amber-500 shadow-sm flex items-center justify-center">
                          <span className="font-display font-black text-xs sm:text-sm text-slate-950">
                            {tile.index}
                          </span>
                        </div>

                        {/* Direction Arrow */}
                        {dirArrow && (
                          <span className="text-[10px] font-mono font-black text-amber-800/80 group-hover:text-amber-950 transition-colors">
                            {dirArrow}
                          </span>
                        )}

                        {/* Category Badge */}
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-1 shadow-sm ${theme.badge}`}>
                          {theme.icon}
                          <span className="hidden lg:inline">{theme.label}</span>
                        </span>
                      </div>

                      {/* Middle: Title & Action Banners */}
                      <div className="my-1 relative z-10">
                        <p className="text-[11px] sm:text-xs font-black leading-snug line-clamp-2 text-slate-900">
                          {tile.title}
                        </p>

                        {/* Tangga Naik Indicator Badge */}
                        {ladderHere && (
                          <div className="text-[9px] font-black text-white flex items-center gap-1 mt-1 bg-emerald-600 px-1.5 py-0.5 rounded-md border border-emerald-500 shadow-sm animate-pulse">
                            <ArrowUpRight className="w-3 h-3 text-white" />
                            <span>Naik #{ladderHere.to}</span>
                          </div>
                        )}

                        {/* Puncak Tangga */}
                        {ladderTopHere && (
                          <div className="text-[8px] font-bold text-emerald-800 flex items-center gap-0.5 mt-0.5">
                            <span>🪜 Puncak Tangga</span>
                          </div>
                        )}

                        {/* Kepala Ular Indicator Badge */}
                        {snakeHere && (
                          <div className="text-[9px] font-black text-white flex items-center gap-1 mt-1 bg-rose-600 px-1.5 py-0.5 rounded-md border border-rose-500 shadow-sm animate-pulse">
                            <ArrowDownRight className="w-3 h-3 text-white" />
                            <span>Ular! Meluncur #{snakeHere.to}</span>
                          </div>
                        )}

                        {/* Ekor Ular */}
                        {snakeTailHere && (
                          <div className="text-[8px] font-bold text-rose-800 flex items-center gap-0.5 mt-0.5">
                            <span>🐾 Ekor Ular</span>
                          </div>
                        )}
                      </div>

                      {/* Bottom: 3D Pawns Sitting on this Tile */}
                      <div className="min-h-[32px] sm:min-h-[38px] flex items-end justify-center gap-1.5 flex-wrap pt-1 border-t border-slate-300/70 relative z-20">
                        {playersOnTile.length === 0 ? (
                          <div className="h-4" />
                        ) : (
                          playersOnTile.map((player) => {
                            const isActive = players[activePlayerIndex]?.id === player.id;
                            const isLeader = player.id === leaderId;
                            return (
                              <PlayerPawn
                                key={player.id}
                                player={player}
                                isActive={isActive}
                                isLeader={isLeader}
                                size={playersOnTile.length > 2 ? 'sm' : 'md'}
                                showName={isActive}
                              />
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
