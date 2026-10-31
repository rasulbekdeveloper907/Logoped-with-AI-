import React from 'react';
import { UserRole } from '../types';
import { Activity, Users, User, Calendar, BookOpen, Award } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  hasActiveReport: boolean;
}

export const BottomNav: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  userRole,
  hasActiveReport,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200/90 py-1.5 px-3 flex items-center justify-around shadow-lg lg:hidden">
      {userRole === 'specialist' ? (
        <>
          <button
            onClick={() => setActiveTab('diagnostics')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition ${
              activeTab === 'diagnostics' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <Activity className="w-5 h-5" />
            <span className="text-[10px]">Diagnostika</span>
          </button>

          <button
            onClick={() => setActiveTab('crm')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition ${
              activeTab === 'crm' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px]">Mijozlar</span>
          </button>

          {hasActiveReport && (
            <button
              onClick={() => setActiveTab('report')}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition ${
                activeTab === 'report' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="text-[10px]">Natija</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition ${
              activeTab === 'exercises' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Mashqlar</span>
          </button>

          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition ${
              activeTab === 'schedule' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <Calendar className="w-5 h-5" />
            <span className="text-[10px]">Jadval</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setActiveTab('parent')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
              activeTab === 'parent' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Kabinetim</span>
          </button>

          <button
            onClick={() => setActiveTab('exercises')}
            className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
              activeTab === 'exercises' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px]">Mashqlar</span>
          </button>

          {hasActiveReport && (
            <button
              onClick={() => setActiveTab('report')}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-xl transition ${
                activeTab === 'report' ? 'text-teal-600 font-bold' : 'text-slate-400 font-medium'
              }`}
            >
              <Award className="w-5 h-5" />
              <span className="text-[10px]">Xulosa</span>
            </button>
          )}
        </>
      )}
    </div>
  );
};
