export interface ArticulationCard {
  id: string;
  sound: string;
  soundGroup: 'sonor' | 'hushtakdosh' | 'shovqinli' | 'til_orqa';
  word: string;
  syllables: string;
  position: 'boshida' | 'o\'rtasida' | 'oxirida';
  prompt: string;
  emoji: string;
  sampleSentence: string;
}

export const ARTICULATION_TESTS: ArticulationCard[] = [
  // Sonor 'R'
  {
    id: 'art-r-1',
    sound: 'R',
    soundGroup: 'sonor',
    word: 'Raketa',
    syllables: 'Ra - ke - ta',
    position: 'boshida',
    prompt: 'Bu nima? (Raketa)',
    emoji: '🚀',
    sampleSentence: 'Katta raketa fazoga uchdi.'
  },
  {
    id: 'art-r-2',
    sound: 'R',
    soundGroup: 'sonor',
    word: 'Quyosh',
    syllables: 'Qu - yosh',
    position: 'o\'rtasida',
    prompt: 'Osmonimizda porlab turgan nima?',
    emoji: '☀️',
    sampleSentence: 'Sariq quyosh nurlarini sochmoqda.'
  },
  {
    id: 'art-r-3',
    sound: 'R',
    soundGroup: 'sonor',
    word: 'Pomidor',
    syllables: 'Po - mi - dor',
    position: 'oxirida',
    prompt: 'Qizil sabzavotning nomi nima?',
    emoji: '🍅',
    sampleSentence: 'Qizil pomidor juda shirin.'
  },

  // Sonor 'L'
  {
    id: 'art-l-1',
    sound: 'L',
    soundGroup: 'sonor',
    word: 'Lola',
    syllables: 'Lo - la',
    position: 'boshida',
    prompt: 'Bahorda ochiladigan bu gul nima?',
    emoji: '🌷',
    sampleSentence: 'Qizil lola qirda ochildi.'
  },
  {
    id: 'art-l-2',
    sound: 'L',
    soundGroup: 'sonor',
    word: 'Olma',
    syllables: 'Ol - ma',
    position: 'o\'rtasida',
    prompt: 'Shirin mevaning nomi nima?',
    emoji: '🍎',
    sampleSentence: 'Daraxtda qizil olma pishdi.'
  },
  {
    id: 'art-l-3',
    sound: 'L',
    soundGroup: 'sonor',
    word: 'Stol',
    syllables: 'Stol',
    position: 'oxirida',
    prompt: 'Dars qiladigan mebel nima deyiladi?',
    emoji: '🪑',
    sampleSentence: 'Yog\'och stol ustida daftar bor.'
  },

  // Hushtakdosh 'S'
  {
    id: 'art-s-1',
    sound: 'S',
    soundGroup: 'hushtakdosh',
    word: 'Sovun',
    syllables: 'So - vun',
    position: 'boshida',
    prompt: 'Qo\'limizni nima bilan yuvamiz?',
    emoji: '🧼',
    sampleSentence: 'Sovun bilan qo\'lni toza yuvamiz.'
  },
  {
    id: 'art-s-2',
    sound: 'S',
    soundGroup: 'hushtakdosh',
    word: 'Soat',
    syllables: 'So - at',
    position: 'boshida',
    prompt: 'Vaqtni ko\'rsatadigan asbob nima?',
    emoji: '⏰',
    sampleSentence: 'Devoriy soat taq-tuq qiladi.'
  },
  {
    id: 'art-s-3',
    sound: 'S',
    soundGroup: 'hushtakdosh',
    word: 'Avtobus',
    syllables: 'Av - to - bus',
    position: 'oxirida',
    prompt: 'Katta yo\'lovchi transporti nima?',
    emoji: '🚌',
    sampleSentence: 'Sariq avtobus bekatga keldi.'
  },

  // Hushtakdosh 'Z'
  {
    id: 'art-z-1',
    sound: 'Z',
    soundGroup: 'hushtakdosh',
    word: 'Zebra',
    syllables: 'Zeb - ra',
    position: 'boshida',
    prompt: 'Oq-qora chiziqli hayvon qaysi?',
    emoji: '🦓',
    sampleSentence: 'Zebra o\'tloqda yugurmoqda.'
  },
  {
    id: 'art-z-2',
    sound: 'Z',
    soundGroup: 'hushtakdosh',
    word: 'Yulduz',
    syllables: 'Yul - duz',
    position: 'oxirida',
    prompt: 'Tunda osmonda nima miltillaydi?',
    emoji: '⭐',
    sampleSentence: 'Tungi osmonda yorqin yulduz yondi.'
  },

  // Shovqinli 'Sh'
  {
    id: 'art-sh-1',
    sound: 'Sh',
    soundGroup: 'shovqinli',
    word: 'Shar',
    syllables: 'Shar',
    position: 'boshida',
    prompt: 'Puflab uchiriladigan o\'yinchoq nima?',
    emoji: '🎈',
    sampleSentence: 'Qizil shar havoga uchdi.'
  },
  {
    id: 'art-sh-2',
    sound: 'Sh',
    soundGroup: 'shovqinli',
    word: 'Mashina',
    syllables: 'Ma - shi - na',
    position: 'o\'rtasida',
    prompt: 'Ko\'chada ketayotgan ulov nima?',
    emoji: '🚗',
    sampleSentence: 'Tezkor mashina yo\'lda yurmoqda.'
  },
  {
    id: 'art-sh-3',
    sound: 'Sh',
    soundGroup: 'shovqinli',
    word: 'Qush',
    syllables: 'Qush',
    position: 'oxirida',
    prompt: 'Qanotli do\'stimiz nima deyiladi?',
    emoji: '🐦',
    sampleSentence: 'Kichik qush daraxtda sayraydi.'
  },

  // Shovqinli 'J'
  {
    id: 'art-j-1',
    sound: 'J',
    soundGroup: 'shovqinli',
    word: 'Jo\'ja',
    syllables: 'Jo\' - ja',
    position: 'boshida',
    prompt: 'Tovuqning sariq bolasini nima deymiz?',
    emoji: '🐥',
    sampleSentence: 'Kichik sariq jo\'ja don termoqda.'
  },

  // Shovqinli 'Ch'
  {
    id: 'art-ch-1',
    sound: 'Ch',
    soundGroup: 'shovqinli',
    word: 'Choynak',
    syllables: 'Choy - nak',
    position: 'boshida',
    prompt: 'Choy damlaydigan idish nima deyiladi?',
    emoji: '🫖',
    sampleSentence: 'Issiq choy choynakda damlandi.'
  },
  {
    id: 'art-ch-2',
    sound: 'Ch',
    soundGroup: 'shovqinli',
    word: 'Qalampir',
    syllables: 'Qa - lam - pir',
    position: 'o\'rtasida',
    prompt: 'Achchiq sabzavot nima?',
    emoji: '🌶️',
    sampleSentence: 'Qizil qalampir juda achchiq.'
  },

  // Til orqa 'Q' va 'K'
  {
    id: 'art-q-1',
    sound: 'Q',
    soundGroup: 'til_orqa',
    word: 'Qurbaqa',
    syllables: 'Qur - ba - qa',
    position: 'boshida',
    prompt: 'Vaq-vaq qiladigan yashil jonivor nima?',
    emoji: '🐸',
    sampleSentence: 'Yashil qurbaqa ko\'lda sakramoqda.'
  },
  {
    id: 'art-k-1',
    sound: 'K',
    soundGroup: 'til_orqa',
    word: 'Kapalak',
    syllables: 'Ka - pa - lak',
    position: 'boshida',
    prompt: 'Gullar uzra uchib yuruvchi go\'zal hasharot?',
    emoji: '🦋',
    sampleSentence: 'Rang-barang kapalak gulga qo\'ndi.'
  }
];

