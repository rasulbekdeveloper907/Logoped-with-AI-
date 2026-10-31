import express, { Request, Response } from 'express';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Shared Gemini client utility on the server
let aiClient: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  aiClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Rule-based diagnostic fallback in case of missing key or API failure
function generateFallbackDiagnosis(childInfo: any, scores: any) {
  const age = Number(childInfo.age) || 5;
  const artScore = scores.articulation?.percentage ?? 75;
  const phnScore = scores.phonemic?.percentage ?? 80;
  const vocScore = scores.vocabulary?.percentage ?? 85;
  const grmScore = scores.grammar?.percentage ?? 80;
  const conScore = scores.connectedSpeech?.percentage ?? 75;

  const avgScore = Math.round((artScore + phnScore + vocScore + grmScore + conScore) / 5);

  let diagnosisTitle = "Yosh me'yoriga mos nutqiy rivojlanish";
  let diagnosisCode = "F.Norma";
  let severity = "Me'yorda";
  let therapyDuration = "Profilaktik kuzatuv (1-2 oy)";

  const problemSounds: string[] = scores.articulation?.problemSounds || [];

  if (avgScore < 50) {
    diagnosisTitle = "Umumiy nutq rivojlanmaganligi (UNR II-III daraja)";
    diagnosisCode = "UNR-II";
    severity = "O'rta-og'ir";
    therapyDuration = "6 - 9 oy (haftasiga 3 marta)";
  } else if (artScore < 70 && phnScore < 70) {
    diagnosisTitle = "Fonetik-fonematik nutq yetishmovchiligi (FFNYe)";
    diagnosisCode = "FFNYe";
    severity = "O'rta";
    therapyDuration = "4 - 6 oy (haftasiga 2-3 marta)";
  } else if (artScore < 75) {
    const soundList = problemSounds.length > 0 ? problemSounds.join(', ') : 'R, L, Sh';
    diagnosisTitle = `Dislaliya (${soundList} tovushlari talaffuzi buzilishi)`;
    diagnosisCode = "Dislaliya";
    severity = "Yengil";
    therapyDuration = "2 - 4 oy (haftasiga 2 marta)";
  } else if (phnScore < 70) {
    diagnosisTitle = "Fonematik eshitish va idrok yetishmovchiligi";
    diagnosisCode = "FE-Yetishmovchilik";
    severity = "Yengil-o'rta";
    therapyDuration = "3 - 5 oy (haftasiga 2-3 marta)";
  }

  return {
    diagnosisTitle,
    diagnosisCode,
    severity,
    overallScore: avgScore,
    therapyDuration,
    summary: `${childInfo.name || "Bola"} (${age} yosh) nutqiy diagnostikasi natijalariga ko'ra, umumiy ko'rsatkich ${avgScore}% ni tashkil etdi. Artikulyatsiya va tovush talaffuzida ${problemSounds.length > 0 ? problemSounds.join(', ') + ' tovushlarida' : "ayrim tovushlarda"} nuqsonlar aniqlandi. Fonematik idrok ${phnScore}% darajada rivojlangan. Bola muloqotga kirishuvchan, ko'rsatmalarni tushunadi.`,
    specialistRecommendations: [
      "Artikulyatsion apparat mushak tonusini mustahkamlash (til, lablar va yumshoq tanglay uchun faol gimnastika).",
      problemSounds.length > 0
        ? `Nuqsonli tovushlarni (${problemSounds.join(', ')}) bosqichma-bosqich qo'yish va bo'g'inlarda avtomatlashtirish.`
        : "Tovushlarni so'z va gaplarda to'g'ri avtomatlashtirish.",
      "Fonematik eshitishni rivojlantirish: jarangli-jarangsiz va qattiq-yumshoq tovushlarni eshitish orqali farqlash o'yinlari.",
      "Bog'lanishli nutqni rivojlantirish: 3-4 ta ketma-ket syujetli rasmlar orqali hikoya tuzish mashqlari."
    ],
    parentHomeExercises: [
      {
        title: "Otcha (Artikulyatsion mashq)",
        desc: "Tilni tanglayga yopishtirib, ot tuyog'i kabi 'taq-tuq' ovoz chiqarib chertish (kuniga 10-15 marta).",
        target: "Til mushaklarini baquvvat qilish"
      },
      {
        title: "Sehrli shamcha (Nafas mashqi)",
        desc: "Yonoqlarni shishirmasdan, lablarni cho'chaytirib sekin va uzoq puflash (paxta yoki qog'oz kemachani harakatlantirish).",
        target: "To'g'ri havo oqimini shakllantirish"
      },
      {
        title: "Quloq sol va top (Fonematik o'yin)",
        desc: "Ota-ona turli so'zlarni aytadi, bola belgilangan tovushni (masalan 'SH') eshitganda qarsak chaladi.",
        target: "Fonematik eshitishni o'stirish"
      },
      {
        title: "Kichik ertakchi (Lug'at va bog'lanishli nutq)",
        desc: "Kichik rasmli kitoblarni birga tomosha qilib, 'Keyin nima bo'ldi?' savoliga javob berish.",
        target: "Fikrni to'liq gap bilan bayon qilish"
      }
    ]
  };
}

