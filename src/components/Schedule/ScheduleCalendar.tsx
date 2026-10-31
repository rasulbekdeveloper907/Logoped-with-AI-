import React, { useState } from 'react';
import { ScheduleItem } from '../../types';
import { Calendar, Clock, Plus, CheckCircle, AlertCircle, User, Filter } from 'lucide-react';

interface Props {
  schedule: ScheduleItem[];
  onToggleStatus: (id: string) => void;
  onAddScheduleItem: (item: ScheduleItem) => void;
}

export const ScheduleCalendar: React.FC<Props> = ({ schedule, onToggleStatus, onAddScheduleItem }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [childName, setChildName] = useState('');
  const [date, setDate] = useState('2026-11-01');
  const [time, setTime] = useState('11:00');
  const [sessionType, setSessionType] = useState<ScheduleItem['sessionType']>('Individual dars');
  const [notes, setNotes] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim()) return;

    const newItem: ScheduleItem = {
      id: 'sch-' + Date.now(),
      childId: 'custom',
      childName: childName.trim(),
      date,
      time,
      sessionType,
      status: 'rejalashtirilgan',
      durationMinutes: 45,
      notes: notes.trim() || undefined,
    };

    onAddScheduleItem(newItem);
    setShowAddModal(false);
    setChildName('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl shadow-xs border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
            Darslar Jadvali va Davomat
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
            Logopedik Mashg'ulotlar Taqsimoti
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Kunlik rejalashtirilgan darslar, diagnostika va ota-onalar bilan maslahatlar
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-2xl text-xs sm:text-sm shadow-md flex items-center gap-2 transition"
        >
          <Plus className="w-4 h-4" />
          <span>Dars rejalashtirish</span>
        </button>
      </div>

      {/* Schedule list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schedule.map(item => (
          <div
            key={item.id}
            className={`p-5 rounded-3xl border transition flex flex-col justify-between ${
              item.status === 'bajarildi'
                ? 'bg-emerald-50/40 border-emerald-200'
                : 'bg-white border-slate-200/80 hover:border-teal-300'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-black">
                  {item.time} ({item.durationMinutes} daq)
                </span>
                <span className="text-xs text-slate-400 font-semibold">{item.date}</span>
              </div>

              <h3 className="font-black text-base text-slate-800 mt-2">{item.childName}</h3>
              <p className="text-xs font-bold text-teal-700 mt-0.5">{item.sessionType}</p>

              {item.notes && (
                <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  {item.notes}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-100">
              <span className={`text-xs font-bold ${
                item.status === 'bajarildi' ? 'text-emerald-700' : 'text-amber-700'
              }`}>
                {item.status === 'bajarildi' ? '✓ Dars o\'tildi' : 'Rejalashtirilgan'}
              </span>

              <button
                onClick={() => onToggleStatus(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition ${
                  item.status === 'bajarildi'
                    ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                }`}
              >
                {item.status === 'bajarildi' ? 'Qaytarish' : 'Bajarildi deb belgilash'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-slate-100">
            <h3 className="text-base font-black text-slate-900 mb-4">Yangi Dars Qo'shish</h3>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bola ismi *</label>
                <input
                  type="text"
                  required
                  placeholder="Jasur Aliyev"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sana</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Vaqt</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dars turi</label>
                <select
                  value={sessionType}
                  onChange={(e) => setSessionType(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                >
                  <option value="Individual dars">Individual dars</option>
                  <option value="Diagnostika">Diagnostika</option>
                  <option value="Guruh mashg'uloti">Guruh mashg'uloti</option>
                  <option value="Ota-ona maslahati">Ota-ona maslahati</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Qo'shimcha eslatma</label>
                <input
                  type="text"
                  placeholder="Tovushlarni avtomatlashtirish..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
