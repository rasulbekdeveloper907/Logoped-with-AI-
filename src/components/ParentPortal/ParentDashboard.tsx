import React, { useState } from 'react';
import { Child, DiagnosticReportData, Exercise } from '../../types';
import { INITIAL_EXERCISES } from '../../data/mockData';
import { Award, CheckCircle2, Clock, Play, Pause, RotateCcw, Heart, Calendar, Phone, MessageCircle, Sparkles, BookOpen, Star, HelpCircle } from 'lucide-react';
import { sounds, speakText } from '../../utils/audioUtils';
import confetti from 'canvas-confetti';

import { SpeechTimelineChart, SpeechRadarChart } from '../Charts/SpeechProgressCharts';

interface Props {
  currentChild: Child;
  allChildren: Child[];
  onSelectChild: (c: Child) => void;
  report: DiagnosticReportData | undefined;
  allReports?: DiagnosticReportData[];
  onOpenDiagnosticReport: () => void;
}

export const ParentDashboard: React.FC<Props> = ({
  currentChild,
  allChildren,
  onSelectChild,
  report,
  allReports,
  onOpenDiagnosticReport,
}) => {
  // Daily exercise checklist state
  const [completedExercises, setCompletedExercises] = useState<Record<string, boolean>>({
    'ex-1': true,
  });

  // Active workout timer
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerIntervalRef = React.useRef<any>(null);

  const startExercise = (ex: Exercise) => {
    setActiveExercise(ex);
    setTimeLeft(ex.durationSeconds || 45);
    setIsTimerRunning(true);
    sounds.playClick();
  };

  React.useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            sounds.playSuccess();
            if (activeExercise) {
              setCompletedExercises(c => ({ ...c, [activeExercise.id]: true }));
            }
            try {
              confetti({ particleCount: 40, spread: 60 });
            } catch (e) {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }

    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, timeLeft, activeExercise]);

  const toggleCheck = (id: string) => {
    sounds.playClick();
    setCompletedExercises(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const progressPercent = report ? report.overallScore : 78;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700 rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold backdrop-blur-xs">
              <Heart className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
              <span>Ota-ona Shaxsiy Kabineti</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Xush kelibsiz, {currentChild.parentName}!
            </h1>
            <p className="text-xs sm:text-sm text-teal-100 max-w-lg leading-relaxed">
              Farzandingiz <strong className="text-white">{currentChild.name}</strong> ({currentChild.age} yosh) nutqiy rivojlanish jarayoni va kundalik mashg'ulotlar xaritasi.
            </p>
          </div>

          {/* Child Switcher Dropdown */}
          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shrink-0">
            <label className="block text-[10px] font-bold uppercase text-teal-200 mb-1">Farzandni tanlash:</label>
            <select
              value={currentChild.id}
              onChange={(e) => {
                const found = allChildren.find(c => c.id === e.target.value);
                if (found) onSelectChild(found);
              }}
              className="px-3 py-1.5 bg-white text-slate-800 rounded-xl text-xs font-bold border-none"
            >
              {allChildren.map(c => (
                <option key={c.id} value={c.id}>{c.name} ({c.age} yosh)</option>
              ))}
            </select>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-white/10 pointer-events-none blur-xl" />
      </div>

      {/* Progress & Diagnosis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overall Progress Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Nutqiy Ko'rsatkich</span>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-4xl font-black text-slate-800">{progressPercent}%</span>
              <span className="text-xs text-emerald-600 font-bold">↑ +8% o'sish</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Yosh me'yoriga nisbatan nutqiy rivojlanish darajasi
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Diagnosis & Status Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Logopedik Holat</span>
            <h3 className="text-base font-extrabold text-slate-800 mt-1">
              {report ? report.diagnosisTitle : "Birlamchi diagnostikada"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Bosqich: <strong className="text-teal-700 capitalize">{currentChild.status}</strong>
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            {report ? (
              <button
                onClick={onOpenDiagnosticReport}
                className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
              >
                <Award className="w-4 h-4" />
                To'liq tibbiy xulosani ko'rish →
              </button>
            ) : (
              <span className="text-xs text-slate-400">Diagnostika kutilmoqda</span>
            )}
          </div>
        </div>

        {/* Next Session Card */}
        <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-xs flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Navbatdagi Dars</span>
            <div className="flex items-center gap-2 mt-1">
              <Calendar className="w-4 h-4 text-teal-600" />
              <h3 className="text-base font-extrabold text-slate-800">Shanba, 10:00 da</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Logoped xonasida (Individual mashg'ulot)
            </p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
            <a
              href="tel:+998901234567"
              className="flex-1 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 text-center flex items-center justify-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              Qo'ng'iroq
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-1.5 px-3 bg-sky-50 hover:bg-sky-100 rounded-xl text-xs font-bold text-sky-700 text-center flex items-center justify-center gap-1"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Speech Development Progress Recharts Section */}
      <div className="space-y-4">
        <SpeechTimelineChart
          reports={allReports?.filter(r => r.childId === currentChild.id) || (report ? [report] : [])}
          childName={currentChild.name}
        />

        {report && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SpeechRadarChart scores={report.scores} childName={currentChild.name} />
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Grafik Tahlili va Natija</span>
                <h4 className="text-base font-extrabold text-slate-800 mt-1">Ko'rsatkichlar Dinamikasi</h4>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Recharts vizualizatsiyasida ko'rinib turganidek, <strong className="text-slate-900">{currentChild.name}</strong> da artikulyatsiya va fonematik eshitish ko'rsatkichlari dinamik tarzda o'smoqda.
                </p>
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-xl bg-teal-50 text-teal-900 font-semibold">
                    <span>Artikulyatsiya (tovushlar):</span>
                    <strong>{report.scores.articulation.percentage}%</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-indigo-50 text-indigo-900 font-semibold">
                    <span>Fonematik eshitish (idrok):</span>
                    <strong>{report.scores.phonemic.percentage}%</strong>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50 text-amber-900 font-semibold">
                    <span>Lug'at boyligi:</span>
                    <strong>{report.scores.vocabulary.percentage}%</strong>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 mt-4 italic">
                * Ma'lumotlar har bir diagnostika sessiyasidan so'ng avtomatik yangilanadi.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Main Interactive Daily Homework Workout Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-400" />
              <h2 className="text-lg sm:text-xl font-black text-slate-800">
                Bugungi Uy Vazifalari (Artikulyatsion Gimnastika)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Farzandingiz bilan har kuni 10-15 daqiqa oyna oldida quvnoq o'yin sifatida bajaring!
            </p>
          </div>

          <div className="text-xs font-bold text-slate-600 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
            Bajarildi: <strong className="text-amber-800">{Object.values(completedExercises).filter(Boolean).length}</strong> / {INITIAL_EXERCISES.length} ta
          </div>
        </div>

        {/* Active Workout Timer Modal / Box if open */}
        {activeExercise && (
          <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border-2 border-teal-300 text-center animate-fadeIn">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700">Mashq jarayoni:</span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">{activeExercise.title}</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mt-1">{activeExercise.description}</p>

            {/* Big Countdown Clock */}
            <div className="my-6">
              <span className="text-5xl sm:text-6xl font-black text-teal-700 tracking-tight font-mono">
                00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
              </span>
              <p className="text-xs text-teal-600 font-semibold mt-1">
                {timeLeft === 0 ? "Barakalla! Mashq muvaffaqiyatli bajarildi! 🎉" : "Oyna oldida birga takrorlang"}
              </p>
            </div>

            {/* Timer controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
              >
                {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isTimerRunning ? "Pauza" : "Davom etish"}
              </button>

              <button
                onClick={() => {
                  setTimeLeft(activeExercise.durationSeconds || 45);
                  setIsTimerRunning(true);
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

        {/* Exercises Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {INITIAL_EXERCISES.map(ex => {
            const isDone = !!completedExercises[ex.id];

            return (
              <div
                key={ex.id}
                className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                  isDone
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-white border-slate-200/90 hover:border-teal-300'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 text-sm font-black flex items-center justify-center">
                        {ex.title.charAt(0)}
                      </span>
                      <div>
                        <h4 className="font-extrabold text-sm text-slate-800">{ex.title}</h4>
                        <span className="text-[10px] font-bold text-teal-600">Maqsad: {ex.targetSound || "Artikulyatsiya"}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleCheck(ex.id)}
                      className={`p-1.5 rounded-xl border transition ${
                        isDone
                          ? 'bg-emerald-600 text-white border-emerald-600'
                          : 'bg-white text-slate-300 border-slate-200 hover:border-slate-300'
                      }`}
                      title={isDone ? "Bajarildi deb belgilangan" : "Bajarildi deb belgilash"}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {ex.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-[11px] text-amber-900">
                    <strong>💡 Ota-ona uchun maslahat:</strong> {ex.parentTip}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {ex.repetitions} • {ex.durationSeconds} soniya
                  </span>

                  <button
                    onClick={() => startExercise(ex)}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" />
                    Bajarish (Taymer)
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialist Tips for Parents */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
        <h3 className="text-base font-extrabold text-slate-800 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-teal-600" />
          Logopeddan Ota-onalarga Oltin Qoidalar
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-100 text-xs text-slate-700 space-y-1">
            <h5 className="font-bold text-teal-900">1. Majburlamang, o'yinga aylantiring</h5>
            <p className="text-slate-600">Mashg'ulotlarni 10-15 daqiqadan oshirmang. Bola charchasa yoki qaysarlik qilsa, keyinroqqa qoldiring.</p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-100 text-xs text-slate-700 space-y-1">
            <h5 className="font-bold text-amber-900">2. Ko'zgudan foydalaning</h5>
            <p className="text-slate-600">Bola tilining harakatini va lab holatini ko'zgu orqali ko'rib, o'zini nazorat qilishni o'rganadi.</p>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 text-xs text-slate-700 space-y-1">
            <h5 className="font-bold text-indigo-900">3. Har bir yutuqni maqtang</h5>
            <p className="text-slate-600">Hatto kichik ijobiy natija yoki yangi tovush talaffuz qilinganda ham bolani quchoqlab, maqtang.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
