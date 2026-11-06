/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { HeaderNav } from './components/HeaderNav';
import { PlayerSetup } from './components/PlayerSetup';
import { GameBoard } from './components/GameBoard';
import { DiceRoller } from './components/DiceRoller';
import { LeaderboardPanel } from './components/LeaderboardPanel';
import { QuizModal } from './components/QuizModal';
import { ChanceCardModal } from './components/ChanceCardModal';
import { DuelModal } from './components/DuelModal';
import { VictoryModal } from './components/VictoryModal';
import { LearningModuleModal } from './components/LearningModuleModal';
import { QuestionBankModal } from './components/QuestionBankModal';
import { RulesModal } from './components/RulesModal';
import { BOARD_TILES, CHANCE_CARDS, INITIAL_QUESTIONS } from './data/questionsData';
import { BoardTile, ChanceCard, GameSettings, Player, Question } from './types/game';
import { playSound } from './utils/audio';
import { MessageSquare, Sparkles, BookOpen, AlertCircle, ArrowUpRight, ArrowDownRight, Flag } from 'lucide-react';

export default function App() {
  const [gamePhase, setGamePhase] = useState<'SETUP' | 'PLAYING' | 'VICTORY'>('SETUP');
  const [currentTab, setCurrentTab] = useState<'GAME' | 'MODULE' | 'QUESTIONS' | 'RULES'>('GAME');
  
  const [settings, setSettings] = useState<GameSettings>({
    timerSeconds: 30,
    soundEnabled: true,
    presentationMode: false,
  });

  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [diceValue, setDiceValue] = useState<number>(1);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [canRoll, setCanRoll] = useState<boolean>(true);
  const [roundNumber, setRoundNumber] = useState<number>(1);

  // Question & Card Modals
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTIONS);
  const [activeQuestion, setActiveQuestion] = useState<Question | null>(null);
  const [activeChanceCard, setActiveChanceCard] = useState<ChanceCard | null>(null);
  const [activeDuel, setActiveDuel] = useState<boolean>(false);
  const [activeTileDetail, setActiveTileDetail] = useState<BoardTile | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);

  // Live game ticker log
  const [gameLogs, setGameLogs] = useState<string[]>([
    'Selamat datang di Papan Juara Bahasa! Siapkan regumu untuk menguasai materi iklan, slogan, dan poster.'
  ]);

  const addLog = useCallback((msg: string) => {
    setGameLogs(prev => [msg, ...prev.slice(0, 15)]);
  }, []);

  // Handle Game Start
  const handleStartGame = (configuredPlayers: Player[], gameSettings: GameSettings) => {
    setPlayers(configuredPlayers);
    setSettings(gameSettings);
    setActivePlayerIndex(0);
    setDiceValue(1);
    setCanRoll(true);
    setRoundNumber(1);
    setWinner(null);
    setGamePhase('PLAYING');
    setCurrentTab('GAME');
    addLog(`Permainan dimulai dengan ${configuredPlayers.length} pemain! Giliran pertama: ${configuredPlayers[0].name}.`);
    playSound.click(gameSettings.soundEnabled);
  };

  // Turn advance helper
  const nextTurn = useCallback((extraTurn = false) => {
    setCanRoll(true);
    setIsRolling(false);
    if (!extraTurn) {
      setActivePlayerIndex(prev => {
        const nextIdx = (prev + 1) % players.length;
        if (nextIdx === 0) {
          setRoundNumber(r => r + 1);
        }
        return nextIdx;
      });
    }
  }, [players.length]);

  // Handle Dice Roll
  const handleRollDice = () => {
    if (!canRoll || isRolling || players.length === 0) return;

    setIsRolling(true);
    setCanRoll(false);
    playSound.diceRoll(settings.soundEnabled);

    setTimeout(() => {
      const rolledNumber = Math.floor(Math.random() * 6) + 1;
      setDiceValue(rolledNumber);
      setIsRolling(false);

      const currentPlayer = players[activePlayerIndex];
      const targetPos = Math.min(30, currentPlayer.position + rolledNumber);
      const targetTile = BOARD_TILES.find(t => t.index === targetPos) || BOARD_TILES[targetPos - 1];

      addLog(`${currentPlayer.name} melempar dadu: ${rolledNumber}! Melangkah ke Petak #${targetPos} (${targetTile.title}).`);
      playSound.step(settings.soundEnabled);

      // Update position
      setPlayers(prev => prev.map((p, idx) => {
        if (idx !== activePlayerIndex) return p;
        return { ...p, position: targetPos };
      }));

      // Evaluate landing tile event
      setTimeout(() => {
        processTileLanding(targetPos, targetTile, currentPlayer);
      }, 500);
    }, 700);
  };

  // Process Tile Event (Ular Tangga)
  const processTileLanding = (pos: number, tile: BoardTile, player: Player) => {
    // 1. FINISH TILE (Petak 30: Puncak Ular Tangga)
    if (pos >= 30) {
      addLog(`🎉 LUAR BIASA! ${player.name} mencapai Puncak Juara FINIS (Petak 30)! +300 Poin Kehormatan!`);
      const updatedPlayer: Player = {
        ...player,
        score: player.score + 300,
        position: 30
      };
      setPlayers(prev => prev.map(p => p.id === player.id ? updatedPlayer : p));
      setWinner(updatedPlayer);
      setGamePhase('VICTORY');
      return;
    }

    // 2. LADDER SHORTCUT (Tangga Naik)
    if (tile.ladderTo !== undefined) {
      const jumpTo = tile.ladderTo;
      addLog(`🪜 TANGGA NAIK! ${player.name} menemukan '${tile.title}' dan melesat naik ke Petak #${jumpTo}!`);
      playSound.ladder(settings.soundEnabled);
      setPlayers(prev => prev.map((p, idx) => {
        if (idx !== activePlayerIndex) return p;
        return { ...p, position: jumpTo };
      }));
      // Present question on destination tile
      const destTile = BOARD_TILES.find(t => t.index === jumpTo) || tile;
      triggerQuestionForTile(destTile);
      return;
    }

    // 3. SNAKE (Kepala Ular Meluncur Turun)
    if (tile.snakeTo !== undefined || tile.type === 'SNAKE' || tile.trapTo !== undefined) {
      const slideTo = tile.snakeTo || tile.trapTo || 1;
      addLog(`🐍 KEPALA ULAR! Awas '${tile.title}'! ${player.name} meluncur turun ke Petak #${slideTo} (Ekor Ular).`);
      playSound.snake(settings.soundEnabled);
      setPlayers(prev => prev.map((p, idx) => {
        if (idx !== activePlayerIndex) return p;
        return { ...p, position: slideTo };
      }));
      nextTurn();
      return;
    }

    // 4. CHANCE CARD TILE
    if (tile.type === 'CHANCE') {
      const randomCard = CHANCE_CARDS[Math.floor(Math.random() * CHANCE_CARDS.length)];
      setActiveChanceCard(randomCard);
      return;
    }

    // 5. DUEL TILE
    if (tile.type === 'DUEL') {
      setActiveDuel(true);
      return;
    }

    // 6. QUESTION TILES (IKLAN, SLOGAN, POSTER, FAKTA_OPINI, VISUAL_CASE)
    if (['IKLAN', 'SLOGAN', 'POSTER', 'FAKTA_OPINI', 'VISUAL_CASE'].includes(tile.type)) {
      triggerQuestionForTile(tile);
      return;
    }

    // Default / Start
    nextTurn();
  };

  // Find & Trigger Question for a specific tile
  const triggerQuestionForTile = (tile: BoardTile) => {
    const matchingQuestions = questions.filter(q => q.category === tile.type);
    const chosenQuestion = matchingQuestions.length > 0
      ? matchingQuestions[Math.floor(Math.random() * matchingQuestions.length)]
      : questions[Math.floor(Math.random() * questions.length)];

    setActiveQuestion(chosenQuestion);
  };

  // Handle Question Answer Result
  const handleAnswerComplete = (isCorrect: boolean, earnedPoints: number) => {
    const currentPlayer = players[activePlayerIndex];

    setPlayers(prev => prev.map((p, idx) => {
      if (idx !== activePlayerIndex) return p;

      const newStreak = isCorrect ? p.streak + 1 : 0;
      const highestStreak = Math.max(p.highestStreak, newStreak);
      let newScore = p.score + earnedPoints;
      let newPos = p.position;
      let hasShield = p.hasShield;

      if (!isCorrect) {
        if (hasShield) {
          hasShield = false; // Shield protects from stepping back
          addLog(`🛡️ Perisai ${p.name} aktif! Terhindar dari hukuman langkah mundur.`);
        } else {
          // Slight setback
          newPos = Math.max(1, p.position - 1);
          addLog(`${p.name} menjawab kurang tepat. Mundur 1 petak ke #${newPos}.`);
        }
      } else {
        addLog(`✅ ${p.name} menjawab benar! (+${earnedPoints} Poin).`);
      }

      // Update category-specific stats
      const stats = { ...p.stats };
      if (activeQuestion) {
        if (activeQuestion.category === 'IKLAN') {
          stats.iklanTotal += 1;
          if (isCorrect) stats.iklanCorrect += 1;
        } else if (activeQuestion.category === 'SLOGAN') {
          stats.sloganTotal += 1;
          if (isCorrect) stats.sloganCorrect += 1;
        } else if (activeQuestion.category === 'POSTER') {
          stats.posterTotal += 1;
          if (isCorrect) stats.posterCorrect += 1;
        } else if (activeQuestion.category === 'FAKTA_OPINI') {
          stats.faktaOpiniTotal += 1;
          if (isCorrect) stats.faktaOpiniCorrect += 1;
        }
      }

      return {
        ...p,
        score: Math.max(0, newScore),
        streak: newStreak,
        highestStreak,
        position: newPos,
        hasShield,
        history: [
          ...p.history,
          {
            questionId: activeQuestion?.id || 'q',
            isCorrect,
            pointsEarned: earnedPoints
          }
        ],
        stats
      };
    }));

    setActiveQuestion(null);
    nextTurn();
  };

  // Handle Chance Card Application
  const handleApplyChanceCard = () => {
    if (!activeChanceCard) return;

    const currentPlayer = players[activePlayerIndex];
    let extraTurn = false;

    setPlayers(prev => prev.map((p, idx) => {
      if (idx !== activePlayerIndex) return p;

      let newPos = p.position;
      let newScore = p.score;
      let hasShield = p.hasShield;

      switch (activeChanceCard.effectType) {
        case 'STEP_FORWARD':
          newPos = Math.min(30, p.position + activeChanceCard.value);
          addLog(`🎁 ${p.name} mendapat dorongan kreatif: Maju ${activeChanceCard.value} petak ke #${newPos}!`);
          break;
        case 'STEP_BACK':
          newPos = Math.max(1, p.position - activeChanceCard.value);
          addLog(`⚠️ ${p.name} terkena revisi: Mundur ${activeChanceCard.value} petak ke #${newPos}.`);
          break;
        case 'BONUS_POINTS':
          newScore = p.score + activeChanceCard.value;
          addLog(`🏆 ${p.name} meraih apresiasi: +${activeChanceCard.value} Poin Bonus!`);
          break;
        case 'EXTRA_TURN':
          extraTurn = true;
          addLog(`🔥 Megafon Ekstra! ${p.name} berhak melempar dadu satu kali lagi!`);
          break;
        case 'SHIELD':
          hasShield = true;
          addLog(`🛡️ ${p.name} mendapatkan Perisai Anti-Salah untuk giliran berikutnya!`);
          break;
      }

      return {
        ...p,
        position: newPos,
        score: newScore,
        hasShield
      };
    }));

    setActiveChanceCard(null);

    // If player stepped directly into finish
    if (activeChanceCard.effectType === 'STEP_FORWARD' && currentPlayer.position + activeChanceCard.value >= 30) {
      setWinner({ ...currentPlayer, position: 30 });
      setGamePhase('VICTORY');
      return;
    }

    nextTurn(extraTurn);
  };

  // Handle Duel Completion
  const handleDuelComplete = (winnerId: number, bonusPoints: number) => {
    if (winnerId > 0) {
      const winningPlayer = players.find(p => p.id === winnerId);
      if (winningPlayer) {
        addLog(`⚔️ ${winningPlayer.name} memenangkan duel adu cepat! (+${bonusPoints} Poin).`);
        setPlayers(prev => prev.map(p => {
          if (p.id === winnerId) {
            return { ...p, score: p.score + bonusPoints };
          }
          return p;
        }));
      }
    } else {
      addLog('⚔️ Hasil duel imbang! Kedua pemain tampil seimbang.');
    }

    setActiveDuel(false);
    nextTurn();
  };

  // Add custom question from teacher
  const handleAddQuestion = (newQ: Question) => {
    setQuestions(prev => [newQ, ...prev]);
    addLog(`📚 Guru menambahkan soal baru: "${newQ.prompt.slice(0, 40)}..." ke dalam bank soal.`);
  };

  // Current active player object
  const activePlayer = players[activePlayerIndex] || players[0];

  return (
    <div className={`min-h-screen bg-slate-950 text-slate-100 flex flex-col ${
      settings.presentationMode ? 'text-base lg:text-lg' : 'text-sm'
    }`}>
      {/* 3-Zone Clean Header */}
      <HeaderNav
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        soundEnabled={settings.soundEnabled}
        onToggleSound={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
        presentationMode={settings.presentationMode}
        onTogglePresentation={() => setSettings(s => ({ ...s, presentationMode: !s.presentationMode }))}
        onResetGame={() => setGamePhase('SETUP')}
        gameActive={gamePhase === 'PLAYING'}
      />

      {/* Main Body View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {gamePhase === 'SETUP' ? (
          <PlayerSetup
            onStartGame={handleStartGame}
            defaultSettings={settings}
          />
        ) : (
          <div className="space-y-6">
            {/* Round & Active Player HUD Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-bold text-amber-400">Putaran #{roundNumber}</span>
                <span className="text-slate-600">|</span>
                <span className="text-slate-300">
                  Total Pemain: <strong>{players.length} Orang</strong>
                </span>
                <span className="text-slate-600 hidden sm:inline">|</span>
                <span className="text-slate-400 hidden sm:inline">
                  Materi: Teks Iklan, Slogan, dan Poster
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentTab('MODULE')}
                  className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium flex items-center gap-1 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lihat Modul Belajar</span>
                </button>
              </div>
            </div>

            {/* Interactive 3D Dice Roller Banner */}
            {activePlayer && (
              <DiceRoller
                activePlayer={activePlayer}
                isRolling={isRolling}
                diceValue={diceValue}
                onRoll={handleRollDice}
                canRoll={canRoll}
                soundEnabled={settings.soundEnabled}
              />
            )}

            {/* Main Stage: 2-Column Split (Board on Left 70%, Leaderboard & Logs on Right 30%) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Virtual Board Game (8 Columns on desktop) */}
              <div className="lg:col-span-8 space-y-4">
                <GameBoard
                  players={players}
                  activePlayerIndex={activePlayerIndex}
                  onTileClick={(tile) => setActiveTileDetail(tile)}
                />
              </div>

              {/* Sidebar: Leaderboard & Game Activity Ticker (4 Columns on desktop) */}
              <div className="lg:col-span-4 space-y-5">
                <LeaderboardPanel
                  players={players}
                  activePlayerId={activePlayer?.id || 1}
                />

                {/* Live Play-by-Play Activity Feed */}
                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800 text-xs font-bold text-slate-300">
                    <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                    <span>Catatan Perjalanan Papan</span>
                  </div>

                  <div className="space-y-2 max-h-56 overflow-y-auto text-xs pr-1 font-sans">
                    {gameLogs.map((log, index) => (
                      <div
                        key={index}
                        className={`p-2 rounded-lg leading-relaxed ${
                          index === 0
                            ? 'bg-amber-500/10 border border-amber-500/30 text-amber-200 font-medium'
                            : 'bg-slate-900/40 text-slate-400'
                        }`}
                      >
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* QUIZ MODAL */}
      {activeQuestion && activePlayer && (
        <QuizModal
          player={activePlayer}
          question={activeQuestion}
          timerSeconds={settings.timerSeconds}
          soundEnabled={settings.soundEnabled}
          onAnswerComplete={handleAnswerComplete}
        />
      )}

      {/* CHANCE CARD MODAL */}
      {activeChanceCard && activePlayer && (
        <ChanceCardModal
          player={activePlayer}
          card={activeChanceCard}
          soundEnabled={settings.soundEnabled}
          onApplyCard={handleApplyChanceCard}
        />
      )}

      {/* DUEL MODAL */}
      {activeDuel && activePlayer && (
        <DuelModal
          challenger={activePlayer}
          allPlayers={players}
          question={questions[Math.floor(Math.random() * questions.length)]}
          soundEnabled={settings.soundEnabled}
          onDuelComplete={handleDuelComplete}
        />
      )}

      {/* VICTORY MODAL */}
      {gamePhase === 'VICTORY' && winner && (
        <VictoryModal
          players={players}
          winner={winner}
          soundEnabled={settings.soundEnabled}
          onPlayAgain={() => {
            setGamePhase('SETUP');
            setWinner(null);
          }}
        />
      )}

      {/* CURRICULUM MODULE MODAL */}
      {currentTab === 'MODULE' && (
        <LearningModuleModal onClose={() => setCurrentTab('GAME')} />
      )}

      {/* QUESTION BANK MODAL */}
      {currentTab === 'QUESTIONS' && (
        <QuestionBankModal
          questions={questions}
          onAddQuestion={handleAddQuestion}
          onClose={() => setCurrentTab('GAME')}
        />
      )}

      {/* RULES MODAL */}
      {currentTab === 'RULES' && (
        <RulesModal onClose={() => setCurrentTab('GAME')} />
      )}

      {/* TILE DETAIL POPUP (When player clicks a tile to inspect it) */}
      {activeTileDetail && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-5 shadow-2xl relative animate-scale-in">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-mono text-amber-400 font-bold">
                Petak #{activeTileDetail.index} · {activeTileDetail.type}
              </span>
              <button
                type="button"
                onClick={() => setActiveTileDetail(null)}
                className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800"
              >
                Tutup
              </button>
            </div>
            <div className="mt-3 space-y-2">
              <h4 className="font-bold text-white text-base">
                {activeTileDetail.title}
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeTileDetail.description}
              </p>
              {activeTileDetail.ladderTo !== undefined && (
                <div className="p-2 rounded bg-lime-950/60 border border-lime-800 text-lime-300 text-xs flex items-center gap-1.5">
                  <ArrowUpRight className="w-4 h-4" />
                  <span>Jalur Tangga Pintas: Langsung melesat ke Petak #{activeTileDetail.ladderTo}!</span>
                </div>
              )}
              {activeTileDetail.trapTo !== undefined && (
                <div className="p-2 rounded bg-red-950/60 border border-red-800 text-red-300 text-xs flex items-center gap-1.5">
                  <ArrowDownRight className="w-4 h-4" />
                  <span>Jebakan Typo: Terpeleset mundur ke Petak #{activeTileDetail.trapTo}.</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Clean, quiet footer */}
      <footer className="w-full border-t border-slate-900 py-4 px-6 text-center text-xs text-slate-500">
        Media Pembelajaran Interaktif Bahasa Indonesia Kelas 8 SMP · Materi Teks Iklan, Slogan, dan Poster
      </footer>
    </div>
  );
}
