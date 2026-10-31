import React from 'react';
import { DiagnosticReportData } from '../../types';
import { Award, Printer, Share2, Sparkles, CheckCircle2, AlertCircle, Clock, Calendar, Brain, Activity, User, BookOpen, Volume2 } from 'lucide-react';
import { SpeechRadarChart, DomainComparisonBarChart } from '../Charts/SpeechProgressCharts';

interface Props {
  report: DiagnosticReportData;
  onRetest: () => void;
  onGoToParentPortal?: () => void;
}

export const DiagnosticReport: React.FC<Props> = ({ report, onRetest, onGoToParentPortal }) => {
  const { scores } = report;

  const handlePrint = () => {
    window.print();
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case "Me'yorda":
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold">Me'yorda (Normal)</span>;
      case "Yengil":
        return <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">Yengil darajada</span>;
      case "O'rta":
        return <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-bold">O'rta darajada</span>;
      default:
        return <span className="px-3 py-1 bg-rose-100 text-rose-800 rounded-full text-xs font-bold">Klinik darajada</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto print:m-0 print:p-0">
      {/* Top Banner & Print Controls */}
      <div className="bg-white p-5 rounded-3xl shadow-xs border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white flex items-center justify-center font-black shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-800">Logopedik Diagnostika Xulosasi</h2>
              {report.source === 'gemini-ai' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-200">
                  <Sparkles className="w-3 h-3 text-indigo-500" />
                  Gemini AI tahlili
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Sana: {report.date} | Bola: <span className="font-bold text-slate-700">{report.childName}</span> ({report.childAge} yosh)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {onGoToParentPortal && (
            <button
              onClick={onGoToParentPortal}
              className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-emerald-600" />
              Ota-ona kabinetida ko'rish
            </button>
          )}

          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Printer className="w-4 h-4" />
            Chop etish / PDF
          </button>
        </div>
      </div>

      {/* The Printable Official Diagnostic Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-100 space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-teal-700 font-black text-xl tracking-tight">LogopedPlus</span>
              <span className="text-slate-300">|</span>
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-500">
                Nutqiy Rivojlanish Xaritasi
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
              Klinik-Logopedik Diagnostika Bayonnomasi
            </h1>
          </div>

          <div className="text-left sm:text-right text-xs text-slate-500">
            <p>Hujjat raqami: <strong className="text-slate-800">LP-{report.id.slice(-6)}</strong></p>
            <p>Tekshiruv sanasi: <strong className="text-slate-800">{report.date}</strong></p>
          </div>
        </div>

        {/* Patient Info Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Bola ismi</span>
            <p className="text-sm font-black text-slate-800 mt-0.5">{report.childName}</p>
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Yoshi</span>
            <p className="text-sm font-black text-slate-800 mt-0.5">{report.childAge} yosh</p>
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Tashxis kodi</span>
            <p className="text-sm font-black text-teal-700 mt-0.5">{report.diagnosisCode}</p>
          </div>
          <div>
            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Og'irlik darajasi</span>
            <div className="mt-0.5">{getSeverityBadge(report.severity)}</div>
          </div>
        </div>

        {/* Primary Diagnosis & Score Banner */}
        <div className="p-6 rounded-3xl bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border-2 border-teal-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-black uppercase tracking-wider text-teal-700">
              Asosiy Logopedik Tashxis Xulosasi:
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {report.diagnosisTitle}
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-4 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-600" />
                Davomiyligi: <strong className="text-slate-800">{report.therapyDuration}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-2xl shadow-sm border border-teal-100 shrink-0 min-w-[140px]">
            <span className="text-3xl sm:text-4xl font-black text-teal-600">
              {report.overallScore}%
            </span>
            <span className="text-[11px] font-bold text-slate-500 text-center mt-1">
              Umumiy nutq darajasi
            </span>
          </div>
        </div>

        {/* 5 Cognitive Speech Domains Breakdown */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            Nutq Tizimi Komponentlari Bo'yicha Natijalar
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* 1. Artikulyatsiya */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Artikulyatsiya va tovushlar</span>
                <span className="text-xs font-extrabold text-teal-600">{scores.articulation.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                  style={{ width: `${scores.articulation.percentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Nuqsonli tovushlar: {scores.articulation.problemSounds.length > 0 ? (
                  <span className="text-rose-600 font-bold">{scores.articulation.problemSounds.join(', ')}</span>
                ) : (
                  <span className="text-emerald-600 font-bold">Nuqson aniqlanmadi</span>
                )}
              </p>
            </div>

            {/* 2. Fonematik idrok */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Fonematik eshitish va idrok</span>
                <span className="text-xs font-extrabold text-teal-600">{scores.phonemic.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                  style={{ width: `${scores.phonemic.percentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Akustik farqlash: {scores.phonemic.score} / {scores.phonemic.maxScore} to'g'ri javob
              </p>
            </div>

            {/* 3. Lug'at boyligi */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Lug'at boyligi va tushunchalar</span>
                <span className="text-xs font-extrabold text-teal-600">{scores.vocabulary.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-teal-500 rounded-full"
                  style={{ width: `${scores.vocabulary.percentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Umumlashtirish, antonimlar va mantiqiy leksika
              </p>
            </div>

            {/* 4. Grammatika */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Grammatik qurilish</span>
                <span className="text-xs font-extrabold text-teal-600">{scores.grammar.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full"
                  style={{ width: `${scores.grammar.percentage}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Ko'plik, kelishik va so'z yasovchi shakllar
              </p>
            </div>

            {/* 5. Bog'lanishli nutq */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200 sm:col-span-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-700">Bog'lanishli nutq va hikoya tuzish</span>
                <span className="text-xs font-extrabold text-teal-600">{scores.connectedSpeech.percentage}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full"
                  style={{ width: `${scores.connectedSpeech.percentage}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mt-2 text-[11px] text-slate-500">
                <span>Mantiqiy tartib: {scores.connectedSpeech.storyOrderCorrect ? "To'g'ri topildi" : "Yordam bilan"}</span>
                {scores.speechRhythm && (
                  <span>Nutq sur'ati: {scores.speechRhythm.tempo} | Duduqlanish: {scores.speechRhythm.stutteringSigns ? "Bor" : "Yo'q"}</span>
                )}
              </div>
            </div>
          </div>

          {/* Dynamic Recharts Visualizations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <SpeechRadarChart scores={scores} childName={report.childName} />
            <DomainComparisonBarChart scores={scores} />
          </div>
        </div>

        {/* Clinical Summary */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
            Klinik Nutqiy Xulosa:
          </h4>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {report.summary}
          </p>
        </div>

        {/* Specialist Recommendations */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-teal-600" />
            Logoped Mutaxassis uchun Korreksion Yo'nalish
          </h3>
          <div className="space-y-2">
            {report.specialistRecommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/70 text-xs text-slate-700">
                <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-800 font-bold flex items-center justify-center shrink-0 text-[11px]">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{rec}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Parent Home Exercises */}
        <div>
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-800 mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-600" />
            Ota-onalar uchun Uy Sharoitidagi Mashqlar
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {report.parentHomeExercises.map((ex, i) => (
              <div key={i} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/80">
                <div className="flex items-center justify-between mb-1">
                  <h5 className="font-extrabold text-xs sm:text-sm text-amber-950">{ex.title}</h5>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100/80 px-2 py-0.5 rounded-md">
                    {ex.target}
                  </span>
                </div>
                <p className="text-xs text-amber-900/80 mt-1 leading-relaxed">
                  {ex.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Box */}
        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 text-xs text-slate-500">
          <div>
            <p>Xulosa tuzuvchi mutaxassis: <strong>Oliy toifali Logoped-defektolog</strong></p>
            <p className="text-[11px] text-slate-400 mt-0.5">Avtomatlashtirilgan ekspert tahlili tasdiqlangan</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1" />
              <span className="text-[10px]">Imzo</span>
            </div>
            <div className="text-center">
              <div className="w-28 border-b border-slate-400 mb-1" />
              <span className="text-[10px]">Muhr o'rni</span>
            </div>
          </div>
        </div>
      </div>

      {/* Retest CTA */}
      <div className="flex justify-center print:hidden pt-2">
        <button
          onClick={onRetest}
          className="px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold transition"
        >
          Yangi diagnostika testini boshlash
        </button>
      </div>
    </div>
  );
};
