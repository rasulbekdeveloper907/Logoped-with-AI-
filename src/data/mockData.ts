import { Child, DiagnosticReportData, Exercise, ScheduleItem } from '../types';

export const INITIAL_CHILDREN: Child[] = [
  {
    id: 'ch-1',
    name: 'Jasur Aliyev',
    birthDate: '2021-04-12',
    age: 5.2,
    gender: 'o\'g\'il',
    parentName: 'Nodira Aliyeva',
    parentPhone: '+998 (90) 123-45-67',
    parentTelegram: '@nodira_aliyeva',
    address: 'Toshkent sh., Chilonzor tumani, 9-mavze',
    registrationDate: '2026-09-15',
    status: 'korreksiya',
    complaints: '"R" va "L" tovushlarini aniq ayta olmaydi, ko\'pincha "Y" yoki "V" bilan almashtiradi.',
    anamnesis: {
      pregnancyCourse: 'Bir tekis kechgan, toksikoz 1-trimestrda bo\'lgan.',
      deliveryType: 'Tabiiy tug\'ruq, asoratsiz (Apgar 8/9).',
      speechMilestones: 'Ilk so\'zlar 1 yosh 2 oylikda, iborali nutq 2.5 yoshda paydo bo\'lgan.',
      hearingAndVision: 'Eshitish va ko\'rish me\'yorda, LOR ko\'rigidan o\'tgan.',
      chronicIllness: 'Tez-tez shamollash (ORVI).',
      familyEnvironment: 'Oilada o\'zbek tili. Katta farzand, barcha e\'tibor qaratilgan.'
    },
    notes: 'Bola qiziquvchan, o\'yin tarzida berilgan topshiriqlarni mamnuniyat bilan bajaradi. Qisqa til osti tuguni (uzdechka) yo\'q.'
  },
  {
    id: 'ch-2',
    name: 'Madina Karimova',
    birthDate: '2022-01-20',
    age: 4.5,
    gender: 'qiz',
    parentName: 'Dilnoza Karimova',
    parentPhone: '+998 (93) 765-43-21',
    parentTelegram: '@dilnoza_k',
    address: 'Toshkent sh., Yunusobod tumani',
    registrationDate: '2026-10-02',
    status: 'diagnostika',
    complaints: 'Shipillovchi va hushtakdosh tovushlar (S, Z, Sh) qorishib ketadi. Bog\'chadagi tarbiyachi logopedga ko\'rsatishni maslahat berdi.',
    anamnesis: {
      pregnancyCourse: 'Normal, homila kislorod yetishmovchiligi bo\'lmagan.',
      deliveryType: 'Kesarcha kesish.',
      speechMilestones: 'G\'uldirash faol bo\'lgan, lekin so\'z boyligi sekin kengaygan.',
      hearingAndVision: 'Me\'yorda.',
      familyEnvironment: 'Oila tinch, ertaklar ko\'p o\'qib beriladi.'
    },
    notes: 'Fonematik eshitish ustida ko\'proq ishlash zarur.'
  },
  {
    id: 'ch-3',
    name: 'Amir Temirov',
    birthDate: '2020-08-10',
    age: 6.1,
    gender: 'o\'g\'il',
    parentName: 'Rustam Temirov',
    parentPhone: '+998 (97) 555-88-99',
    parentTelegram: '@rustam_t',
    address: 'Toshkent sh., Mirzo Ulug\'bek tumani',
    registrationDate: '2026-08-20',
    status: 'korreksiya',
    complaints: 'Maktabga tayyorgarlik ko\'rmoqda. Gaplarni to\'liq tuzishda qiynaladi, ko\'plik va kelishik qo\'shimchalarida adashadi.',
    anamnesis: {
      pregnancyCourse: 'Homiladorlikda kamqonlik (anemiya).',
      deliveryType: 'Tabiiy, muddatida.',
      speechMilestones: 'Birinchi so\'zlar 1.8 yoshda, kechikkan.',
      hearingAndVision: 'Tekshirilgan, norma.',
      familyEnvironment: 'Ota-ona ishda ko\'p bo\'ladi, planshetda multfilm ko\'rish ko\'p bo\'lgan.'
    },
    notes: 'Umumiy nutq rivojlanmaganligi (UNR 3-daraja) bo\'yicha darslar olib borilmoqda. Dinamika ijobiy.'
  },
  {
    id: 'ch-4',
    name: 'Rayhona Zokirova',
    birthDate: '2023-03-05',
    age: 3.6,
    gender: 'qiz',
    parentName: 'Shahlo Zokirova',
    parentPhone: '+998 (99) 333-22-11',
    address: 'Toshkent sh., Shayxontohur tumani',
    registrationDate: '2026-10-25',
    status: 'yangi',
    complaints: 'Profilaktik ko\'rik. Ota-onasi yoshiga nisbatan nutqi to\'g\'ri rivojlanyaptimi yoki yo\'qligini bilmoqchi.',
    anamnesis: {
      pregnancyCourse: 'Asoratsiz.',
      deliveryType: 'Tabiiy.',
      speechMilestones: '1 yoshida 10 ga yaqin so\'z aytgan.',
      hearingAndVision: 'Sog\'lom.',
      familyEnvironment: 'Doimiy muloqot, kitobxonlik muhiti.'
    },
    notes: 'Birlamchi diagnostikaga yozilgan.'
  }
];

