import React, { useState, useEffect } from 'react';
import { Player, Question } from '../types/game';
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
    <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-rose-500/70 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative my-auto animate-scale-in">
        {/* Header */}
        <div className="text-center pb-4 border-b border-slate-800">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800 mb-2">
            <Swords className="w-3.5 h-3.5 text-rose-400" /> ARENA DUEL CEPAT BAHASA
          </div>
          <h3 className="text-xl font-display font-black text-white">
            Tantangan Adu Cepat: +200 Poin Taruhan!
          </h3>
        </div>

        {step === 'MATCH' && (
          <div className="py-6 space-y-6 text-center">
            <div className="flex items-center justify-center gap-6">
              {/* Challenger */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg ring-4 ring-rose-500/40"
                  style={{ backgroundColor: challenger.avatar.color }}
                >
                  {challenger.name.charAt(0).toUpperCase()}
                </div>
                <div className="font-bold text-white text-sm">{challenger.name}</div>
                <span className="text-[11px] text-slate-400">Penantang</span>
              </div>

              <div className="font-display font-black text-2xl text-rose-500 italic">
                VS
              </div>

              {/* Opponent Selection */}
              <div className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg ring-4 ring-slate-700"
                  style={{ backgroundColor: opponent.avatar.color }}
                >
                  {opponent.name.charAt(0).toUpperCase()}
                </div>
                <select
                  value={opponentId}
                  onChange={(e) => setOpponentId(Number(e.target.value))}
                  className="bg-slate-800 border border-slate-700 text-white rounded-lg px-2 py-1 text-xs font-bold focus:outline-none"
                >
                  {opponents.map(p => (
                    <option key={p.id} value={p.id}>{p.name}</option>
                  ))}
                </select>
                <span className="text-[11px] text-slate-400">Lawan Tanding</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Kedua pemain akan menjawab 1 pertanyaan seputar iklan, slogan, atau poster. Siapa yang menjawab benar akan meraih 200 poin bonus!
            </p>

            <button
              type="button"
              onClick={() => setStep('BATTLE')}
              className="w-full py-3.5 rounded-xl font-display font-extrabold text-sm bg-gradient-to-r from-rose-500 to-amber-500 text-white hover:from-rose-400 hover:to-amber-400 transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Mulai Adu Kecerdasan!</span>
            </button>
          </div>
        )}

        {step === 'BATTLE' && (
          <div className="py-4 space-y-4">
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                PERTANYAAN DUEL:
              </span>
              <p className="text-sm font-bold text-white leading-relaxed">
                {question.prompt}
              </p>
            </div>

            {/* Answer Options for Challenger */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Jawaban {challenger.name}:</span>
                {challengerChoice !== null && <span className="text-emerald-400">Tersimpan</span>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={challenger.isBot || challengerChoice !== null}
                    onClick={() => setChallengerChoice(i)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                      challengerChoice === i
                        ? 'bg-rose-500 text-white border-rose-400 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <strong>{String.fromCharCode(65 + i)}.</strong> {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer Options for Opponent */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>Jawaban {opponent.name}:</span>
                {opponentChoice !== null && <span className="text-emerald-400">Tersimpan</span>}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {question.options.map((opt, i) => (
                  <button
                    key={i}
                    type="button"
                    disabled={opponent.isBot || opponentChoice !== null}
                    onClick={() => setOpponentChoice(i)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-colors ${
                      opponentChoice === i
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-800 border-slate-700 text-slate-200 hover:bg-slate-700'
                    }`}
                  >
                    <strong>{String.fromCharCode(65 + i)}.</strong> {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 'RESULT' && (
          <div className="py-4 space-y-4 text-center">
            <div className="inline-flex p-3 rounded-full bg-amber-500/20 text-amber-400 mx-auto">
              <Trophy className="w-10 h-10" />
            </div>

            <div>
              <h4 className="text-lg font-black text-white">
                {winner ? `Selamat, ${winner.name} Menang Duel!` : 'Hasil Duel: Seri (Sama Kuat)!'}
              </h4>
              <p className="text-xs text-slate-300 mt-1">
                Kunci Jawaban Tepat: <strong className="text-emerald-400">{question.options[question.correctAnswerIndex]}</strong>
              </p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
              {question.explanation}
            </div>

            <button
              type="button"
              onClick={() => onDuelComplete(winner?.id || 0, winner ? 200 : 50)}
              className="w-full py-3 rounded-xl font-display font-bold text-sm bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors"
            >
              Lanjutkan Permainan Papan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
