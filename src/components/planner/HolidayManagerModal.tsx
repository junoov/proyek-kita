import React, { useState } from 'react';
import type { Holiday } from './types';
import { Calendar, Plus, Trash2, Check, X, Filter } from 'lucide-react';

interface HolidayManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  holidays: Holiday[];
  onToggleHoliday: (id: string) => void;
  onAddHoliday: (holiday: Holiday) => void;
  onDeleteHoliday: (id: string) => void;
  onResetHolidays: () => void;
}

export const HolidayManagerModal: React.FC<HolidayManagerModalProps> = ({
  isOpen,
  onClose,
  holidays,
  onToggleHoliday,
  onAddHoliday,
  onDeleteHoliday,
  onResetHolidays
}) => {
  const [selectedYear, setSelectedYear] = useState<string>('2026');
  const [newDate, setNewDate] = useState('');
  const [newName, setNewName] = useState('');

  if (!isOpen) return null;

  const filteredHolidays = holidays.filter(h => h.date.startsWith(selectedYear));

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newName.trim()) return;

    onAddHoliday({
      id: `custom-${Date.now()}`,
      date: newDate,
      name: newName.trim(),
      isCustom: true,
      enabled: true
    });

    setNewDate('');
    setNewName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[85vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Kelola Hari Libur Nasional & Cuti</h3>
              <p className="text-xs text-slate-400">Aturan kerja Roller Dealer: Senin - Sabtu (Minggu & Libur dikosongkan)</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Year Filter & Add Form */}
        <div className="p-5 border-b border-slate-100 bg-slate-50 space-y-4 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <span>Pilih Tahun:</span>
            </div>

            <div className="flex items-center gap-1">
              {['2025', '2026', '2027'].map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                    selectedYear === yr
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>

          {/* Form Add Custom Holiday */}
          <form onSubmit={handleAdd} className="flex flex-col sm:flex-row items-center gap-2">
            <input
              type="date"
              required
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
            />
            <input
              type="text"
              required
              placeholder="Nama Cuti / Libur Tambahan..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full sm:flex-1 px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-medium bg-white"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1 shrink-0 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </form>
        </div>

        {/* Holiday List */}
        <div className="p-5 overflow-y-auto space-y-2 flex-1">
          {filteredHolidays.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-8">
              Tidak ada data hari libur pada tahun {selectedYear}.
            </p>
          ) : (
            filteredHolidays.map((h) => (
              <div
                key={h.id}
                className={`flex items-center justify-between p-3 rounded-xl border text-xs transition-colors ${
                  h.enabled
                    ? 'bg-amber-50/60 border-amber-200 text-slate-900'
                    : 'bg-slate-100/60 border-slate-200 text-slate-400 line-through'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={h.enabled}
                    onChange={() => onToggleHoliday(h.id)}
                    className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500 cursor-pointer"
                  />
                  <div>
                    <span className="font-mono font-bold text-slate-900 block">{h.date}</span>
                    <span className="font-semibold text-slate-700">{h.name}</span>
                    {h.isCustom && (
                      <span className="ml-2 text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded font-bold">
                        Custom
                      </span>
                    )}
                  </div>
                </div>

                {h.isCustom && (
                  <button
                    onClick={() => onDeleteHoliday(h.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    title="Hapus libur custom"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <button
            onClick={onResetHolidays}
            className="text-xs text-slate-500 hover:text-slate-800 underline"
          >
            Reset Hari Libur Default
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
