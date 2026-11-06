import React, { useState, useEffect, useRef } from 'react';
import { Player, Question } from '../types/game';
import { PlayerPawn } from './PlayerPawn';
import { playSound } from '../utils/audio';
import { 
  CheckCircle2, XCircle, Clock, Award, BookOpen, 
  HelpCircle, Sparkles, Shield, Maximize2, X
} from 'lucide-react';

interface QuizModalProps {
  player: Player;
  question: Question;
  timerSeconds: number;
  soundEnabled: boolean;
  onAnswerComplete: (isCorrect: boolean, points: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  player,
  question,
  timerSeconds,
  soundEnabled,
  onAnswerComplete,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(timerSeconds > 0 ? timerSeconds : 999);
  const [zoomedImage, setZoomedImage] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isTimerActive = timerSeconds > 0 && !isAnswered;

  // Bot auto-answer logic
  useEffect(() => {
    if (player.isBot && !isAnswered) {
      const delay = 1200 + Math.random() * 800;
      const botTimer = setTimeout(() => {
        // 75% accuracy for smart bot
        const willBeCorrect = Math.random() < 0.78;
        if (willBeCorrect) {
          handleSelectOption(question.correctAnswerIndex);
        } else {
          const wrongIndices = [0, 1, 2, 3].filter(i => i !== question.correctAnswerIndex);
          const chosenWrong = wrongIndices[Math.floor(Math.random() * wrongIndices.length)];
          handleSelectOption(chosenWrong);
        }
      }, delay);

      return () => clearTimeout(botTimer);
    }
  }, [player.isBot, isAnswered, question.correctAnswerIndex]);

  // Timer countdown
  useEffect(() => {
    if (!isTimerActive) return;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerActive]);

  const handleTimeOut = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedIndex(-1); // Timed out
    playSound.wrong(soundEnabled);
  };

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setIsAnswered(true);
    setSelectedIndex(index);
    if (timerRef.current) clearInterval(timerRef.current);

