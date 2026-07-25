import React from 'react';
import type { ProductionResult, StepTimeline } from './types';
import { CheckCircle2, AlertTriangle, ArrowRight, Clock, CalendarX, Sparkles, Layers } from 'lucide-react';

interface TimelineGanttProps {
  result: ProductionResult;
}

export const TimelineGantt: React.FC<TimelineGanttProps> = ({ result }) => {
  const getStepColor = (id: string) => {
    switch (id) {
      case 'belanja': return 'bg-amber-500 border-amber-600 text-amber-950';
      case 'potong': return 'bg-blue-500 border-blue-600 text-blue-950';
      case 'bordir': return 'bg-purple-500 border-purple-600 text-purple-950';
      case 'antrean_jahit': return 'bg-rose-500 border-rose-600 text-rose-950';
      case 'jahit_pesanan': return 'bg-emerald-500 border-emerald-600 text-emerald-950';
      case 'finishing': return 'bg-indigo-500 border-indigo-600 text-indigo-950';
      default: return 'bg-slate-500 border-slate-600 text-slate-950';
    }
  };

  const getStepBgLight = (id: string) => {
    switch (id) {
      case 'belanja': return 'bg-amber-50/80 border-amber-200';
      case 'potong': return 'bg-blue-50/80 border-blue-200';
      case 'bordir': return 'bg-purple-50/80 border-purple-200';
      case 'antrean_jahit': return 'bg-rose-50/80 border-rose-200';
      case 'jahit_pesanan': return 'bg-emerald-50/80 border-emerald-200';
      case 'finishing': return 'bg-indigo-50/80 border-indigo-200';
      default: return 'bg-slate-50/80 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-orange-600" />
            <span>Timeline Sequential Produksi Konveksi</span>
          </h2>
          <p className="text-xs text-slate-500">
            Jadwal pelaksanaan setiap tahap produksi secara berurutan sesuai aturan kerja Roller Dealer
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span>6 Tahap Produksi</span>
        </div>
      </div>

      {/* Visual Gantt Bar Overview */}
      <div className="bg-slate-900 rounded-xl p-4 text-white overflow-x-auto">
        <div className="text-xs font-bold text-slate-400 mb-3 flex items-center justify-between">
          <span>VISUAL PROGRESS PIPELINE</span>
          <span>Order: {result.orderDateStr} &rarr; Selesai: {result.completionDateStr}</span>
        </div>

        <div className="space-y-2 min-w-[500px]">
          {result.timeline.map((step: any) => {
            const widthPct = Math.max(8, (step.workDays / result.totalWorkingDays) * 100);
            return (
              <div key={step.id} className="flex items-center text-xs">
                <span className="w-36 font-semibold truncate text-slate-300 pr-2 shrink-0">
                  {step.stepName}
                </span>

                <div className="flex-1 bg-slate-800 rounded-lg overflow-hidden h-7 relative flex items-center">
                  <div
                    className={`h-full ${getStepColor(step.id)} transition-all duration-500 flex items-center px-2 font-bold text-[11px] text-white shadow-sm`}
                    style={{ width: `${step.workDays > 0 ? widthPct : 0}%` }}
                  >
                    {step.workDays > 0 ? `${step.workDays} hr` : '0 hr'}
                  </div>
                  <span className="ml-2 text-[11px] text-slate-400 font-mono">
                    {step.startDateStr.split(',')[0]} s/d {step.endDateStr.split(',')[0]}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step-by-Step Detailed Cards List */}
      <div className="grid grid-cols-1 gap-3">
        {result.timeline.map((step: any, idx: number) => (
          <div
            key={step.id}
            className={`p-4 rounded-xl border transition-all ${getStepBgLight(step.id)}`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Left Column: Step info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-bold text-slate-900 text-sm">
                    {step.stepName}
                  </h3>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {step.statusBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 pl-8">
                  {step.description}
                </p>
              </div>

              {/* Middle Column: Dates */}
              <div className="pl-8 md:pl-0 flex items-center gap-2 text-xs font-medium text-slate-800 bg-white/80 px-3 py-2 rounded-lg border border-slate-200/60 shrink-0">
                <span className="font-semibold text-slate-900">{step.startDateStr}</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="font-semibold text-slate-900">{step.endDateStr}</span>
              </div>
            </div>

            {/* Bottom Row: Formula & Skipped Days */}
            <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-2 pl-8">
              <div className="text-slate-600 font-mono bg-slate-100/60 px-2.5 py-1 rounded border border-slate-200/50">
                {step.formulaExplanation}
              </div>

              {step.nonWorkingDays.length > 0 && (
                <div className="flex items-center gap-1.5 text-amber-700 bg-amber-100/80 px-2.5 py-1 rounded border border-amber-200 shrink-0">
                  <CalendarX className="w-3.5 h-3.5" />
                  <span>
                    Dilewati: {step.nonWorkingDays.map((d: any) => `${d.type}${d.name ? ` (${d.name})` : ''}`).join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
