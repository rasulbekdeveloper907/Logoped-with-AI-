import React from 'react';
import { Child, ChildAudioRecording, DiagnosticReportData } from '../../types';
import { X, User, Phone, MessageSquare, Calendar, Award, PlayCircle, Clock, ShieldCheck, HeartPulse, Mic } from 'lucide-react';
import { SpeechTimelineChart } from '../Charts/SpeechProgressCharts';
import { ChildAudioRecorder } from './ChildAudioRecorder';

interface Props {
  child: Child | null;
  reports: DiagnosticReportData[];
  onClose: () => void;
  onStartDiagnosis: (child: Child) => void;
  onViewReport: (report: DiagnosticReportData) => void;
  onSaveAudioRecording?: (childId: string, recording: ChildAudioRecording) => void;
  onDeleteAudioRecording?: (childId: string, recordingId: string) => void;
}

export const ClientProfileModal: React.FC<Props> = ({
  child,
  reports,
  onClose,
  onStartDiagnosis,
  onViewReport,
  onSaveAudioRecording,
  onDeleteAudioRecording,
}) => {
  if (!child) return null;

  const childReports = reports.filter(r => r.childId === child.id);
  const latestReport = childReports[childReports.length - 1];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Top Header Card */}
        <div className="p-6 bg-gradient-to-r from-teal-700 to-emerald-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-teal-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-white text-2xl font-black shrink-0">
              {child.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black">{child.name}</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider">
                  {child.gender}
                </span>
              </div>
              <p className="text-xs text-teal-100 mt-1">
                Yoshi: <strong className="text-white">{child.age} yosh</strong> | Ro'yxatdan o'tgan: {child.registrationDate}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Quick Contact & Status Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Holati</span>
              <p className="text-xs font-black text-teal-800 capitalize mt-0.5">{child.status}</p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Ota-onasi</span>
              <p className="text-xs font-black text-slate-800 mt-0.5">{child.parentName}</p>
              <a
                href={`tel:${child.parentPhone}`}
                className="text-[11px] font-bold text-teal-600 hover:underline flex items-center gap-1 mt-0.5"
              >
                <Phone className="w-3 h-3" />
                {child.parentPhone}
              </a>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">So'nggi Tashxis</span>
              <p className="text-xs font-black text-slate-800 mt-0.5 truncate">
                {latestReport ? latestReport.diagnosisTitle : "Hali tekshirilmagan"}
              </p>
              {latestReport && (
                <span className="text-[10px] text-teal-700 font-bold">Natija: {latestReport.overallScore}%</span>
              )}
            </div>
          </div>

          {/* Complaints */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
            <h4 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider mb-1">
              Birlamchi shikoyat va murojaat sababi:
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed">
              "{child.complaints || "Profilaktik ko'rik"}"
            </p>
          </div>

          {/* Anamnesis details */}
          {child.anamnesis && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <HeartPulse className="w-4 h-4 text-rose-500" />
                Tibbiy-pedagogik anamnez
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600">
                <p>• Homiladorlik: <span className="font-bold text-slate-800">{child.anamnesis.pregnancyCourse || 'Norma'}</span></p>
                <p>• Tug'ruq: <span className="font-bold text-slate-800">{child.anamnesis.deliveryType || 'Tabiiy'}</span></p>
                <p>• Ilk nutq bosqichi: <span className="font-bold text-slate-800">{child.anamnesis.speechMilestones || 'Ma\'lumotsiz'}</span></p>
                <p>• Eshitish / Ko'rish: <span className="font-bold text-slate-800">{child.anamnesis.hearingAndVision || 'Me\'yorda'}</span></p>
                <p className="sm:col-span-2">• Oiladagi nutqiy muhit: <span className="font-bold text-slate-800">{child.anamnesis.familyEnvironment || 'O\'zbek tili'}</span></p>
              </div>
            </div>
          )}

          {/* Child Voice Recordings via Microphone */}
          {onSaveAudioRecording && onDeleteAudioRecording && (
            <div className="p-4 rounded-3xl bg-rose-50/40 border border-rose-100">
              <ChildAudioRecorder
                child={child}
                onSaveAudioRecording={onSaveAudioRecording}
                onDeleteAudioRecording={onDeleteAudioRecording}
              />
            </div>
          )}

          {/* Diagnostic History */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700">
                Diagnostika tarixi ({childReports.length} ta)
              </h4>
              <button
                onClick={() => {
                  onClose();
                  onStartDiagnosis(child);
                }}
                className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              >
                <PlayCircle className="w-3.5 h-3.5" />
                Yangi diagnostika o'tkazish
              </button>
            </div>

            {childReports.length > 0 && (
              <div className="mb-4">
                <SpeechTimelineChart reports={childReports} childName={child.name} />
              </div>
            )}

            {childReports.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs">
                Bu bola bo'yicha hali diagnostika o'tkazilmagan.
              </div>
            ) : (
              <div className="space-y-2">
                {childReports.map(rep => (
                  <div
                    key={rep.id}
                    className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-teal-400 transition flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {rep.overallScore}%
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-slate-800">{rep.diagnosisTitle}</h5>
                        <p className="text-[10px] text-slate-400">{rep.date} • {rep.severity} daraja</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onViewReport(rep);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                    >
                      Batafsil ko'rish
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl text-xs font-bold transition"
          >
            Yopish
          </button>
        </div>
      </div>
    </div>
  );
};
