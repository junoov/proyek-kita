import React from 'react';
import type { ProductionResult } from './types';
import { CalendarCheck, Clock, CalendarDays, Layers, MessageSquare, Save, Sparkles, Printer } from 'lucide-react';

interface SummaryCardsProps {
  result: ProductionResult;
  onOpenAIAdvisor: () => void;
  onOpenWhatsAppModal: () => void;
  onSaveOrder: () => void;
}

export const SummaryCards: React.FC<SummaryCardsProps> = ({
  result,
  onOpenAIAdvisor,
  onOpenWhatsAppModal,
  onSaveOrder
}) => {
  return (
    <div className="space-y-4">
      {/* Primary Hero Completion Date Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-orange-950 text-white rounded-2xl p-6 shadow-xl border border-slate-800 relative overflow-hidden">
        {/* Background glow decoration */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-amber-400" />
                ESTIMASI TANGGAL SELESAI PRODUKSI
              </span>
              <span className="bg-slate-800/80 text-slate-300 text-xs px-2.5 py-0.5 rounded-full border border-slate-700">
                Order: {result.orderDateStr}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight my-1">
              {result.completionDateStr}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Target penyelesaian seluruh 6 tahapan produksi (termasuk antrean jahit) tanpa hambatan tak terduga.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 print:hidden">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-lg border border-slate-700 transition-all hover:scale-[1.02] active:scale-[0.98]"
              title="Cetak atau simpan sebagai PDF untuk pelanggan"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Cetak Estimasi (PDF)</span>
            </button>

            <button
              onClick={onOpenWhatsAppModal}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-900/40 border border-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Draft WA Pelanggan</span>
            </button>

            <button
              onClick={onOpenAIAdvisor}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-orange-950/50 border border-amber-400/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>Analisis AI Advisor</span>
            </button>

            <button
              onClick={onSaveOrder}
              className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Simpan simulasi ke daftar"
            >
              <Save className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Simpan Order</span>
            </button>
          </div>
        </div>
      </div>

      {/* Grid Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Total Hari Kerja */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Hari Kerja</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{result.totalWorkingDays}</span>
              <span className="text-xs font-bold text-slate-600">Hari Kerja</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Senin - Sabtu (Senin-Sabtu efektif)</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center border border-orange-100 shrink-0">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Total Hari Kalender */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Hari Kalender</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-slate-900">{result.totalCalendarDays}</span>
              <span className="text-xs font-bold text-slate-600">Hari Real</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Termasuk Ahad & Hari Libur</p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shrink-0">
            <CalendarDays className="w-6 h-6" />
          </div>
        </div>

        {/* Antrean & Kapasitas Jahit */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Durasi Jahit & Antrean</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-black text-slate-900">
                {result.queueSewingDays + result.newOrderSewingDays}
              </span>
              <span className="text-xs font-bold text-slate-600">Hari Total Jahit</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Antrean: {result.queueSewingDays} hr | Jahit Baru: {result.newOrderSewingDays} hr
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shrink-0">
            <Layers className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};