export interface PhonemicPairTest {
  id: string;
  type: 'pairs' | 'identification' | 'firstSound';
  title: string;
  question: string;
  audioPrompt?: string;
  options: {
    text: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const PHONEMIC_TESTS: PhonemicPairTest[] = [
  {
    id: 'phn-1',
    type: 'pairs',
    title: 'Akustik juftlik (S vs Sh)',
    question: 'Qaysi rasm "TOSh" so\'zini bildiradi?',
    options: [
      { text: 'Tos (tog\'ora)', emoji: '🥣', isCorrect: false },
      { text: 'Tosh', emoji: '🪨', isCorrect: true }
    ],
    explanation: '"Tos" va "Tosh" so\'zlari faqat bitta tovush (S va Sh) bilan farq qiladi.'
  },
  {
    id: 'phn-2',
    type: 'pairs',
    title: 'Akustik juftlik (Q vs G\')',
    question: 'Qaysi rasmda oq "QOR" tasvirlangan?',
    options: [
      { text: 'Qor', emoji: '❄️', isCorrect: true },
      { text: 'G\'or (gora)', emoji: '🕳️', isCorrect: false }
    ],
    explanation: 'Qor va G\'or so\'zlarida jarangli va jarangsiz tovushlar farqlanadi.'
  },
  {
    id: 'phn-3',
    type: 'identification',
    title: 'Tovushni so\'z ichidan topish',
    question: 'Qaysi so\'zda "SH" tovushi eshitiladi?',
    options: [
      { text: 'Mushuk', emoji: '🐱', isCorrect: true },
      { text: 'Kitob', emoji: '📚', isCorrect: false },
      { text: 'Olma', emoji: '🍎', isCorrect: false }
    ],
    explanation: 'Mu-shuk so\'zining o\'rtasida "SH" tovushi aniq bor.'
  },
  {
    id: 'phn-4',
    type: 'identification',
    title: 'Tovushni so\'z ichidan topish',
    question: 'Qaysi so\'zda "R" tovushi eshitiladi?',
    options: [
      { text: 'Lola', emoji: '🌷', isCorrect: false },
      { text: 'Raketa', emoji: '🚀', isCorrect: true },
      { text: 'Koptok', emoji: '⚽', isCorrect: false }
    ],
    explanation: 'Ra-ke-ta so\'zining boshida "R" tovushi mavjud.'
  },
  {
    id: 'phn-5',
    type: 'firstSound',
    title: 'Bosh tovushni aniqlash',
    question: '"Lola" so\'zi qaysi tovush bilan boshlanadi?',
    options: [
      { text: 'L tovushi', emoji: '🇱', isCorrect: true },
      { text: 'M tovushi', emoji: '🇲', isCorrect: false },
      { text: 'B tovushi', emoji: '🇧', isCorrect: false }
    ],
    explanation: '"Lola" so\'zi L tovushidan boshlanadi.'
  }
];

export interface VocabularyQuestion {
  id: string;
  type: 'generalization' | 'oddOneOut' | 'antonyms';
  question: string;
  emojiGroup?: string[];
  options: {
    text: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const VOCABULARY_TESTS: VocabularyQuestion[] = [
  {
    id: 'voc-1',
    type: 'generalization',
    question: 'Olma, Nok, Shaftoli va Uzumni bir so\'z bilan nima deymiz?',
    emojiGroup: ['🍎', '🍐', '🍑', '🍇'],
    options: [
      { text: 'Mevalar', emoji: '🧺', isCorrect: true },
      { text: 'Sabzavotlar', emoji: '🥕', isCorrect: false },
      { text: 'Kiyimlar', emoji: '👕', isCorrect: false }
    ],
    explanation: 'Ular umumlashtiruvchi "Mevalar" tushunchasiga kiradi.'
  },
  {
    id: 'voc-2',
    type: 'oddOneOut',
    question: 'Bu qatordan ortiqcha (mos kelmaydigan) narsani toping:',
    options: [
      { text: 'Avtobus', emoji: '🚌', isCorrect: false },
      { text: 'Samolyot', emoji: '✈️', isCorrect: false },
      { text: 'Mashina', emoji: '🚗', isCorrect: false },
      { text: 'Banan', emoji: '🍌', isCorrect: true }
    ],
    explanation: 'Banan meva, qolgan uchtasi esa transport vositalari.'
  },
  {
    id: 'voc-3',
    type: 'antonyms',
    question: '"Katta" so\'zining aksi (qarama-qarshisi) nima?',
    options: [
      { text: 'Kichik', emoji: '🤏', isCorrect: true },
      { text: 'Baland', emoji: '🏔️', isCorrect: false },
      { text: 'Semiz', emoji: '🐘', isCorrect: false }
    ],
    explanation: 'Katta so\'zining antonimi kichik.'
  },
  {
    id: 'voc-4',
    type: 'generalization',
    question: 'Kuchuk, Mushuk, Sigir va Qo\'y qanday hayvonlar?',
    emojiGroup: ['🐕', '🐈', '🐄', '🐑'],
    options: [
      { text: 'Uy hayvonlari', emoji: '🏡', isCorrect: true },
      { text: 'Yovvoyi hayvonlar', emoji: '🌲', isCorrect: false },
      { text: 'Qushlar', emoji: '🪶', isCorrect: false }
    ],
    explanation: 'Ular inson bilan birga yashaydigan uy hayvonlari.'
  }
];

export interface GrammarQuestion {
  id: string;
  type: 'plural' | 'diminutive' | 'verbs';
  prompt: string;
  question: string;
  options: {
    text: string;
    emoji: string;
    isCorrect: boolean;
  }[];
}

export const GRAMMAR_TESTS: GrammarQuestion[] = [
  {
    id: 'grm-1',
    type: 'plural',
    prompt: 'Bitta kitob 📖, agar ko\'p bo\'lsa nima deymiz?',
    question: 'To\'g\'ri ko\'plik shaklini tanlang:',
    options: [
      { text: 'Kitoblar', emoji: '📚', isCorrect: true },
      { text: 'Kitobcha', emoji: '📕', isCorrect: false },
      { text: 'Kitoblarim', emoji: '📖', isCorrect: false }
    ]
  },
  {
    id: 'grm-2',
    type: 'diminutive',
    prompt: 'Katta uy 🏠, kichkina erkalash shakli nima bo\'ladi?',
    question: 'Kichraytirish-erkalash shakli:',
    options: [
      { text: 'Uycha', emoji: '🏡', isCorrect: true },
      { text: 'Uyda', emoji: '🚪', isCorrect: false },
      { text: 'Uylar', emoji: '🏘️', isCorrect: false }
    ]
  },
  {
    id: 'grm-3',
    type: 'verbs',
    prompt: 'Rasmdagi bola nima qilmoqda? 🏃‍♂️',
    question: 'Harakatni to\'g\'ri nomlang:',
    options: [
      { text: 'Yugurmoqda', emoji: '🏃‍♂️', isCorrect: true },
      { text: 'Uxlamoqda', emoji: '🛌', isCorrect: false },
      { text: 'Ovqatlanmoqda', emoji: '🥣', isCorrect: false }
    ]
  }
];

export interface StoryCard {
  id: string;
  order: number;
  text: string;
  emoji: string;
  description: string;
}

export interface ConnectedSpeechStory {
  id: string;
  title: string;
  cards: StoryCard[];
  correctOrder: number[];
  prompt: string;
}

export const CONNECTED_SPEECH_STORIES: ConnectedSpeechStory[] = [
  {
    id: 'story-1',
    title: 'Qushcha uchun uycha',
    prompt: 'Rasmlarni to\'g\'ri ketma-ketlikda joylashtiring va nima sodir bo\'lganini aytib bering:',
    correctOrder: [1, 2, 3, 4],
    cards: [
      {
        id: 'c1',
        order: 1,
        text: 'Sovuq shamol esdi, qushcha daraxtda diydirab o\'tirardi.',
        emoji: '🥶 🐦',
        description: 'Sovuqda daraxtdagi qushcha'
      },
      {
        id: 'c2',
        order: 2,
        text: 'Bolalar qushchaga yog\'ochdan chiroyli in yasadilar.',
        emoji: '🔨 🪵 🏠',
        description: 'Bolalar uycha yasamoqda'
      },
      {
        id: 'c3',
        order: 3,
        text: 'Uychani daraxt shoxiga ehtiyotkorlik bilan o\'rnatdilar.',
        emoji: '🌳 🏠 👦',
        description: 'Uychani daraxtga o\'rnatish'
      },
      {
        id: 'c4',
        order: 4,
        text: 'Qushcha yangi uyiga kirdi va xursand bo\'lib sayradi.',
        emoji: '✨ 🎶 🐦',
        description: 'Qushchaning quvonchi'
      }
    ]
  }
];