// Diagnostic API Endpoint
app.post('/api/diagnose', async (req: Request, res: Response) => {
  try {
    const { childInfo, testScores } = req.body;

    if (!childInfo) {
      return res.status(400).json({ error: "Bola ma'lumotlari to'liq emas" });
    }

    if (aiClient) {
      try {
        const prompt = `Siz oliy toifali tajribali bolalar logopedi va defektolog mutaxassisisiz.
Quyidagi bolaning nutqiy diagnostika test natijalarini chuqur tahlil qiling va rasmiy logopedik xulosa hamda tavsiyalar bering.
Javob faqat JSON formatida bo'lsin.

BOLA MA'LUMOTLARI:
- Ismi: ${childInfo.name || "Noma'lum"}
- Yoshi: ${childInfo.age || 5} yosh (${childInfo.birthDate || ''})
- Jinsi: ${childInfo.gender || 'Bolakay'}
- Ota-onaning shikoyatlari / qo'shimcha eslatma: ${childInfo.complaints || "Yo'q"}

DIAGNOSTIKA NATIJALARI:
- Artikulyatsiya va tovushlar talaffuzi: ${JSON.stringify(testScores?.articulation || {})}
- Fonematik eshitish va idrok: ${JSON.stringify(testScores?.phonemic || {})}
- Lug'at boyligi (faol va passiv): ${JSON.stringify(testScores?.vocabulary || {})}
- Grammatik qurilish: ${JSON.stringify(testScores?.grammar || {})}
- Bog'lanishli nutq: ${JSON.stringify(testScores?.connectedSpeech || {})}
- Nutq sur'ati va ritmi: ${JSON.stringify(testScores?.speechRhythm || {})}

Iltimos, O'zbek tilida quyidagi aniq JSON tuzilmasida javob qaytaring:
{
  "diagnosisTitle": "Klinik tashxis nomi (masalan: Dislaliya, FFNYe, UNR 3-daraja, yoki Yosh me'yoriga mos)",
  "diagnosisCode": "Qisqa logopedik kod (masalan: FFNYe, DIS-ROT, UNR-III, NORM)",
  "severity": "Me'yorda | Yengil | O'rta | Og'ir",
  "overallScore": number (0 dan 100 gacha foiz),
  "therapyDuration": "Tavsiya etiladigan muddat (masalan: 3-4 oy, haftasiga 2-3 dars)",
  "summary": "Bolaning umumiy nutq holati, kamchiliklar va yutuqlar haqida 2-3 ta professional xulosa gapi",
  "specialistRecommendations": [
    "Logoped mutaxassis uchun 1-tavsiya",
    "Logoped mutaxassis uchun 2-tavsiya",
    "Logoped mutaxassis uchun 3-tavsiya",
    "Logoped mutaxassis uchun 4-tavsiya"
  ],
  "parentHomeExercises": [
    {
      "title": "Mashq nomi",
      "desc": "Ota-ona uyda bola bilan qanday bajarishi kerakligi",
      "target": "Nima maqsadga erishiladi"
    }
  ]
}`;

        const aiResponse = await aiClient.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const rawText = aiResponse.text;
        if (rawText) {
          const parsed = JSON.parse(rawText.trim());
          return res.json({ success: true, diagnosis: parsed, source: 'gemini-ai' });
        }
      } catch (geminiError) {
        console.error("Gemini API call failed, falling back to expert rules:", geminiError);
      }
    }

    // Fallback to rules-based diagnostic engine
    const fallback = generateFallbackDiagnosis(childInfo, testScores || {});
    return res.json({ success: true, diagnosis: fallback, source: 'expert-engine' });
  } catch (err: any) {
    console.error("Diagnosis error:", err);
    return res.status(500).json({ error: "Diagnostika xulosasini tayyorlashda xatolik yuz berdi" });
  }
});

// Setup Vite in development or static serving in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`LogopedPlus server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
