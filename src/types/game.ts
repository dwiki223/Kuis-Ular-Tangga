export type CategoryType = 'IKLAN' | 'SLOGAN' | 'POSTER' | 'FAKTA_OPINI' | 'VISUAL_CASE';

export type TileType = 
  | 'START' 
  | 'IKLAN' 
  | 'SLOGAN' 
  | 'POSTER' 
  | 'FAKTA_OPINI' 
  | 'VISUAL_CASE' 
  | 'CHANCE' 
  | 'DUEL' 
  | 'LADDER' 
  | 'SNAKE' 
  | 'TYPO_TRAP' 
  | 'FINISH';

export interface SnakeConnection {
  id: string;
  from: number; // Head at higher tile
  to: number;   // Tail at lower tile
  name: string;
  color: string;
}

export interface LadderConnection {
  id: string;
  from: number; // Foot at lower tile
  to: number;   // Top at higher tile
  name: string;
  color: string;
}

export interface AvatarOption {
  id: string;
  name: string;
  role: string;
  color: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  badgeClass: string;
  icon: string;
  bio: string;
}

export interface PlayerStats {
  iklanCorrect: number;
  iklanTotal: number;
  sloganCorrect: number;
  sloganTotal: number;
  posterCorrect: number;
  posterTotal: number;
  faktaOpiniCorrect: number;
  faktaOpiniTotal: number;
}

export interface Player {
  id: number;
  name: string;
  avatar: AvatarOption;
  isBot: boolean;
  position: number;
  score: number;
  streak: number;
  highestStreak: number;
  hasShield: boolean;
  history: {
    questionId: string;
    isCorrect: boolean;
    pointsEarned: number;
  }[];
  stats: PlayerStats;
}

export interface BoardTile {
  index: number;
  type: TileType;
  title: string;
  description: string;
  ladderTo?: number; // Climbs to a higher tile
  snakeTo?: number;  // Slithers down to a lower tile
  trapTo?: number;   // Legacy fallback
}

export interface Question {
  id: string;
  category: CategoryType;
  difficulty: 'MUDAH' | 'SEDANG' | 'SULIT';
  prompt: string;
  subPrompt?: string;
  image?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  curriculumRef: string;
}

export interface ChanceCard {
  id: string;
  title: string;
  description: string;
  effectType: 'STEP_FORWARD' | 'STEP_BACK' | 'BONUS_POINTS' | 'EXTRA_TURN' | 'SHIELD';
  value: number;
  icon: string;
}

export interface GameSettings {
  timerSeconds: number; // 0 for no timer, or 15, 30, 45
  soundEnabled: boolean;
  presentationMode: boolean; // High contrast large font for projector
}
