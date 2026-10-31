export type UserRole = 'specialist' | 'parent';

export type ChildStatus = 'yangi' | 'diagnostika' | 'korreksiya' | 'yakunlangan';

export interface ChildAudioRecording {
  id: string;
  date: string;
  time: string;
  title: string;
  audioUrl: string;
  durationSeconds: number;
  targetSound?: string;
  notes?: string;
}

export interface Child {
  id: string;
  name: string;
  birthDate: string;
  age: number; // in years (e.g. 4.5)
  gender: 'o\'g\'il' | 'qiz';
  parentName: string;
  parentPhone: string;
  parentTelegram?: string;
  address?: string;
  photoUrl?: string;
  registrationDate: string;
  status: ChildStatus;
  complaints: string;
  anamnesis: {
    pregnancyCourse?: string; // Homiladorlik kechishi
    deliveryType?: string; // Tug'ruq holati
    speechMilestones?: string; // Ilk g'uldirash, birinchi so'zlar
    hearingAndVision?: string; // Eshitish va ko'rish holati
    chronicIllness?: string; // Surunkali kasalliklar
    familyEnvironment?: string; // Oiladagi ikki tillilik yoki nutqiy muhit
  };
  audioRecordings?: ChildAudioRecording[];
  notes?: string;
}

export type SoundStatus = 'norma' | 'distorsiya' | 'substitutsiya' | 'eliziya';

export interface SoundTestResult {
  sound: string;
  soundGroup: 'sonor' | 'hushtakdosh' | 'shovqinli' | 'til_orqa' | 'boshqa';
  status: SoundStatus;
  substitutedWith?: string;
  recordedAudioUrl?: string;
  notes?: string;
}

export interface DiagnosticScores {
  articulation: {
    score: number;
    maxScore: number;
    percentage: number;
    problemSounds: string[];
    details: Record<string, SoundStatus>;
  };
  phonemic: {
    score: number;
    maxScore: number;
    percentage: number;
    details: {
      pairsDiscrimination: number;
      soundIdentification: number;
      firstSoundFinding: number;
    };
  };
  vocabulary: {
    score: number;
    maxScore: number;
    percentage: number;
    details: {
      generalization: number;
      oddOneOut: number;
      antonyms: number;
    };
  };
  grammar: {
    score: number;
    maxScore: number;
    percentage: number;
    details: {
      pluralForms: number;
      prepositionsAndCases: number;
      tenseConjugation: number;
    };
  };
  connectedSpeech: {
    score: number;
    maxScore: number;
    percentage: number;
    storyOrderCorrect: boolean;
    storyRecordingUrl?: string;
    details: {
      logicOrder: number;
      sentenceCompleteness: number;
      independence: number;
    };
  };
  speechRhythm?: {
    tempo: 'me\'yorida' | 'tez' | 'sekin';
    stutteringSigns: boolean;
    breathing: 'to\'g\'ri' | 'uzuq' | 'yebralgan';
  };
}

export interface ParentExerciseItem {
  title: string;
  desc: string;
  target: string;
}

export interface DiagnosticReportData {
  id: string;
  childId: string;
  childName: string;
  childAge: number;
  date: string;
  scores: DiagnosticScores;
  diagnosisTitle: string;
  diagnosisCode: string;
  severity: 'Me\'yorda' | 'Yengil' | 'O\'rta' | 'Og\'ir';
  overallScore: number;
  therapyDuration: string;
  summary: string;
  specialistRecommendations: string[];
  parentHomeExercises: ParentExerciseItem[];
  source?: 'gemini-ai' | 'expert-engine';
}

export interface Exercise {
  id: string;
  title: string;
  category: 'artikulyatsiya' | 'nafas' | 'fonematik' | 'mayda_motorika' | 'ovoz';
  targetSound?: string;
  targetMuscle?: string;
  description: string;
  instructions: string[];
  parentTip: string;
  durationSeconds: number;
  repetitions: string;
  iconName: string;
  difficulty: 'Oson' | 'O\'rta' | 'Murakkab';
}

export interface ScheduleItem {
  id: string;
  childId: string;
  childName: string;
  date: string;
  time: string;
  sessionType: 'Individual dars' | 'Diagnostika' | 'Guruh mashg\'uloti' | 'Ota-ona maslahati';
  status: 'rejalashtirilgan' | 'bajarildi' | 'qoldirildi';
  durationMinutes: number;
  notes?: string;
}
