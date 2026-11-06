import React from 'react';
import { Player } from '../types/game';
import { Feather, Palette, Megaphone, Search, Camera, BookOpen, Crown, Shield } from 'lucide-react';

interface PlayerPawnProps {
  player: Player;
  isActive: boolean;
  isLeader?: boolean;
  size?: 'sm' | 'md' | 'lg';
  showName?: boolean;
}

export const PlayerPawn: React.FC<PlayerPawnProps> = ({
  player,
  isActive,
  isLeader = false,
  size = 'md',
  showName = false,
}) => {
  // Mascot Icon picker
  const renderMascotIcon = () => {
    const iconClass = size === 'sm' ? 'w-2.5 h-2.5' : size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';
    switch (player.avatar.id) {
      case 'pena':
        return <Feather className={iconClass} />;
      case 'kuas':
        return <Palette className={iconClass} />;
      case 'megafon':
        return <Megaphone className={iconClass} />;
      case 'detektif':
        return <Search className={iconClass} />;
      case 'kamera':
        return <Camera className={iconClass} />;
      case 'buku':
      default:
        return <BookOpen className={iconClass} />;
    }
  };

  // Dimensions based on size
  const dim = {
    sm: {
      standee: 'w-6 h-7',
      pedestal: 'w-7 h-2',
      avatarSize: 'w-4 h-4 text-[9px]',
      badge: 'w-2.5 h-2.5 text-[7px]',
    },
    md: {
      standee: 'w-7 h-9 sm:w-8 sm:h-10',
      pedestal: 'w-8 h-2.5 sm:w-9 sm:h-3',
      avatarSize: 'w-5 h-5 sm:w-6 sm:h-6 text-[10px]',
      badge: 'w-3 h-3 text-[8px]',
    },
    lg: {
      standee: 'w-10 h-12',
      pedestal: 'w-11 h-3.5',
      avatarSize: 'w-7 h-7 text-xs',
      badge: 'w-4 h-4 text-[9px]',
    }
  }[size];

  return (
    <div className={`relative flex flex-col items-center select-none group transition-transform ${
      isActive ? 'z-30' : 'z-10 hover:z-20'
    }`}>
      {/* Floating Name Badge (When active or hovered) */}
      {(showName || isActive) && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-40 animate-fade-in">
          <div
            className={`px-1.5 py-0.5 rounded-full text-[9px] font-extrabold shadow-lg flex items-center gap-1 border ${
              isActive
                ? 'bg-amber-400 text-slate-950 border-amber-300 ring-2 ring-amber-400/50'
                : 'bg-slate-900/90 text-white border-slate-700'
            }`}
          >
            {isLeader && <Crown className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />}
            <span className="truncate max-w-[70px]">{player.name}</span>
            {isActive && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />}
          </div>
        </div>
      )}

      {/* Standee Body (Figurine) with Animation if active */}
      <div className={`relative flex flex-col items-center transition-all ${
        isActive ? 'animate-bounce' : 'group-hover:scale-110'
      }`}>
        {/* Leader Crown Badge */}
        {isLeader && (
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
            <Crown className="w-3.5 h-3.5 text-amber-300 fill-amber-400 drop-shadow" />
          </div>
        )}

        {/* Shield Icon if player has active shield */}
        {player.hasShield && (
          <div className="absolute -top-1 -right-1 z-20 bg-sky-950 rounded-full p-0.5 border border-sky-400">
            <Shield className="w-2.5 h-2.5 text-sky-400" />
          </div>
        )}

        {/* Figurine Standee Card */}
        <div
          className={`${dim.standee} rounded-t-xl rounded-b-md p-0.5 border-2 flex flex-col items-center justify-between shadow-lg relative overflow-hidden backdrop-blur-sm`}
          style={{
            backgroundColor: `${player.avatar.color}25`,
            borderColor: player.avatar.color,
            boxShadow: isActive ? `0 0 14px ${player.avatar.color}88, inset 0 0 6px rgba(255,255,255,0.4)` : '0 2px 6px rgba(0,0,0,0.5)',
          }}
        >
          {/* Glass glare line */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />

          {/* Mascot Icon Header */}
          <div
            className="w-full flex items-center justify-center text-white py-0.5 rounded-t-lg shadow-sm"
            style={{ backgroundColor: player.avatar.color }}
          >
            {renderMascotIcon()}
          </div>

          {/* Player Initial Character Circle */}
          <div className="w-full flex items-center justify-center py-0.5">
            <span className="font-display font-black text-white text-[11px] sm:text-xs leading-none drop-shadow">
              {player.name.charAt(0).toUpperCase()}
            </span>
          </div>

          {/* Player Number Mini-Badge */}
          <div className="w-full text-center bg-slate-950/70 rounded-b text-[8px] font-mono font-bold text-slate-300">
            P{player.id}
          </div>
        </div>

        {/* 3D Oval Pedestal Base (Alas Pion Berdiri) */}
        <div className="relative -mt-0.5 flex flex-col items-center">
          {/* Top of base */}
          <div
            className={`${dim.pedestal} rounded-full border border-white/40 shadow-inner`}
            style={{
              backgroundColor: player.avatar.color,
              boxShadow: `0 2px 4px rgba(0,0,0,0.6), inset 0 1px 2px rgba(255,255,255,0.6)`,
            }}
          />
          {/* Base Rim (3D thickness) */}
          <div
            className={`${dim.pedestal} h-1 rounded-full -mt-0.5 opacity-80`}
            style={{ backgroundColor: `${player.avatar.color}88` }}
          />
        </div>
      </div>

      {/* Ground Cast Shadow */}
      <div
        className={`w-7 sm:w-8 h-2 rounded-full bg-black/60 blur-[2px] transition-all -mt-1 ${
          isActive ? 'scale-75 opacity-40' : 'scale-100 opacity-70'
        }`}
      />

      {/* Active Glowing Spotlight Ring */}
      {isActive && (
        <div
          className="absolute -bottom-1 w-9 h-3 rounded-full blur-[3px] animate-pulse pointer-events-none -z-10"
          style={{ backgroundColor: player.avatar.color }}
        />
      )}
    </div>
  );
};
