import React, { useState } from 'react';
import { INITIAL_EXERCISES } from '../../data/mockData';
import { Exercise } from '../../types';
import { Play, Pause, RotateCcw, Sparkles, Filter, CheckCircle2, Volume2, Clock } from 'lucide-react';
import { sounds, speakText } from '../../utils/audioUtils';
import confetti from 'canvas-confetti';

export const ExerciseCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const timerRef = React.useRef<any>(null);

  const filteredExercises = selectedCategory === 'all'
    ? INITIAL_EXERCISES
    : INITIAL_EXERCISES.filter(e => e.category === selectedCategory);

  const startExercise = (ex: Exercise) => {
    setActiveExercise(ex);
    setTimeLeft(ex.durationSeconds || 45);
    setIsRunning(true);
    sounds.playClick();
  };

  React.useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            sounds.playSuccess();
            try {
              confetti({ particleCount: 35, spread: 50 });
            } catch (e) {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Artikulyatsion Gimnastika va Mashqlar Kutubxonasi
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Interaktiv Mashg'ulotlar Katalogi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Til, lab, yumshoq tanglay va to'g'ri nutqiy nafasni shakllantiruvchi amaliy mashqlar
          </p>
        </div>

        {/* Filter categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'artikulyatsiya', label: 'Artikulyatsiya' },
            { id: 'nafas', label: 'Nafas mashqlari' },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCategory === cat.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Workout Timer Modal */}
      {activeExercise && (
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border-2 border-teal-300 text-center animate-fadeIn shadow-md">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Mashq bajarilmoqda:</span>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">{activeExercise.title}</h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto mt-2 leading-relaxed">
            {activeExercise.description}
          </p>

          <div className="my-6">
            <span className="text-5xl sm:text-6xl font-black text-teal-700 tracking-tight font-mono">
              00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </span>
            <p className="text-xs text-teal-600 font-semibold mt-1">
              {timeLeft === 0 ? "Ajoyib! Mashq muvaffaqiyatli yakunlandi! 🌟" : "Oynaga qarab, harakatni aniq bajaring"}
            </p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? "Pauza" : "Davom etish"}
            </button>

            <button
              onClick={() => {
                setTimeLeft(activeExercise.durationSeconds || 45);
                setIsRunning(true);
              }}
              className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              Qayta boshlash
            </button>

            <button
              onClick={() => setActiveExercise(null)}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-600 rounded-xl text-xs font-bold"
            >
              Yopish
            </button>
          </div>
        </div>
      )}

      {/* Grid of Exercises */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredExercises.map(ex => (
          <div
            key={ex.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <span className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 font-black flex items-center justify-center text-base">
                  {ex.title.charAt(0)}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">
                  {ex.difficulty}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-800">{ex.title}</h3>
              <p className="text-[11px] font-bold text-teal-600 mt-0.5">
                Qaratilgan: {ex.targetSound ? `${ex.targetSound} tovushlari` : ex.category}
              </p>

              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {ex.description}
              </p>

              <div className="mt-4 space-y-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px] text-slate-600">
                <p className="font-bold text-slate-700 text-xs mb-1">Ketma-ketlik:</p>
                {ex.instructions.slice(0, 3).map((ins, i) => (
                  <p key={i}>• {ins}</p>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-semibold">
                {ex.repetitions}
              </span>

              <button
                onClick={() => startExercise(ex)}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <Play className="w-3.5 h-3.5" />
                Bajarish
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
