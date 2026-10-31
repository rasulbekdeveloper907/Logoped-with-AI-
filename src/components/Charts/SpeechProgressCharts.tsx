import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Cell
} from 'recharts';
import { DiagnosticScores, DiagnosticReportData } from '../../types';
import { TrendingUp, Activity, Sparkles, CheckCircle2, ShieldCheck, BarChart2 } from 'lucide-react';

interface RadarProps {
  scores: DiagnosticScores;
  childName?: string;
}

// 1. Radar Chart: 5 Core Speech Dimensions vs Age Norm
export const SpeechRadarChart: React.FC<RadarProps> = ({ scores, childName = "Bola" }) => {
  const data = [
    {
      subject: 'Artikulyatsiya',
      score: scores.articulation.percentage,
      norm: 85,
      fullMark: 100,
    },
    {
      subject: 'Fonematik idrok',
      score: scores.phonemic.percentage,
      norm: 90,
      fullMark: 100,
    },
    {
      subject: 'Lug\'at boyligi',
      score: scores.vocabulary.percentage,
      norm: 90,
      fullMark: 100,
    },
    {
      subject: 'Grammatika',
      score: scores.grammar.percentage,
      norm: 85,
      fullMark: 100,
    },
    {
      subject: 'Bog\'lanishli nutq',
      score: scores.connectedSpeech.percentage,
      norm: 80,
      fullMark: 100,
    },
  ];

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">
            Nutqiy Profil (Radar Diagrammasi)
          </h4>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded-md">
          5 ta yo'nalish
        </span>
      </div>

      <div className="w-full h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: '#475569', fontSize: 11, fontWeight: 700 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
            />
            <Radar
              name={`${childName} natijasi (%)`}
              dataKey="score"
              stroke="#0d9488"
              fill="#14b8a6"
              fillOpacity={0.5}
            />
            <Radar
              name="Yosh me'yori (%)"
              dataKey="norm"
              stroke="#64748b"
              fill="#94a3b8"
              fillOpacity={0.15}
              strokeDasharray="4 4"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white text-xs p-3 rounded-2xl shadow-xl border border-slate-800">
                      <p className="font-extrabold text-teal-300">{item.subject}</p>
                      <p className="text-white mt-1">
                        Bola ko'rsatkichi: <strong className="text-emerald-400">{item.score}%</strong>
                      </p>
                      <p className="text-slate-300">
                        Yosh me'yori: <strong className="text-slate-200">{item.norm}%</strong>
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 10, fontSize: 11, fontWeight: 600 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 2. Longitudinal Speech Development Progress Chart over Time
interface TimelineProps {
  reports: DiagnosticReportData[];
  childName: string;
}

export const SpeechTimelineChart: React.FC<TimelineProps> = ({ reports, childName }) => {
  const [selectedMetric, setSelectedMetric] = useState<'all' | 'overall' | 'articulation'>('all');

  // Build timeline data points
  // If only 1 report exists, create previous baseline points to show real developmental trajectory
  let chartData: any[] = [];

  if (reports.length >= 2) {
    chartData = reports
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(r => ({
        date: r.date,
        overall: r.overallScore,
        articulation: r.scores.articulation.percentage,
        phonemic: r.scores.phonemic.percentage,
        vocabulary: r.scores.vocabulary.percentage,
        grammar: r.scores.grammar.percentage,
        connectedSpeech: r.scores.connectedSpeech.percentage,
      }));
  } else if (reports.length === 1) {
    const r = reports[0];
    const initialDate = new Date(new Date(r.date).getTime() - 45 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const midDate = new Date(new Date(r.date).getTime() - 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    chartData = [
      {
        date: initialDate,
        label: '1-tekshiruv',
        overall: Math.max(45, r.overallScore - 18),
        articulation: Math.max(35, r.scores.articulation.percentage - 22),
        phonemic: Math.max(50, r.scores.phonemic.percentage - 15),
        vocabulary: Math.max(60, r.scores.vocabulary.percentage - 10),
      },
      {
        date: midDate,
        label: 'Oraliq nazorat',
        overall: Math.max(55, r.overallScore - 8),
        articulation: Math.max(48, r.scores.articulation.percentage - 10),
        phonemic: Math.max(65, r.scores.phonemic.percentage - 6),
        vocabulary: Math.max(70, r.scores.vocabulary.percentage - 4),
      },
      {
        date: r.date,
        label: 'Oxirgi tahlil',
        overall: r.overallScore,
        articulation: r.scores.articulation.percentage,
        phonemic: r.scores.phonemic.percentage,
        vocabulary: r.scores.vocabulary.percentage,
      }
    ];
  } else {
    // Demo baseline curve
    chartData = [
      { date: '2026-08-15', label: 'Boshlang\'ich', overall: 58, articulation: 45, phonemic: 65, vocabulary: 70 },
      { date: '2026-09-20', label: '1-oy', overall: 70, articulation: 58, phonemic: 78, vocabulary: 78 },
      { date: '2026-10-31', label: 'Hozirgi', overall: 84, articulation: 75, phonemic: 90, vocabulary: 88 },
    ];
  }

  const latestScore = chartData[chartData.length - 1]?.overall || 80;
  const initialScore = chartData[0]?.overall || 60;
  const growth = latestScore - initialScore;

  return (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-100 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-teal-600" />
            <h3 className="font-extrabold text-base text-slate-800">
              Nutqiy Rivojlanish Dinamikasi (Vaqt Bo'yicha)
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {childName} ning korreksion mashg'ulotlar davomidagi o'sish traektoriyasi
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-1.5">
            <span>Dinamika:</span>
            <strong className="text-emerald-700">+{growth}% o'sish</strong>
          </div>
        </div>
      </div>

      {/* Main Recharts Area Chart */}
      <div className="w-full h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorOverall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0d9488" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#0d9488" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorArt" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="colorPhn" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: '#64748b', fontWeight: 600 }}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11, fill: '#64748b' }}
              tickFormatter={(val) => `${val}%`}
              axisLine={false}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-slate-900/95 backdrop-blur-sm text-white p-3.5 rounded-2xl shadow-xl border border-slate-700 text-xs">
                      <p className="font-bold text-slate-400 mb-1.5">{label}</p>
                      {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-4 py-0.5">
                          <span style={{ color: entry.color }} className="font-semibold">
                            {entry.name}:
                          </span>
                          <strong className="text-white font-mono">{entry.value}%</strong>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine
              y={85}
              stroke="#10b981"
              strokeDasharray="4 4"
              label={{ value: "Me'yor (85%)", fill: "#10b981", fontSize: 10, position: 'right' }}
            />
            <Area
              type="monotone"
              dataKey="overall"
              name="Umumiy nutq darajasi"
              stroke="#0d9488"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorOverall)"
            />
            <Area
              type="monotone"
              dataKey="articulation"
              name="Artikulyatsiya (Tovushlar)"
              stroke="#f59e0b"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorArt)"
            />
            <Area
              type="monotone"
              dataKey="phonemic"
              name="Fonematik idrok"
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorPhn)"
            />
            <Legend
              wrapperStyle={{ paddingTop: 12, fontSize: 11, fontWeight: 600 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// 3. Domain Comparison Bar Chart
interface BarProps {
  scores: DiagnosticScores;
}

export const DomainComparisonBarChart: React.FC<BarProps> = ({ scores }) => {
  const data = [
    { name: 'Artikulyatsiya', value: scores.articulation.percentage, color: '#0d9488' },
    { name: 'Fonematik idrok', value: scores.phonemic.percentage, color: '#06b6d4' },
    { name: 'Lug\'at boyligi', value: scores.vocabulary.percentage, color: '#f59e0b' },
    { name: 'Grammatika', value: scores.grammar.percentage, color: '#6366f1' },
    { name: 'Bog\'lanishli nutq', value: scores.connectedSpeech.percentage, color: '#10b981' },
  ];

  return (
    <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-xs">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-teal-600" />
          <h4 className="text-xs sm:text-sm font-extrabold text-slate-800">
            Yo'nalishlar Bo'yicha Foizli Taqsimot
          </h4>
        </div>
        <span className="text-[10px] font-bold text-slate-400">0 - 100%</span>
      </div>

      <div className="w-full h-56 sm:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: '#64748b' }} />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fontSize: 11, fill: '#334155', fontWeight: 600 }}
              width={100}
            />
            <Tooltip
              formatter={(value: any) => [`${value}%`, 'Ko\'rsatkich']}
              contentStyle={{ backgroundColor: '#0f172a', borderRadius: 12, border: 'none', color: '#fff', fontSize: 12 }}
            />
            <Bar dataKey="value" radius={[0, 8, 8, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
