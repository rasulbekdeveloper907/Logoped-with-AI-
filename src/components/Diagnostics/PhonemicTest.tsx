import React, { useState } from 'react';
import { PHONEMIC_TESTS, PhonemicPairTest } from '../../data/diagnosticTests';
import { Volume2, CheckCircle2, XCircle, ArrowRight, Award, Sparkles } from 'lucide-react';
import { speakText, sounds } from '../../utils/audioUtils';
import confetti from 'canvas-confetti';

interface Props {
  onScoreUpdate: (score: number, maxScore: number, details: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const PhonemicTest: React.FC<Props> = ({ onScoreUpdate, onNext, onBack }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showFeedback, setShowFeedback] = useState<boolean>(false);

  const test: PhonemicPairTest = PHONEMIC_TESTS[currentIdx];

  const handleSelectOption = (optionIndex: number) => {
    if (showFeedback) return;

    const isCorrect = test.options[optionIndex].isCorrect;
    setSelectedAnswers(prev => ({ ...prev, [test.id]: optionIndex }));
    setShowFeedback(true);

    if (isCorrect) {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 25,
          spread: 45,
          origin: { y: 0.7 }
        });
      } catch (e) {}
    } else {
      sounds.playDing();
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (currentIdx < PHONEMIC_TESTS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Calculate scores
      let correctCount = 0;
      PHONEMIC_TESTS.forEach(t => {
        const picked = selectedAnswers[t.id];
        if (picked !== undefined && t.options[picked]?.isCorrect) {
          correctCount++;
        }
      });
      const max = PHONEMIC_TESTS.length;
      onScoreUpdate(correctCount, max, {
        pairsDiscrimination: 2,
        soundIdentification: 2,
        firstSoundFinding: 1
      });
      onNext();
    }
  };

  const handleSpeech = () => {
    speakText(test.question);
  };

  const isCurrentAnswered = selectedAnswers[test.id] !== undefined;
  const pickedIndex = selectedAnswers[test.id];

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            2-bo'lim: Fonematik Eshitish va Idrok
          </span>
          <h3 className="text-base font-extrabold text-slate-800">{test.title}</h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          Savol: <span className="text-teal-700">{currentIdx + 1}</span> / {PHONEMIC_TESTS.length}
        </div>
      </div>

      {/* Main question visual card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Eshitish va akustik farqlash o'yini</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight max-w-xl mx-auto mb-3">
          "{test.question}"
        </h2>

        <button
          onClick={handleSpeech}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition mb-8"
        >
          <Volume2 className="w-4 h-4 text-teal-600" />
          Ovozli savolni eshitish
        </button>

        {/* Options */}
        <div className={`grid gap-4 max-w-2xl mx-auto ${
          test.options.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'
        }`}>
          {test.options.map((option, idx) => {
            const isPicked = pickedIndex === idx;
            const isCorrect = option.isCorrect;

            let cardStyle = "bg-white border-slate-200 hover:border-teal-400 hover:shadow-md";
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
                onClick={() => handleSelectOption(idx)}
                className={`p-6 rounded-3xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 relative cursor-pointer active:scale-95 ${cardStyle}`}
              >
                <span className="text-6xl sm:text-7xl select-none transition-transform hover:scale-110">
                  {option.emoji}
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-800">
                  {option.text}
                </span>

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

        {/* Feedback message */}
        {showFeedback && (
          <div className="mt-6 p-4 rounded-2xl bg-teal-50 border border-teal-200/70 max-w-xl mx-auto text-left animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-teal-900 text-sm mb-1">
              <Award className="w-4 h-4 text-teal-600" />
              Logopedik tahlil:
            </div>
            <p className="text-xs text-teal-800">{test.explanation}</p>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
        >
          Oldingi bo'lim
        </button>

        {isCurrentAnswered && (
          <button
            onClick={handleNextQuestion}
            className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl text-sm shadow-md flex items-center gap-2 animate-bounce"
          >
            <span>{currentIdx < PHONEMIC_TESTS.length - 1 ? "Keyingi savol" : "Lug'at bo'limiga o'tish"}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
