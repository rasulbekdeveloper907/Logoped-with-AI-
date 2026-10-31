import React, { useState, useRef } from 'react';
import { CONNECTED_SPEECH_STORIES, ConnectedSpeechStory, StoryCard } from '../../data/diagnosticTests';
import { MessageSquare, Mic, Square, CheckCircle, ArrowRight, ArrowLeft, RotateCcw, Volume2, Sparkles } from 'lucide-react';
import { speakText, sounds, AudioRecorder } from '../../utils/audioUtils';
import confetti from 'canvas-confetti';

interface Props {
  onScoreUpdate: (score: number, maxScore: number, orderCorrect: boolean, audioUrl?: string, rhythmData?: any) => void;
  onFinishDiagnosis: () => void;
  onBack: () => void;
}

export const ConnectedSpeechTest: React.FC<Props> = ({
  onScoreUpdate,
  onFinishDiagnosis,
  onBack,
}) => {
  const story: ConnectedSpeechStory = CONNECTED_SPEECH_STORIES[0];

  // Scramble initial cards
  const [orderedCards, setOrderedCards] = useState<StoryCard[]>([
    story.cards[2],
    story.cards[0],
    story.cards[3],
    story.cards[1],
  ]);

  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState<string | null>(null);
  const audioRecorderRef = useRef<AudioRecorder | null>(null);

  // Speech rhythm evaluation options
  const [tempo, setTempo] = useState<'me\'yorida' | 'tez' | 'sekin'>('me\'yorida');
  const [stutteringSigns, setStutteringSigns] = useState<boolean>(false);
  const [breathing, setBreathing] = useState<'to\'g\'ri' | 'uzuq' | 'yebralgan'>('to\'g\'ri');
  const [independenceScore, setIndependenceScore] = useState<number>(4); // 1-5 scale

  const moveCard = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= orderedCards.length) return;
    sounds.playClick();
    const updated = [...orderedCards];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setOrderedCards(updated);
  };

  const isOrderCorrect = orderedCards.every((card, idx) => card.order === story.correctOrder[idx]);

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
        try {
          confetti({ particleCount: 30, spread: 60 });
        } catch (e) {}
      }
    }
  };

  const handleComplete = () => {
    const logicScore = isOrderCorrect ? 5 : 3;
    const completenessScore = recordedAudio ? 5 : 4;
    const totalScore = logicScore + completenessScore + independenceScore; // max 15

    onScoreUpdate(totalScore, 15, isOrderCorrect, recordedAudio || undefined, {
      tempo,
      stutteringSigns,
      breathing,
    });
    onFinishDiagnosis();
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
              5-bo'lim: Bog'lanishli Nutq va Hikoya Tuzish
            </span>
            <h3 className="text-base font-extrabold text-slate-800">
              {story.title}
            </h3>
          </div>
        </div>

        {isOrderCorrect && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Tartib to'g'ri topildi!</span>
          </div>
        )}
      </div>

      {/* Story sequence ordering */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100">
        <div className="text-center max-w-xl mx-auto mb-6">
          <h2 className="text-lg sm:text-xl font-black text-slate-800">
            "{story.prompt}"
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Rasmlarni tartib bilan chapdan o'ngga (1, 2, 3, 4) suring:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {orderedCards.map((card, idx) => (
            <div
              key={card.id}
              className={`p-4 rounded-2xl border-2 transition-all flex flex-col justify-between ${
                card.order === story.correctOrder[idx]
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : 'border-slate-200 bg-white hover:border-teal-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    {card.order === story.correctOrder[idx] ? 'To\'g\'ri' : ''}
                  </span>
                </div>

                <div className="my-3 text-center text-4xl select-none">
                  {card.emoji}
                </div>

                <p className="text-xs font-semibold text-slate-700 text-center leading-relaxed">
                  {card.text}
                </p>
              </div>

              {/* Movement controls */}
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => moveCard(idx, idx - 1)}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none"
                  title="Chapga surish"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Surish
                </span>
                <button
                  onClick={() => moveCard(idx, idx + 1)}
                  disabled={idx === orderedCards.length - 1}
                  className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:pointer-events-none"
                  title="O'ngga surish"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Narrative Audio Recorder */}
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-5 border border-teal-100 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold shadow-sm ${
                isRecording ? 'bg-rose-500 animate-pulse' : 'bg-teal-600'
              }`}>
                <Mic className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-sm sm:text-base text-slate-800">
                  Bolaning hikoyasini audio yozib olish
                </h4>
                <p className="text-xs text-slate-600 mt-0.5">
                  "Keling, rasmlarda nima bo'lganini bosqichma-bosqich o'zingiz aytib bering!"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              {!isRecording ? (
                <button
                  onClick={handleStartRecording}
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
                >
                  <Mic className="w-4 h-4" />
                  Hikoyani yozish
                </button>
              ) : (
                <button
                  onClick={handleStopRecording}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition"
                >
                  <Square className="w-4 h-4 text-rose-400 fill-rose-400" />
                  Yozishni tugatish
                </button>
              )}

              {recordedAudio && (
                <audio controls src={recordedAudio} className="h-10 max-w-[200px]" />
              )}
            </div>
          </div>
        </div>

        {/* Clinical observations: Speech rhythm, tempo, and breathing */}
        <div className="border-t border-slate-100 pt-5">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Nutq sur'ati va nafas holati (Logoped nazorati):
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nutq sur'ati:</label>
              <select
                value={tempo}
                onChange={(e) => setTempo(e.target.value as any)}
                className="w-full text-xs font-semibold bg-white p-2 rounded-lg border border-slate-200"
              >
                <option value="me'yorida">Me'yorida (Normal)</option>
                <option value="tez">Tezlashgan (Taxilaliya)</option>
                <option value="sekin">Sekinlashgan (Bradilaliya)</option>
              </select>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Duduqlanish belgilari:</label>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setStutteringSigns(false)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                    !stutteringSigns ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  Yo'q
                </button>
                <button
                  type="button"
                  onClick={() => setStutteringSigns(true)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold ${
                    stutteringSigns ? 'bg-rose-600 text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  Mavjud (Kloniya/Tonus)
                </button>
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">Nutqiy nafas olish:</label>
              <select
                value={breathing}
                onChange={(e) => setBreathing(e.target.value as any)}
                className="w-full text-xs font-semibold bg-white p-2 rounded-lg border border-slate-200"
              >
                <option value="to'g'ri">To'g'ri va chuqur (Diafragmal)</option>
                <option value="uzuq">Uzuq-yuluq, nafas yetmaydi</option>
                <option value="yebralgan">Yuzaki (Yelkali nafas)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
        >
          Oldingi bo'lim
        </button>

        <button
          onClick={handleComplete}
          className="px-7 py-3.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-black rounded-2xl text-sm sm:text-base shadow-lg flex items-center gap-2 transform active:scale-95 transition"
        >
          <Sparkles className="w-5 h-5" />
          <span>Diagnostikani yakunlash va AI Tahlilini olish</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
