import React, { useState, useRef } from 'react';
import { ARTICULATION_TESTS, ArticulationCard } from '../../data/diagnosticTests';
import { SoundStatus } from '../../types';
import { Volume2, Mic, Square, Play, CheckCircle2, AlertTriangle, RefreshCw, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { speakText, sounds, AudioRecorder } from '../../utils/audioUtils';

interface Props {
  results: Record<string, SoundStatus>;
  problemSounds: string[];
  onUpdateStatus: (sound: string, cardId: string, status: SoundStatus) => void;
  onCompleteSection: () => void;
}

export const ArticulationTest: React.FC<Props> = ({
  results,
  problemSounds,
  onUpdateStatus,
  onCompleteSection,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);

  const filteredCards = selectedGroup === 'all'
    ? ARTICULATION_TESTS
    : ARTICULATION_TESTS.filter(c => c.soundGroup === selectedGroup);

  const currentCard: ArticulationCard = filteredCards[currentIndex] || ARTICULATION_TESTS[0];
  const currentStatus = results[currentCard.id] || 'norma';

  const handleSpeech = () => {
    speakText(`${currentCard.word}. ${currentCard.prompt}`);
  };

  const handleStartRecording = async () => {
    if (!audioRecorderRef.current) {
      audioRecorderRef.current = new AudioRecorder();
    }
    const started = await audioRecorderRef.current.start();
    if (started) {
      setIsRecording(true);
      setRecordedAudio(null);
    }
  };

  const handleStopRecording = async () => {
    if (audioRecorderRef.current && isRecording) {
      const url = await audioRecorderRef.current.stop();
      setIsRecording(false);
      if (url) {
        setRecordedAudio(url);
        sounds.playDing();
      }
    }
  };

  const handleSetStatus = (status: SoundStatus) => {
    sounds.playClick();
    onUpdateStatus(currentCard.sound, currentCard.id, status);
  };

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setRecordedAudio(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setRecordedAudio(null);
    }
  };

  const testedCount = Object.keys(results).length;

  return (
    <div className="space-y-6">
      {/* Category selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-2xl shadow-xs border border-slate-100">
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">Guruh:</span>
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'sonor', label: 'Sonor (R, L)' },
            { id: 'hushtakdosh', label: 'Hushtakdosh (S, Z)' },
            { id: 'shovqinli', label: 'Shovqinli (Sh, J, Ch)' },
            { id: 'til_orqa', label: 'Til orqa (Q, K)' },
          ].map((grp) => (
            <button
              key={grp.id}
              onClick={() => {
                setSelectedGroup(grp.id);
                setCurrentIndex(0);
                setRecordedAudio(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                selectedGroup === grp.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {grp.label}
            </button>
          ))}
        </div>

        <div className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
          Kartochka: <span className="text-teal-700">{currentIndex + 1}</span> / {filteredCards.length}
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 relative overflow-hidden">
        {/* Sound Badge Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-sm">
              {currentCard.sound}
            </span>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                Tovush pozitsiyasi: {currentCard.position}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                {currentCard.word}
              </h3>
            </div>
          </div>

          <button
            onClick={handleSpeech}
            className="p-3 rounded-2xl bg-teal-50 text-teal-700 hover:bg-teal-100 transition flex items-center gap-2 text-sm font-semibold"
            title="Ovozli eshitish"
          >
            <Volume2 className="w-5 h-5 text-teal-600" />
            <span className="hidden sm:inline">Eshitish</span>
          </button>
        </div>

        {/* Center Visual Content */}
        <div className="my-6 text-center">
          <div className="inline-flex items-center justify-center w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-amber-50/80 border-2 border-amber-200 text-7xl sm:text-8xl shadow-inner select-none transition-transform hover:scale-105 duration-300">
            {currentCard.emoji}
          </div>

          <div className="mt-4">
            <p className="text-sm font-medium text-slate-500">
              Bo'g'inlar: <span className="font-bold text-slate-800 text-base">{currentCard.syllables}</span>
            </p>
            <p className="text-base sm:text-lg font-bold text-teal-800 mt-1">
              "{currentCard.prompt}"
            </p>
            <p className="text-xs text-slate-400 mt-1 italic">
              Misol: {currentCard.sampleSentence}
            </p>
          </div>
        </div>

        {/* Child Audio Recorder Section */}
        <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isRecording ? 'bg-rose-500 text-white animate-pulse' : 'bg-slate-200 text-slate-600'
            }`}>
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-700">Bolaning talaffuzini yozib olish</h4>
              <p className="text-[11px] text-slate-400">
                {isRecording ? "Ovoz yozilmoqda... Bolakay so'zni aytsin" : "Mikrofon orqali yozib, qayta eshitish mumkin"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
              >
                <Mic className="w-4 h-4" />
                Yozishni boshlash
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
              >
                <Square className="w-4 h-4 text-rose-400 fill-rose-400" />
                Yozishni to'xtatish
              </button>
            )}

            {recordedAudio && (
              <audio controls src={recordedAudio} className="h-9 max-w-[200px]" />
            )}
          </div>
        </div>

        {/* Logoped Evaluation Buttons */}
        <div className="border-t border-slate-100 pt-5">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-3">
            Logoped bahosi ({currentCard.sound} tovushi):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <button
              onClick={() => handleSetStatus('norma')}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                currentStatus === 'norma'
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500/30'
                  : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">To'g'ri (Norma)</span>
                <CheckCircle2 className={`w-4 h-4 ${currentStatus === 'norma' ? 'text-emerald-600' : 'text-slate-300'}`} />
              </div>
              <span className="text-[11px] text-slate-500">Aniq, toza talaffuz</span>
            </button>

            <button
              onClick={() => handleSetStatus('distorsiya')}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                currentStatus === 'distorsiya'
                  ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/30'
                  : 'bg-white border-slate-200 hover:border-amber-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Distorsiya</span>
                <AlertTriangle className={`w-4 h-4 ${currentStatus === 'distorsiya' ? 'text-amber-600' : 'text-slate-300'}`} />
              </div>
              <span className="text-[11px] text-slate-500">Buzib (tomoqda/yon)</span>
            </button>

            <button
              onClick={() => handleSetStatus('substitutsiya')}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                currentStatus === 'substitutsiya'
                  ? 'bg-orange-50 border-orange-500 text-orange-900 ring-2 ring-orange-500/30'
                  : 'bg-white border-slate-200 hover:border-orange-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Substitutsiya</span>
                <RefreshCw className={`w-4 h-4 ${currentStatus === 'substitutsiya' ? 'text-orange-600' : 'text-slate-300'}`} />
              </div>
              <span className="text-[11px] text-slate-500">Boshqa tovushga almashadi</span>
            </button>

            <button
              onClick={() => handleSetStatus('eliziya')}
              className={`p-3 rounded-2xl text-left border transition flex flex-col justify-between ${
                currentStatus === 'eliziya'
                  ? 'bg-rose-50 border-rose-500 text-rose-900 ring-2 ring-rose-500/30'
                  : 'bg-white border-slate-200 hover:border-rose-300 text-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold">Eliziya</span>
                <span className="text-xs font-bold text-rose-500">Ø</span>
              </div>
              <span className="text-[11px] text-slate-500">Tushirib qoldiradi</span>
            </button>
          </div>
        </div>

        {/* Navigation between cards */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Oldingisi
          </button>

          <div className="text-xs text-slate-400">
            Muammoli tovushlar: {problemSounds.length > 0 ? (
              <span className="text-rose-600 font-bold">{problemSounds.join(', ')}</span>
            ) : (
              <span className="text-emerald-600 font-bold">Aniqlanmadi</span>
            )}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === filteredCards.length - 1}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-900 text-white disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1"
          >
            Keyingisi
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Completion CTA */}
      <div className="flex justify-end">
        <button
          onClick={onCompleteSection}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl text-sm shadow-md flex items-center gap-2"
        >
          <span>Keyingi test bo'limiga o'tish (Fonematik idrok)</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
