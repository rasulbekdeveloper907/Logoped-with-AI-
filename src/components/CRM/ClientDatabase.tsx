import React, { useState } from 'react';
import { Child, ChildStatus, DiagnosticReportData } from '../../types';
import { Search, UserPlus, Filter, Phone, Calendar, Award, PlayCircle, MoreVertical, CheckCircle2, ChevronRight, Activity, Users } from 'lucide-react';

interface Props {
  childrenList: Child[];
  reports: DiagnosticReportData[];
  onSelectChildForDiagnosis: (child: Child) => void;
  onOpenNewChildModal: () => void;
  onViewChildProfile: (child: Child) => void;
  onViewReport: (report: DiagnosticReportData) => void;
  onUpdateChildStatus: (childId: string, newStatus: ChildStatus) => void;
}

export const ClientDatabase: React.FC<Props> = ({
  childrenList,
  reports,
  onSelectChildForDiagnosis,
  onOpenNewChildModal,
  onViewChildProfile,
  onViewReport,
  onUpdateChildStatus,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedAgeRange, setSelectedAgeRange] = useState<string>('all');

  // Filter children
  const filteredChildren = childrenList.filter(ch => {
    const matchesSearch =
      ch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.parentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ch.parentPhone.includes(searchQuery);

    const matchesStatus = selectedStatus === 'all' || ch.status === selectedStatus;

    let matchesAge = true;
    if (selectedAgeRange === '2-3') matchesAge = ch.age >= 2 && ch.age <= 3.9;
    if (selectedAgeRange === '4-5') matchesAge = ch.age >= 4 && ch.age <= 5.9;
    if (selectedAgeRange === '6-7') matchesAge = ch.age >= 6;

    return matchesSearch && matchesStatus && matchesAge;
  });

  // Calculate statistics
  const totalCount = childrenList.length;
  const inCorrectionCount = childrenList.filter(c => c.status === 'korreksiya').length;
  const inDiagnosticCount = childrenList.filter(c => c.status === 'diagnostika' || c.status === 'yangi').length;
  const completedCount = childrenList.filter(c => c.status === 'yakunlangan').length;

  const getStatusBadge = (status: ChildStatus) => {
    switch (status) {
      case 'yangi':
        return <span className="px-2.5 py-1 bg-sky-100 text-sky-800 rounded-full text-[11px] font-bold">Yangi</span>;
      case 'diagnostika':
        return <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-[11px] font-bold">Diagnostikada</span>;
      case 'korreksiya':
        return <span className="px-2.5 py-1 bg-teal-100 text-teal-800 rounded-full text-[11px] font-bold">Korreksiyada</span>;
      case 'yakunlangan':
        return <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full text-[11px] font-bold">Yakunlangan</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & New Child CTA */}
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Logoped Elektron CRM Tizimi
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Bolalar va Mijozlar Bazasi
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ro'yxatga olingan barcha bolalar, ularning tashxislari va dinamikasi
          </p>
        </div>

        <button
          onClick={onOpenNewChildModal}
          className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
        >
          <UserPlus className="w-4 h-4" />
          <span>+ Yangi bola qo'shish</span>
        </button>
      </div>

      {/* KPI Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Jami bolalar</span>
            <Users className="w-4 h-4 text-teal-600" />
          </div>
          <p className="text-2xl font-black text-slate-800">{totalCount}</p>
          <span className="text-[10px] text-teal-600 font-bold">Aktiv mijozlar</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Korreksiyada</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">{inCorrectionCount}</p>
          <span className="text-[10px] text-amber-700 font-bold">Mashg'ulotlar ketmoqda</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Diagnostikada</span>
            <Award className="w-4 h-4 text-sky-500" />
          </div>
          <p className="text-2xl font-black text-sky-600">{inDiagnosticCount}</p>
          <span className="text-[10px] text-sky-700 font-bold">Birlamchi tekshiruv</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-xs">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider">Yakunlaganlar</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <p className="text-2xl font-black text-emerald-600">{completedCount}</p>
          <span className="text-[10px] text-emerald-700 font-bold">Nutq me'yorga kelgan</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-xs border border-slate-100 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Bola ismi, ota-onasi yoki telefon raqami orqali qidiring..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
          />
        </div>

        {/* Status tabs */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'yangi', label: 'Yangi' },
            { id: 'diagnostika', label: 'Diagnostikada' },
            { id: 'korreksiya', label: 'Korreksiyada' },
            { id: 'yakunlangan', label: 'Yakunlangan' },
          ].map(st => (
            <button
              key={st.id}
              onClick={() => setSelectedStatus(st.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedStatus === st.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Children Cards List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredChildren.length === 0 ? (
          <div className="col-span-full bg-white p-12 text-center rounded-3xl border border-dashed border-slate-200 text-slate-400 text-sm">
            Qidiruv bo'yicha hech qanday bola topilmadi.
          </div>
        ) : (
          filteredChildren.map(child => {
            const childReports = reports.filter(r => r.childId === child.id);
            const latest = childReports[childReports.length - 1];

            return (
              <div
                key={child.id}
                className="bg-white p-5 rounded-3xl border border-slate-200/80 hover:border-teal-400 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Top card bar */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-500 text-white font-black text-xl flex items-center justify-center shadow-xs shrink-0">
                        {child.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-base text-slate-800">{child.name}</h3>
                          {getStatusBadge(child.status)}
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {child.age} yosh • {child.gender === 'o\'g\'il' ? "O'g'il bola" : "Qiz bola"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Complaints snippet */}
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-600 mb-3 line-clamp-2">
                    <strong className="text-slate-800">Shikoyat:</strong> "{child.complaints}"
                  </div>

                  {/* Diagnosis history snippet */}
                  <div className="flex items-center justify-between text-xs py-2 px-3 bg-teal-50/50 rounded-xl border border-teal-100/70 mb-4">
                    <div className="flex items-center gap-1.5 truncate">
                      <Award className="w-4 h-4 text-teal-600 shrink-0" />
                      <span className="font-bold text-slate-800 truncate">
                        {latest ? latest.diagnosisTitle : "Hali diagnostika qilinmagan"}
                      </span>
                    </div>
                    {latest && (
                      <span className="font-black text-teal-700 shrink-0 ml-2">
                        {latest.overallScore}%
                      </span>
                    )}
                  </div>

                  {/* Parent contact info */}
                  <div className="text-xs text-slate-500 space-y-1 mb-4">
                    <p className="truncate">Ota-onasi: <strong className="text-slate-700">{child.parentName}</strong></p>
                    <p className="flex items-center gap-1.5 text-teal-700 font-semibold">
                      <Phone className="w-3.5 h-3.5" />
                      {child.parentPhone}
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                  <button
                    onClick={() => onViewChildProfile(child)}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold transition flex items-center gap-1"
                  >
                    Profil / Anamnez
                  </button>

                  <div className="flex items-center gap-2">
                    {latest && (
                      <button
                        onClick={() => onViewReport(latest)}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
                        title="Xulosani ko'rish"
                      >
                        Natija
                      </button>
                    )}

                    <button
                      onClick={() => onSelectChildForDiagnosis(child)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition flex items-center gap-1 shadow-xs"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      Diagnostika
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