    const isCorrect = index === question.correctAnswerIndex;
    if (isCorrect) {
      playSound.correct(soundEnabled);
    } else {
      playSound.wrong(soundEnabled);
    }
  };

  // Calculate points
  const basePoints = question.difficulty === 'SULIT' ? 150 : question.difficulty === 'SEDANG' ? 120 : 100;
  const speedBonus = isTimerActive && selectedIndex === question.correctAnswerIndex
    ? Math.max(0, Math.floor((timeLeft / timerSeconds) * 50))
    : 0;
  const totalEarnedPoints = selectedIndex === question.correctAnswerIndex ? basePoints + speedBonus : 0;

  const handleContinue = () => {
    const isCorrect = selectedIndex === question.correctAnswerIndex;
    onAnswerComplete(isCorrect, totalEarnedPoints);
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'IKLAN': return 'bg-sky-100 text-sky-900 border-sky-300';
      case 'SLOGAN': return 'bg-teal-100 text-teal-900 border-teal-300';
      case 'POSTER': return 'bg-orange-100 text-orange-900 border-orange-300';
      case 'FAKTA_OPINI': return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'VISUAL_CASE': return 'bg-pink-100 text-pink-900 border-pink-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-white border-2 border-amber-300 rounded-3xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative my-auto">
        {/* Top Header: Player & Category Information */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-200">
          <div className="flex items-center gap-3">
            <div className="shrink-0 flex items-center justify-center p-1 rounded-xl bg-amber-50 border border-amber-200">
              <PlayerPawn player={player} isActive={true} size="sm" />
            </div>
            <div>
              <div className="text-[11px] font-black text-amber-600 uppercase tracking-wider">Giliran Menjawab</div>
              <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                <span>{player.name}</span>
                {player.hasShield && (
                  <span className="text-[10px] text-amber-700 font-bold flex items-center gap-0.5 bg-amber-100 px-1.5 py-0.5 rounded border border-amber-300">
                    <Shield className="w-3 h-3 text-amber-600" /> Perisai Aktif
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getCategoryColor(question.category)}`}>
              Teks {question.category.replace('_', ' ')}
            </span>
            <span className="text-xs font-bold px-2 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
              {question.difficulty}
            </span>
            {timerSeconds > 0 && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono tabular-nums font-black border ${
                timeLeft <= 5 ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse' : 'bg-amber-100 text-amber-900 border-amber-300'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Timer Progress Bar */}
        {timerSeconds > 0 && !isAnswered && (
          <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden border border-slate-200">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                timeLeft <= 5 ? 'bg-rose-500' : 'bg-amber-500'
              }`}
              style={{ width: `${(timeLeft / timerSeconds) * 100}%` }}
            />
          </div>
        )}

        {/* Question Area */}
        <div className="mt-5 space-y-4">
          <h3 className="text-base sm:text-lg font-black text-slate-900 leading-relaxed text-balance">
            {question.prompt}
          </h3>

          {/* Visual Case Image Showcase */}
          {question.image && (
            <div className="relative rounded-2xl overflow-hidden border-2 border-amber-200 bg-amber-50/30 group">
              <img
                src={question.image}
                alt="Studi Kasus Media"
                referrerPolicy="no-referrer"
                className="w-full max-h-64 object-contain mx-auto"
              />
              <button
                type="button"
                onClick={() => setZoomedImage(true)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-slate-800 border border-slate-300 hover:bg-white shadow transition-colors text-xs font-bold flex items-center gap-1"
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Perbesar Gambar</span>
              </button>
            </div>
          )}

          {/* Answer Options Grid */}
          <div className="grid grid-cols-1 gap-2.5 pt-2">
            {question.options.map((option, optIdx) => {
              const letter = String.fromCharCode(65 + optIdx); // A, B, C, D
              const isSelected = selectedIndex === optIdx;
              const isCorrectAnswer = optIdx === question.correctAnswerIndex;

              let buttonStyle = "bg-white border-2 border-slate-200 text-slate-800 hover:bg-amber-50/50 hover:border-amber-300 shadow-sm";

              if (isAnswered) {
                if (isCorrectAnswer) {
                  buttonStyle = "bg-emerald-50 border-2 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-300 shadow-md";
                } else if (isSelected) {
                  buttonStyle = "bg-rose-50 border-2 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-300 shadow-md";
                } else {
                  buttonStyle = "bg-slate-50 border border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-2xl border flex items-start gap-3 transition-all ${buttonStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black shrink-0 mt-0.5 ${
                    isAnswered && isCorrectAnswer
                      ? 'bg-emerald-500 text-white'
                      : isAnswered && isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-bold leading-relaxed flex-1">
                    {option}
                  </span>
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 self-center" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 self-center" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer Feedback & Educational Explanation */}
        {isAnswered && (
          <div className="mt-5 pt-4 border-t border-amber-200 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedIndex === question.correctAnswerIndex ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-black text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Jawaban Tepat! (+{totalEarnedPoints} Poin)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-700 font-black text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>
                      {selectedIndex === -1 ? 'Waktu Habis!' : 'Jawaban Kurang Tepat!'}
                      {player.hasShield ? ' (Terlindungi oleh Perisai!)' : ''}
                    </span>
                  </div>
                )}
              </div>

              {speedBonus > 0 && (
                <div className="text-xs text-amber-700 font-black flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-md border border-amber-300">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>+{speedBonus} Bonus Kecepatan</span>
                </div>
              )}
            </div>

            {/* Comprehensive Curriculum Explanation */}
            <div className="p-3.5 rounded-2xl bg-amber-50/80 border-2 border-amber-200 text-xs text-slate-800 space-y-1.5 shadow-sm">
              <div className="flex items-center gap-1.5 font-black text-amber-800">
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Pembahasan Materi ({question.curriculumRef}):</span>
              </div>
              <p className="leading-relaxed text-slate-700 font-medium">
                {question.explanation}
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full mt-2 py-3.5 rounded-2xl font-display font-black text-sm bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 transition-all shadow-lg shadow-amber-400/30 border border-amber-400"
            >
              Lanjutkan Langkah Permainan
            </button>
          </div>
        )}
      </div>

      {/* Zoomed Image Lightbox */}
      {zoomedImage && question.image && (
        <div className="fixed inset-0 z-60 bg-black/95 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setZoomedImage(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-white hover:bg-slate-700"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={question.image}
            alt="Perbesaran Gambar Kasus"
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-[95vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};
