import React, { useState, useEffect } from 'react';
import { Child, ChildAudioRecording, DiagnosticReportData, UserRole, ScheduleItem, ChildStatus } from './types';
import { INITIAL_CHILDREN, INITIAL_REPORTS, INITIAL_SCHEDULE } from './data/mockData';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { DiagnosticWizard } from './components/Diagnostics/DiagnosticWizard';
import { DiagnosticReport } from './components/Results/DiagnosticReport';
import { ClientDatabase } from './components/CRM/ClientDatabase';
import { ClientProfileModal } from './components/CRM/ClientProfileModal';
import { NewClientModal } from './components/CRM/NewClientModal';
import { ParentDashboard } from './components/ParentPortal/ParentDashboard';
import { ExerciseCatalog } from './components/Exercises/ExerciseCatalog';
import { ScheduleCalendar } from './components/Schedule/ScheduleCalendar';
import { OfflineIndicator } from './components/OfflineIndicator';
import { Smartphone, Laptop, Sparkles } from 'lucide-react';

export default function App() {
  // Persistence with localStorage
  const [childrenList, setChildrenList] = useState<Child[]>(() => {
    try {
      const saved = localStorage.getItem('logoped_children');
      return saved ? JSON.parse(saved) : INITIAL_CHILDREN;
    } catch {
      return INITIAL_CHILDREN;
    }
  });

  const [reports, setReports] = useState<DiagnosticReportData[]>(() => {
    try {
      const saved = localStorage.getItem('logoped_reports');
      return saved ? JSON.parse(saved) : INITIAL_REPORTS;
    } catch {
      return INITIAL_REPORTS;
    }
  });

  const [schedule, setSchedule] = useState<ScheduleItem[]>(() => {
    try {
      const saved = localStorage.getItem('logoped_schedule');
      return saved ? JSON.parse(saved) : INITIAL_SCHEDULE;
    } catch {
      return INITIAL_SCHEDULE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('logoped_children', JSON.stringify(childrenList));
    } catch (e) {}
  }, [childrenList]);

  useEffect(() => {
    try {
      localStorage.setItem('logoped_reports', JSON.stringify(reports));
    } catch (e) {}
  }, [reports]);

  useEffect(() => {
    try {
      localStorage.setItem('logoped_schedule', JSON.stringify(schedule));
    } catch (e) {}
  }, [schedule]);

  // App navigation state
  const [userRole, setUserRole] = useState<UserRole>('specialist');
  const [activeTab, setActiveTab] = useState<string>('diagnostics');
  const [selectedChild, setSelectedChild] = useState<Child>(childrenList[0] || INITIAL_CHILDREN[0]);
  const [activeReport, setActiveReport] = useState<DiagnosticReportData | undefined>(reports[0]);

  // Modals state
  const [isNewChildModalOpen, setIsNewChildModalOpen] = useState(false);
  const [profileChild, setProfileChild] = useState<Child | null>(null);

  // Mobile Frame Simulation
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Handlers
  const handleAddChild = (newChild: Child) => {
    setChildrenList(prev => [newChild, ...prev]);
    setSelectedChild(newChild);
  };

  const handleUpdateChildStatus = (childId: string, newStatus: ChildStatus) => {
    setChildrenList(prev => prev.map(c => c.id === childId ? { ...c, status: newStatus } : c));
  };

  const handleSaveAudioRecording = (childId: string, recording: ChildAudioRecording) => {
    setChildrenList(prev => prev.map(c => {
      if (c.id === childId) {
        const existing = c.audioRecordings || [];
        const updated = [recording, ...existing];
        const updatedChild = { ...c, audioRecordings: updated };
        if (profileChild && profileChild.id === childId) {
          setProfileChild(updatedChild);
        }
        if (selectedChild.id === childId) {
          setSelectedChild(updatedChild);
        }
        return updatedChild;
      }
      return c;
    }));
  };

  const handleDeleteAudioRecording = (childId: string, recordingId: string) => {
    setChildrenList(prev => prev.map(c => {
      if (c.id === childId) {
        const existing = c.audioRecordings || [];
        const updated = existing.filter(r => r.id !== recordingId);
        const updatedChild = { ...c, audioRecordings: updated };
        if (profileChild && profileChild.id === childId) {
          setProfileChild(updatedChild);
        }
        if (selectedChild.id === childId) {
          setSelectedChild(updatedChild);
        }
        return updatedChild;
      }
      return c;
    }));
  };

  const handleStartDiagnosisForChild = (child: Child) => {
    setSelectedChild(child);
    setActiveTab('diagnostics');
  };

  const handleFinishDiagnosis = (newReport: DiagnosticReportData) => {
    setReports(prev => [newReport, ...prev]);
    setActiveReport(newReport);

    // Update child status to 'korreksiya' if problem found, or 'yakunlangan' if norma
    const newStatus: ChildStatus = newReport.severity === "Me'yorda" ? 'yakunlangan' : 'korreksiya';
    handleUpdateChildStatus(newReport.childId, newStatus);

    setActiveTab('report');
  };

  const handleToggleScheduleStatus = (id: string) => {
    setSchedule(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          status: item.status === 'bajarildi' ? 'rejalashtirilgan' : 'bajarildi'
        };
      }
      return item;
    }));
  };

  const handleAddScheduleItem = (newItem: ScheduleItem) => {
    setSchedule(prev => [newItem, ...prev]);
  };

  // Main view content renderer
  const renderContent = () => {
    switch (activeTab) {
      case 'diagnostics':
        return (
          <DiagnosticWizard
            selectedChild={selectedChild}
            allChildren={childrenList}
            onSelectChild={setSelectedChild}
            onFinish={handleFinishDiagnosis}
            onOpenNewChildModal={() => setIsNewChildModalOpen(true)}
          />
        );
      case 'report':
        return activeReport ? (
          <DiagnosticReport
            report={activeReport}
            onRetest={() => setActiveTab('diagnostics')}
            onGoToParentPortal={() => {
              setUserRole('parent');
              setActiveTab('parent');
            }}
          />
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-500 text-sm">Hali hech qanday diagnostika hisoboti mavjud emas.</p>
            <button
              onClick={() => setActiveTab('diagnostics')}
              className="mt-4 px-5 py-2 bg-teal-600 text-white rounded-xl text-xs font-bold"
            >
              Diagnostika boshlash
            </button>
          </div>
        );
      case 'crm':
        return (
          <ClientDatabase
            childrenList={childrenList}
            reports={reports}
            onSelectChildForDiagnosis={handleStartDiagnosisForChild}
            onOpenNewChildModal={() => setIsNewChildModalOpen(true)}
            onViewChildProfile={setProfileChild}
            onViewReport={(rep) => {
              setActiveReport(rep);
              setActiveTab('report');
            }}
            onUpdateChildStatus={handleUpdateChildStatus}
          />
        );
      case 'parent':
        return (
          <ParentDashboard
            currentChild={selectedChild}
            allChildren={childrenList}
            onSelectChild={setSelectedChild}
            report={reports.find(r => r.childId === selectedChild.id) || activeReport}
            allReports={reports}
            onOpenDiagnosticReport={() => {
              const r = reports.find(r => r.childId === selectedChild.id) || activeReport;
              if (r) {
                setActiveReport(r);
                setActiveTab('report');
              }
            }}
          />
        );
      case 'exercises':
        return <ExerciseCatalog />;
      case 'schedule':
        return (
          <ScheduleCalendar
            schedule={schedule}
            onToggleStatus={handleToggleScheduleStatus}
            onAddScheduleItem={handleAddScheduleItem}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-teal-500 selection:text-white pb-20 lg:pb-8">
      {/* If Mobile Simulator Frame is active */}
      {isMobileFrame ? (
        <div className="py-6 px-4 bg-slate-900/95 min-h-screen flex flex-col items-center justify-center">
          {/* Top simulator bar */}
          <div className="mb-4 flex items-center justify-between w-full max-w-[430px] px-2 text-white text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold">📱 Smartfon Simulyatori</span>
              <span className="text-slate-400 text-[10px]">390 x 844 px</span>
            </div>
            <button
              onClick={() => setIsMobileFrame(false)}
              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition flex items-center gap-1"
            >
              <Laptop className="w-3.5 h-3.5" />
              Oddiy ekranga qaytish
            </button>
          </div>

          {/* Smartphone Frame */}
          <div className="w-[390px] h-[844px] bg-white rounded-[50px] shadow-2xl border-[10px] border-slate-800 relative overflow-hidden flex flex-col ring-8 ring-slate-700/40">
            {/* Dynamic Island / Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-50 flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-slate-950/80 mr-3" />
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-950" />
            </div>

            {/* Mobile App Viewport */}
            <div className="flex-1 overflow-y-auto flex flex-col pt-6 pb-16">
              <Navbar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                userRole={userRole}
                setUserRole={setUserRole}
                isMobileFrame={isMobileFrame}
                setIsMobileFrame={setIsMobileFrame}
                hasActiveReport={!!activeReport}
              />
              <main className="p-4 flex-1">
                {renderContent()}
              </main>
            </div>

            {/* Mobile Bottom Navigation */}
            <BottomNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              userRole={userRole}
              hasActiveReport={!!activeReport}
            />

            {/* Home indicator bar */}
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-slate-900 rounded-full z-50 pointer-events-none" />
          </div>
        </div>
      ) : (
        /* Regular Full-Screen Responsive Web View */
        <div className="flex flex-col min-h-screen">
          <Navbar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
            setUserRole={setUserRole}
            isMobileFrame={isMobileFrame}
            setIsMobileFrame={setIsMobileFrame}
            hasActiveReport={!!activeReport}
          />

          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {renderContent()}
          </main>

          {/* Mobile Bottom Navigation on real mobile devices */}
          <BottomNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            userRole={userRole}
            hasActiveReport={!!activeReport}
          />
        </div>
      )}

      {/* Profile Modal */}
      <ClientProfileModal
        child={profileChild ? childrenList.find(c => c.id === profileChild.id) || profileChild : null}
        reports={reports}
        onClose={() => setProfileChild(null)}
        onStartDiagnosis={handleStartDiagnosisForChild}
        onViewReport={(rep) => {
          setActiveReport(rep);
          setActiveTab('report');
        }}
        onSaveAudioRecording={handleSaveAudioRecording}
        onDeleteAudioRecording={handleDeleteAudioRecording}
      />

      {/* New Child Registration Modal */}
      <NewClientModal
        isOpen={isNewChildModalOpen}
        onClose={() => setIsNewChildModalOpen(false)}
        onAddChild={handleAddChild}
      />

      {/* Offline connectivity indicator */}
      <OfflineIndicator />
    </div>
  );
}
