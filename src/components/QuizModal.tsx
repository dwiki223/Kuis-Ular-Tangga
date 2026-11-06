import React, { useState, useEffect, useRef } from 'react';
import { Player, Question } from '../types/game';
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
      case 'IKLAN': return 'bg-sky-500/20 text-sky-300 border-sky-500/40';
      case 'SLOGAN': return 'bg-teal-500/20 text-teal-300 border-teal-500/40';
      case 'POSTER': return 'bg-orange-500/20 text-orange-300 border-orange-500/40';
      case 'FAKTA_OPINI': return 'bg-violet-500/20 text-violet-300 border-violet-500/40';
      case 'VISUAL_CASE': return 'bg-pink-500/20 text-pink-300 border-pink-500/40';
      default: return 'bg-slate-700 text-slate-300 border-slate-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative my-auto">
        {/* Top Header: Player & Category Information */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white"
              style={{ backgroundColor: player.avatar.color }}
            >
              {player.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="text-xs text-slate-400">Giliran Menjawab</div>
              <div className="text-sm font-bold text-white flex items-center gap-1.5">
                <span>{player.name}</span>
                {player.hasShield && (
                  <span className="text-[10px] text-amber-300 flex items-center gap-0.5">
                    <Shield className="w-3 h-3 text-amber-400" /> Perisai Aktif
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-md border ${getCategoryColor(question.category)}`}>
              Teks {question.category.replace('_', ' ')}
            </span>
            <span className="text-xs font-medium px-2 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
              {question.difficulty}
            </span>
            {timerSeconds > 0 && (
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono tabular-nums font-bold border ${
                timeLeft <= 5 ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse' : 'bg-slate-800 text-slate-200 border-slate-700'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{timeLeft}s</span>
              </div>
            )}
          </div>
        </div>

        {/* Timer Progress Bar */}
        {timerSeconds > 0 && !isAnswered && (
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear ${
                timeLeft <= 5 ? 'bg-rose-500' : 'bg-amber-400'
              }`}
              style={{ width: `${(timeLeft / timerSeconds) * 100}%` }}
            />
          </div>
        )}

        {/* Question Area */}
        <div className="mt-5 space-y-4">
          <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed text-balance">
            {question.prompt}
          </h3>

          {/* Visual Case Image Showcase */}
          {question.image && (
            <div className="relative rounded-xl overflow-hidden border border-slate-700 bg-slate-950/80 group">
              <img
                src={question.image}
                alt="Studi Kasus Media"
                referrerPolicy="no-referrer"
                className="w-full max-h-64 object-contain mx-auto"
              />
              <button
                type="button"
                onClick={() => setZoomedImage(true)}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 text-white border border-slate-700 hover:bg-slate-800 transition-colors text-xs flex items-center gap-1"
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

              let buttonStyle = "bg-slate-800/70 border-slate-700/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600";

              if (isAnswered) {
                if (isCorrectAnswer) {
                  buttonStyle = "bg-emerald-950/90 border-emerald-500 text-emerald-100 ring-1 ring-emerald-400";
                } else if (isSelected) {
                  buttonStyle = "bg-rose-950/90 border-rose-500 text-rose-100 ring-1 ring-rose-400";
                } else {
                  buttonStyle = "bg-slate-900/50 border-slate-800 text-slate-500 opacity-60";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(optIdx)}
                  className={`w-full text-left p-3.5 rounded-xl border flex items-start gap-3 transition-all ${buttonStyle}`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                    isAnswered && isCorrectAnswer
                      ? 'bg-emerald-500 text-slate-950'
                      : isAnswered && isSelected
                      ? 'bg-rose-500 text-white'
                      : 'bg-slate-700 text-slate-200'
                  }`}>
                    {letter}
                  </span>
                  <span className="text-sm font-medium leading-relaxed flex-1">
                    {option}
                  </span>
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 self-center" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 self-center" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Answer Feedback & Educational Explanation */}
        {isAnswered && (
          <div className="mt-5 pt-4 border-t border-slate-800 space-y-3 animate-fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedIndex === question.correctAnswerIndex ? (
                  <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Jawaban Tepat! (+{totalEarnedPoints} Poin)</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-rose-400 font-bold text-sm">
                    <XCircle className="w-5 h-5" />
                    <span>
                      {selectedIndex === -1 ? 'Waktu Habis!' : 'Jawaban Kurang Tepat!'}
                      {player.hasShield ? ' (Terlindungi oleh Perisai!)' : ''}
                    </span>
                  </div>
                )}
              </div>

              {speedBonus > 0 && (
                <div className="text-xs text-amber-400 font-semibold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>+{speedBonus} Bonus Kecepatan</span>
                </div>
              )}
            </div>

            {/* Comprehensive Curriculum Explanation */}
            <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Pembahasan Materi ({question.curriculumRef}):</span>
              </div>
              <p className="leading-relaxed text-slate-200">
                {question.explanation}
              </p>
            </div>

            {/* Continue Button */}
            <button
              type="button"
              onClick={handleContinue}
              className="w-full mt-2 py-3 rounded-xl font-display font-bold text-sm bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-lg shadow-amber-500/20"
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
