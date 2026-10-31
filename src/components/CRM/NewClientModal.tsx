import React, { useState } from 'react';
import { Child } from '../../types';
import { X, UserPlus, Sparkles } from 'lucide-react';
import { sounds } from '../../utils/audioUtils';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAddChild: (child: Child) => void;
}

export const NewClientModal: React.FC<Props> = ({ isOpen, onClose, onAddChild }) => {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('2021-05-15');
  const [age, setAge] = useState(5.0);
  const [gender, setGender] = useState<'o\'g\'il' | 'qiz'>('o\'g\'il');
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('+998 ');
  const [parentTelegram, setParentTelegram] = useState('');
  const [address, setAddress] = useState('');
  const [complaints, setComplaints] = useState('');

  // Anamnesis fields
  const [pregnancyCourse, setPregnancyCourse] = useState('Asoratsiz, normal');
  const [deliveryType, setDeliveryType] = useState('Tabiiy tug\'ruq');
  const [speechMilestones, setSpeechMilestones] = useState('Ilk so\'zlar 1 yoshda');
  const [hearingAndVision, setHearingAndVision] = useState('Normada, tekshirilgan');
  const [familyEnvironment, setFamilyEnvironment] = useState('O\'zbek tili, tinch muhit');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !parentName.trim()) {
      alert("Iltimos, bolaning va ota-onaning ismini to'liq kiriting");
      return;
    }

    const newChild: Child = {
      id: 'ch-' + Date.now(),
      name: name.trim(),
      birthDate,
      age: Number(age) || 5,
      gender,
      parentName: parentName.trim(),
      parentPhone: parentPhone.trim(),
      parentTelegram: parentTelegram.trim() || undefined,
      address: address.trim() || undefined,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'yangi',
      complaints: complaints.trim() || "Birlamchi diagnostika ko'rigi",
      anamnesis: {
        pregnancyCourse,
        deliveryType,
        speechMilestones,
        hearingAndVision,
        familyEnvironment,
      },
    };

    sounds.playSuccess();
    onAddChild(newChild);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-black">Yangi Bolani Ro'yxatdan O'tkazish</h3>
              <p className="text-xs text-teal-100">Elektron mijozlar bazasiga qo'shish</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-teal-100 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Child Basic Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-teal-700 mb-3">
              1. Bola haqida ma'lumotlar
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bolaning F.I.Sh *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Sardor Yoqubov"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Yoshi (yil) *</label>
                <input
                  type="number"
                  step="0.1"
                  min="1"
                  max="16"
                  required
                  value={age}
                  onChange={(e) => setAge(parseFloat(e.target.value) || 5)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tug'ilgan sanasi</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Jinsi</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setGender('o\'g\'il')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      gender === 'o\'g\'il' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    O'g'il bola
                  </button>
                  <button
                    type="button"
                    onClick={() => setGender('qiz')}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                      gender === 'qiz' ? 'bg-teal-600 text-white border-teal-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    Qiz bola
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Parent Contacts */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-teal-700 mb-3">
              2. Ota-onasi va Aloqa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ota-ona F.I.Sh *</label>
                <input
                  type="text"
                  required
                  placeholder="Masalan: Malika Yoqubova (Onasi)"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telefon raqam *</label>
                <input
                  type="tel"
                  required
                  placeholder="+998 90 123 45 67"
                  value={parentPhone}
                  onChange={(e) => setParentPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Telegram (@username)</label>
                <input
                  type="text"
                  placeholder="@malika_y"
                  value={parentTelegram}
                  onChange={(e) => setParentTelegram(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Yashash manzili</label>
                <input
                  type="text"
                  placeholder="Toshkent sh., Yunusobod"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Complaints & Anamnesis */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-teal-700 mb-3">
              3. Shikoyatlar va Tibbiy Anamnez
            </h4>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ota-onaning asosiy shikoyatlari:</label>
                <textarea
                  rows={2}
                  placeholder="Qaysi tovushlarni ayta olmaydi, tushunarsiz nutq yoki duduqlanish bormi..."
                  value={complaints}
                  onChange={(e) => setComplaints(e.target.value)}
                  className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 focus:outline-teal-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Homiladorlik va tug'ruq kechishi</label>
                  <input
                    type="text"
                    value={pregnancyCourse}
                    onChange={(e) => setPregnancyCourse(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Ilk so'zlar va iboralar paydo bo'lishi</label>
                  <input
                    type="text"
                    value={speechMilestones}
                    onChange={(e) => setSpeechMilestones(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold transition"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition"
            >
              Bazaga saqlash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
