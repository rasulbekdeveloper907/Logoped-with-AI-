import React, { useState, useRef, useEffect } from 'react';
import { Child, ChildAudioRecording } from '../../types';
import { Mic, Square, Play, Pause, Trash2, Volume2, Plus, Sparkles, Check, Clock, Calendar, AlertCircle } from 'lucide-react';
import { AudioRecorder, sounds } from '../../utils/audioUtils';
import confetti from 'canvas-confetti';

interface Props {
  child: Child;
  onSaveAudioRecording: (childId: string, recording: ChildAudioRecording) => void;
  onDeleteAudioRecording: (childId: string, recordingId: string) => void;
}

export const ChildAudioRecorder: React.FC<Props> = ({
  child,
  onSaveAudioRecording,
  onDeleteAudioRecording,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedData, setRecordedData] = useState<{ dataUrl: string; duration: number } | null>(null);

  // Form inputs for the recording
  const [title, setTitle] = useState('"R" va "L" tovushlari talaffuzi');
  const [targetSound, setTargetSound] = useState('R');
  const [notes, setNotes] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);

  const recorderRef = useRef<AudioRecorder | null>(null);
  const timerIntervalRef = useRef<any>(null);

  // Quick title suggestions
  const quickTitles = [
    '"R" tovushi sinovi',
    '"L" tovushini talaffuz qilish',
    '"S" va "Sh" farqlash',
    'Syujetli rasm bo\'yicha hikoya',
    'Erkin muloqot nutqi',
    'Birlamchi ko\'rik ovozi'
  ];

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, []);

  const handleStartRecording = async () => {
    if (!recorderRef.current) {
      recorderRef.current = new AudioRecorder();
    }
    const started = await recorderRef.current.start();
    if (started) {
      setIsRecording(true);
      setRecordingSeconds(0);
      setRecordedData(null);
      sounds.playClick();

      timerIntervalRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } else {
      alert("Mikrofonga ruxsat berilmadi yoki mikrofon qurilmasi aniqlanmadi.");
    }
  };

  const handleStopRecording = async () => {
    if (recorderRef.current && isRecording) {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      const res = await recorderRef.current.stopAsDataUrl();
      setIsRecording(false);

      if (res.dataUrl) {
        setRecordedData({ dataUrl: res.dataUrl, duration: res.durationSeconds });
        sounds.playDing();
      }
    }
  };

  const handleSaveToProfile = () => {
    if (!recordedData) return;

    const newRecording: ChildAudioRecording = {
      id: 'aud-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: title.trim() || 'Ovoz namunasi',
      audioUrl: recordedData.dataUrl,
      durationSeconds: recordedData.duration,
      targetSound: targetSound || undefined,
      notes: notes.trim() || undefined,
    };

    onSaveAudioRecording(child.id, newRecording);
    sounds.playSuccess();
    try {
      confetti({ particleCount: 30, spread: 50 });
    } catch (e) {}

    // Reset recorder modal
    setRecordedData(null);
    setRecordingSeconds(0);
    setNotes('');
    setIsFormOpen(false);
  };

  const existingRecordings = child.audioRecordings || [];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Bolaning Nutqiy Ovoz Yozuvlari ({existingRecordings.length} ta)
            </h4>
            <p className="text-[11px] text-slate-500">
              Nutqiy namunalar mijoz profiliga biriktiriladi va saqlanadi
            </p>
          </div>
        </div>

        {!isFormOpen && (
          <button
            onClick={() => setIsFormOpen(true)}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Mic className="w-3.5 h-3.5" />
            + Yangi ovoz yozish
          </button>
        )}
      </div>

      {/* Live Recording Panel (when opened) */}
      {isFormOpen && (
        <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-50 via-amber-50/50 to-rose-50 border-2 border-rose-200 text-slate-800 shadow-sm animate-fadeIn space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-rose-800 flex items-center gap-1.5">
              <Mic className="w-3.5 h-3.5 text-rose-600" />
              Mikrofon orqali yozib olish
            </span>
            <button
              onClick={() => {
                if (isRecording) handleStopRecording();
                setIsFormOpen(false);
                setRecordedData(null);
              }}
              className="text-xs font-bold text-slate-400 hover:text-slate-600"
            >
              Yopish
            </button>
          </div>

          {/* Recording Status & Wave Animation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white/90 border border-rose-100">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold transition shadow-md ${
                isRecording ? 'bg-rose-600 animate-pulse' : 'bg-slate-700'
              }`}>
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xl font-black text-slate-900">
                    {formatTime(recordingSeconds)}
                  </span>
                  {isRecording && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600 animate-pulse">
                      <span className="w-2 h-2 rounded-full bg-rose-600" />
                      Yozilmoqda...
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  {isRecording ? "Bolakay mikrofonga so'z yoki gaplarni aytsin" : "Yozish tugmasini bosing"}
                </p>
              </div>
            </div>

            {/* Live waveform simulator while recording */}
            {isRecording && (
              <div className="flex items-center gap-1 h-8">
                {[12, 24, 16, 28, 20, 32, 18, 26, 14, 30].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-rose-500 rounded-full animate-bounce"
                    style={{ height: `${h}px`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            )}

            {/* Mic control button */}
            <div>
              {!isRecording ? (
                <button
                  type="button"
                  onClick={handleStartRecording}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
                >
                  <Mic className="w-4 h-4" />
                  Yozishni boshlash
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleStopRecording}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
                >
                  <Square className="w-4 h-4 text-rose-400 fill-rose-400" />
                  To'xtatish
                </button>
              )}
            </div>
          </div>

          {/* Audio Preview Player */}
          {recordedData && (
            <div className="p-4 bg-white rounded-2xl border border-rose-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Ovoz yozuvi tayyor:</span>
                <span className="text-xs text-rose-700 font-bold">{recordedData.duration} soniya</span>
              </div>
              <audio controls src={recordedData.dataUrl} className="w-full h-10" />

              {/* Title & Tagging inputs */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Yozuv sarlavhasi (Mavzusi):
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-rose-500"
                    placeholder="Masalan: 'R' tovushini aytishi"
                  />
                  {/* Quick suggestion chips */}
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {quickTitles.map((t, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setTitle(t)}
                        className="px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-[10px] font-medium text-slate-600 transition"
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Tekshirilayotgan tovush:
                    </label>
                    <select
                      value={targetSound}
                      onChange={(e) => setTargetSound(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200"
                    >
                      <option value="R">R tovushi (Sonor)</option>
                      <option value="L">L tovushi (Sonor)</option>
                      <option value="S">S tovushi (Hushtakdosh)</option>
                      <option value="Z">Z tovushi (Hushtakdosh)</option>
                      <option value="Sh">Sh tovushi (Shovqinli)</option>
                      <option value="J">J tovushi (Shovqinli)</option>
                      <option value="Ch">Ch tovushi (Shovqinli)</option>
                      <option value="Q">Q tovushi (Til orqa)</option>
                      <option value="K">K tovushi (Til orqa)</option>
                      <option value="Hikoya">Bog'lanishli hikoya</option>
                      <option value="Umumiy">Umumiy nutq</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Logoped izohi / Eslatma:
                    </label>
                    <input
                      type="text"
                      placeholder="Til uchi tebranishi sekin..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-rose-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setRecordedData(null)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                  >
                    Qayta yozish
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveToProfile}
                    className="px-5 py-2 bg-gradient-to-r from-rose-600 to-teal-600 hover:from-rose-700 hover:to-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition"
                  >
                    <Check className="w-4 h-4" />
                    Profilga biriktirish va saqlash
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* List of Attached Audio Recordings */}
      {existingRecordings.length === 0 ? (
        <div className="p-5 text-center rounded-2xl bg-slate-50 border border-dashed border-slate-200 text-slate-400 text-xs">
          Hali hech qanday ovoz namunasi biriktirilmagan. Mikrofon orqali bolaning nutqini yozib oling.
        </div>
      ) : (
        <div className="space-y-2.5">
          {existingRecordings.map((rec) => (
            <div
              key={rec.id}
              className="p-3.5 rounded-2xl bg-white border border-slate-200/90 hover:border-rose-300 shadow-xs transition space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-black shrink-0">
                    {rec.targetSound ? rec.targetSound.charAt(0) : '🎵'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <h5 className="font-extrabold text-xs text-slate-800">{rec.title}</h5>
                      {rec.targetSound && (
                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 text-[10px] font-bold">
                          {rec.targetSound}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <span>{rec.date} {rec.time}</span>
                      <span>•</span>
                      <span>Davomiyligi: {rec.durationSeconds} sek</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteAudioRecording(child.id, rec.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Yozuvni o'chirish"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Audio Player */}
              <audio controls src={rec.audioUrl} className="w-full h-8" />

              {/* Notes */}
              {rec.notes && (
                <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <strong className="text-slate-700">Izoh:</strong> {rec.notes}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
