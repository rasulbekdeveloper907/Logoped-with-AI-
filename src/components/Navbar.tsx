import React from 'react';
import { UserRole } from '../types';
import { PWAInstallButton } from './PWAInstallButton';
import { Activity, Users, User, Calendar, BookOpen, Smartphone, Laptop, Award, Stethoscope, HeartHandshake } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  hasActiveReport: boolean;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  isMobileFrame,
  setIsMobileFrame,
  hasActiveReport,
}) => {
  return (
    <header className="bg-white border-b border-slate-200/80 sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveTab(userRole === 'specialist' ? 'diagnostics' : 'parent')}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center font-black text-xl shadow-xs">
              <span className="tracking-tighter">LP</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">Logoped<span className="text-teal-600">Plus</span></span>
                <span className="px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-700 font-extrabold text-[10px]">UZ</span>
              </div>
              <p className="text-[10px] text-slate-400 -mt-0.5 font-medium hidden sm:block">Nutq Diagnostikasi & CRM</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {userRole === 'specialist' ? (
              <>
                <button
                  onClick={() => setActiveTab('diagnostics')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'diagnostics'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Activity className="w-3.5 h-3.5" />
                  Diagnostika
                </button>

                {hasActiveReport && (
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === 'report'
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Xulosa & Natija
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('crm')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'crm'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  Mijozlar Bazasi (CRM)
                </button>

                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'exercises'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Mashg'ulotlar
                </button>

                <button
                  onClick={() => setActiveTab('schedule')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'schedule'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  Darslar Jadvali
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('parent')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'parent'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Kabinetim
                </button>

                <button
                  onClick={() => setActiveTab('exercises')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === 'exercises'
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Mashqlar
                </button>

                {hasActiveReport && (
                  <button
                    onClick={() => setActiveTab('report')}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      activeTab === 'report'
                        ? 'bg-teal-600 text-white shadow-xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Award className="w-3.5 h-3.5" />
                    Tibbiy Xulosa
                  </button>
                )}
              </>
            )}
          </nav>

          {/* Right Controls: Role Switcher, Mobile Frame Toggle & PWA */}
          <div className="flex items-center gap-2">
            {/* Mobile View Toggle */}
            <button
              onClick={() => setIsMobileFrame(!isMobileFrame)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                isMobileFrame
                  ? 'bg-teal-50 border-teal-300 text-teal-800'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
              title="Mobil ilova simulyatori ko'rinishi"
            >
              <Smartphone className="w-3.5 h-3.5 text-teal-600" />
              <span>{isMobileFrame ? "Mobil ko'rinish" : "Mobil simulyator"}</span>
            </button>

            {/* Role Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200">
              <button
                onClick={() => {
                  setUserRole('specialist');
                  if (activeTab === 'parent') setActiveTab('diagnostics');
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition flex items-center gap-1 ${
                  userRole === 'specialist'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Stethoscope className="w-3 h-3 text-teal-600" />
                <span className="hidden sm:inline">Logoped</span>
              </button>

              <button
                onClick={() => {
                  setUserRole('parent');
                  setActiveTab('parent');
                }}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition flex items-center gap-1 ${
                  userRole === 'parent'
                    ? 'bg-white text-slate-800 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <HeartHandshake className="w-3 h-3 text-rose-500" />
                <span className="hidden sm:inline">Ota-ona</span>
              </button>
            </div>

            {/* PWA Install Button */}
            <PWAInstallButton variant="pill" />
          </div>
        </div>
      </div>
    </header>
  );
};
