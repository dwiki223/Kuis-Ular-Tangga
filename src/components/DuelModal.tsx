import React, { useState, useEffect } from 'react';
import { Player, Question } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
import { playSound } from '../utils/audio';
import { Zap, Swords, Trophy, Clock, CheckCircle2, XCircle } from 'lucide-react';

interface DuelModalProps {
  challenger: Player;
  allPlayers: Player[];
  question: Question;
  soundEnabled: boolean;
  onDuelComplete: (winnerId: number, bonusPoints: number) => void;
}

export const DuelModal: React.FC<DuelModalProps> = ({
  challenger,
  allPlayers,
  question,
  soundEnabled,
  onDuelComplete,
}) => {
  // Select opponent: defaults to highest score player other than challenger
  const opponents = allPlayers.filter(p => p.id !== challenger.id);
  const [opponentId, setOpponentId] = useState<number>(opponents[0]?.id || 1);
  const opponent = allPlayers.find(p => p.id === opponentId) || opponents[0];

  const [step, setStep] = useState<'MATCH' | 'BATTLE' | 'RESULT'>('MATCH');
  const [challengerChoice, setChallengerChoice] = useState<number | null>(null);
  const [opponentChoice, setOpponentChoice] = useState<number | null>(null);
  const [winner, setWinner] = useState<Player | null>(null);

  // Bot auto-selection in duel
  useEffect(() => {
    if (step === 'BATTLE') {
      if (opponent.isBot && opponentChoice === null) {
        const timer = setTimeout(() => {
          const isCorrect = Math.random() < 0.75;
          setOpponentChoice(isCorrect ? question.correctAnswerIndex : (question.correctAnswerIndex + 1) % 4);
        }, 1800);
        return () => clearTimeout(timer);
      }
    }
  }, [step, opponent.isBot, opponentChoice, question.correctAnswerIndex]);

  // Challenger bot auto-selection
  useEffect(() => {
    if (step === 'BATTLE') {
      if (challenger.isBot && challengerChoice === null) {
        const timer = setTimeout(() => {
          const isCorrect = Math.random() < 0.8;
          setChallengerChoice(isCorrect ? question.correctAnswerIndex : (question.correctAnswerIndex + 2) % 4);
        }, 1400);
        return () => clearTimeout(timer);
      }
    }
  }, [step, challenger.isBot, challengerChoice, question.correctAnswerIndex]);

  // Evaluate duel result when choices are made
  useEffect(() => {
    if (challengerChoice !== null && opponentChoice !== null && step === 'BATTLE') {
      const challengerCorrect = challengerChoice === question.correctAnswerIndex;
      const opponentCorrect = opponentChoice === question.correctAnswerIndex;

      let winningPlayer: Player | null = null;
      if (challengerCorrect && !opponentCorrect) {
        winningPlayer = challenger;
      } else if (!challengerCorrect && opponentCorrect) {
        winningPlayer = opponent;
      } else if (challengerCorrect && opponentCorrect) {
        // Both correct: challenger advantage
        winningPlayer = challenger;
      } else {
        winningPlayer = null; // Draw
      }

      setWinner(winningPlayer);
      setStep('RESULT');
      if (winningPlayer) {
        playSound.victory(soundEnabled);
      } else {
        playSound.wrong(soundEnabled);
      }
    }
  }, [challengerChoice, opponentChoice, step, challenger, opponent, question.correctAnswerIndex, soundEnabled]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border-2 border-rose-400 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-auto animate-scale-in">
        {/* Header */}
        <div className="text-center pb-4 border-b border-rose-200">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-100 text-rose-800 border border-rose-300 mb-2">
            <Swords className="w-3.5 h-3.5 text-rose-600" /> ARENA DUEL CEPAT BAHASA
          </div>
          <h3 className="text-xl font-display font-black text-slate-900">
            Tantangan Adu Cepat: +200 Poin Taruhan!
          </h3>
        </div>

        {step === 'MATCH' && (
          <div className="py-6 space-y-6 text-center">
            <div className="flex items-center justify-center gap-6">
              {/* Challenger Figurine */}
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-2xl bg-rose-50 border-2 border-rose-300 shadow-md">
                  <PlayerPawn player={challenger} isActive={true} size="lg" />
                </div>
                <div className="font-black text-slate-900 text-sm">{challenger.name}</div>
                <span className="text-[11px] text-rose-700 font-black">Penantang</span>
              </div>

              <div className="font-display font-black text-3xl text-rose-600 italic">
                VS
              </div>

              {/* Opponent Selection Figurine */}
              <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-md">
                  <PlayerPawn player={opponent} isActive={false} size="lg" />
                </div>
                <select
                  value={opponentId}
                  onChange={(e) => setOpponentId(Number(e.target.value))}
                  className="bg-white border-2 border-amber-300 text-slate-900 rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none"
                >
                  {opponents.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <span className="text-[11px] text-amber-800 font-black">Lawan Tanding</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 font-medium max-w-md mx-auto">
              Kedua pemain akan menjawab 1 pertanyaan seputar iklan, slogan, atau poster. Siapa yang menjawab benar akan meraih 200 poin bonus!
            </p>

            <button
              type="button"
              onClick={() => setStep('BATTLE')}
              className="w-full py-3.5 rounded-2xl font-display font-black text-sm bg-gradient-to-r from-rose-500 via-amber-500 to-orange-500 text-slate-950 hover:from-rose-400 hover:to-orange-400 transition-all shadow-lg shadow-rose-400/30 border border-rose-400 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-slate-950 text-slate-950" />
              <span>Mulai Adu Kecerdasan!</span>
            </button>
          </div>
        )}

        {step === 'BATTLE' && (
          <div className="py-4 space-y-4">
            <div className="bg-amber-50/80 p-3.5 rounded-2xl border-2 border-amber-200">
              <span className="text-[10px] font-black text-amber-700 uppercase tracking-wider block mb-1">
                PERTANYAAN DUEL:
              </span>
              <p className="text-sm font-black text-slate-900 leading-relaxed">
                {question.prompt}
              </p>
            </div>

            {/* Answer Options for Challenger */}
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                <span>Jawaban {challenger.name}:</span>
                {challengerChoice !== null && <span className="text-emerald-600 font-bold">Tersimpan ✓</span>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={challenger.isBot || challengerChoice !== null}
                    onClick={() => setChallengerChoice(i)}
                    className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-colors ${
                      challengerChoice === i
                        ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-rose-50 hover:border-rose-300'
                    }`}
                  >
                    <strong className="font-black">{String.fromCharCode(65 + i)}.</strong> {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Options for Opponent */}
            <div className="space-y-2 pt-2 border-t border-slate-200">
              <div className="text-xs font-black text-slate-800 flex items-center justify-between">
                <span>Jawaban {opponent.name}:</span>
                {opponentChoice !== null && <span className="text-emerald-600 font-bold">Tersimpan ✓</span>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={opponent.isBot || opponentChoice !== null}
                    onClick={() => setOpponentChoice(i)}
                    className={`p-2.5 rounded-xl border-2 text-xs font-bold text-left transition-colors ${
                      opponentChoice === i
                        ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-800 hover:bg-amber-50 hover:border-amber-300'
                    }`}
                  >
                    <strong className="font-black">{String.fromCharCode(65 + i)}.</strong> {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'RESULT' && (
          <div className="py-4 space-y-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-amber-100 text-amber-600 border border-amber-300 mx-auto">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-900">
                {winner ? `Selamat, ${winner.name} Menang Duel!` : 'Hasil Duel: Seri (Sama Kuat)!'}
              </h4>
              <p className="text-xs text-slate-600 font-medium mt-1">
                Kunci Jawaban Tepat: <strong className="text-emerald-700 font-black">{question.options[question.correctAnswerIndex]}</strong>
              </p>
            </div>

            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 text-xs text-slate-700 font-medium">
              {question.explanation}
            </div>

            <button
              type="button"
              onClick={() => onDuelComplete(winner?.id || 0, winner ? 200 : 50)}
              className="w-full py-3.5 rounded-2xl font-display font-black text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 hover:from-amber-300 hover:to-orange-400 transition-all shadow-md border border-amber-400"
            >
              Lanjutkan Permainan Papan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