export const INITIAL_REPORTS: DiagnosticReportData[] = [
  {
    id: 'rep-jasur-1',
    childId: 'ch-1',
    childName: 'Jasur Aliyev',
    childAge: 5.2,
    date: '2026-09-16',
    scores: {
      articulation: {
        score: 13,
        maxScore: 20,
        percentage: 65,
        problemSounds: ['R', 'L'],
        details: {
          'R': 'distorsiya',
          'L': 'substitutsiya',
          'S': 'norma',
          'Z': 'norma',
          'Sh': 'norma',
          'J': 'norma',
          'Ch': 'norma',
          'Q': 'norma',
          'K': 'norma'
        }
      },
      phonemic: {
        score: 18,
        maxScore: 20,
        percentage: 90,
        details: { pairsDiscrimination: 10, soundIdentification: 5, firstSoundFinding: 3 }
      },
      vocabulary: {
        score: 17,
        maxScore: 20,
        percentage: 85,
        details: { generalization: 7, oddOneOut: 5, antonyms: 5 }
      },
      grammar: {
        score: 18,
        maxScore: 20,
        percentage: 90,
        details: { pluralForms: 7, prepositionsAndCases: 6, tenseConjugation: 5 }
      },
      connectedSpeech: {
        score: 16,
        maxScore: 20,
        percentage: 80,
        storyOrderCorrect: true,
        details: { logicOrder: 6, sentenceCompleteness: 5, independence: 5 }
      },
      speechRhythm: {
        tempo: 'me\'yorida',
        stutteringSigns: false,
        breathing: 'to\'g\'ri'
      }
    },
    diagnosisTitle: 'Dislaliya (Rotatsizm va Lambdatsizm)',
    diagnosisCode: 'DIS-ROT-LAM',
    severity: 'Yengil',
    overallScore: 82,
    therapyDuration: '2 - 3 oy (haftasiga 2 dars)',
    summary: 'Jasur 5 yoshli bolalar uchun nutqiy rivojlanishning grammatik va leksik darajasiga to\'liq javob beradi. Asosiy nuqson sonor tovushlar (R va L) talaffuzida namoyon bo\'lmoqda: "R" tovushi tebranishsiz (velar/tomoqqa yaqin) talaffuz qilinadi, "L" tovushi esa ayrim holatlarda "Y" ga aylanmoqda. Fonematik idrok va so\'z boyligi juda yaxshi shakllangan.',
    specialistRecommendations: [
      'Artikulyatsion apparat: til uchi va yon qirralarini baquvvat qilish uchun "Otcha", "Zamburug\'", "Yelpig\'ich" mashqlari.',
      'L tovushini mexanik usulda (til uchini yuqori tishlar orqasiga tirab) to\'g\'ri pozitsiyaga qo\'yish.',
      'R tovushi vibratsiyasini "D-D-D-D" mashqi orqali til uchida uyg\'otish.',
      'Tovushlarni dastlab ochiq va yopiq bo\'g\'inlarda (RA, RO, RU, AR, OR), so\'ngra so\'zlarda avtomatlashtirish.'
    ],
    parentHomeExercises: [
      {
        title: 'Otcha tuyog\'i',
        desc: 'Oyna oldida o\'tirib, tilni tanglayga yopishtirib, ot tuyog\'idek "taq-tuq" chertish. Kuniga 2 marta 15 martadan.',
        target: 'Til yuganchasini cho\'zish va til muskullarini chiniqtirish'
      },
      {
        title: 'Motorcha gurillaydi',
        desc: 'Katta nafas olib, lablarni bo\'sh qo\'yib "br-r-r" qilish yoki tilni yuqori tishlarga tirab "dr-r-r" deb motor ovozini taqlid qilish.',
        target: 'Til uchida titrash (vibratsiya) hosil qilish'
      },
      {
        title: 'Qayiqcha parvozi (Nafas mashqi)',
        desc: 'Suv to\'ldirilgan idishga qog\'oz qayiqcha qo\'yib, yonoqlarni shishirmasdan, tilni naycha qilib puflash.',
        target: 'Yo\'naltirilgan kuchli havo oqimi hosil qilish'
      }
    ],
    source: 'gemini-ai'
  },
  {
    id: 'rep-jasur-2',
    childId: 'ch-1',
    childName: 'Jasur Aliyev',
    childAge: 5.3,
    date: '2026-10-25',
    scores: {
      articulation: {
        score: 16,
        maxScore: 20,
        percentage: 80,
        problemSounds: ['R'],
        details: {
          'R': 'distorsiya',
          'L': 'norma',
          'S': 'norma',
          'Z': 'norma',
          'Sh': 'norma',
          'J': 'norma',
          'Ch': 'norma',
          'Q': 'norma',
          'K': 'norma'
        }
      },
      phonemic: {
        score: 19,
        maxScore: 20,
        percentage: 95,
        details: { pairsDiscrimination: 10, soundIdentification: 5, firstSoundFinding: 4 }
      },
      vocabulary: {
        score: 18,
        maxScore: 20,
        percentage: 90,
        details: { generalization: 8, oddOneOut: 5, antonyms: 5 }
      },
      grammar: {
        score: 19,
        maxScore: 20,
        percentage: 95,
        details: { pluralForms: 7, prepositionsAndCases: 7, tenseConjugation: 5 }
      },
      connectedSpeech: {
        score: 17,
        maxScore: 20,
        percentage: 85,
        storyOrderCorrect: true,
        details: { logicOrder: 7, sentenceCompleteness: 5, independence: 5 }
      },
      speechRhythm: {
        tempo: 'me\'yorida',
        stutteringSigns: false,
        breathing: 'to\'g\'ri'
      }
    },
    diagnosisTitle: 'Dislaliya (Ijobiy dinamika: L me\'yorda, R avtomatlashtirilmoqda)',
    diagnosisCode: 'DIS-ROT',
    severity: 'Yengil',
    overallScore: 89,
    therapyDuration: '1 - 1.5 oy (haftasiga 2 dars)',
    summary: 'Jasurda bir oylik intensiv korreksiya mashg\'ulotlaridan so\'ng juda sezilarli ijobiy o\'sish kuzatildi: "L" tovushi to\'liq toza avtomatlashtirildi, "R" tovushi bo\'g\'inlarda paydo bo\'ldi. Fonematik idrok a\'lo darajada.',
    specialistRecommendations: [
      '"R" tovushini so\'zlar va gaplarda mustahkamlash.',
      'Tez aytishlar va she\'rlar yordamida nutqiy ravonlikni oshirish.'
    ],
    parentHomeExercises: [
      {
        title: 'Motorcha va samolyot',
        desc: 'Kuniga 2 marta "Dr-r-r" va "Tr-r-r" tovushlarini birga takrorlash.',
        target: 'R tovushini so\'zlarda mustahkamlash'
      }
    ],
    source: 'gemini-ai'
  },
  {
    id: 'rep-madina-1',
    childId: 'ch-2',
    childName: 'Madina Karimova',
    childAge: 4.5,
    date: '2026-10-05',
    scores: {
      articulation: {
        score: 12,
        maxScore: 20,
        percentage: 60,
        problemSounds: ['S', 'Z', 'Sh'],
        details: { 'S': 'substitutsiya', 'Z': 'substitutsiya', 'Sh': 'distorsiya' }
      },
      phonemic: {
        score: 13,
        maxScore: 20,
        percentage: 65,
        details: { pairsDiscrimination: 6, soundIdentification: 4, firstSoundFinding: 3 }
      },
      vocabulary: {
        score: 15,
        maxScore: 20,
        percentage: 75,
        details: { generalization: 6, oddOneOut: 4, antonyms: 5 }
      },
      grammar: {
        score: 14,
        maxScore: 20,
        percentage: 70,
        details: { pluralForms: 5, prepositionsAndCases: 5, tenseConjugation: 4 }
      },
      connectedSpeech: {
        score: 14,
        maxScore: 20,
        percentage: 70,
        storyOrderCorrect: true,
        details: { logicOrder: 5, sentenceCompleteness: 4, independence: 5 }
      }
    },
    diagnosisTitle: 'Fonetik-fonematik nutq yetishmovchiligi (FFNYe)',
    diagnosisCode: 'FFNYe',
    severity: 'O\'rta',
    overallScore: 68,
    therapyDuration: '3 - 5 oy (haftasiga 2-3 dars)',
    summary: 'Madinada hushtakdosh va shipillovchi tovushlarni eshitish orqali farqlashda qiyinchiliklar mavjud. Fonematik eshitishni rivojlantirish zarur.',
    specialistRecommendations: [
      'Hushtakdosh va shipillovchi tovushlarni differensiatsiya qilish mashqlari.',
      'Lab va til mushaklari tonusini oshirish.'
    ],
    parentHomeExercises: [
      {
        title: 'Quloq sol va qarsak chal',
        desc: 'Ota-ona so\'zlarni aytganda bola "S" eshitilsa qarsak chaladi.',
        target: 'Fonematik eshitish'
      }
    ],
    source: 'gemini-ai'
  }
];

