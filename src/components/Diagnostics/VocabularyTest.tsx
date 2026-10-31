import React, { useState } from 'react';
import { VOCABULARY_TESTS, VocabularyQuestion } from '../../data/diagnosticTests';
import { CheckCircle2, XCircle, ArrowRight, BookOpen, Volume2 } from 'lucide-react';
import { speakText, sounds } from '../../utils/audioUtils';
import confetti from 'canvas-confetti';

interface Props {
  onScoreUpdate: (score: number, maxScore: number, details: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const VocabularyTest: React.FC<Props> = ({ onScoreUpdate, onNext, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState(false);

  const test: VocabularyQuestion = VOCABULARY_TESTS[currentIdx];

  const handleSelect = (idx: number) => {
    if (showFeedback) return;
    const isCorrect = test.options[idx].isCorrect;
    setSelectedAnswers(prev => ({ ...prev, [test.id]: idx }));
    setShowFeedback(true);

    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({ particleCount: 20, spread: 40 });
      } catch (e) {}
    } else {
      sounds.playDing();
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    if (currentIdx < VOCABULARY_TESTS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      let correct = 0;
      VOCABULARY_TESTS.forEach(t => {
        const picked = selectedAnswers[t.id];
        if (picked !== undefined && t.options[picked]?.isCorrect) {
          correct++;
        }
      });
      onScoreUpdate(correct, VOCABULARY_TESTS.length, {
        generalization: 2,
        oddOneOut: 1,
        antonyms: 1,
      });
      onNext();
    }
  };

  const isCurrentAnswered = selectedAnswers[test.id] !== undefined;
  const pickedIndex = selectedAnswers[test.id];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
              3-bo'lim: Lug'at Boyligi va Tushunchalar
            </span>
            <h3 className="text-base font-extrabold text-slate-800">
              {test.type === 'generalization' ? 'Umumlashtirish' : test.type === 'oddOneOut' ? 'Ortiqchasini topish' : 'Qarama-qarshi so\'zlar (Antonimlar)'}
            </h3>
          </div>
        </div>
        <div className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Savol: <span className="text-teal-700">{currentIdx + 1}</span> / {VOCABULARY_TESTS.length}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 text-center">
        {/* If question has emoji group (e.g. 🍎 🍐 🍑 🍇) */}
        {test.emojiGroup && (
          <div className="flex items-center justify-center gap-3 text-5xl sm:text-6xl my-4">
            {test.emojiGroup.map((em, i) => (
              <span key={i} className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200 shadow-xs hover:scale-110 transition-transform">
                {em}
              </span>
            ))}
          </div>
        )}

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight max-w-xl mx-auto mb-3">
          "{test.question}"
        </h2>

        <button
          onClick={() => speakText(test.question)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition mb-8"
        >
          <Volume2 className="w-4 h-4 text-amber-600" />
          Savolni o'qib berish
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {test.options.map((option, idx) => {
            const isPicked = pickedIndex === idx;
            const isCorrect = option.isCorrect;

            let cardStyle = "bg-white border-slate-200 hover:border-amber-400 hover:shadow-md";
            if (showFeedback && isPicked) {
              cardStyle = isCorrect
                ? "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/30"
                : "bg-rose-50 border-rose-400 text-rose-900";
            } else if (showFeedback && isCorrect) {
              cardStyle = "bg-emerald-50/60 border-emerald-300 text-emerald-900";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-3 relative cursor-pointer active:scale-95 ${cardStyle}`}
              >
                <span className="text-6xl select-none">{option.emoji}</span>
                <span className="text-base sm:text-lg font-bold text-slate-800">{option.text}</span>

                {showFeedback && isPicked && (
                  <div className="absolute top-3 right-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-left max-w-xl mx-auto animate-fadeIn">
            <p className="text-xs text-amber-900 font-medium">{test.explanation}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
        >
          Oldingi bo'lim
        </button>

        {isCurrentAnswered && (
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-bold rounded-2xl text-sm shadow-md flex items-center gap-2 animate-bounce"
          >
            <span>{currentIdx < VOCABULARY_TESTS.length - 1 ? "Keyingi savol" : "Grammatika bo'limiga o'tish"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