export const INITIAL_EXERCISES: Exercise[] = [
  {
    id: 'ex-1',
    title: 'Otcha (Taqillatish)',
    category: 'artikulyatsiya',
    targetSound: 'R, L',
    targetMuscle: 'Til uchi va tanasi',
    description: 'Tilni yuqori tanglayga mahkam yopishtirib, ot tuyog\'i kabi kuchli chertish.',
    instructions: [
      'Og\'izni tabassum qilib biroz oching.',
      'Tilning butun yuzasini qattiq tanglayga yopishtiring.',
      'Tilni tanglaydan kuch bilan uzib, "taq" ovozi chiqaring.',
      'Pastroqdan boshlab, sekin-asta tezlashtiring.'
    ],
    parentTip: 'Bola bilan oyna oldida o\'tiring va "Kimning oti balandroq taqillaydi?" o\'yinini o\'ynang.',
    durationSeconds: 45,
    repetitions: '15-20 marta',
    iconName: 'Horse',
    difficulty: 'Oson'
  },
  {
    id: 'ex-2',
    title: 'Shirin murabbo',
    category: 'artikulyatsiya',
    targetSound: 'Sh, J, R',
    targetMuscle: 'Yuqori lab va til ko\'tarilishi',
    description: 'Tilning keng uchi bilan yuqori labni tepadan pastga qarab yalash.',
    instructions: [
      'Og\'izni yarim ochiq holatda ushlang.',
      'Tilning keng qismini yuqori lab ustiga qo\'ying.',
      'Yuqori labni yuqoridan pastga tomon sekin yalating.',
      'Pastki jag\' qimirlamasligi kerak, faqat til ishlaydi.'
    ],
    parentTip: 'Bolaning yuqori labiga ozroq tabiiy asal yoki murabbo surtib qo\'ysangiz, mashq yanada qiziqarli bo\'ladi!',
    durationSeconds: 60,
    repetitions: '8-10 marta',
    iconName: 'Smile',
    difficulty: 'Oson'
  },
  {
    id: 'ex-3',
    title: 'Zamburug\' (Gribok)',
    category: 'artikulyatsiya',
    targetSound: 'R, Sh',
    targetMuscle: 'Til osti yuganchasi (uzdechka)',
    description: 'Tilni tanglayga yopishtirib, pastki jag\'ni pastga tushirish (til zamburug\' qalpoqchasiga o\'xshaydi).',
    instructions: [
      'Tilni tanglayga to\'liq yopishtiring (Otcha mashqidagi kabi).',
      'Tilni ajratmasdan og\'izni iloji boricha kengroq oching.',
      'Shu holatda 5-7 soniya qimirlamasdan ushlab turing.',
      'Og\'izni yopib, dam oling.'
    ],
    parentTip: 'Ushbu mashq qisqa til bog\'lamini operatsiyasiz cho\'zishda eng samarali hisoblanadi.',
    durationSeconds: 60,
    repetitions: '5-6 marta (5 soniyadan ushlab)',
    iconName: 'Sparkles',
    difficulty: 'O\'rta'
  },
  {
    id: 'ex-4',
    title: 'Bo\'yoqchi (Malyar)',
    category: 'artikulyatsiya',
    targetSound: 'L, R',
    targetMuscle: 'Qattiq va yumshoq tanglay sezuvchanligi',
    description: 'Til uchi bilan yuqori tanglayni tishlardan tomoqqa tomon silash.',
    instructions: [
      'Og\'izni keng oching.',
      'Til uchini yuqori tishlar orqasiga qo\'ying.',
      'Til bilan tanglayni xuddi cho\'tka bilan shiftni bo\'yayotgandek oldinga va orqaga silang.',
      'Jag\' qimirlamasligini nazorat qiling.'
    ],
    parentTip: 'Bolaga: "Keling, tanglayimizni chiroyli kamalak ranglariga bo\'yab chiqamiz!" deb ayting.',
    durationSeconds: 45,
    repetitions: '10-12 marta',
    iconName: 'Paintbrush',
    difficulty: 'Oson'
  },
  {
    id: 'ex-5',
    title: 'Sehrli shamcha (Nafas mashqi)',
    category: 'nafas',
    targetSound: 'Barcha tovushlar',
    targetMuscle: 'Diafragma va havo oqimi',
    description: 'Burundan chuqur nafas olib, lablarni cho\'chaytirib havo oqimini bir tekis uzoq puflash.',
    instructions: [
      'Burun orqali yelkalarni ko\'tarmasdan chuqur nafas oling.',
      'Lablarni naycha qilib cho\'zing.',
      'Yonoqlarni shishirmasdan, sham olovini o\'chirmay tebratish kabi sekin puflang.',
      'Puflash kamida 4-5 soniya davom etsin.'
    ],
    parentTip: 'Oldiga qog\'ozdan kapalak yoki paxta qo\'yib, kim uni uzoqroq uchira olishini sinab ko\'ring.',
    durationSeconds: 60,
    repetitions: '4-5 marta',
    iconName: 'Wind',
    difficulty: 'Oson'
  },
  {
    id: 'ex-6',
    title: 'Koptokcha (Yonoqlar massaji)',
    category: 'artikulyatsiya',
    targetSound: 'S, Z',
    targetMuscle: 'Yonoq va til mushaklari',
    description: 'Til uchini navbatma-navbat o\'ng va chap yonoq ichki devoriga qattiq bosish.',
    instructions: [
      'Og\'izni yopiq holda ushlang.',
      'Til bilan o\'ng yonoqni ichkaridan bosing (koptokcha hosil bo\'ladi).',
      'Keyin chap yonoqni bosing.',
      'Barmoq bilan yonoq ustidan ozroq qarshilik ko\'rsatish mumkin.'
    ],
    parentTip: 'Yonoqdagi dumaloq koptokchani ota-ona barmog\'i bilan "tutib olishi" mumkin.',
    durationSeconds: 45,
    repetitions: '10 marta har ikki tomonga',
    iconName: 'CircleDot',
    difficulty: 'Oson'
  }
];

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    childId: 'ch-1',
    childName: 'Jasur Aliyev',
    date: '2026-10-31',
    time: '10:00',
    sessionType: 'Individual dars',
    status: 'rejalashtirilgan',
    durationMinutes: 40,
    notes: 'R tovushini bo\'g\'inlarda avtomatlashtirish, shamcha nafas mashqi'
  },
  {
    id: 'sch-2',
    childId: 'ch-2',
    childName: 'Madina Karimova',
    date: '2026-10-31',
    time: '11:00',
    sessionType: 'Diagnostika',
    status: 'rejalashtirilgan',
    durationMinutes: 45,
    notes: 'To\'liq nutqiy diagnostika va ota-onaga dastlabki konsultatsiya'
  },
  {
    id: 'sch-3',
    childId: 'ch-3',
    childName: 'Amir Temirov',
    date: '2026-11-01',
    time: '14:30',
    sessionType: 'Individual dars',
    status: 'rejalashtirilgan',
    durationMinutes: 45,
    notes: 'Grammatik tuzilish: kelishik qo\'shimchalari va ketma-ket rasmlar'
  },
  {
    id: 'sch-4',
    childId: 'ch-4',
    childName: 'Rayhona Zokirova',
    date: '2026-11-02',
    time: '09:30',
    sessionType: 'Diagnostika',
    status: 'rejalashtirilgan',
    durationMinutes: 40,
    notes: 'Profilaktik tekshiruv va erta nutq rivojlanishi anketasi'
  }
];
